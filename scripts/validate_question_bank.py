#!/usr/bin/env python3
"""Validate the structured single-answer MCQ bank using Python's standard library."""
import csv, json, re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
BANK = ROOT / "question-bank" / "questions.json"
INDEX = ROOT / "question-bank" / "question-index.csv"
data = json.loads(BANK.read_text(encoding="utf-8"))
items = data.get("questions", [])
errors, ids, stems = [], set(), set()
allowed_levels = {"remember", "understand", "apply", "analyze", "evaluate"}
allowed_status = {"draft", "editorially_reviewed", "automated_checks_passed_pending_human_review", "needs_revision"}
for i, q in enumerate(items, 1):
    label = q.get("id", f"row {i}")
    if not re.fullmatch(r"PTH2?-\d{4,}", label): errors.append(f"{label}: invalid ID format")
    if label in ids: errors.append(f"{label}: duplicate ID")
    ids.add(label)
    stem = q.get("prompt", "").strip().casefold()
    if not stem: errors.append(f"{label}: empty prompt")
    if stem in stems: errors.append(f"{label}: duplicate question stem")
    stems.add(stem)
    if q.get("question_type") != "single_choice": errors.append(f"{label}: unsupported question_type")
    opts = q.get("options", [])
    keys = [o.get("key") for o in opts]
    texts = [o.get("text", "").strip().casefold() for o in opts]
    if len(opts) != 4 or set(keys) != {"A", "B", "C", "D"}: errors.append(f"{label}: options must be exactly A, B, C, D")
    if len(texts) != len(set(texts)) or any(not t for t in texts): errors.append(f"{label}: option text is blank or duplicated")
    if q.get("correct_answer") not in keys: errors.append(f"{label}: correct_answer does not match an option")
    if not q.get("explanation", "").strip() or len(q.get("explanation", "")) < 10: errors.append(f"{label}: missing/short explanation")
    if "explanation_ur" in q and len(q.get("explanation_ur", "").strip()) < 10: errors.append(f"{label}: explanation_ur is too short")
    for field in ("subject", "topic", "prompt", "difficulty", "cognitive_level", "origin", "review_status", "language"):
        if not q.get(field): errors.append(f"{label}: missing {field}")
    if q.get("difficulty") not in {"easy", "medium", "hard"}: errors.append(f"{label}: invalid difficulty")
    if q.get("cognitive_level") not in allowed_levels: errors.append(f"{label}: invalid cognitive_level")
    if q.get("review_status") not in allowed_status: errors.append(f"{label}: invalid review_status")
    if q.get("origin") not in {"original_practice", "open_license_adaptation"}: errors.append(f"{label}: invalid origin")
    if not isinstance(q.get("exam_tags"), list) or not q.get("exam_tags"): errors.append(f"{label}: exam_tags must be a non-empty list")
if data.get("count") != len(items): errors.append("top-level count does not match questions length")
if data.get("bank_version") != "3.0.0": errors.append("bank_version must be 3.0.0")
# Ensure the CSV index contains exactly the same IDs as the JSON bank.
if INDEX.exists():
    with INDEX.open(encoding="utf-8", newline="") as f:
        csv_ids = [row.get("id") for row in csv.DictReader(f)]
    if set(csv_ids) != ids or len(csv_ids) != len(ids): errors.append("CSV index IDs do not match JSON bank IDs")
else: errors.append("question-index.csv is missing")
if errors:
    print("VALIDATION FAILED")
    print("\n".join(f"- {e}" for e in errors))
    sys.exit(1)
print(f"VALIDATION PASSED: {len(items)} questions; {len(ids)} unique IDs; CSV index synchronized")
