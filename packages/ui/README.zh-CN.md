# Maple Design Mobile

Maple Design Mobile 是基于 Vue 3、TypeScript 和 Less 的移动端组件库，由孟帅、吴甲明维护。与 [Cedar Design Web](https://cedar.show) 同构，对齐组件 API、交互语义与设计 Token。

## 特性

- 双端同构：与 Cedar 对齐组件 API、行为约定和主题语言

- 面向移动端的组件与触控交互
- 支持按需引入与 TypeScript 类型提示
- 支持语义 Token、品牌主题和亮暗模式
- 提供中英文文档和国际化支持
- 配套 CLI、图标、组件解析器与样式预设

## Cedar × Maple，同构的两端

桌面端使用 [Cedar Design Web](https://cedar.show)，移动端使用 [Maple Design Mobile](https://maple.show)。统一的 API 约定与语义 Token，让组件使用经验和主题语言在两端延续；布局、键盘与触控交互按各端场景适配。

## 安装

```shell
pnpm add @maple-design/ui-vue
```

## 项目配套

| 包 | 用途 |
| --- | --- |
| `@maple-design/cli-vue` | 组件开发、文档与构建工具 |
| `@maple-design/icons-vue` | SVG Vue 图标组件 |
| `@maple-design/resolver-vue` | 组件与图标的按需引入 |
| `@maple-design/preset-unocss-vue` | UnoCSS 预设 |
| `@maple-design/preset-tailwindcss-vue` | Tailwind CSS 预设 |

## 贡献者

- 孟帅
- 吴甲明

## 开源协议

MIT。

## 本地开发

构建与开发命令见 [构建说明](../../BUILDING.md)。
