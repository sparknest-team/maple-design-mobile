## ADDED Requirements
### Requirement: Independent field opening target
Picker fields SHALL accept open-trigger-target with field and icon values, defaulting to field. Field includes input, label, separator, blank area and suffix trigger; clear, remove and other independent action buttons are excluded. Icon opens only from the suffix trigger for pointer interaction, regardless of input editability.
#### Scenario: Edit or copy without opening
- **WHEN** icon mode is active and the user focuses, edits, selects or copies field text
- **THEN** the query/value may update according to existing editing rules and the closed panel remains closed
#### Scenario: Explicit opening remains accessible
- **WHEN** the user activates the enabled suffix button or an explicit keyboard open command
- **THEN** the panel opens without losing the input draft
#### Scenario: Blocked fields
- **WHEN** the field is disabled or readonly
- **THEN** pointer and keyboard activation do not open it
