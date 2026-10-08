# Validation — 2026-09-30

- Shared theme contract: 64 system names, 39 values, 555 component values, 38 name contracts; passed.
- All theme audit scripts, including the new FieldDecorator audit: passed. FieldDecorator: 384 value/override checks. Tag presets: 2080 contrast pairs, minimum 4.529:1. InputTag: 80 content states.
- Token consumer graph unit tests and 441 governed declarations: passed.
- Full inventory: 134 component token files, 3906 declarations, zero compilation errors; 91 candidates remain for manual review. This is not proof of full-library conformance.
- Cedar InputTag, Tag and FieldDecorator: 27 tests passed. Vitest reported a teardown timeout warning after successful tests; exit code was zero.
- Maple Tag: 18 tests passed. Maple FieldDecorator: 6 tests passed.
- Cedar declaration typecheck and scoped InputTag ESLint: passed. Maple global lint: passed.
- Copied-component check, 101 paired demo check and 18 Input/FieldDecorator source pairs with both Less compilers: passed.
- Both OpenSpec changes validated in strict mode. Optional telemetry failed DNS in the restricted environment; validation itself passed.
- Browser spot checks: Cedar InputTag five sizes, xl creation/removal, disabled custom-color restrictions, light/dark filled focus; Cedar Tag 13 presets, default/outline in light/dark. No Maple browser or complete component matrix claimed.
- Temporary browser fixture and server removed/stopped after validation; no application data removed.

Remaining work is explicitly tracked in design-ui/audits/token-closure-progress.md. No full-library release/build or all-token completion claim.
