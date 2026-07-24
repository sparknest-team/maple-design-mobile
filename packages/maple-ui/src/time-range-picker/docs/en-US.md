# TimeRangePicker

### Intro

Time range selection **panel**. Embed alone when you only need the panel. The header shows start / end; tap to switch the active side.

- `presentation="clock"` (default): clock panel
- `presentation="picker"`: column wheels (hour / minute / second)

Form field: [`TimeRange`](/en-US/time-range). Single time panel: [`TimePicker`](/en-US/time-picker).

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" />
</template>
```

### Picker Mode

```html
<script setup>
import { ref } from 'vue'

const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" presentation="picker" format="24hr" />
</template>
```

### 24hr Format and Seconds

```html
<script setup>
import { ref } from 'vue'

const range = ref(['09:00:00', '18:00:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" format="24hr" use-seconds />
</template>
```

### Readonly

```html
<script setup>
import { ref } from 'vue'

const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" readonly />
</template>
```

### Next Day Label

```html
<script setup>
import { ref } from 'vue'

const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" show-next-day format="24hr" />
</template>
```

### Actions

```html
<script setup>
import { ref } from 'vue'

const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker v-model="range">
    <template #actions>
      <mp-space size="small">
        <mp-button type="primary" text>Action</mp-button>
        <mp-button type="primary" text>Action</mp-button>
      </mp-space>
    </template>
  </mp-time-range-picker>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Binding value | _string[]_ | `[]` |
| `presentation` | Panel mode: `clock` `picker` | _string_ | `clock` |
| `format` | Format: `ampm` `24hr` (mainly for clock) | _string_ | `ampm` |
| `use-seconds` | Whether to select seconds | _boolean_ | `false` |
| `min` | Minimum allowed time | _string_ | `-` |
| `max` | Maximum allowed time | _string_ | `-` |
| `allowed-time` | Allowed times | _AllowedTime_ | `-` |
| `show-next-day` | Show next-day marker on the end side when end is earlier than start. Panel selection does not swap; swap happens on `TimeRange` confirm when this prop is off | _boolean_ | `false` |
| `time-picker-props` | Props passed to `mp-time-picker` (clock) | _Partial\<TimePickerProps\>_ | `{}` |
| `picker-props` | Props passed to `mp-picker` (picker) | _Partial\<PickerProps\>_ | `{}` |
| `readonly` | Whether readonly | _boolean_ | `false` |
| `elevation` | Elevation: `true` `false` or `0-24` | _string \| number \| boolean_ | `false` |

### TimeRangePicker AllowedTime

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `hours` | Restrict optional `hour` | _Function: hour => boolean_ | `-` |
| `minutes` | Restrict optional `minute` | _Function: minute => boolean_ | `-` |
| `seconds` | Restrict optional `second` | _Function: second => boolean_ | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Emitted when the range changes | `value: string[]` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `actions` | Custom actions panel | `-` |

### Style Variables

Component css variables. Customize via [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--time-range-picker-values-height` | `56px` |
| `--time-range-picker-values-font-size` | `20px` |
| `--time-range-picker-values-font-weight` | `500` |
| `--time-range-picker-value-color` | `var(--color-on-surface-variant)` |
| `--time-range-picker-value-active-color` | `var(--color-primary)` |
| `--time-range-picker-value-arrow-color` | `var(--color-outline)` |
| `--time-range-picker-value-arrow-size` | `18px` |
| `--time-range-picker-next-day-color` | `var(--color-outline)` |
| `--time-range-picker-border-radius` | `var(--time-picker-border-radius, 4px)` |
| `--time-range-picker-background` | `var(--color-surface-container-high)` |
