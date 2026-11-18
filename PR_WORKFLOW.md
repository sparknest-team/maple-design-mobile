# 提交、PR 与版本日志

## 日常开发

三个仓库都使用功能分支，提交推送后创建 PR，目标分支为 `main`。

```sh
git switch -c feat/my-change
pnpm hooks:install
# 编辑代码；仅暂存本次任务的文件
git add <files>
git commit -m "feat(component): describe the user-visible change"
git push -u origin HEAD
gh pr create --base main
```

安装依赖时自动安装 `.githooks`；已有工作区运行一次 `pnpm hooks:install`。本地 pre-commit 仅检查暂存内容的空白、冲突标记与 JSON 语法，commit-msg 验证 Conventional Commits。它不运行 ESLint、Prettier、类型检查、测试或构建，也不改写暂存/未暂存文件。针对性开发验证可按需要执行；单纯提交推送不重复跑完整 quality。pre-push 拒绝直接推送 main/master。

完整校验在 PR Quality 执行。Cedar/Maple 保留原有 `pnpm quality` 完整入口；design-ui 执行自己的完整入口，并分别运行 Cedar 与 Maple 的完整 consumer quality。CI 不忽略失败。每个仓库最终必须有成功的 `quality` 检查。

## Changesets

用户可感知的变更运行 `pnpm changeset`，选择受影响包及 patch/minor/major，描述使用方看到的行为变化。仅文档/基础设施且不需要发包时运行 `pnpm changeset --empty`。PR CI 执行 `changeset status --since=origin/main`；Changesets 生成的版本 PR 不再要求新增 changeset。

合并 main 后，Release workflow 自动创建或更新 `changeset-release/main` 版本 PR，更新包版本、`CHANGELOG.md` 和锁文件；不修改 main 的版本，不自动合并，也不自动发布 npm。版本 PR 同样需要 Quality 通过；工作流通过 workflow_dispatch 显式触发机器人 PR 的校验，避免默认 GITHUB_TOKEN 不能触发 pull_request 工作流的问题。

版本 PR 合并后，按需运行 Publish workflow。Cedar/Maple 的发布仍为显式 workflow_dispatch 或联合发版 dispatch；只有该 main 提交的 Quality 已通过才能发布。npm 凭据与跨仓库只读 token 分开管理。design-ui 共享包需要发包时也使用显式 Publish，不在生成日志时发包。

## 配套仓库 PR

在 PR 正文中为每个配套仓库写一行，例如：

```text
Related-PR: https://github.com/loca-spirit/design-ui/pull/123
Related-PR: https://github.com/loca-spirit/maple-design-mobile/pull/456
```

只能链接另外两个仓库，每个仓库最多一个 PR。CI 将未合并 PR 解析为 head SHA，已合并 PR 解析为 merge SHA；未指定的仓库使用 main。编辑 PR 正文也会触发新检查。CI 结束时再次确认关联 SHA 未改变，并保存本次被测 merge SHA 和关联 SHA 的 artifact。配套 PR 在检查结束后更新或合并时，重跑所有受影响 PR 的 Quality；跨仓库合并不具备原子性。

合并统一使用：

```sh
pnpm pr:merge <PR编号>
```

命令要求当前 PR 的最新完整 Quality workflow 成功，下载其关联 SHA 快照，确认当前 merge commit 与被测提交一致、关联 PR 未变化，然后使用 GitHub 合并 API 的 `sha` 约束执行 Squash merge，仓库设置会删除远程分支；保留本地工作分支与未提交改动。缺少检查、未完成、失败、跳过、过期 artifact 或 SHA 漂移均拒绝合并。

## GitHub 配置

- 三个仓库的 Actions repository secret：`DESIGN_SYSTEM_CI_TOKEN`。值是同一枚 Fine-grained PAT，Resource owner 为 loca-spirit，仅选择三个仓库，Repository permissions 为 Contents Read-only、Pull requests Read-only。不是随意字符串，也不是 npm token。
- Actions → General → Workflow permissions 的 “Allow GitHub Actions to create and approve pull requests” 开关是自动版本 PR 的前置条件。工作流只创建 PR，不提交 approve review。GitHub 将创建和审批能力合并在同一个设置项里；启用前需仓库所有者确认。所有 workflow 显式声明各自所需的最小权限，完整 Quality 只读。
- 建议 main 的分支保护要求 PR 与成功的 `quality` 检查、最新基线，关闭直接推送与 force push；仓库合并方式使用 Squash。
- 当前 GitHub 套餐对这些私有仓库的分支保护 API 返回 403，要求升级 Pro 或公开仓库。在套餐支持并配置好保护前，本地 pre-push 和 `pr:merge` 只是团队约定，不能阻止网页端或其他客户端直接合并/推送。不得声称服务端保护已经生效。无需为此公开源码。
- 启用服务端保护后仍保留相同 Quality gate；无需修改完整检查入口。

本次迁移只修改交付流程，不触发 npm 发布；已有业务改动保持独立。
