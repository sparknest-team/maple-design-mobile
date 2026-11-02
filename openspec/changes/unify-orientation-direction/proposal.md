> 第一阶段迁移记录。最终命名规划已由 design-ui/standards/api-design.md 的“方位、位置、排列与操作轴命名”更新；其中 Fab.placement、TimelineItem.contentPlacement、类型名和角落值迁移现已全部完成。本文旧命名不得用于新增 API。

# Unify orientation, layout direction and movement axes

Use `orientation` exclusively for horizontal/vertical component axes and `direction` for explicit layout or movement semantics. Migrate RadioGroup, CheckboxGroup, Segmented and Carousel to orientation. Rename Fab.direction to placement and Drag.direction to axis, including Fab.drag.axis. Normalize the shared Orientation type and CarouselOrientation export across Cedar and Maple. Update internal track/handle axis props and all active consumers, examples, docs and tests. Remove old APIs directly during the pre-release convergence period.
