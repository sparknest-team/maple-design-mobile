# Textarea

Native inputs always use `autocomplete="off"`; native attribute bags cannot enable autofill.

### Introduction

A multiline plain-text editor for comments, feedback, and other longer content.

## Reading direction

The textarea inherits source `dir`, aligns text to inline start and its counter to inline end. Runtime direction changes retain the native editor, focus and selection; native caret and newline keys keep their meanings.

## Basic examples

### Basic usage and value models

Use `v-model` for a controlled value and `default-value` for an uncontrolled initial value.

`v-model.trim` follows Vue model event rules: `update:modelValue` is trimmed during input, while `input` reports the original text after length normalization. An uncontrolled editor may retain surrounding whitespace while editing and normalizes its local display on commit; committing does not repeat the same model proposal already reported. Controlled display follows the final parent value, and `change` still denotes a commit.

Default length counts UTF-16 code units (an emoji usually uses 2). Default truncation never splits a valid surrogate pair; a character that does not fit is omitted entirely. For grapheme-cluster counting and slicing, provide matching `word-length` and `word-slice` functions; custom slicing remains application-controlled.

```demo
../example/demos/en-US/demo-1.vue
```

## Appearance and states

### Hint

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ---------------------------------------- | ---------------- |
| `rows` | Native visible row count | Hint, Sizes, States |
| `placeholder` | Placeholder text | Hint, Sizes |
| `hint` | Floating hint; inherits Group/library default | Hint |
| `size` | `xs \\ | sm \\ | md \\ | lg \\ | xl` | Size |
| `variant` | `filled \\ | outline \\ | standard` | Size |
| `readonly` | Whether readonly | States |

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

| Configuration | Purpose | Related examples |
| ----------------- | ---------------------------------------- | ---------------- |
| `clearable` | Enables the clear action | Length and resize |
| `max-length` | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | Length and resize |
| `show-word-limit` | Show the character counter | Length and resize |
| `placeholder` | Placeholder text | Length and resize |
| `resize` | Allows vertical manual resizing | Length and resize |
| `rows` | Native visible row count | Length and resize |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/demo-5.vue
```

`max-length` accepts a finite nonnegative number or `{ length, errorOnly? }`; `0` means unlimited. Object `length` follows the same numeric constraint and `errorOnly` is an optional boolean. Invalid values use Vue prop-validation diagnostics and fall back to no limit; null is treated as unset. Default slicing counts UTF-16 code units. Supply `word-length / word-slice` together for custom counting and slicing.

## Interaction and control

### Interaction states

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | --------------------------------- | -------------- |
| `disabled` | Whether disabled | Interaction states |
| `readonly` | Whether readonly | Interaction states |
| `error` | Show the error state | Interaction states |
| `hint` | Floating hint; inherits Group/library default | Body and event contract |
| `clearable` | Enables the clear action | Body and event contract |
| `placeholder` | Placeholder text | Body and event contract |

<!-- demo-config-notes:end -->


Use this example for notes and multi-line descriptions. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### Auto Size

Auto sizing converts the measured box to the actual CSS box model, counting padding and the top/bottom borders once. Explicit `minRows / maxRows` override the theme minimum; excess content scrolls within the row cap. Turning auto size off restores native height and the platform resize default. Compare both box models, fill six lines, and switch the cap.

```demo
../example/demos/auto-size.vue
```

### Body and event contract

Input notifies input → update:modelValue. Clearing notifies clear → input → update:modelValue → change once each, with one corresponding Form notification. Clearing is blocked while readonly, disabled or composing. Rejected controlled proposals restore the native content, including input types without cursor APIs.

```demo
../example/demos/en-US/body-contract.vue
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Value model and interaction

### Dynamic empty values

Changing empty-value (including its factory) affects the next clear operation. Changing empty-values reformats the existing model without emitting a model update. Direct clear publishes immediately; deferred clear remains a draft until confirmation.

```demo
../example/demos/empty-policy.vue
```

## Composition input

IME composition preserves the native text being entered; external model updates do not replace it before composition completes. Existing formatting and controlled-owner acceptance apply after completion. Queued restoration from an earlier input cannot replace the text or caret of a later edit or composition. Length limits and modifiers retain their existing post-composition input/commit timing.

## Usage notes

### Sizing and native methods

size supports five FieldDecorator densities: xs/sm/md/lg/xl. rows, auto-size and Textarea tokens still control textarea height/text metrics. Cedar allows manual resize by default; Maple does not. InputGroup/Form state is inherited, with explicit child values taking precedence. Exposes focus(options?), blur(), select() and textareaRef.

`TextareaProps`、`TextareaVariant`、`TextareaMaxLength`、`TextareaAutoSize`、`TextareaEmits`、`TextareaSlots`、`TextareaExpose`、`TextareaInstance`。

Native methods: `focus(options?: FocusOptions)`, `blur()`, `select()`; `textareaRef` is the native element.

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

FormItem validates the candidate first and keeps editing open on failure; before-commit approval runs after validation succeeds. See the property section above for approval parameters and completion rules.

`open / default-open / update:open / open-change` control and report editor visibility; `#read="{ value, text }"` customizes reading content. See Form for composed examples.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`--mp-field-caret-color` defaults to `currentColor` and sets shared caret color. `--mp-textarea-caret-color` overrides this component, default `var(--mp-field-caret-color)`.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Textarea Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| empty-value | Clear output; omission clears to an empty string and manual deletion is unchanged | `string \| null \| (() => string \| null)` | `undefined` |
| model-value | Controlled value | `string \| null` | `-` |
| model-modifiers | `v-model` modifiers; supports `trim` | `object` | `{}` |
| default-value | Uncontrolled initial value; read only at creation, never written into the parent | `string` | `''` |
| placeholder | Placeholder or floating hint text | `string` | `-` |
| disabled | Whether disabled | `boolean` | `false` |
| readonly | Whether readonly | `boolean` | `false` |
| variant | `filled`, `outline`, or `standard` | `string` | `outline` |
| size | `xs`, `sm`, `md`, `lg`, or `xl` | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| error | Show the error state | `boolean` | `false` |
| max-length | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | `number \| object` | `0` |
| show-word-limit | Show the character counter | `boolean` | `false` |
| clearable | Show a persistent clear icon while editable and nonempty | `boolean` | `false` |
| word-length | Custom length calculator | `function` | `-` |
| word-slice | Custom truncation function | `function` | `-` |
| aria-label | Accessible label | `string` | `-` |
| autofocus | Focus automatically after mount | `boolean` | `false` |
| enterkeyhint | Mobile enter-key hint | `string` | `-` |
| hint | Use the placeholder as a floating hint | `boolean` | `true` |
| line | Show the border or bottom separator | `boolean` | `true` |
| text-color | Text color | `string` | `-` |
| focus-color | Focus color | `string` | `-` |
| blur-color | Blur color | `string` | `-` |
| rows | Positive integer native rows, including numeric strings; invalid values diagnose and restore native default rows. Theme constraints still affect visual height | `string \| number` | Native default `2` |
| resize | Allow vertical resizing; ignored while a valid automatic-height policy is active | `boolean` | `false` |
| auto-size | Automatic height; row budgets must be positive and finite, with minRows no greater than maxRows. Invalid configurations diagnose and disable measurement | `boolean \| { minRows?: number; maxRows?: number }` | `false` |
| textarea-attrs | Additional native textarea attributes; cannot override controlled value, state, rows, length policy, or component events | `Record<string, unknown>` | `undefined` |
| edit-mode | Editor mode; inherits FormItem/Form | `direct / popup` | `undefined` |
| read-pretty | Reading presentation; inherits FormItem/Form | `boolean` | `undefined` |
| empty-values | Empty-value recognition set; an explicit value replaces the inherited set | `readonly unknown[]` | Inherited component-family policy |
| empty-text | Empty reading text; inherits FormItem/Form | `string` | `'-'` |
| before-commit | Deferred save approval: (payload, done, context) | `BeforeFieldCommit` | `undefined` |
| open | Controlled editor visibility in deferred modes | `boolean` | `undefined` |
| default-open | Uncontrolled initial editor visibility; creation-only | `boolean` | `false` |
| popup-container | Deferred editor portal target; false renders in place | `PopupContainer` | `undefined` |
| loading | Manual loading presentation; remains editable | `boolean` | `false` |
| loading-mode | Indicator layout | `default / line` | `default` |

`rows` accepts a positive integer or a numeric string convertible to one. Invalid values use Vue prop-validation diagnostics and restore native default `rows`. `auto-size` minRows/maxRows accept positive finite line-height multiples, including fractions; minRows must not exceed maxRows. Invalid objects disable automatic measurement and clear its previous calculated styles. Null is treated as unset.

`before-commit(payload, done, context)` approves saving. Payload contains `{ value, previousValue }`; context provides `signal`. Synchronous void waits for done; true, done(), or fulfilled `Promise<void>` allows saving. False, done(false), `Promise<false>`, throwing, or rejection cancels. Ordinary events only notify and do not await Promises; the DOM source of `change` may be absent.

### Textarea Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:modelValue | Model update proposal during input, clearing, or confirmed saving | `value: string \| null` |
| update:open | Editor visibility request | `open: boolean` |
| open-change | Editor visibility change notification | `open: boolean` |
| input | Length-normalized user input, emitted after composition completes | `value: string, event: Event` |
| change | Commit on blur, clear, or deferred saving; the source event is optional | `value: string \| null, event?: Event` |
| keydown | Native keyboard notification; Enter keeps its newline behavior in direct mode | `event: KeyboardEvent` |
| clear | Clear request, followed by input, model update, and change notifications | `event: Event` |
| focus | Native editor receives focus | `event: FocusEvent` |
| blur | Native editor loses focus | `event: FocusEvent` |

### Textarea Slots

| Slot | Description | Prop |
| --- | --- | --- |
| read | Reading content with the raw value and formatted text | `{ value: string \| null; text: string }` |
| prefix | Prefix content | `-` |
| suffix | Suffix content | `-` |
| clear-icon | Clear icon or button | `{ clear(event?: Event): void }` |

### Textarea Methods

| Method | Description | Arguments |
| --- | --- | --- |
| focus | Focus the mounted editor | `focus(options?: FocusOptions): void` |
| blur | Blur the mounted editor | `blur(): void` |
| select | Select all text in the mounted editor | `select(): void` |
| textareaRef | Reference to the mounted native textarea | `HTMLTextAreaElement \| undefined` |

## Types

```ts
import type {
  TextareaEmits,
  TextareaSlots,
  TextareaExpose,
  TextareaInstance,
  TextareaAutoSize,
  TextareaMaxLength,
  TextareaProps,
  TextareaVariant,
  WordLength,
  WordSlice,
} from '@maple-design/ui-vue'
```

## Configuring the cleared value

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

Deferred `change` preserves the real confirmation event when available (for example, the save button). Programmatic editor handoff has no DOM event, so its second argument is optional. The event target can be the confirmation control rather than the input. `change` is a notification: its returned Promise is not awaited; use `before-commit` to approve asynchronous saves.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-textarea-caret-color` | `var(--mp-field-caret-color)` | `caret-color` |
| `--mp-textarea-counter-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-textarea-counter-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-textarea-counter-margin-top` | `var(--mp-sys-space-2)` | `margin-block-start` |
| `--mp-textarea-font-size` | `16px` | `font-size` |
| `--mp-textarea-height` | `auto` | `height` |
| `--mp-textarea-line-height` | `1.5` | `line-height` |
| `--mp-textarea-min-height` | `96px` | `min-height` |
| `--mp-textarea-padding-horizontal` | `0px` | `padding`, `padding-inline-end` |
| `--mp-textarea-padding-vertical` | `var(--mp-field-content-padding-vertical)` | `padding` |
| `--mp-textarea-placeholder-color` | `var(--mp-sys-color-content-secondary)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-textarea-caret-color: var(--mp-field-caret-color);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
