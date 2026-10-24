## ADDED Requirements

### Requirement: Exact option selection in every public render context
Menu MUST provide `{ option, selected, level }` to option label/icon/extra render functions and option-label/option-icon/option-extra scoped slots. MenuOption MUST provide the same context to its label function and default/icon/suffix scoped slots. Public contexts MUST NOT contain active or descendant-selection fields.

#### Scenario: A descendant is selected
- **WHEN** modelValue identifies a child option
- **THEN** the child context selected is true and the parent context selected is false
- **AND** the parent may retain internal selected-path emphasis

#### Scenario: Visual emphasis without selection
- **WHEN** an unselected row receives highlight, focus, pointer hover or submenu expansion
- **THEN** selected remains false and modelValue is not updated

### Requirement: Independent selection, expansion and emphasis APIs
Menu MUST keep modelValue/defaultValue for selection and open/defaultOpen for expansion. MenuOption MUST use highlight for visual emphasis and MUST NOT declare an active prop. Legacy aliases MUST NOT be retained.

#### Scenario: Manual option label renderer
- **WHEN** a label renderer is invoked for a manual MenuOption
- **THEN** it receives one context object with the option, exact selection and level
- **AND** the old two-argument label signature is rejected by the public type contract
