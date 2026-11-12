# Verification — 2026-11-11

- Cedar targeted regression: 50 tests passed across PeopleSelect, selection editors and Select clear behavior.
- Maple PeopleSelect regression: 25 tests passed.
- Added tag removal assertions and reran both multiple suites: 9 tests passed per platform.
- Maple demo SFC checks: 1473 checked, 0 failures.
- Changed files pass ESLint after fixes. Full Maple lint:check and API naming checks also passed.
- Cedar and Maple spec checks: 0 errors, 0 warnings.
- Focused parity: 8 changed runtime/style pairs match after standard import/prefix/format normalization. Cedar selection presentation check: 38 source pairs and four Less outputs passed.
- Full Maple selection presentation parity currently stops on an untouched quote-style difference in `_components/selected-options/style/token.less` (single vs double quoted import).
- Initial full type checks stopped on concurrent Upload capture edits (`src/upload/upload.vue:9` / `src/upload/Upload.vue:9`). Those files were preserved. Final p1 API checks passed on both platforms after the concurrent workspace update; this includes the new root/subentry value types and invalid identity assertions. The full typecheck commands were not repeated after that update.
- Independent browser verification: desktop option selection and multiple tags, mobile draft isolation, confirmation and cancellation passed without console/page errors. Desktop option radius is 8px; mobile option radius is 8px, separator is 0px and touch height remains 52px. Light/dark selected surfaces change with theme.
- Browser review resumed in ego-browser Agent TaskSpace 11 after the user's browser preference changed. Desktop selection and selected hover styling passed; TaskSpace was finished with keep: [] and closed.
