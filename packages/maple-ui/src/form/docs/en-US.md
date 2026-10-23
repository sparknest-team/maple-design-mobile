# Form

Final batch verification:Form115tests/19files within the combined Maple532tests/95files pass;root read-only lint,types and shared29tests pass. Runtime-candidate classification33/33families is not whole-component/native acceptance;latest evidence below retains diagnostics/boundaries.

## Examples

### Basic Form

```demo
../example/demos/en-US/example.vue
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

### Validate on clear

`validate-trigger="clear"` validates only when the user clicks a control's clear button, not while typing. Typing again does not automatically clear the error; validate explicitly or reset the form.

```demo
../example/demos/en-US/clear-trigger.vue
```

### Responsive label columns

Horizontal layouts default to 5/24 label and 19/24 control columns. Cedar defaults to horizontal; Maple defaults to vertical. Only horizontal uses column proportions and auto width. Responsive options use viewport breakpoints. FormItem overrides Form; Col/style objects replace inherited objects. label-col-flex overrides auto-label-width: unit strings set width, numbers are Col grow ratios, not pixels. The control fills the remainder. Hidden labels leave full-width controls. Automatic width updates on label changes/removal and stays isolated per form. Use vertical or a fixed width for long labels on narrow screens.

```demo
../example/demos/en-US/label-columns.vue
```

### Fixed label width

```demo
../example/demos/en-US/fixed-label-width.vue
```

### Automatic label width

```demo
../example/demos/en-US/auto-label-width.vue
```

### Cross-field validation and native submit

When not paused, confirmation immediately compares the current source code. Change the source after a successful match, then validate only confirmation or submit again to observe the dependency error; correct confirmation and submit with Enter or the submit button. Native reset clears model values, feedback and the displayed last-submission value, while the submission count remains cumulative. Dependencies are revalidated explicitly: editing alone does not guarantee that an existing success is current. This local example is not exhaustive asynchronous submit-race coverage or external persistence.

```demo
../example/demos/en-US/cross-field.vue
```

Pause cross-field validation holds the confirmation rule until Resolve cross-field result. Completion compares that confirmation value with the current source, not a remote service or a source snapshot from submission start. Changing the source while waiting yields a dependency error; correcting confirmation and retrying with Enter succeeds. Native reset settles local tasks, clears values and the submitted snapshot, retains the history count and prevents late submission. Suspension/disposal also clean pending tasks. Cyclic dependencies and arbitrary request ordering remain unverified.

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

### Standalone panel actions

```demo
../example/demos/field-panel-actions.vue
```

### Label and content decoration

```demo
../example/demos/en-US/decoration.vue
```

### Disabled, readonly and asynchronous confirmation

Lint follow-up (2026-10-19): current scoped/root lint, configured types, 300 related regressions and SFC compilation pass after pre-existing formatting corrections. This run did not change business source; the 1200ms delay, cancellation signal and once-only settlement remain intact. Example compilation is not native-browser acceptance; automation remains paused.

```demo
../example/demos/presentation-state.vue
```

### Cross-page range boundaries

Compare date, month and year ranges with 2027-01-01, 2026-12 and 2100 disabled. Disabled values cannot be endpoints, but a range may span them; navigate across pages to observe their disabled appearance.

```demo
../example/demos/field-range-boundaries.vue
```

### 字段展示与确认提交

Form、FormItem、Input、Select 支持 presentation 继承：字段 > FormItem > Form。默认 inline；Maple 支持 popup。弹层默认确认后提交，readPretty 只阅读。普通 v-model 和默认插槽保持不变。搜索位置自动随展示形式切换。

<demo src="../example/demos/field-presentation.vue" />

### presentation 继承规则

Form 支持 `inline / popup`，默认 inline；FormItem 和字段未设置时继承，显式值覆盖。read 是阅读展示，与 readonly/disabled 分开。确认编辑未结束时整表提交会失败并保留草稿；reset 取消编辑。原有默认插槽与 v-model 保持不变，不需要 editor 插槽。

### Presentation status

Explicit validate-status overrides automatic presentation without changing validation results. Only error shows errors; other statuses show help. Automatic validation goes validating → success/error; clearValidate restores the unvalidated state. A message-only setFields sets error; empty status/message clears it.

```demo
../example/demos/en-US/presentation-status.vue
```

### Independent async fields

State-command addendum: public `clearValidate()` and `setFields()` also invalidate a pending native submission, including field-scoped calls. Old completion cannot append submit events after a clear or explicit error; a fresh native submission still validates normally. The earlier exclusion below now applies only to editing without revalidation. The Demo keeps old tasks available for manual settlement; this does not cancel real requests.

Explicit validate() or validateField() invalidates a pending older native submit. The imperative result is independent: an older submit must not later combine stale errors or success with the current model. A fresh native submit still waits for its own fields and notifies once. This is logical invalidation, not request cancellation, and retains submission history. Method signatures are unchanged; stale mixed notifications are not retained for compatibility. This does not define editing-only snapshot behavior.

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

## FormItem

### Intro

Form item for labels, validation rules, and error messages. Use with `Form` and form controls.

- With `label`: outer label layout; Input / Select automatically disable floating `hint`.
- Without `label`: no outer label; controls keep floating placeholder mode.

### Outer Label (aligned with Cedar)

Pass `label` to use an outer label and `layout="vertical"` to stack the label and control.

```demo
../example/demos/en-US/vertical-label.vue
```

### Horizontal Layout

Use `layout="horizontal"` to place labels beside controls. A FormItem can override the form layout.

```demo
../example/demos/en-US/horizontal-layout.vue
```

### Floating Placeholder (no label)

Without `label`, no outer label is rendered and Input keeps its floating placeholder.

```demo
../example/demos/en-US/floating-placeholder.vue
```

### Help and Extra Content

Use `help` for guidance and `extra` for supplementary information.

```demo
../example/demos/en-US/help-extra.vue
```

### Custom Form Control

Custom controls use `FormItem.useFormItem` (or `Form.useFormItem`) to participate in validation.

The demo uses a native button with checkbox semantics and Enter/Space activation. Read `mergedDisabled` / `mergedReadonly` to inherit Form and FormItem state. Omitted boolean settings stay `undefined`, avoiding accidental overrides. Notify `eventHandlers.onChange` after updating the model and forward focus/blur events.

```demo
../example/demos/en-US/custom-control.vue
```

### Interaction states

Use this example for state inherited by form controls. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

#### Form Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `id` | Native form id; an explicit value prefixes normalized field container ids | _string_ | `-` |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | _Record<string, any>_ | `-` |
| `layout` | Form item layout: `vertical`, `horizontal`, or `inline`; can be overridden by `FormItem.layout` | _'vertical' \| 'horizontal' \| 'inline'_ | `'vertical'` |
| `label-align` | Label alignment | _'left' \| 'right'_ | `'right'` |
| `label-col-props` | Horizontal label Col options, including breakpoints | _FormColProps_ | `{ span: 5, offset: 0 }` |
| `wrapper-col-props` | Horizontal control Col options | _FormColProps_ | `{ span: 19, offset: 0 }` |
| `label-col-style` | Per-instance label column style | _CSSProperties_ | `-` |
| `wrapper-col-style` | Per-instance control column style | _CSSProperties_ | `-` |
| `label-col-flex` | Label flex; unit strings set width, numbers are grow ratios | _number \| string_ | `-` |
| `auto-label-width` | Align eligible horizontal labels to their maximum natural width | _boolean_ | `false` |
| `size` | Form control size inherited by FormItem and controls | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `rules` | Validation rules keyed by field name | _Record<string, rule \| rule[]>_ | `-` |
| `readonly` | Whether controls are readonly | _boolean_ | `-` |
| `disabled` | Whether controls are disabled | _boolean_ | `-` |
| `scroll-to-error` | After failed validation, scroll to the first (`start`) or last (`end`) invalid field in document order; these values do not specify viewport alignment | _'start' \| 'end'_ | `-` |
| `scroll-to-error-offset-y` | Scroll to the position offset of the form item that fails validation | _number \| string_ | `0` |

### Methods

#### Form Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Validate all form items | `callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `validateField` | Validate the given form item(s) | `field: string \| string[]`, `callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `resetFields` | Reset the value and validation message of the form item(s) to their initial value, resets all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `clearValidate` | Clear the validation message of the form item(s), clears all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `setFields` | Set field values or error states in batches | `Record<string, { value?; status?; message? }>` | `-` |
| `scrollToField` | Scroll to the given form item | `field: string` | `-` |

### Events

#### Form Events

| Event | Description  | Arguments  |
| --- | --- | --- |
| `submit` | Triggered when the form is submitted | `data: { values; errors }`, `event: Event` |
| `submit-success` | Triggered after successful validation | `values`, `event: Event` |
| `submit-failed` | Triggered after failed validation | `data: { values; errors }`, `event: Event` |
| `reset` | Fired when the form is reset | `event: Event` |

### Slots

#### Form Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Form content | `-` |

## FormItem API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `field` | Field path in `Form.model`, supports `a.b` | _string_ | `''` |
| `label` | Label text; when set, renders outer label and disables floating hint | _string_ | `-` |
| `tooltip` | Label hint (hover, keyboard focus or touch click) | _string_ | `-` |
| `show-colon` | Append a colon to the label | _boolean_ | `false` |
| `label-component` | Native label element name | _string_ | `'label'` |
| `label-attrs` | Native label attributes; for targets the control's actual id | _HTMLAttributes & Record<string, unknown>_ | `-` |
| `content-class` | Content container class | _string \| array \| object_ | `-` |
| `content-flex` | Enable flex layout; disable for custom Grid | _boolean_ | `true` |
| `layout` | Layout: `vertical`, `horizontal`, or `inline`; inherits `Form.layout` when omitted | _'vertical' \| 'horizontal' \| 'inline'_ | `-` |
| `label-align` | Label alignment | _'left' \| 'right'_ | `-` |
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
| `asterisk-position` | Asterisk position | _'start' \| 'end'_ | `'start'` |
| `help` | Help text (shown when no error) | _string_ | `-` |
| `extra` | Extra text | _string_ | `-` |
| `disabled` | Disabled; inherits Form when omitted | _boolean_ | `-` |
| `readonly` | Readonly; inherits Form when omitted | _boolean_ | `-` |
| `size` | Control size; inherits Form when omitted | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `no-style` | Remove label/error UI, keep validation | _boolean_ | `false` |
| `rules` | Validation rules (function / Zod / array) | _any_ | `-` |
| `validate-trigger` | Validation triggers; `clear` fires only for a control's clear action, not for `change` | _FormItemValidateTrigger \| FormItemValidateTrigger[]_ | `'change'` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `validate` | Emitted after validation | `valid: boolean` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Form control |
| `label` | Custom label |
| `help` | Custom help |
| `extra` | Custom extra |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Validate the field | `-` | `Promise<undefined \| ValidatedError>` |
| `clearValidate` | Clear validation status | `-` | `-` |
| `resetField` | Reset value to initial and clear validation | `-` | `-` |

### Type Definitions

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal'
```

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
