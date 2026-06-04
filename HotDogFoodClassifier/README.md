# Food Classifier: Hotdog vs Hamburger vs Unknown (Modal adaptation)

A SetFit-based text classifier that identifies whether people are talking about hotdogs, hamburgers, or something unrelated.

This repository is a **[Modal](https://modal.com/) adaptation** of the original project, maintained by **[thefeufollet](https://github.com/thefeufollet)**.

**Upstream:** [trashhalo/food-classifier](https://github.com/trashhalo/food-classifier) — see the [original README](https://github.com/trashhalo/food-classifier/blob/master/README.md) for the baseline local-only workflow and background.

The core model, datasets, and training logic are unchanged; this fork adds cloud training, a hosted inference API, and remote W&B Weave evaluation on Modal.

## Overview

This project uses Hugging Face's SetFit with the `all-MiniLM-L6-v2` base model to perform few-shot text classification with 8 examples per class.

**Features (from upstream):**
- Fast training (seconds on CPU/GPU)
- W&B Weave integration for evaluation tracking
- Lightweight model (~90MB)

**Added in this Modal fork:**
- GPU training on Modal (`modal run modal_app.py::train_model`)
- Persistent model weights on a Modal Volume (`food-classifier-store`)
- Deployed FastAPI `POST /predict` endpoint
- Remote Weave evaluation (`modal run modal_app.py::run_evaluation`)
- Shared helpers in `common.py` for local and Modal code paths

## What changed from the original repo

| Area | Original ([food-classifier](https://github.com/trashhalo/food-classifier)) | This fork (`HotDogFoodClassifier`) |
|------|----------------------------------------------------------------------------|-------------------------------------|
| Training | Local only: `uv run train_model.py` → `./food-classifier-model` | Same locally; plus Modal GPU + volume at `/vol/models/food-classifier-model` |
| Evaluation | `eval.py` loads model at **import time** | Model loaded inside `main()` / Modal function (safe for `modal run`) |
| Entry points | `train_model.py`, `eval.py` | Above + `modal_app.py`, `HotDogModel.py` (thin wrapper), `common.py` |
| Dependencies | `pyproject.toml` (setfit, weave, …) | Adds `modal`, `torch`, `transformers<5`, `fastapi`, `python-dotenv`; pins `transformers>=4.41,<5` for SetFit compatibility |
| Inference | Local Python only | Modal `FoodClassifier` class + deployed HTTP API |
| Secrets / auth | `mise.local.toml` / local `WANDB_API_KEY` | Modal secret `wandb-secret` with `WANDB_API_KEY` for cloud eval |
| Config files | — | `wandb.env` + `wandb.env.example`, `requirements.txt`, `.gitignore` |

### Code changes (summary)

- **`common.py`** (new) — `LABEL_MAP`, `predict_food_from_model()`, `load_eval_data()`
- **`modal_app.py`** (new) — Modal app: `train_model`, `FoodClassifier`, `run_evaluation`, local smoke-test entrypoint
- **`train_model.py`** — Uses `common.LABEL_MAP`; disables wandb via `WANDB_DISABLED`; updated `CosineSimilarityLoss` import path for `sentence-transformers` 5.x
- **`eval.py`** — No import-time model load; uses `common` helpers
- **`HotDogModel.py`** — Delegates to `eval.py` for local runs

## Quick Start

### Local (same as upstream)

```bash
pip install -r requirements.txt
python train_model.py
python eval.py   # requires ./food-classifier-model and W&B credentials
```

With [uv](https://github.com/astral-sh/uv): `uv run train_model.py` and `uv run eval.py`.

### Modal (cloud)

```powershell
cd HotDogFoodClassifier
pip install python-dotenv modal
# Set up wandb.env (see "W&B secret on Modal" below)
modal secret create wandb-secret --from-dotenv wandb.env --force
modal run modal_app.py::train_model
modal run modal_app.py --text "I want a hotdog"
modal deploy modal_app.py
modal run modal_app.py::run_evaluation
```

Train on Modal **before** deploy or evaluation. Weights live on the `food-classifier-store` volume (per Modal workspace).

## Setup

### Prerequisites

- Python 3.13+
- **Local:** pip or uv; optional W&B account for evaluation
- **Modal:** [Modal CLI](https://modal.com/docs/guide) (`modal setup` / `modal token new`)

### Installation

```powershell
cd HotDogFoodClassifier
pip install -r requirements.txt
```

`pip install -e .` may fail on this layout (multiple top-level modules); use `requirements.txt` instead.

### Switching Modal workspaces

```powershell
modal profile list
modal profile activate YOUR_PROFILE
modal token info   # confirm workspace / account ID
```

Secrets, volumes, and deployments are **per workspace**. Recreate `wandb-secret` and re-run training after switching accounts.

## Training Data

The training dataset (`training_data.csv`) contains 24 examples (8 per class). Evaluation uses `eval.csv` (14 examples). Format:

```csv
text,label
I love a good hotdog with mustard and relish,hotdog
Juicy hamburgers fresh off the grill are amazing,hamburger
The weather is nice today,unknown
```

## Training the Model

### Local

```bash
python train_model.py
```

Saves to `./food-classifier-model`.

### Modal

```powershell
modal run modal_app.py::train_model
```

Uses a T4 GPU, saves to the volume, runs smoke-test predictions, then `volume.commit()`.

### Training configuration

- Base model: `sentence-transformers/all-MiniLM-L6-v2`
- Batch size: 16, iterations: 20, epochs: 1
- Loss: `CosineSimilarityLoss`

## Using the Model

### Python API (local)

```python
from setfit import SetFitModel

model = SetFitModel.from_pretrained("./food-classifier-model")
predictions = model.predict(["I love hotdogs with ketchup"])
```

### Modal HTTP API

After `modal deploy modal_app.py`, `POST` JSON to the printed URL:

```json
{"text": "I'm craving a hotdog with sauerkraut"}
```

### Label mapping

- `0` = hotdog, `1` = hamburger, `2` = unknown

## Evaluation with W&B Weave

### Local

Set `WANDB_API_KEY` (e.g. in `mise.local.toml` per upstream) or `wandb login`, then:

```bash
python eval.py
```

### W&B secret on Modal

1. Copy `wandb.env.example` → `wandb.env`
2. Paste your full key from https://wandb.ai/authorize (40+ characters, usually starts with `wandb_v1_`)
3. Create the secret:

```powershell
pip install python-dotenv
modal secret create wandb-secret --from-dotenv wandb.env --force
```

4. Run:

```powershell
modal run modal_app.py::run_evaluation
```

The app mounts `secrets=[modal.Secret.from_name("wandb-secret")]` and expects the env var name **`WANDB_API_KEY`**.

## Modal reference

| Step | Command |
|------|---------|
| Train on GPU | `modal run modal_app.py::train_model` |
| Smoke-test prediction | `modal run modal_app.py --text "Chicago-style hotdog"` |
| Deploy HTTP API | `modal deploy modal_app.py` |
| Run Weave eval | `modal run modal_app.py::run_evaluation` |

## Project structure

```
HotDogFoodClassifier/
├── training_data.csv
├── eval.csv
├── common.py                 # Shared labels, predict, eval loader
├── train_model.py            # Training (local + Modal)
├── eval.py                   # Local Weave evaluation
├── HotDogModel.py            # Local eval entry point
├── modal_app.py              # Modal train / predict / eval / API
├── requirements.txt
├── pyproject.toml
├── wandb.env.example         # Template for Modal secret
├── wandb.env                 # Your key (gitignored)
├── food-classifier-model/    # Local saved weights (gitignored)
└── README.md
```

## Troubleshooting (common roadblocks)

### Wrong directory for Modal commands

**Symptom:** `FileNotFoundError: ...\modal_app.py` (path under your home folder, not the project).

**Fix:** `cd` into `HotDogFoodClassifier` first, or pass the full path to `modal_app.py`.

---

### `uv` not recognized (Windows)

**Symptom:** `uv : The term 'uv' is not recognized`.

**Fix:** Use `pip install -r requirements.txt` and `python train_model.py`, or install uv separately. Modal does not require uv.

---

### Modal image build: `add_local_*` order

**Symptom:** *"An image tried to run a build step after using `image.add_local_*`"*.

**Fix:** All `pip_install` / `env` steps must come **before** any `add_local_file` / `add_local_python_source` in `modal_app.py` (already fixed in this fork).

---

### `ImportError: cannot import name 'default_logdir' from 'transformers.training_args'`

**Symptom:** Training fails on Modal or locally after a fresh `pip install`.

**Cause:** SetFit 1.1.x is incompatible with **Transformers 5.x**.

**Fix:** Pin `transformers>=4.41,<5` (see `requirements.txt` / `modal_app.py` image).

---

### `SetFitTrainer.__init__() got an unexpected keyword argument 'args'`

**Cause:** Legacy `SetFitTrainer` does not accept `TrainingArguments` like the newer `Trainer` API.

**Fix:** Use `WANDB_DISABLED=true` only (no `args=` on `SetFitTrainer`) — already applied in `train_model.py`.

---

### W&B during training (login prompt / API key errors)

**Symptom:** Training tries to log to wandb or asks for a key.

**Fix:** Training sets `WANDB_DISABLED` in `train_model.py` and at the start of Modal `train_model()`. W&B is only required for **evaluation**, not training.

---

### `API key must have 40+ characters, has 6` or `401 Unauthorized` on eval

**Causes:**
- Modal secret still has a placeholder (e.g. literal `secret` = 6 chars)
- `modal secret create --from-dotenv wandb.env` **failed** because `python-dotenv` was missing — secret never updated
- Smart/curly quotes in CLI: `WANDB_API_KEY= “...”` instead of straight `"..."`
- Pasting `WANDB_API_KEY=...` in PowerShell as a standalone line (bash syntax; use `wandb.env` + `--from-dotenv` instead)

**Fix:**

```powershell
pip install python-dotenv
# wandb.env must be: WANDB_API_KEY=wandb_v1_<full_key>  (no spaces around =)
modal secret create wandb-secret --from-dotenv wandb.env --force
```

Confirm success message: `Created a new secret 'wandb-secret' with the key 'WANDB_API_KEY'`.

---

### `Each item should be of the form <KEY>=VALUE`

**Cause:** `modal secret create wandb-secret` run without values or without `--from-dotenv`.

**Fix:** Use `--from-dotenv wandb.env` or `WANDB_API_KEY="your_key" --force` with straight ASCII quotes.

---

### Commands pasted into Python `>>>` REPL

**Symptom:** `SyntaxError` on `pip install`, `modal run`, or `WANDB_API_KEY=...`.

**Fix:** Type `exit()` to leave Python; run shell commands in **PowerShell** (`PS C:\...>`).

---

### Pylance: `Import "sentence_transformers.losses" could not be resolved`

**Cause:** IDE interpreter missing `sentence-transformers`, or deprecated import path.

**Fix:** `pip install sentence-transformers`; select correct interpreter in Cursor. This repo uses:

`from sentence_transformers.sentence_transformer.losses import CosineSimilarityLoss`

---

### `pip install -e .` fails (multiple top-level modules)

**Fix:** `pip install -r requirements.txt` instead of editable install.

---

### Deploy / eval before training on a new Modal workspace

**Symptom:** Model or volume not found.

**Fix:** Run `modal run modal_app.py::train_model` once per workspace; recreate `wandb-secret` after switching profiles.

## How it works

SetFit uses contrastive learning on sentence embeddings, then a small classification head. See the [original README](https://github.com/trashhalo/food-classifier/blob/master/README.md) and [SetFit docs](https://huggingface.co/docs/setfit) for more detail.

## References

- [thefeufollet](https://github.com/thefeufollet) — Modal adaptation
- [Original repository](https://github.com/trashhalo/food-classifier)
- [SetFit Documentation](https://huggingface.co/docs/setfit)
- [SetFit Paper](https://arxiv.org/abs/2209.11055)
- [Modal Documentation](https://modal.com/docs)
- [Weights & Biases Weave](https://wandb.ai/site/weave)

## License

MIT (same as upstream)
