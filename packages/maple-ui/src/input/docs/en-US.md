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

### Input Group

`mp-input-group` passes `size`, `variant`, `disabled`, `readonly`, and `hint` to child inputs unless overridden locally. Use `mp-input-group-label` for attached text.

```demo
../example/demos/en-US/group.vue
```

### Group State Inheritance

Explicit child props override group defaults, including `false`. Nested groups inherit unspecified values.

```demo
../example/demos/en-US/group-state.vue
```

### Form Feedback

Use FormItem `feedback` and `validate-status` for validation feedback. An outer FormItem label disables the Input floating hint to avoid duplicate labels.

```demo
../example/demos/en-US/form-feedback.vue
```

### Password Input

`mp-input-password` adds visibility toggling with `visibility` / `default-visibility`, `visibility-toggle`, and `visibility-change`. Other Input props and events are forwarded.

```demo
../example/demos/en-US/password.vue
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

| Name              | Description                                                                | Type               |  Default  |
| ----------------- | -------------------------------------------------------------------------- | ------------------ | :-------: |
| `v-model`         | Controlled value                                                           | `string`           |    `-`    |
| `model-modifiers` | `v-model` modifiers; supports `trim`                                       | `object`           |   `{}`    |
| `default-value`   | Initial value in uncontrolled mode                                         | `string`           |   `''`    |
| `type`            | `text`, `password`, `number`, `tel`, or `email`                            | `InputType`        |  `text`   |
| `placeholder`     | Placeholder or floating hint text                                          | `string`           |    `-`    |
| `size`            | `xs`, `sm`, `md`, `lg`, or `xl`                                            | `ComponentSize`    |   `md`    |
| `variant`         | `filled`, `outline`, or `standard`                                         | `string`           | `outline` |
| `hint`            | Use the placeholder as a floating hint                                     | `boolean`          |  `true`   |
| `line`            | Show the border or bottom separator                                                  | `boolean`          |  `true`   |
| `max-length`      | Maximum length; truncates by default, or reports an error with `errorOnly` | `number \| object` |    `0`    |
| `show-word-limit` | Show the character counter                                                 | `boolean`          |  `false`  |
| `word-length`     | Custom length calculator                                                   | `function`         |    `-`    |
| `word-slice`      | Custom truncation function                                                 | `function`         |    `-`    |
| `readonly`        | Read-only state                                                            | `boolean`          |  `false`  |
| `disabled`        | Disabled state                                                             | `boolean`          |  `false`  |
| `error`           | Show the error state                                                       | `boolean`          |  `false`  |
| `clearable`       | Show a persistent clear icon while editable and nonempty                  | `boolean`          |  `false`  |
| `autofocus`       | Focus automatically after mount                                            | `boolean`          |  `false`  |
| `enterkeyhint`    | Mobile enter-key hint                                                      | `string`           |    `-`    |
| `aria-label`      | Accessible label                                                           | `string`           |    `-`    |
| `input-attrs`     | Native attributes such as `autocomplete`                                   | `object`           |    `-`    |
| `text-color`      | Text color                                                                 | `string`           |    `-`    |
| `focus-color`     | Focus color                                                                | `string`           |    `-`    |
| `blur-color`      | Blur color                                                                 | `string`           |    `-`    |

Native input attributes, `aria-*` and `data-*` are forwarded to the input; class/style remain on the root. `input-attrs` takes precedence for native attributes, but cannot override the controlled value, readonly, disabled or length-normalization behavior.

Validation rules belong on `mp-form-item`. See the [Form component](#/en-US/form).

### Methods

| Name    | Description     | Parameters | Return value |
| ------- | --------------- | ---------- | ------------ |
| `focus` | Focus the input | `-`        | `-`          |
| `blur`  | Blur the input  | `-`        | `-`          |
| `select` | Select all text | `-` | `-` |

### Events

| Name          | Description                                     | Parameters                    |
| ------------- | ----------------------------------------------- | ----------------------------- |
| `focus`       | Emitted on focus                                | `event: FocusEvent`           |
| `blur`        | Emitted on blur                                 | `event: FocusEvent`           |
| `clear`       | Emitted after clearing                          | `event: Event`                |
| `input`       | Emitted on input                                | `value: string, event: Event` |
| `change`      | Emitted only when blur or Enter commits a value | `value: string, event: Event` |
| `press-enter` | Emitted when Enter is pressed                   | `event: KeyboardEvent`        |
| `keydown`     | Emitted on keydown            | `event: KeyboardEvent`        |

When `max-length` is exceeded, `update:model-value` and `input` emit the truncated value. Clearing updates the model and emits `clear`, without emitting `input` or `change`; the following blur does not emit `change`.

### Slots

| Name         | Description          | Parameters          |
| ------------ | -------------------- | ------------------- |
| `prefix`     | Prefix content       | `-`                 |
| `suffix`     | Suffix content       | `-`                 |
| `clear-icon` | Clear icon or button | `clear: () => void` |

### InputPassword and InputGroup

| Component | Prop / event | Description |
| --------- | ------------ | ----------- |
| `mp-input-password` | `visibility`, `default-visibility`, `visibility-toggle` | Password visibility; uncontrolled by default with a visible toggle |
| `mp-input-password` | `visibility-change`, `update:visibility` | Emitted with the new `boolean` visibility |
| `mp-input-group` | `size`, `variant`, `disabled`, `readonly`, `hint` | Child Input defaults; `variant` defaults to `filled` |
| `mp-input-group-label` | Default slot | Text attachment for grouped inputs |

### Style variables

Input provides the variables below. See [FieldDecorator](#/en-US/field-decorator) for container appearance variables.

| Variable                                | Default                           |
| --------------------------------------- | --------------------------------- |
| `--mp-input-control-height` | `auto` |
| `--mp-input-control-font-size` | `inherit` |
| `--mp-input-control-line-height` | `inherit` |
| `--mp-input-control-padding-horizontal` | `0`                               |
| `--mp-input-counter-color` | `--mp-field-suffix-text-color` |
| `--mp-input-counter-font-size` | `12px` |
| `--mp-input-feedback-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-input-feedback-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-input-feedback-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-input-feedback-validating-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-input-feedback-duration` | `1s` |
