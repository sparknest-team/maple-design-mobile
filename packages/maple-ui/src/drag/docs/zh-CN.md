# 拖拽

## 案例

### 介绍

使元素可以自由拖拽。

### 基本使用

```demo
../example/demos/basic-use.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 拖拽方向

```demo
../example/demos/direction.vue
```

### 吸附方向

```demo
../example/demos/attraction.vue
```

### 拖拽区域

```demo
../example/demos/boundary.vue
```

### 重置位置

```demo
../example/demos/reset.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

| 参数              | 说明                            | 类型                                                                                                       | 默认值                                     |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `direction`       | 拖拽方向，可选值 `x`, `y`, `xy` | _string_                                                                                                   | `xy`                                       |
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
