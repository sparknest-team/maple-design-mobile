# SplitButton 分裂按钮

演示文案跟随顶部站点语言，中间卡片和右侧手机集合使用同一 Vue 源文件，不依赖局部 locale 激活。

禁用的分段复用 Button 禁用配色并关闭交互反馈；整体禁用同时移除组阴影，仅禁用菜单按钮会阻止菜单打开并关闭非受控的已打开菜单。

箭头通过 icon 插槽显示，两段默认继承相同的 variant、status 和自定义颜色，图标布局不改变配色。

### 介绍

将主要操作按钮和关联操作菜单组合在一起。点击主按钮执行操作，点击右侧按钮展开菜单。

示例统一使用两端都支持的 `Message.info(...)`。默认选择后关闭；仅“浮层与连续选择”保留菜单，同时弹出 Message。outline / text 的箭头保持透明背景。

## 基础示例

### 基础用法

主按钮执行发布，右侧按钮展开菜单；菜单项提供稳定的 value，并展示无权限的禁用项。

```demo
../example/basic.vue
```

## 外观与状态

### 视觉变体

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `variant` | 按钮组变体 | 视觉变体 |
| `disabled` | 是否禁用整个分裂按钮 | 禁用状态 |
| `button-props` | 主按钮属性 | 禁用状态 |
| `trigger-button-props` | 菜单触发按钮属性 | 禁用状态 |
| `placement` | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | 外观配置对比 |
<!-- demo-config-notes:end -->

统一展示 default、outline、tonal、text 四种变体。

```demo
../example/variants.vue
```

### 禁用状态

对比整体禁用、仅主按钮禁用、仅菜单按钮禁用。整体 disabled 优先，子按钮的 disabled: false 不能解除整体禁用。

```demo
../example/disabled.vue
```

### 外观配置对比

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 五档尺寸

支持 xs、sm、md、lg、xl 五档尺寸，默认 md；窄屏自动换行。

#### 外观组合

适用于主操作和附加菜单。调整状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

## 内容与展示

### 浮层与连续选择

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `placement` | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | 浮层与连续选择 |
| `offset-y` | 菜单纵向偏移 | 浮层与连续选择 |
| `popup-max-height` | 菜单最大高度 | 浮层与连续选择 |
| `hide-on-select` | 选择菜单项后是否关闭菜单 | 浮层与连续选择 |
<!-- demo-config-notes:end -->

演示 bottom-start、8px 纵向偏移和 160px 最大高度。hide-on-select=false 支持连续选择，页面显示最近选中的 value。

```demo
../example/popup.vue
```

## 自定义与插槽

### 自定义图标

使用 icon 插槽中的 open 状态旋转箭头，两端使用相同图标。

```demo
../example/custom-icon.vue
```

## 交互与控制

### 受控展开

外部控制按钮使用 `@click.stop`，避免同一次点击冒泡到 document 后又关闭菜单；正常点击外部仍会关闭。

使用 v-model:open 双向控制菜单；外部按钮、菜单触发器和选中关闭会同步更新状态。

```demo
../example/controlled.vue
```

## 异步与动态数据

### 异步操作

click 是普通事件通知，支持 async 回调；loading 由业务状态控制，建议在 finally 中恢复。事件监听器的 Promise 不会自动驱动加载。禁用／加载链接移除有效 href。

```demo
../example/async-action.vue
```

## 阅读方向

主按钮位于阅读起点，菜单按钮位于阅读终点；LTR/RTL 切换不交换业务动作或额外触发选择。Enter/Space 保留原生按钮行为，菜单按钮支持上下键打开菜单并跳过禁用项，Home/End 定位首尾，Enter 选择，Escape 关闭并归还焦点。弹层继承触发按钮来源方向，start/end 对齐随方向变化，显式 left/right 保持物理侧。自定义向下图形不额外镜像。

## API

### 属性

| 参数                   | 说明                                 | 类型                             | 默认值      |
| ---------------------- | ------------------------------------ | -------------------------------- | ----------- |
| `open`                 | 菜单是否打开，支持 `v-model:open`    | _boolean_                        | `undefined` |
| `default-open`         | 菜单默认是否打开                     | _boolean_                        | `false`     |
| `disabled`             | 是否禁用整个分裂按钮                 | _boolean_                        | `false`     |
| `status`               | 按钮组主题色                         | _SemanticStatus_                 | `default`   |
| `variant`              | 按钮组变体                           | _ButtonVariant_                  | `default`   |
| `size`                 | 按钮组尺寸                           | _ComponentSize_                  | `md`        |
| `color`                | 自定义背景色                         | _string_                         | `''`        |
| `text-color`           | 自定义文字色                         | _string_                         | `''`        |
| `elevation`            | 按钮组海拔阴影                       | _boolean \| number_              | `true`      |
| `button-props`         | 主按钮属性                           | `Partial<ButtonProps>`           | `undefined` |
| `trigger-button-props` | 菜单触发按钮属性                     | `Partial<ButtonProps>`           | `undefined` |
| `trigger`              | 菜单触发方式                         | _TriggerEvent \| TriggerEvent[]_ | `click`     |
| `placement`            | 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | _MenuPosition_               | `bottom`    |
| `popup-container`      | 菜单挂载容器                         | _PopupContainer_                 | `body`      |
| `popup-max-height`     | 菜单最大高度                         | _boolean \| number_              | `true`      |
| `popup-class`          | 菜单浮层类名                         | _string \| array \| object_      | `undefined` |
| `offset-x`             | 菜单横向偏移                         | _string \| number_               | `0`         |
| `offset-y`             | 菜单纵向偏移                         | _string \| number_               | `0`         |
| `hide-on-select`       | 选择菜单项后是否关闭菜单             | _boolean_                        | `true`      |

### 事件

| 事件名        | 说明                       | 回调参数               |
| ------------- | -------------------------- | ---------------------- |
| `update:open` | 菜单打开状态请求更新时触发 | `open: boolean`        |
| `open-change` | 菜单打开状态变化时触发     | `open: boolean`        |
| `click`       | 点击主按钮时触发           | `event: Event`         |
| `select`      | 选择菜单项时触发           | `value, option, event` |

### 插槽

| 插槽名    | 说明             | 参数            |
| --------- | ---------------- | --------------- |
| `default` | 主按钮内容       | `-`             |
| `icon`    | 菜单触发按钮图标 | `open: boolean` |
| `content` | 菜单内容         | `-`             |

### 异步操作与点击语义

click 是普通事件通知，支持 async 回调；loading 由业务状态控制，建议在 finally 中恢复。事件监听器的 Promise 不会自动驱动加载。禁用／加载链接移除有效 href。

```html
<script setup>
import { ref } from 'vue'
const publishing = ref(false)
const publish = async () => {
  if (publishing.value) return
  publishing.value = true
  try { await new Promise((resolve) => setTimeout(resolve, 800)) }
  finally { publishing.value = false }
}
</script>

<template>
  <mp-split-button :button-props="{ loading: publishing }" @click="publish">
    发布
    <template #content><mp-menu-option label="保存草稿" /></template>
  </mp-split-button>
</template>
```

`click` 是普通 Emits 事件；主按钮正常冒泡，不打开菜单；整体 disabled 优先于两个按钮的 disabled 配置。

### 实例方法

| 方法     | 说明                       |
| -------- | -------------------------- |
| open()   | 请求展开菜单，禁用时不展开 |
| close()  | 请求关闭菜单               |
| resize() | 重新计算菜单位置           |

受控 open 只请求更新，需由调用方更新绑定值。offset-x / offset-y 表示屏幕 X/Y 轴，数字单位为 px，长度字符串按现有长度工具转换。

两端主体、Props、样式依赖入口和契约测试为独立同源副本；底层 Menu 保留平台适配，不共享实例。


### 方位语义与配置入口

菜单方位通过内部 Menu 的 placement 传递给 Trigger，使用 MenuPlacement 类型，不新增第二个定位入口。
