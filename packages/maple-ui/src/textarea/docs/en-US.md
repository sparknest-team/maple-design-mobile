# Textarea

## Examples

### Introduction

A multiline plain-text editor for comments, feedback, and other longer content.

### Basic usage and value models

Use `v-model` for a controlled value and `default-value` for an uncontrolled initial value. The third textarea uses `v-model.trim`: blur to commit the trimmed value, then inspect the value below it.

Default length counts UTF-16 code units (an emoji usually uses 2). Default truncation never splits a valid surrogate pair; a character that does not fit is omitted entirely. For grapheme-cluster counting and slicing, provide matching `word-length` and `word-slice` functions; custom slicing remains application-controlled.

```demo
../example/demos/en-US/demo-1.vue
```

### Variants

```demo
../example/demos/en-US/demo-2.vue
```

### Hint

```demo
../example/demos/en-US/demo-3.vue
```

### Sizes

```demo
../example/demos/en-US/demo-4.vue
```

### Length and resize

```demo
../example/demos/en-US/demo-5.vue
```

### States

```demo
../example/demos/en-US/demo-6.vue
```

### Body and event contract

The two libraries maintain independent copies of the body. Input emits input before update:modelValue. Clearing emits clear → input → update:modelValue → change once each; Form receives each semantic once. Readonly/disabled/composing controls cannot clear. A rejected controlled value is restored, including input types without selection APIs.

```demo
../example/demos/en-US/body-contract.vue
```

### Appearance combinations

Use this example for notes and multi-line descriptions. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Interaction states

Use this example for notes and multi-line descriptions. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop              | Description                                  | Type                                                | Default    |
| ----------------- | -------------------------------------------- | --------------------------------------------------- | ---------- |
| `v-model`         | Controlled value                             | _string_                                            | `-`        |
| `default-value`   | Uncontrolled initial value                   | _string_                                            | `''`       |
| `model-modifiers` | Supports the `trim` model modifier           | _object_                                            | `{}`       |
| `placeholder`     | Placeholder text                             | _string_                                            | `-`        |
| `variant`         | `filled \| outline \| standard`              | _string_                                            | `outline`  |
| `size`            | `xs \| sm \| md \| lg \| xl`                 | _string_                                            | `md`       |
| `clearable`       | Enables the clear action                     | _boolean_                                           | `false`    |
| `disabled`        | Disables editing                             | _boolean_                                           | `undefined` |
| `readonly`        | Makes the value read-only                    | _boolean_                                           | `undefined` |
| `error`           | Enables the visual error state               | _boolean_                                           | `undefined` |
| `rows`            | Native visible row count                     | _string \| number_                                  | `-`        |
| `resize`          | Allows vertical manual resizing              | _boolean_                                           | `false`    |
| `auto-size`       | Grows with content with optional row bounds  | _boolean \| { minRows?: number; maxRows?: number }_ | `false`    |
| `max-length`      | Truncating or error-only length limit        | _number \| { length: number; errorOnly?: boolean }_ | `0`        |
| `show-word-limit` | Shows the length counter                     | _boolean_                                           | `false`    |
| `word-length`     | Custom length function                       | _(value: string) => number_                         | `-`        |
| `word-slice`      | Custom slice function                        | _(value: string, maxLength: number) => string_      | `-`        |
| `aria-label`      | Accessible name when no visible label exists | _string_                                            | `-`        |
| `autofocus`       | Focuses after mount                          | _boolean_                                           | `false`    |
| `enterkeyhint`    | Virtual-keyboard Enter hint                  | _string_                                            | `-`        |
| `textarea-attrs`  | Supplemental native textarea attributes      | _object_                                            | `-`        |
| `hint` | Floating hint; inherits Group/library default | _boolean_ | `undefined` |
| `line`            | Shows the decorator line                     | _boolean_                                           | `true`     |
| `text-color`      | Custom text color                            | _string_                                            | `-`        |
| `focus-color`     | Custom focus color                           | _string_                                            | `-`        |
| `blur-color`      | Custom blur color                            | _string_                                            | `-`        |

Inside Form/FormItem, omitted `size`, `disabled`, `readonly`, and `error` inherit form state. Explicit local values, including `false`, take precedence.

### Events

| Event     | Description                                    | Arguments                     |
| --------- | ---------------------------------------------- | ----------------------------- |
| `input`   | User input after IME composition               | `value: string, event: Event` |
| `change`  | Changed value committed on blur                | `value: string, event: Event` |
| `keydown` | Native keydown signal; Enter remains a newline | `event: KeyboardEvent`        |
| `clear`   | Clear → input → update:model-value → change    | `event: Event`                |
| `focus`   | Focus                                          | `event: FocusEvent`           |
| `blur`    | Blur                                           | `event: FocusEvent`           |

### Slots

| Slot         | Description          | Slot props                       |
| ------------ | -------------------- | -------------------------------- |
| `prefix`     | Prefix content       | `-`                              |
| `suffix`     | Suffix content       | `-`                              |
| `clear-icon` | Custom clear control | `clear: (event?: Event) => void` |

### Methods

| Method  | Description               |
| ------- | ------------------------- |
| `focus` | Focus the native textarea |
| `blur`  | Blur the native textarea  |

### Type definitions

```ts
import type {
  TextareaAutoSize,
  TextareaMaxLength,
  TextareaProps,
  TextareaVariant,
  WordLength,
  WordSlice,
} from '@maple-design/ui'
```

### Style variables

| Variable                          | Default |
| --------------------------------- | ------- |
| `--mp-textarea-height`                         | `auto`                            |
| `--mp-textarea-min-height`                     | `96px`                            |
| `--mp-textarea-font-size`                      | `16px`                            |
| `--mp-textarea-line-height`                    | `1.5`                             |
| `--mp-textarea-padding-horizontal`             | `0`                               |
| `--mp-textarea-padding-vertical`               | `0`                               |
| `--mp-textarea-placeholder-color`              | `--mp-sys-color-content-secondary` |
| `--mp-textarea-counter-color`                  | `--mp-sys-color-content-secondary` |
| `--mp-textarea-counter-font-size`              | `--mp-sys-font-size-xs`           |
| `--mp-textarea-counter-margin-top`              | `--mp-sys-space-2`                |

Counter layout is platform-specific: Cedar positions the counter inside the field using counter-inset-inline-end, counter-inset-block-end and scrollbar-offset; Maple renders an external counter row using counter-margin-top. Only the variables relevant to each layout are exposed; color and font-size remain shared.

### Native layout and public types

size supports xs/sm/md/lg/xl for the FieldDecorator shell; textarea height and text metrics remain controlled by rows, auto-size and textarea Tokens. Default manual resize is true on Cedar and false on Maple. InputGroup defaults and Form state apply; a child's explicit value wins. focus(options?), blur(), select() and textareaRef are exposed.

`TextareaProps`、`TextareaVariant`、`TextareaMaxLength`、`TextareaAutoSize`、`TextareaEmits`、`TextareaSlots`、`TextareaExpose`、`TextareaInstance`。

Native methods: `focus(options?: FocusOptions)`, `blur()`, `select()`; `textareaRef` is the native element.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
