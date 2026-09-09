# Date

### Intro

Form date field that opens `DatePicker` in a bottom popup. Interaction matches Select picker mode: Cancel discards the draft; Confirm writes `v-model`.

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const date = ref()
</script>

<template>
  <mp-date v-model="date" placeholder="Please select a date" clearable />
</template>
```

### Calendar Mode

Column wheels are used by default. Set `presentation="calendar"` to use the calendar panel.

```html
<script setup>
  import { ref } from 'vue'

  const date = ref()
</script>

<template>
  <mp-date v-model="date" presentation="calendar" placeholder="Select a date from calendar" clearable />
</template>
```

### Type

```html
<script setup>
  import { ref } from 'vue'

  const year = ref()
  const month = ref()
  const date = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="year" type="year" placeholder="Select year" />
    <mp-date v-model="month" type="month" placeholder="Select month" />
    <mp-date v-model="date" type="date" placeholder="Select date" />
  </mp-space>
</template>
```

### Multiple

```html
<script setup>
  import { ref } from 'vue'

  const multiple = ref([])
</script>

<template>
  <mp-date v-model="multiple" multiple placeholder="Multiple dates" />
</template>
```

For date ranges, use [`DateRange`](/en-US/date-range).

### Date Time

Enable `show-time` for date+time (aligned with Cedar).

```html
<script setup>
  import { ref } from 'vue'

  const dateTime = ref()
</script>

<template>
  <mp-date v-model="dateTime" show-time placeholder="Please select date time" clearable />
</template>
```

### With FormItem

```html
<script setup>
  import { reactive, ref } from 'vue'

  const form = ref(null)
  const formData = reactive({
    birthday: undefined,
  })
</script>

<template>
  <mp-form ref="form" :model="formData">
    <mp-form-item field="birthday" label="Birthday" required>
      <mp-date v-model="formData.birthday" placeholder="Please select" clearable />
    </mp-form-item>
  </mp-form>
</template>
```

## API

### Props

| Prop                | Description                                                       | Type                         | Default    |
| ------------------- | ----------------------------------------------------------------- | ---------------------------- | ---------- |
| `v-model`           | Bound value; date-time string when `show-time`                    | _string \| string[]_         | `-`        |
| `open`              | Controlled popup visibility                                       | _boolean_                    | `-`        |
| `presentation`      | Panel mode: `picker` `calendar` `calendarClock` `calendarPicker`  | _string_                     | `picker`   |
| `type`              | Picker type: `year` `month` `date`                                | _string_                     | `date`     |
| `show-time`         | Enable time selection                                             | _boolean_                    | `false`    |
| `use-seconds`       | Show seconds when `show-time`                                     | _boolean_                    | `false`    |
| `multiple`          | Enable multiple select                                            | _boolean_                    | `false`    |
| `min`               | Minimum date                                                      | _string_                     | `-`        |
| `max`               | Maximum date                                                      | _string_                     | `-`        |
| `disabled-date`     | Returns `true` to disable a date                                  | _(val: string) => boolean_   | `-`        |
| `disabled-time`     | Disabled time when `show-time` (callback returns true to disable) | _DisabledTime_               | `-`        |
| `separator`         | Display separator for multiple                                    | _string_                     | `, `       |
| `date-picker-props` | Props passed to `mp-date-picker`                                  | _Partial\<DatePickerProps\>_ | `{}`       |
| `popup-props`       | Props passed to popup                                             | _Partial\<PopupProps\>_      | `{}`       |
| `placeholder`       | Placeholder                                                       | _string_                     | `-`        |
| `clearable`         | Show clear button                                                 | _boolean_                    | `false`    |
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
| `clear`  | Emitted on clear          | `value`        |
| `close`  | Emitted when popup closes | `value`        |
| `change` | Emitted after confirm     | `value`        |

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
| `arrow-icon` | Arrow icon       | `focus: boolean, popupOpen: boolean` |

# DatePicker

> 源码已并入 `date/`，安装父组件时一并注册。静态成员：`Date.Picker`。

### Intro

Date selection **panel**. For date range panel use [`DateRangePicker`](/en-US/date-range-picker). Form fields: [`Date`](/en-US/date) / [`DateRange`](/en-US/date-range).

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker v-model="date" />
</template>
```

### Calendar Mode

Single selection uses column wheels by default. Set `presentation="calendar"` to use the calendar; `multiple` and `range` automatically fall back to the calendar.

```html
<mp-date-picker v-model="date" presentation="calendar" />
```

### Month Picker

Use `type` prop to change the type of the picker. The default value of `type` is `date`.

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker type="month" v-model="date" elevation />
</template>
```

### Multiple

Use `multiple` prop to select multiple dates, at this time, `date` is an array.

```html
<script setup>
  import { ref } from 'vue'

  const date = ref([])
</script>

<template>
  <mp-date-picker v-model="date" multiple />
</template>
```

### Range

Use `range` prop to select date range, at this time, `date` is `[startDate, endDate]`.

```html
<script setup>
  import { ref } from 'vue'

  const date = ref(['2021-04-08', '2021-04-20'])
</script>

<template>
  <mp-date-picker type="date" v-model="date" range />
</template>
```

### Date Limit

Use `min` and `max` prop to allow the maximum and minimum date, and use `disabled-date` prop to disable dates that cannot be selected.

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('2020-11-11')

  const disabledDate = (val) => parseInt(val.split('-')[2], 10) % 2 === 0
</script>

<template>
  <mp-date-picker v-model="date" min="2020-10-15" max="2021-01-15" :disabled-date="disabledDate" />
</template>
```

### Date Time

Enable `show-time` for date+time. `presentation` controls the UI:

- `calendarClock` (also what `calendar` resolves to when `show-time`): **top for date, bottom for time**; calendar + clock
- `calendarPicker`: top for date, bottom for time; calendar + hour/minute(/second) columns
- `picker`: full Y/M/D/H/M columns

```html
<script setup>
  import { ref } from 'vue'

  const clock = ref('2025-01-15 10:29')
  const calendarPicker = ref('2025-01-15 10:29')
  const picker = ref('2025-01-15 10:29')
</script>

<template>
  <mp-date-picker v-model="clock" show-time presentation="calendarClock" />
  <mp-date-picker v-model="calendarPicker" show-time presentation="calendarPicker" />
  <mp-date-picker v-model="picker" show-time presentation="picker" />
</template>
```

## API

### Props

| Prop                | Description                                                                                   | Type                          | Default       |
| ------------------- | --------------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| `v-model`           | Selected date; date-time string when `show-time`                                              | _string[] \| string_          | `undefined`   |
| `type`              | Picker type, optional values `date` `month` `year`                                            | _string_                      | `date`        |
| `presentation`      | Panel mode: `calendar` `picker` `calendarClock` `calendarPicker`                              | _string_                      | `picker`      |
| `show-time`         | Enable time selection                                                                         | _boolean_                     | `false`       |
| `use-seconds`       | Show seconds when `show-time`                                                                 | _boolean_                     | `false`       |
| `disabled-date`     | Returns `true` to disable a date                                                              | _function_                    | `-`           |
| `disabled-time`     | Disabled time when `show-time` (callback returns true to disable)                             | _DisabledTime_                | `-`           |
| `time-picker-props` | Props for `mp-time-picker` (`calendarClock`)                                                  | _Partial\<TimePickerProps\>_  | `{}`          |
| `color`             | Picker color                                                                                  | _string_                      | `-`           |
| `title-color`       | Color of picker title. If not specified it will use `color` prop or the default picker color. | _string_                      | `-`           |
| `hint`              | Picker hint                                                                                   | _string_                      | `SELECT DATE` |
| `elevation`         | Elevation level, options `true` `false` and level of `0-24`                                   | _number \| boolean_ | `false`       |
| `button-elevation`  | Elevation level of Button                                                                     | _string \| number \| boolean_ | `true`        |
| `first-day-of-week` | Sets the first day of the week, starting with 0 for Sunday.                                   | _string \| number_            | `0`           |
| `min`               | Minimum allowed date/month (ISO 8601 format)                                                  | _string_                      | `-`           |
| `max`               | Maximum allowed date/month (ISO 8601 format)                                                  | _string_                      | `-`           |
| `show-current`      | Whether to display the current date                                                           | _boolean_                     | `true`        |
| `readonly`          | readonly                                                                                      | _boolean_                     | `false`       |
| `multiple`          | Allow the selection of multiple dates                                                         | _boolean_                     | `false`       |
| `range`             | Allow the selection of date range                                                             | _boolean_                     | `false`       |
| `touchable`         | Allow switch panel by touch                                                                   | _boolean_                     | `true`        |

### Events

| Event     | Description                 | arguments                                             |
| --------- | --------------------------- | ----------------------------------------------------- |
| `preview` | Emitted after date switched | `year: number` <br>`month: number` <br>`day?: number` |
| `change`  | Emitted after date changed  | `value: string \| string[]`                           |

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
| `--date-picker-border-radius`                | `4px`                  |
| `--date-picker-font-size`                    | `var(--font-size-md)`  |
| `--date-picker-min-width`                    | `290px`                |
| `--date-picker-main-color`                   | `rgba(0, 0, 0, .87)`   |
| `--date-picker-title-hint-color`             | `#fff`                 |
| `--date-picker-title-hint-font-size`         | `var(--font-size-md)`  |
| `--date-picker-title-height`                 | `105px`                |
| `--date-picker-title-padding`                | `16px`                 |
| `--date-picker-title-background`             | `var(--color-primary)` |
| `--date-picker-title-color`                  | `#fff`                 |
| `--date-picker-title-year-font-size`         | `var(--font-size-md)`  |
| `--date-picker-title-year-font-weight`       | `500`                  |
| `--date-picker-title-year-margin-bottom`     | `8px`                  |
| `--date-picker-title-year-min-height`        | `21px`                 |
| `--date-picker-title-date-height`            | `48px`                 |
| `--date-picker-title-date-font-size`         | `34px`                 |
| `--date-picker-title-date-font-weight`       | `500`                  |
| `--date-picker-title-date-range-font-size`   | `20px`                 |
| `--date-picker-title-date-justify-content`   | `normal`               |
| `--date-picker-body-padding`                 | `0`                    |
| `--date-picker-body-background-color`        | `#fff`                 |
| `--date-picker-body-height`                  | `280px`                |
| `--date-picker-header-arrow-filter`          | `opacity(0.54)`        |
| `--date-picker-header-padding`               | `4px 16px`             |
| `--date-picker-actions-padding`              | `0 8px 12px 8px`       |
| `--date-picker-header-color`                 | `#555`                 |
| `--month-picker-padding`                     | `0 12px`               |
| `--month-picker-item-width`                  | `33%`                  |
| `--month-picker-item-height`                 | `56px`                 |
| `--month-picker-item-button-max-width`       | `140px`                |
| `--year-picker-padding`                      | `0 12px`               |
| `--year-picker-item-width`                   | `33%`                  |
| `--year-picker-item-height`                  | `56px`                 |
| `--year-picker-item-button-max-width`        | `140px`                |
| `--day-picker-content-item-width`            | `14.28%`               |
| `--day-picker-content-item-min-height`       | `21px`                 |
| `--day-picker-content-item-font-size`        | `var(--font-size-sm)`  |
| `--day-picker-content-item-padding`          | `2px 0`                |
| `--day-picker-content-item-button-width`     | `32px`                 |
| `--day-picker-content-item-button-height`    | `32px`                 |
| `--day-picker-content-item-button-font-size` | `var(--font-size-sm)`  |
| `--day-picker-head-item-color`               | `rgba(0, 0, 0, 0.38)`  |
| `--day-picker-head-item-padding`             | `8px 0`                |
| `--day-picker-head-item-font-weight`         | `600`                  |
