# 无限滚动 InfiniteScroll

示例滚动容器使用当前主题背景，暗色模式下同样保持列表文字可读。

行为型无限加载器。它只负责触底检测与分页状态，列表展示可组合 `List`、`Cell` 或业务内容。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 内容与展示

### 失败重试

```demo
../example/demos/error.vue
```

## 自定义与插槽

### 自定义状态

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `target` | 滚动容器或 CSS 选择器 | 自定义状态 |
| `bottom-offset` | 触底阈值 | 自定义状态 |
<!-- demo-config-notes:end -->

```demo
../example/demos/custom-status.vue
```

## 生命周期与边界

### 测量绑定生命周期

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `target` | 滚动容器或 CSS 选择器 | 测量绑定生命周期 |
| `immediate` | 挂载后是否立即检查 | 测量绑定生命周期 |
<!-- demo-config-notes:end -->

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

`target` 为选择器时，目标必须在绑定时已存在；`check()` 只检查当前绑定，不重新解析选择器。目标稍后出现时，请改传元素或变更 `target` 触发重新绑定。使用 `v-model:status` 接收组件发出的 `loading`，请求结束后再设为 `idle`、`error` 或 `finished`；仅重复赋值原来的 `idle` 不会解除请求锁。数字负阈值表示越过底部后才触发；字符串作为 CSS 宽度解析，负长度无效并回退 0，百分比按测量元素的 CSS 包含块宽度计算。

## API

### InfiniteScroll Props

| 参数             | 说明                  | 类型                                           | 默认值   |
| ---------------- | --------------------- | ---------------------------------------------- | -------- |
| `v-model:status` | 分页状态              | `'idle' \| 'loading' \| 'error' \| 'finished'` | `'idle'` |
| `bottom-offset`  | 触底阈值              | `string \| number`                             | `0`      |
| `immediate`      | 挂载后是否立即检查    | `boolean`                                      | `true`   |
| `disabled`       | 是否暂停加载和重试    | `boolean`                                      | `false`  |
| `target`         | 滚动容器或 CSS 选择器 | `string \| HTMLElement`                        | `-`      |

### InfiniteScroll Events

| 事件名          | 说明             | 参数       |
| --------------- | ---------------- | ---------- |
| `update:status` | 请求更新分页状态 | `(status)` |
| `load`          | 触底请求下一页   | `-`        |
| `retry`         | 从错误状态重试   | `-`        |

### InfiniteScroll Slots

| 名称       | 说明     | 参数        |
| ---------- | -------- | ----------- |
| `default`  | 内容     | `-`         |
| `loading`  | 加载状态 | `-`         |
| `error`    | 错误状态 | `{ retry }` |
| `finished` | 完成状态 | `-`         |

### InfiniteScroll Methods

| 方法      | 说明                 |
| --------- | -------------------- |
| `check()` | 主动检查是否到达阈值 |
| `retry()` | 在错误状态发起重试   |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-infinite-scroll-error-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-infinite-scroll-loading-gap` | `8px` | `gap` |
| `--mp-infinite-scroll-status-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-infinite-scroll-status-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-infinite-scroll-status-min-height` | `50px` | `min-height` |
| `--mp-infinite-scroll-status-padding` | `12px 0` | `padding` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-infinite-scroll-error-color: var(--mp-sys-color-content-danger);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
