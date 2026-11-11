<!-- Source: docs/utilitySpec.zh-CN.md; locale: zh-CN; page: /zh-CN/utilitySpec -->

# Utility 工具类规范

### 介绍

Cedar / Maple 共用同一套语义与结构；类名与变量均带库前缀，避免混用撞名。

| | Cedar | Maple |
|---|---|---|
| 类名前缀 | `c-`（如 `c-text-1`、`c-mt-16`） | `mp-`（如 `mp-text-1`、`mp-mt-16`） |
| CSS 变量 | `--c-*` | `--mp-*` |
| 形态 | `style/tools.less` | 独立 `utilities` + Uno/TW preset |

**不做无前缀别名，不做向后兼容。**

### 标准集合（两端一致）

- **Color**：功能色、文字 / 填充 / 边框 / 背景层级
- **Spacing / Size**：仅由 Uno / Tailwind preset 生成具体数值类，如 `mp-mt-16`、`mp-h-10`、`mp-w-full`。日常分类见 [常用写法](#/zh-CN/atomic-usage)。
- **Rounded / Shadow / Flex / Display / Position / Overflow**：溢出与省略由原子化生成，如 `mp-overflow-hidden`、`mp-truncate`、`mp-line-clamp-2`
- **Elevation**：`{p}-elevation--0` … `--24`（Maple 独立 CSS；Cedar 随 box-shadow 工具层）

### 平台差异（目录保留、能力不同）

| 项 | Cedar | Maple |
|---|---|---|
| Typography 工具包 | 有（PC 扩展） | 无（用 token / 原子化） |
| 原子化 CSS preset | `@cedar-design/preset-unocss-vue` / `@cedar-design/preset-tailwindcss-vue` | `@maple-design/preset-unocss-vue` / `@maple-design/preset-tailwindcss-vue` |

### 禁止

- 无前缀工具类与无前缀变量
- 固定 Utilities 内重复实现间距原子、完整色板原子类
- Maple 将 utilities 再打进全量组件 CSS
