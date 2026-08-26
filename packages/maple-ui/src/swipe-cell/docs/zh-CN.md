# 滑动单元格

### 介绍

单元格左右滑动以显示操作按钮，常用于列表删除、收藏等场景。

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <mp-swipe-cell>
    <template #right>
      <mp-button type="danger" style="height: 100%">删除</mp-button>
    </template>
    <mp-cell title="左滑显示操作" border />
  </mp-swipe-cell>
</template>
```

### 左右两侧

```html
<template>
  <mp-swipe-cell>
    <template #left>
      <mp-button type="primary" style="height: 100%">选择</mp-button>
    </template>
    <mp-cell title="两侧均可滑动" border />
    <template #right>
      <mp-button type="danger" style="height: 100%">删除</mp-button>
    </template>
  </mp-swipe-cell>
</template>
```

### 关闭前确认

```html
<script setup>
import { Dialog } from '@maplejs/maple-ui'

const beforeClose = async ({ position }) => {
  if (position !== 'right') return true
  try {
    await Dialog({ title: '确认删除？' })
    return true
  } catch {
    return false
  }
}
</script>

<template>
  <mp-swipe-cell :before-close="beforeClose">
    <mp-cell title="删除前确认" border />
    <template #right>
      <mp-button type="danger" style="height: 100%">删除</mp-button>
    </template>
  </mp-swipe-cell>
</template>
```

### 可访问性

- 操作区按钮应自带可读文本或 `aria-label`。
- 禁用时设置 `disabled`，组件不再响应滑动。

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 标识符 | `string \| number` | `''` |
| `left-width` | 左侧操作区宽度，`auto` 时按内容测量 | `number \| string` | `auto` |
| `right-width` | 右侧操作区宽度 | `number \| string` | `auto` |
| `before-close` | 关闭前钩子，返回 `false` 阻止关闭 | `(args) => boolean \| Promise<boolean>` | `-` |
| `disabled` | 禁用滑动 | `boolean` | `false` |
| `stop-propagation` | 阻止 `touchmove` 冒泡 | `boolean` | `false` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `position: left \| right \| cell \| outside` |
| `open` | 打开时触发 | `{ name, position }` |
| `close` | 关闭时触发 | `{ name, position }` |

### 插槽

| 名称 | 说明 |
| --- | --- |
| `default` | 主内容 |
| `left` | 左侧操作区 |
| `right` | 右侧操作区 |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开侧栏 | `left \| right` |
| `close` | 收起 | `-` |
