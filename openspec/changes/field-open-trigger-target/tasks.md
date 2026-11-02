- [x] Add independently copied public props and shared trigger guards.
- [x] Update temporal, selection and hosted references with accessible suffix buttons.
- [x] Verify editing, copying, clearing, keyboard opening, disabled/readonly, and controlled state.
- [x] Update examples, docs, IDE metadata and run lint, types and same-source gates.

Validation: Maple 43 files / 272 tests passed; Cedar current family 32 plus 21 shared field tests passed. Both full typecheck commands and all 12 cross-platform gates passed. Maple demo syntax check: 1518 files, zero failures. Browser verified date/time editing and copying without opening, suffix-button opening, range popup targets, Select/Cascader search and clear, and field-mode opening.

Additional validation: Trigger foundation and field integration passed; both platforms preserve ordinary reference event cancellation semantics. CLI highlight regression: 6 tests passed; both languages generate exactly one opening-target hint for each of the six shared fields. All fourteen Cedar demo links resolve. A 320px Select reference opens a 320px popup in the browser.
