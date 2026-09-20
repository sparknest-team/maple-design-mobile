# Input

### Introduction

Use Input for single-line text entry. It supports multiple variants, floating hints, input types, states, and prefix or suffix content.

### Basic Usage

```demo
../example/demos/en-US/basic.vue
```

### Variants

```demo
../example/demos/en-US/variant.vue
```

### Hint

With `hint`, the placeholder floats on focus or when a value exists. Disable it for native placeholder behavior.

```demo
../example/demos/en-US/hint.vue
```

### Input Types

```demo
../example/demos/en-US/type.vue
```

### Sizes

```demo
../example/demos/en-US/size.vue
```

### States

```demo
../example/demos/en-US/state.vue
```

### Prefix and Suffix

```demo
../example/demos/en-US/prefix-suffix.vue
```

### Character Limit

```demo
../example/demos/en-US/max-length.vue
```

### Custom Clear Icon

```demo
../example/demos/en-US/custom-clear-icon.vue
```

### Model Modifier

```demo
../example/demos/en-US/model-modifier.vue
```

### Native Attributes

```demo
../example/demos/en-US/native-attrs.vue
```

## API

### Props

| Name              | Description                                                                | Type               |  Default   |
| ----------------- | -------------------------------------------------------------------------- | ------------------ | :--------: |
| `v-model`         | Controlled value                                                           | `string`           |    `-`     |
| `default-value`   | Initial value in uncontrolled mode                                         | `string`           |    `''`    |
| `type`            | `text`, `password`, `number`, `tel`, or `email`                            | `InputType`        |   `text`   |
| `placeholder`     | Placeholder or floating hint text                                          | `string`           |    `-`     |
| `size`            | `xs`, `sm`, `md`, `lg`, or `xl`                                            | `ComponentSize`    |    `md`    |
| `variant`         | `filled`, `outline`, or `standard`                                         | `string`           | `outline`  |
| `hint`            | Use the placeholder as a floating hint                                     | `boolean`          |   `true`   |
| `line`            | Show the bottom separator                                                  | `boolean`          |   `true`   |
| `max-length`      | Maximum length; truncates by default, or reports an error with `errorOnly` | `number \| object` |    `0`     |
| `show-word-limit` | Show the character counter                                                 | `boolean`          |  `false`   |
| `word-length`     | Custom length calculator                                                   | `function`         |    `-`     |
| `word-slice`      | Custom truncation function                                                 | `function`         |    `-`     |
| `readonly`        | Read-only state                                                            | `boolean`          |  `false`   |
| `disabled`        | Disabled state                                                             | `boolean`          |  `false`   |
| `error`           | Show the error state                                                       | `boolean`          |  `false`   |
| `clearable`       | Allow clearing the value                                                   | `boolean`          |  `false`   |
| `autofocus`       | Focus automatically after mount                                            | `boolean`          |  `false`   |
| `enterkeyhint`    | Mobile enter-key hint                                                      | `string`           |    `-`     |
| `autocomplete`    | Native autocomplete policy                                                 | `string`           |   `off`    |
| `aria-label`      | Accessible label                                                           | `string`           |    `-`     |
| `input-attrs`     | Attributes forwarded to the native input                                   | `object`           |    `-`     |
| `text-color`      | Text color                                                                 | `string`           |    `-`     |
| `focus-color`     | Focus color                                                                | `string`           |    `-`     |
| `blur-color`      | Blur color                                                                 | `string`           |    `-`     |

Validation rules belong on `mp-form-item`. See the [Form component](#/en-US/form).

### Methods

| Name    | Description     | Parameters | Return value |
| ------- | --------------- | ---------- | ------------ |
| `focus` | Focus the input | `-`        | `-`          |
| `blur`  | Blur the input  | `-`        | `-`          |

### Events

| Name          | Description                                     | Parameters                    |
| ------------- | ----------------------------------------------- | ----------------------------- |
| `focus`       | Emitted on focus                                | `event: FocusEvent`           |
| `blur`        | Emitted on blur                                 | `event: FocusEvent`           |
| `clear`       | Emitted after clearing                          | `event: Event`                |
| `input`       | Emitted on input                                | `value: string, event: Event` |
| `change`      | Emitted only when blur or Enter commits a value | `value: string, event: Event` |
| `press-enter` | Emitted when Enter is pressed                   | `event: KeyboardEvent`        |
| `keydown`     | Emitted on keydown for compatibility            | `event: KeyboardEvent`        |

### Slots

| Name         | Description          | Parameters          |
| ------------ | -------------------- | ------------------- |
| `prefix`     | Prefix content       | `-`                 |
| `suffix`     | Suffix content       | `-`                 |
| `clear-icon` | Clear icon or button | `clear: () => void` |

### Style variables

Input provides the variables below. See [FieldDecorator](#/en-US/field-decorator) for container appearance variables.

| Variable                  | Default |
| ------------------------- | ------- |
| `--input-input-height`    | `24px`  |
| `--input-input-font-size` | `16px`  |
