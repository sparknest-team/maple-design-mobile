# InputNumber

### Intro

Input or adjust numbers in a range. `InputNumber` is the primary name aligned with Cedar and most UI libraries. Maple's existing `Counter` remains available for compatibility.

### Basic Usage

```demo
../example/demos/demo-1.vue
```

### Range

```demo
../example/demos/demo-2.vue
```

### Step And Precision

```demo
../example/demos/demo-5.vue
```

### Input Mode

```demo
../example/demos/demo-9.vue
```

### Button mode

```demo
../example/demos/demo-3.vue
```

### Sizes

```demo
../example/demos/demo-4.vue
```

### Prefix and suffix

```demo
../example/demos/demo-6.vue
```

### Custom controls

```demo
../example/demos/demo-7.vue
```

### Formatting

```demo
../example/demos/demo-8.vue
```

### Model event

```demo
../example/demos/demo-10.vue
```

## API

### Props

| Prop            | Description                                    | Type                        | Default     |
| --------------- | ---------------------------------------------- | --------------------------- | ----------- |
| `v-model`       | Current value                                  | _number_                    | `-`         |
| `default-value` | Default value for uncontrolled usage           | _number_                    | `-`         |
| `mode`          | Mode: `embed` `button` `input`                 | _string_                    | `embed`     |
| `precision`     | Number precision                               | _number_                    | `-`         |
| `step`          | Step value                                     | _number_                    | `1`         |
| `disabled`      | Whether to disable input number                | _boolean_                   | `false`     |
| `error`         | Whether to show error state                    | _boolean_                   | `false`     |
| `max`           | Max value                                      | _number_                    | `Infinity`  |
| `min`           | Min value                                      | _number_                    | `-Infinity` |
| `formatter`     | Format display value                           | _(value: string) => string_ | `-`         |
| `parser`        | Parse input value                              | _(value: string) => string_ | `-`         |
| `placeholder`   | Input placeholder                              | _string_                    | `-`         |
| `size`          | Input size: `xs` `sm` `md` `lg` `xl`           | _ComponentSize_             | `md`        |
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
