## ADDED Requirements

### Requirement: Configurable mention search

Mention SHALL count characters after the active prefix against minSearchLength before searching. autoCommitSingle SHALL default to false and SHALL only commit the single enabled result of the current search while editing remains active.

#### Scenario: Query falls below threshold

- **WHEN** a query is shortened below minSearchLength
- **THEN** the pending request is cancelled and stale candidates cannot be committed
