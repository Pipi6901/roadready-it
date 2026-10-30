# Translation QA — summary

Bank: content/listato/content.json, 7020 statements (6733 unique texts). German and French are the ministry's own and were not touched.

Every translation and check was produced by independent model runs (Claude Opus and Claude Sonnet); scripts only compared outputs. Each run saw only what its step allows: translators the Italian and the glossary, back-translators only the translation.

| Lang | Entries | Empty | Numbers missing | Italian leftovers | Back-translation sample (150 ids): discrepant | Negation/limiter pass: statements / flagged | Left flagged |
|---|---|---|---|---|---|---|---|
| en | 7020 | 0 | 0 | 0 | 7 (4.7%) | 1124 / 5 | 0 |
| ro | 7020 | 0 | 0 | 0 | 5 (3.3%) | 1124 / 8 | 0 |
| uk | 7020 | 0 | 1 | 0 | 12 (8.0%) | 1124 / 16 | 0 |
| es | 7020 | 0 | 0 | 0 | 8 (5.3%) | 1124 / 6 | 0 |
| ar | 6993 (+27 unresolved) | 0 | 0 | 0 | full pipeline, see ar-report.md | all 6733 audited | 27 ids (0.38%) kept in Italian |

All discrepancies found in the samples and passes were sent back for re-translation and re-audit; the per-language reports list each one with the before/after text.

Files:
- `{lang}.json` (one level up): the translations, keyed by question id.
- `glossary-{lang}.md`: one rendering per term for the whole bank.
- `{lang}-report.md` / `{lang}-report.json`: QA report.
- `{lang}-auto-checks.json`: raw automatic-check output.
- `ar-markers.json`: dangerous elements per id (step 1).
- `ar-unresolved.json`: Arabic statements still disputed after 4 rounds, with every attempt; the app shows the Italian for them.
- `source-issues.md` / `.json`: typos noticed in the Italian source.
