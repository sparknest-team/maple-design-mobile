# DateRange

### Rejected controlled close

The parent may reject a close request and keep the range panel open. Repeating confirmation of one selection neither submits nor requests another close. Changing an endpoint starts a new confirmation transaction. In calendar mode, the first click chooses a new start and the second chooses the end; an equal controlled-array rerender preserves the first click.

```demo
../example/demos/en-US/rejected-close.vue
```

### Date value formats

Both libraries independently copy the same value, validation and transaction logic. Year/month/date model formats default to `YYYY`, `YYYY-MM`, `YYYY-MM-DD`; date-time defaults to seconds. Set `:use-seconds="false"` for minute precision. `format` controls labels; `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/date calendar, wheel and clock presentations; week/quarter remain Cedar presentation capabilities.

### Intro

Form date-range **field** that opens [`DateRangePicker`](/en-US/date-range-picker). Same interaction as `Date`: Cancel discards draft; Confirm writes `v-model`.

- Uses column wheels by default (year / month / day, determined by `type`)
- `presentation="calendar"`: calendar panel
- `show-time`: date+time column rollers (aligned with Cedar)

### Basic Usage

In wheel mode, tapping the end input activates the end editor. Switching sides only changes the draft until Confirm. Moving focus between inputs does not blur the whole field. Calendar mode still selects a range with two date choices.

Endpoint headings and date/time view controls are native buttons: Tab focuses them and Enter/Space activates them; `aria-pressed` identifies the active editor or view. Reopening can retain the last active endpoint, so explicitly select the start or end before editing. Cancel restores committed values; switching editors never commits by itself.

```demo
../example/demos/en-US/basic-usage.vue
```

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

### Disabled

```demo
../example/demos/en-US/disabled.vue
```

### With FormItem

```demo
../example/demos/en-US/with-form-item.vue
```

### Bounds and endpoint rules

```demo
../example/demos/en-US/boundaries.vue
```

## API

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
| `presentation`            | Panel mode: `calendar` `picker`                                   | _string_                          | `picker`   |
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

```demo
../example/demos/en-US/entry-boundary.vue
```

## DateRangePicker
Pure panels do not accept open/default-open, popup-container, placement, trigger-props, placeholder, variant or clearable. disable-confirm controls confirmation; actions receives { confirm, disabled }. Panels support independent app.use installation. Root and date/date-range subpaths export components, Props, Instance, Type, Options and Emits; no standalone date-picker/date-range-picker npm subpath exists.


> 源码已并入 `date-range/`，安装父组件时一并注册。静态成员：`DateRange.Picker`。

### Intro

Date range selection **panel**. Embed alone when you only need the panel.

- Uses column wheels by default; with `show-time`, full Y/M/D/H/M columns
- `presentation="calendar"`: calendar panel (`DatePicker` + `range`)
- `show-time` + `calendarClock` (`calendar` resolves to this): top shows date range (calendar picks range), bottom switches start/end time; clock for time
- `show-time` + `calendarPicker`: same, time uses hour/minute(/second) columns

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
| `presentation`      | Panel mode: `calendar` `picker` `calendarClock` `calendarPicker`  | _string_                      | `picker` |
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
| `time-picker-props` | Props for `mp-time-picker` (calendar + show-time)                 | _DateTimePickerOptions_  | `{}`     |
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
| `--mp-date-range-picker-value-date-font-size`   | `13px`                                  |
| `--mp-date-range-picker-value-time-font-size`   | `22px`                                  |
| `--mp-date-range-picker-column-label-height`    | `36px`                                  |
| `--mp-date-range-picker-column-label-font-size` | `13px`                                  |
| `--mp-date-range-picker-column-label-color`     | `var(--mp-color-text-3)`                   |
| `--mp-date-range-picker-border-radius`          | `var(--mp-date-picker-border-radius, 4px)` |
| `--mp-date-range-picker-background`             | `var(--mp-color-fill-2)`                   |

### Shortcuts and viewport

DateRangePicker supports shortcuts, shortcuts-position, preview-shortcut and picker-value/default-picker-value. Range viewport values contain two dates. Shortcuts cannot change a locked endpoint; preview does not commit. Events: update:picker-value, picker-value-change(value, dates, texts), select-shortcut(shortcut). See the Date shortcut example. DateRange fields configure these through date-range-picker-props and forward the events.

### Interaction time exchange

exchange-time defaults to true: reversed interactions exchange whole date/time endpoints. false exchanges calendar dates while keeping endpoint clock positions. Final candidates still pass endpoint rules and locked endpoint validation. Models, typed values and shortcuts are not automatically reordered. show-current only controls highlighting; range panels have no show-now-button. DateRange fields configure these through date-range-picker-props. See the Date current/range example.

Highlighting is owned by top-level show-current. Nested date-picker-props does not accept showCurrent/showNowButton.

## Month labels

Fields configure this through `dateRangePickerProps`.

`abbreviation` (boolean, default `true`) controls abbreviated month labels in the calendar month grid. Set it to `false` for full month names from the active Locale. It does not affect weekday labels, headers, wheel columns, or value formats. Range calendars use the top-level option; nested calendar options cannot override it.

### Locale and nested calendar options

Date labels, headers and actions use the library's global Locale/LocaleProvider. Cedar no longer accepts a component-level `locale`; no compatibility alias is retained. Changing language does not select or submit a value.

`DateRangePicker.datePickerProps` and `DateRange.datePickerProps` accept only `DateRangeCalendarOptions`: `hint`, `color`, `titleColor`, `buttonElevation`, `touchable`. Model, validation, viewport, presentation, elevation, abbreviation and action control stay at the range root. Unknown keys and event listeners are not forwarded. The calendar branches explicitly use calendar presentation.

Field-level appearance merges over nested `dateRangePickerProps.datePickerProps`; empty defaults no longer erase nested settings. Explicit field keys take precedence.

### Nested time and wheel views

`timePickerProps` uses `DateTimePickerOptions`: `use12Hours`, `step`, `hideDisabledOptions`, `class`, `style`. It customizes the time view only; date model, precision/format, validation and confirmation remain owned by the date component. `step` samples the view and does not silently round external values. Unknown keys and listeners are not forwarded.

`pickerProps` uses `DateWheelOptions`: `optionHeight`, `optionCount`, `class`, `style`. It applies to date and time wheels in single/range panels. Generated columns, model, toolbar, field mapping and popup state cannot be overridden. `calendarClock` explicitly displays a clock when the time tab is opened.

### Real platform capabilities

Cedar does not expose `Date.pickerProps`, `DateRange.pickerProps` or `DateRange.datePickerProps`: desktop fields do not render mobile wheels or a mobile inner-calendar plugin. Maple retains these real extensions, using DateWheelOptions and DateRangeCalendarOptions. Both libraries use `Date.datePickerProps` / `DateRange.dateRangePickerProps` to configure their full panel, and `timePickerProps` for the nested time view. Initial date/time values belong to top-level `defaultValue`, not `timePickerProps.defaultValue`.

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

`Date` / `DateRange` and their pure panels select the view through root `presentation`, defaulting to `picker`. Field `DatePickerOptions` / `DateRangePickerOptions` no longer accept the ineffective `presentation`; untyped nested selectors are filtered at runtime. Week start, viewport, shortcuts and valid appearance remain configurable. Single roots support picker/calendar/calendarClock/calendarPicker; ranges support picker/calendar. Cedar only implements its desktop calendar and does not expose empty mobile modes.

### Reactive first weekday

`dayStartOfWeek` updates the calendar headers and date columns together without changing the selected value or submitting a draft. Use the root prop on pure panels; on fields configure `datePickerProps` / `dateRangePickerProps`. The wheel view does not use weekday columns.

### Dynamic date limits

Updating or removing `min` / `max` changes selectable dates, not the existing model or draft. In Maple calendar views, day/month/year navigation availability is derived from the current viewport and both limits; removing one limit restores only that side. A released bound does not trigger selection or submission.
