<!-- Source: src/affix/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/affix -->

# Affix

## 基础示例

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

## 布局与排列

### 吸附方向、偏移与容器

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `target` | 滚动容器或选择器；省略时寻找最近滚动父元素，找不到则使用 window | 吸附方向、偏移与容器 |
| `offset-top` | 相对滚动容器顶部的吸附距离，支持 CSS 长度 | 吸附方向、偏移与容器 |
| `offset-bottom` | 相对滚动容器底部的吸附距离；设置后优先于 offset-top，0 也有效 | 吸附方向、偏移与容器 |
<!-- demo-config-notes:end -->

分别滚动三个有边框的区域，比较顶部/底部吸附和不同偏移；每个预览独立指定滚动容器。

Example source: src/affix/example/demos/offset-container-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const resolveContainer = (element: unknown) => (element instanceof HTMLElement ? element : undefined)

const scene1 = demoProxyRefs(
  (() => {
    const containerRef = ref<HTMLElement>()
    return { containerRef }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const containerRef = ref<HTMLElement>()
    return { containerRef }
  })(),
)

const scene3 = demoProxyRefs(
  (() => {
    const containerRef = ref<HTMLElement>()
    return { containerRef }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="top">
      <h4><span lang="zh-CN">顶部偏移</span><span lang="en-US">Top offset</span></h4>
      <p>Scroll inside the bordered area.</p>
      <div :ref="(element) => (scene1.containerRef = resolveContainer(element))" class="scroller">
        <div class="scroll-content">
          <mp-affix :target="scene1.containerRef" :offset-top="80"
            ><mp-button status="primary">Top offset</mp-button></mp-affix
          >
        </div>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="bottom">
      <h4><span lang="zh-CN">底部偏移</span><span lang="en-US">Bottom offset</span></h4>
      <p>Scroll inside the bordered area.</p>
      <div :ref="(element) => (scene2.containerRef = resolveContainer(element))" class="scroller">
        <div class="scroll-content">
          <div style="height: 240px"></div>
          <mp-affix :target="scene2.containerRef" :offset-bottom="20"
            ><mp-button status="primary">Bottom offset</mp-button></mp-affix
          >
        </div>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="container">
      <h4><span lang="zh-CN">指定滚动容器</span><span lang="en-US">Scroll container</span></h4>
      <p>Scroll inside the bordered area.</p>
      <div :ref="(element) => (scene3.containerRef = resolveContainer(element))" class="scroller">
        <div class="scroll-content">
          <div style="height: 40px"></div>
          <mp-affix :target="scene3.containerRef" :offset-top="20"
            ><mp-button status="primary">Scroll container</mp-button></mp-affix
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .scroller {
    height: 200px;
    overflow: auto;
    border: 1px solid currentColor;
  }
  .scroll-content {
    min-height: 600px;
    padding: 16px;
  }
}
.demo-comparison-case--2 {
  .scroller {
    height: 200px;
    overflow: auto;
    border: 1px solid currentColor;
  }
  .scroll-content {
    min-height: 600px;
    padding: 16px;
  }
}
.demo-comparison-case--3 {
  .scroller {
    height: 200px;
    overflow: auto;
    border: 1px solid currentColor;
  }
  .scroll-content {
    min-height: 600px;
    padding: 16px;
  }
}
</style>
```

## 交互与控制

### 吸附状态变化

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `target` | 滚动容器或选择器；省略时寻找最近滚动父元素，找不到则使用 window | 吸附状态变化、禁用、CSS 模式与手动更新 |
| `offset-top` | 相对滚动容器顶部的吸附距离，支持 CSS 长度 | 吸附状态变化、禁用、CSS 模式与手动更新 |
| `disabled` | 禁用吸附 | 禁用、CSS 模式与手动更新 |
| `css-mode` | 使用原生 position: sticky，受祖先 overflow 和容器边界影响 | 禁用、CSS 模式与手动更新 |
| `z-index` | 固钉层级 | 禁用、CSS 模式与手动更新 |
<!-- demo-config-notes:end -->

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
  <mp-space wrap size="12px" style="margin-bottom: 12px">
    <mp-checkbox v-model="disabled">Disabled</mp-checkbox>
    <mp-checkbox v-model="cssMode">CSS sticky</mp-checkbox>
    <mp-button @click="updateLayout">Change layout and update position</mp-button>
  </mp-space>
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
### Affix Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset-top | 相对滚动容器顶部的吸附距离，支持 CSS 长度 | `number / string` | `0` |
| offset-bottom | 相对滚动容器底部的吸附距离；设置后优先于 offset-top，0 也有效 | `number / string` | `undefined` |
| target | 滚动容器或选择器；省略时寻找最近滚动父元素，找不到则使用 window | `string / HTMLElement / Window` | `undefined` |
| target-container | 额外监听的外层滚动容器或选择器；不传则不额外监听，也不作为裁剪边界 | `string / HTMLElement / Window` | `undefined` |
| z-index | 固钉层级 | `number / string` | `10` |
| disabled | 禁用吸附 | `boolean` | `false` |
| css-mode | 使用原生 position: sticky，受祖先 overflow 和容器边界影响 | `boolean` | `false` |

### Affix Events

| 事件 | 参数与时机 |
| --- | --- |
| change | `(fixed: boolean, offset: number)`，固定状态变化时触发；固定时 offset 为吸附阈值，未固定时为距离对应容器边缘的距离，禁用解除固定时为 0 |

### Affix Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 需要吸附的内容 | — |

### Affix Methods

| 方法 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| updatePosition | 下一动画帧重新绑定滚动容器并计算位置 | — | `Promise<void>` |

### 使用说明

属性、事件参数、插槽与公开方法一致。CSS 模式遵循浏览器 sticky 规则；示例统一使用独立滚动容器。
<!-- same-source-api:end -->

`change` 只通知固定状态变化：已固定时重复测量不重复发送 true，禁用解除固定发送 false、0。视口单位随测量重新求值。CSS 模式将有效长度交给原生 sticky；JS 模式解析数字、数值字符串、px、rem、vw、vh、vmin、vmax。target 控制监听及 JS 测量，原生 sticky 仍受实际 CSS 祖先约束。停用后，待完成的 `updatePosition()` 不会恢复旧激活代次的监听。


### 导入与事件类型

子入口的默认组件与子入口、根入口的命名组件是同一组件。Props 类型包含实际事件监听参数；事件仍是通知，不等待监听器返回的 Promise。仅使用文档列出的实例方法。

```ts
import Affix, { Affix as NamedAffix } from '@maple-design/ui-vue/affix'
import { Affix as RootAffix } from '@maple-design/ui-vue'
import type { AffixProps, AffixInstance } from '@maple-design/ui-vue'
import type { AffixProps as SubAffixProps } from '@maple-design/ui-vue/affix'
const options: AffixProps = { onChange: (fixed: boolean, offset: number) => fixed && offset.toFixed() }
```


### 单位与诊断

JS 模式只解析有限数字、十进制或科学计数法数字字符串，以及 px、rem、vw、vh、vmin、vmax，允许负偏移。em、%、calc()、var() 等不支持的 JS 长度在开发环境提示并按 0 测量，不再通过 parseFloat 把单位前缀误当像素。CSS 模式直接交给原生 sticky，数字字符串转为 px，其他合法 CSS 表达式按浏览器规则解析。NaN/Infinity/空白值经 Vue 属性校验提示，CSS 模式移除非法偏移；JS 测量回退 0。target 只改变监听与 JS 测量，不改变原生 sticky 的实际滚动祖先或裁剪边界。

## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
