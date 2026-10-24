> 后续决定：本变更中的 selected 渲染参数已由 [当前项状态统一](../unify-active-expanded-state/proposal.md) 收敛为精确 active；最终 API 以后续变更为准。

# Menu 公开选中状态统一

冻结解除后同步 Cedar / Maple Menu 的源码、公开类型、调用方、demo、文档和测试。

- 所有选项渲染函数及作用域插槽使用 `{ option, selected, level }`；`selected` 只表示当前项自身匹配 `modelValue`，不包含后代选中、展开、悬停、焦点或视觉强调。
- 后代选中只留在内部，仍可强调父分支，不增加公开后代状态字段。
- MenuOption 的 label 渲染函数从旧双参数签名统一为上述对象；default/icon/suffix 插槽遵循同一上下文，并导出 MenuSlots / MenuOptionSlots 类型。
- 删除 MenuOption.active，视觉强调统一使用已有 highlight；选中模型为 modelValue/defaultValue，展开模型为 open/defaultOpen。直接移除旧 API，不保留兼容别名。
- 新增选中渲染 demo，比较渲染函数、作用域插槽和自定义子项；审查其他组件相似公开命名并记录建议，本轮不扩大到其他组件的 API 迁移。
