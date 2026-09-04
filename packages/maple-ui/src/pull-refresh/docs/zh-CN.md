# 下拉刷新 PullRefresh

用于在列表顶部提供下拉刷新交互。

## 案例

### 基础用法

下拉到刷新位置后松开触发 `refresh`。开始时把 `v-model` 设为 `true` 表示加载中，结束后设为 `false`。

```html
<script setup>
import { ref } from 'vue'

const data1 = Array(30).fill('列表项')
const data2 = Array(30).fill('新的列表项')
const isRefresh = ref(false)
const data = ref(data1)

function refresh() {
  setTimeout(() => {
    data.value = data.value[0] === '列表项' ? data2 : data1
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

### 与 InfiniteScroll 组合

与 `InfiniteScroll` 组合可同时实现下拉刷新和触底加载。刷新期间通过 `disabled` 暂停分页，完成后重置数据和分页状态。

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
      <mp-cell v-for="item in list" :key="item">列表项 {{ item }}</mp-cell>
    </mp-infinite-scroll>
  </mp-pull-refresh>
</template>
```

### 高度注意

容器高度为 `0` 时下拉会失效，需保证子元素高度不为 `0`，或直接给 `PullRefresh` 设置高度。

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

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 是否处于加载中 | `boolean` | `-` |
| `disabled` | 是否禁用下拉刷新 | `boolean` | `false` |
| `target` | 滚动容器，未传入时监听最近的可滚动祖先 | `string \| HTMLElement` | `-` |
| `animation-duration` | 回弹动画时长（ms） | `number \| string` | `300` |
| `success-duration` | 成功状态展示时长（ms） | `number \| string` | `2000` |
| `bg-color` | 指示器背景色 | `string` | `-` |
| `color` | 指示器颜色 | `string` | `-` |
| `success-bg-color` | 成功状态指示器背景色 | `string` | `-` |
| `success-color` | 成功状态指示器颜色 | `string` | `-` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `refresh` | 触发刷新时 | `-` |
| `update:model-value` | 加载状态变化时 | `(value: boolean)` |

### 插槽

| 名称 | 说明 |
| --- | --- |
| `default` | 列表内容 |

## 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-pull-refresh-size` | `40px` |
| `--mp-pull-refresh-background` | `#fff` |
| `--mp-pull-refresh-color` | `var(--mp-color-primary)` |
| `--mp-pull-refresh-success-color` | `var(--mp-color-success)` |
| `--mp-pull-refresh-icon-size` | `25px` |
