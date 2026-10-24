# InfiniteScroll

Bottom checks use coalesced RAF (zero-delay timeout fallback), not CSS motion duration. Rebinding/deactivation/disposal invalidates old tasks and detached observers; consumed callbacks cannot replay or clear newer handles. Retained inactive/disposed check/retry remain inert; activation uses fresh binding/checks. Business request cancellation belongs to the caller. Controlled lifecycle audit:10/10 per copy, not native browser/OS or cross-document proof.

Demo scroll containers use the current theme background to keep list text readable in dark mode.

A behavioral infinite loader. It handles bottom detection and pagination status only; compose it with `List`, `Cell`, or custom content.


## Examples

### Basic Usage

```demo
../example/demos/basic.vue
```

### Retry on Error

```demo
../example/demos/error.vue
```

### Custom Status

```demo
../example/demos/custom-status.vue
```

### Measurement Binding Lifecycle

```demo
../example/demos/scheduler-lifecycle.vue
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

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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
