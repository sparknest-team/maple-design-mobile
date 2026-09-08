# 数字输入框

### 介绍

用于输入、调整和提交数值。组件主名与 Cedar 以及多数桌面组件库对齐为 `InputNumber`，Maple 原 `Counter` 保留为兼容入口。

组件会把展示字符串和业务数字分开处理，因此用户可以自然输入 `-`、`.`、`1.` 等中间状态。默认情况下，`v-model` 在失焦或按下 Enter 时更新；设置 `model-event="input"` 后，完整数字会在输入时更新，但 `change` 仍然只表示提交完成。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const value = ref(1)
</script>

<template>
  <mp-input-number v-model="value" />
</template>
```

### 设置取值范围

```html
<mp-input-number v-model="value" :min="0" :max="10" />
```

### 设置步长和精度

```html
<mp-input-number v-model="value" :step="0.1" :precision="1" />
```

### 纯输入模式

```html
<mp-input-number v-model="value" mode="input" />
```

### 受控值与中间输入态

`modelValue` 和 `defaultValue` 的值类型为 `number | undefined`。清空后的值为 `undefined`，不会向上层暴露 `NaN`。输入过程中的 `-`、`.` 和 `1.` 会保留在输入框内，提交时再按 `min`、`max` 和 `precision` 处理。

```html
<mp-input-number
  v-model="value"
  :min="0"
  :max="100"
  model-event="input"
  placeholder="输入后失焦提交 change"
  @input="handleInput"
  @change="handleChange"
  @clear="handleClear"
/>
```

### 事件与清空

- `input` 表示编辑过程，参数包含解析后的数字、当前展示文本和原生事件。
- `change` 表示提交后的值变化，失焦、Enter 和步进操作会触发，并按已提交值去重。
- `clear` 表示用户主动清空，只触发 `update:modelValue(undefined)` 和 `clear`，不会额外触发 `input` 或 `change`。

### 前后缀与自定义控件

`prefix` 和 `suffix` 位于输入框内部，`prepend` 和 `append` 位于输入框外部；`plus`、`minus` 替换步进按钮图标，`clear-icon` 替换清空图标。

```html
<mp-input-number v-model="value" mode="button" clearable>
  <template #prepend>金额</template>
  <template #prefix>¥</template>
  <template #suffix>元</template>
  <template #append>含税</template>
  <template #plus>＋</template>
  <template #minus>－</template>
  <template #clear-icon="{ clear }">
    <button type="button" aria-label="清空金额" @click="clear">清空</button>
  </template>
</mp-input-number>
```

### 格式化显示

```html
<mp-input-number v-model="value" :formatter="(value) => `${value}%`" :parser="(value) => value.replace('%', '')" />
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

| 事件名              | 说明               | 参数                                                           |
| ------------------- | ------------------ | -------------------------------------------------------------- |
| `update:modelValue` | 绑定值变化时触发   | `value: number \| undefined`                                   |
| `change`            | 值变化后触发       | `value: number \| undefined, event: Event`                     |
| `input`             | 输入时触发         | `value: number \| undefined, inputValue: string, event: Event` |
| `focus`             | 输入框聚焦时触发   | `event: FocusEvent`                                            |
| `blur`              | 输入框失焦时触发   | `event: FocusEvent`                                            |
| `clear`             | 点击清除按钮时触发 | `event: Event`                                                 |
| `keydown`           | 键盘按下时触发     | `event: KeyboardEvent`                                         |
