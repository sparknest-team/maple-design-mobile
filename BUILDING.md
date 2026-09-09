# 构建命令

Cedar 与 Maple 使用相同的命令名称。建议在各自仓库根目录执行，使用 pnpm 9.6.0。

| 命令 | 用途 |
| --- | --- |
| `pnpm build` / `pnpm build:lib` | 构建 npm 组件包及构建链中的依赖包，不构建文档、不发布 |
| `pnpm build:doc` | 仅构建文档站点 |
| `pnpm build:all` | 先构建 npm 包，再构建文档 |
| `pnpm dev` | 启动文档开发服务 |

在 `packages/maple-ui` 内同样支持这四个 build 命令，但包构建仅处理当前 UI 包，不预先构建工作区依赖；首次构建优先使用根目录命令。

迁移说明：原来的 `pnpm build` 构建文档，现在改用 `pnpm build:doc`。旧 `pnpm compile` 保留，只构建 UI 包，推荐改用明确的 `build:lib`。文档仍由 `maple-cli build` 构建，npm 包仍由 `maple-cli compile` 构建；CLI 子命令未重命名。Playground 专用命令不变。

根目录 `quality` / Quality CI 使用 `build:all`，包含 npm 产物和文档验证。构建队列失败会停止并返回失败状态。
