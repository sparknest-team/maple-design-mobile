# 无限滚动 InfiniteScroll

示例滚动容器使用当前主题背景，暗色模式下同样保持列表文字可读。

行为型无限加载器。它只负责触底检测与分页状态，列表展示可组合 `List`、`Cell` 或业务内容。

## 案例

### 基础用法

```demo
../example/demos/basic.vue
```

### 失败重试

```demo
../example/demos/error.vue
```

### 自定义状态

```demo
../example/demos/custom-status.vue
```

### 测量绑定生命周期

```demo
../example/demos/scheduler-lifecycle.vue
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

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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
