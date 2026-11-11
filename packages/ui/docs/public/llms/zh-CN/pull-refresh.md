<!-- Source: src/pull-refresh/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/pull-refresh -->

# 下拉刷新 PullRefresh

用于在列表顶部提供下拉刷新交互。

## 基础示例

### 基本使用

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

`animation-duration` 和 `success-duration` 接受非负有限毫秒数或纯数字字符串，0 有效；其他值回退到各自默认值。`success-bg-color` 省略时使用主题背景，`success-color` 省略时使用成功色 token，而不是继承普通状态的内联颜色。

选择器目标须在绑定时存在；无效选择器或缺失目标会报错。改变 `target` 会重新绑定并按当前 `v-model` 收敛状态。组件未公开正式的命令式刷新方法。

为键盘用户提供调用同一刷新业务函数的按钮，并用业务状态设置按钮的 `disabled` 和 `aria-busy`；同时可通过独立的 `role="status"` 区域播报完成或失败。`refresh` 是通知，业务需接收 `update:modelValue` 的 true 并在结束时设为 false，事件返回的 Promise 不控制状态。

## API

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示刷新加载状态；异步完成时仍由父级绑定值设为 false；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

### PullRefresh Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 是否处于加载中 | `boolean` | `-` |
| `default-value` | 非受控初始刷新状态，仅创建时读取 | `boolean` | `false` |
| `disabled` | 是否禁用下拉刷新 | `boolean` | `false` |
| `target` | 滚动容器，未传入时监听最近的可滚动祖先 | `string \| HTMLElement` | `-` |
| `animation-duration` | 回弹动画时长（ms） | `number \| string` | `300` |
| `success-duration` | 成功状态展示时长（ms） | `number \| string` | `2000` |
| `bg-color` | 指示器背景色 | `string` | `-` |
| `color` | 指示器颜色 | `string` | `-` |
| `success-bg-color` | 成功状态指示器背景色 | `string` | `-` |
| `success-color` | 成功状态指示器颜色 | `string` | `-` |

### PullRefresh Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `refresh` | 触发刷新时 | `-` |
| `update:model-value` | 加载状态变化时 | `(value: boolean)` |

### PullRefresh Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 列表内容 |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-pull-refresh-background` | `#fff` | `background-color` |
| `--mp-pull-refresh-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-pull-refresh-icon-size` | `25px` | `font-size` |
| `--mp-pull-refresh-size` | `40px` | `height`, `width` |
| `--mp-pull-refresh-success-color` | `var(--mp-sys-color-content-success)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-pull-refresh-background: #fff;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
