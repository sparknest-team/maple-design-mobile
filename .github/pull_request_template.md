## 变更与用户影响

描述触发条件和变更后的行为。

## 验证

完整检查由 Quality CI 执行；记录必要的本地针对性验证。

## Changeset

用户可感知的变更运行 `pnpm changeset`；仅基础设施/文档变更运行 `pnpm changeset --empty`。

## 关联仓库

配套 PR 每个一行，取消 HTML 注释后填写完整 URL。CI 使用对应 PR 的精确提交；配套 PR 更新后需要重跑全部关联 PR 的 Quality。

<!-- Related-PR: https://github.com/loca-spirit/design-ui/pull/123 -->
