## MODIFIED Requirements

### Requirement: Explicit standalone panel capabilities
Standalone date panels SHALL aggregate explicit public capabilities rather than forwarding all private renderer props.

#### Scenario: Private renderer additions
- **WHEN** a private renderer parameter is added
- **THEN** it does not automatically enter public picker props
- **AND** currentDate remains renderer glue rather than an inert public setting.
