# Validation

- Consumer resolution: 308 compiled DOM/cascade/override assertions pass.
- Inventory --check-consumers --summary: 134 token files, 4026 declarations, 54 cross-component consumers, 5 reviewed literal runtime consumers, 20 reviewed dynamic Space consumers; zero unresolved candidates and zero compile errors at this checkpoint.
- Cedar: 24 test files / 133 tests pass; Maple: 18 files / 144 tests pass.
- Maple lint: passed. Copied components including PageHeader/Image core: passed.
- Full build/type/browser validation belongs to the integrated root stage; these are not substituted by synthetic cascade tests.

Additional final checks: Maple PageHeader/Image 9 files / 75 tests and Cedar FilterForm 1 file / 5 tests pass. Both OpenSpec changes validate in strict mode (exit 0; optional telemetry network errors do not affect validation). Dialog reduced-motion and coarse-pointer PageHeader feedback are included in the 308 assertions. Image preview RGBA channels above 255 were normalized to 255, preserving browser-clamped appearance.
