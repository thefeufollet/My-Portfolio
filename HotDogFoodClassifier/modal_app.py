"""
Modal app for training, inference, and W&B Weave evaluation of the food classifier.
"""

import asyncio
from pathlib import Path

import modal

from common import load_eval_data, predict_food_from_model

APP_DIR = Path(__file__).parent
MODEL_DIR = "/vol/models/food-classifier-model"

app = modal.App("food-classifier")
volume = modal.Volume.from_name("food-classifier-store", create_if_missing=True)

# All pip/env steps first; add_local_* last (Modal requirement).
base_image = (
    modal.Image.debian_slim(python_version="3.13")
    .pip_install(
        # SetFit 1.1.x imports default_logdir removed in transformers 5.0
        "transformers>=4.41,<5",
        "setfit>=1.1.3",
        "datasets",
        "pandas",
        "torch",
        "sentence-transformers",
        "scikit-learn",
        "weave",
        "wandb",
        "fastapi[standard]",
    )
)

image = (
    base_image
    .add_local_file(str(APP_DIR / "training_data.csv"), "/data/training_data.csv")
    .add_local_file(str(APP_DIR / "eval.csv"), "/data/eval.csv")
    .add_local_python_source("common")
    .add_local_python_source("train_model")
)


@app.function(
    gpu="T4",
    timeout=1800,
    volumes={"/vol/models": volume},
    image=image,
)
def train_model():
    """Train SetFit on GPU and persist weights to the Modal volume."""
    import os

    os.environ["WANDB_DISABLED"] = "true"

    from train_model import load_data, test_model, train_model as run_training

    print("Loading training data...")
    train_dataset, label_map = load_data("/data/training_data.csv")

    print("Training model on GPU...")
    model = run_training(train_dataset)

    test_model(model, label_map)

    print(f"Saving model to {MODEL_DIR}...")
    model.save_pretrained(MODEL_DIR)
    volume.commit()

    print("Training complete. Weights committed to volume.")


@app.cls(image=image, volumes={"/vol/models": volume})
class FoodClassifier:
    """Load trained weights from the volume and serve predictions."""

    @modal.enter()
    def load_model(self):
        from setfit import SetFitModel

        self.model = SetFitModel.from_pretrained(MODEL_DIR)

    @modal.method()
    def predict(self, text: str) -> dict:
        return predict_food_from_model(self.model, text)

    @modal.fastapi_endpoint(method="POST")
    def predict_api(self, item: dict):
        return self.predict.local(item["text"])


@app.function(
    image=image,
    volumes={"/vol/models": volume},
    secrets=[modal.Secret.from_name("wandb-secret")],
    timeout=3600,
)
def run_evaluation():
    """Run W&B Weave evaluation against eval.csv using the trained model."""
    import os

    import weave
    import wandb
    from setfit import SetFitModel

    # Training disables wandb; re-enable for Weave eval.
    os.environ.pop("WANDB_DISABLED", None)
    os.environ.pop("WANDB_MODE", None)

    api_key = os.environ.get("WANDB_API_KEY")
    if not api_key:
        raise RuntimeError(
            "WANDB_API_KEY is not set in the container. "
            "Recreate the Modal secret (see README Modal section).\n"
            "Get a key at https://wandb.ai/authorize"
        )
    if len(api_key) < 40:
        raise RuntimeError(
            f"WANDB_API_KEY looks invalid (length {len(api_key)}, expected 40+). "
            "The Modal secret exists but its value is wrong — often a placeholder like "
            "'secret' (6 chars) was saved instead of your real key. "
            "Recreate with: modal secret create wandb-secret --from-dotenv wandb.env --force"
        )

    print("Logging in to Weights & Biases...")
    wandb.login(key=api_key, relogin=True)

    print("Initializing W&B Weave...")
    weave.init("food-classifier")

    model = SetFitModel.from_pretrained(MODEL_DIR)

    @weave.op()
    def predict_food(text: str) -> dict:
        return predict_food_from_model(model, text)

    @weave.op()
    def accuracy_scorer(label: str, output: dict) -> dict:
        return {"correct": label == output["prediction"]}

    @weave.op()
    def confidence_scorer(label: str, output: dict) -> dict:
        return {"confidence": output["confidence"]}

    @weave.op()
    def multi_metric_scorer(label: str, output: dict) -> dict:
        correct = label == output["prediction"]
        confidence = output["confidence"]
        return {
            "correct": correct,
            "confidence": confidence,
            "quality_score": confidence if correct else 0.0,
        }

    print("Loading evaluation data...")
    eval_data = load_eval_data("/data/eval.csv")

    print("Running evaluation...")
    evaluation = weave.Evaluation(
        dataset=eval_data,
        scorers=[accuracy_scorer, confidence_scorer, multi_metric_scorer],
        name="food-classifier-eval",
    )
    results = asyncio.run(evaluation.evaluate(predict_food))

    print("=" * 60)
    print("EVALUATION RESULTS")
    print("=" * 60)
    print(f"Dataset: eval.csv ({len(eval_data)} examples)")
    print(f"Results: {results}")
    print("View detailed results in W&B Weave dashboard.")


@app.local_entrypoint()
def main(text: str = "I'm craving a juicy hotdog with sauerkraut"):
    """Smoke-test prediction: modal run modal_app.py --text \"...\""""
    result = FoodClassifier().predict.remote(text)
    print(result)
