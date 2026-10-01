# Morocco AE

A local invoice generator and quarterly tax-reserve planner for Moroccan auto-entrepreneurs.

The app combines invoice preparation with a month-by-month view of collected turnover. It separates actual receipts from estimates, calculates a planning target for the quarter, and shows how the amount already reserved affects the savings recommendation.

## Features

- Prepare French and English invoices in MAD, USD, or EUR.
- Edit invoice dates, client details, service lines, and optional exchange information.
- Print an A4 invoice or save it as PDF from the browser print dialog.
- Enter collected receipts by month and activity category.
- Distinguish current figures from projected quarter totals.
- Track the reserve target, saved amount, and recommended monthly transfer.
- Compare year-to-date turnover with the AE annual limits.
- Flag the 80,000 MAD same-client services threshold without adding withholding to the normal quarter total.
- Keep tax entries in browser local storage. The app has no account, server, or database.

## Before you run it

Set your own business details in `src/config/business.ts`. The checked-in file uses placeholders. Do not put government identifiers or client-specific information in a public repository.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints a local address to open in your browser.

## Project checks

```bash
npm test
npm run typecheck
npm run build
```

## Tax calculation notes

The calculator uses the 2026 Moroccan General Tax Code rates for auto-entrepreneurs:

- Services: 1% of collected turnover, with a 200,000 MAD annual ceiling.
- Commercial, industrial, and artisanal activities: 0.5% of collected turnover, with a 500,000 MAD annual ceiling.
- IR is rounded to the nearest whole MAD in the calculator.
- The CGI includes a quarterly complementary right associated with AMO. The app labels that amount separately; it is not a percentage of turnover.

**Planning estimate:** the CGI refers to regulatory modalities for selecting the quarterly complementary-right band. I could not verify the method for deriving that band from one quarter alone. The app annualizes the quarter's tax to select the band. Check the displayed breakdown before relying on a projection.

The 80,000 MAD same-client rule is shown as a warning. A foreign payer's withholding obligations need case-specific confirmation, so the app does not add a 30% withholding amount to the normal quarterly calculation.

This is a personal planning tool, not an official declaration service or tax advice. Confirm amounts and rules with the relevant Moroccan authority or a qualified adviser.

## Sources

- [Direction Générale des Impôts, Code Général des Impôts 2026](https://www.finances.gov.ma/Publication/dgi/2025/CGI-2026-FR.pdf), including articles 42 bis, 42 ter, and 73.
- [Moroccan Law 114-13 on auto-entrepreneur status](https://adala.justice.gov.ma/api/uploads/2024/05/07/Loi%20Relative%20au%20statut%20de%20l%E2%80%99auto-entrepreneur-1715071318209.pdf).
- [DGI Note Circulaire 733](https://www.finances.gov.ma/Publication/dgi/2023/NoteCirculaireN733-2023.pdf), guidance on same-client service turnover and withholding.

## Author

[Mohamed Laraiche](https://molaraiche.com)
