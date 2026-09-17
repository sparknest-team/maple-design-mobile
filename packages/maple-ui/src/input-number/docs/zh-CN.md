# 数字输入框

### 介绍

用于在一定范围内输入或者通过按钮调整数字。组件主名与 Cedar 以及多数桌面组件库对齐为 `InputNumber`，Maple 原 `Counter` 保留为兼容入口。

### 基本使用

```demo
../example/demos/demo-1.vue
```

### 设置取值范围

```demo
../example/demos/demo-2.vue
```

### 设置步长和精度

```demo
../example/demos/demo-5.vue
```

### 纯输入模式

```demo
../example/demos/demo-9.vue
```

### 格式化显示

```demo
../example/demos/demo-8.vue
```

### 按钮模式

```demo
../example/demos/demo-3.vue
```

### 尺寸

```demo
../example/demos/demo-4.vue
```

### 前后缀

```demo
../example/demos/demo-6.vue
```

### 自定义增减图标

```demo
../example/demos/demo-7.vue
```

### 输入更新事件

```demo
../example/demos/demo-10.vue
```

## API

### 属性

| 参数            | 说明                                                 | 类型                        | 默认值      |
| --------------- | ---------------------------------------------------- | --------------------------- | ----------- |
| `v-model`       | 绑定值                                               | _number_                    | `-`         |
| `default-value` | 默认值，非受控时生效                                 | _number_                    | `-`         |
| `mode`          | 模式，可选值为 `embed` `button` `input`              | _string_                    | `embed`     |
| `precision`     | 数值精度                                             | _number_                    | `-`         |
| `step`          | 步长                                                 | _number_                    | `1`         |
| `disabled`      | 是否禁用                                             | _boolean_                   | `false`     |
| `error`         | 是否展示错误状态                                     | _boolean_                   | `false`     |
| `max`           | 最大值                                               | _number_                    | `Infinity`  |
| `min`           | 最小值                                               | _number_                    | `-Infinity` |
| `formatter`     | 格式化展示值                                         | _(value: string) => string_ | `-`         |
| `parser`        | 解析输入值                                           | _(value: string) => string_ | `-`         |
| `placeholder`   | 输入框占位文本                                       | _string_                    | `-`         |
| `size`          | 尺寸，可选值为 `xs` `sm` `md` `lg` `xl`              | _ComponentSize_             | `md`        |
| `clearable`     | 是否可清空                                           | _boolean_                   | `false`     |
| `model-event`   | 触发 `v-model` 更新的事件，可选值为 `change` `input` | _string_                    | `change`    |
| `readonly`      | 是否只读                                             | _boolean_                   | `false`     |
| `input-attrs`   | 传给原生 input 的属性                                | _object_                    | `-`         |

### 事件

| 事件名               | 说明               | 参数                                                           |
| -------------------- | ------------------ | -------------------------------------------------------------- |
| `update:model-value` | 绑定值变化时触发   | `value: number \| undefined`                                   |
| `change`             | 值变化后触发       | `value: number \| undefined, event: Event`                     |
| `input`              | 输入时触发         | `value: number \| undefined, inputValue: string, event: Event` |
| `focus`              | 输入框聚焦时触发   | `event: FocusEvent`                                            |
| `blur`               | 输入框失焦时触发   | `event: FocusEvent`                                            |
| `clear`              | 点击清除按钮时触发 | `event: Event`                                                 |
| `keydown`            | 键盘按下时触发     | `event: KeyboardEvent`                                         |
