# VerificationCode

Independent cross-platform source copies built on Input.

## Basic examples

### basic

```demo
../example/demos/en-US/basic.vue
```

## Appearance and states

### appearance

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration   | Purpose                                                      | Related examples                    |
| --------------- | ------------------------------------------------------------ | ----------------------------------- |
| `default-value` | Uncontrolled initial value                                   | appearance, states                  |
| `length`        | Positive integer cell count, measured in Unicode code points | appearance, Appearance combinations |
| `aria-label`    | Group name and numbered cell labels                          | appearance, states                  |
| `masked`        | Visual character masking only, not encryption                | appearance                          |
| `mask-symbol`   | Use the first Unicode code point                             | appearance                          |
| `variant`       | Input variant                                                | appearance                          |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/appearance.vue
```

### Appearance combinations

Use this example for segmented verification-code input. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### states

```demo
../example/demos/en-US/states.vue
```

## Data and options

### formatting

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration     | Purpose                                                                                                                   | Related examples |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `type`            | Character set                                                                                                             | formatting       |
| `paste-transform` | Paste preprocessing, before type/formatter                                                                                | formatting       |
| `formatter`       | Per-character formatting: false rejects; true/undefined retains. A returned string contributes its first valid code point | formatting       |
| `aria-label`      | Group name and numbered cell labels                                                                                       | formatting       |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/formatting.vue
```

## Interaction and control

### Interaction states

Use this example for segmented verification-code input. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Codes form an LTR content island: display, paste and focus navigation preserve string order. Outer start/end alignment still follows reading direction. RTL never reverses code characters; numeric and text codes share this ordering contract.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Props

| Prop                                    | Description                                                                                                               | Type                                            | Default             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------- |
| `model-value`                           | Controlled complete code                                                                                                  | `string`                                        | `undefined`         |
| `default-value`                         | Uncontrolled initial value                                                                                                | `string`                                        | `''`                |
| `length`                                | Positive integer cell count, measured in Unicode code points                                                              | `number`                                        | `6`                 |
| `type`                                  | Character set                                                                                                             | `digit / text / alphanumeric`                   | `digit`             |
| `size`                                  | Five wrapper sizes                                                                                                        | `xs / sm / md / lg / xl`                        | Inherited / md      |
| `variant`                               | Input variant                                                                                                             | `filled / outline / standard`                   | Inherited / outline |
| `disabled / readonly / error`           | State; explicit values override Form                                                                                      | `boolean`                                       | `undefined`         |
| `masked`                                | Visual character masking only, not encryption                                                                             | `boolean`                                       | `false`             |
| `mask-symbol`                           | Use the first Unicode code point                                                                                          | `string`                                        | `•`                 |
| `autofocus`                             | Focus the first empty cell after mounting                                                                                 | `boolean`                                       | `false`             |
| `gutter`                                | Cell gap; numbers are px                                                                                                  | `number / string`                               | Component token     |
| `align`                                 | Horizontal alignment                                                                                                      | `start / center / end`                          | `center`            |
| `allow-paste`                           | Allow pasting; false prevents native paste                                                                                | `boolean`                                       | `true`              |
| `paste-transform`                       | Paste preprocessing, before type/formatter                                                                                | `(text: string) => string`                      | `undefined`         |
| `formatter`                             | Per-character formatting: false rejects; true/undefined retains. A returned string contributes its first valid code point | `(character, index, value) => string / boolean` | `undefined`         |
| `separator`                             | Separator after each nonfinal cell                                                                                        | `(index, character) => VNodeChild`              | `undefined`         |
| `aria-label`                            | Group name and numbered cell labels                                                                                       | `string`                                        | `undefined`         |
| `text-color / focus-color / blur-color` | Dynamic instance colors; prefer tokens for static themes                                                                  | `string`                                        | `undefined`         |

### Events

| Event              | Arguments               | Semantics                                                                                                                                   |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| input              | character, index, event | Starting character and zero-based index of each valid native input proposal                                                                 |
| update:model-value | value                   | Complete-code proposal                                                                                                                      |
| change             | value                   | Complete-code proposal for each valid edit, not necessarily accepted by a controlled parent                                                 |
| finish             | value                   | The changed complete code was accepted and filled all cells; accepted edits to already-full codes also emit it. External assignments do not |
| paste              | text, event             | Pasted text after paste-transform/type processing                                                                                           |
| focus / blur       | FocusEvent              | Focus enters/leaves the whole component; moving between cells does not duplicate notifications                                              |
| click              | MouseEvent              | Non-disabled click                                                                                                                          |

Valid input order: input → update:modelValue → change. finish waits until the parent accepts the complete value in that render. Rejected controlled values restore native inputs; later asynchronous parent assignments do not add finish. reset() proposes empty and emits update:modelValue/change without simulating native input. Disabled, readonly or composing state prevents reset from changing values.

Paste overwrites from the current cell; pasting on the root starts at cell 1. Input beyond the first empty cell is redirected there. SMS autofill entered as a whole code distributes across later cells. Typing one character in a filled cell replaces it even with the caret after the old character. IME prefers the current compositionend text and distributes multiple code points, falling back to native value only when committed text is absent. Processing is type filter → formatter → length trim; rejected characters occupy no cells. text counts Unicode code points, not grapheme clusters. External updates affect display without formatting/writeback.

### Slots

| Slot      | Arguments            | Description                                           |
| --------- | -------------------- | ----------------------------------------------------- |
| separator | { index, character } | Overrides separator; not rendered after the last cell |

### Expose

- focus(index?): zero-based index; omission selects the first empty cell or last cell when full. Disabled prevents focusing; readonly allows focus/copy.
- blur(): remove focus.
- reset(): propose clearing, respecting controlled/disabled/readonly state.

### Keyboard and Form

Left/Right move cells. Backspace removes the current character, or the previous one when empty. Delete removes the current character; following characters shift forward. IME composition does not trim/delete/move focus. Each native input has an SSR-stable id, and all cells use autocomplete=off. Provide aria-label.

InputGroup/Form state is inherited, with explicit disabled/readonly/error/size taking precedence. Internal cell Inputs do not duplicate Form notifications; the complete control notifies input/change once per edit. Both platforms implement three variants/five sizes using local FieldDecorator tokens.

## Type definitions

VerificationCodeProps、VerificationCodeType、VerificationCodeAlign、VerificationCodeVariant、VerificationCodeFormatter、VerificationCodeSeparator、VerificationCodeEmits、VerificationCodeSlots、VerificationCodeExpose、VerificationCodeInstance。

## Style variables

| Variable                               | Default               | Description                                                      |
| -------------------------------------- | --------------------- | ---------------------------------------------------------------- |
| --mp-verification-code-gutter          | var(--mp-sys-space-2) | Cell gap                                                         |
| --mp-verification-code-cell-height     | initial               | Follows size-specific field-size-*-height when not overridden    |
| --mp-verification-code-cell-max-width  | initial               | Follows size-specific field-size-*-height when not overridden    |
| --mp-verification-code-input-font-size | initial               | Follows size-specific field-size-*-font-size when not overridden |

initial means no public override. CSS reads size fallbacks at the component element. Override through component style or theme. Old Cedar column-gap is removed; use gutter.

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-`direct` modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.
