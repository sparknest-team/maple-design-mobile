# Maple Design Mobile

Maple Design Mobile is a mobile component library built with Vue 3, TypeScript and Less, maintained by 孟帅 and 吴甲明. It is the mobile counterpart to [Cedar Design Web](https://cedar.show), sharing component API conventions, interaction semantics and design tokens.

## Features

- One architecture with Cedar: consistent component APIs, behavior conventions and theme language

- Components and touch interactions for mobile applications
- On-demand imports and TypeScript definitions
- Semantic tokens, brand themes, and light and dark modes
- Chinese and English documentation and internationalization
- CLI, icons, component resolver and styling presets

## Cedar × Maple

Use [Cedar Design Web](https://cedar.show) for desktop applications and [Maple Design Mobile](https://maple.show) for mobile applications. Shared API conventions and semantic tokens carry familiar patterns across platforms, while each library adapts its layout and interactions to its platform.

## Installation

```shell
pnpm add @maple-design/ui-vue
```

## Project Packages

| Package | Purpose |
| --- | --- |
| `@maple-design/cli-vue` | Component development, documentation and build tools |
| `@maple-design/icons-vue` | SVG Vue icon components |
| `@maple-design/resolver-vue` | On-demand component and icon imports |
| `@maple-design/preset-unocss-vue` | UnoCSS preset |
| `@maple-design/preset-tailwindcss-vue` | Tailwind CSS preset |

## Contributors

- 孟帅
- 吴甲明

## License

MIT.

## Local Development

See the [build guide](./BUILDING.md) for development and build commands.

包名与目录规则、全量包清单见[包目录与框架边界](../design-ui/standards/package-layout.md)。
