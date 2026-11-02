- [x] Replace mixed fields with separate date/time arrays and narrow their public types.
- [x] Remove the public seconds option from paired rules and migrate callers.
- [x] Update bilingual docs, examples, IDE metadata and regression tests.
- [x] Verify component suites, typecheck, docs, lint and cross-source checks.

Validation: the 971-test Maple date/time suite completed with one outdated column-label assertion, corrected and covered by 36 passing focused tests (including two new API contract tests). All 43 affected Cedar tests passed. Both repositories' full typechecks, scoped Maple date/time ESLint, date/time source parity, three source-normalization tests, and all 1,510 demo SFC checks passed. Follow-up: all 99 remaining repository lint errors were fixed. Full Maple ESLint and all 12 cross-platform source checks now pass, together with five normalization regressions, 63 affected component tests, 21 CLI tests, 1,510 demo checks and both repositories' typechecks. Source parity corrections synchronize autofill ownership, optional field adapter hooks and selection tokens; normalization retains checks for changed events, values, import bindings and side effects.
