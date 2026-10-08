## ADDED Requirements

### Requirement: Source-derived variable reference
The documentation SHALL expose a menu-accessible reference describing each component variable's layer, declared value, selector condition and known consumer.

#### Scenario: Token source changes
- **WHEN** a declaration changes without regenerating the reference
- **THEN** the reference check fails with the affected page

### Requirement: Explicit platform defaults
Every system token SHALL have exactly one governed default for each platform, shared when semantically equal and platform-specific otherwise.

#### Scenario: Platform default drifts
- **WHEN** a registered default no longer matches source
- **THEN** contract validation fails without silently rewriting the expected contract

### Requirement: Honest validation evidence
The reference SHALL distinguish compiled reachability from rendered visual acceptance.

#### Scenario: Runtime or conditional consumer
- **WHEN** a variable is only conditionally consumed
- **THEN** the reference preserves that condition and does not claim universal visible behavior
