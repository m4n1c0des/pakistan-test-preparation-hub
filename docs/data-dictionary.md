# Question data dictionary

| Field | Meaning |
|---|---|
| `id` | Stable unique ID in the `PTH-0001` sequence. |
| `exam_tags` | Relevant preparation tracks; never means the item appeared in that exam. |
| `subject`, `topic` | Main subject and topic. |
| `difficulty` | Editorial `easy`, `medium`, or `hard`; not psychometrically calibrated. |
| `cognitive_level` | `remember`, `understand`, `apply`, `analyze`, or `evaluate`. |
| `question_type` | Currently `single_choice` only. |
| `prompt`, `options` | Stem and four A–D choices. Exactly one answer is intended. |
| `correct_answer` | Correct option key. |
| `explanation` | Reasoning, calculation, or concept behind the answer. |
| `origin` | Provenance; v2 and v3 additions are `original_practice`. |
| `source_reference` | Optional source for an openly licensed adaptation. `null` for original questions. |
| `alignment_references` | Official syllabus/competency pages used to align the topic; not the origin of the question. |
| `competency_area` | Optional named NSCT competency area for coverage analysis; it is not a claim of official question allocation. |
| `review_status` | Distinguishes the 80 editorially reviewed legacy items from v2/v3 items that passed automated checks but still need independent human review. |
| `language` | Language code; current MCQs are English (`en`). |

Future coding, essay, speaking, listening, multi-select, and numerical-response tasks need separate schemas rather than being forced into this MCQ format.


## Version 3 optional field

- `explanation_ur`: optional short Roman Urdu learning note. It is not necessarily a full translation of the English explanation; presence does not imply independent review.
