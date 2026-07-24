# TimeRange

### Intro

Form time-range **field**. Cancel discards the draft; Confirm writes `v-model`.

The popup uses [`TimeRangePicker`](/en-US/time-range-picker) as the panel. The header shows start / end; tap to switch the active side.

- `presentation="clock"` (default): clock panel
- `presentation="picker"`: column wheels (hour / minute / second)

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const range = ref([])
</script>

<template>
  <mp-time-range v-model="range" placeholder="Please select a time range" clearable />
</template>
```

### Picker Mode

```html
<script setup>
import { ref } from 'vue'

const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range
    v-model="range"
    presentation="picker"
    format="24hr"
    placeholder="Column picker range"
    clearable
  />
</template>
```

### 24hr And Seconds

```html
<script setup>
import { ref } from 'vue'

const range = ref([])
</script>

<template>
  <mp-time-range v-model="range" format="24hr" use-seconds placeholder="With seconds" clearable />
</template>
```

### Next Day Label

When the end time is earlier than the start (overnight), enable `show-next-day` to show a next-day marker and **skip swapping on confirm**. Without it, times are ordered so start <= end **only when confirming**.

```html
<script setup>
import { ref } from 'vue'

const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range
    v-model="range"
    show-next-day
    format="24hr"
    placeholder="Overnight range"
    clearable
  />
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
      <mp-time-range v-model="formData.period" placeholder="Please select" clearable />
    </mp-form-item>
  </mp-form>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Bound value | _string[]_ | `[]` |
| `show` | Controlled popup visibility | _boolean_ | `-` |
| `presentation` | Panel mode: `clock` \| `picker` | _string_ | `clock` |
| `format` | Format: `ampm` \| `24hr` (mainly for clock) | _string_ | `ampm` |
| `use-seconds` | Enable seconds | _boolean_ | `false` |
| `min` | Min time | _string_ | `-` |
| `max` | Max time | _string_ | `-` |
| `allowed-time` | Allowed time filter | _AllowedTime_ | `-` |
| `separator` | Display separator | _string_ | ` ~ ` |
| `show-next-day` | Show next-day marker when end is earlier than start; skips swap on confirm. Without it, times are ordered on confirm only | _boolean_ | `false` |
| `time-picker-props` | Props for `mp-time-picker` (clock) | _Partial\<TimePickerProps\>_ | `{}` |
| `picker-props` | Props for `mp-picker` (picker) | _Partial\<PickerProps\>_ | `{}` |
| `time-range-picker-props` | Props for `mp-time-range-picker` | _Partial\<TimeRangePickerProps\>_ | `{}` |
| `popup-props` | Props for popup | _Partial\<PopupProps\>_ | `{}` |
| `placeholder` | Placeholder | _string_ | `-` |
| `clearable` | Clearable | _boolean_ | `false` |
| `disabled` | Disabled | _boolean_ | `false` |
| `readonly` | Readonly | _boolean_ | `false` |
| `size` | `normal` \| `small` | _string_ | `normal` |
| `variant` | `standard` \| `outlined` | _string_ | `standard` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `focus` | Focused | `-` |
| `blur` | Blurred | `-` |
| `change` | Confirmed value change | _value: string[]_ |
| `clear` | Cleared | _value: string[]_ |
| `close` | Popup closed | _value: string[]_ |

### CSS Variables

| Variable | Default |
| --- | --- |
| `--time-range-label-font-size` | `16px` |
| `--time-range-arrow-size` | `20px` |
| `--time-range-toolbar-height` | `var(--picker-toolbar-height, 44px)` |
| `--time-range-toolbar-padding` | `var(--picker-toolbar-padding, 0 4px)` |
| `--time-range-title-text-color` | `var(--picker-title-text-color, #555)` |
| `--time-range-title-font-size` | `var(--picker-title-font-size, 16px)` |
| `--time-range-cancel-button-text-color` | `var(--picker-cancel-button-text-color, #888)` |
| `--time-range-confirm-button-text-color` | `var(--picker-confirm-button-text-color, var(--color-primary))` |

Panel CSS variables: [`TimeRangePicker`](/en-US/time-range-picker).
