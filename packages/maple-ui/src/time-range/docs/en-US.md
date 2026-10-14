# TimeRange

Wheel and clock endpoint headings are native buttons: Tab focuses them and Enter/Space activates them; `aria-pressed` identifies the active editor. Switching sides does not commit drafts. The second-level boundary demo explicitly enables `input-editable` to exercise both text and panel validation.

### Text entry

`input-editable` defaults to `false` (Cedar: `true`). When enabled, tap the input to type; use the clock button or ArrowDown to open the picker/clock panel. Enter or blur commits; Escape cancels. Parsing, steps, bounds and disabled rules match panel selection. Invalid or rejected controlled edits restore the model value. Disabling editing, readonly or disabled state discards drafts. IME composition and moving between range inputs do not commit.

```demo
../example/demos/en-US/text-entry.vue
```

### Intro

Form time-range **field**. Cancel discards the draft; Confirm writes `v-model`.

The popup uses [`TimeRangePicker`](/en-US/time-range-picker) as the panel. The header shows start / end; tap to switch the active side.

- Uses column wheels by default (hour / minute / second)
- `presentation="clock"`: clock panel

### Basic Usage

Tapping the end input activates the end wheel or clock editor. Switching sides only changes the draft until Confirm. Moving focus between inputs does not blur the whole field.

```demo
../example/demos/basic-usage.vue
```

### Clock Mode

```demo
../example/demos/clock-mode.vue
```

### 24hr And Seconds

```html
<script setup>
  import { ref } from 'vue'

  const range = ref([])
</script>

<template>
  <mp-time-range format="HH:mm:ss" v-model="range" placeholder="With seconds" clearable />
</template>
```

### Next Day Label

When the end time is earlier than the start (overnight), enable `show-next-day` to show a next-day marker and **skip swapping on confirm**. Without it, times are ordered so start <= end **only when confirming**.

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range format="HH:mm" v-model="range" show-next-day placeholder="Overnight range" clearable />
</template>
```

### With FormItem

```demo
../example/demos/with-form-item.vue
```



### picker seconds

```demo
../example/demos/picker-seconds.vue
```

### hour24

```demo
../example/demos/hour24.vue
```

### separator

```demo
../example/demos/separator.vue
```

### next day

```demo
../example/demos/next-day.vue
```

The demo enables text entry and shows the model, preserving 22:00→next-day06:00 endpoint order. Clearing returns `undefined`; Reset restores the range. `show-next-day` describes clock ordering and the label, not automatic next-day calendar arithmetic.

### disabled

```demo
../example/demos/disabled.vue
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

```demo
../example/demos/en-US/step.vue
```

Switch to a 12-hour panel without changing minute/second intervals. The explicit `HH:mm:ss` format still controls the model; AM/PM choices map to the corresponding 24-hour value.

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

Use the acceptance switches to reject value or visibility requests independently. Rejected requests leave parent state unchanged; proposals are shown separately. Reopening restores the parent model. A close request does not imply parent acceptance.

When the parent rejects closing, repeated confirmation without a new selection does not commit again. A fresh time selection starts a new transaction that can be confirmed while the panel remains open.

### Selection and commit

Field `focus` and `blur` events have no arguments and fire once per transition. Moving between range endpoints stays within one field. Readonly fields remain focusable but cannot open for editing; disabling a focused field releases its focus state and notifies blur.

Fields and standalone panels revalidate the current format, steps and disabled rules at commit time. Cedar text input follows the same rules. Changing constraints does not rewrite committed values. Ranges are sorted unless `show-next-day` is enabled. Clearing commits `undefined` regardless of candidate restrictions, but still respects readonly/disabled state.

`select(value, date)` reports user draft selection; `change(value, date)` reports a committed value. Both single and range fields clear to `undefined`, with an undefined date argument and a no-argument `clear` event. Date arguments represent local clock times (not next-day calendar arithmetic). Fields default to explicit confirmation; `disable-confirm` commits a valid choice immediately and requests close. Range confirmation sorts endpoints unless `show-next-day` is enabled. Controlled `open` still requires parent acceptance. Standalone panels also default to confirmation; disable-confirm commits immediately without closing the panel.

```demo
../example/demos/en-US/selection-events.vue
```

Replacing the model from the parent resets the draft without emitting `select` or `change`. The example includes an external-update button; confirming a user selection remains a separate action.

### Panel confirmation and disabled options

Standalone panels default to explicit confirmation. Selection emits select; confirmation emits model updates/change. disable-confirm commits valid selections immediately. hide-disabled-options defaults to false; true hides forbidden options without changing clock angles. Field/date owners explicitly skip inner confirmation. External model replacements reset drafts without emitting events.

```demo
../example/demos/en-US/panel-behavior.vue
```

The standalone panel owns its draft and commit state directly. External model replacement resets the draft without emitting selection or change events. Read-only and disabled states block selection and confirmation. Cedar renders lists; Maple renders wheels or clocks. These views do not create a second draft.

## API

`popup-props` configures the local Popup (Trigger in Cedar). It cannot replace field open/disabled/trigger ownership. Top-level popup-container, including false, takes precedence. Panel and popup options are separate. `click(event)` fires once for an enabled field; readonly fields notify but do not open. Use `open-change(false)` for close requests, not proof that a controlled state changed. The field close event has been removed without an alias.

Use the `suffix-icon` slot with `focus: boolean` and `popupOpen: boolean`. The method `focus(index = 0)` focuses the start (0) or end (1) without committing; `blur()` blurs and requests closure.

Range `placeholder` accepts `string | string[]`: a string labels both endpoints; array entries label each endpoint, with missing entries empty. Explicit empty strings do not fall back to defaults.

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

| Prop                      | Description                                                                                                               | Type                              | Default    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------- |
| `v-model` | Model value | _TimeValue[]_ | `-` |
| `default-value` | Initial uncontrolled value | _TimeValue[]_ | `-` |
| `hide-disabled-options` | Hide forbidden time options; clock geometry is preserved | _boolean_ | `false` |
| `open`                    | Controlled popup visibility                                                                                               | _boolean_                         | `-`        |
| `default-open` | Initial visibility | _boolean_ | `false` |
| `disable-confirm` | Commit a valid choice immediately and request close | _boolean_ | `false` |
| `presentation`            | Panel mode: `clock` \| `picker`                                                                                           | _string_                          | `picker`   |
| `format` | String parse, display and output format | _string_ | `HH:mm:ss` |
| `use12-hours` | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | _boolean_ | `false` |
| `step` | Candidate steps anchored at midnight; invalid values use 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`                     | Min time                                                                                                                  | _string_                          | `-`        |
| `max`                     | Max time                                                                                                                  | _string_                          | `-`        |
| `disabled-hours` | Disabled hours (0–23) | `() => number[]` | `-` |
| `disabled-minutes` | Disabled minutes for the hour | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | Disabled seconds for the hour and minute | `(hour?: number, minute?: number) => number[]` | `-` |
| `separator`               | Display separator                                                                                                         | _string_                          | `~`        |
| `show-next-day`           | Show next-day marker when end is earlier than start; skips swap on confirm. Without it, times are ordered on confirm only | _boolean_                         | `false`    |
| `time-picker-props`       | Props for `mp-time-picker` (clock)                                                                                        | _Partial\<TimePickerProps\>_      | `{}`       |
| `picker-props`            | Props for `mp-picker` (picker)                                                                                            | _Partial\<PickerProps\>_          | `{}`       |
| `time-range-picker-props` | Props for `mp-time-range-picker`                                                                                          | _Partial\<TimeRangePickerProps\>_ | `{}`       |
| `popup-props`             | Props for popup                                                                                                           | _Partial\<PopupProps\>_           | `{}`       |
| `input-editable` | Allow text entry; panel selection remains available | _boolean_ | `false` |
| `placeholder` | Endpoint placeholders; a string labels both endpoints | _string \| string[]_ | `-` |
| `clearable`               | Clearable                                                                                                                 | _boolean_                         | `false`    |
| `disabled`                | Disabled                                                                                                                  | _boolean_                         | `false`    |
| `readonly`                | Readonly                                                                                                                  | _boolean_                         | `false`    |
| `size`                    | `xs` `sm` `md` `lg` `xl`                                                                                                  | _ComponentSize_                   | `md`       |
| `variant`                 | `filled` \| `standard` \| `outline`                                                                                      | _string_                          | `standard` |

### Events

| Event    | Description            | Arguments         |
| -------- | ---------------------- | ----------------- |
| `focus`  | Focused                | `-`               |
| `blur`   | Blurred                | `-`               |
| `change` | Committed value | _value: string[] \| undefined, date: Date[] \| undefined_ |
| `select` | User draft selection | _value: string[], date: Date[]_ |
| `clear` | Cleared | `-` |
| `open-change` | Visibility request | _open: boolean_ |
| `click` | Enabled field click (including readonly) | `event: Event` |

### CSS Variables

| Variable                                 | Default                                                         |
| ---------------------------------------- | --------------------------------------------------------------- |
| `--mp-time-range-label-font-size`           | `16px`                                                          |
| `--mp-time-range-arrow-size`                | `20px`                                                          |
| `--mp-time-range-toolbar-height`            | `var(--mp-picker-toolbar-height, 44px)`                            |
| `--mp-time-range-toolbar-padding`           | `var(--mp-picker-toolbar-padding, 0 4px)`                          |
| `--mp-time-range-title-text-color`          | `var(--mp-picker-title-text-color, #555)`                          |
| `--mp-time-range-title-font-size`           | `var(--mp-picker-title-font-size, 16px)`                           |

Panel CSS variables: [`TimeRangePicker`](/en-US/time-range-picker).

## TimeRangePicker

> 源码已并入 `time-range/`，安装父组件时一并注册。静态成员：`TimeRange.Picker`。

### Intro

Time range selection **panel**. Embed alone when you only need the panel. The header shows start / end; tap to switch the active side.

- Uses column wheels by default (hour / minute / second)
- `presentation="clock"`: clock panel

Form field: [`TimeRange`](/en-US/time-range). Single time panel: [`TimePicker`](/en-US/time-picker).

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" />
</template>
```

### Clock Mode

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" presentation="clock" />
</template>
```

### 24hr Format and Seconds

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00:00', '18:00:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm:ss" v-model="range" />
</template>
```

### Readonly

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" readonly />
</template>
```

### Next Day Label

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" show-next-day />
</template>
```

### Actions

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range">
    <template #actions="{ confirm, canConfirm }">
      <mp-button status="primary" variant="text" :disabled="!canConfirm" @click="confirm">Confirm</mp-button>
    </template>
  </mp-time-range-picker>
</template>
```

### API

Panel prop `disable-confirm: boolean = false` skips confirmation. When replacing the actions slot, call its confirm() function and use canConfirm to disable invalid submission.

### Props

| Prop                | Description                                                                                                                                                   | Type                          | Default  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| `v-model` | Model value | _TimeValue[]_ | `-` |
| `default-value` | Initial uncontrolled value | _TimeValue[]_ | `-` |
| `hide-disabled-options` | Hide forbidden time options; clock geometry is preserved | _boolean_ | `false` |
| `disabled` | Disable panel editing | _boolean_ | `false` |
| `disable-confirm` | Commit immediately without a confirmation button | _boolean_ | `false` |
| `presentation`      | Panel mode: `clock` `picker`                                                                                                                                  | _string_                      | `picker` |
| `format` | String parse, display and output format | _string_ | `HH:mm:ss` |
| `use12-hours` | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | _boolean_ | `false` |
| `step` | Candidate steps anchored at midnight; invalid values use 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`               | Minimum allowed time                                                                                                                                          | _string_                      | `-`      |
| `max`               | Maximum allowed time                                                                                                                                          | _string_                      | `-`      |
| `disabled-hours` | Disabled hours (0–23) | `() => number[]` | `-` |
| `disabled-minutes` | Disabled minutes for the hour | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | Disabled seconds for the hour and minute | `(hour?: number, minute?: number) => number[]` | `-` |
| `show-next-day`     | Show next-day marker on the end side when end is earlier than start. Panel selection does not swap; swap happens on `TimeRange` confirm when this prop is off | _boolean_                     | `false`  |
| `time-picker-props` | Props passed to `mp-time-picker` (clock)                                                                                                                      | _Partial\<TimePickerProps\>_  | `{}`     |
| `picker-props`      | Props passed to `mp-picker` (picker)                                                                                                                          | _Partial\<PickerProps\>_      | `{}`     |
| `readonly`          | Whether readonly                                                                                                                                              | _boolean_                     | `false`  |
| `elevation`         | Elevation: `true` `false` or `0-24`                                                                                                                           | _number \| boolean_ | `false`  |

### Disabled rules

Clock and wheel use the same three callbacks returning disabled values. Hours always use 0–23. Wheel parents without selectable descendants are excluded.

### Events

| Event    | Description                    | Arguments         |
| -------- | ------------------------------ | ----------------- |
| `change` | Committed value | _value: string[] \| undefined, date: Date[] \| undefined_ |
| `select` | User draft selection | _value: string[], date: Date[]_ |

### Slots

| Slot      | Description          | Arguments |
| --------- | -------------------- | --------- |
| `actions` | Replace panel confirmation action | _{ confirm: () => void, canConfirm: boolean, value }_ |

### Style Variables

Component css variables. Customize via [StyleProvider](#/en-US/style-provider).

| Variable                                 | Default                                 |
| ---------------------------------------- | --------------------------------------- |
| `--mp-time-range-picker-values-height`      | `56px`                                  |
| `--mp-time-range-picker-values-font-size`   | `20px`                                  |
| `--mp-time-range-picker-values-font-weight` | `500`                                   |
| `--mp-time-range-picker-value-color`        | `var(--mp-color-text-3)`                   |
| `--mp-time-range-picker-value-active-color` | `var(--mp-color-primary)`                  |
| `--mp-time-range-picker-value-arrow-color`  | `var(--mp-color-border-2)`                 |
| `--mp-time-range-picker-value-arrow-size`   | `18px`                                  |
| `--mp-time-range-picker-next-day-color`     | `var(--mp-sys-color-content-secondary)`                 |
| `--mp-time-range-picker-border-radius`      | `var(--mp-time-picker-border-radius, 4px)` |
| `--mp-time-range-picker-background`         | `var(--mp-color-fill-2)`                   |


### Value type

```ts
export type TimeValue = string | number | Date
```
