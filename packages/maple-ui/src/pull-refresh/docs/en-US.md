# PullRefresh

Provides pull-to-refresh at the top of a list.

## Examples

### Basic Usage

`refresh` fires after releasing at the refresh position. Set `v-model` to `true` while loading, then back to `false` when finished.

```html
<script setup>
import { ref } from 'vue'

const data1 = Array(30).fill('List Item')
const data2 = Array(30).fill('This is new List Item')
const isRefresh = ref(false)
const data = ref(data1)

function refresh() {
  setTimeout(() => {
    data.value = data.value[0] === 'List Item' ? data2 : data1
    isRefresh.value = false
  }, 2000)
}
</script>

<template>
  <mp-pull-refresh v-model="isRefresh" @refresh="refresh">
    <mp-cell v-for="(item, index) in data" :key="index" border>
      {{ item }} {{ index + 1 }}
    </mp-cell>
  </mp-pull-refresh>
</template>
```

### Combine with InfiniteScroll

Use with `InfiniteScroll` for pull-down refresh and bottom loading. Pause pagination with `disabled` while refreshing, then reset the data and pagination status.

```html
<script setup>
import { ref } from 'vue'

const refreshing = ref(false)
const infiniteDisabled = ref(false)
const status = ref('idle')
const list = ref([])

async function refresh() {
  infiniteDisabled.value = true
  list.value = await fetchFirstPage()
  status.value = 'idle'
  refreshing.value = false
  infiniteDisabled.value = false
}

async function load() {
  try {
    const next = await fetchNextPage()
    list.value.push(...next.items)
    status.value = next.hasMore ? 'idle' : 'finished'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <mp-pull-refresh v-model="refreshing" @refresh="refresh">
    <mp-infinite-scroll
      v-model:status="status"
      :disabled="infiniteDisabled"
      @load="load"
      @retry="load"
    >
      <mp-cell v-for="item in list" :key="item">List Item {{ item }}</mp-cell>
    </mp-infinite-scroll>
  </mp-pull-refresh>
</template>
```

### Height

Pull-to-refresh will not work when the container height is `0`. Give children a non-zero height, or set height on `PullRefresh`.

```html
<!-- playground-ignore -->
<mp-pull-refresh>
  <div style="height: 200px"></div>
</mp-pull-refresh>

<mp-pull-refresh style="height: 200px">
  <div></div>
</mp-pull-refresh>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Loading status | `boolean` | `-` |
| `disabled` | Disable pull-to-refresh | `boolean` | `false` |
| `target` | Scroll container. Defaults to the nearest scrollable ancestor | `string \| HTMLElement` | `-` |
| `animation-duration` | Rebound animation duration (ms) | `number \| string` | `300` |
| `success-duration` | Success state duration (ms) | `number \| string` | `2000` |
| `bg-color` | Indicator background | `string` | `-` |
| `color` | Indicator color | `string` | `-` |
| `success-bg-color` | Success indicator background | `string` | `-` |
| `success-color` | Success indicator color | `string` | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `refresh` | Fired when refresh starts | `-` |
| `update:modelValue` | Fired when loading status changes | `(value: boolean)` |

### Slots

| Name | Description |
| --- | --- |
| `default` | List content |

## Style Variables

| Variable | Default |
| --- | --- |
| `--mp-pull-refresh-size` | `40px` |
| `--mp-pull-refresh-background` | `#fff` |
| `--mp-pull-refresh-color` | `var(--mp-color-primary)` |
| `--mp-pull-refresh-success-color` | `var(--mp-color-success)` |
| `--mp-pull-refresh-icon-size` | `25px` |
