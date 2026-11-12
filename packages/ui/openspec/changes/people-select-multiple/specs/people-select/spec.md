## ADDED Requirements

### Requirement: Multiple personnel identities

PeopleSelect SHALL accept multiple with string array values in both platforms, retaining string or null values for single selection. Multiple defaults and clearing SHALL use fresh empty arrays unless emptyValue overrides clearing. Controlled and uncontrolled ownership, disabled/readonly guards and deferred confirmation SHALL follow Select.

#### Scenario: Choose and remove people

- GIVEN an editable multiple PeopleSelect
- WHEN the user selects two people and removes one
- THEN model updates contain ordered string arrays and the remaining name stays visible

### Requirement: Remote selection display

Selected people SHALL retain labels and avatars when a new search replaces options. Missing identities SHALL resolve fallbackOption individually. Reading mode SHALL display all selected people and scope actions to each person without fetching candidates.

#### Scenario: Search after choosing

- GIVEN Alice and Bob selected from previous search results
- WHEN a new search returns only Carol
- THEN Alice and Bob remain displayed and selectable for removal

### Requirement: Soft option surfaces

Select and PeopleSelect SHALL use inset rounded option surfaces in direct and deferred editors, preserve selected feedback while hovering, and retain disabled and keyboard active states. Mobile touch heights SHALL remain unchanged.

#### Scenario: Hover a selected option

- GIVEN a selected enabled option
- WHEN it is hovered or keyboard active
- THEN its selected surface remains visible
