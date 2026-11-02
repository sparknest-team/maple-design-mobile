# 构建命令

Cedar 与 Maple 使用相同的命令名称。建议在各自仓库根目录执行，使用 pnpm 9.6.0。

| 命令 | 用途 |
| --- | --- |
| `pnpm build:lib` | 构建 npm 组件包及构建链中的依赖包，不构建文档、不发布 |
| `pnpm build:doc` | 仅构建文档站点 |
| `pnpm build` | 先构建 npm 包，再构建文档；包构建失败时不会继续构建文档 |
| `pnpm dev` | 启动文档开发服务 |

在 `packages/maple-ui` 内同样支持这三个构建命令，但包构建仅处理当前 UI 包，不预先构建工作区依赖；首次构建优先使用根目录命令。没有额外的构建别名。

CLI 分两阶段构建：先用包内 `build:node` 编译 Node 工具链，供 UI 构建及文档构建使用；UI 类型产物生成后，再执行 CLI 完整 `build`，编译并检查浏览器客户端。浏览器客户端依赖 `@maple-design/ui` 的真实发布类型，不能在 UI 首次构建前编译，也不使用宽泛声明跳过检查。根 `build:lib` 按此顺序执行，根 `build:doc` 只需编译 Node 工具链，不要求预先生成 UI 发布类型。

迁移说明：只构建文档使用 `pnpm build:doc`；原 UI 包编译脚本改用 `pnpm build:lib`，不保留旧别名。文档仍由 `maple-cli build` 构建，npm 包仍由 `maple-cli compile` 构建；CLI 子命令未重命名。Playground 专用命令不变。

根目录 `quality` / Quality CI 使用 `build`，包含 npm 产物和文档验证。发布队列明确调用 UI 包的 `build:lib`，不会触发文档构建。构建队列失败会停止并返回失败状态。

文档构建首先执行 `docs:check`，使用 Vue SFC 编译器检查所有组件 `example` 目录中的脚本和模板，尽早发现重复声明和表达式语法错误。也可单独执行 `pnpm docs:check`，不打包、不写入示例源码。

2026-09-10：修复 Affix / Badge 示例重复的国际化声明和 TabBar 的多语句事件表达式；194 个示例 SFC 预检查通过，完整文档构建成功。循环分块、大体积分块等构建警告仍需后续治理。
