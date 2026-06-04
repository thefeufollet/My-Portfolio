"""Shared constants and helpers for local and Modal training/eval."""

import pandas as pd

LABEL_MAP = {"hotdog": 0, "hamburger": 1, "unknown": 2}
ID_TO_LABEL = {v: k for k, v in LABEL_MAP.items()}


def predict_food_from_model(model, text: str) -> dict:
    """Predict food category for a single text input."""
    pred = model.predict([text])[0]
    probs = model.predict_proba([text])[0]

    pred_id = int(pred) if hasattr(pred, "item") else pred
    predicted_label = ID_TO_LABEL[pred_id]

    return {
        "prediction": predicted_label,
        "prediction_id": pred_id,
        "probabilities": {
            "hotdog": float(probs[0]),
            "hamburger": float(probs[1]),
            "unknown": float(probs[2]),
        },
        "confidence": float(probs[pred_id]),
    }


def load_eval_data(csv_path: str) -> list[dict]:
    """Load evaluation data from CSV."""
    df = pd.read_csv(csv_path)
    eval_data = df.to_dict("records")

    print(f"Loaded {len(eval_data)} evaluation examples")
    print(f"Label distribution: {df['label'].value_counts().to_dict()}")

    return eval_data
