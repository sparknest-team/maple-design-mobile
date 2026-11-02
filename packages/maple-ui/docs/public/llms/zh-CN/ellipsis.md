<!-- Source: src/ellipsis/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/ellipsis -->

# Ellipsis 文本省略

单行或多行文本省略，可选展开交互和 Tooltip。

## 案例

### 单行省略

Example source: src/ellipsis/example/demos/line.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%">
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

### 多行省略

Example source: src/ellipsis/example/demos/multiple-line.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%" :line-clamp="2">
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

### 交互展开

Example source: src/ellipsis/example/demos/expand.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%" :line-clamp="2" expand-trigger="click" :tooltip="false">
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
    <p>点击文本，或聚焦后按 Enter / Space 展开与收起。</p>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

### 受控展开

Example source: src/ellipsis/example/demos/two-way-binding.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)
</script>

<template>
  <div class="ellipsis-demo">
    <mp-button @click="expanded = !expanded">外部切换: {{ expanded }}</mp-button>
    <mp-ellipsis
      v-model:expand="expanded"
      style="width: 240px; max-width: 100%"
      :line-clamp="2"
      expand-trigger="click"
      :tooltip="false"
    >
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

### 自定义提示

Example source: src/ellipsis/example/demos/tooltip.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis
      style="width: 240px; max-width: 100%"
      :tooltip="{
        status: 'primary',
        trigger: ['hover', 'focus', 'click'],
        content: '独立的提示内容，不会重复拼接正文',
      }"
    >
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `expand` | 受控展开状态，配合 v-model:expand | `boolean` | `undefined` |
| `default-expand` | 非受控初始展开状态 | `boolean` | `false` |
| `expand-trigger` | 启用点击与 Enter / Space 展开 | `'click'` | `—` |
| `line-clamp` | 正数行数，向下取整；未传或无效为单行 | `number \| string` | `—` |
| `tooltip` | Tooltip 配置，false 禁用 | `boolean \| TooltipProps` | `true` |

传入 `expand` 后只通知父级，不擅自修改受控值；省略时由内部状态管理，`default-expand` 仅用于初始化。Tooltip 遵循自身默认宽度及触发方式，不以实际测量是否溢出作为显示条件；触控场景可显式设置 `tooltip.trigger` 包含 `click`。外部 class/style/width 直接作用于文本节点。

### 事件与插槽

- `update:expand(expand: boolean)`：用户操作请求的新状态；外部更新不触发。
- `default`：正文。
- `tooltip-content`：提示内容；未提供时优先 tooltip.content，否则使用正文，不重复拼接。
- 键盘：可展开文本支持 Enter / Space；启用 Tooltip 的文本可通过 Tab 聚焦。无公开实例方法。

### 类型

```ts
import type { EllipsisProps, EllipsisInstance, EllipsisExpandTrigger } from '@maple-design/ui'
```

### 样式变量

| Token | 默认值 |
| --- | --- |
| `--mp-ellipsis-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-ellipsis-focus-width` | `2px` |
| `--mp-ellipsis-focus-offset` | `2px` |
