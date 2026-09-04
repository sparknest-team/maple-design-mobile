# 主题定制

### 介绍

Maple 色板与 Cedar 结构对齐：**RGB 通道色阶** + **语义色** + **组件 token**。

- 色阶：`--mp-primary-6: r, g, b`，用法 `rgb(var(--mp-primary-6))` / `rgba(var(--mp-primary-6), 0.12)`
- 语义：`--mp-color-text-1`、`--mp-color-bg-*`、`--mp-color-fill-*`、`--mp-color-primary` 等
- 暗色：根节点属性 `maple-theme="dark"` 整表覆盖
- 覆盖 / 多主题包：继续用 [StyleProvider](#/zh-CN/style-provider)

### 内置主题包

| 主题名称 | 主题包 | 说明 |
| --- | --- | --- |
| 默认亮色 | CSS `:root` | 色阶 + 语义 |
| 暗色 | `Themes.dark` 或 DOM | 与 `:root[maple-theme=dark]` 对齐 |
| MD3 亮色 | `Themes.md3Light` | StyleProvider 注入覆盖 |
| MD3 暗色 | `Themes.md3Dark` | StyleProvider 注入 + DOM dark |

### DOM 切换暗色

```ts
document.documentElement.setAttribute('maple-theme', 'dark')
document.documentElement.removeAttribute('maple-theme')
```

### StyleProvider 切换

`StyleProvider(Themes.dark)` 会同步设置 `html[maple-theme=dark]`；`StyleProvider(null)` 移除属性并恢复默认。

```html
<!-- playground-ignore -->
<script setup>
  import { StyleProvider, Themes } from '@maplejs/maple-ui'
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-button status="primary" block @click="StyleProvider(null)">亮色</mp-button>
    <mp-button status="primary" block @click="StyleProvider(Themes.dark)">暗色</mp-button>
    <mp-button status="primary" block @click="StyleProvider(Themes.md3Light)">MD3 亮色</mp-button>
    <mp-button status="primary" block @click="StyleProvider(Themes.md3Dark)">MD3 暗色</mp-button>
  </mp-space>
</template>
```

### 设置 body

```css
/* playground-ignore */
body {
  transition:
    background-color 0.25s,
    color 0.25s;
  color: var(--mp-color-text);
  background-color: var(--mp-color-body);
  color-scheme: var(--mp-color-scheme);
}
```

### 主题定制

```html
<!-- playground-ignore -->
<script setup>
  import { StyleProvider, Themes } from '@maplejs/maple-ui'

  const customTheme = {
    ...Themes.md3Light,
    '--mp-primary-6': '255, 0, 0',
    '--mp-color-primary': 'rgb(var(--mp-primary-6))',
  }

  StyleProvider(customTheme)
</script>
```

### 通用样式变量（节选）

| 变量名 | 说明 |
| --- | --- |
| `--mp-primary-1` … `--mp-primary-10` | 主色阶（RGB 通道） |
| `--mp-success-*` / `--mp-danger-*` / `--mp-warning-*` / `--mp-info-*` | 功能色阶 |
| `--mp-gray-1` … `--mp-gray-10` | 中性色阶 |
| `--mp-color-text-1` … `--mp-color-text-4` | 文本语义 |
| `--mp-color-bg-1` … `--mp-color-bg-5` | 背景语义 |
| `--mp-color-fill-1` … `--mp-color-fill-4` | 填充语义 |
| `--mp-color-border-1` … `--mp-color-border-4` | 边框语义 |
| `--mp-color-primary` 等 | 功能语义色（成品色） |
| `--mp-opacity-*` | 交互透明度 |
