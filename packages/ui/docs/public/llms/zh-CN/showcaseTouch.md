<!-- Source: docs/showcaseTouch.zh-CN.md; locale: zh-CN; page: /zh-CN/showcaseTouch -->

# 移动触控体验

尝试下拉刷新和滑动操作。触屏设备与鼠标模拟应分别体验；滑动操作同时提供页面中的可见操作入口。

## 下拉刷新：等待与恢复

向下拉动至触发阈值，松手后等待刷新完成；再重复一次观察状态是否恢复。

Example source: src/pull-refresh/example/demos/basic.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'

const data1 = Array(30).fill('列表项')
const data2 = Array(30).fill('新的列表项')
const isRefresh = ref(false)
const data = ref(data1)
let refreshTimer

function cancelRefresh() {
  clearTimeout(refreshTimer)
  refreshTimer = undefined
  isRefresh.value = false
}
onBeforeUnmount(cancelRefresh)
onDeactivated(cancelRefresh)

onThemeChange()

function refresh() {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => {
    refreshTimer = undefined
    data.value = data.value[0] === '列表项' ? data2 : data1
    isRefresh.value = false
  }, 2000)
}
</script>

<template>
  <div class="pull-refresh-demo__scroller">
    <mp-pull-refresh v-model="isRefresh" :success-duration="2000" @refresh="refresh">
      <mp-cell v-for="(item, index) in data" :key="index" border> {{ item }} {{ index + 1 }} </mp-cell>
    </mp-pull-refresh>
  </div>
</template>

<style scoped>
.pull-refresh-demo__scroller {
  height: 360px;
  overflow: auto;
  overscroll-behavior: contain;
}
</style>
```

## 滑动操作：展开与关闭

向左滑动显示操作，点击操作或收起；在真机触屏体验后，再用可见按钮核对相同业务动作。

Example source: src/swipe-cell/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const lastEvent = ref('向左滑动查看 open / close 事件中的 name')
function recordEvent(type, { name, position }) {
  lastEvent.value = `${type}: name=${name}, position=${position}`
}
</script>

<template>
  <div class="swipe-cell-example">
    <mp-swipe-cell name="order-1001" @open="recordEvent('open', $event)" @close="recordEvent('close', $event)">
      <template #right>
        <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
      </template>
      <mp-cell title="左滑显示操作" border />
    </mp-swipe-cell>
    <p role="status">{{ lastEvent }}</p>
  </div>
</template>
```
