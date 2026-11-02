<!-- Source: src/infinite-scroll/docs/en-US.md; locale: en-US; page: /en-US/infinite-scroll -->

# InfiniteScroll

Bottom checks use coalesced RAF (zero-delay timeout fallback), not CSS motion duration. Rebinding/deactivation/disposal invalidates old tasks and detached observers; consumed callbacks cannot replay or clear newer handles. Retained inactive/disposed check/retry remain inert; activation uses fresh binding/checks. Business request cancellation belongs to the caller. Controlled lifecycle audit:10/10 per copy, not native browser/OS or cross-document proof.

Demo scroll containers use the current theme background to keep list text readable in dark mode.

A behavioral infinite loader. It handles bottom detection and pagination status only; compose it with `List`, `Cell`, or custom content.


## Examples

### Basic Usage

Example source: src/infinite-scroll/example/demos/basic.vue

```vue
<script setup lang="ts">
import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import type { InfiniteScrollStatus } from '@maple-design/ui'

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

### Retry on Error

Example source: src/infinite-scroll/example/demos/error.vue

```vue
<script setup lang="ts">
import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import type { InfiniteScrollStatus } from '@maple-design/ui'

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

### Custom Status

Example source: src/infinite-scroll/example/demos/custom-status.vue

```vue
<script setup lang="ts">
import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import type { InfiniteScrollStatus } from '@maple-design/ui'

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

### Measurement Binding Lifecycle

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

## Usage

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import type { InfiniteScrollStatus } from '@maple-design/ui'

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

At the threshold, the component synchronously emits `update:status('loading')` before `load` and immediately locks further checks. Set the status to `idle`, `error`, or `finished` when the request completes. `retry()` emits only `retry`, never an additional `load`.

## Error Slot

Use a button for custom retry actions so Enter/Space works. The demo clears its simulated request timer on unmount or deactivation to prevent stale updates after leaving the page.

Basic, custom-status and error demos all clear pending requests. After KeepAlive reactivation they can load again from idle without reusing cancelled timers.

The default error area is clickable. A custom error slot receives the same `retry` method:

```html
<template #error="{ retry }">
  <mp-button html-type="button" @click="retry">Try again</mp-button>
</template>
```

## Scroll Container and Threshold

Without `target`, the nearest scrollable ancestor is used. You can also pass a CSS selector or `HTMLElement`. Numeric `bottomOffset` values are pixels; strings are evaluated as full CSS lengths, including `rem`, `em`, `vh`, `vw`, and `calc(...)`.

## PullRefresh Composition

Use `disabled` to pause pagination during refresh. Replace the data, reset `status`, enable loading, and then check:

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

A hidden Tab does not load. It is checked after becoming active; custom tab implementations can call `check()` from their activation callback.

## API

### Props

| Prop             | Description                      | Type                                           | Default  |
| ---------------- | -------------------------------- | ---------------------------------------------- | -------- |
| `v-model:status` | Pagination status                | `'idle' \| 'loading' \| 'error' \| 'finished'` | `'idle'` |
| `bottom-offset`  | Bottom threshold                 | `string \| number`                             | `0`      |
| `immediate`      | Check after mounting             | `boolean`                                      | `true`   |
| `disabled`       | Pause loading and retry          | `boolean`                                      | `false`  |
| `target`         | Scroll container or CSS selector | `string \| HTMLElement`                        | `-`      |

### Events

| Event           | Description                             | Arguments  |
| --------------- | --------------------------------------- | ---------- |
| `update:status` | Requests a pagination status update     | `(status)` |
| `load`          | Requests the next page at the threshold | `-`        |
| `retry`         | Retries from the error state            | `-`        |

### Slots

| Name       | Description    | Props       |
| ---------- | -------------- | ----------- |
| `default`  | Content        | `-`         |
| `loading`  | Loading state  | `-`         |
| `error`    | Error state    | `{ retry }` |
| `finished` | Finished state | `-`         |

### Methods

| Method    | Description                      |
| --------- | -------------------------------- |
| `check()` | Checks the current threshold     |
| `retry()` | Retries while in the error state |

## Style Variables

| Variable                                  | Default                  |
| ----------------------------------------- | ------------------------ |
| `--mp-infinite-scroll-status-min-height`  | `50px`                   |
| `--mp-infinite-scroll-status-padding`     | `12px 0`                 |
| `--mp-infinite-scroll-status-color`       | `var(--mp-color-text-3)` |
| `--mp-infinite-scroll-status-font-size`   | `var(--mp-font-size-md)` |
| `--mp-infinite-scroll-loading-gap`        | `8px`                    |
| `--mp-infinite-scroll-error-color`        | `var(--mp-color-danger)` |
