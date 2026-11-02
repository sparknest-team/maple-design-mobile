# Time

If a parent keeps the popup open after confirmation, repeated confirmation without a new selection is deduplicated. A fresh time selection starts a new transaction and can be confirmed again.

While expanded, the native combobox uses `aria-controls` to identify its own named popup. Closing updates the state and removes the link. `aria-label` and `aria-describedby` reach the native input. Custom selected/trigger slots must preserve accessible names, keyboard operation and state associations.

In clock and wheel modes, min/max are inclusive same-day bounds. A minute stays selectable when some of its seconds are available. Second constraints compare the complete clock value, not seconds from a different hour. Use TimeRange show-next-day for overnight ranges, rather than reversed min/max.

> Source is merged into `time/`. Installing the parent also registers it. Static member: `Time.Picker`.

## Basic examples

### Basic Usage

```demo
../example/demos/en-US/basic-usage.vue
```

## Appearance and presentation

### Form control size comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                                              | Related examples                                                                                   |
| ------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `format`      | String parse, display and output format                              | Field appearance and nested options, Time formats and 12-hour clocks, Visible wheel fields         |
| `placeholder` | Placeholder                                                          | Form control size comparison, Field appearance and nested options, Time formats and 12-hour clocks |
| `variant`     | Variant: `filled` `standard` `outline`                               | Form control size comparison, Field appearance and nested options                                  |
| `use12-hours` | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | Time formats and 12-hour clocks, AM / PM                                                           |
| `disabled`    | Whether disabled                                                     | Form control size comparison                                                                       |
| `readonly`    | Whether readonly                                                     | Form control size comparison                                                                       |

<!-- demo-config-notes:end -->

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### Field appearance and nested options

hint controls the floating label (Cedar defaults to false, Maple to true) and is suppressed by an outer Form label. line defaults to true; text-color/focus-color/blur-color accept optional color strings. An unset error inherits Form state; explicit false overrides it. TimeRange separator defaults to `~` and accepts an empty string. Default variants remain Cedar filled and Maple standard; set variant explicitly for matching appearance.

The field owns values, defaults, open state, format, steps, bounds, disabled rules and readonly/disabled state. Set these directly on the field, not inside timePickerProps/timeRangePickerProps. Nested options customize presentation only; model/select/confirm listeners cannot replace the field flow. Types reject owner properties and runtime filtering removes them, even when a top-level constraint is unset.

Maple pickerProps accepts visual options such as optionHeight/optionCount, not columns, fieldNames, selection, toolbar or open state. popupProps accepts positioning, appearance and lifecycle callbacks, but not open/defaultOpen or open-update listeners. Top-level popupContainer (including false) takes priority. Nested options in standalone time panels follow the same ownership rules.

```demo
../example/demos/en-US/field-appearance.vue
```

Field interactions use one local controller: select stages a draft; confirmation validates current rules before commit and Form change notification. Clearing uses the commit path with undefined, followed by clear; it is blocked when readonly/disabled or not clearable. Readonly fields remain focusable; repeated focus/blur notifications are deduplicated. A pending controlled close request cannot repeat a commit.

The panel owns one draft and confirmation flow; presentation content only renders that state. The example above counts valid confirmations and shows the extra slot. Reconfirming an unchanged value emits confirm without an extra change event.

### Time formats and 12-hour clocks

Compare minute, second and 12-hour displays. Distinguish midnight (12 AM) from noon (12 PM); model formats and step constraints remain separate.

```demo
../example/demos/en-US/format-comparison.vue
```

### Visible wheel fields

`time-fields` controls time columns and their order on fields and standalone panels. Range endpoints share the configuration.

| Prop          | Type                       | Default                      | Description                                                  |
| ------------- | -------------------------- | ---------------------------- | ------------------------------------------------------------ |
| `time-fields` | readonly TimePickerField[] | According to the time format | Controls time wheels, including those embedded in calendars. |

Lists must be nonempty and unique. Explicit lists determine columns and order; only omitted props use defaults. Date and time fields cannot be mixed. Edits preserve hidden units in the full draft. Changing fields does not submit the model. Nested presentation props cannot override root field configuration.

Time format retains its string parsing/display/output protocol. time-fields changes columns only and retains hidden units represented in the model. Twelve-hour hour columns automatically include AM/PM.

```demo
../example/demos/time-fields.vue
```

### AM / PM

```demo
../example/demos/en-US/ampm-formats.vue
```

## Value model and selection rules

### Model types and literals

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration    | Purpose                                                              | Related examples                                                |
| ---------------- | -------------------------------------------------------------------- | --------------------------------------------------------------- |
| `format`         | String parse, display and output format                              | Model types and literals, Hour/minute/second steps, Time bounds |
| `disabled-hours` | Disabled hours (0–23)                                                | Hour/minute/second steps, Wheel constraints                     |
| `min`            | Minimum selectable time                                              | Time bounds, Wheel constraints                                  |
| `max`            | Maximum selectable time                                              | Time bounds, Wheel constraints                                  |
| `use12-hours`    | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | Hour/minute/second steps                                        |
| `step`           | Candidate steps anchored at midnight; invalid values use 1           | Hour/minute/second steps                                        |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/format-model.vue
```

### Hour/minute/second steps

With 12-hour display and a 5-hour step, hours remain anchored to midnight: 0/5/10/15/20, not restarted at noon. AM offers 12/05/10 and PM offers 03/08. Selecting 03 PM commits 15:30:00 because this Demo retains HH:mm:ss as its model format. Changing the rules preserves the old 09:30:00; cancellation does not commit aligned candidates. Only confirmation writes the selected value. Enable Disable 15:00 to combine disabled-hours with the step: 03 PM is unavailable while 08 PM still means 20:00. Turning off Accept controlled updates records proposals without changing the business value; re-enable it before confirming an accepted value. Proposal counts are not acceptance counts. Other non-dividing steps and physical touch remain separate coverage.

```demo
../example/demos/en-US/step.vue
```

### Time bounds

In the single-value Demo, tightening the minimum to 10:30:40 retains committed 10:30:38 and prevents confirmation. Moving the wheel to minute 31 aligns draft seconds to valid candidates. Explicitly select second 02 and confirm to commit the inclusive maximum 10:31:02. Changing the field popup draft to second 00 and canceling retains second 02. Candidate alignment is not an external model commit; mouse/keyboard evidence is not physical-touch inertia testing.

`min` / `max` are optional strings, with no bound by default. Use 24-hour `HH:mm` or `HH:mm:ss`, independently of format/use12Hours. Both endpoints are inclusive; omitted seconds mean 00. Range endpoints are validated individually; showNextDay does not make the bounds wrap across midnight. Reversed bounds allow no commit; unparseable bounds are treated as unset.

Changing bounds does not rewrite the external model. Commits must satisfy bounds, steps and disabled callbacks. Hidden seconds are validated as 00. Coarse list columns are disabled when their whole hour/minute is out of bounds; confirmation validates the complete time. Use hide-disabled-options to hide disabled choices.

```demo
../example/demos/en-US/bounds.vue
```

### Wheel constraints

```demo
../example/demos/en-US/wheel-limits.vue
```

## Standalone time panels

### Basic Usage

```demo
../example/demos/en-US/picker-basic.vue
```

### Panel confirmation and disabled options

For a pending single-value draft, enabling readonly, hiding disabled hours or switching to immediate mode does not submit the old draft. Unlocking does not submit it either; the next valid selection commits once. Maple wheel updates preserve the same draft without updating the parent model. Mouse/keyboard checks do not establish physical touch-inertia behavior.

```demo
../example/demos/en-US/panel-behavior.vue
```

The standalone panel owns its draft and commit state directly. External model replacement resets the draft without emitting selection or change events. Read-only and disabled states block selection and confirmation. Cedar renders lists; Maple renders wheels. These views do not create a second draft.

### Readonly

```demo
../example/demos/en-US/picker-readonly.vue
```

### 24hr Format

Use `format="HH:mm"` for hour and minute precision.

```demo
../example/demos/en-US/picker-hour24.vue
```

### Show Seconds

Use `format="HH:mm:ss"` to include seconds.

```demo
../example/demos/en-US/picker-seconds.vue
```

### Time Limit

Use inclusive min/max bounds together with the three disabled callbacks in both clock and wheel modes.

```demo
../example/demos/en-US/picker-limit.vue
```

### Actions Slots

```demo
../example/demos/en-US/picker-actions.vue
```

## Input and state control

### Interaction state comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration    | Purpose                                             | Related examples                                                                |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| `format`         | String parse, display and output format             | Interaction state comparison, Text entry, Default and controlled values         |
| `clearable`      | Whether the value can be cleared                    | Text entry, Default and controlled values, Selection and commit                 |
| `readonly`       | Whether readonly                                    | Interaction state comparison, Selection and commit, Multiple independent fields |
| `disabled`       | Whether disabled                                    | Interaction state comparison, Selection and commit                              |
| `input-editable` | Allow text entry; panel selection remains available | Text entry, Copying and editing                                                 |
| `placeholder`    | Placeholder                                         | Multiple independent fields, With FormItem                                      |

<!-- demo-config-notes:end -->

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for selecting a time. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

### Text entry

`input-editable` defaults to `false` (Cedar: `true`). When enabled, tap the input to type; use the clock button or ArrowDown to open the picker/clock panel. Enter or blur commits; Escape cancels. Parsing, steps, bounds and disabled rules match panel selection. Invalid or rejected controlled edits restore the model value. Disabling editing, readonly or disabled state discards drafts. IME composition and moving between range inputs do not commit.

```demo
../example/demos/en-US/text-entry.vue
```

### Intro

Form time **field** that opens `TimePicker` in a bottom popup. Interaction matches Select picker mode: Cancel discards the draft; Confirm writes `v-model`.

For time ranges, use [`TimeRange`](/en-US/time-range). For panel-only, use [`TimePicker`](/en-US/time-picker). For time range panel, use [`TimeRangePicker`](/en-US/time-range-picker).

### Default and controlled values

`defaultValue` initializes uncontrolled fields/panels once; subsequent edits are retained locally. `modelValue` is authoritative when provided. `defaultOpen` initializes field visibility once. Controlled `open` requires the parent to accept `update:open`; `open-change(open: boolean)` reports requests. `clear` has no arguments. Panels support `disabled` for both range endpoints.

```demo
../example/demos/en-US/default-state.vue
```

### Selection and commit

On the mobile trigger, Enter / ArrowDown opens, Space opens on key release, and Escape cancels. Tab requests closure without blocking native navigation; inline uses an anchored popover and outside clicks discard its draft. Keys are scoped to the trigger, not window; composing input and custom interactive controls are ignored.

Field `focus` and `blur` events have no arguments and fire once per transition. Moving between range endpoints stays within one field. Readonly fields remain focusable but cannot open for editing; disabling a focused field releases its focus state and notifies blur.

Fields and standalone panels revalidate the current format, steps and disabled rules at commit time. Cedar text input follows the same rules. Changing constraints does not rewrite committed values. Reversed ranges are accepted only when `show-next-day` is enabled; otherwise a red footer message is shown and confirmation is disabled. Endpoints are never swapped. Clearing commits `undefined` regardless of candidate restrictions, but still respects readonly/disabled state.

`select(value, date)` reports user draft selection; `change(value, date)` reports a committed value. Both single and range fields clear to `undefined`, with an undefined date argument and a no-argument `clear` event. Date arguments represent local clock times (not next-day calendar arithmetic). Fields default to explicit confirmation; `disable-confirm` commits a valid choice immediately and requests close. Range confirmation rejects reversed endpoints unless `show-next-day` is enabled. Controlled `open` still requires parent acceptance. Standalone panels also default to confirmation; disable-confirm commits immediately without closing the panel.

```demo
../example/demos/en-US/selection-events.vue
```

Replacing the model from the parent resets the draft without emitting `select` or `change`. The example includes an external-update button; confirming a user selection remains a separate action.

### Multiple independent fields

The example displays each field's model separately. Cancel discards only the current draft, and clear affects only the current field. Fields do not share models or drafts.

```demo
../example/demos/en-US/multiple-fields.vue
```

`format` now has the same meaning as Cedar: it parses string models and controls display and emitted strings. The default is `HH:mm:ss`; with `use12-hours` and no explicit format it is `hh:mm:ss a`. Use `HH:mm` to serialize minutes, and time-fields to hide wheel seconds, `hh:mm A` for uppercase AM/PM, and `[Time] HH:mm` for literal text. Models accept formatted strings, local Date objects, or millisecond timestamps; output is always a formatted string (an array for ranges). Invalid input is not normalized or written back. `min`/`max` remain 24-hour `HH:mm[:ss]` strings, and disabled callbacks always receive actual hours 0–23. The old Time `use-seconds` and format enum have been removed, without aliases.

### With FormItem

```demo
../example/demos/en-US/with-form-item.vue
```

Disabled callbacks match Cedar: disabled-hours, disabled-minutes and disabled-seconds; the old disabled-time prop is removed. Both views respect inclusive same-day min/max. Overnight ranges use show-next-day. Hidden seconds are evaluated as zero. Opening a field aligns its draft to a valid candidate without writing the external model; confirmation validates again. Empty or invalid drafts cannot be confirmed after rules change.

### Copying and editing

Use open-trigger-target to control pointer opening independently. In icon mode, clicking, focusing and typing do not automatically open the panel. input-editable / filterable still controls editing or search. The suffix button, explicit keyboard commands and controlled open can open it.

```demo
../example/demos/open-trigger-target.vue
```

### Intro

Form field: [`Time`](/en-US/time). Time range field: [`TimeRange`](/en-US/time-range). Time range panel: [`TimeRangePicker`](/en-US/time-range-picker).

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Reading direction

Inherits the nearest `dir="ltr|rtl"`. Direction changes neither change the time nor commit drafts. Time columns follow reading order; Left/Right moves focus visually between columns. Cedar Up/Down and Home/End move focus within a column, skipping disabled options; Enter/Space selects. Maple wheels retain their existing Up/Down and Home/End selection behavior. Existing confirmation settings control submission. Popovers inherit their source direction.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

`popup-props` configures the anchored Trigger popover on both platforms. It cannot replace field open/disabled/trigger ownership. Top-level popup-container, including false, takes precedence. Panel and popup options are separate. `click(event)` fires once for an enabled field; readonly fields notify but do not open. Use `open-change(false)` for close requests, not proof that a controlled state changed. The field close event has been removed without an alias.

`suffix-icon` receives `focus: boolean` and `popupOpen: boolean`, replacing arrow-icon. `focus(index = 0)` focuses an endpoint without committing; `blur()` removes focus and requests closing.

### Pure-panel event and slot boundaries

`TimePicker`/`TimeRangePicker` do not manage fields/popups. Pass `open`, `size`, `variant`, clearing and popup configuration to `Time`/`TimeRange`.

- `select(value, date)`: edit the draft.
- `change(value, date)`: valid confirmation with a changed value; updates the model.
- `confirm(value, date)`: every valid confirmation, including unchanged values. `disableConfirm` also emits it on valid selection commits. Disabled, readonly or invalid drafts do not emit it.
- `extra`: additional explanatory content.
- `actions({ confirm, canConfirm, value })`: replace default tools. `value` is the draft; call `confirm()` to commit and disable buttons according to `canConfirm`.

Single-time events carry formatted strings and Date objects; range events carry corresponding arrays. Pure panels no longer emit `open-change`, `update:open` or `clear`.

Fields use independently copied PickerField → FieldDecorator. Panels edit drafts and write back only on confirmation; cancel/close do not write back. Clearing commits empty and closes immediately. Mobile fields do not open the software keyboard. See Date's unified field/commit example for all four fields.

### Props

| Arguments               | Description                                                                                                                                                                                 | Type                                                  | Default                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `v-model`               | Bound value                                                                                                                                                                                 | _TimeValue_                                           | `-`                                 |
| `default-value`         | Initial uncontrolled value                                                                                                                                                                  | _TimeValue_                                           | `-`                                 |
| `hide-disabled-options` | Hide disabled time options; clock tick positions remain                                                                                                                                     | _boolean_                                             | `false`                             |
| `open`                  | Controlled popup visibility                                                                                                                                                                 | _boolean_                                             | `-`                                 |
| `default-open`          | Initial visibility                                                                                                                                                                          | _boolean_                                             | `false`                             |
| `open-trigger-target`   | Pointer opening area: field includes the whole field; icon uses only the suffix trigger. Clear/remove actions are excluded; explicit keyboard opening and controlled open remain available. | `'field' \| 'icon'`                                   | `'field'`                           |
| `disable-confirm`       | Valid selection commits immediately and requests closing                                                                                                                                    | _boolean_                                             | `false`                             |
| `show-now-button`       | Show Now; stage the current time until confirmation                                                                                                                                         | _boolean_                                             | `true`                              |
| `format`                | String parse, display and output format                                                                                                                                                     | _string_                                              | `HH:mm:ss`                          |
| `use12-hours`           | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format                                                                                                                        | _boolean_                                             | `false`                             |
| `step`                  | Candidate steps anchored at midnight; invalid values use 1                                                                                                                                  | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`                   | Minimum selectable time                                                                                                                                                                     | _string_                                              | `-`                                 |
| `max`                   | Maximum selectable time                                                                                                                                                                     | _string_                                              | `-`                                 |
| `disabled-hours`        | Disabled hours (0–23)                                                                                                                                                                       | `() => number[]`                                      | `-`                                 |
| `disabled-minutes`      | Disabled minutes for the hour                                                                                                                                                               | `(hour?: number) => number[]`                         | `-`                                 |
| `disabled-seconds`      | Disabled seconds for the hour and minute                                                                                                                                                    | `(hour?: number, minute?: number) => number[]`        | `-`                                 |
| `time-picker-props`     | Props passed to `mp-time-picker`                                                                                                                                                            | _Partial\<TimePickerProps\>_                          | `{}`                                |
| `picker-props`          | Props forwarded to `mp-picker`                                                                                                                                                              | _Partial\<PickerProps\>_                              | `{}`                                |
| `popup-props`           | Props passed to popup                                                                                                                                                                       | _Partial\<TriggerProps\>_                             | `{}`                                |
| `input-editable`        | Allow text entry; panel selection remains available                                                                                                                                         | _boolean_                                             | `false`                             |
| `placeholder`           | Placeholder                                                                                                                                                                                 | _string_                                              | `-`                                 |
| `clearable`             | Whether the value can be cleared                                                                                                                                                            | _boolean_                                             | `false`                             |
| `disabled`              | Whether disabled                                                                                                                                                                            | _boolean_                                             | `false`                             |
| `readonly`              | Whether readonly                                                                                                                                                                            | _boolean_                                             | `false`                             |
| `size`                  | Size: `xs` `sm` `md` `lg` `xl`                                                                                                                                                              | _ComponentSize_                                       | `md`                                |
| `variant`               | Variant: `filled` `standard` `outline`                                                                                                                                                      | _string_                                              | `standard`                          |

### Events

| Event         | Description                              | Arguments                                             |
| ------------- | ---------------------------------------- | ----------------------------------------------------- |
| `focus`       | Focused                                  | `-`                                                   |
| `blur`        | Blur                                     | `-`                                                   |
| `change`      | Committed value                          | _value: string \| undefined, date: Date \| undefined_ |
| `select`      | User draft selection                     | _value: string, date: Date_                           |
| `clear`       | Clear the selection                      | `-`                                                   |
| `open-change` | Visibility request                       | _open: boolean_                                       |
| `click`       | Enabled field click (including readonly) | `event: Event`                                        |

## Configuring the cleared value

`empty-value` / `emptyValue` sets the model value produced by clearing. It accepts a value in the component model type or a zero-argument factory. Omission preserves the existing default; use `() => undefined` to distinguish omission from returning undefined. Arrays are shallow-copied on every clear; selected items that cannot be cleared remain. It does not redefine emptiness, alter Form reset defaults or treat 0/false as universally empty.

## TimePicker API

Pure-panel `disable-confirm: boolean = false` skips confirmation and commits immediately. Custom `actions` must call slot `confirm()` and disable invalid submissions according to `canConfirm`.

### Props

| Arguments               | Description                                                          | Type                                                  | Default                             |
| ----------------------- | -------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `v-model`               | Bound value                                                          | _TimeValue_                                           | `-`                                 |
| `default-value`         | Initial uncontrolled value                                           | _TimeValue_                                           | `-`                                 |
| `hide-disabled-options` | Hide disabled time options; clock tick positions remain              | _boolean_                                             | `false`                             |
| `disabled`              | Disable panel editing                                                | _boolean_                                             | `false`                             |
| `disable-confirm`       | Hide confirmation; valid selections commit immediately               | _boolean_                                             | `false`                             |
| `show-now-button`       | Show Now; stage the current time until confirmation                  | _boolean_                                             | `true`                              |
| `picker-props`          | Props forwarded to `Picker` in column-wheel mode                     | _object_                                              | `-`                                 |
| `format`                | String parse, display and output format                              | _string_                                              | `HH:mm:ss`                          |
| `elevation`             | Elevation level, options `true` `false` and level of `0-24`          | _number \| boolean_                                   | `false`                             |
| `min`                   | Minimum time in ISO 8601 format                                      | _string_                                              | `-`                                 |
| `max`                   | Maximum time in ISO 8601 format                                      | _string_                                              | `-`                                 |
| `disabled-hours`        | Disabled hours (0–23)                                                | `() => number[]`                                      | `-`                                 |
| `disabled-minutes`      | Disabled minutes for the hour                                        | `(hour?: number) => number[]`                         | `-`                                 |
| `disabled-seconds`      | Disabled seconds for the hour and minute                             | `(hour?: number, minute?: number) => number[]`        | `-`                                 |
| `readonly`              | Whether readonly                                                     | _boolean_                                             | `false`                             |
| `use12-hours`           | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | _boolean_                                             | `false`                             |
| `step`                  | Candidate steps anchored at midnight; invalid values use 1           | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |

### Disabling rules

Clock/wheels share three callbacks returning disabled-value arrays; hours always use 0–23. Hours/minutes without valid descendants are omitted from wheels.

### Events

| Event    | Description          | Callback arguments                                    |
| -------- | -------------------- | ----------------------------------------------------- |
| `change` | Committed value      | _value: string \| undefined, date: Date \| undefined_ |
| `select` | User draft selection | _value: string, date: Date_                           |

### Slots

| Name      | Description           | Arguments                                                                                             |
| --------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| `actions` | Replace panel actions | _{ confirm: () => void, canConfirm: boolean, value, selectNow: () => boolean, nowDisabled: boolean }_ |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable                        | Default               |
| ------------------------------- | --------------------- |
| `--time-picker-border-radius`   | `4px`                 |
| `--time-picker-font-size`       | `var(--font-size-md)` |
| `--time-picker-min-width`       | `290px`               |
| `--time-picker-body-background` | `#fff`                |
| `--time-picker-actions-padding` | `0 8px 12px 8px`      |

### Value types

```ts
export type TimeValue = string | number | Date
```

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `popup` and opens an editor when the value area is clicked. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Inline date/time fields retain existing confirmation policies. In popover/popup, pure panels hide confirmation tools and the editor provides one confirm/cancel pair. Standalone DatePicker/DateRangePicker/TimePicker/TimeRangePicker retain panel APIs/confirmation without inheriting Form field presentation.

Mobile date fields use `panel-type` to select calendar/wheel content; `edit-mode` controls only field editing. Standalone panel content follows each panel API and is not controlled by the field `edit-mode`.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Unified mobile panels

Mobile wheels use a rounded selection band. Single-time panels show no top summary. Field popups and independent panels share appearance.

Single-time Now sits left of confirmation tools and updates the draft under format/step/disabling rules without committing/closing. Even with `disable-confirm`, Now and later wheel edits still require confirmation; cancel discards them. Hide it with `:show-now-button="false"`. Custom `actions` can use `selectNow()`/`nowDisabled`.

Wheel headers follow actual hour/minute/second format, adding AM/PM in 12-hour mode, matching the range panel.

Panel style variables:

| Token                                        | Default                                                       |
| -------------------------------------------- | ------------------------------------------------------------- |
| `--mp-temporal-panel-inset`                  | `12px`                                                        |
| `--mp-temporal-panel-column-label-height`    | `36px`                                                        |
| `--mp-temporal-panel-column-label-font-size` | `13px`                                                        |
| `--mp-temporal-panel-radius`                 | `12px`                                                        |
| `--mp-time-picker-column-label-height`       | `var(--mp-temporal-panel-column-label-height)`                |
| `--mp-temporal-panel-group-gap`              | `24px`                                                        |
| `--mp-temporal-panel-touch-height`           | `44px`                                                        |
| `--mp-temporal-panel-summary-background`     | `var(--mp-color-fill-1)`                                      |
| `--mp-temporal-panel-selection-background`   | `var(--mp-color-fill-2)`                                      |
| `--mp-temporal-panel-active-background`      | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |

### Forwarded configuration boundaries (F07)

Existing TimePopupPresentationProps and runtime filtering remain. Fields own open/defaultOpen, disabled, trigger, closeOnClickReference, preventFocus and expansion updates. Explicit top-level popup-container takes precedence, otherwise nested configuration is used. popupClass merges internal classes. Inline popupOffset stays 4; Maple also fixes unmountOnClose=true. Such fields in old types are not guaranteed to control final values. Existing Time types/runtime behavior are not narrowed here.
