# InputNumber

One real IAB default/light repeat lifecycle case passes per platform: actual first/subsequent repeat, stable after cancellation, fresh hold unmounted before800ms and stable beyond deadline, final nodes0. Entry click is native but internal pointerdown/pointercancel is scripted; not native long press/touch, dequeued-race, cross-window or OS evidence.

Each long-press timer validates and consumes its generation before stepping. Old callbacks after stop, replacement, release, deactivation or disposal cannot change the value; a reentrant step that starts another hold cannot cancel that replacement through its return value. Inactive owners reject new holds; reactivation requires a new gesture rather than resuming the old one. Initial800ms/repeat150ms are interaction cadence, not CSS motion tokens. Eight controlled-timer/stale-callback tests pass per platform (seven fail before repair); full InputNumber Cedar45/Maple48 pass. This is not real browser or OS acceptance.

InputNumber edits and commits JavaScript numbers. The libraries own independent copies of the view, controller, styles and API; no runtime instance is shared.

- A defined model-value is controlled; default-value only initializes uncontrolled state. Drafts may differ while editing. A rejected proposal restores the parent value after commit. External updates never emit user events or trigger validation.
- By default, Enter or blur commits. With model-event="input", complete numeric edits update immediately; change still represents a commit. Enter followed by blur does not commit twice.
- Clearing emits **input → update:model-value → change → clear**, with an undefined value. The former clear-only behavior is removed without an alias or compatibility branch.
- Intermediate signs and decimal points are preserved while editing. A trailing decimal point commits as a number; a lone sign/dot restores the previous value. Invalid text and non-finite numbers are never published. IME input is processed once after composition.
- Range limits win over precision. Both copies use isolated Decimal configuration; the public model remains a JavaScript number, not arbitrary-precision storage.
- disabled/readonly/size inherit from InputGroup and Form. Explicit false overrides inheritance. variant/hint inherit InputGroup. An outer FormItem label suppresses a duplicate floating label. Cedar also reads ConfigProvider for fallback size; Maple uses its existing defaults.
- Mouse/touch long press stops on release, cancel, leave, window blur, deactivation, disposal or state changes. Button mode offers larger touch targets. Arrow keys step; Enter commits.

Native inputs always use `autocomplete="off"`; native attribute bags cannot enable autofill.

## Reading direction

The numeric input inherits its source `dir`; step buttons follow reading order. Values, precision and vertical keys retain their meaning: ArrowUp increases and ArrowDown decreases. Neither values nor display strings are reversed.

## Basic examples

### Basic states

```demo
../example/demos/en-US/field-basic.vue
```

## Appearance and layout

### Appearance combinations

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                 | Related examples                                 |
| ------------- | --------------------------------------- | ------------------------------------------------ |
| `size`        | All five sizes implemented; inheritable | Form control size comparison, Sizes and variants |
| `variant`     | Field variant; inherits InputGroup      | Form control size comparison, Sizes and variants |
| `placeholder` | Placeholder                             | Form control size comparison, Sizes and variants |
| `min`         | Minimum                                 | Appearance combinations                          |
| `max`         | Maximum                                 | Appearance combinations                          |
| `disabled`    | Disabled; inherits when omitted         | Form control size comparison                     |

<!-- demo-config-notes:end -->

Use this example for quantities and numeric limits. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Form control size comparison

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### Control layouts

```demo
../example/demos/en-US/field-modes.vue
```

### Sizes and variants

```demo
../example/demos/en-US/field-options.vue
```

## Numeric input and formatting

### Quantity controls and commit guards

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                             | Related examples                                                                      |
| ------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `clearable`   | Allow clearing an editable field                    | Quantity controls and commit guards, Formatting and slots, Small steps and boundaries |
| `mode`        | Step-button layout                                  | Quantity controls and commit guards, Formatting and slots                             |
| `min`         | Minimum                                             | Quantity controls and commit guards, Small steps and boundaries                       |
| `max`         | Maximum                                             | Quantity controls and commit guards, Small steps and boundaries                       |
| `step`        | Positive finite step; scientific notation supported | Quantity controls and commit guards, Small steps and boundaries                       |
| `formatter`   | Display formatting only; does not change the number | Formatting and slots, Small steps and boundaries                                      |

<!-- demo-config-notes:end -->

`disable-input` prevents typing and clearing while keeping buttons and arrow keys usable. `disable-increment` / `disable-decrement` block one direction; `increment-button` / `decrement-button` control visibility and also block the hidden direction on the keyboard. `press=false` disables repeat.

`before-commit(value, { previousValue, signal })` returns false to reject or void to allow, synchronously or through a Promise. Inline typing, live model input, stepping and clearing wait for approval. Pending operations expose aria-busy and cannot overlap. External values, blocking, configuration changes, deactivation and disposal cancel stale results. Rejection restores the committed value; failures emit commit-error(error). Popup confirmation owns the guard and does not approve every inner draft. Guarded steps do not auto-repeat approval requests.

`step(value, direction, event)` reports accepted changes only, with direction plus or minus. No event is emitted for rejected, blocked, hidden-direction or boundary operations, or external updates.

| Prop                                      | Type      | Default |
| ----------------------------------------- | --------- | ------- |
| `disable-input`                           | `boolean` | `false` |
| `disable-increment` / `disable-decrement` | `boolean` | `false` |
| `increment-button` / `decrement-button`   | `boolean` | `true`  |
| `press`                                   | `boolean` | `true`  |

```demo
../example/demos/en-US/quantity-controls.vue
```

### Formatting and slots

```demo
../example/demos/en-US/format-slots.vue
```

### Small steps and boundaries

```demo
../example/demos/en-US/number-boundaries.vue
```

### Empty markers and valid zero

Configure empty-values and empty-value when an API uses -1 for missing data. Initially the input is blank while the model remains -1. Set it to 0 to see a valid zero; clearing returns -1. A second field clears to a valid 0, showing that clear output need not mean missing data.

```demo
../example/demos/en-US/empty-value.vue
```

## Interaction and forms

### Interaction states

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                       | Related examples                               |
| ------------- | --------------------------------------------- | ---------------------------------------------- |
| `disabled`    | Disabled; inherits when omitted               | Interaction states, Form inheritance           |
| `readonly`    | Read-only; allows focus/copy but no mutations | Interaction states, Form inheritance           |
| `clearable`   | Allow clearing an editable field              | Controlled values and events, Form inheritance |
| `min`         | Minimum                                       | Interaction states                             |
| `max`         | Maximum                                       | Interaction states                             |
| `error`       | Error state; inherits FormItem when omitted   | Interaction states                             |

<!-- demo-config-notes:end -->

Use this example for quantities and numeric limits. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### Controlled values and events

```demo
../example/demos/en-US/controlled-events.vue
```

### Form inheritance

```demo
../example/demos/en-US/form-inheritance.vue
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

### Clear output

`empty-value` / `emptyValue` sets the model value produced by clearing. It accepts a value in the component model type or a zero-argument factory. Omission preserves the existing default; use `() => undefined` to distinguish omission from returning undefined. Arrays are shallow-copied on every clear; selected items that cannot be cleared remain. It does not redefine emptiness, alter Form reset defaults or treat 0/false as universally empty.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

### Props

| Prop          | Description                                                      | Type                            | Default                    |
| ------------- | ---------------------------------------------------------------- | ------------------------------- | -------------------------- |
| model-value   | Controlled number; undefined denotes an empty/uncontrolled value | `number`                        | —                          |
| default-value | Initial uncontrolled value                                       | `number`                        | —                          |
| mode          | Step-button layout                                               | `embed \| button \| input`      | `embed`                    |
| precision     | Decimal places (0–100), at least the step precision              | `number`                        | —                          |
| step          | Positive finite step; scientific notation supported              | `number`                        | `1`                        |
| disabled      | Disabled; inherits when omitted                                  | `boolean`                       | Inherited, otherwise false |
| error         | Error state; inherits FormItem when omitted                      | `boolean`                       | Inherited, otherwise false |
| max           | Maximum                                                          | `number`                        | `Infinity`                 |
| min           | Minimum                                                          | `number`                        | `-Infinity`                |
| formatter     | Display formatting only; does not change the number              | `(text: string) => string`      | —                          |
| parser        | Parse the original text once per edit                            | `(text: string) => string`      | —                          |
| placeholder   | Placeholder                                                      | `string`                        | —                          |
| size          | All five sizes implemented; inheritable                          | `xs \| sm \| md \| lg \| xl`    | Inherited, otherwise md    |
| variant       | Field variant; inherits InputGroup                               | `outline \| filled \| standard` | `outline`                  |
| hint          | Floating hint; inherits InputGroup / FieldDecorator              | `boolean`                       | Library default            |
| clearable     | Allow clearing an editable field                                 | `boolean`                       | `false`                    |
| model-event   | Model update timing; change only reports commits                 | `change \| input`               | `change`                   |
| readonly      | Read-only; allows focus/copy but no mutations                    | `boolean`                       | Inherited, otherwise false |
| input-attrs   | Additional native input attributes                               | `Record<string, unknown>`       | —                          |

### Events

| Event              | Arguments                                                  | Description                                                      |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| input              | `(value: number \| undefined, text: string, event: Event)` | Parsed value and display text while editing                      |
| update:model-value | `(value: number \| undefined)`                             | Proposed model update                                            |
| change             | `(value: number \| undefined, event: Event)`               | Commit, step or clear                                            |
| clear              | `(event: Event)`                                           | Explicit clear                                                   |
| focus              | `(event: FocusEvent)`                                      | Focus                                                            |
| blur               | `(event: FocusEvent)`                                      | Blur                                                             |
| keydown            | `(event: KeyboardEvent)`                                   | Native keyboard event; preventDefault intercepts default actions |

### Slots

| Slot             | Arguments                            | Description         |
| ---------------- | ------------------------------------ | ------------------- |
| prefix / suffix  | —                                    | Inside the field    |
| prepend / append | —                                    | Outside the field   |
| plus / minus     | —                                    | Step-button icons   |
| clear-icon       | `{ clear: (event?: Event) => void }` | Custom clear button |

### Methods

| Method / property | Type                               | Description                       |
| ----------------- | ---------------------------------- | --------------------------------- |
| focus             | `(options?: FocusOptions) => void` | Focus; ineffective while disabled |
| blur              | `() => void`                       | Blur                              |
| select            | `() => void`                       | Select all text                   |
| inputRef          | `HTMLInputElement \| undefined`    | Native input element              |

## Type definitions / Types

```ts
import type {
  InputNumberFormatter,
  InputNumberInstance,
  InputNumberMode,
  InputNumberModelEvent,
  InputNumberParser,
  InputNumberProps,
  InputNumberSize,
  InputNumberVariant,
} from '@maple-design/ui'
```

## Style variables

| Token                                               | Default                                 |
| --------------------------------------------------- | --------------------------------------- |
| `--mp-input-number-step-button-width`               | `var(--mp-sys-control-height-md)`       |
| `--mp-input-number-step-button-color`               | `var(--mp-sys-color-content-secondary)` |
| `--mp-input-number-step-button-disabled-color`      | `var(--mp-sys-color-content-disabled)`  |
| `--mp-input-number-step-button-border-color`        | `var(--mp-sys-color-border-subtle)`     |
| `--mp-input-number-step-button-background`          | `var(--mp-sys-color-surface-muted)`     |
| `--mp-input-number-step-button-hover-background`    | `var(--mp-sys-color-state-hover)`       |
| `--mp-input-number-step-button-active-background`   | `var(--mp-sys-color-state-selected)`    |
| `--mp-input-number-step-button-icon-size`           | `14px`                                  |
| `--mp-input-number-step-button-transition-duration` | `0.2s`                                  |
| `--mp-input-number-addon-background`                | `var(--mp-sys-color-surface-muted)`     |
| `--mp-input-number-addon-color`                     | `var(--mp-sys-color-content-primary)`   |
| `--mp-input-number-addon-border-color`              | `var(--mp-sys-color-border-default)`    |
| `--mp-input-number-border-width`                    | `1px`                                   |
| `--mp-input-number-border-radius`                   | `var(--mp-field-border-radius)`         |
| `--mp-input-number-size-xs-step-button-width`       | `var(--mp-sys-control-height-xs)`       |
| `--mp-input-number-size-sm-step-button-width`       | `var(--mp-sys-control-height-sm)`       |
| `--mp-input-number-size-md-step-button-width`       | `var(--mp-sys-control-height-md)`       |
| `--mp-input-number-size-lg-step-button-width`       | `var(--mp-sys-control-height-lg)`       |
| `--mp-input-number-size-xl-step-button-width`       | `var(--mp-sys-control-height-xl)`       |

Shared field appearance still uses FieldDecorator `--mp-field-*` tokens. Old step-layer-border-radius is removed without aliases.

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-`direct` modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`--mp-field-caret-color` defaults to `currentColor` and sets shared caret color. `--mp-input-number-caret-color` overrides this component, default `var(--mp-field-caret-color)`.

An explicit beforeCommit wait uses the existing loadingMode indicator and native aria-busy. Manual loading remains independent and does not implicitly make the input readonly; the beforeCommit guard owns its existing input lock. Returned change/step notification Promises do not control waiting.
