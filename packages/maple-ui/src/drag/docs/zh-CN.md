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

### 属性

| 参数              | 说明                            | 类型                                                                                                       | 默认值                                     |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `axis`       | 允许拖动的坐标轴，默认 xy；x 仅横向、y 仅纵向、xy 为双轴；不是展开侧别 | _string_                                                                                                   | `xy`                                       |
| `attraction`      | 吸附方向，可选值 `x`, `y`, `xy` | _string_                                                                                                   | `-`                                        |
| `disabled`        | 是否禁用                        | _boolean_                                                                                                  | `false`                                    |
| `boundary`        | 拖拽范围                        | _{ top?: number \| string, bottom?: number \| string, left?: number \| string, right?: number \| string }_ | `{ top: 0, bottom: 0, left: 0, right: 0 }` |
| `z-index`         | 拖拽元素的层级                  | _string \| number_                                                                                         | `90`                                       |
| `popup-container` | 拖拽元素挂载的位置              | _TeleportProps['to'] \| false_                                                                             | `body`                                     |

当 `popup-container` 为 `false` 时，拖拽元素不再传送到 `body`，而是相对最近的定位父元素进行绝对定位和边界计算。父元素应设置 `position: relative`，适合卡片、面板等局部拖拽场景。

### 事件

| 事件名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| `click` | 点击组件时触发 | `event: Event` |

### 方法

| 方法名   | 说明                                     | 参数 | 返回值 |
| -------- | ---------------------------------------- | ---- | ------ |
| `resize` | 产生位置大小变化时可以调用此方法进行重绘 | `-`  | `-`    |
| `reset`  | 重置初始化时的位置信息                   | `-`  | `-`    |

### 插槽

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `default` | 拖拽元素的内容 | `-`  |
