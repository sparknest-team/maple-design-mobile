## ADDED Requirements

### Requirement: Observable validation contract
Forms SHALL retain platform-specific rule engines while exposing typed error results and notification events.

#### Scenario: Unexpected rule failure
- **WHEN** a custom validator throws or rejects
- **THEN** imperative validation rejects with the same error
- **AND** current validating feedback releases without affecting a newer task.
