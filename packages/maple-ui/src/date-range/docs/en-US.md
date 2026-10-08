# DateRange

### Date value formats

Both libraries independently copy the same value, validation and transaction logic. Year/month/date model formats default to `YYYY`, `YYYY-MM`, `YYYY-MM-DD`; date-time defaults to seconds. Set `:use-seconds="false"` for minute precision. `format` controls labels; `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/date calendar, wheel and clock presentations; week/quarter remain Cedar presentation capabilities.

### Intro

Form date-range **field** that opens [`DateRangePicker`](/en-US/date-range-picker). Same interaction as `Date`: Cancel discards draft; Confirm writes `v-model`.

- Uses column wheels by default (year / month / day, determined by `type`)
- `presentation="calendar"`: calendar panel
- `show-time`: date+time column rollers (aligned with Cedar)

### Basic Usage

In wheel mode, tapping the end input activates the end editor. Switching sides only changes the draft until Confirm. Moving focus between inputs does not blur the whole field. Calendar mode still selects a range with two date choices.

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


The field uses independently copied PickerField → FieldDecorator layers. Panels edit a draft; Confirm commits, Cancel/dismiss discards, and Clear commits an empty value and closes the popup. Mobile fields do not open the software keyboard. See the Date field-protocol demo for all four field types.

### Props

| Prop                      | Description                                                       | Type                              | Default    |
| ------------------------- | ----------------------------------------------------------------- | --------------------------------- | ---------- |
| `model-value` | Controlled value | DateValue[] | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue[] | `undefined` |
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
| `date-picker-props`       | Props for `mp-date-picker` (calendar)                             | _Partial\<DatePickerProps\>_      | `{}`       |
| `picker-props`            | Props for `mp-picker` (picker)                                    | _Partial\<PickerProps\>_          | `{}`       |
| `date-range-picker-props` | Props for `mp-date-range-picker`                                  | _Partial\<DateRangePickerProps\>_ | `{}`       |
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

## DateRangePicker

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
| `show-time`         | Enable time selection                                             | _boolean_                     | `false`  |
| `use-seconds` | Default time precision; explicit format takes priority | boolean | true |
| `min`               | Minimum date                                                      | DateValue                      | `-`      |
| `max`               | Maximum date                                                      | DateValue                      | `-`      |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `date-picker-props` | Props for `mp-date-picker` (calendar)                             | _Partial\<DatePickerProps\>_  | `{}`     |
| `picker-props`      | Props for `mp-picker` (picker)                                    | _Partial\<PickerProps\>_      | `{}`     |
| `time-picker-props` | Props for `mp-time-picker` (calendar + show-time)                 | _Partial\<TimePickerProps\>_  | `{}`     |
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
