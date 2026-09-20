# InputNumber

### Intro

Input, adjust, and commit numeric values. `InputNumber` is the primary name aligned with Cedar and most UI libraries. Maple's existing `Counter` remains available for compatibility.

The component keeps the displayed string separate from the business number, so intermediate states such as `-`, `.`, and `1.` can be entered naturally. By default, `v-model` updates on blur or Enter. With `model-event="input"`, complete numbers update during editing, while `change` still represents a committed value.

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

### Controlled Value And Intermediate Input

`modelValue` and `defaultValue` use `number | undefined`. Clearing produces `undefined`, never `NaN`. Intermediate input such as `-`, `.`, and `1.` stays visible until it is committed and normalized by `min`, `max`, and `precision`.

```html
<mp-input-number
  v-model="value"
  :min="0"
  :max="100"
  model-event="input"
  placeholder="Commit on blur"
  @input="handleInput"
  @change="handleChange"
  @clear="handleClear"
/>
```

### Events And Clearing

- `input` represents editing and includes the parsed number, displayed text, and native event.
- `change` represents a committed value change and is deduplicated across blur, Enter, and step actions.
- `clear` represents an explicit clear action. It emits `update:modelValue(undefined)` and `clear` without an extra `input` or `change` event.

### Prefixes, Suffixes, And Slots

`prefix` and `suffix` render inside the input. `prepend` and `append` render outside it. `plus` and `minus` replace step icons, while `clear-icon` replaces the clear icon.

```html
<mp-input-number v-model="value" mode="button" clearable>
  <template #prepend>Amount</template>
  <template #prefix>$</template>
  <template #suffix>USD</template>
  <template #append>tax included</template>
  <template #plus>＋</template>
  <template #minus>－</template>
  <template #clear-icon="{ clear }">
    <button type="button" aria-label="Clear amount" @click="clear">Clear</button>
  </template>
</mp-input-number>
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

| Event               | Description                   | Arguments                                                      |
| ------------------- | ----------------------------- | -------------------------------------------------------------- |
| `update:modelValue` | Emitted when value changes    | `value: number \| undefined`                                   |
| `change`            | Emitted after value changes   | `value: number \| undefined, event: Event`                     |
| `input`             | Emitted on input              | `value: number \| undefined, inputValue: string, event: Event` |
| `focus`             | Emitted when input is focused | `event: FocusEvent`                                            |
| `blur`              | Emitted when input is blurred | `event: FocusEvent`                                            |
| `clear`             | Emitted when clear is clicked | `event: Event`                                                 |
| `keydown`           | Emitted on keydown            | `event: KeyboardEvent`                                         |
