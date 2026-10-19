# Punto

A Spanish practice platform built from the supplied `Pruebas de Estado.zip` archive.

## Contents

- 60 interactive questions from the 2005-1 booklets, checked against the included `respuestas.xls` workbook.
- 80 additional exercises: 60 selections from the five supplied 2023 booklets and 20 original Punto exercises on skills covered by the two supplied 2025 sessions. New answers are independently worked solutions, not attributed to an official answer key.
- 140 questions across five areas: Mathematics (26), Reading (27), Natural sciences (35), Social studies (26), English (26).
- Guided practice with feedback, configurable timed simulations, full answer review, bookmarks, browser-local progress, JSON progress import/export, and CSV results.
- A searchable library of 111 unique PDFs: 106 historical sources from 2003–2010 and five 2023 booklets. Original source files are retained under `archive/`.
- Responsive keyboard-accessible interface; practice question selection supports number keys 1–4.

The subject grouping is for study and does not claim to reproduce the current exam. Results are raw practice percentages, not scaled official scores. Explanations are independently written instructional notes, not official ICFES explanations. Questions have minor screen-reading adaptations; each includes a link and page reference to its original. Question 16 of mathematics was withdrawn in the source and is excluded. Mathematics questions 21–24 accept both alternatives explicitly listed in the historical key. Mathematics 15 and Language 8 remain excluded pending formulation/key review.

## Run and maintain

The site is static: the repository root is the deployment root. It has no external font, JavaScript or CSS dependency and no server database. User progress stays in `localStorage`; it is not shared across students, devices or browsers. Export/import provides manual transfer.

Run checks with `node --test tests/*.test.mjs`. The flow tests execute application handlers with a minimal DOM adapter and do not replace visual browser testing. 

To rebuild the supplied bank and source catalog, run `python scripts/prepare_bank.py '/path/to/Pruebas de Estado.zip'`. It requires `xlrd` for the historical answer workbook. Question records and explanations are maintained in that script, and the generated static content is `bank.json`. When adding questions, verify their source, accepted answer(s), formatting, numbering, and permissions for the intended audience.

Published source: [Karbian/Punto-Saber-GLM](https://github.com/Karbian/Punto-Saber-GLM). Prepared for GitHub Pages with GitHub Pages. In repository Settings → Pages, choose “Deploy from a branch”, branch `main`, folder `/ (root)`. The `.nojekyll` file enables direct static publishing. No build step or external dependencies are needed for the website. To edit the question selection, update `scripts/prepare_bank.py` and rebuild from the original archive.

## Updating the training material

New records and worked solutions are maintained in `data/new-material.json`. Run `python scripts/merge_material.py` to merge them idempotently into `bank.json`; the historical rebuild also runs this merge. Keep the five 2023 PDF sources under `archive/2023-1/`. Four duplicate uploads were omitted. The two 2025 scanned booklets carry a reproduction restriction and are not included in the public repository; their skills informed entirely new practice items with original wording, contexts and values.

The design and stylesheet are unchanged. All 60 original question IDs and historical answer metadata are retained so browser-local progress remains compatible. English question 8 from 2023 correctly has three answer choices; no extra option is invented. New questions identify their source period and their independent solution provenance in practice and review.
