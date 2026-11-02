<!-- Source: src/back-top/docs/en-US.md; locale: en-US; page: /en-US/back-top -->

# BackTop

Visibility RAF and JS duration/easing interpolation have separate ownership. Old listeners/canceled or consumed frames cannot replay after target replacement/deactivation/disposal. Recheck after custom easing before writing; RAF/cancel/time origin use the target owner window. Retained inactive/disposed commands are inert, activation does not resume old animation. Scoped14/full30 per copy pass using controlled queues/iframe, not native browser/OS proof. Default200ms/API remain; no CSS token added.

A native button that scrolls the page or an explicit container to the top.

## Examples

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

### Switch scroll container

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

### Custom position

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

### Scheduling Lifecycle

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

## API

BackTop duration (200ms) and easing (quartOut) are JS requestAnimationFrame scroll parameters, not CSS motion tokens. Existing component variables own geometry, color, focus and stacking. Preference comes from the scroll target ownerDocument window; enabling reduce during scrolling jumps to top on the next frame while preserving horizontal scroll, not synchronously on an OS event. Repeated activation, target replacement, deactivation and disposal invalidate even dequeued callbacks. Visibility coalescing is not visual animation. Mocked RAF/iframe-document and SSR tests add no real browser/OS passes.

### Props

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

### Events / Slots / Expose

- `click(event: MouseEvent)`: emitted once per activation.
- Default slot: non-interactive content such as text or an icon. Do not nest buttons or links inside the native button.
- `scrollToTop()`: scroll the current target; does not emit `click`.
- Keyboard: Tab focuses the visible native button; Enter or Space activates it. Hidden buttons cannot receive focus.

### Types

```ts
import type { BackTopProps, BackTopInstance, BackTopTarget, BackTopEasing } from '@maple-design/ui'
```

### CSS tokens

| Token | Default |
| --- | --- |
| `--mp-back-top-right` | `40px` |
| `--mp-back-top-bottom` | `40px` |
| `--mp-back-top-button-size` | `var(--mp-sys-control-touch-target)` |
| `--mp-back-top-button-border-radius` | `50%` |
| `--mp-back-top-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-back-top-icon-size` | `20px` |
| `--mp-back-top-background` | `var(--mp-sys-color-surface-raised)` |
| `--mp-back-top-text-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-back-top-hover-background` | `var(--mp-sys-color-state-hover)` |
| `--mp-back-top-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-back-top-focus-width` | `2px` |
| `--mp-back-top-focus-offset` | `2px` |
| `--mp-back-top-z-index` | `var(--mp-z-index-local-sticky)` |

Pre-release migration: Cedar `margin-right/bottom` → `right/bottom`, `button-size-width` → `button-size`, `button-size-font/icon` → `font-size/icon-size`, `button-bg/bg-hover/text-color` → `background/hover-background/text-color` (all with the component prefix). Maple duration is now 200ms; default target is the page. Legacy arbitrary BTween curve names are replaced with the documented presets or a function. No aliases remain.
