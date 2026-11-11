# DateRange

Endpoint locks are provided reactively by the local mobile presentation adapter to calendars and wheels. Inherited and current locks are merged and remain intact when switching views or unlocking the other endpoint. The shared draft/confirmation owner has no mobile injection dependency; external model updates and confirm/cancel behavior are unchanged.

Floating panel height follows the visual viewport. A full calendar is visible when space permits; short windows scroll content while keeping actions visible. Override `--mp-date-picker-popover-max-height` to cap the panel (default `100dvh - 32px`). Switching back to default/Maple removes brand overrides.

The embedded example calls `confirm` from the `actions` slot and binds its `disabled` state to the submit button. Selecting a draft does not update the committed value until confirmation. Tightening bounds does not clear the existing model, but an invalid draft cannot be submitted; choose valid endpoints to submit again.
Pure panels do not accept open/default-open, popup-container, placement, trigger-props, placeholder, variant or clearable. disable-confirm controls confirmation; actions receives { confirm, disabled }. Panels support independent app.use installation. Root and date/date-range subpaths export components, Props, Instance, Type, Options and Emits; no standalone date-picker/date-range-picker npm subpath exists.

Installing DateRange also registers DateRangePicker, which is available through the static member `DateRange.Picker`.

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

| Configuration | Purpose | Related examples |
| -------------- | --------------------------- | ------------ |
| `value-format` | Model format, Date or timestamp | Appearance combinations |
| `separator` | Display separator | Custom Separator |
| `placeholder` | Placeholder | Custom Separator |
| `clearable` | Whether the value can be cleared | Custom Separator |

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

| Configuration | Purpose | Related examples |
| --------------- | --------------------------------- | -------------- |
| `value-format` | Model format, Date or timestamp | Bounds and endpoint rules |
| `format` | Display format or formatter | Bounds and endpoint rules |
| `min` | Minimum date | Bounds and endpoint rules |
| `max` | Maximum date | Bounds and endpoint rules |
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

| Configuration | Purpose | Related examples |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `format` | Display format or formatter | String models: date, month and month/day ranges, Text entry and panel selection, Date Time |
| `value-format` | Model format, Date or timestamp | String models: date, month and month/day ranges, Date Time |
| `panel-type` | Panel mode: `calendar` `picker` | String models: date, month and month/day ranges |
| `date-fields` | readonly DatePickerField[] | String models: date, month and month/day ranges |
| `disabled` | Disable all or individual endpoints | Text entry and panel selection |
| `input-editable` | Allow text entry; function format/multiple stays readonly | Text entry and panel selection |

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

| Configuration | Purpose | Related examples |
| ---------------- | ------------------------------------------------------ | -------------------------------- |
| `value-format` | Model format, Date or timestamp | Cross-month, DST and endpoint locks, Calendar Mode |
| `show-time` | Enable time selection | Cross-month, DST and endpoint locks, Calendar Mode |
| `placeholder` | Placeholder | Type, With FormItem |
| `clearable` | Whether the value can be cleared | Type, With FormItem |
| `disabled` | Disable all or individual endpoints | Cross-month, DST and endpoint locks |
| `input-editable` | Allow text entry; function format/multiple stays readonly | Cross-month, DST and endpoint locks |

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

| Configuration | Purpose | Related examples |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `panel-type` | Panel mode: `calendar` `picker` | Rejected controlled close, Field viewport and shortcut events, Field and embedded panel |
| `presentation` | Panel mode: `calendar` `picker` `calendarPicker` | Field and embedded panel, Typed passthrough configuration, Copying and editing |
| `open` | Controlled popup visibility | Rejected controlled close, Typed passthrough configuration |
| `input-editable` | Allow text entry; function format/multiple stays readonly | Field viewport and shortcut events, Copying and editing |
| `date-range-picker-props` | Props for `mp-date-range-picker` | Field viewport and shortcut events, Field and embedded panel |
| `value-format` | Model format, Date or timestamp | Interaction state comparison |

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

Year/month/day model formats default to `YYYY`, `YYYY-MM` and `YYYY-MM-DD`. Date-time values include seconds by default; use `time-fields="['hour', 'minute']"` for minute precision. `format` controls display and `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/day panels and mobile calendars and wheels; week/quarter panels are only available in Cedar.

### Intro

Form date-range **field** that opens DateRangePicker. Range panel demos are included below on this page; there is no separate date-range-picker documentation route. Same interaction as `Date`: Cancel discards draft; Confirm writes `v-model`.

- Uses the calendar by default; `panel-type="picker"` selects date columns.
- `panel-type="calendar"`: calendar panel
- `show-time`: a half-hour quick time Picker beside the calendar and a footer button for detailed time columns.

### Field viewport and shortcut events

Configure `pickerValue`, `defaultPickerValue` and shortcuts through nested `datePickerProps` / `dateRangePickerProps`; listeners inside nested objects are filtered. Listen on the field and update the nested viewport. Controlled rejection keeps the previous month; navigation does not select or commit. A valid shortcut chooses a draft under the existing confirmation policy.

| Event | Description | Parameters |
| --------------------- | -------------------------------------- | --------------------------------- |
| `update:picker-value` | Request calendar viewport update | value: DateSelection |
| `picker-value-change` | Viewport request and formatted payload | value, date(s), formatted text(s) |
| `select-shortcut` | Accepted shortcut object | shortcut: DateShortcut |

```demo
../example/demos/en-US/field-panel-tools.vue
```

### Root-only presentation selection

`Date` / `DateRange` fields select their content through root `panel-type`; standalone date panels use root `presentation`. Date and DateRange fields default to `calendar`, and standalone date panels to `calendarPicker`. Field `DatePickerOptions` / `DateRangePickerOptions` do not accept root-owned `presentation`; untyped nested selectors are filtered at runtime. Week start, viewport, shortcuts and valid appearance remain configurable. Single roots support picker/calendar/calendarPicker; ranges support picker/calendar/calendarPicker. Cedar only implements its desktop calendar and does not expose empty mobile modes.

### Reactive first weekday

`dayStartOfWeek` updates the calendar headers and date columns together without changing the selected value or submitting a draft. Use the root prop on pure panels; on fields configure `datePickerProps` / `dateRangePickerProps`. The wheel view does not use weekday columns.

### Dynamic date limits

Updating or removing `min` / `max` changes selectable dates, not the existing model or draft. In Maple calendar views, day/month/year navigation availability is derived from the current viewport and both limits; removing one limit restores only that side. A released bound does not trigger selection or submission.

### Editing and confirmation

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

Use `DateRangePopupOptions` from `@maple-design/ui-vue` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

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

### Shortcuts and calendar viewport

DateRangePicker also supports shortcuts, shortcuts-position, preview-shortcut and picker-value/default-picker-value. Range viewports have two dates; shortcuts cannot change locked endpoints and previews do not commit. Events: update:picker-value, picker-value-change(value, dates, texts), select-shortcut(shortcut). See [Date](../date/) shortcuts. DateRange fields configure/forward them through date-range-picker-props.

### Current endpoint selection

show-current controls highlighting only. Range fields provide Now by default, controlled by top-level `show-now-button` and editing only the current top-summary endpoint. Reversed ranges show a red warning and disable confirmation; disabled-date/time violations disable Now. See Date's current-date/range-policy example.

Top-level show-current alone controls highlighting. Nested date-picker-props rejects showCurrent/showNowButton to avoid ineffective/conflicting settings.

### Locale and nested calendar options

Date labels, titles and actions use each library's global Locale/Provider. Cedar removes component-level `locale` without dictionary overrides/aliases. Locale changes neither select nor commit dates.

`DateRangePicker.datePickerProps` and `DateRange.datePickerProps` accept only `DateRangeCalendarOptions`: `hint`, `color`, `titleColor`, `buttonElevation`, `touchable`. Model, validation, viewport, presentation, elevation, abbreviation and action control stay at the range root. Unknown keys and event listeners are not forwarded. The calendar branches explicitly use calendar presentation.

Field appearance merges with `dateRangePickerProps.datePickerProps`. Empty default objects preserve nested settings; explicitly supplied field keys take precedence.

### Actual platform capabilities

Cedar does not expose `Date.pickerProps`, `DateRange.pickerProps` or `DateRange.datePickerProps`. PC fields use desktop calendar panels. Maple retains real extensions via DateWheelOptions/DateRangeCalendarOptions. Both configure complete panels with `Date.datePickerProps` / `DateRange.dateRangePickerProps`. Range time wheels use `picker-props`; initial datetime belongs in top-level `defaultValue`.

### Per-instance date locale isolation

Date components use the current library Locale/Provider configuration. Each instance controls its first weekday through `day-start-of-week`, without changing the application Dayjs default locale or base locale configuration.

`value-format` is a stable English date protocol, including month-name tokens. `format` display/typed text uses the UI language. Locale changes do not rewrite models or invalidate English-month models. Numeric protocols, Date objects and timestamps remain unchanged. Chinese core/Maple locale data is integrated; other formats prefer registered Dayjs locale data and safely fall back to English when unavailable.

### Typed-input format boundaries

Date input is parsed strictly according to `format`, serialized according to `value-format`, and checked against disabled rules and bounds. Manual entry is enabled by default. Clicking edits the input; the calendar button or ArrowDown opens the panel; Enter / blur commits. Set `input-editable=false` for panel-only selection. Multiple mode and function format do not support reverse parsing and keep the input readonly; disable `input-editable` with function format. Maple does not provide week/quarter presentation modes.

### Clearing a deferred range

In deferred editing, clearing changes the draft; confirmation runs form validation and `beforeCommit` before publishing the configured `emptyValue`. Cancel restores the committed range. An untouched empty range or a half-selected range still requires complete endpoints; an explicit change from a non-empty range to an empty draft can be confirmed. Disabled/readonly fields and locked endpoints cannot be cleared. A rejected controlled open cannot publish a cleared model.

### Clear within the edit draft

```demo
../example/demos/reference-clear.vue
```

## Reading direction

Range values remain `[start, end]`; changing reading direction does not swap endpoints or commit drafts. Calendar range connections and boundary radii follow reading direction. In paged grids, Left/Right moves focus visually and Up/Down preserves date-row order. Maple endpoint editing and continuous range highlighting use different rendering paths. Explicit `shortcuts-position="left|right"` remains physical; popovers inherit the field's source direction.

## API

### DateRangePicker Props

| Prop | Description | Type | Default behavior |
| --- | --- | --- | --- |
| `abbreviation` | Use abbreviated month-grid names; false uses full month names | `boolean` | `true` |
| `date-fields` | Date wheel columns and order; an explicit list controls visibility | `readonly DatePickerField[]`<br>`DatePickerField: 'month' \| 'year' \| 'day'` | Derived from precision |
| `date-picker-props` | Allowlisted internal range-calendar presentation, excluding owned root state | `DateRangeCalendarOptions` | `{}` |
| `day-start-of-week` | First day of week for calendars, an integer from 0 to 6 | `DateWeekStart` | `0` |
| `default-picker-value` | Initial calendar viewport, read once; selected values take precedence over the current date | `DateSelection` | `undefined` |
| `default-value` | Initial uncontrolled value, read only at creation | `(DateValue \| undefined)[]` | `undefined` |
| `disable-confirm` | Commit on selection; false retains draft for confirmation | `boolean` | `true` |
| `disabled` | Disable all or lock start/end separately; fields inherit FormItem/Form when unset | `boolean \| boolean[]` | `false` |
| `disabled-date` | Return true to disable the date; side is start/end | `(date: Date, side: DateSide) => boolean`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `disabled-time` | Return disabled hour/minute/second lists for a date and endpoint | `(date: Date, side: DateSide) => DateDisabledTime`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `elevation` | Panel elevation; false disables its shadow | `boolean \| number` | `false` |
| `empty-value` | Clear output or synchronous factory, independent of emptyValues recognition | `(DateValue \| undefined)[] \| null \| (() => (DateValue \| undefined)[] \| null \| undefined)` | `undefined` |
| `format` | Display/text-input format; a function only formats without reverse text parsing | `string \| ((date: Date) => string)` | From precision/time settings |
| `interactive-mode` | Maple calendar viewport mode, independent of field editing mode | `page \| scroll \| line` | `page` |
| `max` | Inclusive maximum; a supplied invalid boundary is not silently ignored | `DateValue` | `undefined` |
| `min` | Inclusive minimum; a supplied invalid boundary is not silently ignored | `DateValue` | `undefined` |
| `model-value` | External date value; undefined is uncontrolled, null is explicitly empty | `(DateValue \| undefined)[] \| null` | `undefined` |
| `picker-props` | Maple date/time wheel presentation options, excluding the root model/rules | `DateWheelOptions` | `{}` |
| `picker-value` | Controlled calendar viewport, separate from selection; range viewports contain two dates | `DateSelection` | `undefined` |
| `presentation` | Maple standalone-panel presentation | `calendar \| picker \| calendarPicker` | `calendarPicker` |
| `preview-shortcut` | Preview shortcuts on hover/focus without committing | `boolean` | `true` |
| `readonly` | Readonly panel without candidate changes or commits | `boolean` | `false` |
| `shortcuts` | Shortcuts with values or on-demand synchronous value factories, optional format/disabled | `DateShortcut[]` | `[]` |
| `shortcuts-position` | Shortcut position | `left \| bottom \| right` | `bottom` |
| `show-current` | Highlight the current date without changing selection or model | `boolean` | `true` |
| `show-now-button` | Show the now action according to the actual panel range capabilities | `boolean` | `true` |
| `show-time` | Enable time precision/selection, with visible precision controlled by format | `boolean` | `false` |
| `time-fields` | Wheel columns and order; an explicit list controls visibility without changing format or model | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | Derived from format |
| `time-zone` | IANA time zone; an invalid zone does not fall back to a valid selectable value | `string` | System local time zone |
| `type` | Date precision; Cedar includes week/quarter, while Maple supports date/month/year | `date \| month \| year` | `date` |
| `use-virtual-scroll` | Use virtual rendering for the Maple scroll viewport | `boolean` | `true` |
| `value-format` | Serialized model format: Date, timestamp or format tokens, independent of display format | `string` | From precision/time settings |

### DateRangePicker Events

See the complete field and panel event lists on this page.

### DateRangePicker Slots

| Name | Description | Prop |
| --------- | -------------- | ---- |
| `actions` | Custom actions panel | `-` |

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

Date/date-time range fields edit only the currently selected endpoint. Neither manual selection nor Now swaps endpoints. Reversed complete ranges retain the draft, display a bottom warning and disable confirmation. Correct the current endpoint or switch through the top summary. Cancel discards unconfirmed drafts. A single endpoint in an empty form remains a draft until both endpoints are complete/valid. Bounds, disabled dates/times and endpoint locks still apply.

### Values and events

`DateValue = Date | string | number`. Invalid dates and incomplete/reversed ranges cannot commit. min/max are inclusive; strings follow value-format, while Date/timestamps are also accepted. Confirmation revalidates rules. `disabledTime` returns numeric lists from `disabledHours()`, `disabledMinutes(hour)`, `disabledSeconds(hour, minute)`. Valid pure panels emit `confirm(value, date(s), text(s))`; fields use `update:open`/`open-change`, not close. Nested panel/popup props configure presentation only, not top-level models/rules/state events. Range disabled accepts [startDisabled, endDisabled]; locked endpoints cannot be cleared/modified.

Panels edit a draft and commit on confirmation. Cancellation or closing does not commit, while clearing commits an empty value and closes immediately. DateRange allows manual entry by default; set `input-editable=false` for panel-only selection. See the combined field examples in the Date documentation.

### DateRange Props

`input-attrs` applies to the two direct input elements. For example, `:input-attrs="[{ 'aria-label': 'Departure' }, { 'aria-label': 'Return' }]"` names each endpoint. The field owns its value, disabled, readonly, placeholder, role and popup state; shared descriptions, per-input descriptions and form errors are merged for each input. Component errors take precedence; otherwise each input retains its `aria-invalid`. `RangeInputAttributes` is exported from the component and root entries and includes native attributes and `Once` event types.

When FormItem `label-attrs.for` explicitly targets one endpoint, each otherwise unnamed endpoint uses the form label and a localized start or end name. Explicit accessible names on `input-attrs` or the field take precedence. Older custom locales can provide `fieldPresentation.rangeStart` and `fieldPresentation.rangeEnd`; otherwise the existing date or time endpoint text is used.

| Prop | Description | Type | Default behavior |
| --- | --- | --- | --- |
| `before-commit` | Explicit field-save guard using payload, done and context | `BeforeFieldCommit` | `undefined` |
| `blur-color` | Color while unfocused | `string` | Theme default |
| `clearable` | Allow clearing with disabled, readonly and pending guards | `boolean` | `true` |
| `date-fields` | Date wheel columns and order; an explicit list controls visibility | `readonly DatePickerField[]`<br>`DatePickerField: 'month' \| 'year' \| 'day'` | Derived from precision |
| `date-picker-props` | Allowlisted internal range-calendar presentation, excluding owned root state | `DateRangeCalendarOptions` | `{}` |
| `date-range-picker-props` | Range-panel presentation options, with model/rules/type owned by the field | `DateRangePickerOptions` | `{}` |
| `default-open` | Initial uncontrolled opening, read only at creation | `boolean` | `false` |
| `default-value` | Initial uncontrolled value, read only at creation | `(DateValue \| undefined)[]` | `undefined` |
| `disable-confirm` | Commit on selection; false retains draft for confirmation | `boolean` | `false` |
| `disabled` | Disable all or lock start/end separately; fields inherit FormItem/Form when unset | `boolean \| boolean[]` | Inherited, finally false |
| `disabled-date` | Return true to disable the date; side is start/end | `(date: Date, side: DateSide) => boolean`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `disabled-time` | Return disabled hour/minute/second lists for a date and endpoint | `(date: Date, side: DateSide) => DateDisabledTime`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `edit-mode` | Field editing mode, inherited from FormItem/Form when unset | `FieldEditMode`<br>`'direct' \| 'popup'` | Inherited, finally popup |
| `empty-text` | Empty text in read-pretty mode | `string` | Inherited, finally '-' |
| `empty-value` | Clear output or synchronous factory, independent of emptyValues recognition | `(DateValue \| undefined)[] \| null \| (() => (DateValue \| undefined)[] \| null \| undefined)` | `undefined` |
| `empty-values` | Empty-value recognition list, replaced rather than merged | `readonly unknown[]` | Inherited/family default |
| `error` | Field error presentation, inherited when unset | `boolean` | Inherited, finally false |
| `focus-color` | Color while focused | `string` | Theme default |
| `format` | Display/text-input format; a function only formats without reverse text parsing | `string \| ((date: Date) => string)` | From precision/time settings |
| `hint` | Floating placeholder hint, suppressed by an outer Form label | `boolean` | `true` |
| `input-editable` | Allow text input without removing panel selection | `boolean` | `true` |
| `input-attrs` | Native attributes for the start and end inputs, in order; per-input names override shared names | `RangeInputAttributes[]` | `undefined` |
| `interactive-mode` | Maple calendar viewport mode, independent of field editing mode | `page \| scroll \| line` | `page` |
| `line` | Show the field border or underline | `boolean` | `true` |
| `loading` | Manual loading feedback, independent of event return values | `boolean` | `false` |
| `loading-mode` | Field loading presentation mode | `default \| line` | default |
| `max` | Inclusive maximum; a supplied invalid boundary is not silently ignored | `DateValue` | `undefined` |
| `min` | Inclusive minimum; a supplied invalid boundary is not silently ignored | `DateValue` | `undefined` |
| `model-value` | External date value; undefined is uncontrolled, null is explicitly empty | `(DateValue \| undefined)[] \| null` | `undefined` |
| `open` | Controlled field editor opening | `boolean` | `undefined` |
| `open-trigger-target` | Open by field or icon click, without restricting keyboard opening | `field \| icon` | field |
| `panel-type` | Maple field panel presentation, independent of editMode | `calendar \| picker \| calendarPicker` | `calendar` |
| `picker-props` | Maple date/time wheel presentation options, excluding the root model/rules | `DateWheelOptions` | `{}` |
| `placeholder` | A range string applies to both endpoints, arrays configure each; omitted follows Locale | `string \| string[]` | `undefined` |
| `popup-container` | Editor container; false renders in place | `PopupContainer` | Shared container default |
| `popup-props` | Trigger presentation options, filtering owned state/model/rules/control listeners at runtime | `Record<string, unknown>` | `{}` |
| `read-pretty` | Read-pretty presentation without an editor, independent of readonly | `boolean` | Inherited, finally false |
| `readonly` | Readonly; fields allow focus/copy without value changes or opening editing | `boolean` | Inherited, finally false |
| `separator` | Separator text for joined/range display, including an empty string | `string` | ` ~ ` |
| `show-now-button` | Show the now action according to the actual panel range capabilities | `boolean` | `true` |
| `show-time` | Enable time precision/selection, with visible precision controlled by format | `boolean` | `false` |
| `size` | Five sizes, following field Form inheritance | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Inherited, finally md |
| `text-color` | Content text color | `string` | Theme default |
| `time-fields` | Wheel columns and order; an explicit list controls visibility without changing format or model | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | Derived from format |
| `time-zone` | IANA time zone; an invalid zone does not fall back to a valid selectable value | `string` | System local time zone |
| `type` | Date precision; Cedar includes week/quarter, while Maple supports date/month/year | `date \| month \| year` | `date` |
| `use-virtual-scroll` | Use virtual rendering for the Maple scroll viewport | `boolean` | `true` |
| `value-format` | Serialized model format: Date, timestamp or format tokens, independent of display format | `string` | From precision/time settings |
| `variant` | Field appearance | `filled \| outline \| standard` | `standard` |

### DateRange Events

See the complete field and panel event lists on this page.

### DateRange Methods

| Method | Description | Arguments | Returns |
| ------- | ---- | ---- | ------ |
| `focus` | Focus | `-` | `-` |
| `blur` | Blur | `-` | `-` |

## Time zones and mobile calendars

`time-zone` shares Date's IANA and instant/local-string protocol. `interactive-mode="scroll"` provides virtual multimonth scrolling; line shows one week. Both support datetime and single-endpoint locking. Opening from a start/end entry edits only that endpoint's date/time. Locked entries are disabled; the other endpoint retains its instant. Both values are order-validated. See Date's `time-zone`/multimonth calendar notes.

## Configuring the cleared value

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

## Visible wheel fields

`date-fields` and `time-fields` independently control date and time columns and their order. The two groups do not interleave. Fields and standalone panels share the same props; range endpoints share the configuration.

| Prop | Type | Default | Description |
| ------------- | -------------------------- | ------------------------ | ----------------------------------------------------------- |
| `date-fields` | readonly DatePickerField[]<br>`DatePickerField: 'month' \| 'year' \| 'day'` | Generate year/month/day columns from type | year, month, day. Only date wheels are affected; the calendar grid is unchanged. |
| `time-fields` | readonly TimePickerField[]<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | Hour/minute/second | Controls time wheels, including those embedded in calendars. |

Arrays must be nonempty and unique; explicit arrays strictly determine column visibility/order. Omission uses defaults. Date/time field groups validate separately and cannot mix. Hidden units retain existing values and merge back into the complete draft. Changing field configuration does not commit the model. Nested display options cannot override root props.

Date/DateRange time areas apply only with show-time. `format` controls input text; `value-format` controls saved representation; neither determines panel columns. Unspecified datetime formats save seconds by default. For minute strings, configure both formats explicitly. Hiding year still uses the complete draft year. MM-DD alone cannot represent cross-year ranges; save complete dates for leap-year/cross-year workflows.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

Native range-input references apply string placeholders, including empty strings, to both endpoints and retain array labels by endpoint. Input placeholder visibility still follows hint. Readonly native inputs remain focusable and copyable while editing, opening and clearing are blocked. Global or endpoint disabled states take precedence over readonly. Existing omitted-placeholder defaults for each editing mode are preserved.

Native date-range references emit focus/blur without arguments: entering the input group emits focus, switching endpoints does not duplicate it, and leaving emits blur. Form receives each corresponding notification once under its existing rules. Readonly clicks still notify the original event without opening or editing. Disabled clicks do not notify or consume click.once early. Returning a Promise from an ordinary listener does not start busy state or block opening; asynchronous submission still uses explicit before-commit.

### Panel configuration

DatePicker and DateRangePicker provide standalone date selection. Use `show-current` for current-date highlighting and `picker-value` or `default-picker-value` for the displayed date.

Use showCurrent for current-date highlighting, showNowButton for selecting now, pickerValue/defaultPickerValue for the viewport, and min/max/disabledDate for selectable-value constraints. Existing field lists, abbreviation, wheel settings, appearance and actual panel capabilities remain available. loading-icon is not wired to a public panel or date-field slot and is not an available capability.


<!-- date-contract:start -->

### Values and formats

DateValue is string, number or native Date. Numbers are timestamps and 0 is not empty; modelValue=null is explicitly empty. Ranges retain broad arrays and incomplete endpoints rather than forcing a tuple; commits still validate completeness and validity. Maple general DatePicker/Date multiple selection does not widen Cedar single-value Props.

Tables list actual public properties. Inherited/precision-derived defaults describe resolved behavior; raw Props can be undefined. format controls display/text input and valueFormat controls the model protocol. Week/quarter display labels differ from model formats; function format has no reverse parser for text input.

Bounds are inclusive. Invalid supplied bounds block confirmation instead of being treated as omitted. Tightening rules does not clear the business model. disabledDate/disabledTime are explicit validation callbacks rather than asynchronous event tasks; time callbacks return disabled lists through DateDisabledTime.

### Field event parameter types

| Event | Arguments |
| --- | --- |
| `update:modelValue` | `DateRangeEmits['update:modelValue']` |
| `change` | `DateRangeEmits['change']` |
| `select` | `DateRangeEmits['select']` |
| `clear` | `DateRangeEmits['clear']` |
| `click` | `DateRangeEmits['click']` |
| `focus` | `DateRangeEmits['focus']` |
| `blur` | `DateRangeEmits['blur']` |
| `update:open` | `DateRangeEmits['update:open']` |
| `open-change` | `DateRangeEmits['open-change']` |
| `update:pickerValue` | `DateRangeEmits['update:pickerValue']` |
| `picker-value-change` | `DateRangeEmits['picker-value-change']` |
| `select-shortcut` | `DateRangeEmits['select-shortcut']` |

Field value/viewport notifications use the corresponding public Emits tuples; DateChangeArgs contains value, date(s) and text(s). Listener Promises are not awaited and do not drive loading. beforeCommit uses payload/done/context, with value/previousValue in payload and signal/optional event in context; undefined waits for done.

### Panel event parameter types

Standalone panels have the seven events below, without the old preview event. Navigation uses picker-value-change and update:pickerValue. Navigation/shortcut hover-focus preview does not imply selection or commit. Confirmation only notifies when valid; select draft is separate from committed change.

| Event | Arguments |
| --- | --- |
| `update:modelValue` | `DateRangePickerEmits['update:modelValue']` |
| `change` | `DateRangePickerEmits['change']` |
| `select` | `DateRangePickerEmits['select']` |
| `confirm` | `DateRangePickerEmits['confirm']` |
| `update:pickerValue` | `DateRangePickerEmits['update:pickerValue']` |
| `picker-value-change` | `DateRangePickerEmits['picker-value-change']` |
| `select-shortcut` | `DateRangePickerEmits['select-shortcut']` |

### DateRange Slots / Methods

Field default replaces the trigger; prefix/selected/suffix replace content, and ranges also support separator. Preserve names, endpoint distinctions and keyboard access when replacing native controls. read receives value/text, suffix-icon receives focus/popupOpen, and clear-icon receives guarded clear(event?), respecting emptyValue and disabled/readonly guards.

actions receives confirm/disabled/selectNow/nowDisabled, with both actions returning void. It has no Time-panel canConfirm/value arguments. disabled=true prevents confirmation. Standalone panels can replace the action region; the outer editing shell owns final saving in hosted editing, while the panel contributes auxiliary actions. Panel confirm is not the outer-save method.

Now capabilities follow the actual panel: Cedar single panels support it, while Cedar range panels have no now action. Maple range panels stage now for the active endpoint, preserve the other endpoint and still require confirmation. The presence of selectNow in scope does not imply every mode supports the action.

Cedar cell customizes a calendar cell with date and, for ranges, type=start/end; extra adds content. Maple Date/DatePicker page-calendar summaries support year({year}), month({year,month}), date({week,year,month,date}), range({choose}) and multiple({choose}) according to mode. Maple DateRange/DateRangePicker do not forward these single-panel summary slots, nor do scroll/line viewports promise them.

loading-icon is not wired to date fields or pure panels and is not available merely because the underlying decorator supports it. Field focus(index?)/blur() delegate to real controls. Cedar/direct-field blur closes the field popup; Maple range persistent-reference blur only clears its focus, without pretending to close the outer Drawer. Pure panels expose no focus/blur methods.

### Presentation configuration and ranges

datePickerProps/dateRangePickerProps configure presentation without overriding owned model/rules/type/control events; Maple internal range datePickerProps uses a calendar allowlist. popupProps retains a broad dictionary, with public DatePopupOptions/DateRangePopupOptions recommended and owner keys still filtered at runtime. Cedar timePickerProps configures embedded time presentation; Maple pickerProps configures wheels.

A range placeholder string applies to both endpoints; arrays configure each and missing entries are empty. readonly is separate from disabled; unset field state inherits Form. Cedar range-panel exchangeTime only handles reversed interactive candidates: true swaps their times, false retains endpoint times. It does not reorder external model/text/shortcut values. Maple does not expose this property.

### Type imports

```ts
import { DateRange, DateRangePicker, type DateRangeProps, type DateRangePickerProps,
  type DateRangeEmits, type DateRangePickerEmits, type DateValue, type DateSelection,
  type DateChangeArgs, type DateRules, type DateShortcut } from '@maple-design/ui-vue'
```

<!-- date-contract:end -->

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-date-range-picker-background` | `var(--mp-sys-color-surface-overlay)` | `background`, `background-color`, `background-image` |
| `--mp-date-range-picker-border-radius` | `var(--mp-date-picker-border-radius, 4px)` | `border-radius` |
| `--mp-date-range-picker-column-label-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-date-range-picker-column-label-font-size` | `var(--mp-internal-temporal-panel-column-label-font-size)` | `font-size` |
| `--mp-date-range-picker-column-label-height` | `var(--mp-internal-temporal-panel-column-label-height)` | `height` |
| `--mp-date-range-picker-quick-time-width` | `var(--mp-internal-temporal-panel-quick-time-width)` | `flex`, `width` |
| `--mp-date-range-picker-summary-active-background` | `var(--mp-internal-temporal-panel-summary-active-background)` | `background` |
| `--mp-date-range-picker-summary-background` | `var(--mp-internal-temporal-panel-summary-background)` | `background` |
| `--mp-date-range-picker-summary-touch-height` | `var(--mp-internal-temporal-panel-touch-height)` | `min-height` |
| `--mp-date-range-picker-value-active-color` | `var(--mp-internal-temporal-panel-summary-active-color)` | `color` |
| `--mp-date-range-picker-value-date-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-date-range-picker-values-font-weight` | `500` | `font-weight` |
| `--mp-date-range-title-font-size` | `var(--mp-picker-title-font-size, 16px)` | `font-size` |
| `--mp-date-range-title-text-color` | `var(--mp-picker-title-text-color, #555)` | `color` |
| `--mp-date-range-toolbar-height` | `var(--mp-picker-toolbar-height, 44px)` | `height` |
| `--mp-date-range-toolbar-padding` | `var(--mp-picker-toolbar-padding, 0 4px)` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-date-range-picker-background: var(--mp-sys-color-surface-overlay);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
