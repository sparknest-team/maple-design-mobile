# DateRange

Endpoint locks are provided reactively by the local mobile presentation adapter to calendars and wheels. Inherited and current locks are merged and remain intact when switching views or unlocking the other endpoint. The shared draft/confirmation owner has no mobile injection dependency; external model updates and confirm/cancel behavior are unchanged.

## Examples

### Basic Usage

Tapping either input opens the range editor. Click a top summary to choose the endpoint being edited; the calendar and wheels change only that endpoint. Changes remain drafts until confirmation.

Summary blocks have no visible start/end captions. The active endpoint is highlighted. Summary buttons and the footer view button support Tab, Enter and Space, with `aria-pressed` indicating selection. Switching views does not commit; cancel restores committed values.

```demo
../example/demos/en-US/basic-usage.vue
```

### Disabled

```demo
../example/demos/en-US/disabled.vue
```

### Rejected controlled close

The parent may reject a close request and keep the range panel open. Repeating confirmation of one selection neither submits nor requests another close. Changing an endpoint starts a new confirmation transaction. In calendar mode, the first click chooses a new start and the second chooses the end; an equal controlled-array rerender preserves the first click.

```demo
../example/demos/en-US/rejected-close.vue
```

### Date value formats

Both libraries independently copy the same value, validation and transaction logic. Year/month/date model formats default to `YYYY`, `YYYY-MM`, `YYYY-MM-DD`; date-time defaults to seconds. Set `:use-seconds="false"` for minute precision. `format` controls labels; `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/date calendar, wheel presentations; week/quarter remain Cedar presentation capabilities.

### Intro

Form date-range **field** that opens DateRangePicker. Range panel demos are included below on this page; there is no separate date-range-picker documentation route. Same interaction as `Date`: Cancel discards draft; Confirm writes `v-model`.

- Uses the calendar by default; `panel-type="picker"` selects date columns.
- `panel-type="calendar"`: calendar panel
- `show-time`: a half-hour quick time Picker beside the calendar and a footer button for detailed time columns.

### Calendar Mode

```demo
../example/demos/en-US/calendar-mode.vue
```

### Date Time

```demo
../example/demos/en-US/date-time.vue
```

### Type

```demo
../example/demos/en-US/type.vue
```

### Custom Separator

```demo
../example/demos/en-US/separator.vue
```

### With FormItem

```demo
../example/demos/en-US/with-form-item.vue
```

### Bounds and endpoint rules

On mobile, you can adjust the end date independently. Confirm commits the range; Cancel discards the draft. This demo allows September only and disables Sundays for the end date.

```demo
../example/demos/en-US/boundaries.vue
```

### Endpoint locks

Locking both endpoints does not block parent model updates, but dates and confirmation stay disabled. Unlocking the start afterward restores editing without submitting. Choosing 16 and confirming retains the new end 22 rather than restoring the old end 15.

“External range 18~22” updates the parent model directly: the pending draft synchronizes and the locked endpoint uses the new model as its baseline. This update adds no selection or confirmation events. Choosing 24 and confirming then commits 18~24, without restoring the old start.

Locking an endpoint after editing its draft does not authorize that draft to replace the committed endpoint. Confirmation stays disabled while that locked draft differs from the model. Unlocking preserves the draft and restores confirmation, but does not itself submit; explicitly confirm to commit.

An inverted candidate that would move a locked endpoint must be rejected before it changes a nested calendar draft. The committed range and displayed draft remain unchanged; a subsequent valid choice can still be confirmed. Range sorting must never silently relocate a locked endpoint.

This demo explicitly sets disable-confirm=false. With one locked endpoint, a single date choice edits only the unlocked endpoint instead of starting a new two-click range. With both locked, date candidates expose disabled semantics and confirmation is unavailable; unlocking restores editing without submitting.

Use disabled=[startLocked, endLocked] to retain a committed endpoint while editing the other draft. Confirmation writes the model; changing locks alone does not submit. Locking both endpoints blocks selection. This standalone panel does not demonstrate popup cancellation.

```demo
../example/demos/en-US/endpoint-lock.vue
```

### Appearance combinations

Use this example for booking and query date ranges. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Interaction states

Use this example for booking and query date ranges. Adjust read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

### Shared rules and events

`DateValue = Date | string | number`. Invalid dates and incomplete/reversed ranges cannot be committed. Boundaries are inclusive and use `value-format`; Date or timestamp boundaries are also accepted. Rules are rechecked at confirmation. `disabledTime` returns `disabledHours()`, `disabledMinutes(hour)` and `disabledSeconds(hour, minute)` number lists. Pure panels emit `confirm` after validation; field open state uses `update:open` / `open-change`, not `close`. Nested panel/popup props configure presentation only and cannot override models, rules or ownership listeners. Range `disabled` accepts `[startDisabled, endDisabled]`; a locked endpoint cannot be cleared or modified.

The field uses independently copied PickerField → FieldDecorator layers. Panels edit a draft; Confirm commits, Cancel/dismiss discards, and Clear commits an empty value and closes the popup. DateRange enables text entry by default; set `input-editable=false` for panel-only selection. See the Date field-protocol demo for all four field types.

### Props

| Prop                      | Description                                                       | Type                              | Default    |
| ------------------------- | ----------------------------------------------------------------- | --------------------------------- | ---------- |
| `model-value` | Controlled value | DateValue[] | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue[] | `undefined` |
| `input-editable` | Allow text entry; function format/multiple stays readonly | boolean | true |
| `format` | Display format or formatter | string / (date: Date) => string | — |
| `value-format` | Model format, Date or timestamp | string | — |
| `disable-confirm` | Commit immediately | boolean | field: false; panel: true |
| `open`                    | Controlled popup visibility                                       | _boolean_                         | `-`        |
| `default-open` | Uncontrolled initial open state | boolean | false |
| `popup-container` | Popup mount target | string / HTMLElement / (() => HTMLElement) / false | — |
| `panel-type`            | Panel mode: `calendar` `picker`                                   | _string_                          | `calendar`   |
| `type`                    | Picker type: `year` `month` `date`                                | _string_                          | `date`     |
| `show-time`               | Enable time selection                                             | _boolean_                         | `false`    |
| `use-seconds` | Default time precision; explicit format takes priority | boolean | true |
| `min`                     | Minimum date                                                      | DateValue                          | `-`        |
| `max`                     | Maximum date                                                      | DateValue                          | `-`        |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `separator`               | Display separator                                                 | _string_                          | `~`        |
| `date-picker-props`       | Appearance options for the internal calendar (allowlist)                             | _DateRangeCalendarOptions_      | `{}`       |
| `picker-props`            | Props for `mp-picker` (picker)                                    | _DateWheelOptions_          | `{}`       |
| `date-range-picker-props` | Props for `mp-date-range-picker`                                  | _DateRangePickerOptions_ | `{}`       |
| `popup-props`             | Props passed to popup                                             | _Partial\<PopupProps\>_           | `{}`       |
| `placeholder`             | Placeholder                                                       | _string_                          | `-`        |
| `clearable`               | Show clear button                                                 | _boolean_                         | `true`    |
| `disabled` | Disable all or individual endpoints | boolean / boolean[] | false |
| `readonly`                | Readonly                                                          | _boolean_                         | `false`    |
| `size`                    | Size: `xs` `sm` `md` `lg` `xl`                                    | _ComponentSize_                   | `md`       |
| `variant`                 | Variant: `filled` `standard` `outline`                           | _string_                          | `standard` |

### Events

| Event    | Description               | Arguments         |
| -------- | ------------------------- | ----------------- |
| `focus`  | Emitted on focus          | `-`               |
| `blur`   | Emitted on blur           | `-`               |
| `click`  | Emitted on click          | `event: Event`    |
| `clear` | Cleared: undefined for single, [] for multiple/range | — |
| `open-change` | Open-state change | open: boolean |
| `change` | Validated value committed | value, date(s), formatted text(s) |
| `select` | Draft selected, not necessarily committed | value, date(s), formatted text(s) |

### Methods

| Method  | Description     | Arguments | Return |
| ------- | --------------- | --------- | ------ |
| `focus` | Focus the field | `-`       | `-`    |
| `blur`  | Blur the field  | `-`       | `-`    |

### Field and embedded panel

Fields own input and popup state; panels embed directly. day-start-of-week accepts integer 0–6 (Sunday=0), with reactive range-calendar updates. Nested Options configure presentation only, not values, formats, bounds or disabled rules.

The “disable day 20 as the end” switch changes `disabled-date` dynamically. A pending 10–20 range cannot commit while blocked; the committed model stays unchanged. Unblocking only restores confirmation eligibility, without committing. Day 20 remains valid as the start.

```demo
../example/demos/en-US/entry-boundary.vue
```

## DateRangePicker

The embedded example calls `confirm` from the `actions` slot and binds its `disabled` state to the submit button. Selecting a draft does not update the committed value until confirmation. Tightening bounds does not clear the existing model, but an invalid draft cannot be submitted; choose valid endpoints to submit again.
Pure panels do not accept open/default-open, popup-container, placement, trigger-props, placeholder, variant or clearable. disable-confirm controls confirmation; actions receives { confirm, disabled }. Panels support independent app.use installation. Root and date/date-range subpaths export components, Props, Instance, Type, Options and Emits; no standalone date-picker/date-range-picker npm subpath exists.

> 源码已并入 `date-range/`，安装父组件时一并注册。静态成员：`DateRange.Picker`。

### Intro

Date range selection **panel**. Embed alone when you only need the panel.

The top summary displays start and end values in separate background blocks without captions or a chevron. Clicking a summary selects and highlights the endpoint. Existing endpoints navigate to their date; empty endpoints preserve the current calendar viewport.

- Default `calendarPicker` (`calendar` also applies): a single-selection calendar highlights only the active endpoint, without range bands. A half-hour quick time Picker appears on the right when `show-time` is enabled.
- `presentation="picker"`: date columns for the selected endpoint, using 1/2/3 columns for year/month/date.
- The footer shows the current endpoint label and date. With time enabled, its right side shows the time and a clock button. The button opens the detailed time Picker and changes to a calendar icon for returning to the date view.
- Detailed time uses 2 columns without seconds or 3 with seconds, with matching unit labels. Endpoint switching preserves the view and the other endpoint. Viewing or switching does not round or commit a time.
- Date-only ranges hide the quick time Picker and view button.

Form field: [`DateRange`](/en-US/date-range). Single date panel: [`DatePicker`](/en-US/date-picker).

### Basic Usage

```demo
../example/demos/en-US/picker-basic.vue
```

### Calendar Mode

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

### Readonly

```demo
../example/demos/en-US/picker-readonly.vue
```

### API

### Props

| Prop                | Description                                                       | Type                          | Default  |
| ------------------- | ----------------------------------------------------------------- | ----------------------------- | -------- |
| `model-value` | Controlled value | DateValue[] | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue[] | `undefined` |
| `format` | Display format or formatter | string / (date: Date) => string | — |
| `value-format` | Model format, Date or timestamp | string | — |
| `disable-confirm` | Commit immediately | boolean | field: false; panel: true |
| `presentation`      | Panel mode: `calendar` `picker` `calendarPicker`  | _string_                      | `calendarPicker` |
| `type`              | Selection type: `date` `month` `year`                             | _string_                      | `date`   |
| `day-start-of-week` | First weekday for calendar presentation (integer 0–6) | _DateWeekStart_ | `0` |
| `show-time`         | Enable time selection                                             | _boolean_                     | `false`  |
| `use-seconds` | Default time precision; explicit format takes priority | boolean | true |
| `min`               | Minimum date                                                      | DateValue                      | `-`      |
| `max`               | Maximum date                                                      | DateValue                      | `-`      |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `date-picker-props` | Appearance options for the internal calendar (allowlist)                             | _DateRangeCalendarOptions_  | `{}`     |
| `picker-props`      | Props for `mp-picker` (picker)                                    | _DateWheelOptions_      | `{}`     |
| `readonly`          | Whether readonly                                                  | _boolean_                     | `false`  |
| `elevation`         | Elevation                                                         | _number \| boolean_ | `false`  |

### Events

| Event    | Description                    | Arguments         |
| -------- | ------------------------------ | ----------------- |
| `change` | Validated value committed | value, date(s), formatted text(s) |
| `select` | Draft selected, not necessarily committed | value, date(s), formatted text(s) |

### Slots

| Slot      | Description          | Arguments |
| --------- | -------------------- | --------- |
| `actions` | Custom actions panel | `-`       |

### Style Variables

| Variable                                     | Default                                 |
| -------------------------------------------- | --------------------------------------- |
| `--mp-date-range-picker-values-height`          | `56px`                                  |
| `--mp-date-range-picker-values-font-size`       | `18px`                                  |
| `--mp-date-range-picker-values-font-weight`     | `500`                                   |
| `--mp-date-range-picker-value-color`            | `var(--mp-color-text-3)`                   |
| `--mp-date-range-picker-value-active-color`     | `var(--mp-color-primary)`                  |
| `--mp-date-range-picker-value-arrow-color`      | `var(--mp-color-border-2)`                 |
| `--mp-date-range-picker-value-arrow-size`       | `18px`                                  |
| `--mp-date-range-picker-value-date-font-size`   | `var(--mp-sys-font-size-md)` |
| `--mp-date-range-picker-value-time-font-size`   | `22px`                                  |
| `--mp-date-range-picker-time-group-gap` | `24px` |
| `--mp-date-range-picker-time-group-radius` | `12px` |
| `--mp-date-range-picker-time-selection-background` | `var(--mp-color-fill-2)` |
| `--mp-date-range-picker-summary-background` | `var(--mp-temporal-panel-summary-background)` |
| `--mp-date-range-picker-summary-active-background` | `var(--mp-temporal-panel-summary-active-background)` |
| `--mp-date-range-picker-summary-touch-height` | `44px` |
| `--mp-date-range-picker-quick-time-width` | `var(--mp-temporal-panel-quick-time-width)` |
| `--mp-date-range-picker-column-label-height`    | `var(--mp-temporal-panel-column-label-height)` |
| `--mp-date-range-picker-column-label-font-size` | `var(--mp-temporal-panel-column-label-font-size)` |
| `--mp-date-range-picker-column-label-color`     | `var(--mp-color-text-3)`                   |
| `--mp-date-range-picker-border-radius`          | `var(--mp-date-picker-border-radius, 4px)` |
| `--mp-date-range-picker-background`             | `var(--mp-sys-color-surface-overlay)`                   |

### Shortcuts and viewport

DateRangePicker supports shortcuts, shortcuts-position, preview-shortcut and picker-value/default-picker-value. Range viewport values contain two dates. Shortcuts cannot change a locked endpoint; preview does not commit. Events: update:picker-value, picker-value-change(value, dates, texts), select-shortcut(shortcut). See the Date shortcut example. DateRange fields configure these through date-range-picker-props and forward the events.

### Current endpoint selection

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

Highlighting is owned by top-level show-current. Nested date-picker-props does not accept showCurrent/showNowButton.

## Month labels

Fields configure this through `dateRangePickerProps`.

`abbreviation` (boolean, default `true`) controls abbreviated month labels in the calendar month grid. Set it to `false` for full month names from the active Locale. It does not affect weekday labels, headers, wheel columns, or value formats. Range calendars use the top-level option; nested calendar options cannot override it.

### Locale and nested calendar options

Date labels, headers and actions use the library's global Locale/LocaleProvider. Cedar no longer accepts a component-level `locale`; no compatibility alias is retained. Changing language does not select or submit a value.

`DateRangePicker.datePickerProps` and `DateRange.datePickerProps` accept only `DateRangeCalendarOptions`: `hint`, `color`, `titleColor`, `buttonElevation`, `touchable`. Model, validation, viewport, presentation, elevation, abbreviation and action control stay at the range root. Unknown keys and event listeners are not forwarded. The calendar branches explicitly use calendar presentation.

Field-level appearance merges over nested `dateRangePickerProps.datePickerProps`; empty defaults no longer erase nested settings. Explicit field keys take precedence.

### Nested time and wheel views

### Real platform capabilities

Cedar does not expose `Date.pickerProps`, `DateRange.pickerProps` or `DateRange.datePickerProps`: desktop fields do not render mobile wheels or a mobile inner-calendar plugin. Maple retains these real extensions, using DateWheelOptions and DateRangeCalendarOptions. Both libraries use `Date.datePickerProps` / `DateRange.dateRangePickerProps` to configure their full panel. Range time wheels use `pickerProps`; initial date/time values belong to top-level `defaultValue`.

### Instance locale isolation

Date owners read the library's global Locale/Provider and keep `dayStartOfWeek` per instance. They do not switch the host Dayjs default locale or overwrite its base language data. Localized date metadata is registered under each library's own namespace; component instances and source code are not shared.

`valueFormat` is a stable English date protocol, including month-name tokens; `format` display and typed text use the UI language. Language changes do not rewrite or invalidate English month-name models. Numeric default protocols, Date objects and timestamps remain unchanged. The core Chinese locales and Maple built-in languages are loaded; other formats use already registered Dayjs language data, with a safe English fallback.

### Typed format boundaries

The copied date parser strictly uses display `format`, serializes through `value-format`, and checks the existing disabled/range rules. Single/range date fields now wire real native input. Editing is enabled by default: input clicks only edit; the calendar button or ArrowDown opens the panel, and Enter/blur commits. Set `input-editable=false` for panel-only selection. Multiple/function-formatted display has no inverse text protocol and stays readonly. A function `format` has no inverse parsing protocol: disable `input-editable` and use the selection panel. Maple has no week/quarter presentation; copied parsing logic does not introduce unsupported component types.

### Text entry and panel selection

```demo
../example/demos/en-US/text-entry.vue
```

### Field viewport and shortcut events

Configure `pickerValue`, `defaultPickerValue` and shortcuts through nested `datePickerProps` / `dateRangePickerProps`; listeners inside nested objects are filtered. Listen on the field and update the nested viewport. Controlled rejection keeps the previous month; navigation does not select or commit. A valid shortcut chooses a draft under the existing confirmation policy.

| Event | Description | Parameters |
| --- | --- | --- |
| `update:picker-value` | Request calendar viewport update | value: DateSelection |
| `picker-value-change` | Viewport request and formatted payload | value, date(s), formatted text(s) |
| `select-shortcut` | Accepted shortcut object | shortcut: DateShortcut |

```demo
../example/demos/en-US/field-panel-tools.vue
```

### Root-only presentation selection

`Date` / `DateRange` fields select their content through root `panel-type`; pure panels use root `presentation`. Date and DateRange fields default to `calendar`, and standalone date panels to `calendarPicker`. Field `DatePickerOptions` / `DateRangePickerOptions` no longer accept the ineffective `presentation`; untyped nested selectors are filtered at runtime. Week start, viewport, shortcuts and valid appearance remain configurable. Single roots support picker/calendar/calendarPicker; ranges support picker/calendar. Cedar only implements its desktop calendar and does not expose empty mobile modes.

### Reactive first weekday

`dayStartOfWeek` updates the calendar headers and date columns together without changing the selected value or submitting a draft. Use the root prop on pure panels; on fields configure `datePickerProps` / `dateRangePickerProps`. The wheel view does not use weekday columns.

### Dynamic date limits

Updating or removing `min` / `max` changes selectable dates, not the existing model or draft. In Maple calendar views, day/month/year navigation availability is derived from the current viewport and both limits; removing one limit restores only that side. A released bound does not trigger selection or submission.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Inline keeps the existing date/time confirmation policy. In popup, the inner pure panel hides its toolbar and the host owns the single confirmation boundary. Standalone DatePicker, DateRangePicker, TimePicker and TimeRangePicker retain their panel API and confirmation behavior. On fields, use `panel-type` to choose calendar/picker content; `presentation` controls the field container. Standalone pickers keep their existing content `presentation`.

### Range panel interaction

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

### Disabled units inside a range

`disabled-date` restricts the start and end. A range may span disabled interior units; it is not scanned unit by unit or automatically truncated. The same rule applies to dates, months, and years. Disabled interior cells stay gray. Paging preserves the selected first endpoint and clears hover previews; reverse clicks are ordered chronologically.

Standalone DatePicker / DateRangePicker panels and inline fields share a 265px calendar width. Date and time controls appear side by side when space permits and wrap in narrow containers. Explicit `presentation="picker"` preserves wheels. Standalone confirmation and the actions slot remain owned by the panel.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

The lightning button on date-time ranges opens a localized quick-range panel. Choosing an allowed preset updates the draft only. Click Confirm to submit through the regular validation and before-commit flow and close the editor. Custom shortcuts replace the built-in ranges. Now changes only the active endpoint without swapping. Even with `disable-confirm`, Now and subsequent edits require confirmation; cancelling discards the draft. Standalone panels, inline fields and popups behave consistently; reversed ranges show a red message and disable Confirm. Set `:show-now-button="false"` to hide Now.
