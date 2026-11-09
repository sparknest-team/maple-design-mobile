## MODIFIED Requirements

### Requirement: Reactive picker layout
Picker SHALL keep local candidates until externally synchronized and preserve retained column nodes during geometry updates.

#### Scenario: Resize and column count
- **WHEN** height/count or visible column count changes
- **THEN** selected rows recenter without synthetic model notifications
- **AND** retained columns keep their nodes and focus.

### Requirement: Service configuration ownership
Picker service SHALL preserve explicit popup containers and keep mutable service state separate from caller configuration.

#### Scenario: Frozen configuration
- **WHEN** the service receives frozen options
- **THEN** it can open and settle without mutating the input object.
