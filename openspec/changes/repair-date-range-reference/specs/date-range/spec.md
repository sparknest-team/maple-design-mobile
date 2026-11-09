## MODIFIED Requirements
### Requirement: Native reference placeholder parity
Explicit string placeholders, including empty strings, SHALL apply to both endpoints. Arrays SHALL preserve endpoint positions and caller data. Omitted values SHALL retain existing localized fallbacks.
#### Scenario: Explicit string in deferred mobile mode
- WHEN hint=false and placeholder is a string
- THEN both native inputs show the explicit text, as in direct mode.
### Requirement: Readonly is focusable and independently disabled
Readonly reference inputs SHALL remain enabled and readonly for focus/copy, while editing, clearing and opening are blocked. Global and per-endpoint disabled values SHALL retain precedence.
#### Scenario: Readonly with a disabled start
- WHEN readonly=true and disabled=[true,false]
- THEN start remains disabled, end remains focusable/readonly, and neither opens an editor or publishes a value.
