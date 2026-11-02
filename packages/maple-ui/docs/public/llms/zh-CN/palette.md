<!-- Source: src/palette/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/palette -->

# 色板 Palette

### 介绍

Maple 主题色阶以 CSS 变量形式提供，前缀一律 `--mp-*`。  
本页只展示原始色阶；文字、填充、边框和背景等语义用法统一放在 [颜色 Color](#/zh-CN/color)，避免两个页面重复。

完整色阶定义见 `style/color/css-variables.less`，暗色由 `:root[maple-theme=dark]` 覆盖。

### 引入

主题变量通常随组件库样式一并加载；按需可显式引入：

```js
// playground-ignore
import '@maple-design/ui/es/style/theme/css-variables.css'
```

### 功能色阶（1–10）

右侧移动端示例使用以下六组色阶。每个变量保存 `R, G, B` 通道值，使用时需要包一层 `rgb()`。

```vue
<script setup>
const hues = [
  { name: 'primary', label: 'Primary' },
  { name: 'success', label: 'Success' },
  { name: 'warning', label: 'Warning' },
  { name: 'danger', label: 'Danger' },
  { name: 'info', label: 'Info' },
  { name: 'gray', label: 'Gray' },
]
const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
  <div class="palette-demo">
    <h2>色阶 1–10</h2>
    <div v-for="hue in hues" :key="hue.name" class="hue-block">
      <div class="hue-label">{{ hue.label }}</div>
      <div class="swatch-grid">
        <div
          v-for="step in steps"
          :key="`${hue.name}-${step}`"
          class="swatch"
          :style="{ background: `rgb(var(--mp-${hue.name}-${step}))` }"
        >
          {{ step }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.palette-demo { width: 100%; padding: 16px; }
.hue-block { margin-bottom: 20px; overflow: hidden; border-radius: 8px; }
.hue-label { padding: 10px 12px; color: var(--mp-color-text-2); }
.swatch-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); }
.swatch { display: flex; align-items: center; justify-content: center; height: 48px; color: #fff; }
</style>
```
