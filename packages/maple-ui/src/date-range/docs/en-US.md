# DateRange

Endpoint locks are provided reactively by the local mobile presentation adapter to calendars and wheels. Inherited and current locks are merged and remain intact when switching views or unlocking the other endpoint. The shared draft/confirmation owner has no mobile injection dependency; external model updates and confirm/cancel behavior are unchanged.

Floating panels use the visual viewport instead of a half-screen cap. A full calendar is visible when space permits; short windows scroll content while keeping actions visible. Override `--mp-date-picker-popover-max-height` to cap the panel (default `100dvh - 32px`). Switching back to default/Maple removes brand overrides.

The embedded example calls `confirm` from the `actions` slot and binds its `disabled` state to the submit button. Selecting a draft does not update the committed value until confirmation. Tightening bounds does not clear the existing model, but an invalid draft cannot be submitted; choose valid endpoints to submit again.
Pure panels do not accept open/default-open, popup-container, placement, trigger-props, placeholder, variant or clearable. disable-confirm controls confirmation; actions receives { confirm, disabled }. Panels support independent app.use installation. Root and date/date-range subpaths export components, Props, Instance, Type, Options and Emits; no standalone date-picker/date-range-picker npm subpath exists.

> Source is merged into `date-range/`. Installing the parent also registers it. Static member: `DateRange.Picker`.

Fields configure this through `dateRangePickerProps`.

`abbreviation` (boolean, default `true`) controls abbreviated month labels in the calendar month grid. Set it to `false` for full month names from the active Locale. It does not affect weekday labels, headers, wheel columns, or value formats. Range calendars use the top-level option; nested calendar options cannot override it.

## Basic examples

### Basic Usage

Keep both start/end summaries at the top; click either to switch the edited endpoint. The lower summary shows the current endpoint. Each opening selects the start endpoint (or the end when only the start is locked) and returns the calendar to the start date when available, clamped to date bounds; explicitly controlled picker-value remains owned by the caller. Confirm changes the edited endpoint and cancel preserves committed values.

Summary blocks have no visible start/end captions. The active endpoint is highlighted. Summary buttons and the footer view button support Tab, Enter and Space, with `aria-pressed` indicating selection. Switching views does not commit; cancel restores committed values.

```demo
../example/demos/en-US/basic-usage.vue
```

## Appearance and date presentation

### Appearance combinations

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration  | Purpose                          | Related examples        |
| -------------- | -------------------------------- | ----------------------- |
| `value-format` | Model format, Date or timestamp  | Appearance combinations |
| `separator`    | Display separator                | Custom Separator        |
| `placeholder`  | Placeholder                      | Custom Separator        |
| `clearable`    | Whether the value can be cleared | Custom Separator        |

<!-- demo-config-notes:end -->

Use this example for booking and query date ranges. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Custom Separator

```demo
../example/demos/en-US/separator.vue
```

## Time and range rules

### Bounds and endpoint rules

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration   | Purpose                             | Related examples          |
| --------------- | ----------------------------------- | ------------------------- |
| `value-format`  | Model format, Date or timestamp     | Bounds and endpoint rules |
| `format`        | Display format or formatter         | Bounds and endpoint rules |
| `min`           | Minimum date                        | Bounds and endpoint rules |
| `max`           | Maximum date                        | Bounds and endpoint rules |
| `disabled-date` | true disables; side is start or end | Bounds and endpoint rules |

<!-- demo-config-notes:end -->

On mobile, you can adjust the end date independently. Confirm commits the range; Cancel discards the draft. This demo allows September only and disables Sundays for the end date.

```demo
../example/demos/en-US/boundaries.vue
```

### Intro

Date range selection **panel**. Embed alone when you only need the panel.

The top summary displays start and end values in separate background blocks without captions or a chevron. Clicking a summary selects and highlights the endpoint. Existing endpoints navigate to their date; empty endpoints preserve the current calendar viewport.

- Default `calendarPicker` (`calendar` also applies): a single-selection calendar highlights only the active endpoint, without range bands. A half-hour quick time Picker appears on the right when `show-time` is enabled.
- `presentation="picker"`: date columns for the selected endpoint, using 1/2/3 columns for year/month/date.
- The footer shows the current endpoint label and date. With time enabled, its right side shows the time and a clock button. The button opens the detailed time Picker and changes to a calendar icon for returning to the date view.
- Detailed time uses 2 columns without seconds or 3 with seconds, with matching unit labels. Endpoint switching preserves the view and the other endpoint. Viewing or switching does not round or commit a time.
- Date-only ranges hide the quick time Picker and view button.

Form field: [`DateRange`](/en-US/date-range). Single date panel: [`DatePicker`](/en-US/date-picker).

## Value model and text input

### String models: date, month and month/day ranges

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration    | Purpose                                                   | Related examples                                                                           |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `format`         | Display format or formatter                               | String models: date, month and month/day ranges, Text entry and panel selection, Date Time |
| `value-format`   | Model format, Date or timestamp                           | String models: date, month and month/day ranges, Date Time                                 |
| `panel-type`     | Panel mode: `calendar` `picker`                           | String models: date, month and month/day ranges                                            |
| `date-fields`    | readonly DatePickerField[]                                | String models: date, month and month/day ranges                                            |
| `disabled`       | Disable all or individual endpoints                       | Text entry and panel selection                                                             |
| `input-editable` | Allow text entry; function format/multiple stays readonly | Text entry and panel selection                                                             |

<!-- demo-config-notes:end -->

`format` controls display; `value-format` controls the model and emitted value. The examples produce `"2026-09-10"`, `"2026-09"` and `["09-10", "10-10"]` directly. `MM-DD` has no year and parsing uses the current year; it cannot express cross-year ordering or a leap day in a specific year. For those cases retain `YYYY-MM-DD` and map the submitted payload in application code. The default calendar remains page mode and the default timezone remains browser-local.

```demo
../example/demos/en-US/string-values.vue
```

### Text entry and panel selection

```demo
../example/demos/en-US/text-entry.vue
```

### Date Time

```demo
../example/demos/en-US/date-time.vue
```

## Content and presentation

### Cross-month, DST and endpoint locks

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration    | Purpose                                                   | Related examples                                   |
| ---------------- | --------------------------------------------------------- | -------------------------------------------------- |
| `value-format`   | Model format, Date or timestamp                           | Cross-month, DST and endpoint locks, Calendar Mode |
| `show-time`      | Enable time selection                                     | Cross-month, DST and endpoint locks, Calendar Mode |
| `placeholder`    | Placeholder                                               | Type, With FormItem                                |
| `clearable`      | Whether the value can be cleared                          | Type, With FormItem                                |
| `disabled`       | Disable all or individual endpoints                       | Cross-month, DST and endpoint locks                |
| `input-editable` | Allow text entry; function format/multiple stays readonly | Cross-month, DST and endpoint locks                |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/zoned-range.vue
```

### Calendar Mode

Fields also support Picker wheels. Use `panel-type="calendar | picker"` to switch content; the example also supports date-time ranges. Field `edit-mode` selects the container. Empty calendar summaries display “Select start / Select end”; both valid endpoints are required to confirm.

```demo
../example/demos/en-US/calendar-mode.vue
```

Picker wheels stage missing endpoints when opened and show the candidate dates in the summaries, so confirmation does not require scrolling first. An empty range starts at the same valid date/time; a missing endpoint prefers the existing endpoint. Bounds, disabled rules and endpoint locks remain enforced. Without a valid candidate, confirmation stays disabled. Initialization emits no select/change/model events: Confirm saves the draft and Cancel discards it. Returning to the calendar keeps the draft.

Field `edit-mode` selects the `direct` / `popup` container; `panel-type` selects `calendar` / `picker` content. Standalone `DateRangePicker` uses `presentation` for its content mode.

### Type

```demo
../example/demos/en-US/type.vue
```

### With FormItem

```demo
../example/demos/en-US/with-form-item.vue
```

### Endpoint locks

Locking both endpoints does not block parent model updates, but dates and confirmation stay disabled. Unlocking the start afterward restores editing without submitting. Choosing 16 and confirming retains the new end 22 rather than restoring the old end 15.

“External range 18~~22” updates the parent model directly: the pending draft synchronizes and the locked endpoint uses the new model as its baseline. This update adds no selection or confirmation events. Choosing 24 and confirming then commits 18~~24, without restoring the old start.

Locking an endpoint after editing its draft does not authorize that draft to replace the committed endpoint. Confirmation stays disabled while that locked draft differs from the model. Unlocking preserves the draft and restores confirmation, but does not itself submit; explicitly confirm to commit.

An inverted candidate that would move a locked endpoint must be rejected before it changes a nested calendar draft. The committed range and displayed draft remain unchanged; a subsequent valid choice can still be confirmed. Range sorting must never silently relocate a locked endpoint.

This demo explicitly sets disable-confirm=false. With one locked endpoint, a single date choice edits only the unlocked endpoint instead of starting a new two-click range. With both locked, date candidates expose disabled semantics and confirmation is unavailable; unlocking restores editing without submitting.

Use disabled=[startLocked, endLocked] to retain a committed endpoint while editing the other draft. Confirmation writes the model; changing locks alone does not submit. Locking both endpoints blocks selection. This standalone panel does not demonstrate popup cancellation.

```demo
../example/demos/en-US/endpoint-lock.vue
```

## Layout and arrangement

### Responsive range panels

Resize the preview container and compare the number and layout of calendar panels. Editing the start and end values remains independent of the responsive layout.

```demo
../../date/example/demos/responsive-panels.vue
```

## Standalone date panels

### Basic Usage

```demo
../example/demos/en-US/picker-basic.vue
```

### Readonly

```demo
../example/demos/en-US/picker-readonly.vue
```

### Calendar Mode

Standalone panels use `presentation="calendar | picker"` to switch between calendar and wheels. The example also supports date-time ranges. Switching content modes preserves the selection; date and date-time selections are stored separately.

```demo
../example/demos/en-US/picker-calendar.vue
```

### Date Time Range

```demo
../example/demos/en-US/picker-date-time.vue
```

### Year / Month Range

```demo
../example/demos/en-US/picker-type.vue
```

## Interaction and field configuration

### Interaction state comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration             | Purpose                                                   | Related examples                                                                        |
| ------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `panel-type`              | Panel mode: `calendar` `picker`                           | Rejected controlled close, Field viewport and shortcut events, Field and embedded panel |
| `presentation`            | Panel mode: `calendar` `picker` `calendarPicker`          | Field and embedded panel, Typed passthrough configuration, Copying and editing          |
| `open`                    | Controlled popup visibility                               | Rejected controlled close, Typed passthrough configuration                              |
| `input-editable`          | Allow text entry; function format/multiple stays readonly | Field viewport and shortcut events, Copying and editing                                 |
| `date-range-picker-props` | Props for `mp-date-range-picker`                          | Field viewport and shortcut events, Field and embedded panel                            |
| `value-format`            | Model format, Date or timestamp                           | Interaction state comparison                                                            |

<!-- demo-config-notes:end -->

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for booking and query date ranges. Adjust read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

### Rejected controlled close

The parent may reject a close request and keep the range panel open. Repeating confirmation of one selection neither submits nor requests another close. Changing an endpoint starts a new confirmation transaction. In calendar mode, the first click chooses a new start and the second chooses the end; an equal controlled-array rerender preserves the first click.

```demo
../example/demos/en-US/rejected-close.vue
```

### Date value formats

Both libraries independently copy the same value, validation and transaction logic. Year/month/date model formats default to `YYYY`, `YYYY-MM`, `YYYY-MM-DD`; date-time defaults to seconds. Use time-fields to hide wheel seconds; set format and value-format explicitly when minute strings are required. `format` controls labels; `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/date calendar, wheel presentations; week/quarter remain Cedar presentation capabilities.

### Intro

Form date-range **field** that opens DateRangePicker. Range panel demos are included below on this page; there is no separate date-range-picker documentation route. Same interaction as `Date`: Cancel discards draft; Confirm writes `v-model`.

- Uses the calendar by default; `panel-type="picker"` selects date columns.
- `panel-type="calendar"`: calendar panel
- `show-time`: a half-hour quick time Picker beside the calendar and a footer button for detailed time columns.

### Field viewport and shortcut events

Configure `pickerValue`, `defaultPickerValue` and shortcuts through nested `datePickerProps` / `dateRangePickerProps`; listeners inside nested objects are filtered. Listen on the field and update the nested viewport. Controlled rejection keeps the previous month; navigation does not select or commit. A valid shortcut chooses a draft under the existing confirmation policy.

| Event                 | Description                            | Parameters                        |
| --------------------- | -------------------------------------- | --------------------------------- |
| `update:picker-value` | Request calendar viewport update       | value: DateSelection              |
| `picker-value-change` | Viewport request and formatted payload | value, date(s), formatted text(s) |
| `select-shortcut`     | Accepted shortcut object               | shortcut: DateShortcut            |

```demo
../example/demos/en-US/field-panel-tools.vue
```

### Root-only presentation selection

`Date` / `DateRange` fields select their content through root `panel-type`; standalone date panels use root `presentation`. Date and DateRange fields default to `calendar`, and standalone date panels to `calendarPicker`. Field `DatePickerOptions` / `DateRangePickerOptions` do not accept root-owned `presentation`; untyped nested selectors are filtered at runtime. Week start, viewport, shortcuts and valid appearance remain configurable. Single roots support picker/calendar/calendarPicker; ranges support picker/calendar/calendarPicker. Cedar only implements its desktop calendar and does not expose empty mobile modes.

### Reactive first weekday

`dayStartOfWeek` updates the calendar headers and date columns together without changing the selected value or submitting a draft. Use the root prop on pure panels; on fields configure `datePickerProps` / `dateRangePickerProps`. The wheel view does not use weekday columns.

### Dynamic date limits

Updating or removing `min` / `max` changes selectable dates, not the existing model or draft. In Maple calendar views, day/month/year navigation availability is derived from the current viewport and both limits; removing one limit restores only that side. A released bound does not trigger selection or submission.

### Form field presentation and confirmation

`edit-mode` inherits from field > FormItem > Form and defaults to `popup`. Supported values are `direct / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple edit-mode="popup" opens the editor by clicking the value area; direct edits directly. readPretty is independent reading mode, separate from readonly/disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Direct editing keeps the existing date/time confirmation policy. In popup, the inner pure panel hides its toolbar and the host owns the single confirmation boundary. Standalone DatePicker, DateRangePicker, TimePicker and TimeRangePicker retain their panel API and confirmation behavior. On fields, use `panel-type` to choose calendar/picker content; `edit-mode` controls the field container. Standalone date pickers use `presentation` for panel content; time pickers follow their panel APIs.

### Range panel interaction

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

### Disabled units inside a range

`disabled-date` restricts the start and end. A range may span disabled interior units; it is not scanned unit by unit or automatically truncated. The same rule applies to dates, months, and years. Disabled interior cells stay gray. Paging preserves the selected first endpoint and clears hover previews; reverse clicks are ordered chronologically.

Standalone DatePicker / DateRangePicker panels and inline fields share a 265px calendar width. Date and time controls appear side by side when space permits and wrap in narrow containers. Explicit `presentation="picker"` preserves wheels. Standalone confirmation and the actions slot remain owned by the panel.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

The lightning button on date-time ranges opens a localized quick-range panel. Choosing an allowed preset updates the draft only. Click Confirm to submit through the regular validation and before-commit flow and close the editor. Custom shortcuts replace the built-in ranges. Now changes only the active endpoint without swapping. Even with `disable-confirm`, Now and subsequent edits require confirmation; cancelling discards the draft. Standalone panels, inline fields and popups behave consistently; reversed ranges show a red message and disable Confirm. Set `:show-now-button="false"` to hide Now.

### Field and embedded panel

Fields own input and popup state; panels embed directly. day-start-of-week accepts integer 0–6 (Sunday=0), with reactive range-calendar updates. Nested Options configure presentation only, not values, formats, bounds or disabled rules.

The “disable day 20 as the end” switch changes `disabled-date` dynamically. A pending 10–20 range cannot commit while blocked; the committed model stays unchanged. Unblocking only restores confirmation eligibility, without committing. Day 20 remains valid as the start.

```demo
../example/demos/en-US/entry-boundary.vue
```

### Typed passthrough configuration

Use `DateRangePopupOptions` from `@maple-design/ui` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

```demo
../example/demos/passthrough-options.vue
```

### Copying and editing

Use open-trigger-target to control pointer opening independently. In icon mode, clicking, focusing and typing do not automatically open the panel. input-editable / filterable still controls editing or search. The suffix button, explicit keyboard commands and controlled open can open it.

```demo
../example/demos/open-trigger-target.vue
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Reading direction

Range values remain `[start, end]` across direction changes; switching direction neither swaps endpoints nor commits drafts. Range ribbons and boundary corners follow reading order. Paged calendar grids use visual Left/Right focus movement and chronological rows. Maple endpoint editing and continuous range highlighting are separate presentations. Explicit shortcut positions `left/right` remain physical, and popovers inherit their source direction.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

Date/date-time range fields edit only the currently selected endpoint. Neither manual selection nor Now swaps endpoints. Reversed complete ranges retain the draft, display a bottom warning and disable confirmation. Correct the current endpoint or switch through the top summary. Cancel discards unconfirmed drafts. A single endpoint in an empty form remains a draft until both endpoints are complete/valid. Bounds, disabled dates/times and endpoint locks still apply.

### Shared rules and events

`DateValue = Date | string | number`. Invalid dates and incomplete/reversed ranges cannot commit. min/max are inclusive; strings follow value-format, while Date/timestamps are also accepted. Confirmation revalidates rules. `disabledTime` returns numeric lists from `disabledHours()`, `disabledMinutes(hour)`, `disabledSeconds(hour, minute)`. Valid pure panels emit `confirm(value, date(s), text(s))`; fields use `update:open`/`open-change`, not close. Nested panel/popup props configure presentation only, not top-level models/rules/state events. Range disabled accepts [startDisabled, endDisabled]; locked endpoints cannot be cleared/modified.

Fields use independently copied PickerField → FieldDecorator implementations. Panels edit drafts and write back only on confirmation; cancel/close do not write back. Clearing commits empty immediately and closes. DateRange allows typing by default; `input-editable=false` requires panel selection. See Date's unified field/commit example for all four fields.

### Props

| Arguments                 | Description                                                                                                                                                                                 | Type                                               | Default                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------- |
| `model-value`             | Controlled value                                                                                                                                                                            | DateValue[]                                        | `undefined`                 |
| `default-value`           | Uncontrolled initial value, read once                                                                                                                                                       | DateValue[]                                        | `undefined`                 |
| `input-editable`          | Allow text entry; function format/multiple stays readonly                                                                                                                                   | boolean                                            | true                        |
| `open-trigger-target`     | Pointer opening area: field includes the whole field; icon uses only the suffix trigger. Clear/remove actions are excluded; explicit keyboard opening and controlled open remain available. | `'field' \| 'icon'`                                | `'field'`                   |
| `format`                  | Display format or formatter                                                                                                                                                                 | string / (date: Date) => string                    | —                           |
| `value-format`            | Model format, Date or timestamp                                                                                                                                                             | string                                             | —                           |
| `disable-confirm`         | Commit immediately                                                                                                                                                                          | boolean                                            | Fields: false; panels: true |
| `open`                    | Controlled popup visibility                                                                                                                                                                 | _boolean_                                          | `-`                         |
| `default-open`            | Uncontrolled initial open state                                                                                                                                                             | boolean                                            | false                       |
| `popup-container`         | Popup mount target                                                                                                                                                                          | string / HTMLElement / (() => HTMLElement) / false | —                           |
| `panel-type`              | Panel mode: `calendar` `picker`                                                                                                                                                             | _string_                                           | `calendar`                  |
| `type`                    | Selection type: `year`/`month`/`date`                                                                                                                                                       | _string_                                           | `date`                      |
| `show-time`               | Enable time selection                                                                                                                                                                       | _boolean_                                          | `false`                     |
| `min`                     | Minimum date                                                                                                                                                                                | DateValue                                          | `-`                         |
| `max`                     | Maximum date                                                                                                                                                                                | DateValue                                          | `-`                         |
| `disabled-date`           | true disables; side is start or end                                                                                                                                                         | (date: Date, side: DateSide) => boolean            | —                           |
| `disabled-time`           | Disabled time lists for this date and endpoint                                                                                                                                              | (date: Date, side: DateSide) => DateDisabledTime   | —                           |
| `separator`               | Display separator                                                                                                                                                                           | _string_                                           | `~`                         |
| `date-picker-props`       | Appearance options for the internal calendar (allowlist)                                                                                                                                    | _DateRangeCalendarOptions_                         | `{}`                        |
| `picker-props`            | Props for `mp-picker` (picker)                                                                                                                                                              | _DateWheelOptions_                                 | `{}`                        |
| `date-range-picker-props` | Props for `mp-date-range-picker`                                                                                                                                                            | _DateRangePickerOptions_                           | `{}`                        |
| `popup-props`             | Props passed to popup                                                                                                                                                                       | _Partial\<PopupProps\>_                            | `{}`                        |
| `placeholder`             | Placeholder                                                                                                                                                                                 | _string_                                           | `-`                         |
| `clearable`               | Whether the value can be cleared                                                                                                                                                            | _boolean_                                          | `true`                      |
| `disabled`                | Disable all or individual endpoints                                                                                                                                                         | boolean / boolean[]                                | false                       |
| `readonly`                | Whether readonly                                                                                                                                                                            | _boolean_                                          | `false`                     |
| `size`                    | Size: `xs` `sm` `md` `lg` `xl`                                                                                                                                                              | _ComponentSize_                                    | `md`                        |
| `variant`                 | Variant: `filled` `standard` `outline`                                                                                                                                                      | _string_                                           | `standard`                  |

### Events

| Event         | Description                                          | Arguments                         |
| ------------- | ---------------------------------------------------- | --------------------------------- |
| `focus`       | Emitted on focus                                     | `-`                               |
| `blur`        | Emitted on blur                                      | `-`                               |
| `click`       | Triggered when the cell is clicked                   | `event: Event`                    |
| `clear`       | Cleared: undefined for single, [] for multiple/range | —                                 |
| `open-change` | Popup visibility changes                             | open: boolean                     |
| `change`      | Validated value committed                            | value, date(s), formatted text(s) |
| `select`      | Draft selected, not necessarily committed            | value, date(s), formatted text(s) |

### Methods

| Method  | Description | Arguments | Returns |
| ------- | ----------- | --------- | ------- |
| `focus` | Focus       | `-`       | `-`     |
| `blur`  | Blur        | `-`       | `-`     |

## Time zones and mobile calendars

`time-zone` shares Date's IANA and instant/local-string protocol. `interactive-mode="scroll"` provides virtual multimonth scrolling; line shows one week. Both support datetime and single-endpoint locking. Opening from a start/end entry edits only that endpoint's date/time. Locked entries are disabled; the other endpoint retains its instant. Both values are order-validated. See Date's `time-zone`/multimonth calendar notes.

## Configuring the cleared value

`empty-value` / `emptyValue` sets the model value produced by clearing. It accepts a value in the component model type or a zero-argument factory. Omission preserves the existing default; use `() => undefined` to distinguish omission from returning undefined. Arrays are shallow-copied on every clear; selected items that cannot be cleared remain. It does not redefine emptiness, alter Form reset defaults or treat 0/false as universally empty.

## Visible wheel fields

`date-fields` and `time-fields` independently control date and time columns and their order. The two groups do not interleave. Fields and standalone panels share the same props; range endpoints share the configuration.

| Prop          | Type                       | Default                                   | Description                                                                      |
| ------------- | -------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------- |
| `date-fields` | readonly DatePickerField[] | Generate year/month/day columns from type | year, month, day. Only date wheels are affected; the calendar grid is unchanged. |
| `time-fields` | readonly TimePickerField[] | Hour/minute/second                        | Controls time wheels, including those embedded in calendars.                     |

Arrays must be nonempty and unique; explicit arrays strictly determine column visibility/order. Omission uses defaults. Date/time field groups validate separately and cannot mix. Hidden units retain existing values and merge back into the complete draft. Changing field configuration does not commit the model. Nested display options cannot override root props.

Date/DateRange time areas apply only with show-time. `format` controls input text; `value-format` controls saved representation; neither determines panel columns. Unspecified datetime formats save seconds by default. For minute strings, configure both formats explicitly. Hiding year still uses the complete draft year. MM-DD alone cannot represent cross-year ranges; save complete dates for leap-year/cross-year workflows.

## DateRangePicker API

### Props

| Arguments           | Description                                              | Type                                             | Default                     |
| ------------------- | -------------------------------------------------------- | ------------------------------------------------ | --------------------------- |
| `model-value`       | Controlled value                                         | DateValue[]                                      | `undefined`                 |
| `default-value`     | Uncontrolled initial value, read once                    | DateValue[]                                      | `undefined`                 |
| `format`            | Display format or formatter                              | string / (date: Date) => string                  | —                           |
| `value-format`      | Model format, Date or timestamp                          | string                                           | —                           |
| `disable-confirm`   | Commit immediately                                       | boolean                                          | Fields: false; panels: true |
| `presentation`      | Panel mode: `calendar` `picker` `calendarPicker`         | _string_                                         | `calendarPicker`            |
| `type`              | Selection type: `date`/`month`/`year`                    | _string_                                         | `date`                      |
| `day-start-of-week` | First weekday for calendar presentation (integer 0–6)    | _DateWeekStart_                                  | `0`                         |
| `show-time`         | Enable time selection                                    | _boolean_                                        | `false`                     |
| `min`               | Minimum date                                             | DateValue                                        | `-`                         |
| `max`               | Maximum date                                             | DateValue                                        | `-`                         |
| `disabled-date`     | true disables; side is start or end                      | (date: Date, side: DateSide) => boolean          | —                           |
| `disabled-time`     | Disabled time lists for this date and endpoint           | (date: Date, side: DateSide) => DateDisabledTime | —                           |
| `date-picker-props` | Appearance options for the internal calendar (allowlist) | _DateRangeCalendarOptions_                       | `{}`                        |
| `picker-props`      | Props for `mp-picker` (picker)                           | _DateWheelOptions_                               | `{}`                        |
| `readonly`          | Whether readonly                                         | _boolean_                                        | `false`                     |
| `elevation`         | Elevation                                                | _number \| boolean_                              | `false`                     |

### Events

| Event    | Description                               | Callback arguments                |
| -------- | ----------------------------------------- | --------------------------------- |
| `change` | Validated value committed                 | value, date(s), formatted text(s) |
| `select` | Draft selected, not necessarily committed | value, date(s), formatted text(s) |

### Slots

| Name      | Description          | Arguments |
| --------- | -------------------- | --------- |
| `actions` | Custom actions panel | `-`       |

### Style variables

| Variable                                           | Default                                              |
| -------------------------------------------------- | ---------------------------------------------------- |
| `--mp-date-range-picker-values-height`             | `56px`                                               |
| `--mp-date-range-picker-values-font-size`          | `18px`                                               |
| `--mp-date-range-picker-values-font-weight`        | `500`                                                |
| `--mp-date-range-picker-value-color`               | `var(--mp-color-text-3)`                             |
| `--mp-date-range-picker-value-active-color`        | `var(--mp-color-primary)`                            |
| `--mp-date-range-picker-value-arrow-color`         | `var(--mp-color-border-2)`                           |
| `--mp-date-range-picker-value-arrow-size`          | `18px`                                               |
| `--mp-date-range-picker-value-date-font-size`      | `var(--mp-sys-font-size-md)`                         |
| `--mp-date-range-picker-value-time-font-size`      | `22px`                                               |
| `--mp-date-range-picker-time-group-gap`            | `24px`                                               |
| `--mp-date-range-picker-time-group-radius`         | `12px`                                               |
| `--mp-date-range-picker-time-selection-background` | `var(--mp-color-fill-2)`                             |
| `--mp-date-range-picker-summary-background`        | `var(--mp-temporal-panel-summary-background)`        |
| `--mp-date-range-picker-summary-active-background` | `var(--mp-temporal-panel-summary-active-background)` |
| `--mp-date-range-picker-summary-touch-height`      | `44px`                                               |
| `--mp-date-range-picker-quick-time-width`          | `var(--mp-temporal-panel-quick-time-width)`          |
| `--mp-date-range-picker-column-label-height`       | `var(--mp-temporal-panel-column-label-height)`       |
| `--mp-date-range-picker-column-label-font-size`    | `var(--mp-temporal-panel-column-label-font-size)`    |
| `--mp-date-range-picker-column-label-color`        | `var(--mp-color-text-3)`                             |
| `--mp-date-range-picker-border-radius`             | `var(--mp-date-picker-border-radius, 4px)`           |
| `--mp-date-range-picker-background`                | `var(--mp-sys-color-surface-overlay)`                |

### Shortcuts and calendar viewport

DateRangePicker also supports shortcuts, shortcuts-position, preview-shortcut and picker-value/default-picker-value. Range viewports have two dates; shortcuts cannot change locked endpoints and previews do not commit. Events: update:picker-value, picker-value-change(value, dates, texts), select-shortcut(shortcut). See [Date](../date/) shortcuts. DateRange fields configure/forward them through date-range-picker-props.

### Current endpoint selection

show-current controls highlighting only. Range fields provide Now by default, controlled by top-level `show-now-button` and editing only the current top-summary endpoint. Reversed ranges show a red warning and disable confirmation; disabled-date/time violations disable Now. See Date's current-date/range-policy example.

Top-level show-current alone controls highlighting. Nested date-picker-props rejects showCurrent/showNowButton to avoid ineffective/conflicting settings.

### Locale and nested calendar options

Date labels, titles and actions use each library's global Locale/Provider. Cedar removes component-level `locale` without dictionary overrides/aliases. Locale changes neither select nor commit dates.

`DateRangePicker.datePickerProps` and `DateRange.datePickerProps` accept only `DateRangeCalendarOptions`: `hint`, `color`, `titleColor`, `buttonElevation`, `touchable`. Model, validation, viewport, presentation, elevation, abbreviation and action control stay at the range root. Unknown keys and event listeners are not forwarded. The calendar branches explicitly use calendar presentation.

Field appearance merges with `dateRangePickerProps.datePickerProps`. Empty default objects no longer override nested settings; explicitly supplied field keys take precedence.

### Embedded time and wheel presentation

### Actual platform capabilities

Cedar does not expose `Date.pickerProps`, `DateRange.pickerProps` or `DateRange.datePickerProps`. PC fields do not render mobile wheels/internal mobile range-calendar plugins; ineffective props are removed without aliases. Maple retains real extensions via DateWheelOptions/DateRangeCalendarOptions. Both configure complete panels with `Date.datePickerProps` / `DateRange.dateRangePickerProps`. Range time wheels use `picker-props`; initial datetime belongs in top-level `defaultValue`.

### Per-instance date locale isolation

Date owners read local global Locale/Provider. Each instance controls week start through `day-start-of-week`. They do not change host Dayjs default locale/base language settings; date metadata is registered under library namespaces. Neither instances nor sources are shared across libraries.

`value-format` is a stable English date protocol, including month-name tokens. `format` display/typed text uses the UI language. Locale changes do not rewrite models or invalidate English-month models. Numeric protocols, Date objects and timestamps remain unchanged. Chinese core/Maple locale data is integrated; other formats prefer registered Dayjs locale data and safely fall back to English when unavailable.

### Typed-input format boundaries

The copied date parser strictly uses display `format`, serializes through `value-format`, and checks the existing disabled/range rules. Single/range date fields now wire real native input. Editing is enabled by default: input clicks only edit; the calendar button or ArrowDown opens the panel, and Enter/blur commits. Set `input-editable=false` for panel-only selection. Multiple/function-formatted display has no inverse text protocol and stays readonly. A function `format` has no inverse parsing protocol: disable `input-editable` and use the selection panel. Maple has no week/quarter presentation; copied parsing logic does not introduce unsupported component types.
