<!-- Source: src/infinite-scroll/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/infinite-scroll -->

# 无限滚动 InfiniteScroll

示例滚动容器使用当前主题背景，暗色模式下同样保持列表文字可读。

行为型无限加载器。它只负责触底检测与分页状态，列表展示可组合 `List`、`Cell` 或业务内容。

## 案例

### 基础用法

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

### 失败重试

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

### 自定义状态

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

### 测量绑定生命周期

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

## 使用说明

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

组件触底时先同步发出 `update:status('loading')`，再发出 `load`，并立即加锁。父组件完成请求后必须把状态设为 `idle`、`error` 或 `finished`。`retry()` 只发出 `retry`，不会额外发出 `load`。

## 错误插槽

自定义重试操作请使用按钮，支持键盘 Enter/Space。示例中的模拟请求会在卸载或停用时清理计时器，避免离开页面后继续回写。

基础、自定义状态和错误重试示例均清理模拟请求；KeepAlive 恢复后可从 idle 状态重新加载，不复用取消前的计时器。

默认错误区可点击重试。自定义错误区可使用同一个 `retry` 方法：

```html
<template #error="{ retry }">
  <mp-button html-type="button" @click="retry">重新加载</mp-button>
</template>
```

## 滚动容器与阈值

未提供 `target` 时自动查找最近的滚动父级；也可传 CSS 选择器或 `HTMLElement`。数字 `bottomOffset` 按 px，字符串按完整 CSS length 换算，支持 `rem`、`em`、`vh`、`vw` 与 `calc(...)`。

## 与 PullRefresh 组合

刷新期间使用 `disabled` 暂停分页。刷新完成后替换数据、重置 `status`，再启用并检查：

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

隐藏的 Tab 不会触发加载，重新激活后会自动检查；也可在业务激活回调中调用 `check()`。

## API

### 属性

| 参数             | 说明                  | 类型                                           | 默认值   |
| ---------------- | --------------------- | ---------------------------------------------- | -------- |
| `v-model:status` | 分页状态              | `'idle' \| 'loading' \| 'error' \| 'finished'` | `'idle'` |
| `bottom-offset`  | 触底阈值              | `string \| number`                             | `0`      |
| `immediate`      | 挂载后是否立即检查    | `boolean`                                      | `true`   |
| `disabled`       | 是否暂停加载和重试    | `boolean`                                      | `false`  |
| `target`         | 滚动容器或 CSS 选择器 | `string \| HTMLElement`                        | `-`      |

### 事件

| 事件名          | 说明             | 参数       |
| --------------- | ---------------- | ---------- |
| `update:status` | 请求更新分页状态 | `(status)` |
| `load`          | 触底请求下一页   | `-`        |
| `retry`         | 从错误状态重试   | `-`        |

### 插槽

| 名称       | 说明     | 参数        |
| ---------- | -------- | ----------- |
| `default`  | 内容     | `-`         |
| `loading`  | 加载状态 | `-`         |
| `error`    | 错误状态 | `{ retry }` |
| `finished` | 完成状态 | `-`         |

### 方法

| 方法      | 说明                 |
| --------- | -------------------- |
| `check()` | 主动检查是否到达阈值 |
| `retry()` | 在错误状态发起重试   |

## 样式变量

| 变量名                                    | 默认值                   |
| ----------------------------------------- | ------------------------ |
| `--mp-infinite-scroll-status-min-height`  | `50px`                   |
| `--mp-infinite-scroll-status-padding`     | `12px 0`                 |
| `--mp-infinite-scroll-status-color`       | `var(--mp-color-text-3)` |
| `--mp-infinite-scroll-status-font-size`   | `var(--mp-font-size-md)` |
| `--mp-infinite-scroll-loading-gap`        | `8px`                    |
| `--mp-infinite-scroll-error-color`        | `var(--mp-color-danger)` |
