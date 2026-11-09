## ADDED Requirements

### Requirement: Complete date contracts
Date field and standalone panel documentation SHALL reflect actual exported props and seven public panel events.

#### Scenario: Empty controlled panel
- **WHEN** modelValue is null
- **THEN** both public DatePicker prop types accept the existing explicit-empty state.

#### Scenario: Date panel actions
- **WHEN** actions is customized
- **THEN** confirm/disabled/selectNow/nowDisabled describe the actual scope
- **AND** hosted field saving remains owned by the outer editor.
