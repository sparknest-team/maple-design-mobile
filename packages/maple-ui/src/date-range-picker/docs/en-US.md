# DateRangePicker

### Intro

Date range selection **panel**. Embed alone when you only need the panel.

- `presentation="calendar"` (default): calendar panel (`DatePicker` + `range`)
- `presentation="picker"`: column wheels; with `show-time`, full Y/M/D/H/M columns
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

### Picker Mode

```html
<script setup>
import { ref } from 'vue'

const range = ref(['2024-01-01', '2024-12-31'])
</script>

<template>
  <mp-date-range-picker v-model="range" presentation="picker" />
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

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Binding value; date-time strings when `show-time` | _string[]_ | `[]` |
| `presentation` | Panel mode: `calendar` `picker` `calendarClock` `calendarPicker` | _string_ | `calendar` |
| `type` | Selection type: `date` `month` `year` | _string_ | `date` |
| `show-time` | Enable time selection | _boolean_ | `false` |
| `use-seconds` | Show seconds when `show-time` | _boolean_ | `false` |
| `min` | Minimum date | _string_ | `-` |
| `max` | Maximum date | _string_ | `-` |
| `allowed-dates` | Allowed dates filter | _(val: string) => boolean_ | `-` |
| `allowed-time` | Restricts selectable time when `show-time` | _AllowedTime_ | `-` |
| `date-picker-props` | Props for `mp-date-picker` (calendar) | _Partial\<DatePickerProps\>_ | `{}` |
| `picker-props` | Props for `mp-picker` (picker) | _Partial\<PickerProps\>_ | `{}` |
| `time-picker-props` | Props for `mp-time-picker` (calendar + show-time) | _Partial\<TimePickerProps\>_ | `{}` |
| `readonly` | Whether readonly | _boolean_ | `false` |
| `elevation` | Elevation | _string \| number \| boolean_ | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Emitted when the range changes | `value: string[]` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `actions` | Custom actions panel | `-` |

### Style Variables

| Variable | Default |
| --- | --- |
| `--date-range-picker-values-height` | `56px` |
| `--date-range-picker-values-font-size` | `18px` |
| `--date-range-picker-values-font-weight` | `500` |
| `--date-range-picker-value-color` | `var(--color-on-surface-variant)` |
| `--date-range-picker-value-active-color` | `var(--color-primary)` |
| `--date-range-picker-value-arrow-color` | `var(--color-outline)` |
| `--date-range-picker-value-arrow-size` | `18px` |
| `--date-range-picker-value-date-font-size` | `13px` |
| `--date-range-picker-value-time-font-size` | `22px` |
| `--date-range-picker-column-label-height` | `36px` |
| `--date-range-picker-column-label-font-size` | `13px` |
| `--date-range-picker-column-label-color` | `var(--color-on-surface-variant)` |
| `--date-range-picker-border-radius` | `var(--date-picker-border-radius, 4px)` |
| `--date-range-picker-background` | `var(--color-surface-container-high)` |
