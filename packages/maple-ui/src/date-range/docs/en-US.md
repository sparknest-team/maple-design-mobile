# DateRange

### Intro

Form date-range **field** that opens [`DateRangePicker`](/en-US/date-range-picker). Same interaction as `Date`: Cancel discards draft; Confirm writes `v-model`.

- Uses column wheels by default (year / month / day, determined by `type`)
- `presentation="calendar"`: calendar panel
- `show-time`: date+time column rollers (aligned with Cedar)

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const range = ref([])
</script>

<template>
  <mp-date-range v-model="range" placeholder="Please select a date range" clearable />
</template>
```

### Calendar Mode

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['2024-01-01', '2024-12-31'])
</script>

<template>
  <mp-date-range v-model="range" presentation="calendar" placeholder="Calendar date range" clearable />
</template>
```

### Date Time Range

```html
<script setup>
  import { ref } from 'vue'

  const range = ref([])
</script>

<template>
  <mp-date-range v-model="range" show-time placeholder="Please select a date-time range" clearable />
</template>
```

### Type

```html
<script setup>
  import { ref } from 'vue'

  const yearRange = ref([])
  const monthRange = ref([])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-date-range v-model="yearRange" type="year" placeholder="Select year range" clearable />
    <mp-date-range v-model="monthRange" type="month" placeholder="Select month range" clearable />
  </mp-space>
</template>
```

### Custom Separator

```html
<script setup>
  import { ref } from 'vue'

  const range = ref([])
</script>

<template>
  <mp-date-range v-model="range" separator=" to " placeholder="Custom separator" clearable />
</template>
```

### With FormItem

```html
<script setup>
  import { reactive, ref } from 'vue'

  const form = ref(null)
  const formData = reactive({
    period: [],
  })
</script>

<template>
  <mp-form ref="form" :model="formData">
    <mp-form-item field="period" label="Period" required>
      <mp-date-range v-model="formData.period" placeholder="Please select" clearable />
    </mp-form-item>
  </mp-form>
</template>
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
| `variant`                 | Variant: `filled` `standard` `outlined`                           | _string_                          | `standard` |

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

# DateRangePicker

> 源码已并入 `date-range/`，安装父组件时一并注册。静态成员：`DateRange.Picker`。

### Intro

Date range selection **panel**. Embed alone when you only need the panel.

- Uses column wheels by default; with `show-time`, full Y/M/D/H/M columns
- `presentation="calendar"`: calendar panel (`DatePicker` + `range`)
- `show-time` + `calendarClock` (`calendar` resolves to this): top shows date range (calendar picks range), bottom switches start/end time; clock for time
- `show-time` + `calendarPicker`: same, time uses hour/minute(/second) columns

Form field: [`DateRange`](/en-US/date-range). Single date panel: [`DatePicker`](/en-US/date-picker).

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['2024-01-01', '2024-01-15'])
</script>

<template>
  <mp-date-range-picker v-model="range" />
</template>
```

### Calendar Mode

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['2024-01-01', '2024-12-31'])
</script>

<template>
  <mp-date-range-picker v-model="range" presentation="calendar" />
</template>
```

### Date Time Range

```html
<script setup>
  import { ref } from 'vue'

  const clock = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
  const calendarPicker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
  const picker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
</script>

<template>
  <mp-date-range-picker v-model="clock" show-time presentation="calendarClock" />
  <mp-date-range-picker v-model="calendarPicker" show-time presentation="calendarPicker" />
  <mp-date-range-picker v-model="picker" show-time presentation="picker" />
</template>
```

### Year / Month Range

```html
<script setup>
  import { ref } from 'vue'

  const yearRange = ref(['2020', '2024'])
  const monthRange = ref(['2024-01', '2024-06'])
</script>

<template>
  <mp-date-range-picker v-model="yearRange" presentation="picker" type="year" />
  <mp-date-range-picker v-model="monthRange" presentation="picker" type="month" />
</template>
```

### Readonly

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['2024-01-01', '2024-01-15'])
</script>

<template>
  <mp-date-range-picker v-model="range" readonly />
</template>
```

## API

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
| `elevation`         | Elevation                                                         | _string \| number \| boolean_ | `false`  |

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
