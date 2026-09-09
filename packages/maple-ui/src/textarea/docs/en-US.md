# Textarea

### Introduction

A multiline plain-text editor for comments, feedback, and longer descriptions. It defaults to the `outlined` variant with clearing disabled.

### Value model

Use `v-model` for a controlled value and `default-value` for an uncontrolled initial value. `v-model.trim` trims the value when blur commits the edit.

```html
<mp-textarea v-model="value" placeholder="Enter multiline text" />
<mp-textarea default-value="Initial content" />
<mp-textarea v-model.trim="value" />
```

### Length and height

A numeric `max-length` truncates user input. `{ errorOnly: true }` keeps the complete value and marks the field invalid. `auto-size` grows with content and overrides manual resize behavior.

```html
<mp-textarea :max-length="100" show-word-limit />
<mp-textarea :max-length="{ length: 100, errorOnly: true }" show-word-limit />
<mp-textarea :auto-size="{ minRows: 2, maxRows: 6 }" />
```

## API

### Props

| Prop              | Description                                  | Type                                                | Default    |
| ----------------- | -------------------------------------------- | --------------------------------------------------- | ---------- |
| `v-model`         | Controlled value                             | _string_                                            | `-`        |
| `default-value`   | Uncontrolled initial value                   | _string_                                            | `''`       |
| `model-modifiers` | Supports the `trim` model modifier           | _object_                                            | `{}`       |
| `placeholder`     | Placeholder text                             | _string_                                            | `-`        |
| `variant`         | `filled \| outlined \| standard`             | _string_                                            | `outlined` |
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
| `--mp-textarea-height`            | `auto`  |
| `--mp-textarea-min-height`        | `96px`  |
| `--mp-textarea-font-size`         | `16px`  |
| `--mp-textarea-length-margin-top` | `4px`   |
| `--mp-textarea-length-font-size`  | `12px`  |
