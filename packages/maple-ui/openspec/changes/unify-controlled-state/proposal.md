# Maple 状态所有权统一（设计引用）

状态：设计提案，尚未实施。日期：2026-10-28。

Maple 与 Cedar 采用同一份 [设计与取舍](../../../../../../cedar-design-web/packages/cedar-ui/openspec/changes/unify-controlled-state/design.md)；规范增量及实施清单在该目录维护，不在此重复定义控制规则。

Maple 优先范围为 ActionSheet.open、NumberKeyboard.open/modelValue、FloatingPanel.modelValue 和 Popup.beforeClose 的状态路径；随后与 Cedar 同步迁移 undefined 清空、默认值、模式接管、原生控件及复杂组件行为。保留移动跟手、编辑草稿和退场动画，最终模型服从父级。

所有权、清空值、守卫或返回含义的破坏性变更按已发布版本策略纳入下一 major；旧 useVModel 公共代理工具不直接翻转默认语义。当前用户指南仍描述现状。

本次只完成设计；实现、类型、跨端检查和浏览器验收均未宣称完成。

官方文档对照、emptyValue 冲突成立条件及对显式 undefined 工厂的设计修订，见 Cedar 同目录的 [research.md](../../../../../../cedar-design-web/packages/cedar-ui/openspec/changes/unify-controlled-state/research.md)。默认/标准空值与显式清空输出分开，现有允许的工厂不一律禁止；父级可统一归一化所有更新来源。
