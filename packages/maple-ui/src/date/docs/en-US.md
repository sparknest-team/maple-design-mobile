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
  <mp-space direction="column" size="large">
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
| `variant`           | Variant: `filled` `standard` `outlined`                           | _string_                     | `standard` |

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
