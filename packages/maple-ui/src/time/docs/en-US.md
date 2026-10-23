# Time

If a parent keeps the popup open after confirmation, repeated confirmation without a new selection is deduplicated. A fresh time selection starts a new transaction and can be confirmed again.

While expanded, the native combobox uses `aria-controls` to identify its own named popup. Closing updates the state and removes the link. `aria-label` and `aria-describedby` reach the native input. Custom selected/trigger slots must preserve accessible names, keyboard operation and state associations.

In clock and wheel modes, min/max are inclusive same-day bounds. A minute stays selectable when some of its seconds are available. Second constraints compare the complete clock value, not seconds from a different hour. Use TimeRange show-next-day for overnight ranges, rather than reversed min/max.

## Examples

### Basic Usage

```demo
../example/demos/en-US/basic-usage.vue
```

### Disabled

```demo
../example/demos/en-US/disabled.vue
```

### Readonly

```demo
../example/demos/en-US/readonly.vue
```

### Form control size comparison

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### Text entry

`input-editable` defaults to `false` (Cedar: `true`). When enabled, tap the input to type; use the clock button or ArrowDown to open the picker/clock panel. Enter or blur commits; Escape cancels. Parsing, steps, bounds and disabled rules match panel selection. Invalid or rejected controlled edits restore the model value. Disabling editing, readonly or disabled state discards drafts. IME composition and moving between range inputs do not commit.

```demo
../example/demos/en-US/text-entry.vue
```

### Intro

Form time **field** that opens `TimePicker` in a bottom popup. Interaction matches Select picker mode: Cancel discards the draft; Confirm writes `v-model`.

For time ranges, use [`TimeRange`](/en-US/time-range). For panel-only, use [`TimePicker`](/en-US/time-picker). For time range panel, use [`TimeRangePicker`](/en-US/time-range-picker).

### AM / PM

```demo
../example/demos/en-US/ampm-formats.vue
```

### 24-Hour Format

```demo
../example/demos/en-US/hour24.vue
```

### Show Seconds

```demo
../example/demos/en-US/show-second.vue
```

### With FormItem

```demo
../example/demos/en-US/with-form-item.vue
```

Disabled callbacks match Cedar: disabled-hours, disabled-minutes and disabled-seconds; the old disabled-time prop is removed. Both views respect inclusive same-day min/max. Overnight ranges use show-next-day. Hidden seconds are evaluated as zero. Opening a field aligns its draft to a valid candidate without writing the external model; confirmation validates again. Empty or invalid drafts cannot be confirmed after rules change.

### Wheel constraints

```demo
../example/demos/en-US/wheel-limits.vue
```

### AM/PM and midnight/noon

```demo
../example/demos/en-US/ampm.vue
```

### Hour/minute/second steps

With 12-hour display and a 5-hour step, hours remain anchored to midnight: 0/5/10/15/20, not restarted at noon. AM offers 12/05/10 and PM offers 03/08. Selecting 03 PM commits 15:30:00 because this Demo retains HH:mm:ss as its model format. Changing the rules preserves the old 09:30:00; cancellation does not commit aligned candidates. Only confirmation writes the selected value. Enable Disable 15:00 to combine disabled-hours with the step: 03 PM is unavailable while 08 PM still means 20:00. Turning off Accept controlled updates records proposals without changing the business value; re-enable it before confirming an accepted value. Proposal counts are not acceptance counts. Other non-dividing steps and physical touch remain separate coverage.

```demo
../example/demos/en-US/step.vue
```

### Multiple independent fields

The example displays each field's model separately. Cancel discards only the current draft, and clear affects only the current field. Fields do not share models or drafts.

```demo
../example/demos/en-US/multiple-fields.vue
```

`format` now has the same meaning as Cedar: it parses string models and controls display and emitted strings. The default is `HH:mm:ss`; with `use12-hours` and no explicit format it is `hh:mm:ss a`. Use `HH:mm` to omit seconds, `hh:mm A` for uppercase AM/PM, and `[Time] HH:mm` for literal text. Models accept formatted strings, local Date objects, or millisecond timestamps; output is always a formatted string (an array for ranges). Invalid input is not normalized or written back. `min`/`max` remain 24-hour `HH:mm[:ss]` strings, and disabled callbacks always receive actual hours 0–23. The old Time `use-seconds` and format enum have been removed, without aliases.

### Model types and literals

```demo
../example/demos/en-US/format-model.vue
```

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

### Panel confirmation and disabled options

For a pending single-value draft, enabling readonly, hiding disabled hours or switching to immediate mode does not submit the old draft. Unlocking does not submit it either; the next valid selection commits once. Maple wheel updates preserve the same draft without updating the parent model. Mouse/keyboard checks do not establish physical touch-inertia behavior.

```demo
../example/demos/en-US/panel-behavior.vue
```

The standalone panel owns its draft and commit state directly. External model replacement resets the draft without emitting selection or change events. Read-only and disabled states block selection and confirmation. Cedar renders lists; Maple renders wheels. These views do not create a second draft.

### Interaction states

Use this example for selecting a time. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

Inline uses a field-anchored popover, positioned bottom-start by default. Wheel panels share one confirmation footer. Explicit popup presentations use the shared field editor shell.

`popup-props` configures the anchored Trigger popover on both platforms. It cannot replace field open/disabled/trigger ownership. Top-level popup-container, including false, takes precedence. Panel and popup options are separate. `click(event)` fires once for an enabled field; readonly fields notify but do not open. Use `open-change(false)` for close requests, not proof that a controlled state changed. The field close event has been removed without an alias.

Use the `suffix-icon` slot with `focus: boolean` and `popupOpen: boolean`. The method `focus(index = 0)` focuses an endpoint without committing; `blur()` blurs and requests closure.

### Field appearance and nested options

hint controls the floating label (Cedar defaults to false, Maple to true) and is suppressed by an outer Form label. line defaults to true; text-color/focus-color/blur-color accept optional color strings. An unset error inherits Form state; explicit false overrides it. TimeRange separator defaults to ` ~ ` and accepts an empty string. Default variants remain Cedar filled and Maple standard; set variant explicitly for matching appearance.

The field owns values, defaults, open state, format, steps, bounds, disabled rules and readonly/disabled state. Set these directly on the field, not inside timePickerProps/timeRangePickerProps. Nested options customize presentation only; model/select/confirm listeners cannot replace the field flow. Types reject owner properties and runtime filtering removes them, even when a top-level constraint is unset.

Maple pickerProps accepts visual options such as optionHeight/optionCount, not columns, fieldNames, selection, toolbar or open state. popupProps accepts positioning, appearance and lifecycle callbacks, but not open/defaultOpen or open-update listeners. Top-level popupContainer (including false) takes priority. Nested options in standalone time panels follow the same ownership rules.

```demo
../example/demos/en-US/field-appearance.vue
```

Field interactions use one local controller: select stages a draft; confirmation validates current rules before commit and Form change notification. Clearing uses the commit path with undefined, followed by clear; it is blocked when readonly/disabled or not clearable. Readonly fields remain focusable; repeated focus/blur notifications are deduplicated. A pending controlled close request cannot repeat a commit.

The panel owns one draft and confirmation flow; presentation content only renders that state. The example above counts valid confirmations and shows the extra slot. Reconfirming an unchanged value emits confirm without an extra change event.

### Time bounds

In the single-value Demo, tightening the minimum to 10:30:40 retains committed 10:30:38 and prevents confirmation. Moving the wheel to minute 31 aligns draft seconds to valid candidates. Explicitly select second 02 and confirm to commit the inclusive maximum 10:31:02. Changing the field popup draft to second 00 and canceling retains second 02. Candidate alignment is not an external model commit; mouse/keyboard evidence is not physical-touch inertia testing.

`min` / `max` are optional strings, with no bound by default. Use 24-hour `HH:mm` or `HH:mm:ss`, independently of format/use12Hours. Both endpoints are inclusive; omitted seconds mean 00. Range endpoints are validated individually; showNextDay does not make the bounds wrap across midnight. Reversed bounds allow no commit; unparseable bounds are treated as unset.

Changing bounds does not rewrite the external model. Commits must satisfy bounds, steps and disabled callbacks. Hidden seconds are validated as 00. Coarse list columns are disabled when their whole hour/minute is out of bounds; confirmation validates the complete time. Use hide-disabled-options to hide disabled choices.

```demo
../example/demos/en-US/bounds.vue
```

### Pure panel events and slots

TimePicker / TimeRangePicker own drafts, not fields or popups. Pass open, size, variant, clearing and popup options to Time / TimeRange.

- `select(value, date)` reports draft selections.
- `change(value, date)` and model updates occur only when a valid commit changes the value.
- `confirm(value, date)` fires on every valid confirmation, including unchanged values and immediate commits with disableConfirm. Invalid, disabled or readonly commits do not emit it.
- `extra` adds supporting content.
- `actions({ confirm, canConfirm, value })` replaces the default actions. value is the draft; call confirm() to commit and disable the button when canConfirm is false.

Single values are formatted strings and Dates; range values are arrays. Pure panels do not emit open-change, update:open or clear.

The field uses independently copied PickerField → FieldDecorator layers. Panels edit a draft; Confirm commits, Cancel/dismiss discards, and Clear commits an empty value and closes the popup. Mobile fields do not open the software keyboard. See the Date field-protocol demo for all four field types.

### Props

| Prop                | Description                                             | Type                         | Default    |
| ------------------- | ------------------------------------------------------- | ---------------------------- | ---------- |
| `v-model` | Model value | _TimeValue_ | `-` |
| `default-value` | Initial uncontrolled value | _TimeValue_ | `-` |
| `open`              | Controlled popup visibility                             | _boolean_                    | `-`        |
| `default-open` | Initial visibility | _boolean_ | `false` |
| `disable-confirm` | Commit a valid choice immediately and request close | _boolean_ | `false` |
| `show-now-button` | Show Now; stage the current time until confirmation | _boolean_ | `true` |
| `format` | String parse, display and output format | _string_ | `HH:mm:ss` |
| `use12-hours` | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | _boolean_ | `false` |
| `step` | Candidate steps anchored at midnight; invalid values use 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`               | Minimum time                                            | _string_                     | `-`        |
| `max`               | Maximum time                                            | _string_                     | `-`        |
| `disabled-hours` | Disabled hours (0–23) | `() => number[]` | `-` |
| `disabled-minutes` | Disabled minutes for the hour | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | Disabled seconds for the hour and minute | `(hour?: number, minute?: number) => number[]` | `-` |
| `time-picker-props` | Props passed to `mp-time-picker`                        | _Partial\<TimePickerProps\>_ | `{}`       |
| `picker-props`      | Props passed to `mp-picker`                             | _Partial\<PickerProps\>_     | `{}`       |
| `popup-props`       | Props passed to popup                                   | _Partial\<TriggerProps\>_      | `{}`       |
| `input-editable` | Allow text entry; panel selection remains available | _boolean_ | `false` |
| `placeholder`       | Placeholder                                             | _string_                     | `-`        |
| `clearable`         | Show clear button                                       | _boolean_                    | `false`    |
| `disabled`          | Disabled                                                | _boolean_                    | `false`    |
| `readonly`          | Readonly                                                | _boolean_                    | `false`    |
| `size`              | Size: `xs` `sm` `md` `lg` `xl`                          | _ComponentSize_              | `md`       |
| `variant`           | Variant: `filled` `standard` `outline`                 | _string_                     | `standard` |

### Events

| Event    | Description               | Arguments      |
| -------- | ------------------------- | -------------- |
| `focus`  | Emitted on focus          | `-`            |
| `blur`   | Emitted on blur           | `-`            |
| `click`  | Emitted on click          | `event: Event` |
| `clear` | Cleared | `-` |
| `open-change` | Visibility request | _open: boolean_ |
| `click` | Enabled field click (including readonly) | `event: Event` |
| `change` | Committed value | _value: string \| undefined, date: Date \| undefined_ |
| `select` | User draft selection | _value: string, date: Date_ |

### Methods

| Method  | Description     | Arguments | Return |
| ------- | --------------- | --------- | ------ |
| `focus` | Focus the field | `-`       | `-`    |
| `blur`  | Blur the field  | `-`       | `-`    |

### Slots

| Slot         | Description      | Arguments                            |
| ------------ | ---------------- | ------------------------------------ |
| `selected`   | Selected content | `-`                                  |
| `prefix`     | Prefix           | `-`                                  |
| `clear-icon` | Clear icon       | `clear: (e: Event) => void`          |
| `suffix`     | Suffix           | `-`                                  |
| `suffix-icon` | Field icon       | `focus: boolean, popupOpen: boolean` |

### Type Definitions

```ts
type TimeDisabledRules = {
  disabledHours?: () => number[]
  disabledMinutes?: (hour?: number) => number[]
  disabledSeconds?: (hour?: number, minute?: number) => number[]
}
```

## TimePicker

> 源码已并入 `time/`，安装父组件时一并注册。静态成员：`Time.Picker`。

### Intro

Form field: [`Time`](/en-US/time). Time range field: [`TimeRange`](/en-US/time-range). Time range panel: [`TimeRangePicker`](/en-US/time-range-picker).

### Basic Usage

```demo
../example/demos/en-US/picker-basic.vue
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

### Readonly

```demo
../example/demos/en-US/picker-readonly.vue
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

### API

Panel prop `disable-confirm: boolean = false` skips confirmation. When replacing the actions slot, call its confirm() function and use canConfirm to disable invalid submission.

### Props

| Prop            | Description                                                                                                        | Type                          | Default       |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------------- |
| `v-model` | Model value | _TimeValue_ | `-` |
| `default-value` | Initial uncontrolled value | _TimeValue_ | `-` |
| `disabled` | Disable panel editing | _boolean_ | `false` |
| `disable-confirm` | Commit immediately without a confirmation button | _boolean_ | `false` |
| `show-now-button` | Show Now; stage the current time until confirmation | _boolean_ | `true` |
| `picker-props`  | Props passed to `Picker` in column-wheel mode                                                                      | _object_                      | `-`           |
| `format` | String parse, display and output format | _string_ | `HH:mm:ss` |
| `elevation`     | Elevation level, options `true` `false` and level of `0-24`                                                        | _number \| boolean_ | `false`       |
| `min`           | Minimum allowed time (ISO 8601 format)                                                                             | _string_                      | `-`           |
| `max`           | Maximum allowed time (ISO 8601 format)                                                                             | _string_                      | `-`           |
| `disabled-hours` | Disabled hours (0–23) | `() => number[]` | `-` |
| `disabled-minutes` | Disabled minutes for the hour | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | Disabled seconds for the hour and minute | `(hour?: number, minute?: number) => number[]` | `-` |
| `readonly`      | Readonly                                                                                                           | _boolean_                     | `false`       |
| `use12-hours` | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | _boolean_ | `false` |
| `step` | Candidate steps anchored at midnight; invalid values use 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |

### Disabled rules

Clock and wheel use the same three callbacks returning disabled values. Hours always use 0–23. Wheel parents without selectable descendants are excluded.

### Events

| Event    | Description                | arguments       |
| -------- | -------------------------- | --------------- |
| `change` | Committed value | _value: string \| undefined, date: Date \| undefined_ |
| `select` | User draft selection | _value: string, date: Date_ |

### slots

| Name      | Description                          | SlotProps |
| --------- | ------------------------------------ | --------- |
| `actions` | Replace panel actions | _{ confirm: () => void, canConfirm: boolean, value, selectNow: () => boolean, nowDisabled: boolean }_ |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                             | Default                     |
| ---------------------------------------------------- | --------------------------- |
| `--time-picker-border-radius`                        | `4px`                       |
| `--time-picker-font-size`                            | `var(--font-size-md)`       |
| `--time-picker-min-width`                            | `290px`                     |
| `--time-picker-body-background`                      | `#fff`                      |
| `--time-picker-actions-padding`                      | `0 8px 12px 8px`            |

### Value type

```ts
export type TimeValue = string | number | Date
```

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Inline keeps the existing date/time confirmation policy. In popup, the inner pure panel hides its toolbar and the host owns the single confirmation boundary. Standalone DatePicker, DateRangePicker, TimePicker and TimeRangePicker retain their panel API and confirmation behavior. On fields, use `panel-type` to choose calendar/picker content; `presentation` controls the field container. Standalone pickers keep their existing content `presentation`.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Shared mobile panel style

Mobile wheels use a rounded selection band and omit the top summary for single time selection. Fields and standalone panels share the style.

For single time selection, Now appears to the left of Confirm and updates only the draft using the current format, step and disabled rules. It neither commits nor closes the popup. Even with `disable-confirm`, Now and subsequent wheel edits require explicit confirmation; cancelling discards the draft. Set `:show-now-button="false"` to hide it. Custom `actions` slots can use `selectNow()` and `nowDisabled` to render this action.

Column headings above the wheel follow the visible hour, minute and second units, with AM/PM for twelve-hour formats, matching the time range panel.

Panel style variables:

| Token | Default |
| --- | --- |
| `--mp-temporal-panel-inset` | `12px` |
| `--mp-temporal-panel-column-label-height` | `36px` |
| `--mp-temporal-panel-column-label-font-size` | `13px` |
| `--mp-temporal-panel-radius` | `12px` |
| `--mp-time-picker-column-label-height` | `var(--mp-temporal-panel-column-label-height)` |
| `--mp-temporal-panel-group-gap` | `24px` |
| `--mp-temporal-panel-touch-height` | `44px` |
| `--mp-temporal-panel-summary-background` | `var(--mp-color-fill-1)` |
| `--mp-temporal-panel-selection-background` | `var(--mp-color-fill-2)` |
| `--mp-temporal-panel-active-background` | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |
