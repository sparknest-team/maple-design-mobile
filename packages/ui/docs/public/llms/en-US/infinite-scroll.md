<!-- Source: src/infinite-scroll/docs/en-US.md; locale: en-US; page: /en-US/infinite-scroll -->

# InfiniteScroll

Bottom checks use coalesced RAF (zero-delay timeout fallback), not CSS motion duration. Rebinding/deactivation/disposal invalidates old tasks and detached observers; consumed callbacks cannot replay or clear newer handles. Retained inactive/disposed check/retry remain inert; activation uses fresh binding/checks. Business request cancellation belongs to the caller. Controlled lifecycle audit:10/10 per copy, not native browser/OS or cross-document proof.

Demo scroll containers use the current theme background to keep list text readable in dark mode.

A behavioral infinite loader. It handles bottom detection and pagination status only; compose it with `List`, `Cell`, or custom content.

## Basic examples

### Basic Usage

Example source: src/infinite-scroll/example/demos/basic.vue

```vue
<script setup lang="ts">
import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import type { InfiniteScrollStatus } from '@maple-design/ui-vue'

const scroller = ref<HTMLElement>()
const status = ref<InfiniteScrollStatus>('idle')
let timer: ReturnType<typeof setTimeout> | undefined
const items = ref<number[]>([])
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})

function load() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    timer = undefined
    for (let index = 0; index < 12; index++) {
      items.value.push(items.value.length + 1)
    }
    status.value = items.value.length >= 60 ? 'finished' : 'idle'
  }, 500)
}
onBeforeUnmount(() => clearTimeout(timer))
onDeactivated(() => {
  clearTimeout(timer)
  timer = undefined
  if (status.value === 'loading') {
    status.value = 'idle'
  }
})
</script>

<template>
  <div ref="scroller" class="infinite-scroll-demo">
    <mp-infinite-scroll v-model:status="status" :target="scroller" :bottom-offset="24" @load="load">
      <mp-cell v-for="item in items" :key="item">{{ english ? 'List item' : '列表项' }} {{ item }}</mp-cell>
    </mp-infinite-scroll>
  </div>
</template>

<style scoped>
.infinite-scroll-demo {
  height: 280px;
  overflow-y: auto;
  background: var(--mp-color-bg-1);
}
</style>
```

## Content and presentation

### Retry on Error

Example source: src/infinite-scroll/example/demos/error.vue

```vue
<script setup lang="ts">
import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import type { InfiniteScrollStatus } from '@maple-design/ui-vue'

const scroller = ref<HTMLElement>()
const status = ref<InfiniteScrollStatus>('idle')
const items = ref<number[]>([])
let failedOnce = false
let timer: ReturnType<typeof setTimeout> | undefined
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})

function load() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    timer = undefined
    if (!failedOnce && items.value.length >= 12) {
      failedOnce = true
      status.value = 'error'
      return
    }
    for (let index = 0; index < 12; index++) {
      items.value.push(items.value.length + 1)
    }
    status.value = items.value.length >= 48 ? 'finished' : 'idle'
  }, 500)
}
onBeforeUnmount(() => clearTimeout(timer))
onDeactivated(() => {
  clearTimeout(timer)
  timer = undefined
  if (status.value === 'loading') {
    status.value = 'idle'
  }
})
</script>

<template>
  <div ref="scroller" class="infinite-scroll-demo">
    <mp-infinite-scroll v-model:status="status" :target="scroller" @load="load" @retry="load">
      <mp-cell v-for="item in items" :key="item">{{ english ? 'List item' : '列表项' }} {{ item }}</mp-cell>
      <template #error="{ retry }">
        {{ english ? 'Load failed.' : '加载失败，' }}
        <mp-button variant="text" size="sm" status="primary" @click="retry">{{
          english ? 'Try again' : '点击重试'
        }}</mp-button>
      </template>
    </mp-infinite-scroll>
  </div>
</template>

<style scoped>
.infinite-scroll-demo {
  height: 280px;
  overflow-y: auto;
  background: var(--mp-color-bg-1);
}
</style>
```

## Customization and slots

### Custom Status

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target` | Scroll container or CSS selector | Custom Status |
| `bottom-offset` | Bottom threshold | Custom Status |
<!-- demo-config-notes:end -->


Example source: src/infinite-scroll/example/demos/custom-status.vue

```vue
<script setup lang="ts">
import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import type { InfiniteScrollStatus } from '@maple-design/ui-vue'

const scroller = ref<HTMLElement>()
const status = ref<InfiniteScrollStatus>('idle')
let timer: ReturnType<typeof setTimeout> | undefined
const items = ref<number[]>([])
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})

function load() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    timer = undefined
    for (let index = 0; index < 12; index++) {
      items.value.push(items.value.length + 1)
    }
    status.value = items.value.length >= 48 ? 'finished' : 'idle'
  }, 500)
}
onBeforeUnmount(() => clearTimeout(timer))
onDeactivated(() => {
  clearTimeout(timer)
  timer = undefined
  if (status.value === 'loading') {
    status.value = 'idle'
  }
})
</script>

<template>
  <div ref="scroller" class="infinite-scroll-demo">
    <mp-infinite-scroll v-model:status="status" :target="scroller" bottom-offset="2rem" @load="load">
      <mp-cell v-for="item in items" :key="item">{{ english ? 'List item' : '列表项' }} {{ item }}</mp-cell>
      <template #loading>{{ english ? 'Loading more' : '正在努力加载' }}</template>
      <template #finished>{{ english ? 'All content loaded' : '已加载全部内容' }}</template>
    </mp-infinite-scroll>
  </div>
</template>

<style scoped>
.infinite-scroll-demo {
  height: 280px;
  overflow-y: auto;
  background: var(--mp-color-bg-1);
}
</style>
```

## Lifecycle and edge cases

### Measurement Binding Lifecycle

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target` | Scroll container or CSS selector | Measurement Binding Lifecycle |
| `immediate` | Check after mounting | Measurement Binding Lifecycle |
<!-- demo-config-notes:end -->


Example source: src/infinite-scroll/example/demos/scheduler-lifecycle.vue

```vue
<script setup>
import { ref } from 'vue'

const first = ref()
const second = ref()
const alternate = ref(false)
const active = ref(true)
const status = ref('idle')
const loads = ref(0)
const load = () => {
  loads.value++
  status.value = 'finished'
}
</script>
<template>
  <div>
    <mp-button @click="alternate = !alternate">Switch target / 切换目标</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="status = 'idle'">New status cycle / 新状态循环</mp-button>
    <p>Loads / 加载次数: {{ loads }}. Old checks must not replay / 旧检查不能重放。</p>
    <div ref="first" style="height: 100px; overflow: auto"><div style="height: 300px">Target A</div></div>
    <div ref="second" style="height: 100px; overflow: auto"><div style="height: 300px">Target B</div></div>
    <KeepAlive>
      <mp-infinite-scroll
        v-if="active"
        v-model:status="status"
        :target="alternate ? second : first"
        :immediate="false"
        @load="load"
      >
        <div>Detector / 触底检测</div>
      </mp-infinite-scroll>
    </KeepAlive>
  </div>
</template>
```

## Usage notes

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import type { InfiniteScrollStatus } from '@maple-design/ui-vue'

  const status = ref<InfiniteScrollStatus>('idle')
  const items = ref([])

  async function loadMore() {
    try {
      const next = await fetchNextPage()
      items.value.push(...next.items)
      status.value = next.hasMore ? 'idle' : 'finished'
    } catch {
      status.value = 'error'
    }
  }
</script>

<template>
  <mp-infinite-scroll v-model:status="status" @load="loadMore" @retry="loadMore">
    <mp-list :data="items">
      <template #item="{ item }">
        <mp-list-item>{{ item.name }}</mp-list-item>
      </template>
    </mp-list>
  </mp-infinite-scroll>
</template>
```

At the bottom threshold, the component synchronously emits `update:status('loading')`, then `load` and locks immediately. After requests, parents must set `idle`/`error`/`finished`. `retry()` emits `retry` only, not `load`.

## Error slot

Use a button for custom retry, supporting Enter/Space. Simulated requests clean timers on unmount/deactivation to avoid later writes.

Basic/custom-status/retry examples all clean simulated requests. KeepAlive reactivation can load again from idle without reusing canceled timers.

The default error area retries on click. Custom error areas can use the same `retry` method:

```html
<template #error="{ retry }">
  <mp-button html-type="button" @click="retry">Reload</mp-button>
</template>
```

## Scroll containers and thresholds

Without `target`, the nearest scrolling ancestor is resolved automatically. CSS selectors/`HTMLElement` are accepted. Numeric `bottomOffset` uses px; strings use full CSS lengths including `rem`/`em`/`vh`/`vw`/`calc(...)`.

## Composing PullRefresh

Use `disabled` to pause pagination while refreshing. Then replace data, reset `status`, re-enable and check:

```ts
async function refresh() {
  infiniteDisabled.value = true
  const firstPage = await fetchFirstPage()
  items.value = firstPage.items
  status.value = firstPage.hasMore ? 'idle' : 'finished'
  infiniteDisabled.value = false
  await nextTick()
  infiniteScrollRef.value?.check()
}
```

Hidden tabs do not load; reactivation checks automatically. Business activation callbacks may also call `check()`.

When `target` is a selector, its element must exist when binding occurs. `check()` uses the current binding and does not resolve the selector again; pass the element or change `target` to rebind. Accept the emitted `loading` via `v-model:status`, then set `idle`, `error`, or `finished` when the request settles; assigning the original `idle` alone does not release the request lock. A negative numeric offset requires scrolling past the bottom. String offsets are resolved as CSS widths: negative lengths fall back to zero, and percentages use the measurement element’s CSS containing-block width.

## API

### InfiniteScroll Props

| Prop | Description | Type | Default |
| ---------------- | --------------------- | ---------------------------------------------- | -------- |
| `v-model:status` | Pagination status | `'idle' \| 'loading' \| 'error' \| 'finished'` | `'idle'` |
| `bottom-offset` | Bottom threshold | `string \| number` | `0` |
| `immediate` | Check after mounting | `boolean` | `true` |
| `disabled` | Pause loading and retry | `boolean` | `false` |
| `target` | Scroll container or CSS selector | `string \| HTMLElement` | `-` |

### InfiniteScroll Events

| Event | Description | Arguments |
| --------------- | ---------------- | ---------- |
| `update:status` | Requests a pagination status update | `(status)` |
| `load` | Requests the next page at the threshold | `-` |
| `retry` | Retries from the error state | `-` |

### InfiniteScroll Slots

| Name | Description | Prop |
| ---------- | -------- | ----------- |
| `default` | Content | `-` |
| `loading` | Loading state | `-` |
| `error` | Error state | `{ retry }` |
| `finished` | Finished state | `-` |

### InfiniteScroll Methods

| Method | Description |
| --------- | -------------------- |
| `check()` | Checks the current threshold |
| `retry()` | Retries while in the error state |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-infinite-scroll-error-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-infinite-scroll-loading-gap` | `8px` | `gap` |
| `--mp-infinite-scroll-status-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-infinite-scroll-status-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-infinite-scroll-status-min-height` | `50px` | `min-height` |
| `--mp-infinite-scroll-status-padding` | `12px 0` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-infinite-scroll-error-color: var(--mp-sys-color-content-danger);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
