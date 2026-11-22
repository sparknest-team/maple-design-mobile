---
'@maple-design/cli-vue': minor
'@maple-design/ui-vue': minor
---

构建工具链统一到 Node 26 / pnpm 10，与 Cedar、design-ui 保持同一套运行时：

- `engines.node` 下限 20 → `>=26.13.1`，`.nvmrc` / `.node-version` / `.npmrc use-node-version` / Volta 全部固定 26.13.1
- pnpm `9.6.0` → `10.23.0`：`pnpm.overrides` 从 `package.json` 迁到 `pnpm-workspace.yaml`（pnpm 10 不再读 package.json 的 `pnpm` 字段，留着会让 `@sparknest/*` 的 `link:` 覆盖静默失效），CI 的 `pnpm/action-setup` 同步到 10.23.0
- `pnpm-lock.yaml` 按 pnpm 10 重新归一化：`patchedDependencies` 哈希改为 sha256，peer 后缀改为 pnpm 10 的写法；解析结果与版本号不变

同时删除 Table 里 19 个从未被任何样式或脚本消费的桌面筛选弹层 token
（`--mp-table-filters-popup-*` / `-list-*` / `-item-*` / `-text-*` / `-bottom-*`）：
移动端首版不提供桌面筛选弹层，这些声明连同文档的 CSS 变量表一起移除，避免对外承诺一个不存在的定制入口。
`--mp-table-empty-image-size` 是真实消费的，保留并补登记到 token 审计白名单。
