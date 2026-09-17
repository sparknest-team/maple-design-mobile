# 滑块

### 介绍

用于在给定范围内取值。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 指定步长

通过 `step` 属性来设置步进增量。

```demo
../example/demos/step-size.vue
```

### 双滑块

通过 `range` 属性开启双滑块模式，确保 `value` 的值是一个数组。

```demo
../example/demos/dual-thumb.vue
```

### 选择范围

```demo
../example/demos/range.vue
```

### 禁用

```demo
../example/demos/disable.vue
```

### 只读

```demo
../example/demos/readonly.vue
```

### 不同大小

通过 `track-height` 和 `thumb-size` 控制slider的大小。

```demo
../example/demos/slider-size.vue
```

### 自定义样式

```demo
../example/demos/custom-style.vue
```

### 自定义按钮

使用插槽自定义按钮时，`label-visible`、`label-text-color`、`thumb-size` 等属性均无效。

```demo
../example/demos/custom-btn.vue
```

### 显示标签
通过 `label-visible` 属性控制标签的显示。



> 滑块的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

```demo
../example/demos/show-label.vue
```

### 垂直方向

通过设置 `orientation` 属性值为 `vertical` 来让滑块垂直显示。

```demo
../example/demos/vertical.vue
```

## API

### 属性

| 参数                 | 说明                                | 类型 | 默认值               |
|--------------------|-----------------------------------| ------ |-------------------|
| `v-model`          | 当前进度值                             | _number \| [number, number]_ | `0` |
| `step`             | 步长，取值必须大于 0                       | _string \| number_           | `1` |
| `range`            | 是否启用双滑块                           | _boolean_ | `false`           |
| `max`              | 最大值                               | _string \| number_ | `100`           |
| `min`              | 最小值                               | _string \| number_ | `0`           |
| `label-visible`    | 是否显示标签，可选值为 `always normal never` | _string_ | `normal`          |
| `label-text-color` | 标签文字颜色                            | _string_ | `-`            |
| `label-color`      | 标签颜色                              | _string_ | `-`               |
| `active-color`     | 已激活的轨道背景颜色                        | _string_ | `-`               |
| `track-color`      | 轨道背景颜色                            | _string_ | `-`               |
| `track-height`     | 轨道的高度                             | _string \| number_           | `-` |
| `thumb-size`       | 滑块的大小                             | _string \| number_           | `-` |
| `thumb-color`      | 滑块的背景颜色                           | _string_ | `-`               |
| `disabled`         | 是否禁用                              | _boolean_ | `false`           |
| `readonly`         | 是否只读                              | _boolean_ | `false`           |
| `orientation`        | 显示方向，可选值为 `vertical horizontal`        | _string_ | `horizontal` |

### 事件

| 事件名 | 说明 | 回调参数 |
| ----- | -------- | -------- |
| `change` |  值改变时触发| `value`: 当前进度|
| `start` | 开始拖动时触发 | `-` |
| `end` | 结束拖动时触发 | `value`: 当前进度 |

### 插槽

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `button` | 自定义滑动按钮 | `currentValue`: 当前进度 |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--slider-error-color` | `var(--color-danger)` |
| `--slider-track-background` | `#bdbdbd` |
| `--slider-track-height` | `2px` |
| `--slider-track-border-radius` | `0` |
| `--slider-track-fill-border-radius` | `0` |
| `--slider-track-fill-background` | `var(--color-primary)` |
| `--slider-thumb-block-background` | `var(--color-primary)` |
| `--slider-thumb-ripple-background` | `var(--color-primary)` |
| `--slider-thumb-label-background` | `var(--color-primary)` |
| `--slider-thumb-label-font-size` | `var(--font-size-sm)` |
| `--slider-thumb-label-text-color` | `var(--color-white)` |
| `--slider-thumb-size` | `12px` |
| `--slider-disabled-opacity` | `var(--opacity-disabled)` |
