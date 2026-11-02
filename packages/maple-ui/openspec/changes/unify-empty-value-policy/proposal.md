# 空值与阅读占位统一

两端共同契约、逐组件清单和验证在 Cedar [对应变更](../../../../../../cedar-design-web/packages/cedar-ui/openspec/changes/unify-empty-value-policy/proposal.md) 维护。Maple 保留函数/Zod 校验，内置 required 接入字段策略；用户校验接收原值。emptyValues 和 emptyText 为新增可选能力，不修改受控、代理、清空默认值或 reset。
