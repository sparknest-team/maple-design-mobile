## ADDED Requirements

### Requirement: Real token consumers
Every declared component CSS token SHALL reach compiled CSS or a reviewed executable runtime path. A comment containing a token name SHALL NOT exempt that token from review.

#### Scenario: Unreviewed declaration is introduced
- **WHEN** the inventory runs with --check-consumers and a declaration has no reviewed consumer
- **THEN** the command fails and identifies the candidate without automatically deleting it

### Requirement: Effective size geometry
Cedar Form and Tree SHALL expose effective xs, sm, md, lg and xl geometry.

#### Scenario: Size-specific customization
- **WHEN** the size-specific form margin or tree icon variable changes
- **THEN** the corresponding size consumes that value while inline/error precedence and tree line geometry remain coherent

### Requirement: Explicit layout and motion differences
Textarea SHALL expose only actual platform counter layout tokens. Card motion SHALL use common system duration/easing roles and animated surfaces SHALL respect reduced-motion.

#### Scenario: Touch pointer feedback
- **WHEN** PageHeader is used with a coarse or non-hover pointer
- **THEN** hover feedback does not become sticky while keyboard focus-visible feedback remains available
