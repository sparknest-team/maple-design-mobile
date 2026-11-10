# 滑动单元格

单元格左右滑动以显示操作按钮，常用于列表删除、收藏等场景。

## 基础示例

### 基本使用

向左滑动单元格，显示右侧操作。`name` 是业务标识，不会渲染为文字；它会通过 `open`、`close` 事件和 `before-close` 回调返回。显示内容请放在默认插槽中，例如 `<mp-cell title="订单标题" />`。下方示例展示事件返回的 `name` 和 `position`。

```demo
../example/demos/basic.vue
```

## 方向与操作区域

### 左右两侧

```demo
../example/demos/both-sides.vue
```

## 异步关闭控制

### 关闭前确认

`Dialog.confirm(...)` 返回动作值，只有 `confirm` 允许收起；取消或关闭返回 `false`，保留已展开的操作区。普通示例中的“删除”只演示关闭动作，业务删除需自行处理。

```demo
../example/demos/before-close.vue
```

### 可访问性

- 操作区按钮应自带可读文本或 `aria-label`。
- 禁用时设置 `disabled`，组件不再响应滑动。收起或另一侧展开时，隐藏操作区不可聚焦；收起时若焦点在操作区，会回到展开时的焦点，无法回到原位置时落到单元格容器。
- 可在单元格外放置 Button，通过实例 `open('right')` 展开；在包含单元格的元素上监听 Escape 并调用 `close()`。关闭仍受 `before-close` 控制，业务应为动作本身提供可读名称。

键盘操作组合示例：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SwipeCellInstance } from '@maple-design/ui'

const cell = ref<SwipeCellInstance>()
</script>

<template>
  <div @keydown.esc="cell?.close()">
    <mp-button html-type="button" @click="cell?.open('right')">Show actions</mp-button>
    <mp-swipe-cell ref="cell">
      <div>Order</div>
      <template #right><mp-button html-type="button">Archive</mp-button></template>
    </mp-swipe-cell>
  </div>
</template>
```

## 加载与等待

### 受控加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 业务显式控制的加载状态 | `boolean` | `false` |

外部 loading 暂停关闭／切换操作；内部 before 守卫等待与它合并展示。


通过 loading 显式展示等待；普通事件返回值不参与加载。before-* 守卫按其契约管理内部等待状态。

```demo
../example/demos/loading.vue
```

左右为物理方向。宽度可设 `auto` 或有限数字／数字字符串，单位为 px；负值及非有限或非法数值按 0 处理。`auto` 会在打开前重新测量，并在支持 ResizeObserver 时跟随操作区尺寸变化。外部触摸可请求关闭；鼠标在外部点击不会自动关闭。`click` 只通知 cell、left 或 right，`outside` 仅作为关闭原因。

## API

### SwipeCell Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 业务标识，通过 open、close 和 before-close 返回，不显示为内容 | `string \| number` | `''` |
| `left-width` | 左侧操作区宽度，`auto` 时按内容测量 | `number \| string` | `auto` |
| `right-width` | 右侧操作区宽度 | `number \| string` | `auto` |
| `before-close` | 关闭前钩子，返回 `false` 阻止关闭 | `(args) => boolean \| void \| Promise<boolean \| void>` | `-` |
| `disabled` | 禁用滑动 | `boolean` | `false` |
| `stop-propagation` | 阻止 `touchmove` 冒泡 | `boolean` | `false` |

### SwipeCell Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `position: left \| right \| cell` |
| `open` | 打开时触发 | `{ name, position }` |
| `close` | 关闭时触发 | `{ name, position }` |
| `guard-error` | 关闭守卫抛错或拒绝时触发 | `(error, position)` |

### SwipeCell Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 主内容 |
| `left` | 左侧操作区 |
| `right` | 右侧操作区 |

### SwipeCell Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开侧栏 | `left \| right` |
| `close` | 通过关闭守卫请求收起；返回 `Promise<void>`，不能凭返回值判断是否关闭 | `-` |

### 异步操作反馈

before-* 等待期间显示加载反馈并标记 aria-busy；拒绝或失败后恢复，重复提交不再启动同一操作。普通事件返回的 Promise 不参与加载。守卫失败通过 guard-error 通知，close() 结束等待并保持展开，不再向调用方抛出拒绝；新手势可取消旧关闭请求。

### guard-error

关闭守卫失败后通知一次，参数为 `(error, position)`。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-swipe-cell-background` | `transparent` | `background` |
| `--mp-swipe-cell-transition` | `transform 0.2s ease` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-swipe-cell-background: transparent;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
