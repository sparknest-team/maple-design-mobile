# Validation

- Cedar: FormSection + existing layout contract, 17/17 passed.
- Maple: FormSection + existing layout contract, 17/17 passed.
- Tests cover public registration, visual scope, parent context identity, reactive horizontal/vertical/inline layout, label flex and disabled inheritance, validation/reset/submission, and unique accessible SSR IDs.
- Touched source/demo files passed targeted ESLint; the Maple gallery import order and formatting reported by the full lint run were corrected and rechecked.
- Maple full typecheck passed. Cedar full typecheck reports pre-existing readonly Console assignments in src/_utils/maple/test.ts:227,231; no errors were reported in the section implementation.
- API document structure: 11/11 passed. Targeted Form demo grouping and API normalization pass for both platforms/locales. The full grouping run also encounters unrelated nested-tabs cases missing from their existing manifests.
- Ego Lite task Space 44, using an isolated local Vite preview of actual source components: desktop control columns align inside/outside sections; header gap is 32px and post-divider gap is 24px on both platforms. At 390px, neither form nor page overflows horizontally. Actual textarea input succeeds on both platforms. Task Space and preview server closed after validation.
- Final preview: /Users/shuaimeng/.codex/visualizations/2026/11/16/01a1e35c-c083-7630-b71b-3ba11993bca0/form-section-cedar-maple.png

## Maple documentation integration follow-up

The real 8080 desktop docs and embedded phone preview initially rendered unresolved mp-form-section elements. The CLI site resolver now recognizes explicit public source component exports absent from the installed resolver registry, preserving importStyle=false and excluding unknown private names.

CLI build:node passed. Site resolver regressions: 13/13 passed. Targeted ESLint and API naming passed. The full lint run also reported unrelated input-tag errors; its new resolver curly-brace error was corrected and rechecked.

Real docs after restarting the existing 8080 service: section title 现场处置, visible 1px heading/end dividers, no unresolved tags. Desktop end divider width 538px at the default layout; visible default embedded phone divider 335px. A 390px embedded phone viewport shows a 269px heading line and 360px end divider, with all field columns aligned. The full gallery reports horizontal overflow somewhere outside this display check; no claim of whole-gallery overflow clearance is made. Standalone mobile routes intentionally redirect desktop user agents, so the final narrow viewport check uses the real embedded preview.

Screenshot: /Users/shuaimeng/.codex/visualizations/2026/11/16/01a1e35c-c083-7630-b71b-3ba11993bca0/maple-form-section-docs.png
Task Space 46 closed after visual inspection.

## Variant and header action demos

- Both platforms expose `variant: line | plain | card`, defaulting to `line`. Card boundaries replace the optional end divider. Switching variants preserves field instances and values.
- Both locale docs include interactive style/marker/end-divider controls and a header-action example. Applying or clearing the section affects only its three fields and preserves the outside skill field.
- Cedar FormSection/layout tests: 18/18 passed. Maple FormSection/layout tests: 18/18 passed. Cedar shared demo locale tests: 10/10 passed.
- Full typechecks passed on both platforms. Targeted source/demo ESLint, API naming, component specs, and Form demo grouping/document normalization passed.
- Maple full lint was executed and reports an unrelated formatting issue in `packages/ui/src/_components/field-presentation/with-field-presentation.ts:259`; the FormSection files pass targeted lint.
- Ego Lite Space 51: Maple documentation and its actual 390px example iframe support all three styles without horizontal overflow. Style switching retains input. Applying and clearing the template updates only the section fields; an outside L4 value remains intact.
- Cedar documentation service recovered after a clean development-cache restart and cold compilation. Real page verification passed: plain has no heading line, card has a 1px border without duplicate dividers, and line has heading/end dividers. All switches retain the textarea draft. Apply/clear updates only the three section fields and preserves outside L4.
