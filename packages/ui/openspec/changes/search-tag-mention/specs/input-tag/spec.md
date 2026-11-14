## ADDED Requirements

### Requirement: Searchable tag candidates

InputTag SHALL accept local candidate arrays or an asynchronous options loader. Search SHALL start only when the query meets minSearchLength. Selecting a candidate SHALL preserve its value in the model and display its label.

#### Scenario: Pasted input resolves to one candidate

- **WHEN** the input reaches the configured search length and the current search returns one enabled candidate with autoCommitSingle enabled
- **THEN** the component commits the candidate value and displays its label

#### Scenario: A stale search resolves

- **WHEN** input changes or focus leaves before a remote search resolves
- **THEN** the stale result MUST NOT commit a value

#### Scenario: Multiple candidates

- **WHEN** more than one enabled candidate matches
- **THEN** the user chooses a candidate from the list

### Requirement: Single tag mode

InputTag SHALL default to multiple tags and an array model. When multiple is false, it SHALL emit a scalar for a tag, replace an existing tag with a new one, and clear to null unless an explicit emptyValue overrides clearing.

#### Scenario: Replace a single tag

- **GIVEN** multiple is false and a tag is selected
- **WHEN** the user enters or selects a new value
- **THEN** the new value replaces the old tag and the model receives the scalar value

#### Scenario: No search result

- **WHEN** a search finishes successfully with no matching candidates and the user presses Enter
- **THEN** the typed value is saved; loading or failed searches do not create a tag

### Requirement: Selected label customization

InputTag SHALL expose formatLabel and a label slot using selected item data. The label slot SHALL take priority over formatLabel; neither SHALL alter search matching or model values. Existing selected primitive values SHALL resolve from current options, then fallbackOption, cached selections, and finally the raw value. The former formatTag prop and tag slot are removed by explicit product decision.

#### Scenario: Customize selected content

- **WHEN** an application supplies both formatLabel and the label slot
- **THEN** the slot determines the selected content
