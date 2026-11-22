# InfiniteScroll

Bottom checks use coalesced RAF (zero-delay timeout fallback), not CSS motion duration. Rebinding/deactivation/disposal invalidates old tasks and detached observers; consumed callbacks cannot replay or clear newer handles. Retained inactive/disposed check/retry remain inert; activation uses fresh binding/checks. Business request cancellation belongs to the caller. Controlled lifecycle audit:10/10 per copy, not native browser/OS or cross-document proof.

Demo scroll containers use the current theme background to keep list text readable in dark mode.

A behavioral infinite loader. It handles bottom detection and pagination status only; compose it with `List`, `Cell`, or custom content.

## Basic examples

### Basic Usage

```demo
../example/demos/en-US/basic.vue
```

## Content and presentation

### Retry on Error

```demo
../example/demos/en-US/error.vue
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


```demo
../example/demos/en-US/custom-status.vue
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


```demo
../example/demos/scheduler-lifecycle.vue
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

| Name | Description | Arguments |
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
