# 当前项、展开与视觉强调状态统一

按最终 API 决定，Cedar / Maple Menu 的公开渲染上下文改为 `{ option, active, level }`；active 只代表当前项自身匹配主值，不包含后代选中、焦点、悬停、展开或视觉覆盖。后代状态保留内部，既有路径样式保留。MenuOption.highlight 保留。

Cedar NavMenu 的数据渲染上下文从 selected + 祖先 active 收敛为精确 active + expanded；旧祖先 active 不公开。NavMenuItem 原视觉 active 属性改为 highlight，插槽 active 只由具名入口 activeItem 或独立入口的有效匹配选项决定，highlight/open 不改变业务 active。activeItem/defaultActiveItem、事件和方法保留；selectedOption、autoExpandSelected 等不属于本次布尔状态改名范围，保留。

Cedar / Maple Collapse 根和子项 expand-icon 插槽使用 expanded，增加明确公开类型并移除旧 active 参数。主值仍为 modelValue/defaultValue，子项标识 name。

Maple TabBar 和双端 Steps 保留 active，分别表示 name、步骤序号对应主值；不新增 current/selected 别名。同步源码、类型、调用方、demo、文档和测试。直接删除被替代的 API，不保留兼容别名。
