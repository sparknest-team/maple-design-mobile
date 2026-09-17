# DateRange

### Intro

Form date-range **field** that opens [`DateRangePicker`](/en-US/date-range-picker). Same interaction as `Date`: Cancel discards draft; Confirm writes `v-model`.

- Uses column wheels by default (year / month / day, determined by `type`)
- `presentation="calendar"`: calendar panel
- `show-time`: date+time column rollers (aligned with Cedar)

### Basic Usage

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

## API

### Props

| Prop                      | Description                                                       | Type                              | Default    |
| ------------------------- | ----------------------------------------------------------------- | --------------------------------- | ---------- |
| `v-model`                 | Bound value; date-time strings when `show-time`                   | _string[]_                        | `[]`       |
| `open`                    | Controlled popup visibility                                       | _boolean_                         | `-`        |
| `presentation`            | Panel mode: `calendar` `picker`                                   | _string_                          | `picker`   |
| `type`                    | Picker type: `year` `month` `date`                                | _string_                          | `date`     |
| `show-time`               | Enable time selection                                             | _boolean_                         | `false`    |
| `use-seconds`             | Show seconds when `show-time`                                     | _boolean_                         | `false`    |
| `min`                     | Minimum date                                                      | _string_                          | `-`        |
| `max`                     | Maximum date                                                      | _string_                          | `-`        |
| `disabled-date`           | Returns `true` to disable a date                                  | _(val: string) => boolean_        | `-`        |
| `disabled-time`           | Disabled time when `show-time` (callback returns true to disable) | _DisabledTime_                    | `-`        |
| `separator`               | Display separator                                                 | _string_                          | `~`        |
| `date-picker-props`       | Props for `mp-date-picker` (calendar)                             | _Partial\<DatePickerProps\>_      | `{}`       |
| `picker-props`            | Props for `mp-picker` (picker)                                    | _Partial\<PickerProps\>_          | `{}`       |
| `date-range-picker-props` | Props for `mp-date-range-picker`                                  | _Partial\<DateRangePickerProps\>_ | `{}`       |
| `popup-props`             | Props passed to popup                                             | _Partial\<PopupProps\>_           | `{}`       |
| `placeholder`             | Placeholder                                                       | _string_                          | `-`        |
| `clearable`               | Show clear button                                                 | _boolean_                         | `false`    |
| `disabled`                | Disabled                                                          | _boolean_                         | `false`    |
| `readonly`                | Readonly                                                          | _boolean_                         | `false`    |
| `size`                    | Size: `xs` `sm` `md` `lg` `xl`                                    | _ComponentSize_                   | `md`       |
| `variant`                 | Variant: `filled` `standard` `outline`                           | _string_                          | `standard` |

### Events

| Event    | Description               | Arguments         |
| -------- | ------------------------- | ----------------- |
| `focus`  | Emitted on focus          | `-`               |
| `blur`   | Emitted on blur           | `-`               |
| `click`  | Emitted on click          | `event: Event`    |
| `clear`  | Emitted on clear          | `value: string[]` |
| `close`  | Emitted when popup closes | `value: string[]` |
| `change` | Emitted after confirm     | `value: string[]` |

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
| `v-model`           | Binding value; date-time strings when `show-time`                 | _string[]_                    | `[]`     |
| `presentation`      | Panel mode: `calendar` `picker` `calendarClock` `calendarPicker`  | _string_                      | `picker` |
| `type`              | Selection type: `date` `month` `year`                             | _string_                      | `date`   |
| `show-time`         | Enable time selection                                             | _boolean_                     | `false`  |
| `use-seconds`       | Show seconds when `show-time`                                     | _boolean_                     | `false`  |
| `min`               | Minimum date                                                      | _string_                      | `-`      |
| `max`               | Maximum date                                                      | _string_                      | `-`      |
| `disabled-date`     | Returns `true` to disable a date                                  | _(val: string) => boolean_    | `-`      |
| `disabled-time`     | Disabled time when `show-time` (callback returns true to disable) | _DisabledTime_                | `-`      |
| `date-picker-props` | Props for `mp-date-picker` (calendar)                             | _Partial\<DatePickerProps\>_  | `{}`     |
| `picker-props`      | Props for `mp-picker` (picker)                                    | _Partial\<PickerProps\>_      | `{}`     |
| `time-picker-props` | Props for `mp-time-picker` (calendar + show-time)                 | _Partial\<TimePickerProps\>_  | `{}`     |
| `readonly`          | Whether readonly                                                  | _boolean_                     | `false`  |
| `elevation`         | Elevation                                                         | _number \| boolean_ | `false`  |

### Events

| Event    | Description                    | Arguments         |
| -------- | ------------------------------ | ----------------- |
| `change` | Emitted when the range changes | `value: string[]` |

### Slots

| Slot      | Description          | Arguments |
| --------- | -------------------- | --------- |
| `actions` | Custom actions panel | `-`       |

### Style Variables

| Variable                                     | Default                                 |
| -------------------------------------------- | --------------------------------------- |
| `--date-range-picker-values-height`          | `56px`                                  |
| `--date-range-picker-values-font-size`       | `18px`                                  |
| `--date-range-picker-values-font-weight`     | `500`                                   |
| `--date-range-picker-value-color`            | `var(--color-text-3)`                   |
| `--date-range-picker-value-active-color`     | `var(--color-primary)`                  |
| `--date-range-picker-value-arrow-color`      | `var(--color-border-2)`                 |
| `--date-range-picker-value-arrow-size`       | `18px`                                  |
| `--date-range-picker-value-date-font-size`   | `13px`                                  |
| `--date-range-picker-value-time-font-size`   | `22px`                                  |
| `--date-range-picker-column-label-height`    | `36px`                                  |
| `--date-range-picker-column-label-font-size` | `13px`                                  |
| `--date-range-picker-column-label-color`     | `var(--color-text-3)`                   |
| `--date-range-picker-border-radius`          | `var(--date-picker-border-radius, 4px)` |
| `--date-range-picker-background`             | `var(--color-fill-2)`                   |
