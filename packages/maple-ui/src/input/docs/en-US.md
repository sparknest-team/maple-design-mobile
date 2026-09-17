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

| Name           | Description                                 | Type               | Default    |
| -------------- | ------------------------------------------- | ------------------ | ---------- |
| `v-model`      | Bound value                                 | _string_           | `-`        |
| `type`         | `text` `password` `number` `tel` or `email` | _string_           | `text`     |
| `placeholder`  | Placeholder or floating hint text           | _string_           | `-`        |
| `size`         | `xs` `sm` `md` `lg` or `xl`                 | _ComponentSize_    | `md`       |
| `variant`      | `filled` `outline` or `standard`           | _string_           | `standard` |
| `hint`         | Use the placeholder as a floating hint      | _boolean_          | `true`     |
| `line`         | Show the separator line                     | _boolean_          | `true`     |
| `max-length`   | Maximum length and character counter        | _string \| number_ | `-`        |
| `readonly`     | Whether the input is readonly               | _boolean_          | `false`    |
| `disabled`     | Whether the input is disabled               | _boolean_          | `false`    |
| `clearable`    | Whether the value can be cleared            | _boolean_          | `false`    |
| `autofocus`    | Focus automatically after mount             | _boolean_          | `false`    |
| `enterkeyhint` | Mobile enter-key hint                       | _string_           | `-`        |
| `autocomplete` | Native autocomplete policy                  | _string_           | `off`      |
| `aria-label`   | Accessible label                            | _string_           | `-`        |
| `input-attrs`  | Attributes forwarded to the native input    | _object_           | `-`        |
| `text-color`   | Text color                                  | _string_           | `-`        |
| `focus-color`  | Focus color                                 | _string_           | `-`        |
| `blur-color`   | Blur color                                  | _string_           | `-`        |

Validation rules belong on `mp-form-item`. See the [Form component](#/en-US/form).

### Methods

| Name    | Description     | Parameters | Return value |
| ------- | --------------- | ---------- | ------------ |
| `focus` | Focus the input | `-`        | `-`          |
| `blur`  | Blur the input  | `-`        | `-`          |

### Events

| Name      | Description                              | Parameters                    |
| --------- | ---------------------------------------- | ----------------------------- |
| `focus`   | Emitted on focus                         | `event: FocusEvent`           |
| `blur`    | Emitted on blur                          | `event: FocusEvent`           |
| `click`   | Emitted on click                         | `event: Event`                |
| `clear`   | Emitted after clearing                   | `value: string`               |
| `input`   | Emitted on input                         | `value: string, event: Event` |
| `change`  | Emitted when a value change is committed | `value: string, event: Event` |
| `keydown` | Emitted on keydown                       | `event: KeyboardEvent`        |

### Slots

| Name         | Description    | Parameters          |
| ------------ | -------------- | ------------------- |
| `prefix`     | Prefix content | `-`                 |
| `suffix`     | Suffix content | `-`                 |
| `clear-icon` | Clear icon     | `clear: () => void` |

### Style Variables

Input provides the variables below. See [FieldDecorator](#/en-US/field-decorator) for container appearance variables.

| Variable                  | Default |
| ------------------------- | ------- |
| `--input-input-height`    | `24px`  |
| `--input-input-font-size` | `16px`  |
