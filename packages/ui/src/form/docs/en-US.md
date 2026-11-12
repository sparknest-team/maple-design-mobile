# Form

## Field names

For a deferred Slider inside Shadow DOM, a popup teleported to `body` may not resolve ID references to hints or errors inside the shadow root. Set `:popup-container="false"` to keep the popup in the same root, and provide clear control names.

In direct edit mode, for a visible label on a single field, match FormItem `label-attrs.for` to the control `id`. The native inputs in selection, date and time fields do not let their placeholder override an associated label. An explicit `aria-label` or `aria-labelledby` retains its native accessible-name precedence. Placeholder is only a fallback when no label is supplied; provide clear labels. Date and time range fields in FormItem associate the form label with their group; use `input-attrs` to give the endpoints distinct names. If `label-attrs.for` targets another control, the label is not associated with the range group. Without `for`, the range currently references the nearest FormItem label even when that item contains other controls. For mixed fields, put the range in a separate styled FormItem with its own name, or explicitly target the intended control with `for` and name the other controls separately. When `for` matches a single-value Slider’s `id`, its thumb and optional numeric input use the label; clicking the default native label focuses the enabled thumb; preventing the label click default cancels that focus. When `for` matches a range Slider’s `id`, the form label names the group; use an `aria-label` array to name the endpoints separately. The `tooltip` button is independently focusable and its name is not added to the field label.

### Multiple controls under one label

For mixed controls, give the visible label a unique ID and explicitly name a group with it. Give each control its own name as well. Use a unique ID for each FormItem instance.

```demo
../example/demos/mixed-field-label.vue
```

## Reading direction

Form and FormItem accept start/end/left/center/right for content-align and start/end/left/right for label-align. Content defaults to start and labels to end: default LTR placement stays the same while RTL follows reading order. Explicit left/right remain physical. Item overrides and explicit label-column styles retain precedence. Direction changes preserve values, validation and disabled/readonly state.

## Basic examples

### Basic Form

```demo
../example/demos/en-US/example.vue
```

## Form appearance and layout

### Layout switching and item overrides

`edit-mode` describes editing behavior: `direct` always shows the control; `popup` opens the mobile editor. `readPretty` is an independent boolean. FormItem and fields inherit the mode when omitted. 

Combine `vertical`, `horizontal` and `inline` layouts with `direct / popup` editing and the independent `readPretty` boolean to compare label, control, value and wrapped-text alignment while retaining the same data. Notes can override the layout or inherit it. In `popup`, click a value to edit and confirm to save; `readPretty` uses `read-pretty` to display plain text.

`content-align` switches values between left, center and right in every field mode. FormItem inherits Form unless overridden. It positions compact controls and aligns field values; label alignment and help/error text stay independent. A field's explicit `text-align` overrides the inherited alignment.

```demo
../example/demos/en-US/layout-comparison.vue
```

### Label and content decoration

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | Layout switching and item overrides, Label and content decoration, Label width strategies |
| `layout` | Form-item layout: `vertical`/`horizontal`/`inline`; overridable by `FormItem.layout` | Layout switching and item overrides, Label and content decoration, Label width strategies |
| `label-align` | Label alignment | Label width strategies |
| `auto-label-width` | Align eligible horizontal labels to their maximum natural width | Label width strategies |
| `label-col-flex` | Label flex; unit strings set width, numbers are grow ratios | Label width strategies |
| `label-col-props` | Horizontal label Col options, including breakpoints | Label width strategies |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/decoration.vue
```

### Label width strategies

Enter values, then switch between measured labels, responsive columns and fixed widths: all three strategies retain the same form model. Edit the longest label or hide the contact field to observe remeasurement. Below 576px, the responsive strategy stacks labels above controls; fixed widths use 6rem with an 8rem contact-field override.

<details>
<summary>Configuration details and limits</summary>

#### Responsive label columns

Horizontal layouts default to 5/24 label and 19/24 control columns. Cedar defaults to horizontal; Maple defaults to vertical. Only horizontal uses column proportions and auto width. Responsive options use viewport breakpoints. FormItem overrides Form; Col/style objects replace inherited objects. label-col-flex overrides auto-label-width: unit strings set width, numbers are Col grow ratios, not pixels. The control fills the remainder. Hidden labels leave full-width controls. Automatic width updates on label changes/removal and stays isolated per form. Use vertical or a fixed width for long labels on narrow screens.

</details>

```demo
../example/demos/en-US/label-width-comparison.vue
```

## Fields and data model

### Text and numeric fields

```demo
../example/demos/field-components.vue
```

### Boolean and choice fields

```demo
../example/demos/field-choice.vue
```

### Selection fields

```demo
../example/demos/field-selection.vue
```

### Direct / popup selection summaries

```demo
../example/demos/selection-summary.vue
```

### Hierarchical fields

```demo
../example/demos/field-tree.vue
```

### Date fields

```demo
../example/demos/field-date.vue
```

### Time fields

```demo
../example/demos/field-time.vue
```

### Progress and rating fields

```demo
../example/demos/field-rating.vue
```

### Attachment fields

```demo
../example/demos/field-upload.vue
```

## Validation and submission

### Cross-field validation and native submit

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ---------- | -------------------------------------------------------- | ------------------------------------------ |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | Cross-field validation and native submit, Validate on clear, Form Controller |
| `disabled` | Whether disabled | Form Controller |
| `readonly` | Whether readonly | Form Controller |

<!-- demo-config-notes:end -->


When not paused, confirmation immediately compares the current source code. Change the source after a successful match, then validate only confirmation or submit again to observe the dependency error; correct confirmation and submit with Enter or the submit button. Native reset clears model values, feedback and the displayed last-submission value, while the submission count remains cumulative. Dependencies are revalidated explicitly: editing alone does not guarantee that an existing success is current. This local example is not exhaustive asynchronous submit-race coverage or external persistence.

```demo
../example/demos/en-US/cross-field.vue
```

Pause cross-field validation holds the confirmation rule until Resolve cross-field result. Completion compares that confirmation value with the current source, not a remote service or a source snapshot from submission start. Changing the source while waiting invalidates the native submission. The old field validation can still return a dependency error, but submission counts remain unchanged; correct confirmation and submit again. Native reset settles local tasks, clears values and the submitted snapshot, retains the history count and prevents late submission. Suspension/disposal also clean pending tasks. Cyclic dependencies and arbitrary request ordering remain unverified.

### Validate on clear

`validate-trigger="clear"` validates only when the user clicks a control's clear button, not while typing. Typing again does not automatically clear the error; validate explicitly or reset the form.

```demo
../example/demos/en-US/clear-trigger.vue
```

### Form Controller

Use the Form instance to reset fields, clear validation, validate, and toggle disabled or readonly state.

```demo
../example/demos/en-US/controller.vue
```

### Form Events

Use Button's `html-type="submit"` / `html-type="reset"` to trigger native form events. The demo displays validation results and current model values; reset restores the initial values and clears errors.

```demo
../example/demos/en-US/events.vue
```

## Field presentation and interaction

### Field presentation and confirmed commits

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| -------- | -------------------------------------------------------------------------------------- | -------------------------------- |
| `layout` | Form-item layout: `vertical`/`horizontal`/`inline`; overridable by `FormItem.layout` | Field presentation and confirmed commits, Presentation status |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | Field presentation and confirmed commits |

<!-- demo-config-notes:end -->


Form, FormItem, Input and Select inherit presentation from field > FormItem > Form. When omitted, each field retains its own default. Maple supports direct / popup. Selection fields commit single choices immediately by default and multiple choices on confirmation; other fields retain their own confirmation behavior; readPretty displays reading content only. Ordinary v-model/default slots remain. Select, Cascader, AutoComplete, Date/DateRange and Time/TimeRange default to popup; other fields default to direct.

`edit-mode` only controls field editing and preserves `layout`, label widths and grid proportions. In non-vertical layouts, labels are vertically centered against the field content; errors and help text do not affect alignment.

<demo src="../example/demos/field-presentation.vue" />

### edit-mode inheritance

Form supports direct / popup. Omission preserves field-specific defaults; explicit Form settings inherit into FormItem/fields, with explicit child values overriding. read is reading presentation, separate from readonly/disabled. Submitting with unfinished confirmation editing fails and preserves the draft; reset cancels editing. Existing default slots/v-model remain; no editor slot is needed.

### Presentation status

Explicit validate-status overrides automatic presentation without changing validation results. Only error shows errors; other statuses show help. Automatic validation goes validating → success/error; clearValidate restores the unvalidated state. A message-only setFields sets error; empty status/message clears it.

```demo
../example/demos/en-US/presentation-status.vue
```

### Standalone panel actions

```demo
../example/demos/field-panel-actions.vue
```

### Confirmation event source

```demo
../example/demos/change-source.vue
```

## Dynamic and async fields

### Independent async fields

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ---------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | Independent async fields, Disabled, readonly and asynchronous confirmation, Async validation response order |
| `disabled` | Whether disabled | Disabled, readonly and asynchronous confirmation, Async validation response order |
| `readonly` | Whether readonly | Disabled, readonly and asynchronous confirmation, Async validation response order |
| `rules` | Validation rules keyed by field name | Disabled, readonly and asynchronous confirmation |

<!-- demo-config-notes:end -->


State-command addendum: public `clearValidate()` and `setFields()` also invalidate a pending native submission, including field-scoped calls. Old completion cannot append submit events after a clear or explicit error; a fresh native submission still validates normally. Editing model values or changing rules while waiting also invalidates the pending submission. The Demo keeps old tasks available for manual settlement; this does not cancel real requests.

Explicit validate() or validateField() invalidates a pending older native submit. The imperative result is independent: an older submit must not later combine stale errors or success with the current model. A fresh native submit still waits for its own fields and notifies once. This is logical invalidation, not request cancellation, and retains submission history. Method signatures are unchanged; stale mixed notifications are not retained for compatibility. Changing model values or validation rules while waiting also invalidates that submission; submit again to validate the new inputs.

Resolve newest username/code settle the latest task for that field, letting a newer submit finish before older results return. An old failure cannot append a submission or restore errors after new success; old success cannot append a submission or clear new errors after new failure. Both newest field results are still required. The original resolve buttons continue to settle the oldest task.

Native submit uses latest-submission-wins: starting another submit invalidates the older submit/submit-success/submit-failed continuation. Submit guest/bad, change to admin/1234, and submit again. Resolving the two old results must leave Native submissions at 0 while the new submission waits for both of its own fields. The inverse old-valid/new-invalid combination must not report early success. This does not cancel a real request or define snapshots for edits without resubmission.

Calling resetFields, including a native reset, while native submit is pending invalidates that submission. Settling its old promises must not emit submit, submit-success, or submit-failed. Suspension and disposal also invalidate pending submissions; a fresh submission still validates normally. This is logical invalidation, not remote request cancellation, and does not define concurrent-submit or async cross-field dependency behavior.

Submit async form is a native submit button inside the form; Enter on the focused button also submits. Its separate Native submissions count increases only after both local async fields settle. An early invalid username result does not submit; resolving code then records failure. Correct the name to admin, retry, and resolve code before username to record success and clear errors. The lower Result describes imperative validation only. Reset after completion clears fields but retains submission history. Sequential retry does not demonstrate concurrent submits or async cross-field dependencies.

Reset after the name result has returned while the code result is still pending, then immediately enter new values and validate again. Resolving the oldest code task only settles the old run: it must neither restore old errors nor finish the new whole-form run. Resolve both new tasks to finish. Check old-failure/new-success and old-success/new-failure combinations; the Demo separately guards its result text and does not cancel a real request.

Both field rules return independent local promises. Resolve either field first: its feedback can update, but whole-form validation stays pending until both finish. Reset invalidates old feedback and the Demo result; pending tasks remain available to settle manually. This is an imperative validate() example, not native submit-event concurrency or a cross-field dependency.

Start validation with old values, change both values, then select “Validate both fields” again. Each resolve button settles that field's oldest task. Completing the old whole-form run must leave the latest run pending until both of its own fields finish; old success or failure must not overwrite current field feedback. The Demo separately guards its result text with a run number. Form does not cancel old requests automatically, and this is not a native submit-concurrency protocol.

```demo
../example/demos/en-US/async-fields.vue
```

### Intro

Provides the ability to control all form components. Use with `FormItem`.

- With `FormItem.label`: outer label (vertical / horizontal); floating placeholder on Input / Select is turned off automatically.
- Without `FormItem.label`: controls keep floating placeholder (`placeholder` + `hint`).

### Disabled, readonly and asynchronous confirmation



```demo
../example/demos/presentation-state.vue
```

### Async validation response order

This local Promise rule only accepts admin and never accesses the network. Automatic validation triggers are disabled. Validate guest, then admin; resolve the newest result before the oldest to check that an old error does not overwrite the latest field state. The Demo protects its result text with a request sequence; the validated value is a snapshot, not a server submission.

Clear validation or reset while requests are pending, then resolve old results. Unmounting or deactivating settles local requests. Real applications should cancel requests and protect submission snapshots and versions.

Toggle disabled or readonly while waiting: these restrict control interaction, but do not automatically cancel pending validation or clear errors. The external validation controls are outside the disabled Form. Clear validation or reset explicitly to invalidate old results; remove restrictions to edit and validate again.

Turn off Mount async field to remove the field while retaining its model and pending tasks. Remount it, validate again, and resolve results in either order to check that an old instance cannot overwrite the new field's errors. This does not delete business data or define a concurrent whole-form submission protocol.

While validation is pending, Set server error writes an explicit error with `setFields`. Earlier async success or failure must not overwrite it. The Demo retains old tasks for manual completion and separately versions its status text. Clear validation removes the error; a newly started validation can then replace it with its own result. This does not cancel a real network request.

Validate whole form calls `validate()`, while Validate field calls `validateField('name')`. Interleave these operations and resolve old/new promises in either order to observe field feedback and the latest Demo result. Reset invalidates pending results without canceling a real service. This single-field example does not demonstrate multi-field aggregation, cross-field dependencies, or native submit-event concurrency.

```demo
../example/demos/en-US/async-race.vue
```

### Cross-page range boundaries

Compare date, month and year ranges with 2027-01-01, 2026-12 and 2100 disabled. Disabled values cannot be endpoints, but a range may span them; navigate across pages to observe their disabled appearance.

```demo
../example/demos/field-range-boundaries.vue
```

### Async submit input ownership

A native submission owns the reactive model and validation definitions it starts with. Changing model fields (including other fields and change-then-restore), replacing model/rules, changing FormItem rules/required/field, or adding/removing registered fields invalidates a waiting submission. Its eventual success or error does not emit submit, submit-success or submit-failed and does not trigger automatic error scrolling. Submit again to validate the latest inputs. This is logical invalidation, not request cancellation or automatic resubmission, and does not change imperative validation return contracts. Completed submission history is retained. Use reactive state so Vue can observe input changes. Ordinary event listener Promises are not collected.

```demo
../example/demos/submit-inputs.vue
```

### Dynamic field identity and reset

A reused FormItem automatically unregisters the old field and registers the new nonempty field. Clearing field unregisters it. Each field path retains its first available initial value within that item instance; revisiting a field does not replace its initial value with current edits. Reset clones that field baseline, including 0, false, null and missing/undefined values. Identity changes cancel its editor and invalidate old feedback and field-set callbacks. Already-started imperative validation promises still settle independently; callers own their result text.

An existing model object with a missing property captures undefined. Model/rule replacement does not rebase an already-captured initial value. For async initial data, bind the field or render the item when that data is ready. Recreating the item starts fresh initial baselines.

```demo
../example/demos/field-identity.vue
```

## FormItem

### Introduction

FormItem renders labels, validation rules and errors. Use it with `Form` and form controls.

- Providing `label` renders an external `label` and automatically disables floating Input/Select hints.
- Without `label`, no external `label` is rendered and controls retain floating placeholders.

### External labels

Provide `label` for external labels and use `layout="vertical"` for vertical arrangement.

```demo
../example/demos/en-US/vertical-label.vue
```

### Horizontal layout

Use `layout="horizontal"` for labels/controls side by side; individual `FormItem` layouts can override it.

```demo
../example/demos/en-US/horizontal-layout.vue
```

### Floating placeholders without label

Without `label`, no external `label` is rendered and Input retains its floating placeholder.

```demo
../example/demos/en-US/floating-placeholder.vue
```

### Help and extra content

`help` displays `help`; `extra` displays additional information.

```demo
../example/demos/en-US/help-extra.vue
```

### Custom form controls

Use `FormItem.useFormItem` or `Form.useFormItem` for error state/validation triggers.

Call `useFormErrorDescription()` in `setup` and bind `describe(existingIds)` to the interactive element's `aria-describedby`. Existing descriptions are preserved, and the FormItem error ID follows the visible error. Outside FormItem, only the existing descriptions are retained.

The example uses a native button for Enter/Space and checkbox semantics. `mergedDisabled`/`mergedReadonly` inherit Form/FormItem state. Omitted booleans remain `undefined` to avoid overriding parents. After toggling, notify `eventHandlers.onChange` and forward focus events to Form.

```demo
../example/demos/en-US/custom-control.vue
```

### Interactive state controls

Demonstrates whole-form state inheritance. Toggle disabled/readonly with the same data. Controls remain enabled so editing can be restored. Error appearance alone does not validate Form.

```demo
../example/demos/state-lab.vue
```

### Matching desktop/mobile scenarios

Click department/date/time to open Popup. Edit/cancel, then edit/confirm and compare the committed model below.

```demo
../example/demos/platform-presentation.vue
```

### Complete inspection-task workflow

Fill, validate, confirm, simulate failure and retry. Returning to edit preserves submitted records.

```demo
../example/demos/task-workflow.vue
```

### Empty markers and required validation

The API uses -1 for no selection. Validate initially shows a required error; selecting a department makes validation pass. Clearing restores -1 and validation fails again. Form supplies the recognition list, while each field specifies its clear output. Custom validators still receive the original value.

```demo
../example/demos/en-US/empty-values-validation.vue
```

### Reading placeholders and configuration inheritance

Initially in reading mode, name inherits Form's default dash, code uses FormItem's Unassigned text, nickname uses the field's Anonymous text, and numeric zero stays visible. Changing placeholders affects only inheriting fields. Switching reading/editing does not change the model. Priority is field > FormItem > Form; a custom read slot takes precedence.

```demo
../example/demos/en-US/empty-text.vue
```

## Usage notes

### Validation results and errors

A function rule returns true to pass, or an error string/false for business validation failure. Unexpected throws or Promise rejection still reject public `validate()`, and callers must handle that exception. The current task releases validating without synthesizing a business error; existing business error messages remain. An older task's exception cannot clear a newer task's wait.

## API

Use edit-mode for editing presentation and read-pretty for reading state. The internal descriptor fieldEditModeProp is not a public Form or FormItem prop.

### Empty values and reading placeholders

Form / FormItem provide empty recognition through `empty-values`; each field defines clear output with its own `empty-value`. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Form Props

| Prop | Description | Type | Default |
| -------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------- |
| `id` | Native form id; an explicit value prefixes normalized field container ids | _string_ | `-` |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | _Record<string, any>_ | `-` |
| `layout` | Form-item layout: `vertical`/`horizontal`/`inline`; overridable by `FormItem.layout` | _'vertical' \| 'horizontal' \| 'inline'_ | `'vertical'` |
| `label-align` | Label alignment | _'start' \| 'end' \| 'left' \| 'right'_ | `'end'` |
| `content-align` | Content alignment shared by direct fields, editor triggers and readPretty output; independent of label-align | `'start' \| 'end' \| 'left' \| 'center' \| 'right'` | `'start'` |
| `read-pretty` | Independent reading toggle. When true, displays the saved value; when false, restores the current edit-mode. FormItem inherits Form when unset | `boolean` | `-` |
| `edit-mode` | Shared editing mode for form fields; when unset, preserves each field default | `'direct' \| 'popup'` | `-` |
| `label-col-props` | Horizontal label Col options, including breakpoints | _FormColProps_ | `{ span: 5, offset: 0 }` |
| `wrapper-col-props` | Horizontal control Col options | _FormColProps_ | `{ span: 19, offset: 0 }` |
| `label-col-style` | Per-instance label column style | _CSSProperties_ | `-` |
| `wrapper-col-style` | Per-instance control column style | _CSSProperties_ | `-` |
| `label-col-flex` | Label flex; unit strings set width, numbers are grow ratios | _number \| string_ | `-` |
| `auto-label-width` | Align eligible horizontal labels to their maximum natural width | _boolean_ | `false` |
| `size` | Form-control size inherited by FormItem/controls | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `rules` | Validation rules keyed by field name | `FormRules` | `-` |
| `readonly` | Whether readonly | _boolean_ | `-` |
| `disabled` | Whether disabled | _boolean_ | `-` |
| `scroll-to-error` | After failed validation, scroll to the first (`start`) or last (`end`) invalid field in document order; these values do not specify viewport alignment | _'start' \| 'end'_ | `-` |
| `scroll-to-error-offset-y` | Scroll to the position offset of the form item that fails validation | _number \| string_ | `0` |

### Form Methods

| Method | Description | Arguments | Returns |
| --------------- | --------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| `validate` | Trigger Form validation | `callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `validateField` | Validate the given form item(s) | `field: string \| string[]`、`callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `resetFields` | Reset the value and validation message of the form item(s) to their initial value, resets all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `clearValidate` | Clear `field` validation messages; omit `field` to clear all items | `field?: string \| string[]` | `-` |
| `setFields` | Set field values or error states in batches | `Record<string, { value?; status?; message? }>` | `-` |
| `scrollToField` | Scroll to the given form item | `field: string` | `-` |

### Form Events

| Event | Description | Arguments |
| ---------------- | -------------- | ------------------------------------------ |
| `submit` | Triggered when the form is submitted | `data: { values; errors }`、`event: Event` |
| `submit-success` | Triggered after successful validation | `values`、`event: Event` |
| `submit-failed` | Triggered after failed validation | `data: { values; errors }`、`event: Event` |
| `reset` | Fired when the form is reset | `event: Event` |

### Form Slots

| Slot | Description | Prop |
| --------- | -------- | ---- |
| `default` | Form content | `-` |

### FormItem Props

| Prop | Description | Type | Default |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------- |
| `field` | Field path in `Form.model`, supports `a.b` | _string_ | `''` |
| `label` | Label text; a nonempty label renders externally and disables the control's floating hint | _string_ | `-` |
| `tooltip` | Label hint (hover, keyboard focus or touch click) | _string_ | `-` |
| `show-colon` | Append a colon to the label | _boolean_ | `false` |
| `label-component` | Native label element name | _string_ | `'label'` |
| `label-attrs` | Native label attributes; for targets the control's actual id | _HTMLAttributes & Record<string, unknown>_ | `-` |
| `content-class` | Content container class | _string \| array \| object_ | `-` |
| `content-flex` | Enable flex layout; disable for custom Grid | _boolean_ | `true` |
| `layout` | Layout: `vertical`/`horizontal`/`inline`; inherits `Form.layout` when omitted | _'vertical' \| 'horizontal' \| 'inline'_ | `-` |
| `label-align` | Label alignment | _'start' \| 'end' \| 'left' \| 'right'_ | `-` |
| `content-align` | Content alignment shared by direct fields, editor triggers and readPretty output; independent of label-align | `'start' \| 'end' \| 'left' \| 'center' \| 'right'` | `-` (inherits Form) |
| `read-pretty` | Independent reading toggle. When true, displays the saved value; when false, restores the current edit-mode. FormItem inherits Form when unset | `boolean` | `-` |
| `edit-mode` | Editing mode; inherits Form when unset and may be overridden by individual fields | `'direct' \| 'popup'` | `-` |
| `label-col-props` | Horizontal label Col options, including breakpoints | _FormColProps_ | `-` |
| `wrapper-col-props` | Horizontal control Col options | _FormColProps_ | `-` |
| `label-col-style` | Per-instance label column style | _CSSProperties_ | `-` |
| `wrapper-col-style` | Per-instance control column style | _CSSProperties_ | `-` |
| `label-col-flex` | Label flex; unit strings set width, numbers are grow ratios | _number \| string_ | `-` |
| `row-props` | Form item Row options, including gutter, align, justify and wrap | _RowProps_ | `-` |
| `row-class` | Layout container class | _string \| array \| object_ | `-` |
| `required` | Required (asterisk + auto required rule) | _boolean_ | `false` |
| `hide-label` | Hide label | _boolean_ | `false` |
| `feedback` | Show input validation feedback, including pending async validation | _boolean_ | `false` |
| `validate-status` | Explicit feedback state; otherwise derived from validation | _'success' \| 'warning' \| 'error' \| 'validating'_ | `-` |
| `hide-asterisk` | Hide required asterisk | _boolean_ | `false` |
| `asterisk-position` | Logical start/end position of the required asterisk within the field label, default start; not the form or popup position | _'start' \| 'end'_ | `'start'` |
| `help` | Help text, displayed when no error exists | _string_ | `-` |
| `extra` | Extra text | _string_ | `-` |
| `disabled` | Disabled; inherits Form when omitted | _boolean_ | `-` |
| `readonly` | Readonly state; inherits from Form when omitted | _boolean_ | `-` |
| `size` | Control size; inherits Form when omitted | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `no-style` | Remove label/error UI, keep validation | _boolean_ | `false` |
| `rules` | Validation rules: function / Zod / array | `FormRule \| FormRule[]` | `-` |
| `validate-trigger` | Validation triggers; `clear` fires only for a control's `clear` action, not for `change` | _FormItemValidateTrigger \| FormItemValidateTrigger[]_<br>`FormItemValidateTrigger: 'input' \| 'change' \| 'focus' \| 'blur' \| 'clear'` | `'change'` |

### FormItem Events

| Event | Description | Arguments |
| ---------- | -------------- | ---------------- |
| `validate` | Emitted when validation completes | `valid: boolean` |

### FormItem Slots

| Slot | Description |
| --------- | -------------- |
| `default` | Form control |
| `label` | Custom label |
| `help` | Custom help content |
| `extra` | Custom extra content |

### FormItem Methods

| Method | Description | Arguments | Returns |
| --------------- | ---------------------------- | ---- | -------------------------------------- |
| `validate` | Trigger validation | `-` | `Promise<undefined \| ValidatedError>` |
| `clearValidate` | Clear validation state | `-` | `-` |
| `resetField` | Reset value to initial and clear validation | `-` | `-` |

## Types

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal' | 'inline'
```

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Maple rule protocol

FormRules maps field names to a FormRule or rule array. FormRule supports functions and Zod schemas rather than Cedar FieldRule objects; unsupported structures produce development prop diagnostics. Use FormItem.required for required validation and markers rather than a decorative-only rules.required object. Functions receive `(value, context)` with model and field; candidate saves validate a candidate model. Only true passes; other normal returns become error text through String. Promises are supported. Zod uses safeParseAsync and the first issue message.

Unexpected throws or Promise rejection reject public validate for try/catch handling. The current task releases validating and retains its previous business error, without a business-failure notification. Stale exceptions do not clear newer pending feedback. FormItem validate only notifies the latest normal boolean result. Form.useValidation, Form.useForm, Form.useFormItem and FormItem.useFormItem retain their composition roles.

```ts
import type { FormRule, FormRules, FormRuleContext } from '@maple-design/ui-vue'
const nameRule: FormRule<string> = async (value, context) => {
  await Promise.resolve()
  return value.length > 0 || `${context.field} is required`
}
const rules: FormRules = { name: nameRule }
```

### Public validation and notification contract

Form and FormItem default slots have no scoped arguments. FormItem also provides label, help and extra slots without model helpers. Form manages state through the model object and field paths.

`validate(callback?)` and `validateField(fields, callback?)` await their rules, returning undefined on success or an error record by field on business failure. Callbacks only notify for a current task. Errors contain field, message, label, value, type and isRequiredError. The value remains the original field value.

submit-success precedes submit; business failure sends submit-failed before submit. An unfinished editing session sends only submit-failed. Its errors.editing contains only field="editing" and message, without fabricated field-validation data. FormSubmitError distinguishes this notice from a full ValidatedError.

These events notify only: listener Promises are not awaited and do not execute requests or control loading. Business code manages asynchronous-save loading. Native reset prevents default behavior, resets fields and then notifies reset. Form resetFields writes to model; an inner Form inside FilterForm has its own scope.

`beforeCommit` belongs to fields supporting editing transactions. Its signature is `(payload, done, context) => void | boolean | Promise<void | boolean>`. The payload contains value and previousValue; context contains signal and an optional event. Returning undefined waits for done; a boolean or Promise settles by its result. It is not a Form submit event or general loading entry point.

```ts
import type {
  FormProps, FormItemProps, FormInstance, FormItemInstance,
  ValidatedError, FormValidateErrors, FieldData,
  FormEmits, FormSlots, FormItemSlots, FormSubmitError,
  BeforeFieldCommit,
} from '@maple-design/ui-vue'
```

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-form-extra-margin-top` | `6px` | `margin-top` |
| `--mp-form-extra-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-form-extra-text-font-size` | `12px` | `font-size` |
| `--mp-form-help-line-height` | `1.4` | `line-height` |
| `--mp-form-item-asterisk-margin` | `4px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-form-item-label-gap` | `12px` | `margin-inline-end`, `padding-inline-end` |
| `--mp-form-item-label-width` | `88px` | `flex`, `width` |
| `--mp-form-label-line-height` | `1.4` | `line-height` |
| `--mp-form-label-min-height` | `24px` | `min-height` |
| `--mp-form-label-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-form-required-symbol-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-form-size-md-item-margin-bottom` | `16px` | `margin-bottom` |
| `--mp-form-size-md-label-font-size` | `14px` | `font-size` |
| `--mp-form-tooltip-margin-left` | `var(--mp-sys-space-2)` | `padding-inline-start` |
| `--mp-form-tooltip-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-form-vertical-label-margin-bottom` | `8px` | `margin-bottom` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-form-extra-text-color: var(--mp-sys-color-content-secondary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
