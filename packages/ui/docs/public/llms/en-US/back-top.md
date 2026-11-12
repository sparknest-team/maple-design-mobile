<!-- Source: src/back-top/docs/en-US.md; locale: en-US; page: /en-US/back-top -->

# BackTop

Visibility RAF and JS duration/easing interpolation have separate ownership. Old listeners/canceled or consumed frames cannot replay after target replacement/deactivation/disposal. Recheck after custom easing before writing; RAF/cancel/time origin use the target owner window. Retained inactive/disposed commands are inert, activation does not resume old animation. Scoped14/full30 per copy pass using controlled queues/iframe, not native browser/OS proof. Default200ms/API remain; no CSS token added.

A native button that scrolls the page or an explicit container to the top.

## Basic examples

### Basic usage

Example source: src/back-top/example/demos/en-US/basic-usage.vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scroller = ref<HTMLElement>()
onMounted(() => {
  if (scroller.value) {
    scroller.value.scrollTop = 240
    scroller.value.dispatchEvent(new Event('scroll'))
  }
})
</script>

<template>
  <div class="back-top-demo">
    <p>Scroll inside this panel. The button appears at 120px.</p>
    <div class="back-top-demo__frame">
      <div ref="scroller" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">A · Scroll content {{ row }}</p>
      </div>
      <mp-back-top
        :target-container="() => scroller"
        :popup-container="false"
        :visible-height="120"
        :right="16"
        :bottom="16"
        aria-label="Back to top"
      />
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.back-top-demo > p {
  margin: 0;
}
.back-top-demo__frame {
  position: relative;
  display: flex;
  gap: 12px;
}
.back-top-demo__scroll {
  flex: 1;
  min-width: 0;
  height: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.back-top-demo__scroll p {
  padding: 8px 12px;
  margin: 0;
}
</style>
```

## Customization and slots

### Custom position

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target-container` | Scroll target; omitted means page | Custom position |
| `popup-container` | Render target; false renders locally | Custom position |
| `visible-height` | Inclusive scroll threshold in px, numeric strings accepted | Custom position |
| `right` | Right offset; number in px, string accepts CSS units | Custom position |
| `bottom` | Bottom offset; number in px, string accepts CSS units | Custom position |
| `aria-label` | Accessible name | Custom position |
<!-- demo-config-notes:end -->


Example source: src/back-top/example/demos/en-US/custom-position.vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scroller = ref<HTMLElement>()
onMounted(() => {
  if (scroller.value) {
    scroller.value.scrollTop = 240
    scroller.value.dispatchEvent(new Event('scroll'))
  }
})
</script>

<template>
  <div class="back-top-demo">
    <p>Scroll inside this panel. The button appears at 120px.</p>
    <div class="back-top-demo__frame">
      <div ref="scroller" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">A · Scroll content {{ row }}</p>
      </div>
      <mp-back-top
        :target-container="() => scroller"
        :popup-container="false"
        :visible-height="120"
        :right="64"
        :bottom="32"
        aria-label="Back to top"
      />
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.back-top-demo > p {
  margin: 0;
}
.back-top-demo__frame {
  position: relative;
  display: flex;
  gap: 12px;
}
.back-top-demo__scroll {
  flex: 1;
  min-width: 0;
  height: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.back-top-demo__scroll p {
  padding: 8px 12px;
  margin: 0;
}
</style>
```

## Interaction and control

### Switch scroll container

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target-container` | Scroll target; omitted means page | Switch scroll container, Content and events |
| `popup-container` | Render target; false renders locally | Switch scroll container, Content and events |
| `visible-height` | Inclusive scroll threshold in px, numeric strings accepted | Switch scroll container, Content and events |
| `right` | Right offset; number in px, string accepts CSS units | Switch scroll container, Content and events |
| `bottom` | Bottom offset; number in px, string accepts CSS units | Switch scroll container, Content and events |
| `aria-label` | Accessible name | Switch scroll container, Content and events |
<!-- demo-config-notes:end -->


Example source: src/back-top/example/demos/en-US/target-container.vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scroller = ref<HTMLElement>()
const second = ref<HTMLElement>()
const useSecond = ref(false)
onMounted(() => {
  if (scroller.value) {
    scroller.value.scrollTop = 240
    scroller.value.dispatchEvent(new Event('scroll'))
  }
})
</script>

<template>
  <div class="back-top-demo">
    <p>Scroll inside this panel. The button appears at 120px.</p>
    <mp-button @click="useSecond = !useSecond">Switch target {{ useSecond ? 'B' : 'A' }}</mp-button>
    <div class="back-top-demo__frame">
      <div ref="scroller" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">A · Scroll content {{ row }}</p>
      </div>
      <div ref="second" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">B · Scroll content {{ row }}</p>
      </div>
      <mp-back-top
        :target-container="() => (useSecond ? second : scroller)"
        :popup-container="false"
        :visible-height="120"
        :right="16"
        :bottom="16"
        aria-label="Back to top"
      />
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.back-top-demo > p {
  margin: 0;
}
.back-top-demo__frame {
  position: relative;
  display: flex;
  gap: 12px;
}
.back-top-demo__scroll {
  flex: 1;
  min-width: 0;
  height: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.back-top-demo__scroll p {
  padding: 8px 12px;
  margin: 0;
}
</style>
```

### Content and events

Example source: src/back-top/example/demos/en-US/custom-content.vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scroller = ref<HTMLElement>()
const clicks = ref(0)
onMounted(() => {
  if (scroller.value) {
    scroller.value.scrollTop = 240
    scroller.value.dispatchEvent(new Event('scroll'))
  }
})
</script>

<template>
  <div class="back-top-demo">
    <p>Scroll inside this panel. The button appears at 120px. {{ 'Clicks: ' }}{{ clicks }}</p>
    <div class="back-top-demo__frame">
      <div ref="scroller" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">A · Scroll content {{ row }}</p>
      </div>
      <mp-back-top
        :target-container="() => scroller"
        :popup-container="false"
        :visible-height="120"
        :right="16"
        :bottom="16"
        aria-label="Back to top"
        @click="clicks++"
        >TOP</mp-back-top
      >
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.back-top-demo > p {
  margin: 0;
}
.back-top-demo__frame {
  position: relative;
  display: flex;
  gap: 12px;
}
.back-top-demo__scroll {
  flex: 1;
  min-width: 0;
  height: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.back-top-demo__scroll p {
  padding: 8px 12px;
  margin: 0;
}
</style>
```

The examples use isolated local containers. Omit `target-container` to listen to the page, not the nearest scrollable ancestor. A selector that is invalid or missing hides the button; use a reactive getter for a container mounted asynchronously. `popup-container` controls where the button renders, not what scrolls.

## Lifecycle and edge cases

### Scheduling Lifecycle

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target-container` | Scroll target; omitted means page | Scheduling Lifecycle |
| `popup-container` | Render target; false renders locally | Scheduling Lifecycle |
| `duration` | Animation duration in ms; 0 is immediate | Scheduling Lifecycle |
| `easing` | Built-in curve or normalized progress function | Scheduling Lifecycle |
<!-- demo-config-notes:end -->


Example source: src/back-top/example/demos/en-US/scheduler-lifecycle.vue

```vue
<script setup>
import { ref } from 'vue'

const first = ref()
const second = ref()
const active = ref(true)
const alternate = ref(false)
let retained
const capture = (instance) => {
  if (instance) {
    retained = instance
  }
}
const lower = () => {
  if (first.value) {
    first.value.scrollTop = 300
  }
  if (second.value) {
    second.value.scrollTop = 300
  }
}
</script>
<template>
  <div style="position: relative">
    <mp-button @click="lower">Scroll down / 滚动到底部</mp-button>
    <mp-button @click="alternate = !alternate">Switch target / 切换目标</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="retained?.scrollToTop()">Retained command / 保留命令</mp-button>
    <p>Start an animation, switch or deactivate before completion. Old work must not resume.</p>
    <div ref="first" style="height: 100px; overflow: auto"><div style="height: 500px">Target A</div></div>
    <div ref="second" style="height: 100px; overflow: auto"><div style="height: 500px">Target B</div></div>
    <KeepAlive>
      <mp-back-top
        v-if="active"
        :ref="capture"
        :target-container="() => (alternate ? second : first)"
        :popup-container="false"
        :duration="1000"
        easing="linear"
      />
    </KeepAlive>
  </div>
</template>
```

## Usage notes

### Easing and errors

duration must be finite, nonnegative milliseconds; zero scrolls immediately. Invalid durations produce Vue prop validation warnings in development and retain the immediate-completion runtime fallback. The easing presets are linear, quartOut and easeInOutCubic; invalid names warn and fall back to quartOut. A custom function receives progress from 0 to 1: finite results are clamped to 0–1, while nonfinite or nonnumeric results use the current linear progress. Promises are not awaited. Thrown errors propagate unchanged to the calling environment; that frame schedules no further animation, and scrollToTop can retry. No click success or extra error event is fabricated.

## API

### BackTop Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `target-container` | Scroll target; omitted means page | `string \| HTMLElement \| (() => HTMLElement \| null \| undefined)` | `—` |
| `popup-container` | Render target; false renders locally | `string \| HTMLElement \| false` | `body` |
| `visible-height` | Inclusive scroll threshold in px, numeric strings accepted | `number \| string` | `200` |
| `duration` | Animation duration in ms; 0 is immediate | `number` | `200` |
| `easing` | Built-in curve or normalized progress function | `'linear' \| 'quartOut' \| 'easeInOutCubic' \| ((progress: number) => number)` | `'quartOut'` |
| `right` | Right offset; number in px, string accepts CSS units | `number \| string` | `—` |
| `bottom` | Bottom offset; number in px, string accepts CSS units | `number \| string` | `—` |
| `elevation` | Shadow level; true uses level 2 | `boolean \| number` | `true` |
| `aria-label` | Accessible name | `string` | `'Back to top'` |

When `popup-container=false`, the button is positioned absolutely; give its containing block `position: relative`. Repeated clicks replace the previous animation; changing target, deactivation and unmount cancel queued work. Reduced-motion preference skips animation. Horizontal scroll position is preserved.

### BackTop Events / Slots / Methods

- `click(event: MouseEvent)`: emitted once per activation.
- Default slot: noninteractive text or icons. The root is already a native button; do not nest another Button or link.
- `scrollToTop()`: scrolls the current target without emitting an additional click.
- Keyboard: Tab focuses the visible button; Enter / Space activates it. Hidden buttons are not focusable.

## Types

```ts
import type { BackTopProps, BackTopInstance, BackTopTarget, BackTopEasing } from '@maple-design/ui-vue'
```

### Imports and event types

The subentry default component and the named components from the subentry and root are the same component. Props includes actual listener parameters. Events remain notifications and do not await returned Promises. Use only the documented instance methods.

```ts
import BackTop, { BackTop as NamedBackTop } from '@maple-design/ui-vue/back-top'
import { BackTop as RootBackTop } from '@maple-design/ui-vue'
import type { BackTopProps, BackTopInstance } from '@maple-design/ui-vue'
import type { BackTopProps as SubBackTopProps } from '@maple-design/ui-vue/back-top'
const options: BackTopProps = { onClick: (event: MouseEvent) => event.preventDefault() }
```

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-back-top-background` | `var(--mp-sys-color-surface-raised)` | `background` |
| `--mp-back-top-bottom` | `40px` | `bottom` |
| `--mp-back-top-button-border-radius` | `50%` | `border-radius` |
| `--mp-back-top-button-size` | `var(--mp-sys-control-touch-target)` | `height`, `width` |
| `--mp-back-top-focus-color` | `var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-back-top-focus-offset` | `2px` | `outline-offset` |
| `--mp-back-top-focus-width` | `2px` | `outline` |
| `--mp-back-top-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-back-top-hover-background` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-back-top-icon-size` | `20px` | `height`, `width` |
| `--mp-back-top-right` | `40px` | `right` |
| `--mp-back-top-text-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-back-top-z-index` | `var(--mp-z-index-local-sticky)` | `z-index` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-back-top-background: var(--mp-sys-color-surface-raised);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
