<!-- Source: src/swipe-cell/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/swipe-cell -->

# 滑动单元格

## 案例

### 基本使用

向左滑动单元格，显示右侧操作。`name` 是业务标识，不会渲染为文字；它会通过 `open`、`close` 事件和 `before-close` 回调返回。显示内容请放在默认插槽中，例如 `<mp-cell title="订单标题" />`。下方示例展示事件返回的 `name` 和 `position`。

Example source: src/swipe-cell/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const lastEvent = ref('向左滑动查看 open / close 事件中的 name')
function recordEvent(type, { name, position }) {
  lastEvent.value = `${type}: name=${name}, position=${position}`
}
</script>

<template>
  <div class="swipe-cell-example">
    <mp-swipe-cell name="order-1001" @open="recordEvent('open', $event)" @close="recordEvent('close', $event)">
      <template #right>
        <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
      </template>
      <mp-cell title="左滑显示操作" border />
    </mp-swipe-cell>
    <p role="status">{{ lastEvent }}</p>
  </div>
</template>
```

### 左右两侧

Example source: src/swipe-cell/example/demos/both-sides.vue

```vue
<template>
  <mp-swipe-cell>
    <template #left>
      <mp-button status="primary" style="height: 100%; border-radius: 0">选择</mp-button>
    </template>
    <mp-cell title="两侧均可滑动" border />
    <template #right>
      <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
    </template>
  </mp-swipe-cell>
</template>
```

### 关闭前确认

`Dialog.confirm(...)` 返回动作值，只有 `confirm` 允许收起；取消或关闭返回 `false`，保留已展开的操作区。普通示例中的“删除”只演示关闭动作，业务删除需自行处理。

Example source: src/swipe-cell/example/demos/before-close.vue

```vue
<script setup>
import { Dialog } from '@maple-design/ui'

let confirming = false

async function beforeClose({ position }) {
  if (confirming) {
    return false
  }
  if (position !== 'right') {
    return true
  }

  confirming = true
  try {
    const action = await Dialog.confirm({ title: '确认删除？' })
    return action === 'confirm'
  } finally {
    confirming = false
  }
}
</script>

<template>
  <mp-swipe-cell :before-close="beforeClose">
    <mp-cell title="删除前确认" border />
    <template #right>
      <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
    </template>
  </mp-swipe-cell>
</template>
```

### 可访问性

- 操作区按钮应自带可读文本或 `aria-label`。
- 禁用时设置 `disabled`，组件不再响应滑动。

## 拖动取消与点击抑制



## 关闭确认与生命周期



## 介绍

单元格左右滑动以显示操作按钮，常用于列表删除、收藏等场景。

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 业务标识，通过 open、close 和 before-close 返回，不显示为内容 | `string \| number` | `''` |
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
