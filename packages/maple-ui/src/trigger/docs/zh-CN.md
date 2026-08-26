# Trigger 触发器

无视觉样式的浮层基础组件，负责触发方式、定位、Teleport 和打开状态。Popover、Menu、Select 等组件基于 Trigger 构建。

Trigger 主要作为组件库底层能力使用。组件自身不会生成宿主 DOM，而是将触发行为绑定到默认插槽的第一个有效元素；`content` 插槽为浮层内容。
