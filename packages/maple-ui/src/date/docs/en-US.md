# Date

The year panel aligns the selected year, falling back to the current year, only inside its own scroll surface. It never scrolls the outer document. Alignment runs after mounting, accounts for dialog scale transitions, and is retired on deactivation or disposal.

While expanded, the native combobox uses `aria-controls` to identify its own named popup. Closing updates the state and removes the link. `aria-label` and `aria-describedby` reach the native input. Custom selected/trigger slots must preserve accessible names, keyboard operation and state associations.

## Examples

### Basic Usage

```demo
../example/demos/en-US/basic-usage.vue
```

### Disabled

```demo
../example/demos/en-US/disabled.vue
```

### Form control size comparison

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### Date value formats

Both libraries independently copy the same value, validation and transaction logic. Year/month/date model formats default to `YYYY`, `YYYY-MM`, `YYYY-MM-DD`; date-time defaults to seconds. Set `:use-seconds="false"` for minute precision. `format` controls labels; `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/date calendar, wheel presentations; week/quarter remain Cedar presentation capabilities.

### Intro

Form date field that opens `DatePicker` in a bottom popup. Interaction matches Select picker mode: Cancel discards the draft; Confirm writes `v-model`.

### Shared field and commit protocol

Date, DateRange, Time and TimeRange use independent same-source copies of PickerField and FieldDecorator. Date/DateRange enable text entry by default (it can be disabled); Time uses its own inputEditable setting. Panels edit a draft, Confirm commits it, and Cancel or dismissal discards it. Clear commits an empty value and closes the panel. Range fields retain separate start/end values and overnight hints.

```demo
../example/demos/en-US/field-protocol.vue
```

### Rejected controlled close

The parent may reject `update:open(false)` and keep the panel open. An equal controlled-model echo does not reset the confirmed state, so repeated confirmation neither submits nor requests another close. A new date starts a new transaction. The demo shows the model, commit count, and close-request count.

```demo
../example/demos/en-US/rejected-close.vue
```

### Calendar Mode

```demo
../example/demos/en-US/calendar-mode.vue
```

### Type

```demo
../example/demos/en-US/type.vue
```

### Multiple

```demo
../example/demos/en-US/multiple.vue
```

### Date Time

```demo
../example/demos/en-US/date-time.vue
```

### With FormItem

```demo
../example/demos/en-US/with-form-item.vue
```

### Model and display formats

```demo
../example/demos/en-US/value-formats.vue
```

### Appearance combinations

Use this example for selecting a date. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Interaction states

Use this example for selecting a date. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

### Shared rules and events

`DateValue = Date | string | number`. Invalid dates and incomplete/reversed ranges cannot be committed. Boundaries are inclusive and use `value-format`; Date or timestamp boundaries are also accepted. Rules are rechecked at confirmation. `disabledTime` returns `disabledHours()`, `disabledMinutes(hour)` and `disabledSeconds(hour, minute)` number lists. Pure panels emit `confirm` after validation; field open state uses `update:open` / `open-change`, not `close`. Nested panel/popup props configure presentation only and cannot override models, rules or ownership listeners. Range `disabled` accepts `[startDisabled, endDisabled]`; a locked endpoint cannot be cleared or modified.

### Props

| Prop                | Description                                                       | Type                         | Default    |
| ------------------- | ----------------------------------------------------------------- | ---------------------------- | ---------- |
| `model-value` | Controlled value | DateValue / DateValue[] (multiple/range) | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue / DateValue[] (multiple/range) | `undefined` |
| `input-editable` | Allow text entry; function format/multiple stays readonly | boolean | true |
| `format` | Display format or formatter | string / (date: Date) => string | — |
| `value-format` | Model format, Date or timestamp | string | — |
| `disable-confirm` | Commit immediately | boolean | field: false; panel: true |
| `open`              | Controlled popup visibility                                       | _boolean_                    | `-`        |
| `default-open` | Uncontrolled initial open state | boolean | false |
| `popup-container` | Popup mount target | string / HTMLElement / (() => HTMLElement) / false | — |
| `panel-type`      | Panel mode: `picker` `calendar` `calendarPicker`  | _string_                     | `calendar`   |
| `type`              | Picker type: `year` `month` `date`                                | _string_                     | `date`     |
| `show-time`         | Enable time selection                                             | _boolean_                    | `false`    |
| `use-seconds` | Default time precision; explicit format takes priority | boolean | true |
| `multiple`          | Enable multiple select                                            | _boolean_                    | `false`    |
| `min`               | Minimum date                                                      | DateValue                     | `-`        |
| `max`               | Maximum date                                                      | DateValue                     | `-`        |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `separator`         | Display separator for multiple                                    | _string_                     | `, `       |
| `date-picker-props` | Props passed to `mp-date-picker`                                  | _DatePickerOptions_ | `{}`       |
| `popup-props`       | Props passed to popup                                             | _Partial\<PopupProps\>_      | `{}`       |
| `placeholder`       | Placeholder                                                       | _string_                     | `-`        |
| `clearable`         | Show clear button                                                 | _boolean_                    | `true`    |
| `disabled`          | Disabled                                                          | _boolean_                    | `false`    |
| `readonly`          | Readonly                                                          | _boolean_                    | `false`    |
| `size`              | Size: `xs` `sm` `md` `lg` `xl`                                    | _ComponentSize_              | `md`       |
| `variant`           | Variant: `filled` `standard` `outline`                           | _string_                     | `standard` |

### Events

| Event    | Description               | Arguments      |
| -------- | ------------------------- | -------------- |
| `focus`  | Emitted on focus          | `-`            |
| `blur`   | Emitted on blur           | `-`            |
| `click`  | Emitted on click          | `event: Event` |
| `clear` | Cleared: undefined for single, [] for multiple/range | — |
| `open-change` | Open-state change | open: boolean |
| `change` | Validated value committed | value, date(s), formatted text(s) |
| `select` | Draft selected, not necessarily committed | value, date(s), formatted text(s) |

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
| `suffix-icon` | Arrow icon       | `focus: boolean, popupOpen: boolean` |

### Field and embedded panel

Fields own input and popup state; panels embed directly. day-start-of-week accepts integer 0–6 (Sunday=0), with reactive range-calendar updates. Nested Options configure presentation only, not values, formats, bounds or disabled rules.

```demo
../example/demos/en-US/entry-boundary.vue
```

## DatePicker
Pure panels do not accept open/default-open, popup-container, placement, trigger-props, placeholder, variant or clearable. disable-confirm controls confirmation; actions receives { confirm, disabled }. Panels support independent app.use installation. Root and date/date-range subpaths export components, Props, Instance, Type, Options and Emits; no standalone date-picker/date-range-picker npm subpath exists.

> 源码已并入 `date/`，安装父组件时一并注册。静态成员：`Date.Picker`。

### Intro

Date selection **panel**. DatePicker demos are included on this page; there is no separate date-picker documentation route. See the range documentation for [`DateRangePicker`](#/en-US/date-range). Form fields: [`Date`](#/en-US/date) / [`DateRange`](#/en-US/date-range).

The embedded panel example explicitly sets `disable-confirm=false`: selecting a date edits the draft; the committed value updates only after confirmation. Changing week start or removing bounds does not commit a value. Restoring bounds does not clear the existing model; an out-of-bounds draft cannot be confirmed until a valid date is selected.

Calendar arrows have localized accessible names: previous/next month in the day panel, year in the month panel, and years in the year list. They use global Locale, allow local LocaleProvider overrides, and fall back to the global translation for missing navigation keys. Boundaries still disable navigation; changing the preview does not commit a date.

### Basic Usage

```demo
../example/demos/en-US/picker-basic.vue
```

### Calendar Mode

Standalone panels use a calendar by default and display date and time controls together. Set `presentation="picker"` explicitly to use column wheels.

```demo
../example/demos/en-US/picker-calendar.vue
```

### Month Picker

Use `type` prop to change the type of the picker. The default value of `type` is `date`.

```demo
../example/demos/en-US/picker-month.vue
```

### Multiple

Use `multiple` prop to select multiple dates, at this time, `date` is an array.

```demo
../example/demos/en-US/picker-multiple.vue
```

### Range

Use `range` prop to select date range, at this time, `date` is `[startDate, endDate]`.

```demo
../example/demos/en-US/picker-range.vue
```

### Date Limit

Use `min` and `max` prop to allow the maximum and minimum date, and use `disabled-date` prop to disable dates that cannot be selected.

```demo
../example/demos/en-US/picker-limit.vue
```

### Date Time

Enable `show-time` for date+time. `presentation` controls the UI:

-: the footer clock/calendar button switches between date and clock content
- `calendarPicker`: the same buttons switch between the calendar and hour/minute(/second) columns
- `picker`: the buttons switch between Y/M/D and hour/minute(/second) columns, preserving the other part of the value

The active button is highlighted. Date-only and time-only panels do not show these buttons. Changing views does not commit a value. Top summaries only display the value and cannot be clicked or focused.

```demo
../example/demos/en-US/picker-date-time.vue
```

### API

### Props

| Prop                | Description                                                                                   | Type                          | Default       |
| ------------------- | --------------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| `model-value` | Controlled value | DateValue / DateValue[] (multiple/range) | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue / DateValue[] (multiple/range) | `undefined` |
| `format` | Display format or formatter | string / (date: Date) => string | — |
| `value-format` | Model format, Date or timestamp | string | — |
| `disable-confirm` | Commit immediately | boolean | field: false; panel: true |
| `type`              | Picker type, optional values `date` `month` `year`                                            | _string_                      | `date`        |
| `presentation`      | Panel mode: `calendar` `picker` `calendarPicker`                              | _string_                      | `calendarPicker`      |
| `show-time`         | Enable time selection                                                                         | _boolean_                     | `false`       |
| `use-seconds` | Default time precision; explicit format takes priority | boolean | true |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `color`             | Picker color                                                                                  | _string_                      | `-`           |
| `title-color`       | Color of picker title. If not specified it will use `color` prop or the default picker color. | _string_                      | `-`           |
| `hint`              | Picker hint                                                                                   | _string_                      | `SELECT DATE` |
| `elevation`         | Elevation level, options `true` `false` and level of `0-24`                                   | _number \| boolean_ | `false`       |
| `button-elevation`  | Elevation level of Button                                                                     | _string \| number \| boolean_ | `true`        |
| `day-start-of-week` | Sets the first day of the week, starting with 0 for Sunday.                                   | _DateWeekStart_            | `0`           |
| `min`               | Minimum allowed date/month (ISO 8601 format)                                                  | DateValue                      | `-`           |
| `max`               | Maximum allowed date/month (ISO 8601 format)                                                  | DateValue                      | `-`           |
| `show-current`      | Whether to display the current date                                                           | _boolean_                     | `true`        |
| `readonly`          | readonly                                                                                      | _boolean_                     | `false`       |
| `multiple`          | Allow the selection of multiple dates                                                         | _boolean_                     | `false`       |
| `range`             | Allow the selection of date range                                                             | _boolean_                     | `false`       |
| `touchable`         | Allow switch panel by touch                                                                   | _boolean_                     | `true`        |

### Events

| Event     | Description                 | arguments                                             |
| --------- | --------------------------- | ----------------------------------------------------- |
| `preview` | Emitted after date switched | `year: number` <br>`month: number` <br>`day?: number` |
| `change` | Validated value committed | value, date(s), formatted text(s) |
| `select` | Draft selected, not necessarily committed | value, date(s), formatted text(s) |

### Slots

`weekIndex` means the nth day of the week, starting with `0` for Sunday.

| Name       | Description                          | SlotProps                                                            |
| ---------- | ------------------------------------ | -------------------------------------------------------------------- |
| `year`     | Custom the year in the title         | `year: YYYY`                                                         |
| `month`    | Custom the month in the title        | `year: YYYY` <br> `month: MM`                                        |
| `date`     | Custom the date in the title         | `year: YYYY` <br> `month: MM` <br> `date: DD` <br> `week: weekIndex` |
| `range`    | Custom the range in the title        | `choose: [startData, endDate]`                                       |
| `multiple` | Custom the multiple in the title     | `choose: ['YYYY-MM-DD' \| 'YYYY-MM']`                                |
| `actions`  | Custom the views in the action panel | `-`                                                                  |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                     | Default                |
| -------------------------------------------- | ---------------------- |
| `--mp-date-picker-border-radius`                | `4px`                  |
| `--mp-date-picker-font-size`                    | `var(--mp-font-size-md)`  |
| `--mp-date-picker-min-width`                    | `290px`                |
| `--mp-date-picker-main-color`                   | `rgba(0, 0, 0, .87)`   |
| `--mp-date-picker-title-hint-color` | `var(--mp-color-text-3)` |
| `--mp-date-picker-title-hint-font-size`         | `var(--mp-font-size-md)`  |
| `--mp-date-picker-title-height`                 | `105px`                |
| `--mp-date-picker-title-padding`                | `16px`                 |
| `--mp-date-picker-title-background` | `var(--mp-date-picker-body-background-color)` |
| `--mp-date-picker-title-color` | `var(--mp-color-text-1)` |
| `--mp-date-picker-title-year-font-size`         | `var(--mp-font-size-md)`  |
| `--mp-date-picker-title-year-font-weight`       | `500`                  |
| `--mp-date-picker-title-year-margin-bottom`     | `8px`                  |
| `--mp-date-picker-title-year-min-height`        | `21px`                 |
| `--mp-date-picker-title-date-height`            | `48px`                 |
| `--mp-date-picker-title-date-font-size`         | `34px`                 |
| `--mp-date-picker-title-date-font-weight`       | `500`                  |
| `--mp-date-picker-title-date-range-font-size`   | `20px`                 |
| `--mp-date-picker-title-date-justify-content`   | `normal`               |
| `--mp-date-picker-body-padding`                 | `0`                    |
| `--mp-date-picker-body-background-color`        | `#fff`                 |
| `--mp-date-picker-body-height`                  | `280px`                |
| `--mp-date-picker-header-arrow-filter`          | `opacity(0.54)`        |
| `--mp-date-picker-header-padding`               | `4px 16px`             |
| `--mp-date-picker-actions-padding`              | `0 8px 12px 8px`       |
| `--mp-date-picker-header-color`                 | `#555`                 |
| `--mp-month-picker-padding`                     | `0 12px`               |
| `--mp-month-picker-item-width`                  | `33%`                  |
| `--mp-month-picker-item-height`                 | `56px`                 |
| `--mp-month-picker-item-button-max-width`       | `140px`                |
| `--mp-year-picker-padding`                      | `0 12px`               |
| `--mp-year-picker-item-width`                   | `33%`                  |
| `--mp-year-picker-item-height`                  | `56px`                 |
| `--mp-year-picker-item-button-max-width`        | `140px`                |
| `--mp-day-picker-content-item-width`            | `14.28%`               |
| `--mp-day-picker-content-item-min-height`       | `21px`                 |
| `--mp-day-picker-content-item-font-size`        | `var(--mp-font-size-sm)`  |
| `--mp-day-picker-content-item-padding`          | `2px 0`                |
| `--mp-day-picker-content-item-button-width`     | `32px`                 |
| `--mp-day-picker-content-item-button-height`    | `32px`                 |
| `--mp-day-picker-content-item-button-font-size` | `var(--mp-font-size-sm)`  |
| `--mp-day-picker-head-item-color`               | `rgba(0, 0, 0, 0.38)`  |
| `--mp-day-picker-head-item-padding`             | `8px 0`                |
| `--mp-day-picker-head-item-font-weight`         | `600`                  |

### Shortcuts and calendar viewport

```demo
../example/demos/en-US/panel-tools.vue
```

Both libraries export `DateShortcut` and `DateShortcutsPosition`. A shortcut has `label`, `value` (a value or a lazy callback), optional `format` (input format) and `disabled`. Output uses the panel's `value-format`. Hover/focus previews without committing; click uses the same validation and confirmation flow as date selection. `preview-shortcut=false` disables preview, not selection. `shortcuts-position` supports left/bottom/right; bottom is recommended on mobile.

`picker-value` controls the calendar viewport, not selection. `default-picker-value` is read only on initialization. A range viewport contains two dates. Navigation emits `update:picker-value` and `picker-value-change(value, dates, texts)`, never `change` or `select`. Ignoring a controlled update keeps the previous viewport. `select-shortcut(shortcut)` fires only for an accepted shortcut selection. Mobile wheel presentations do not expose calendar month navigation. Fields configure these options through `date-picker-props` and forward the same three events.

### Current highlighting and selection

```demo
../example/demos/en-US/current-range.vue
```

| Prop | Meaning | Default |
| --- | --- | --- |
| `show-current` | Highlight the current day/month/year in calendar presentations; does not select or commit | true |
| `show-now-button` | Show Now; hidden for multiple selection, updates the active range endpoint | true |

Now uses the panel's type, time precision and value-format and follows disabled/readonly, min/max and date/time rules. It only updates the draft. Even with disable-confirm enabled, Now and subsequent edits require confirmation; cancelling discards the draft. Date and date-time panels and ranges behave consistently in standalone panels and field editors; ranges update only the active endpoint without swapping. Neither mounting nor changing highlighting writes to the model. The removed showNowBtn name has no alias.

The actions slot provides `{ confirm, disabled, selectNow, nowDisabled }`. Custom UI must call these protected functions; it must not write directly to the model.

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

## Month labels

Fields configure panel options through `datePickerProps` / `dateRangePickerProps`.

`abbreviation` (boolean, default `true`) controls abbreviated month labels in the calendar month grid. Set it to `false` for full month names from the active Locale. It does not affect weekday labels, headers, wheel columns, or value formats. Range calendars use the top-level option; nested calendar options cannot override it.

```demo
../example/demos/en-US/month-labels.vue
```

### Locale and nested calendar options

Date labels, headers and actions use the library's global Locale/LocaleProvider. Cedar no longer accepts a component-level `locale`; no compatibility alias is retained. Changing language does not select or submit a value.

### Nested time and wheel views

`timePickerProps` uses `DateTimePickerOptions`: `use12Hours`, `step`, `hideDisabledOptions`, `class`, `style`. It customizes the time view only; date model, precision/format, validation and confirmation remain owned by the date component. `step` samples the view and does not silently round external values. Unknown keys and listeners are not forwarded.

`pickerProps` uses `DateWheelOptions`: `optionHeight`, `optionCount`, `class`, `style`. It applies to date and time wheels in single/range panels. Generated columns, model, toolbar, field mapping and popup state cannot be overridden. explicitly displays a clock when the time tab is opened.

```demo
../example/demos/en-US/time-presentation.vue
```

### Real platform capabilities

Cedar does not expose `Date.pickerProps`, `DateRange.pickerProps` or `DateRange.datePickerProps`: desktop fields do not render mobile wheels or a mobile inner-calendar plugin. Maple retains these real extensions, using DateWheelOptions and DateRangeCalendarOptions. Both libraries use `Date.datePickerProps` / `DateRange.dateRangePickerProps` to configure their full panel, and `timePickerProps` for the nested time view. Initial date/time values belong to top-level `defaultValue`, not `timePickerProps.defaultValue`.

### Instance locale isolation

Date owners read the library's global Locale/Provider and keep `dayStartOfWeek` per instance. They do not switch the host Dayjs default locale or overwrite its base language data. Localized date metadata is registered under each library's own namespace; component instances and source code are not shared.

`valueFormat` is a stable English date protocol, including month-name tokens; `format` display and typed text use the UI language. Language changes do not rewrite or invalidate English month-name models. Numeric default protocols, Date objects and timestamps remain unchanged. The core Chinese locales and Maple built-in languages are loaded; other formats use already registered Dayjs language data, with a safe English fallback.

```demo
../example/demos/en-US/locale-isolation.vue
```

### Typed format boundaries

The copied date parser strictly uses display `format`, serializes through `value-format`, and checks the existing disabled/range rules. Single/range date fields now wire real native input. Editing is enabled by default: input clicks only edit; the calendar button or ArrowDown opens the panel, and Enter/blur commits. Set `input-editable=false` for panel-only selection. Multiple/function-formatted display has no inverse text protocol and stays readonly. A function `format` has no inverse parsing protocol: disable `input-editable` and use the selection panel. Maple has no week/quarter presentation; copied parsing logic does not introduce unsupported component types.

### Text entry and panel selection

```demo
../example/demos/en-US/text-entry.vue
```

The mobile calendar button has these local extension variables:

| Variable | Default |
| --- | --- |
| `--mp-date-input-trigger-padding` | `0` |
| `--mp-date-input-trigger-outline-width` | `var(--mp-sys-space-1)` |
| `--mp-date-input-trigger-outline-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-date-input-trigger-outline-offset` | `var(--mp-sys-space-1)` |

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

`Date` / `DateRange` fields select their content through root `panel-type`; pure panels use root `presentation`. Both fields default to `calendar` content; standalone date panels default to `calendarPicker`. Field `DatePickerOptions` / `DateRangePickerOptions` no longer accept the ineffective `presentation`; untyped nested selectors are filtered at runtime. Week start, viewport, shortcuts and valid appearance remain configurable. Single roots support picker/calendar/calendarPicker; ranges support picker/calendar. Cedar only implements its desktop calendar and does not expose empty mobile modes.

### Reactive first weekday

`dayStartOfWeek` updates the calendar headers and date columns together without changing the selected value or submitting a draft. Use the root prop on pure panels; on fields configure `datePickerProps` / `dateRangePickerProps`. The wheel view does not use weekday columns.

### Dynamic date limits

Updating or removing `min` / `max` changes selectable dates, not the existing model or draft. In Maple calendar views, day/month/year navigation availability is derived from the current viewport and both limits; removing one limit restores only that side. A released bound does not trigger selection or submission.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Inline keeps the existing date/time confirmation policy. In popup, the inner pure panel hides its toolbar and the host owns the single confirmation boundary. Standalone DatePicker, DateRangePicker, TimePicker and TimeRangePicker retain their panel API and confirmation behavior. On fields, use `panel-type` to choose calendar/picker content; `presentation` controls the field container. Standalone pickers keep their existing content `presentation`.

Standalone, inline and popup editors share the same layout. The calendar has a preferred width of 265px with extra space for a half-hour quick time Picker when time is enabled; narrow screens fit the available width. The footer displays the date, time and a clock/calendar toggle. Explicit `presentation="picker"` preserves date wheels. The panel retains standalone confirmation and actions ownership.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Shared mobile panel style

Single date, date-time and time panels omit the top summary in standalone panels and field editors. Date-time editors retain the current date/time and view switch at the bottom. Range summaries remain visible and highlight the active endpoint.

The hint and selected year are no longer repeated below the summary. The calendar's central heading is a keyboard-accessible button with a dropdown indicator: activate it to choose months, then years. Use the footer calendar button to return to the date view without committing a value.

Shared style variables:

| Token | Default |
| --- | --- |
| `--mp-temporal-panel-inset` | `12px` |
| `--mp-temporal-panel-column-label-height` | `36px` |
| `--mp-temporal-panel-column-label-font-size` | `13px` |
| `--mp-temporal-panel-radius` | `12px` |
| `--mp-temporal-panel-group-gap` | `24px` |
| `--mp-temporal-panel-touch-height` | `44px` |
| `--mp-temporal-panel-summary-background` | `var(--mp-color-fill-1)` |
| `--mp-temporal-panel-summary-height` | `56px` |
| `--mp-temporal-panel-quick-time-width` | `84px` |
| `--mp-temporal-panel-selection-background` | `var(--mp-color-fill-2)` |
| `--mp-temporal-panel-active-background` | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |
