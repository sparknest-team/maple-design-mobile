# DateRange

### Intro

Form date-range **field** that opens [`DateRangePicker`](/en-US/date-range-picker). Same interaction as `Date`: Cancel discards draft; Confirm writes `v-model`.

- `presentation="calendar"` (default): calendar panel
- `presentation="picker"`: column wheels (year / month / day by `type`)
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

### Picker Mode

```html
<script setup>
import { ref } from 'vue'

const range = ref(['2024-01-01', '2024-12-31'])
</script>

<template>
  <mp-date-range
    v-model="range"
    presentation="picker"
    placeholder="Column picker range"
    clearable
  />
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

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Bound value; date-time strings when `show-time` | _string[]_ | `[]` |
| `show` | Controlled popup visibility | _boolean_ | `-` |
| `presentation` | Panel mode: `calendar` `picker` | _string_ | `calendar` |
| `type` | Picker type: `year` `month` `date` | _string_ | `date` |
| `show-time` | Enable time selection | _boolean_ | `false` |
| `use-seconds` | Show seconds when `show-time` | _boolean_ | `false` |
| `min` | Minimum date | _string_ | `-` |
| `max` | Maximum date | _string_ | `-` |
| `allowed-dates` | Allowed dates filter | _(val: string) => boolean_ | `-` |
| `allowed-time` | Restricts selectable time when `show-time` | _AllowedTime_ | `-` |
| `separator` | Display separator | _string_ | ` ~ ` |
| `date-picker-props` | Props for `mp-date-picker` (calendar) | _Partial\<DatePickerProps\>_ | `{}` |
| `picker-props` | Props for `mp-picker` (picker) | _Partial\<PickerProps\>_ | `{}` |
| `date-range-picker-props` | Props for `mp-date-range-picker` | _Partial\<DateRangePickerProps\>_ | `{}` |
| `popup-props` | Props passed to popup | _Partial\<PopupProps\>_ | `{}` |
| `placeholder` | Placeholder | _string_ | `-` |
| `clearable` | Show clear button | _boolean_ | `false` |
| `disabled` | Disabled | _boolean_ | `false` |
| `readonly` | Readonly | _boolean_ | `false` |
| `size` | Size: `normal` `small` | _string_ | `normal` |
| `variant` | Variant: `standard` `outlined` | _string_ | `standard` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `focus` | Emitted on focus | `-` |
| `blur` | Emitted on blur | `-` |
| `click` | Emitted on click | `event: Event` |
| `clear` | Emitted on clear | `value: string[]` |
| `close` | Emitted when popup closes | `value: string[]` |
| `change` | Emitted after confirm | `value: string[]` |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `focus` | Focus the field | `-` | `-` |
| `blur` | Blur the field | `-` | `-` |
