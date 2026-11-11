<!-- Source: src/affix/docs/en-US.md; locale: en-US; page: /en-US/affix -->

# Affix

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Basic examples

### Basic usage

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

## Layout and arrangement

### Affix direction, offset and container

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target` | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | Affix direction, offset and container |
| `offset-top` | Distance from the scroll container top; accepts CSS lengths | Affix direction, offset and container |
| `offset-bottom` | Distance from the bottom; takes precedence over offset-top, including 0 | Affix direction, offset and container |
<!-- demo-config-notes:end -->


Scroll each bordered area separately to compare top/bottom affixing and offsets within an explicit scroll container.

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

## Interaction and control

### Change event

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target` | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | Change event, Disabled, CSS mode and manual update |
| `offset-top` | Distance from the scroll container top; accepts CSS lengths | Change event, Disabled, CSS mode and manual update |
| `disabled` | Disable affixing | Disabled, CSS mode and manual update |
| `css-mode` | Use native position: sticky, subject to ancestor overflow and container boundaries | Disabled, CSS mode and manual update |
| `z-index` | Stacking level | Disabled, CSS mode and manual update |
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

### Disabled, CSS mode and manual update

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

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| offset-top | Distance from the scroll container top; accepts CSS lengths | `number / string` | `0` |
| offset-bottom | Distance from the bottom; takes precedence over offset-top, including 0 | `number / string` | `undefined` |
| target | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | `string / HTMLElement / Window` | `undefined` |
| target-container | Extra outer scroller to listen to; omitted means no extra listener, and it is not a clipping boundary | `string / HTMLElement / Window` | `undefined` |
| z-index | Stacking level | `number / string` | `10` |
| disabled | Disable affixing | `boolean` | `false` |
| css-mode | Use native position: sticky, subject to ancestor overflow and container boundaries | `boolean` | `false` |

### Affix Events

| Event | Arguments and timing |
| --- | --- |
| change | `(fixed: boolean, offset: number)`, emitted when the fixed state changes. While fixed, offset is the affix threshold; otherwise it is the distance to the corresponding container edge. Disabling affixing reports 0. |

### Affix Slots

| Slot | Description | Prop |
| --- | --- | --- |
| default | Content to affix | — |

### Affix Methods

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| updatePosition | Rebind scrollers and recalculate on the next animation frame | — | `Promise<void>` |

### Usage notes

Props, event arguments, slots and public methods match across platforms. CSS mode follows browser sticky rules; examples use independent scroll containers.
<!-- same-source-api:end -->

`change` only reports transitions in fixed state: repeated measurements while fixed do not repeat true, and disabling releases fixation with false and 0. Viewport units are reevaluated on measurement. CSS mode delegates valid lengths to native sticky; JS mode resolves numbers, numeric strings, px, rem, vw, vh, vmin and vmax. target controls listeners and JS measurement, while native sticky remains constrained by actual CSS ancestors. After deactivation, a pending `updatePosition()` cannot restore listeners from an older activation.


### Imports and event types

The subentry default component and the named components from the subentry and root are the same component. Props includes actual listener parameters. Events remain notifications and do not await returned Promises. Use only the documented instance methods.

```ts
import Affix, { Affix as NamedAffix } from '@maple-design/ui-vue/affix'
import { Affix as RootAffix } from '@maple-design/ui-vue'
import type { AffixProps, AffixInstance } from '@maple-design/ui-vue'
import type { AffixProps as SubAffixProps } from '@maple-design/ui-vue/affix'
const options: AffixProps = { onChange: (fixed: boolean, offset: number) => fixed && offset.toFixed() }
```


### Units and diagnostics

JS mode parses only finite numbers, decimal/scientific numeric strings, and px, rem, vw, vh, vmin or vmax, including negative offsets. Unsupported JS lengths such as em, %, calc() and var() warn in development and measure as zero instead of treating a numeric prefix as pixels. CSS mode delegates to native sticky, converting numeric strings to px and leaving other valid CSS expressions to the browser. NaN/Infinity/blank values receive Vue prop validation warnings. Invalid CSS offsets are removed and JS measurement falls back to zero. target changes listeners and JS measurement, not the actual native sticky scroll ancestor or clipping boundary.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
