# Textarea

### Introduction

A multiline plain-text editor for comments, feedback, and other longer content.

### Basic usage

```demo
../example/demos/demo-1.vue
```

### Variants

```demo
../example/demos/demo-2.vue
```

### Hint

```demo
../example/demos/demo-3.vue
```

### Sizes

```demo
../example/demos/demo-4.vue
```

### Length and resize

```demo
../example/demos/demo-5.vue
```

### States

```demo
../example/demos/demo-6.vue
```

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
| `disabled`        | Disables editing                             | _boolean_                                           | `false`    |
| `readonly`        | Makes the value read-only                    | _boolean_                                           | `false`    |
| `error`           | Enables the visual error state               | _boolean_                                           | `false`    |
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
| `hint`            | Uses Maple's floating placeholder            | _boolean_                                           | `true`     |
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
| `clear`   | Clear action without synthetic input/change    | `event: Event`                |
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
} from '@maplejs/maple-ui'
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
