# 变更记录

升级前核对目标包版本与发布说明，检查变更涉及的属性、事件、类型和主题变量。保留项目依赖锁文件，并验证关键业务流程。没有迁移说明时，不应假设不同版本的 API 完全兼容。

## 发布说明

[查看完整 Changelog](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/ui/CHANGELOG.md)。记录新增功能、问题修复和不兼容变更；Unreleased 表示尚未发布的内容，不等于当前 npm 包已包含。

## 升级检查

1. 确认当前版本和目标版本，阅读两者之间的变更记录。
2. 按不兼容变更更新属性、事件、类型和主题变量。
3. 更新依赖锁文件，检查构建与关键交互后再发布业务应用。

[LLM documentation](#/zh-CN/llms) · [Cedar](https://cedar.show) · [Maple](https://maple.show)

<!-- @include: ../CHANGELOG.md{3-} -->
