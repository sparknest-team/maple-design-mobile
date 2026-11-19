> 历史规格。当前实现与导出以 [Section 文档](../../../../../packages/ui/src/section/docs/zh-CN.md) 为准。

## ADDED Requirements

### Requirement: Local form section
The Form module SHALL export FormSection, formSectionProps, FormSectionProps, FormSectionSlots, FormSectionVariant, FormSectionInstance and _FormSectionComponent. Form SHALL register the subcomponent and expose Form.Section. Resolver imports SHALL resolve its styles to the form module.

#### Scenario: Group only onsite handling
- **WHEN** a default line section has title 现场处置 and showEndDivider enabled
- **THEN** its header displays the title, optional accent marker and trailing divider
- **AND** its end divider spans the full form content width
- **AND** following skill/certificate fields remain outside the section

### Requirement: Preserve parent form ownership
FormSection SHALL retain its parent Form context and label registry. It SHALL NOT create a nested form or change model paths. Layout overrides remain owned by Form and FormItem.

#### Scenario: Parent layout updates
- **WHEN** horizontal, vertical or inline layout, label flex, alignment or disabled state changes on Form
- **THEN** fields inside and outside the section inherit the update
- **AND** validation, reset and submit still include fields inside the section

### Requirement: Lightweight themed boundaries
Section styles SHALL use platform-local form-section tokens, with no enclosing border, background or lateral padding in line/plain modes; card provides a themed padded surface and border. Default gaps SHALL be 32px before the heading, 20px from heading to fields, 24px from last field to end divider, and 24px from divider to subsequent fields, accounting for existing field margins. The first section SHALL omit the leading gap.

#### Scenario: Accessible and responsive header
- **WHEN** a section renders a title or description
- **THEN** it uses unique SSR-compatible IDs and labelledby/describedby relationships
- **AND** decorative markers and dividers are hidden from assistive technology
- **AND** the section does not widen the form on narrow screens

### Requirement: Section styles and header actions
FormSection SHALL expose variant line (default), plain and card. Only line SHALL display a heading divider. Card SHALL use its outer border as the ending boundary even when showEndDivider is true. Style changes SHALL retain mounted fields and values. Header extra actions SHALL remain available in every variant.

#### Scenario: Compare styles with an existing draft
- **WHEN** the user enters text then switches among line, plain and card
- **THEN** the same field instances and draft values are retained
- **AND** only the section appearance changes

#### Scenario: Header actions affect only the current section
- **WHEN** the example user applies a template or clears the section
- **THEN** the section fields update and the outside skill field retains its value
