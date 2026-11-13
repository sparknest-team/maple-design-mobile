# Input

## Reading direction

The input inherits `dir` from its page or local scope. Affixes, clear actions and input groups follow reading order. Runtime changes retain the native editor, focus and selection; the browser handles caret movement, mixed text and composition without swapping editing keys. Parent rerenders preserve the native composition buffer; older selection-restoration tasks do not overwrite a newer composition.

## Basic examples

### Basic Usage

Default length counts UTF-16 code units (an emoji usually uses 2). Default truncation never splits a valid surrogate pair; a character that does not fit is omitted entirely. For grapheme-cluster counting and slicing, provide matching `word-length` and `word-slice` functions; custom slicing remains application-controlled.

```demo
../example/demos/en-US/basic.vue
```

### Form control size comparison

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### Introduction

Use Input for single-line text entry. It supports multiple variants, floating hints, input types, states, and prefix or suffix content.

## Appearance and states

### Appearance configuration comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ------------------------------------------ | ------------------ |
| `placeholder` | Placeholder or floating hint text | Form Feedback, Hint |
| `hint` | Use the placeholder as a floating hint | Form Feedback, Hint |
| `clearable` | Show a persistent clear icon while editable and nonempty | Form Feedback |
| `variant` | `filled`, `outline`, or `standard` | Hint |

<!-- demo-config-notes:end -->


Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for single-line form inputs. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

```demo
../example/demos/appearance-lab.vue
```

### Form Feedback

Use FormItem `feedback` and `validate-status` for validation feedback. An outer FormItem label disables the Input floating hint to avoid duplicate labels.

```demo
../example/demos/en-US/form-feedback.vue
```

### Hint

With `hint`, the placeholder floats on focus or when a value exists. Disable it for native placeholder behavior.

```demo
../example/demos/en-US/hint.vue
```

## Input content and layout

### Character Limit

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | ---------------------------------------------------------- | -------------------------------------- |
| `placeholder` | Placeholder or floating hint text | Character Limit, Prefix and Suffix, Custom Clear Icon |
| `clearable` | Show a persistent clear icon while editable and nonempty | Character Limit, Custom Clear Icon, Group State Inheritance |
| `max-length` | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | Character Limit |
| `hint` | Use the placeholder as a floating hint | Input Group |
| `default-value` | Uncontrolled initial value; read only at creation, never written into the parent | Group State Inheritance |
| `disabled` | Whether disabled | Group State Inheritance |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/max-length.vue
```

`max-length` accepts a finite nonnegative number or `{ length, errorOnly? }`; `0` means unlimited. Object `length` follows the same numeric constraint and `errorOnly` is an optional boolean. Invalid values use Vue prop-validation diagnostics and fall back to no limit; null is treated as unset. Default slicing counts UTF-16 code units. Supply `word-length / word-slice` together for custom counting and slicing.

### Password Input

`mp-input-password` adds visibility toggling with `visibility` / `default-visibility`, `visibility-toggle`, and `visibility-change`. Other Input props and events are forwarded.

```demo
../example/demos/en-US/password.vue
```

### Prefix and Suffix

```demo
../example/demos/en-US/prefix-suffix.vue
```

### Custom Clear Icon

```demo
../example/demos/en-US/custom-clear-icon.vue
```

### Input Group

`mp-input-group` passes `size`, `variant`, `disabled`, `readonly`, and `hint` to child inputs unless overridden locally. Use `mp-input-group-label` for attached text.

```demo
../example/demos/en-US/group.vue
```

`InputGroupLabel` renders a span for content attached outside the input. Associate a visible name by matching FormItem `label-attrs.for` to the Input `id`, or use a native label with for/id. You can also provide `aria-label` explicitly.

### Group State Inheritance

Explicit child props override group defaults, including `false`. Nested groups inherit unspecified values.

```demo
../example/demos/en-US/group-state.vue
```

## Content and presentation

### Input Types

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ---------------------------------------------- | -------- |
| `type` | `text`, `password`, `number`, `tel`, or `email` | Input Types |
| `placeholder` | Placeholder or floating hint text | Input Types |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/type.vue
```

## Value model and interaction

### Default value and v-model

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | ---------------------------------------------------------- | ------------------------------------ |
| `placeholder` | Placeholder or floating hint text | Model Modifier, Body and event contract, Native Attributes |
| `aria-label` | Accessible label | Default value and v-model, Native Attributes |
| `clearable` | Show a persistent clear icon while editable and nonempty | Body and event contract, Clear icon and manual deletion |
| `default-value` | Uncontrolled initial value; read only at creation, never written into the parent | Default value and v-model |
| `disabled` | Whether disabled | Interaction state comparison |
| `readonly` | Whether readonly | Interaction state comparison |

<!-- demo-config-notes:end -->


`modelValue` is the controlled value bound through ordinary `v-model`. It takes precedence, including an empty string. `defaultValue` initializes uncontrolled state only when the component is created; subsequent user input is stored internally. Changing `defaultValue` does not reset existing text. Remounting reads it again. Initialization emits no `update:modelValue` and does not write to a parent form.

`v-model.trim` follows Vue model event rules: `update:modelValue` is trimmed during input, while `input` reports the original text after length normalization. An uncontrolled editor may retain surrounding whitespace while editing and normalizes its local display on commit; committing does not repeat the same model proposal already reported. Controlled display follows the final parent value, and `change` still denotes a commit.

For a form default, initialize the bound field, for example `const text = ref('Beijing')`, then use `<mp-input v-model="text" />`.

```demo
../example/demos/en-US/default-value.vue
```

### Clear icon and manual deletion

Set clear output to null. Clear with the icon, restore the initial value, then delete all text with Backspace. The model shows null for the icon and an empty string for manual deletion.

```demo
../example/demos/en-US/empty-value.vue
```

### Model Modifier

```demo
../example/demos/en-US/model-modifier.vue
```

### Interaction state comparison

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for single-line form inputs. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

### Body and event contract

Input notifies input → update:modelValue. Clearing notifies clear → input → update:modelValue → change once each, with one corresponding Form notification. Clearing is blocked while readonly, disabled or composing. Rejected controlled proposals restore the native content, including input types without cursor APIs.

```demo
../example/demos/en-US/event-pipeline.vue
```

### Native Attributes

```demo
../example/demos/en-US/native-attrs.vue
```

### Commit approval

Cancellable hooks use `(payload, done, context)`: closure payloads contain `{ action }`, change/commit payloads contain `{ value, previousValue }`, and Popup uses `{ reason }`. Context provides `signal` and an optional original `event`. Return a boolean/Promise, or call done()/done(false). Synchronous void waits for done; Promise&lt;void&gt; allows the operation. First completion wins. Pending state controls loading/disabled automatically. Cancellation invalidates stale results. Button refs are not exposed.

<demo src="../example/demos/en-US/commit-protocol.vue"></demo>

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Loading and waiting

### Loading

Toggle loading to compare the default indicator and bottom line. Input remains editable while loading.

```demo
../example/demos/loading.vue
```

## Composition input

IME composition preserves the native text being entered; external model updates do not replace it before composition completes. Existing formatting and controlled-owner acceptance apply after completion. Queued restoration from an earlier input cannot replace the text or caret of a later edit or composition. Length limits and modifiers retain their existing post-composition input/commit timing.

## Usage notes

### Form presentation inheritance

Supports `edit-mode`: `direct / popup`. Inherits FormItem/Form when unset; standalone usage defaults to direct. readPretty displays plain text; popup editing updates v-model after confirmation by default. Optional before-commit can intercept saving after candidate validation. See the Form documentation for usage and comparison demos.

### Native busy metadata

When neither loading nor commit waiting is active, Input preserves native aria-busy metadata. Internal busy takes precedence over an external false hint. Setting aria-busy alone does not create an indicator or async task.
### Configuration

Input exposes these variables; see [FieldDecorator](#/en-US/field-decorator) for container appearance.

Public types: `InputEmits`, `InputSlots`, `InputExpose`, `InputGroupSlots`, `InputPasswordEmits`, `InputPasswordSlots`, `InputPasswordExpose`.

### Input caret theme

Deferred `change` preserves the real confirmation event when available (for example, the save button). Programmatic editor handoff has no DOM event, so its second argument is optional. The event target can be the confirmation control rather than the input. `change` is a notification: its returned Promise is not awaited; use `before-commit` to approve asynchronous saves.

InputPassword forwards all Input props, events and slots. `open` controls only the deferred editor; direct mode has no editor. Initial `open`/default-`open` does not request an initialization close, and later default-`open` changes do not reopen the editor.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Input Props

| Prop | Description | Type | Default |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------ | :---------: |
| `v-model` | Controlled value | `string \| null` | `-` |
| `model-modifiers` | `v-model` modifiers; supports `trim` | `object` | `{}` |
| `default-value` | Uncontrolled initial value; read only at creation, never written into the parent | `string` | `''` |
| `type` | `text`, `password`, `number`, `tel`, or `email` | `InputType`<br>`'number' \| 'text' \| 'email' \| 'tel' \| 'password'` | `text` |
| `placeholder` | Placeholder or floating hint text | `string` | `-` |
| `size` | `xs`, `sm`, `md`, `lg`, or `xl` | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| `variant` | `filled`, `outline`, or `standard` | `string` | `outline` |
| `hint` | Use the placeholder as a floating hint | `boolean` | `true` |
| `line` | Show the border or bottom separator | `boolean` | `true` |
| `max-length` | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | `number \| object` | `0` |
| `show-word-limit` | Show the character counter | `boolean` | `false` |
| `word-length` | Custom length calculator | `function` | `-` |
| `word-slice` | Custom truncation function | `function` | `-` |
| `readonly` | Whether readonly | `boolean` | `false` |
| `disabled` | Whether disabled | `boolean` | `false` |
| `error` | Show the error state | `boolean` | `false` |
| `clearable` | Show a persistent clear icon while editable and nonempty | `boolean` | `false` |
| empty-value | Clear output; omission clears to an empty string and manual deletion is unchanged | `string \| null \| (() => string \| null)` | `undefined` |
| `autofocus` | Focus automatically after mount | `boolean` | `false` |
| `enterkeyhint` | Mobile enter-key hint | `string` | `-` |
| `aria-label` | Accessible label | `string` | `-` |
| `input-attrs` | Native attributes such as name; `autocomplete` is fixed to `off` | `object` | `-` |
| `text-color` | Text color | `string` | `-` |
| `focus-color` | Focus color | `string` | `-` |
| `blur-color` | Blur color | `string` | `-` |
| `edit-mode` | Editor mode; inherits FormItem/Form | `direct / popup` | `undefined` |
| `read-pretty` | Reading presentation; inherits FormItem/Form | `boolean` | `undefined` |
| `open` | Controlled editor visibility in deferred modes | `boolean` | `undefined` |
| `default-open` | Uncontrolled initial editor visibility; creation-only | `boolean` | `false` |
| `before-commit` | Deferred save approval: (payload, done, context) | `BeforeFieldCommit` | `undefined` |
| `popup-container` | Deferred editor portal target; false renders in place | `PopupContainer` | `undefined` |
| `loading` | Manual loading presentation; remains editable | `boolean` | `false` |
| `loading-mode` | Indicator layout | `default / line` | `default` |

Configure validation rules on `mp-form-item`; see [Form](#/en-US/form).

size/disabled/readonly inherit from child → InputGroup → FormItem/Form → library defaults. All five sizes work. `hint` defaults on but is disabled by an external label. name/id/aria-*/data-* reach native input; class/style stay on the wrapper. `input-attrs` cannot override controlled value, type, disabled/readonly or length policy.

### Input Methods

| Method | Description | Arguments | Returns |
| -------- | ------------ | ---- | ------ |
| `focus` | Focus | `-` | `-` |
| `blur` | Blur | `-` | `-` |
| `select` | Select all text | `-` | `-` |

### Input Events

| Event | Description | Arguments |
| ------------- | ------------------------------- | ----------------------------- |
| `focus` | Emitted on focus | `event: FocusEvent` |
| `blur` | Emitted on blur | `event: FocusEvent` |
| `clear` | Emitted when clearing | `event: Event` |
| `input` | Emitted on input | `value: string, event: Event` |
| `change` | Emitted only when blur or Enter commits a value | `value: string \| null, event?: Event` |
| `press-enter` | Emitted when Enter is pressed | `event: KeyboardEvent` |
| `keydown` | Emitted on keydown | `event: KeyboardEvent` |
| `update:modelValue` | Model proposal; includes explicit null | `value: string \| null` |
| `update:open` | Editor visibility request | `open: boolean` |
| `click` | Native input click notification | `event: MouseEvent` |

`errorOnly: true` retains over-limit text and shows an error. Other active length limits truncate; `input` reports normalized text and model notifications follow Vue modifiers. Clearing notifies `clear → input → update:model-value → change`; the following blur does not repeat `change`.

### Input Slots

| Slot | Description | Prop |
| ------------ | -------------- | ------------------- |
| `prefix` | Prefix content | `-` |
| `suffix` | Suffix content | `-` |
| `clear-icon` | Clear icon or button | `clear: (event?: Event) => void` |
| `read` | Custom reading content | `{ value: string \| null }` |

### InputPassword and InputGroup

| Component | Prop / event | Description |
| ---------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| `mp-input-password` | `visibility`, `default-visibility`, `visibility-toggle` | Password visibility; uncontrolled by default, with a visible toggle |
| `mp-input-password` | `visibility-change`, `update:visibility` | Emitted on visibility changes with a `boolean` argument |
| `mp-input-group` | `size`, `variant`, `disabled`, `readonly`, `hint` | Child Input defaults; `variant` defaults to `outline` |
| `mp-input-group-label` | Default slot | Text attachment for grouped inputs |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-input-caret-color` | `var(--mp-field-caret-color)` | `caret-color` |
| `--mp-input-control-font-size` | `inherit` | `font-size` |
| `--mp-input-control-height` | `auto` | `height` |
| `--mp-input-control-line-height` | `inherit` | `line-height` |
| `--mp-input-control-padding-horizontal` | `0` | `padding` |
| `--mp-input-counter-color` | `var(--mp-field-suffix-text-color)` | `color` |
| `--mp-input-counter-font-size` | `12px` | `font-size` |
| `--mp-input-feedback-duration` | `1s` | `animation` |
| `--mp-input-feedback-error-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-input-feedback-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-input-feedback-validating-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-input-feedback-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-input-caret-color: var(--mp-field-caret-color);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Input caret theme

`--mp-field-caret-color` defaults to `currentColor` and sets shared caret color. `--mp-input-caret-color` overrides this component, default `var(--mp-field-caret-color)`.
