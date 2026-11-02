- [x] Define value-domain naming and audit both platforms.
- [x] Migrate implementation, active callers, public types, docs and demos without aliases.
- [x] Verify affected behavior tests, type checks and lint; record actual outcomes.

Validation:
- Cedar: 33 affected test files / 238 tests passed; Segmented orientation transition regression passed (4 tests including the new case).
- Maple: 35 test files / 274 tests passed; Fab axis/expansion regression passed (5 tests including the new case). One existing checkbox demo-language suite cannot load because checkbox-group-options.vue and radio-group-options.vue are missing.
- Both complete typecheck commands and lint commands passed. Focused lint after the last edits passed.
- Carousel cross-platform source/style/test contract passed. Both spec checks passed. Active affected component attributes have no legacy direction usages.
- Maple docs:check inspected 1428 demos; unrelated failures remain in Form English demo exposure and Popup duplicate demo references. Neither file was changed by this migration.
