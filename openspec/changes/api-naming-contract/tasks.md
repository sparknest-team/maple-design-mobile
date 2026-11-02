- [x] Publish semantic naming rules and the final component matrix in the canonical shared API standard.
- [x] Link the standard from both required component and AI collaboration guides.
- [x] Register reviewed declarations and explicitly list outstanding API/type/value migrations.
- [x] Add AST naming checks and connect both lint paths and shared CI checks.
- [x] Verify the checker behavior, registry, integration and CI entry contracts.

- [x] Implement approved property/type/value migrations and synchronize callers, examples, docs and styles.
- [x] Complete affected behavior, type, lint and naming-contract checks for the final API.

Final validation: Cedar 66 behavior tests, Maple 61 behavior tests and one Notification SSR test passed. Both full typecheck and lint commands passed; 11 naming tests and two CI contract tests passed. The naming registry has zero pending migrations. Bilingual API member/type/default contracts passed. Remaining localization gaps are resolved: all 210 registered bilingual component families regenerate with zero missing translations and zero drift. Localized demo references, page grouping and public API descriptions are synchronized; both documentation pipelines passed.
