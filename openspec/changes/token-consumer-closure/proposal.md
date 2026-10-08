# Close remaining token consumer contracts

## Why

The all-component inventory identified 91 unresolved CSS token candidates. Most are obsolete layout interfaces; some are valid customization points disconnected from real CSS. Runtime string mentions alone are not proof of consumption.

## What Changes

- Resolve the 89 non-Message candidates: connect 17 live customization points and remove 72 obsolete declarations. Message is covered by its own change.
- Remove the FilterForm comment-only col-gap token and two newly exposed dead internal Radio motion variables; callers customize Grid through numeric gridProps.colGap.
- Add Cedar Form and Tree xl geometry and preserve error/inline precedence.
- Share Card motion roles, repair reduced-motion coverage, and align PageHeader fine-pointer hover/focus-visible feedback.
- Preserve explicit Textarea counter layout differences; no unused cross-platform placeholder tokens.
- Add a reviewed runtime registry, zero-unreviewed-consumer gate, actual declaration/property evidence and detailed migration audit.

## Impact

Public dead tokens are deleted without aliases under the pre-release compatibility policy. New geometry/motion variables are documented. Source, component docs, shared contract and release notes must move together.
