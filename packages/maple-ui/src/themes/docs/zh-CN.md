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
| 默认 | `Themes.default.light` / `Themes.default.dark` | 青绿色品牌色阶，提供亮暗模式 |
| 枫叶 | `Themes.maple.light` / `Themes.maple.dark` | 枫叶红橙品牌色阶，提供亮暗模式 |

### DOM 切换暗色

```ts
document.documentElement.setAttribute('maple-theme', 'dark')
document.documentElement.removeAttribute('maple-theme')
```

### StyleProvider 切换

亮色对象会移除 `html[maple-theme=dark]`，暗色对象会设置该属性。切换主题时直接传入对应的 `light` / `dark` 对象。

```html
<!-- playground-ignore -->
<script setup>
  import { StyleProvider, Themes } from '@maplejs/maple-ui'
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" block @click="StyleProvider.setStyleVars(Themes.default.light)">默认亮色</mp-button>
    <mp-button status="primary" block @click="StyleProvider.setStyleVars(Themes.default.dark)">默认暗色</mp-button>
    <mp-button status="primary" block @click="StyleProvider.setStyleVars(Themes.maple.light)">枫叶亮色</mp-button>
    <mp-button status="primary" block @click="StyleProvider.setStyleVars(Themes.maple.dark)">枫叶暗色</mp-button>
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
    ...Themes.maple.light,
    '--mp-primary-6': '255, 0, 0',
    '--mp-color-primary': 'rgb(var(--mp-primary-6))',
  }

  StyleProvider.setStyleVars(customTheme)
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
