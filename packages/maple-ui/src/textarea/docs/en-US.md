# Textarea

Native inputs always use `autocomplete="off"`; native attribute bags cannot enable autofill.

### Introduction

A multiline plain-text editor for comments, feedback, and other longer content.

## Reading direction

The textarea inherits source `dir`, aligns text to inline start and its counter to inline end. Runtime direction changes retain the native editor, focus and selection; native caret and newline keys keep their meanings.

## Basic examples

### Basic usage and value models

Use `v-model` for a controlled value and `default-value` for an uncontrolled initial value. The third textarea uses `v-model.trim`: blur to commit the trimmed value, then inspect the value below it.

Default length counts UTF-16 code units (an emoji usually uses 2). Default truncation never splits a valid surrogate pair; a character that does not fit is omitted entirely. For grapheme-cluster counting and slicing, provide matching `word-length` and `word-slice` functions; custom slicing remains application-controlled.

```demo
../example/demos/en-US/demo-1.vue
```

## Appearance and states

### Hint

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                       | Related examples    |
| ------------- | --------------------------------------------- | ------------------- |
| `rows`        | Native visible row count                      | Hint, Sizes, States |
| `placeholder` | Placeholder text                              | Hint, Sizes         |
| `hint`        | Floating hint; inherits Group/library default | Hint                |
| `size`        | `xs \\                                        | sm \\               | md \\     | lg \\ | xl` | Size |
| `variant`     | `filled \\                                    | outline \\          | standard` | Size  |
| `readonly`    | Whether readonly                              | States              |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/demo-3.vue
```

### Sizes

```demo
../example/demos/en-US/demo-4.vue
```

### States

```demo
../example/demos/en-US/demo-6.vue
```

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for notes and multi-line descriptions. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

```demo
../example/demos/appearance-lab.vue
```

## Content and presentation

### Length and resize

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration     | Purpose                               | Related examples  |
| ----------------- | ------------------------------------- | ----------------- |
| `clearable`       | Enables the clear action              | Length and resize |
| `max-length`      | Truncating or error-only length limit | Length and resize |
| `show-word-limit` | Show the character counter            | Length and resize |
| `placeholder`     | Placeholder text                      | Length and resize |
| `resize`          | Allows vertical manual resizing       | Length and resize |
| `rows`            | Native visible row count              | Length and resize |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/demo-5.vue
```

## Interaction and control

### Interaction states

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                       | Related examples        |
| ------------- | --------------------------------------------- | ----------------------- |
| `disabled`    | Whether disabled                              | Interaction states      |
| `readonly`    | Whether readonly                              | Interaction states      |
| `error`       | Show the error state                          | Interaction states      |
| `hint`        | Floating hint; inherits Group/library default | Body and event contract |
| `clearable`   | Enables the clear action                      | Body and event contract |
| `placeholder` | Placeholder text                              | Body and event contract |

<!-- demo-config-notes:end -->

Use this example for notes and multi-line descriptions. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### Body and event contract

The two libraries maintain independent copies of the body. Input emits input before update:modelValue. Clearing emits clear → input → update:modelValue → change once each; Form receives each semantic once. Readonly/disabled/composing controls cannot clear. A rejected controlled value is restored, including input types without selection APIs.

```demo
../example/demos/en-US/body-contract.vue
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Props

| Arguments         | Description                                   | Type                                                | Default     |
| ----------------- | --------------------------------------------- | --------------------------------------------------- | ----------- |
| `v-model`         | Controlled value                              | _string_                                            | `-`         |
| `default-value`   | Uncontrolled initial value                    | _string_                                            | `''`        |
| `model-modifiers` | Supports the `trim` model modifier            | _object_                                            | `{}`        |
| `placeholder`     | Placeholder text                              | _string_                                            | `-`         |
| `variant`         | `filled \| outline \| standard`               | _string_                                            | `outline`   |
| `size`            | `xs \| sm \| md \| lg \| xl`                  | _string_                                            | `md`        |
| `clearable`       | Enables the clear action                      | _boolean_                                           | `false`     |
| `disabled`        | Whether disabled                              | _boolean_                                           | `undefined` |
| `readonly`        | Whether readonly                              | _boolean_                                           | `undefined` |
| `error`           | Show the error state                          | _boolean_                                           | `undefined` |
| `rows`            | Native visible row count                      | _string \| number_                                  | `-`         |
| `resize`          | Allows vertical manual resizing               | _boolean_                                           | `false`     |
| `auto-size`       | Grows with content with optional row bounds   | _boolean \| { minRows?: number; maxRows?: number }_ | `false`     |
| `max-length`      | Truncating or error-only length limit         | _number \| { length: number; errorOnly?: boolean }_ | `0`         |
| `show-word-limit` | Show the character counter                    | _boolean_                                           | `false`     |
| `word-length`     | Custom length function                        | _(value: string) => number_                         | `-`         |
| `word-slice`      | Custom slice function                         | _(value: string, maxLength: number) => string_      | `-`         |
| `aria-label`      | Accessible name when no visible label exists  | _string_                                            | `-`         |
| `autofocus`       | Focus automatically after mount               | _boolean_                                           | `false`     |
| `enterkeyhint`    | Virtual keyboard Enter hint                   | _string_                                            | `-`         |
| `textarea-attrs`  | Supplemental native textarea attributes       | _object_                                            | `-`         |
| `hint`            | Floating hint; inherits Group/library default | _boolean_                                           | `undefined` |
| `line`            | Shows the decorator line                      | _boolean_                                           | `true`      |
| `text-color`      | Custom text color                             | _string_                                            | `-`         |
| `focus-color`     | Custom focus color                            | _string_                                            | `-`         |
| `blur-color`      | Custom blur color                             | _string_                                            | `-`         |

Inside Form/FormItem, omitted `size`, `disabled`, `readonly`, and `error` inherit form state. Explicit local values, including `false`, take precedence.

### Events

| Event     | Description                                    | Arguments                     |
| --------- | ---------------------------------------------- | ----------------------------- |
| `input`   | User input after IME composition               | `value: string, event: Event` |
| `change`  | Changed value committed on blur                | `value: string, event: Event` |
| `keydown` | Native keydown signal; Enter remains a newline | `event: KeyboardEvent`        |
| `clear`   | Clear → input → update:model-value → change    | `event: Event`                |
| `focus`   | Emitted on focus                               | `event: FocusEvent`           |
| `blur`    | Emitted on blur                                | `event: FocusEvent`           |

### Slots

| Slot         | Description          | Arguments                        |
| ------------ | -------------------- | -------------------------------- |
| `prefix`     | Prefix content       | `-`                              |
| `suffix`     | Suffix content       | `-`                              |
| `clear-icon` | Clear icon or button | `clear: (event?: Event) => void` |

### Methods

| Method  | Description                 |
| ------- | --------------------------- |
| `focus` | Focus the internal textarea |
| `blur`  | Blur the internal textarea  |

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

| Variable                           | Default                            |
| ---------------------------------- | ---------------------------------- |
| `--mp-textarea-height`             | `auto`                             |
| `--mp-textarea-min-height`         | `96px`                             |
| `--mp-textarea-font-size`          | `16px`                             |
| `--mp-textarea-line-height`        | `1.5`                              |
| `--mp-textarea-padding-horizontal` | `0`                                |
| `--mp-textarea-padding-vertical`   | `0`                                |
| `--mp-textarea-placeholder-color`  | `--mp-sys-color-content-secondary` |
| `--mp-textarea-counter-color`      | `--mp-sys-color-content-secondary` |
| `--mp-textarea-counter-font-size`  | `--mp-sys-font-size-xs`            |
| `--mp-textarea-counter-margin-top` | `--mp-sys-space-2`                 |

### Native layout and public types

size supports five FieldDecorator densities: xs/sm/md/lg/xl. rows, auto-size and Textarea tokens still control textarea height/text metrics. Cedar allows manual resize by default; Maple does not. InputGroup/Form state is inherited, with explicit child values taking precedence. Exposes focus(options?), blur(), select() and textareaRef.

`TextareaProps`、`TextareaVariant`、`TextareaMaxLength`、`TextareaAutoSize`、`TextareaEmits`、`TextareaSlots`、`TextareaExpose`、`TextareaInstance`。

Native methods: `focus(options?: FocusOptions)`, `blur()`, `select()`; `textareaRef` is the native element.

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-`direct` modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`--mp-field-caret-color` defaults to `currentColor` and sets shared caret color. `--mp-textarea-caret-color` overrides this component, default `var(--mp-field-caret-color)`.

## Configuring the cleared value

`empty-value` / `emptyValue` sets the model value produced by clearing. It accepts a value in the component model type or a zero-argument factory. Omission preserves the existing default; use `() => undefined` to distinguish omission from returning undefined. Arrays are shallow-copied on every clear; selected items that cannot be cleared remain. It does not redefine emptiness, alter Form reset defaults or treat 0/false as universally empty.
Text and person-ID models remain strings; use an empty string or a business-defined string sentinel.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
