# Date

### Date value formats

Both libraries independently copy the same value, validation and transaction logic. Year/month/date model formats default to `YYYY`, `YYYY-MM`, `YYYY-MM-DD`; date-time defaults to seconds. Set `:use-seconds="false"` for minute precision. `format` controls labels; `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/date calendar, wheel and clock presentations; week/quarter remain Cedar presentation capabilities.

### Intro

Form date field that opens `DatePicker` in a bottom popup. Interaction matches Select picker mode: Cancel discards the draft; Confirm writes `v-model`.

### Shared field and commit protocol

Date, DateRange, Time and TimeRange use independent same-source copies of PickerField and FieldDecorator. Mobile fields do not open the software keyboard: panels edit a draft, Confirm commits it, and Cancel or dismissal discards it. Clear commits an empty value and closes the panel. Range fields retain separate start/end values and overnight hints.

```demo
../example/demos/en-US/field-protocol.vue
```

### Basic Usage

```demo
../example/demos/en-US/basic-usage.vue
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

### Disabled

```demo
../example/demos/en-US/disabled.vue
```

### With FormItem

```demo
../example/demos/en-US/with-form-item.vue
```

### Model and display formats

```demo
../example/demos/en-US/value-formats.vue
```

## API

### Shared rules and events

`DateValue = Date | string | number`. Invalid dates and incomplete/reversed ranges cannot be committed. Boundaries are inclusive and use `value-format`; Date or timestamp boundaries are also accepted. Rules are rechecked at confirmation. `disabledTime` returns `disabledHours()`, `disabledMinutes(hour)` and `disabledSeconds(hour, minute)` number lists. Pure panels emit `confirm` after validation; field open state uses `update:open` / `open-change`, not `close`. Nested panel/popup props configure presentation only and cannot override models, rules or ownership listeners. Range `disabled` accepts `[startDisabled, endDisabled]`; a locked endpoint cannot be cleared or modified.


### Props

| Prop                | Description                                                       | Type                         | Default    |
| ------------------- | ----------------------------------------------------------------- | ---------------------------- | ---------- |
| `model-value` | Controlled value | DateValue / DateValue[] (multiple/range) | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue / DateValue[] (multiple/range) | `undefined` |
| `format` | Display format or formatter | string / (date: Date) => string | — |
| `value-format` | Model format, Date or timestamp | string | — |
| `disable-confirm` | Commit immediately | boolean | field: false; panel: true |
| `open`              | Controlled popup visibility                                       | _boolean_                    | `-`        |
| `default-open` | Uncontrolled initial open state | boolean | false |
| `popup-container` | Popup mount target | string / HTMLElement / (() => HTMLElement) / false | — |
| `presentation`      | Panel mode: `picker` `calendar` `calendarClock` `calendarPicker`  | _string_                     | `picker`   |
| `type`              | Picker type: `year` `month` `date`                                | _string_                     | `date`     |
| `show-time`         | Enable time selection                                             | _boolean_                    | `false`    |
| `use-seconds` | Default time precision; explicit format takes priority | boolean | true |
| `multiple`          | Enable multiple select                                            | _boolean_                    | `false`    |
| `min`               | Minimum date                                                      | DateValue                     | `-`        |
| `max`               | Maximum date                                                      | DateValue                     | `-`        |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `separator`         | Display separator for multiple                                    | _string_                     | `, `       |
| `date-picker-props` | Props passed to `mp-date-picker`                                  | _Partial\<DatePickerProps\>_ | `{}`       |
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

## DatePicker

> 源码已并入 `date/`，安装父组件时一并注册。静态成员：`Date.Picker`。

### Intro

Date selection **panel**. For date range panel use [`DateRangePicker`](/en-US/date-range-picker). Form fields: [`Date`](/en-US/date) / [`DateRange`](/en-US/date-range).

### Basic Usage

```demo
../example/demos/en-US/picker-basic.vue
```

### Calendar Mode

Single selection uses column wheels by default. Set `presentation="calendar"` to use the calendar; `multiple` and `range` automatically fall back to the calendar.

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

- `calendarClock` (also what `calendar` resolves to when `show-time`): **top for date, bottom for time**; calendar + clock
- `calendarPicker`: top for date, bottom for time; calendar + hour/minute(/second) columns
- `picker`: full Y/M/D/H/M columns

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
| `presentation`      | Panel mode: `calendar` `picker` `calendarClock` `calendarPicker`                              | _string_                      | `picker`      |
| `show-time`         | Enable time selection                                                                         | _boolean_                     | `false`       |
| `use-seconds` | Default time precision; explicit format takes priority | boolean | true |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `time-picker-props` | Props for `mp-time-picker` (`calendarClock`)                                                  | _Partial\<TimePickerProps\>_  | `{}`          |
| `color`             | Picker color                                                                                  | _string_                      | `-`           |
| `title-color`       | Color of picker title. If not specified it will use `color` prop or the default picker color. | _string_                      | `-`           |
| `hint`              | Picker hint                                                                                   | _string_                      | `SELECT DATE` |
| `elevation`         | Elevation level, options `true` `false` and level of `0-24`                                   | _number \| boolean_ | `false`       |
| `button-elevation`  | Elevation level of Button                                                                     | _string \| number \| boolean_ | `true`        |
| `first-day-of-week` | Sets the first day of the week, starting with 0 for Sunday.                                   | _string \| number_            | `0`           |
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
| `--mp-date-picker-title-hint-color`             | `#fff`                 |
| `--mp-date-picker-title-hint-font-size`         | `var(--mp-font-size-md)`  |
| `--mp-date-picker-title-height`                 | `105px`                |
| `--mp-date-picker-title-padding`                | `16px`                 |
| `--mp-date-picker-title-background`             | `var(--mp-color-primary)` |
| `--mp-date-picker-title-color`                  | `#fff`                 |
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
