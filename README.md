# Pakistan Test Preparation Hub

**Free, open-source practice platform** for Pakistani students preparing for NSCT, NTS NAT/GAT, HEC tests, MDCAT, ECAT, CSS, FPSC/PPSC and related examinations.

> Independent learning resource. Not affiliated with any testing body. Always verify the latest official syllabus, pattern and dates.

## Features

| Feature | Status |
|---------|--------|
| Landing page & dashboard | ✅ |
| Exam / subject / difficulty filters | ✅ |
| Keyword search | ✅ |
| Randomized practice with instant explanations | ✅ |
| Timed mock tests (timer, mark-for-review, navigator) | ✅ |
| Score, accuracy & subject-wise results | ✅ |
| Bookmarks (browser localStorage) | ✅ |
| Dark / light / system theme | ✅ |
| Responsive mobile + desktop layout | ✅ |
| 500 original practice MCQs | ✅ |
| Static site — works on free hosting | ✅ |

## Quick start (no build step)

```bash
# Clone or download
cd pakistan-test-prep-hub

# Option A — any static server
python -m http.server 8080
# then open http://localhost:8080

# Option B — VS Code Live Server / any browser extension
# Option C — deploy the whole folder to GitHub Pages, Netlify, Cloudflare Pages, etc.
```

No Node.js, no bundler, no database required.

## Project structure

```
pakistan-test-prep-hub/
├── index.html          # Landing
├── practice.html       # Practice engine
├── mock.html           # Timed mock engine
├── results.html        # Score & review
├── dashboard.html      # Bank overview
├── bookmarks.html      # Saved questions
├── css/styles.css      # Design system
├── js/
│   ├── data.js         # Loaders, filters, localStorage
│   └── layout.js       # Header / footer / theme
├── data/
│   ├── questions.json  # 500 MCQs (canonical)
│   └── blueprints.json # Mock configurations
├── question-bank/      # Source bank + index + answer key
├── scripts/
│   └── validate_question_bank.py
├── docs/               # (expandable)
└── .github/workflows/  # CI stub
```

## Question bank notes

- All 500 items are **original practice questions**.
- They are **not** past papers and must not be labelled as such.
- Review status: 80 editorially reviewed; 420 passed automated checks and await independent subject-matter review.
- Difficulty labels are editorial estimates.
- Exam tags indicate topic alignment, not appearance in a real exam.

Validate the bank:

```bash
python scripts/validate_question_bank.py
```

## Technology

- HTML5 + CSS3 (custom properties, no framework)
- Vanilla JavaScript (ES modules not required)
- JSON data files
- Python for validation scripts only
- GitHub for version control and free static hosting

Designed for limited hardware and zero budget.

## Disclaimer

Exam patterns change. Confirm current rules with NTS, HEC, PMDC, UET, FPSC and other official bodies. This project is educational only.

## License

See LICENSE. Content intended for free educational use.
