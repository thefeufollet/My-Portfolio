#!/usr/bin/env python3
"""
Weave evaluation script for food classifier SetFit model.
Evaluates hotdog/hamburger/unknown classification with W&B Weave.
"""

import asyncio

import weave
from setfit import SetFitModel

from common import load_eval_data, predict_food_from_model


@weave.op()
def accuracy_scorer(label: str, output: dict) -> dict:
    """Score prediction accuracy."""
    return {"correct": label == output["prediction"]}


@weave.op()
def confidence_scorer(label: str, output: dict) -> dict:
    """Score prediction confidence."""
    return {"confidence": output["confidence"]}


@weave.op()
def multi_metric_scorer(label: str, output: dict) -> dict:
    """Combined scorer for accuracy and confidence."""
    correct = label == output["prediction"]
    confidence = output["confidence"]
    return {
        "correct": correct,
        "confidence": confidence,
        "quality_score": confidence if correct else 0.0,
    }


async def main():
    """Run evaluation with W&B Weave."""
    print("Initializing W&B Weave...")
    weave.init("food-classifier")

    print("\nLoading model...")
    model = SetFitModel.from_pretrained("./food-classifier-model")

    @weave.op()
    def predict_food(text: str) -> dict:
        return predict_food_from_model(model, text)

    print("\nLoading evaluation data...")
    eval_data = load_eval_data("eval.csv")

    print("\nCreating evaluation...")
    evaluation = weave.Evaluation(
        dataset=eval_data,
        scorers=[accuracy_scorer, confidence_scorer, multi_metric_scorer],
        name="food-classifier-eval",
    )

    print("\nRunning evaluation...")
    print("=" * 60)
    results = await evaluation.evaluate(predict_food)

    print("\n" * 60)
    print("EVALUATION RESULTS")
    print("=" * 60)
    print(f"\nEvaluation dataset: eval.csv ({len(eval_data)} examples)")
    print(f"\nResults: {results}")

    print("\nEvaluation complete!")
    print("View detailed results in W&B Weave dashboard:")
    print("https://wandb.ai/standdio/food-classifier/weave")


if __name__ == "__main__":
    asyncio.run(main())
    
# cd "C:\Users\Camille Darley\Cursor\HotDogFoodClassifier"
# modal run modal_app.py::run_evaluation


