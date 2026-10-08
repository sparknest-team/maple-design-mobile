## ADDED Requirements

### Requirement: Effective field variant overrides
FieldDecorator SHALL consume its outline error and standard error/disabled public color variables on both platforms.

#### Scenario: Error and disabled overlap
- **WHEN** an error field is disabled while focus or hover is present
- **THEN** its visible border uses the variant disabled token and ignores the error color

#### Scenario: Local error customization
- **WHEN** the public variant error token is overridden
- **THEN** the corresponding error border consumes that override

### Requirement: Readable Tag presets
Default preset Tag foregrounds SHALL have at least 4.5:1 contrast for selected non-loading default/outline states, with and without hover, on the five governed system surfaces across both brands and modes.

#### Scenario: Transparent dark backgrounds
- **WHEN** a preset dark background is translucent
- **THEN** contrast is measured after composition with the host surface and page

### Requirement: InputTag host interaction ownership
Cedar InputTag SHALL support xs/sm/md/lg/xl content tokens and retain parent interaction restrictions.

#### Scenario: Child props request interaction
- **WHEN** a disabled or readonly InputTag receives closable or checkable tagProps
- **THEN** the child cannot expose a mutable close/check interaction

#### Scenario: Keyboard removal
- **WHEN** Backspace targets a loading or explicitly non-closable tag
- **THEN** that tag is not removed
