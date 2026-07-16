# 粘性布局

### 介绍

粘性布局默认使用监听容器滚动事件的 `scroll` 模式，如有需要可以切换成基于 `css sticky` 的模式来提升性能。

### 基本使用

```html
<template>
  <div class="sticky-example">
    <mp-sticky :offset-top="54">
      <mp-button type="primary">基本使用</mp-button>
    </mp-sticky>
  </div>
</template>

<style>
.sticky-example {
  min-height: 200vh;
}
</style>
```

### 局部吸顶

```html
<template>
  <div class="sticky-example">
    <div ref="scrollerRef" class="sticky-example-scroller">
      <mp-sticky :target="scrollerRef">
        <mp-button type="success">局部吸顶</mp-button>
      </mp-sticky>
      <div class="sticky-example-block"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scrollerRef = ref(null)
</script>

<style>
.sticky-example {
  min-height: 200vh;
}

.sticky-example-scroller {
  height: 200px;
  overflow: auto;
  background: #2979ff;
}

.sticky-example-block {
  width: 100%;
  height: 600px;
  background: #2979ff;
  opacity: .5;
}
</style>
```

### 固定状态改变

```html
<template>
  <div class="sticky-example">
    <mp-sticky :offset-top="54" @change="handleChange">
      <mp-button type="warning">固定状态改变</mp-button>
    </mp-sticky>
    <div>是否吸顶: {{ fixed }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fixed = ref(false)

const handleChange = (value) => {
  fixed.value = value
}
</script>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `offset-top` | 吸顶距离 | _string \| number_ | `0` |
| `z-index` | 吸顶时的层级 | _string \| number_ | `10` |
| `css-mode` | 开启原生 `css sticky` 模式 | _boolean_ | `false` |
| `disabled` | 禁用吸顶, 设置为 `true` 时, 元素会回到文档流中 | _boolean_ | `false` |
| `target` | 滚动容器，默认自动查找最近可滚动父元素 | _string \| HTMLElement \| Window_ | `-` |

### 方法

| 方法名      | 说明       | 参数 | 返回值             |
|----------|----------| ---- |-----------------|
| `resize` | 触发粘性布局重绘 | `-`  | `Promise<void>` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `change` | 固定状态发生改变时触发 | `fixed: boolean`<br>`offsetTop: number` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 粘性布局的内容 | `-` |