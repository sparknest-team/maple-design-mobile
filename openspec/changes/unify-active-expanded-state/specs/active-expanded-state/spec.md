## ADDED Requirements

### Requirement: Exact active option contexts
Menu MUST expose `{ option, active, level }` consistently through option render functions and scoped slots. NavMenu MUST expose `{ option, active, expanded, level }` through its node render functions, slots and nodeProps. Active MUST mean that the current ordinary item itself matches the primary model. Ancestor state MUST remain private.

#### Scenario: Child is active
- **WHEN** the primary model identifies a child
- **THEN** the child active is true and its parent active is false
- **AND** internal ancestor emphasis remains available

### Requirement: Independent entry activation and emphasis
NavMenuItem MUST derive entry active from its name matching the root activeItem, or from a matching ordinary option in standalone mode. It MUST use highlight to override visual emphasis without changing active or the primary value.

#### Scenario: Emphasis and opening without a valid choice
- **WHEN** highlight is true or open is true and an independent entry has no matching ordinary option
- **THEN** its public active remains false and initialization emits no primary value update

### Requirement: Expanded collapse slot context
Collapse and CollapseItem expand-icon slots MUST receive `{ expanded, disabled, position }`, without active.

#### Scenario: Controlled value update is rejected
- **WHEN** an item requests an expanded-name change and the parent keeps modelValue unchanged
- **THEN** the slot expanded state remains consistent with the accepted modelValue

### Requirement: Retained active semantics in TabBar and Steps
TabBar item active MUST follow the item name matching its model. Step active MUST follow its 1-based step number matching its model independently of its status. Neither MUST introduce selected or current as replacement slot names.

#### Scenario: Current step has an error
- **WHEN** the model identifies the step and its status is error
- **THEN** active remains true while status remains error
