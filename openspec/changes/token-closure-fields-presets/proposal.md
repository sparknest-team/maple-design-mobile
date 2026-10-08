# Token closure: field consumers and preset contrast

## Why

Declared tokens are not necessarily consumed. FieldDecorator exposes error/disabled overrides that do not reach their target border; Tag preset foregrounds need readable defaults. Cedar InputTag also lacks xl content styling and allows child props to bypass host interaction guards.

## What Changes

- Connect outline error and standard error/disabled border variables on both platforms; disabled wins when combined with error/focus/hover.
- Use border-subtle as the disabled underline default, preserving the rendered disabled border role.
- Remove 40 Cedar and one Maple unused internal field declarations; retain live cross-component field/Search consumers.
- Use palette step 9 for chromatic Tag preset text/icons, content-secondary for gray, and step 2 for gold light hover.
- Cedar only: add three xl content tokens; host disabled/readonly overrides child close/check interaction; keyboard removal respects closability/loading.
- Maintain shared contract, regression checks, release notes and both menu guides.

## Boundaries

This change does not complete all-library token governance or Message variant design. The full inventory and remaining review candidates are tracked in design-ui/audits/token-closure-progress.md.
