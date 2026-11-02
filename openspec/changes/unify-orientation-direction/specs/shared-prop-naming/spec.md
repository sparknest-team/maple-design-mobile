> 第一阶段迁移记录。最终命名规划已由 design-ui/standards/api-design.md 的“方位、位置、排列与操作轴命名”更新；其中 Fab.placement、TimelineItem.contentPlacement、类型名和角落值迁移现已全部完成。本文旧命名不得用于新增 API。

## ADDED Requirements

### Requirement: Axis and layout names have distinct value domains

Components MUST use orientation for horizontal/vertical axes, and direction for explicitly reviewed layout or movement semantics, exposing only supported subsets. Shared axis types MUST use Orientation. Carousel MUST export CarouselOrientation.

#### Scenario: Vertical options and carousel

- **WHEN** orientation is vertical on RadioGroup, CheckboxGroup, Segmented or Carousel
- **THEN** the component renders or moves on the vertical axis without accepting a legacy direction prop

### Requirement: Movement axes and expansion use specific names

Drag MUST use axis with x/y/xy, default xy. Fab MUST use placement with top/right/bottom/left, default top. Fab.drag MUST forward axis to Drag.

#### Scenario: Constrained floating menu dragging

- **WHEN** Fab receives drag={axis: 'x'} and placement='left'
- **THEN** dragging changes only x and the actions expand left
