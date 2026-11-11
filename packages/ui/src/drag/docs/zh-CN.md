# 拖拽

### 介绍

使元素可以自由拖拽。

## 基础示例

### 基本使用

```demo
../example/demos/basic-use.vue
```

## 外观与状态

### 禁用

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `disabled` | 是否禁用 | 禁用 |
| `attraction` | 吸附方向，可选值 `x`, `y`, `xy` | 禁用 |
| `boundary` | 拖拽范围 | 禁用 |
| `popup-container` | 拖拽元素挂载的位置 | 禁用 |
| `z-index` | 拖拽元素的层级 | 禁用 |
<!-- demo-config-notes:end -->

```demo
../example/demos/disabled.vue
```

## 方向与拖动范围

### 拖拽方向

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `boundary` | 拖拽范围 | 拖拽方向、拖拽区域 |
| `popup-container` | 拖拽元素挂载的位置 | 拖拽方向、拖拽区域 |
| `axis` | 允许拖动的坐标轴，默认 xy；x 仅横向、y 仅纵向、xy 为双轴；不是展开侧别 | 拖拽方向 |
| `attraction` | 吸附方向，可选值 `x`, `y`, `xy` | 拖拽区域 |
<!-- demo-config-notes:end -->

```demo
../example/demos/direction.vue
```

### 拖拽区域

```demo
../example/demos/boundary.vue
```

## 内容与展示

### 吸附方向

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `attraction` | 吸附方向，可选值 `x`, `y`, `xy` | 吸附方向、重置位置 |
| `boundary` | 拖拽范围 | 吸附方向、重置位置 |
| `popup-container` | 拖拽元素挂载的位置 | 吸附方向、重置位置 |
<!-- demo-config-notes:end -->

```demo
../example/demos/attraction.vue
```

### 重置位置

```demo
../example/demos/reset.vue
```

## API

### Drag Props

| 参数              | 说明                            | 类型                                                                                                       | 默认值                                     |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `axis`       | 允许拖动的坐标轴，默认 xy；x 仅横向、y 仅纵向、xy 为双轴；不是展开侧别 | _DragAxis_<br>`'x' \| 'y' \| 'xy'` | `xy`                                       |
| `attraction`      | 吸附方向，可选值 `x`, `y`, `xy` | _DragAttraction_<br>`'x' \| 'y' \| 'xy'` | `-`                                        |
| `disabled`        | 仅禁用拖动，普通 click 仍通知；拖动中禁用会取消手势并保留当前位置 | _boolean_                                                                                                  | `false`                                    |
| `boundary`        | 四个物理边界；替换或原地更新均自动夹取已拖动位置 | _{ top?: number \| string, bottom?: number \| string, left?: number \| string, right?: number \| string }_ | `{ top: 0, bottom: 0, left: 0, right: 0 }` |
| `z-index`         | 拖拽元素的层级                  | _string \| number_                                                                                         | `90`                                       |
| `popup-container` | 拖拽元素挂载的位置              | _PopupContainer_                                                                             | `body`                                     |

当 `popup-container` 为 `false` 时，拖拽元素不再传送到 `body`，而是相对最近的定位父元素进行绝对定位和边界计算。父元素应设置 `position: relative`，适合卡片、面板等局部拖拽场景。

### 输入与边界规则

仅处理触摸拖动，坐标轴是物理 x/y，不因 RTL 交换；鼠标仅触发普通 click。业务内容自行提供按钮、链接等语义，根节点不自动变成按钮。

边界支持有限数字、数值字符串以及 px、rem、vw、vh、vmin、vmax；负数扩大允许范围。百分比、em、calc、var 和非有限值不支持，开发环境提示并按 0 处理。非法 axis 回退 xy，非法 attraction 关闭吸附。边界变化取消当前手势并夹取当前位置；取消和禁用不执行吸附，正常 touchend 才吸附。

### Drag Events

| 事件名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| `click` | 普通点击通知；拖动期间及结束后一帧抑制，不等待 Promise | `event: Event` |

### Drag Methods

| 方法名   | 说明                                     | 参数 | 返回值 |
| -------- | ---------------------------------------- | ---- | ------ |
| `resize` | 宿主布局变化后手动重新读取可视坐标并夹取；边界属性变化无需手动调用 | `-`  | `-`    |
| `reset`  | 清理手势和位移，恢复外部样式定义的初始位置                   | `-`  | `-`    |

### Drag Slots

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `default` | 拖拽元素的内容 | `-`  |


等待吸附动画结束后调用 resize，避免把过渡中的视觉位置作为新起点；方法均返回 void。窗口尺寸变化会重新解析相对单位并夹取，其他宿主布局变化可手动调用 resize。

```ts
import { Drag } from '@maple-design/ui-vue/drag'
import type { DragProps, DragInstance, DragAxis, DragAttraction, DragBoundary, PopupContainer } from '@maple-design/ui-vue'
```
## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
