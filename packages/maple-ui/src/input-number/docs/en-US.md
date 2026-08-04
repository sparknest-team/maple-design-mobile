# InputNumber

### Intro

Input or adjust numbers in a range. `InputNumber` is the primary name aligned with Cedar and most UI libraries. Maple's existing `Counter` remains available for compatibility.

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const value = ref(1)
</script>

<template>
  <mp-input-number v-model="value" />
</template>
```

### Range

```html
<mp-input-number v-model="value" :min="0" :max="10" />
```

### Step And Precision

```html
<mp-input-number v-model="value" :step="0.1" :precision="1" />
```

### Hide Controls

```html
<mp-input-number v-model="value" :controls="false" />
```

## API

### Props

| Prop            | Description                                    | Type                        | Default     |
| --------------- | ---------------------------------------------- | --------------------------- | ----------- |
| `v-model`       | Current value                                  | _number_                    | `-`         |
| `default-value` | Default value for uncontrolled usage           | _number_                    | `-`         |
| `control-type`  | Controls layout: `stacked` `split`             | _string_                    | `stacked`   |
| `precision`     | Number precision                               | _number_                    | `-`         |
| `step`          | Step value                                     | _number_                    | `1`         |
| `disabled`      | Whether to disable input number                | _boolean_                   | `false`     |
| `error`         | Whether to show error state                    | _boolean_                   | `false`     |
| `max`           | Max value                                      | _number_                    | `Infinity`  |
| `min`           | Min value                                      | _number_                    | `-Infinity` |
| `formatter`     | Format display value                           | _(value: string) => string_ | `-`         |
| `parser`        | Parse input value                              | _(value: string) => string_ | `-`         |
| `placeholder`   | Input placeholder                              | _string_                    | `-`         |
| `controls`      | Whether to show controls                       | _boolean_                   | `true`      |
| `size`          | Input size: `xs` `sm` `md` `lg`                | _string_                    | `-`         |
| `clearable`     | Whether the input can be cleared               | _boolean_                   | `false`     |
| `model-event`   | Event that updates `v-model`: `change` `input` | _string_                    | `change`    |
| `readonly`      | Whether to be readonly                         | _boolean_                   | `false`     |
| `input-attrs`   | Native input attributes                        | _object_                    | `-`         |

### Events

| Event                | Description                   | Arguments                                                      |
| -------------------- | ----------------------------- | -------------------------------------------------------------- |
| `update:model-value` | Emitted when value changes    | `value: number \| undefined`                                   |
| `change`             | Emitted after value changes   | `value: number \| undefined, event: Event`                     |
| `input`              | Emitted on input              | `value: number \| undefined, inputValue: string, event: Event` |
| `focus`              | Emitted when input is focused | `event: FocusEvent`                                            |
| `blur`               | Emitted when input is blurred | `event: FocusEvent`                                            |
| `clear`              | Emitted when clear is clicked | `event: Event`                                                 |
| `keydown`            | Emitted on keydown            | `event: KeyboardEvent`                                         |
