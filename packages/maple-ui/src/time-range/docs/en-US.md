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

| Configuration | Purpose | Related examples |
| --------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `format` | String parse, display and output format | Field appearance and nested options, Range formats and 12-hour clocks, Visible wheel fields |
| `placeholder` | Endpoint placeholders; a string labels both endpoints | Field appearance and nested options, Range formats and 12-hour clocks, separator |
| `clearable` | Whether the value can be cleared | Range formats and 12-hour clocks, separator, next day |
| `separator` | Display separator | Field appearance and nested options, separator |
| `show-next-day` | Allow end before start as next day. Otherwise reversed drafts show a red warning and disable confirmation. Endpoints never swap | Range formats and 12-hour clocks, next day |
| `variant` | Variant: `filled` `standard` `outline` | Field appearance and nested options |

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

| Configuration | Purpose | Related examples |
| -------------- | ------------------------------------------- | ------------------------------------------ |
| `format` | String parse, display and output format | Model types and literals, Hour/minute/second steps, Time bounds |
| `min` | Minimum selectable time | Time bounds, Wheel constraints |
| `max` | Maximum selectable time | Time bounds, Wheel constraints |
| `presentation` | Panel mode: `picker` | Hour/minute/second steps |
| `use12-hours` | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | Hour/minute/second steps |
| `step` | Candidate steps anchored at midnight; invalid values use 1 | Hour/minute/second steps |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/format-model.vue
```

### Hour/minute/second steps

```demo
../example/demos/en-US/step.vue
```

Switch to a 12-hour panel without changing minute/second intervals. The explicit `HH:mm:ss` format still controls the model; AM/PM choices map to the corresponding 24-hour value.

`format` it parses string models and controls display and emitted strings. The default is `HH:mm:ss`; with `use12-hours` and no explicit format it is `hh:mm:ss a`. Use `HH:mm` to serialize minutes, and time-fields to hide wheel seconds, `hh:mm A` for uppercase AM/PM, and `[Time] HH:mm` for literal text. Models accept formatted strings, local Date objects, or millisecond timestamps; output is always a formatted string (an array for ranges). Invalid input is not normalized or written back. `min`/`max` remain 24-hour `HH:mm[:ss]` strings, and disabled callbacks always receive actual hours 0–23.

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

| Configuration | Purpose | Related examples |
| ------------- | ---------------------------------------- | ------------- |
| `format` | String parse, display and output format | With FormItem |
| `placeholder` | Endpoint placeholders; a string labels both endpoints | With FormItem |
| `clearable` | Whether the value can be cleared | With FormItem |

<!-- demo-config-notes:end -->


```demo
../example/demos/with-form-item.vue
```

## Standalone time panels

### Panel confirmation and disabled options

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ---------------------------------------- | ---------- |
| `format` | String parse, display and output format | picker seconds |
| `placeholder` | Endpoint placeholders; a string labels both endpoints | picker seconds |
| `clearable` | Whether the value can be cleared | picker seconds |

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

| Configuration | Purpose | Related examples |
| ---------------- | -------------------------------- | -------------------------------------------- |
| `format` | String parse, display and output format | Interaction state comparison, Text entry, Default and controlled values |
| `clearable` | Whether the value can be cleared | Text entry, Default and controlled values, Selection and commit |
| `disabled` | Whether disabled | Interaction state comparison, Selection and commit |
| `readonly` | Whether readonly | Interaction state comparison, Selection and commit |
| `input-editable` | Allow text entry; panel selection remains available | Text entry, Copying and editing |
| `presentation` | Panel mode: `picker` | Default and controlled values, Copying and editing |

<!-- demo-config-notes:end -->


Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### disabled

Disabled callbacks match Cedar: disabled-hours, disabled-minutes and disabled-seconds. Both views respect inclusive same-day min/max. Overnight ranges use show-next-day. Hidden seconds are evaluated as zero. Opening a field aligns its draft to a valid candidate without writing the external model; confirmation validates again. Empty or invalid drafts cannot be confirmed after rules change.

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

Range values stay `[start, end]`. LTR/RTL changes affect layout without swapping endpoints or changing cross-day meaning. Time columns and start/end panels follow reading order. Left/Right moves focus visually, including across endpoints. Cedar Up/Down moves focus and Enter/Space selects; Maple Up/Down retains wheel selection semantics. Existing draft/confirmation configuration is preserved, and popovers inherit source field direction.

## Usage notes

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `popup` and opens an editor when the value area is clicked. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(payload, done, context)` can guard saving the editor. FormItem validates the candidate first; invalid candidates keep the editor open. `open / default-open / update:open` control the editor. `#read="{ value, text }"` customizes read content. See the unified field presentation examples in Form.

Inline date/time fields retain existing confirmation policies. In popover/popup, pure panels hide confirmation tools and the editor provides one confirm/cancel pair. Standalone DatePicker/DateRangePicker/TimePicker/TimeRangePicker retain panel APIs/confirmation without inheriting Form field presentation.

Mobile date fields use `panel-type` to select calendar/wheel content; `edit-mode` controls only field editing. Standalone panel content follows each panel API and is not controlled by the field `edit-mode`.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Panel actions

Headers follow hour/minute/second format and align with both wheel groups; 12-hour mode adds AM/PM. No top summary or visible endpoint labels appear. Left edits start, right edits end; cross-day status appears below the right group.

Shared style variables:


Range panels provide Now by default. Start is initially current; using the right wheel makes end current. Now changes only that endpoint's draft. Even with `disable-confirm`, Now/subsequent edits require confirmation; cancel discards them. Format/step/disabling rules apply, and next-day/order checks update immediately. Fields, independent panels and popups behave alike; top-level `:show-now-button="false"` hides it. Custom `actions` can use `selectNow()`/`nowDisabled`.

### Forwarded configuration boundaries

The time field manages open/defaultOpen, disabled, trigger, closeOnClickReference, preventFocus and visibility updates. An explicit top-level popup-container takes precedence over nested configuration; popupClass is merged. Inline presentation fixes popupOffset=4, and Maple also fixes unmountOnClose=true, so those nested fields may not control the final values.

### Configuration

See [`TimeRangePicker`](#/en-US/time-range-picker) for panel style variables.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

`popup-props` configures the anchored Trigger popover on both platforms. It cannot replace field open/disabled/trigger ownership. Top-level popup-container, including false, takes precedence. Panel and popup options are separate. `click(event)` fires once for an enabled field; readonly fields notify but do not open. Use `open-change(false)` for close requests, not proof that a controlled state changed. 

`suffix-icon` receives `focus: boolean` and `popupOpen: boolean`, replacing arrow-icon. `focus(index = 0)` focuses start (0) or end (1) without committing; `blur()` removes focus and requests closing.

Range `placeholder` accepts `string | string[]`: a string labels both endpoints; array entries label each endpoint, with missing entries empty. Explicit empty strings do not fall back to defaults.

### Pure-panel event and slot boundaries

`TimePicker`/`TimeRangePicker` do not manage fields/popups. Pass `open`, `size`, `variant`, clearing and popup configuration to `Time`/`TimeRange`.

- `select(value, date)`: edit the draft.
- `change(value, date)`: valid confirmation with a changed value; updates the model.
- `confirm(value, date)`: every valid confirmation, including unchanged values. `disableConfirm` also emits it on valid selection commits. Disabled, readonly or invalid drafts do not emit it.
- `extra`: additional explanatory content.
- `actions({ confirm, canConfirm, value })`: replace default tools. `value` is the draft; call `confirm()` to commit and disable buttons according to `canConfirm`.

Single-time events carry formatted strings and Date objects; range events carry corresponding arrays. Use field `open-change` and `update:open` to manage the popup, and field `clear` for clearing the value.

Panels edit a draft and commit on confirmation. Cancellation or closing does not commit, while clearing commits an empty value and closes immediately. Mobile time fields do not open the software keyboard. See the combined field examples in the Date documentation.

### TimeRange Props

`input-attrs` applies to the two direct input elements. For example, `:input-attrs="[{ 'aria-label': 'Departure' }, { 'aria-label': 'Return' }]"` names each endpoint. The field owns its value, disabled, readonly, placeholder, role and popup state; shared descriptions, per-input descriptions and form errors are merged for each input. Component errors take precedence; otherwise each input retains its `aria-invalid`. `RangeInputAttributes` is exported from the component and root entries and includes native attributes and `Once` event types.

| Prop | Description | Type | Default behavior |
| --- | --- | --- | --- |
| `before-commit` | Explicit field-save guard using payload, done and context | `BeforeFieldCommit` | `undefined` |
| `blur-color` | Color while unfocused | `string` | Theme default |
| `clearable` | Allow clearing with disabled, readonly and pending guards | `boolean` | `false` |
| `default-open` | Initial uncontrolled opening, read only at creation | `boolean` | `false` |
| `default-value` | Initial uncontrolled value, read only at creation | `TimeValue[]` | `undefined` |
| `disable-confirm` | Commit a valid selection immediately; fields also request closing | `boolean` | `false` |
| `disabled` | Disable interaction; fields inherit FormItem/Form when unset | `boolean` | Inherited, finally false |
| `disabled-hours` | Return disabled hours in the 0–23 clock | `() => number[]` | `undefined` |
| `disabled-minutes` | Return disabled minutes for the selected hour | `(hour?: number) => number[]` | `undefined` |
| `disabled-seconds` | Return disabled seconds for the selected hour and minute | `(hour?: number, minute?: number) => number[]` | `undefined` |
| `edit-mode` | Field editing mode, inherited from FormItem/Form when unset | `FieldEditMode`<br>`'direct' \| 'popup'` | Inherited, finally popup |
| `empty-text` | Empty text in read-pretty mode | `string` | Inherited, finally '-' |
| `empty-value` | Clear output or factory, independent of empty-value recognition | `TimeValue[] \| null \| (() => TimeValue[] \| null \| undefined)` | `undefined` |
| `empty-values` | Empty-value recognition list, replaced rather than merged | `readonly unknown[]` | Inherited/family default |
| `error` | Field error presentation, inherited when unset | `boolean` | Inherited, finally false |
| `focus-color` | Color while focused | `string` | Theme default |
| `format` | String parsing, display and output format; 12-hour defaults include a | `string` | From use12Hours |
| `hide-disabled-options` | Hide disabled time options; clocks retain tick positions | `boolean` | `false` |
| `hint` | Floating placeholder hint, suppressed by an outer Form label | `boolean` | `true` |
| `input-editable` | Allow text input without removing panel selection | `boolean` | `false` |
| `input-attrs` | Native attributes for the start and end inputs, in order; per-input names override shared names | `RangeInputAttributes[]` | `undefined` |
| `line` | Show the field border or underline | `boolean` | `true` |
| `loading` | Manual loading feedback, independent of event return values | `boolean` | `false` |
| `loading-mode` | Field loading presentation mode | `default \| line` | `default` |
| `max` | Maximum inclusive clock time in HH:mm or HH:mm:ss | `string` | `undefined` |
| `min` | Minimum inclusive clock time in HH:mm or HH:mm:ss | `string` | `undefined` |
| `model-value` | External value; numbers and Dates retain their input kind, while normal commits output formatted strings | `TimeRangeModelValue` | `undefined` |
| `open` | Controlled field editor opening | `boolean` | `undefined` |
| `open-trigger-target` | Open by field or icon click, without restricting keyboard opening | `field \| icon` | `field` |
| `panel-type` | Panel presentation of the mobile range field | `picker` | `picker` |
| `picker-props` | Wheel presentation options, excluding owner model and rules | `TimeWheelPresentationProps` | `{}` |
| `placeholder` | Placeholder text; ranges also accept start/end arrays | `string \| string[]` | `undefined` |
| `popup-container` | Editor container; false renders in place | `PopupContainer` | Shared container default |
| `popup-props` | Popup presentation options, excluding model, state and owned events | `TimePopupPresentationProps` | `{}` |
| `read-pretty` | Read-pretty presentation without an editor, independent of readonly | `boolean` | Inherited, finally false |
| `readonly` | Readonly; fields allow focus/copy without value changes or opening editing | `boolean` | Inherited, finally false |
| `separator` | Range separator text, including an empty string | `string` | ` ~ ` |
| `show-next-day` | Ranges only: allow an earlier end time as next day without swapping endpoints | `boolean` | `false` |
| `show-now-button` | Show the now action, changing only draft and requiring confirmation | `boolean` | `true` |
| `size` | Five sizes, following field Form inheritance | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Inherited, finally md |
| `step` | Hour/minute/second steps from midnight; invalid steps fall back to 1 | `TimeStep` | Effective steps are all 1 |
| `text-color` | Content text color | `string` | Theme default |
| `time-fields` | Wheel columns and order; an explicit list controls visibility without changing format or model | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | Derived from format |
| `time-range-picker-props` | Range-panel presentation options; model, rules and state remain owned by the field | `TimePanelPresentationProps` | `{}` |
| `use12-hours` | 12-hour panel; disabled-hour callbacks still use 0–23 | `boolean` | `false` |
| `variant` | Field appearance | `filled \| outline \| standard` | `standard` |

### TimeRange Events

See the complete field events and slots section on this page for all field notifications.

Pure-panel `disable-confirm: boolean = false` skips confirmation and commits immediately. Custom `actions` must call slot `confirm()` and disable invalid submissions according to `canConfirm`.

### TimeRangePicker Props

| Prop | Description | Type | Default behavior |
| --- | --- | --- | --- |
| `default-value` | Initial uncontrolled value, read only at creation | `TimeValue[]` | `undefined` |
| `disable-confirm` | Commit a valid selection immediately; fields also request closing | `boolean` | `false` |
| `disabled` | Disable panel selection and confirmation | `boolean` | `false` |
| `disabled-hours` | Return disabled hours in the 0–23 clock | `() => number[]` | `undefined` |
| `disabled-minutes` | Return disabled minutes for the selected hour | `(hour?: number) => number[]` | `undefined` |
| `disabled-seconds` | Return disabled seconds for the selected hour and minute | `(hour?: number, minute?: number) => number[]` | `undefined` |
| `elevation` | Panel elevation; false disables its shadow | `boolean \| number` | `false` |
| `format` | String parsing, display and output format; 12-hour defaults include a | `string` | From use12Hours |
| `hide-disabled-options` | Hide disabled time options; clocks retain tick positions | `boolean` | `false` |
| `max` | Maximum inclusive clock time in HH:mm or HH:mm:ss | `string` | `undefined` |
| `min` | Minimum inclusive clock time in HH:mm or HH:mm:ss | `string` | `undefined` |
| `model-value` | Panel external value, seeding draft and accepting later changes | `TimeValue[]` | `undefined` |
| `picker-props` | Wheel presentation options, excluding owner model and rules | `TimeWheelPresentationProps` | `{}` |
| `presentation` | Presentation of the mobile standalone range panel | `picker` | `picker` |
| `readonly` | Readonly panel without draft changes or confirmation | `boolean` | `false` |
| `show-next-day` | Ranges only: allow an earlier end time as next day without swapping endpoints | `boolean` | `false` |
| `show-now-button` | Show the now action, changing only draft and requiring confirmation | `boolean` | `true` |
| `step` | Hour/minute/second steps from midnight; invalid steps fall back to 1 | `TimeStep` | Effective steps are all 1 |
| `time-fields` | Wheel columns and order; an explicit list controls visibility without changing format or model | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | Derived from format |
| `use12-hours` | 12-hour panel; disabled-hour callbacks still use 0–23 | `boolean` | `false` |

### Disabling rules

Clock/wheels share three callbacks returning disabled-value arrays; hours always use 0–23. Hours/minutes without valid descendants are omitted from wheels.

### TimeRangePicker Events

See the complete pure-panel events section on this page for all panel business notifications.

### TimeRangePicker Slots

| Name | Description | Prop |
| --------- | ---------------- | ----------------------------------------------------- |
| `actions` | Replace panel confirmation action | _{ confirm: () => boolean, canConfirm: boolean, value }_ |

## Types

### Value types

```ts
export type TimeValue = string | number | Date
```

## TimeRangePicker range panel

Installing TimeRange also registers TimeRangePicker, which is available through the static member `TimeRange.Picker`.

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

## Configuring the cleared value

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

## Visible wheel fields

`time-fields` controls time-wheel visibility/order, shared by both endpoints and by fields/independent panels.

| Prop | Type | Default | Description |
| ------------- | -------------------------- | ------------------ | --------------------------------------------------- |
| `time-fields` | readonly TimePickerField[]<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | Generated from the time-format protocol | Controls time wheels, including those embedded in calendars. |

Arrays must be nonempty and unique; explicit arrays strictly determine column visibility/order. Omission uses defaults. Date/time field groups validate separately and cannot mix. Hidden units retain existing values and merge back into the complete draft. Changing field configuration does not commit the model. Nested display options cannot override root props.

Time/TimeRange format retains parsing/display/output semantics. time-fields controls panel columns only. Hidden units already in the model retain their values. 12-hour mode adds AM/PM automatically when hour is visible.

```vue
../../time/example/demos/time-fields.vue
```

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

During deferred editing, clearing retains the configured valid empty-value and confirmation submits that empty value; null is not replaced by midnight. A newly created empty wheel panel may initialize a visible candidate without selecting or committing a model. Later explicit empty drafts in that panel are not automatically refilled. Reopening and cancelling does not publish another value.

### Field notifications and public types

Field update:modelValue/change use TimeModelValue (TimeRangeModelValue for ranges). Normal selections commit formatted strings; explicit clears retain configured null, timestamps, Date objects or range arrays accepted by the property. Auxiliary dates may be undefined; clearing a range to an empty array also yields an empty auxiliary array. Clear does not emit select. Select remains a formatted user draft, which may be incomplete for a range.

Exports TimeEmits, TimeModelValue, TimeReadScope, TimeSuffixIconScope, TimeSlots, TimeActionsScope and TimeExpose, plus TimeRangeEmits, TimeRangeModelValue, TimeRangeReadScope, TimeRangeSlots, TimeRangeActionsScope and TimeRangeExpose. Import each from the root or its component entry. Instances include the public Expose contract.

Field read receives { value, text } with a nullable model; suffix-icon receives { focus, popupOpen }; clear-icon receives a guarded clear(event?). Range fields also support separator. Cedar direct mode supports a default custom trigger, while Maple does not. Neither platform currently forwards field loading-icon, so types do not promise it. actions/extra operate on panel drafts: Cedar forwards them in direct mode; Maple forwards them during deferred editing, not direct mode. Inner confirm is not the outer final-save entry.


<!-- time-contract:start -->

### Defaults and format

Inherited, format-derived and effective-step defaults describe resolved behavior; raw Props may be undefined. Without format, the default is HH:mm:ss, or hh:mm:ss a with use12Hours=true. Bounds use 24-hour clock times, separate from Date-family valueFormat/time-zone rules.

### Field event and slot parameter types

Events notify only; listener Promises are not collected. update:modelValue and change include null, 0, Date or range arrays allowed by the clearing policy. select reports formatted draft rather than saving. Field update:open/open-change are opening requests; initialization does not notify automatically.

| Event | Arguments |
| --- | --- |
| `update:modelValue` | `TimeRangeModelValue` |
| `change` | `TimeRangeModelValue, (Date \| undefined)[] \| undefined` |
| `select` | `(string \| undefined)[] \| undefined, (Date \| undefined)[] \| undefined` |
| `clear` | `()` |
| `click` | `Event` |
| `focus` | `()` |
| `blur` | `()` |
| `update:open` | `boolean` |
| `open-change` | `boolean` |

Field focus(index?)/blur() target the actual input or trigger without changing model. read receives value/text, suffix-icon receives focus/popupOpen, and clear-icon receives guarded clear(event?). prefix, selected, suffix and extra are unscoped; ranges also have separator. Cedar direct mode has a custom default trigger slot; Maple does not.

actions/extra belong to panel draft: Cedar direct forwards them, Maple direct does not, and deferred editing forwards them. Panel confirm() is not the outer field final-save entry point. Pure panels have actions/extra, without field read/clear-icon/loading-icon slots. Standalone panels expose no ref.confirm() method; custom confirmation uses actions.confirm.

### Panel event parameter types

Arguments are tuples from the corresponding public event type. Date arguments are parsed from formatted clock times and do not promise to preserve an input Date calendar day.

| Event | Arguments |
| --- | --- |
| `update:modelValue` | `TimeRangePickerEmits['update:modelValue']` |
| `change` | `TimeRangePickerEmits['change']` |
| `select` | `TimeRangePickerEmits['select']` |
| `confirm` | `TimeRangePickerEmits['confirm']` |

### Panel Events

Pure-panel business events are update:modelValue, change, select and confirm. select reports candidates; valid confirmation notifies confirm, while update:modelValue/change only occur for an actual value change. Field opening, clearing and focus events do not belong to pure panels.

Complete panel actions scope below; extra has no arguments.

```ts
import type { TimeValue } from '@maple-design/ui'
type PanelActionsScope = { confirm: () => boolean; canConfirm: boolean; value: Array<TimeValue | undefined> | undefined; selectNow: () => boolean; nowDisabled: boolean }
```

### Explicit save guard

beforeCommit(payload, done, context) belongs to field saving. payload contains value/previousValue; context has signal and optional event. Returning undefined waits for done, while boolean/Promise results settle by their result. FormItem validates candidates first; failure retains draft. Ordinary select/change/confirm/click listener returns do not use this task protocol.

### Type imports

```ts
import { TimeRange, TimeRangePicker, type TimeRangeProps, type TimeRangeEmits,
  type TimeRangeSlots, type TimeRangeInstance, type TimeRangePickerProps,
  type TimeRangePickerEmits, type TimeRangePickerSlots } from '@maple-design/ui'
```

<!-- time-contract:end -->

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-time-range-picker-background` | `var(--mp-sys-color-surface-overlay)` | `background`, `background-image` |
| `--mp-time-range-picker-border-radius` | `var(--mp-time-picker-border-radius, 4px)` | `border-radius` |
| `--mp-time-range-picker-column-label-height` | `var(--mp-internal-temporal-panel-column-label-height)` | `height` |
| `--mp-time-range-picker-next-day-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-time-range-title-font-size` | `var(--mp-picker-title-font-size, 16px)` | `font-size` |
| `--mp-time-range-title-text-color` | `var(--mp-picker-title-text-color, #555)` | `color` |
| `--mp-time-range-toolbar-height` | `var(--mp-picker-toolbar-height, 44px)` | `height` |
| `--mp-time-range-toolbar-padding` | `var(--mp-picker-toolbar-padding, 0 4px)` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-time-range-picker-background: var(--mp-sys-color-surface-overlay);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
