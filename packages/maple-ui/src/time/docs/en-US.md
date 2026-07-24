# Time

### Intro

Form time **field** that opens `TimePicker` in a bottom popup. Interaction matches Select picker mode: Cancel discards the draft; Confirm writes `v-model`.

For time ranges, use [`TimeRange`](/en-US/time-range). For panel-only, use [`TimePicker`](/en-US/time-picker). For time range panel, use [`TimeRangePicker`](/en-US/time-range-picker).

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const time = ref()
</script>

<template>
  <mp-time v-model="time" placeholder="Please select a time" clearable />
</template>
```

### 24hr and Seconds

```html
<script setup>
import { ref } from 'vue'

const time = ref()
const timeWithSeconds = ref()
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-time v-model="time" format="24hr" placeholder="24hr" />
    <mp-time v-model="timeWithSeconds" format="24hr" use-seconds placeholder="With seconds" />
  </mp-space>
</template>
```

### With FormItem

```html
<script setup>
import { reactive, ref } from 'vue'

const form = ref(null)
const formData = reactive({
  alarm: undefined,
})
</script>

<template>
  <mp-form ref="form" :model="formData">
    <mp-form-item field="alarm" label="Alarm" required>
      <mp-time v-model="formData.alarm" placeholder="Please select" clearable />
    </mp-form-item>
  </mp-form>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Bound value (`HH:mm` or `HH:mm:ss`) | _string_ | `-` |
| `show` | Controlled popup visibility | _boolean_ | `-` |
| `format` | Display format: `ampm` `24hr` | _string_ | `ampm` |
| `use-seconds` | Enable seconds | _boolean_ | `false` |
| `min` | Minimum time | _string_ | `-` |
| `max` | Maximum time | _string_ | `-` |
| `allowed-time` | Allowed time filter | _AllowedTime_ | `-` |
| `time-picker-props` | Props passed to `mp-time-picker` | _Partial\<TimePickerProps\>_ | `{}` |
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
| `clear` | Emitted on clear | `value` |
| `close` | Emitted when popup closes | `value` |
| `change` | Emitted after confirm | `value` |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `focus` | Focus the field | `-` | `-` |
| `blur` | Blur the field | `-` | `-` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `selected` | Selected content | `-` |
| `prepend-icon` | Prepend icon | `-` |
| `clear-icon` | Clear icon | `clear: (e: Event) => void` |
| `append-icon` | Append icon | `-` |
| `arrow-icon` | Arrow icon | `focus: boolean, popupOpen: boolean` |

### Type Definitions

```ts
type AllowedTime = {
  hours?: (hour: number) => boolean
  minutes?: (minute: number) => boolean
  seconds?: (second: number) => boolean
}
```
