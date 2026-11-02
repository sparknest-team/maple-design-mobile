# TimeRange

## Basic examples

### Basic Usage

Tapping either input opens the paired wheels. Editing only changes the draft until Confirm. Moving focus between inputs does not blur the whole field.

```demo
../example/demos/basic-usage.vue
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

When the end time is earlier than the start, `show-next-day` treats the end as the next day and shows a next-day marker. Without it, the draft is preserved, a red footer message is shown and confirmation is disabled. Now always updates only the active endpoint.

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range format="HH:mm" v-model="range" show-next-day placeholder="Overnight range" clearable />
</template>
```

## Appearance and presentation

### Field appearance and nested options

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration   | Purpose                                                                                                                         | Related examples                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `format`        | String parse, display and output format                                                                                         | Field appearance and nested options, Range formats and 12-hour clocks, Visible wheel fields |
| `placeholder`   | Endpoint placeholders; a string labels both endpoints                                                                           | Field appearance and nested options, Range formats and 12-hour clocks, separator            |
| `clearable`     | Whether the value can be cleared                                                                                                | Range formats and 12-hour clocks, separator, next day                                       |
| `separator`     | Display separator                                                                                                               | Field appearance and nested options, separator                                              |
| `show-next-day` | Allow end before start as next day. Otherwise reversed drafts show a red warning and disable confirmation. Endpoints never swap | Range formats and 12-hour clocks, next day                                                  |
| `variant`       | Variant: `filled` `standard` `outline`                                                                                          | Field appearance and nested options                                                         |

<!-- demo-config-notes:end -->

hint controls the floating label (Cedar defaults to false, Maple to true) and is suppressed by an outer Form label. line defaults to true; text-color/focus-color/blur-color accept optional color strings. An unset error inherits Form state; explicit false overrides it. TimeRange separator defaults to `~` and accepts an empty string. Default variants remain Cedar filled and Maple standard; set variant explicitly for matching appearance.

The field owns values, defaults, open state, format, steps, bounds, disabled rules and readonly/disabled state. Set these directly on the field, not inside timeRangePickerProps. Nested options customize presentation only; model/select/confirm listeners cannot replace the field flow. Types reject owner properties and runtime filtering removes them, even when a top-level constraint is unset.

Maple pickerProps accepts visual options such as optionHeight/optionCount, not columns, fieldNames, selection, toolbar or open state. popupProps accepts positioning, appearance and lifecycle callbacks, but not open/defaultOpen or open-update listeners. Top-level popupContainer (including false) takes priority. Nested options in standalone time panels follow the same ownership rules.

```demo
../example/demos/en-US/field-appearance.vue
```

Field interactions use one local controller: select stages a draft; confirmation validates current rules before commit and Form change notification. Clearing uses the commit path with undefined, followed by clear; it is blocked when readonly/disabled or not clearable. Readonly fields remain focusable; repeated focus/blur notifications are deduplicated. A pending controlled close request cannot repeat a commit.

The panel owns one draft and confirmation flow; presentation content only renders that state. The example above counts valid confirmations and shows the extra slot. Reconfirming an unchanged value emits confirm without an extra change event.

### Range formats and 12-hour clocks

Compare minute, second and 12-hour range displays and edit both endpoints. Next-day rules and model formats remain separate.

```demo
../example/demos/en-US/format-comparison.vue
```

### Visible wheel fields

```demo
../../time/example/demos/time-fields.vue
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

## Value model and selection rules

### Model types and literals

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration  | Purpose                                                              | Related examples                                                |
| -------------- | -------------------------------------------------------------------- | --------------------------------------------------------------- |
| `format`       | String parse, display and output format                              | Model types and literals, Hour/minute/second steps, Time bounds |
| `min`          | Minimum selectable time                                              | Time bounds, Wheel constraints                                  |
| `max`          | Maximum selectable time                                              | Time bounds, Wheel constraints                                  |
| `presentation` | Panel mode: `picker`                                                 | Hour/minute/second steps                                        |
| `use12-hours`  | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | Hour/minute/second steps                                        |
| `step`         | Candidate steps anchored at midnight; invalid values use 1           | Hour/minute/second steps                                        |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/format-model.vue
```

### Hour/minute/second steps

```demo
../example/demos/en-US/step.vue
```

Switch to a 12-hour panel without changing minute/second intervals. The explicit `HH:mm:ss` format still controls the model; AM/PM choices map to the corresponding 24-hour value.

`format` now has the same meaning as Cedar: it parses string models and controls display and emitted strings. The default is `HH:mm:ss`; with `use12-hours` and no explicit format it is `hh:mm:ss a`. Use `HH:mm` to serialize minutes, and time-fields to hide wheel seconds, `hh:mm A` for uppercase AM/PM, and `[Time] HH:mm` for literal text. Models accept formatted strings, local Date objects, or millisecond timestamps; output is always a formatted string (an array for ranges). Invalid input is not normalized or written back. `min`/`max` remain 24-hour `HH:mm[:ss]` strings, and disabled callbacks always receive actual hours 0–23. The old Time `use-seconds` and format enum have been removed, without aliases.

### Time bounds

`min` / `max` are optional strings, with no bound by default. Use 24-hour `HH:mm` or `HH:mm:ss`, independently of format/use12Hours. Both endpoints are inclusive; omitted seconds mean 00. Range endpoints are validated individually; showNextDay does not make the bounds wrap across midnight. Reversed bounds allow no commit; unparseable bounds are treated as unset.

Changing bounds does not rewrite the external model. Commits must satisfy bounds, steps and disabled callbacks. Hidden seconds are validated as 00. Coarse list columns are disabled when their whole hour/minute is out of bounds; confirmation validates the complete time. Use hide-disabled-options to hide disabled choices.

```demo
../example/demos/en-US/bounds.vue
```

### Wheel constraints

```demo
../example/demos/en-US/wheel-limits.vue
```

## Content and presentation

### With FormItem

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                               | Related examples |
| ------------- | ----------------------------------------------------- | ---------------- |
| `format`      | String parse, display and output format               | With FormItem    |
| `placeholder` | Endpoint placeholders; a string labels both endpoints | With FormItem    |
| `clearable`   | Whether the value can be cleared                      | With FormItem    |

<!-- demo-config-notes:end -->

```demo
../example/demos/with-form-item.vue
```

## Standalone time panels

### Panel confirmation and disabled options

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                               | Related examples |
| ------------- | ----------------------------------------------------- | ---------------- |
| `format`      | String parse, display and output format               | picker seconds   |
| `placeholder` | Endpoint placeholders; a string labels both endpoints | picker seconds   |
| `clearable`   | Whether the value can be cleared                      | picker seconds   |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/panel-behavior.vue
```

Toggling readonly, hiding disabled options, or enabling `disable-confirm` does not commit an existing draft. Unlocking also leaves the model unchanged. With immediate mode enabled, the next valid user selection commits. Readonly preserves the current draft; hiding forbidden options changes candidate visibility, not the committed value.

Switching Maple between wheels preserves both draft endpoints and the active endpoint without confirming. Readonly remains effective after switching. An external model replacement updates either presentation instead of retaining the old draft.

The standalone panel owns its draft and commit state directly. External model replacement resets the draft without emitting selection or change events. Read-only and disabled states block selection and confirmation. Cedar renders lists; Maple renders wheels. These views do not create a second draft.

### picker seconds

```demo
../example/demos/picker-seconds.vue
```

## Input and state control

### Interaction state comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration    | Purpose                                             | Related examples                                                        |
| ---------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| `format`         | String parse, display and output format             | Interaction state comparison, Text entry, Default and controlled values |
| `clearable`      | Whether the value can be cleared                    | Text entry, Default and controlled values, Selection and commit         |
| `disabled`       | Whether disabled                                    | Interaction state comparison, Selection and commit                      |
| `readonly`       | Whether readonly                                    | Interaction state comparison, Selection and commit                      |
| `input-editable` | Allow text entry; panel selection remains available | Text entry, Copying and editing                                         |
| `presentation`   | Panel mode: `picker`                                | Default and controlled values, Copying and editing                      |

<!-- demo-config-notes:end -->

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### disabled

Disabled callbacks match Cedar: disabled-hours, disabled-minutes and disabled-seconds; the old disabled-time prop is removed. Both views respect inclusive same-day min/max. Overnight ranges use show-next-day. Hidden seconds are evaluated as zero. Opening a field aligns its draft to a valid candidate without writing the external model; confirmation validates again. Empty or invalid drafts cannot be confirmed after rules change.

#### Interaction states

Use this example for time ranges such as opening hours. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

### Text entry

`input-editable` defaults to `false` (Cedar: `true`). When enabled, tap the input to type; use the clock button or ArrowDown to open the picker panel. Enter or blur commits; Escape cancels. Parsing, steps, bounds and disabled rules match panel selection. Invalid or rejected controlled edits restore the model value. Disabling editing, readonly or disabled state discards drafts. IME composition and moving between range inputs do not commit.

```demo
../example/demos/en-US/text-entry.vue
```

### Intro

Form time-range **field**. Cancel discards the draft; Confirm writes `v-model`.

The popup uses [`TimeRangePicker`](/en-US/time-range-picker) as the panel. Top summaries are omitted; paired wheels edit start (left) and end (right) together.

- Uses column wheels by default (hour / minute / second)

### Default and controlled values

`defaultValue` initializes uncontrolled fields/panels once; subsequent edits are retained locally. `modelValue` is authoritative when provided. `defaultOpen` initializes field visibility once. Controlled `open` requires the parent to accept `update:open`; `open-change(open: boolean)` reports requests. `clear` has no arguments. Panels support `disabled` for both range endpoints.

```demo
../example/demos/en-US/default-state.vue
```

Use the acceptance switches to reject value or visibility requests independently. Rejected requests leave parent state unchanged; proposals are shown separately. Reopening restores the parent model. A close request does not imply parent acceptance.

When the parent rejects closing, repeated confirmation without a new selection does not commit again. A fresh time selection starts a new transaction that can be confirmed while the panel remains open.

### Selection and commit

Field `focus` and `blur` events have no arguments and fire once per transition. Moving between range endpoints stays within one field. Readonly fields remain focusable but cannot open for editing; disabling a focused field releases its focus state and notifies blur.

Fields and standalone panels revalidate the current format, steps and disabled rules at commit time. Cedar text input follows the same rules. Changing constraints does not rewrite committed values. Reversed ranges are accepted only when `show-next-day` is enabled; otherwise a red footer message is shown and confirmation is disabled. Endpoints are never swapped. Clearing commits `undefined` regardless of candidate restrictions, but still respects readonly/disabled state.

`select(value, date)` reports user draft selection; `change(value, date)` reports a committed value. Both single and range fields clear to `undefined`, with an undefined date argument and a no-argument `clear` event. Date arguments represent local clock times (not next-day calendar arithmetic). Fields default to explicit confirmation; `disable-confirm` commits a valid choice immediately and requests close. Range confirmation rejects reversed endpoints unless `show-next-day` is enabled. Controlled `open` still requires parent acceptance. Standalone panels also default to confirmation; disable-confirm commits immediately without closing the panel.

```demo
../example/demos/en-US/selection-events.vue
```

Replacing the model from the parent resets the draft without emitting `select` or `change`. The example includes an external-update button; confirming a user selection remains a separate action.

### Copying and editing

Use open-trigger-target to control pointer opening independently. In icon mode, clicking, focusing and typing do not automatically open the panel. input-editable / filterable still controls editing or search. The suffix button, explicit keyboard commands and controlled open can open it.

```demo
../example/demos/open-trigger-target.vue
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Reading direction

Range values remain `[start, end]`; direction changes preserve endpoint order, drafts and overnight semantics. Panels and time columns follow reading order, with visual Left/Right focus movement across endpoint columns. Cedar Up/Down moves focus and Enter/Space selects; Maple retains wheel selection with Up/Down. Existing confirmation settings control submission. Popovers inherit their source direction.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

`popup-props` configures the anchored Trigger popover on both platforms. It cannot replace field open/disabled/trigger ownership. Top-level popup-container, including false, takes precedence. Panel and popup options are separate. `click(event)` fires once for an enabled field; readonly fields notify but do not open. Use `open-change(false)` for close requests, not proof that a controlled state changed. The field close event has been removed without an alias.

`suffix-icon` receives `focus: boolean` and `popupOpen: boolean`, replacing arrow-icon. `focus(index = 0)` focuses start (0) or end (1) without committing; `blur()` removes focus and requests closing.

Range `placeholder` accepts `string | string[]`: a string labels both endpoints; array entries label each endpoint, with missing entries empty. Explicit empty strings do not fall back to defaults.

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

| Arguments                 | Description                                                                                                                                                                                 | Type                                                  | Default                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `v-model`                 | Bound value                                                                                                                                                                                 | _TimeValue[]_                                         | `-`                                 |
| `default-value`           | Initial uncontrolled value                                                                                                                                                                  | _TimeValue[]_                                         | `-`                                 |
| `hide-disabled-options`   | Hide disabled time options; clock tick positions remain                                                                                                                                     | _boolean_                                             | `false`                             |
| `open`                    | Controlled popup visibility                                                                                                                                                                 | _boolean_                                             | `-`                                 |
| `default-open`            | Initial visibility                                                                                                                                                                          | _boolean_                                             | `false`                             |
| `open-trigger-target`     | Pointer opening area: field includes the whole field; icon uses only the suffix trigger. Clear/remove actions are excluded; explicit keyboard opening and controlled open remain available. | `'field' \| 'icon'`                                   | `'field'`                           |
| `disable-confirm`         | Valid selection commits immediately and requests closing                                                                                                                                    | _boolean_                                             | `false`                             |
| `panel-type`              | Panel mode: `picker`                                                                                                                                                                        | _string_                                              | `picker`                            |
| `format`                  | String parse, display and output format                                                                                                                                                     | _string_                                              | `HH:mm:ss`                          |
| `use12-hours`             | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format                                                                                                                        | _boolean_                                             | `false`                             |
| `step`                    | Candidate steps anchored at midnight; invalid values use 1                                                                                                                                  | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`                     | Minimum selectable time                                                                                                                                                                     | _string_                                              | `-`                                 |
| `max`                     | Maximum selectable time                                                                                                                                                                     | _string_                                              | `-`                                 |
| `disabled-hours`          | Disabled hours (0–23)                                                                                                                                                                       | `() => number[]`                                      | `-`                                 |
| `disabled-minutes`        | Disabled minutes for the hour                                                                                                                                                               | `(hour?: number) => number[]`                         | `-`                                 |
| `disabled-seconds`        | Disabled seconds for the hour and minute                                                                                                                                                    | `(hour?: number, minute?: number) => number[]`        | `-`                                 |
| `separator`               | Display separator                                                                                                                                                                           | _string_                                              | `~`                                 |
| `show-next-day`           | Allow end before start as next day. Otherwise reversed drafts show a red warning and disable confirmation. Endpoints never swap                                                             | _boolean_                                             | `false`                             |
| `picker-props`            | Props for `mp-picker` (picker)                                                                                                                                                              | _Partial\<PickerProps\>_                              | `{}`                                |
| `time-range-picker-props` | Props for `mp-time-range-picker`                                                                                                                                                            | _Partial\<TimeRangePickerProps\>_                     | `{}`                                |
| `popup-props`             | Props passed to popup                                                                                                                                                                       | _Partial\<TriggerProps\>_                             | `{}`                                |
| `input-editable`          | Allow text entry; panel selection remains available                                                                                                                                         | _boolean_                                             | `false`                             |
| `placeholder`             | Endpoint placeholders; a string labels both endpoints                                                                                                                                       | _string \| string[]_                                  | `-`                                 |
| `clearable`               | Whether the value can be cleared                                                                                                                                                            | _boolean_                                             | `false`                             |
| `disabled`                | Whether disabled                                                                                                                                                                            | _boolean_                                             | `false`                             |
| `readonly`                | Whether readonly                                                                                                                                                                            | _boolean_                                             | `false`                             |
| `size`                    | Size: `xs` `sm` `md` `lg` `xl`                                                                                                                                                              | _ComponentSize_                                       | `md`                                |
| `variant`                 | Variant: `filled` `standard` `outline`                                                                                                                                                      | _string_                                              | `standard`                          |

### Events

| Event         | Description                              | Arguments                                                 |
| ------------- | ---------------------------------------- | --------------------------------------------------------- |
| `focus`       | Focused                                  | `-`                                                       |
| `blur`        | Blur                                     | `-`                                                       |
| `change`      | Committed value                          | _value: string[] \| undefined, date: Date[] \| undefined_ |
| `select`      | User draft selection                     | _value: string[], date: Date[]_                           |
| `clear`       | Clear the selection                      | `-`                                                       |
| `open-change` | Visibility request                       | _open: boolean_                                           |
| `click`       | Enabled field click (including readonly) | `event: Event`                                            |

### Style variables

| Variable                           | Default                                   |
| ---------------------------------- | ----------------------------------------- |
| `--mp-time-range-label-font-size`  | `16px`                                    |
| `--mp-time-range-arrow-size`       | `20px`                                    |
| `--mp-time-range-toolbar-height`   | `var(--mp-picker-toolbar-height, 44px)`   |
| `--mp-time-range-toolbar-padding`  | `var(--mp-picker-toolbar-padding, 0 4px)` |
| `--mp-time-range-title-text-color` | `var(--mp-picker-title-text-color, #555)` |
| `--mp-time-range-title-font-size`  | `var(--mp-picker-title-font-size, 16px)`  |

See [`TimeRangePicker`](#/en-US/time-range-picker) for panel style variables.

## TimeRangePicker range panel

> Source is merged into `time-range/`. Installing the parent also registers it. Static member: `TimeRange.Picker`.

### Introduction

A standalone embeddable time-range panel. It has no top summary; two wheel groups simultaneously edit start/end.

- Defaults to column wheels: hour/minute/second

Form field: [`TimeRange`](/en-US/time-range). Single time panel: [`TimePicker`](/en-US/time-picker).

### Basic usage

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" />
</template>
```

### 24-hour format and seconds

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

### Next-day marker

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" show-next-day />
</template>
```

With `show-next-day`, an earlier end is next day and marked accordingly. Otherwise a bottom red warning disables confirmation. Selection/confirmation never swap endpoints; Now updates only the current endpoint.

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

Pure-panel `disable-confirm: boolean = false` skips confirmation and commits immediately. Custom `actions` must call slot `confirm()` and disable invalid submissions according to `canConfirm`.

### Props

| Arguments               | Description                                                                                              | Type                                                  | Default                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `v-model`               | Bound value                                                                                              | _TimeValue[]_                                         | `-`                                 |
| `default-value`         | Initial uncontrolled value                                                                               | _TimeValue[]_                                         | `-`                                 |
| `hide-disabled-options` | Hide disabled time options; clock tick positions remain                                                  | _boolean_                                             | `false`                             |
| `disabled`              | Disable panel editing                                                                                    | _boolean_                                             | `false`                             |
| `disable-confirm`       | Hide confirmation; valid selections commit immediately                                                   | _boolean_                                             | `false`                             |
| `presentation`          | Panel mode: `picker`                                                                                     | _string_                                              | `picker`                            |
| `format`                | String parse, display and output format                                                                  | _string_                                              | `HH:mm:ss`                          |
| `use12-hours`           | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format                                     | _boolean_                                             | `false`                             |
| `step`                  | Candidate steps anchored at midnight; invalid values use 1                                               | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`                   | Minimum selectable time                                                                                  | _string_                                              | `-`                                 |
| `max`                   | Maximum selectable time                                                                                  | _string_                                              | `-`                                 |
| `disabled-hours`        | Disabled hours (0–23)                                                                                    | `() => number[]`                                      | `-`                                 |
| `disabled-minutes`      | Disabled minutes for the hour                                                                            | `(hour?: number) => number[]`                         | `-`                                 |
| `disabled-seconds`      | Disabled seconds for the hour and minute                                                                 | `(hour?: number, minute?: number) => number[]`        | `-`                                 |
| `show-next-day`         | Allow end before start as next day; otherwise reversed drafts show red warnings and disable confirmation | _boolean_                                             | `false`                             |
| `picker-props`          | Props for `mp-picker` (picker)                                                                           | _Partial\<PickerProps\>_                              | `{}`                                |
| `readonly`              | Whether readonly                                                                                         | _boolean_                                             | `false`                             |
| `elevation`             | Elevation level, options `true` `false` and level of `0-24`                                              | _number \| boolean_                                   | `false`                             |

### Disabling rules

Clock/wheels share three callbacks returning disabled-value arrays; hours always use 0–23. Hours/minutes without valid descendants are omitted from wheels.

### Events

| Event    | Description          | Callback arguments                                        |
| -------- | -------------------- | --------------------------------------------------------- |
| `change` | Committed value      | _value: string[] \| undefined, date: Date[] \| undefined_ |
| `select` | User draft selection | _value: string[], date: Date[]_                           |

### Slots

| Name      | Description                       | Arguments                                             |
| --------- | --------------------------------- | ----------------------------------------------------- |
| `actions` | Replace panel confirmation action | _{ confirm: () => void, canConfirm: boolean, value }_ |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable                                     | Default                                        |
| -------------------------------------------- | ---------------------------------------------- |
| `--mp-time-range-picker-values-height`       | `56px`                                         |
| `--mp-time-range-picker-values-font-size`    | `20px`                                         |
| `--mp-time-range-picker-values-font-weight`  | `500`                                          |
| `--mp-time-range-picker-value-color`         | `var(--mp-color-text-3)`                       |
| `--mp-time-range-picker-value-active-color`  | `var(--mp-color-primary)`                      |
| `--mp-time-range-picker-value-arrow-color`   | `var(--mp-color-border-2)`                     |
| `--mp-time-range-picker-value-arrow-size`    | `18px`                                         |
| `--mp-time-range-picker-next-day-color`      | `var(--mp-sys-color-content-secondary)`        |
| `--mp-time-range-picker-column-label-height` | `var(--mp-temporal-panel-column-label-height)` |
| `--mp-time-range-picker-border-radius`       | `var(--mp-time-picker-border-radius, 4px)`     |
| `--mp-time-range-picker-background`          | `var(--mp-sys-color-surface-overlay)`          |

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

Headers follow hour/minute/second format and align with both wheel groups; 12-hour mode adds AM/PM. No top summary or visible endpoint labels appear. Left edits start, right edits end; cross-day status appears below the right group.

Shared style variables:

| Token                                        | Default                                                       |
| -------------------------------------------- | ------------------------------------------------------------- |
| `--mp-temporal-panel-inset`                  | `12px`                                                        |
| `--mp-temporal-panel-column-label-height`    | `36px`                                                        |
| `--mp-temporal-panel-column-label-font-size` | `13px`                                                        |
| `--mp-temporal-panel-radius`                 | `12px`                                                        |
| `--mp-temporal-panel-group-gap`              | `24px`                                                        |
| `--mp-temporal-panel-touch-height`           | `44px`                                                        |
| `--mp-temporal-panel-selection-background`   | `var(--mp-color-fill-2)`                                      |
| `--mp-temporal-panel-active-background`      | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |

Range panels provide Now by default. Start is initially current; using the right wheel makes end current. Now changes only that endpoint's draft. Even with `disable-confirm`, Now/subsequent edits require confirmation; cancel discards them. Format/step/disabling rules apply, and next-day/order checks update immediately. Fields, independent panels and popups behave alike; top-level `:show-now-button="false"` hides it. Custom `actions` can use `selectNow()`/`nowDisabled`.

### Forwarded configuration boundaries (F07)

Existing TimePopupPresentationProps and runtime filtering remain. Fields own open/defaultOpen, disabled, trigger, closeOnClickReference, preventFocus and expansion updates. Explicit top-level popup-container takes precedence, otherwise nested configuration is used. popupClass merges internal classes. Inline popupOffset stays 4; Maple also fixes unmountOnClose=true. Such fields in old types are not guaranteed to control final values. Existing Time types/runtime behavior are not narrowed here.

## Configuring the cleared value

`empty-value` / `emptyValue` sets the model value produced by clearing. It accepts a value in the component model type or a zero-argument factory. Omission preserves the existing default; use `() => undefined` to distinguish omission from returning undefined. Arrays are shallow-copied on every clear; selected items that cannot be cleared remain. It does not redefine emptiness, alter Form reset defaults or treat 0/false as universally empty.

## Visible wheel fields

`time-fields` controls time-wheel visibility/order, shared by both endpoints and by fields/independent panels.

| Prop          | Type                       | Default                                 | Description                                                  |
| ------------- | -------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| `time-fields` | readonly TimePickerField[] | Generated from the time-format protocol | Controls time wheels, including those embedded in calendars. |

Arrays must be nonempty and unique; explicit arrays strictly determine column visibility/order. Omission uses defaults. Date/time field groups validate separately and cannot mix. Hidden units retain existing values and merge back into the complete draft. Changing field configuration does not commit the model. Nested display options cannot override root props.

Time/TimeRange format retains parsing/display/output semantics. time-fields controls panel columns only. Hidden units already in the model retain their values. 12-hour mode adds AM/PM automatically when hour is visible.

```vue
../../time/example/demos/time-fields.vue
```
