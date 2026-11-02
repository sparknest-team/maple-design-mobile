<!-- Source: src/affix/docs/en-US.md; locale: en-US; page: /en-US/affix -->

# Affix

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

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

### Top offset

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

### Bottom offset

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

### Scroll container

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

### Change event

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

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| offset-top | Distance from the scroll container top; accepts CSS lengths | `number / string` | `0` |
| offset-bottom | Distance from the bottom; takes precedence over offset-top, including 0 | `number / string` | `undefined` |
| target | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | `string / HTMLElement / Window` | `undefined` |
| target-container | Extra outer scroller to listen to; omitted means no extra listener, and it is not a clipping boundary | `string / HTMLElement / Window` | `undefined` |
| z-index | Stacking level | `number / string` | `10` |
| disabled | Disable affixing | `boolean` | `false` |
| css-mode | Use native position: sticky, subject to ancestor overflow and container boundaries | `boolean` | `false` |

### Events

| Event | Arguments and timing |
| --- | --- |
| change | `(fixed: boolean, offset: number)`, when fixed state changes; offset is the threshold while fixed, otherwise distance to the corresponding container edge; disabling reports 0 |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| default | Content to affix | — |

### Methods

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| updatePosition | Rebind scrollers and recalculate on the next animation frame | — | `Promise<void>` |

### Platform notes

Props, event arguments, slots and methods match. CSS mode follows browser sticky rules; paired demos use independent scroll containers.
<!-- same-source-api:end -->
