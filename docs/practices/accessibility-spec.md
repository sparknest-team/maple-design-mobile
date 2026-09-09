# Maple 组件可访问性规范

组件以 WCAG 2.2 AA 和 WAI-ARIA Authoring Practices 为验收基线，同时保证触控目标和移动端读屏体验。

## 通用要求

- 优先使用原生语义元素；模拟交互控件必须提供等价 role、状态和键盘行为。
- 操作既要支持触控，也要支持外接键盘，并使用 `:focus-visible` 提供可见焦点。
- 纯图标操作必须具有 accessible name；装饰图标必须对辅助技术隐藏。
- `disabled` 必须阻止事件，`loading` 必须暴露 `aria-busy` 并避免重复提交。
- 错误不能只通过颜色表达；动画必须尊重 `prefers-reduced-motion`。
- 文本、交互状态和触控目标必须达到 WCAG 2.2 AA。

## 组件要求

- Dialog/Popup/ActionSheet：modal 语义、焦点管理、关闭后恢复焦点。
- Tooltip/Popover：trigger 与浮层通过 ARIA 关系关联。
- Tabs/TabBar：选中状态、键盘导航和清晰的 accessible name。
- Checkbox/Radio/Switch：键盘切换、checked/indeterminate 状态。
- Input/FieldDecorator/Form：label、hint、error 与控件关联。
- Select/Menu/Picker：读屏状态通知和完整键盘导航。
- Progress/Loading：提供角色、当前值或可读的未知进度状态。

每个交互组件必须包含键盘与关键 ARIA 自动化测试，并在 `docs/zh-CN.md` 增加“可访问性”说明。
