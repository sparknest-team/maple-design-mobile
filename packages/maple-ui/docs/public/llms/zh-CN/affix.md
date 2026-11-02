<!-- Source: src/affix/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/affix -->

# Affix

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## 案例

### 基础用法

Example source: src/affix/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref<HTMLElement>()
</script>

<template>
  <p>Scroll inside the bordered area.</p>
  <div ref="containerRef" class="scroller">
    <div class="scroll-content">
      <mp-affix :target="containerRef"><mp-button status="primary">Basic usage</mp-button></mp-affix>
    </div>
  </div>
</template>

<style scoped>
.scroller {
  height: 200px;
  overflow: auto;
  border: 1px solid currentColor;
}
.scroll-content {
  min-height: 600px;
  padding: 16px;
}
</style>
```

### 顶部偏移

Example source: src/affix/example/demos/top.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref<HTMLElement>()
</script>

<template>
  <p>Scroll inside the bordered area.</p>
  <div ref="containerRef" class="scroller">
    <div class="scroll-content">
      <mp-affix :target="containerRef" :offset-top="80"><mp-button status="primary">Top offset</mp-button></mp-affix>
    </div>
  </div>
</template>

<style scoped>
.scroller {
  height: 200px;
  overflow: auto;
  border: 1px solid currentColor;
}
.scroll-content {
  min-height: 600px;
  padding: 16px;
}
</style>
```

### 底部偏移

Example source: src/affix/example/demos/bottom.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref<HTMLElement>()
</script>

<template>
  <p>Scroll inside the bordered area.</p>
  <div ref="containerRef" class="scroller">
    <div class="scroll-content">
      <div style="height: 240px"></div>
      <mp-affix :target="containerRef" :offset-bottom="20"
        ><mp-button status="primary">Bottom offset</mp-button></mp-affix
      >
    </div>
  </div>
</template>

<style scoped>
.scroller {
  height: 200px;
  overflow: auto;
  border: 1px solid currentColor;
}
.scroll-content {
  min-height: 600px;
  padding: 16px;
}
</style>
```

### 指定滚动容器

Example source: src/affix/example/demos/container.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref<HTMLElement>()
</script>

<template>
  <p>Scroll inside the bordered area.</p>
  <div ref="containerRef" class="scroller">
    <div class="scroll-content">
      <div style="height: 40px"></div>
      <mp-affix :target="containerRef" :offset-top="20"
        ><mp-button status="primary">Scroll container</mp-button></mp-affix
      >
    </div>
  </div>
</template>

<style scoped>
.scroller {
  height: 200px;
  overflow: auto;
  border: 1px solid currentColor;
}
.scroll-content {
  min-height: 600px;
  padding: 16px;
}
</style>
```

### 吸附状态变化

Example source: src/affix/example/demos/fix-change.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref<HTMLElement>()
const fixed = ref(false)
</script>

<template>
  <p>Scroll inside the bordered area.</p>
  <div ref="containerRef" class="scroller">
    <div class="scroll-content">
      <div style="height: 40px"></div>
      <mp-affix :target="containerRef" :offset-top="20" @change="fixed = $event"
        ><mp-button status="primary">Change event</mp-button></mp-affix
      >
    </div>
  </div>
  <p role="status">Fixed: {{ fixed }}</p>
</template>

<style scoped>
.scroller {
  height: 200px;
  overflow: auto;
  border: 1px solid currentColor;
}
.scroll-content {
  min-height: 600px;
  padding: 16px;
}
</style>
```

### 禁用、CSS 模式与手动更新

Example source: src/affix/example/demos/controls.vue

```vue
<script setup lang="ts">
import { nextTick, ref } from 'vue'

const containerRef = ref<HTMLElement>()
const affixRef = ref<{ updatePosition: () => Promise<void> }>()
const disabled = ref(false)
const cssMode = ref(false)
const spacerHeight = ref(40)
const updates = ref(0)
async function updateLayout() {
  spacerHeight.value = spacerHeight.value === 40 ? 100 : 40
  await nextTick()
  await affixRef.value?.updatePosition()
  updates.value++
}
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 12px">
    <mp-checkbox v-model="disabled">Disabled</mp-checkbox>
    <mp-checkbox v-model="cssMode">CSS sticky</mp-checkbox>
    <mp-button @click="updateLayout">Change layout and update position</mp-button>
  </div>
  <p aria-live="polite">Position updates: {{ updates }}</p>
  <div ref="containerRef" class="scroller">
    <div class="scroll-content">
      <div :style="{ height: `${spacerHeight}px` }"></div>
      <mp-affix
        ref="affixRef"
        :target="containerRef"
        :disabled="disabled"
        :css-mode="cssMode"
        :offset-top="12"
        :z-index="2"
      >
        <mp-button status="primary">Scroll to pin</mp-button>
      </mp-affix>
    </div>
  </div>
</template>

<style scoped>
.scroller {
  height: 200px;
  overflow: auto;
  border: 1px solid currentColor;
}
.scroll-content {
  min-height: 600px;
  padding: 16px;
}
</style>
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset-top | 相对滚动容器顶部的吸附距离，支持 CSS 长度 | `number / string` | `0` |
| offset-bottom | 相对滚动容器底部的吸附距离；设置后优先于 offset-top，0 也有效 | `number / string` | `undefined` |
| target | 滚动容器或选择器；省略时寻找最近滚动父元素，找不到则使用 window | `string / HTMLElement / Window` | `undefined` |
| target-container | 额外监听的外层滚动容器或选择器；不传则不额外监听，也不作为裁剪边界 | `string / HTMLElement / Window` | `undefined` |
| z-index | 固钉层级 | `number / string` | `10` |
| disabled | 禁用吸附 | `boolean` | `false` |
| css-mode | 使用原生 position: sticky，受祖先 overflow 和容器边界影响 | `boolean` | `false` |

### Events

| 事件 | 参数与时机 |
| --- | --- |
| change | `(fixed: boolean, offset: number)`，固定状态变化时触发；固定时 offset 为吸附阈值，未固定时为距离对应容器边缘的距离，禁用解除固定时为 0 |

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 需要吸附的内容 | — |

### Methods

| 方法 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| updatePosition | 下一动画帧重新绑定滚动容器并计算位置 | — | `Promise<void>` |

### 跨端说明

属性、事件参数、插槽与公开方法一致。CSS 模式遵循浏览器 sticky 规则；示例统一使用独立滚动容器。
<!-- same-source-api:end -->
