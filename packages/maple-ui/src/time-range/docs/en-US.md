# TimeRange

### Intro

Form time-range **field**. Cancel discards the draft; Confirm writes `v-model`.

The popup uses [`TimeRangePicker`](/en-US/time-range-picker) as the panel. The header shows start / end; tap to switch the active side.

- Uses column wheels by default (hour / minute / second)
- `presentation="clock"`: clock panel

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

### Clock Mode

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range v-model="range" presentation="clock" format="24hr" placeholder="Clock time range" clearable />
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
  <mp-time-range v-model="range" show-next-day format="24hr" placeholder="Overnight range" clearable />
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

| Prop                      | Description                                                                                                               | Type                              | Default    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------- |
| `v-model`                 | Bound value                                                                                                               | _string[]_                        | `[]`       |
| `open`                    | Controlled popup visibility                                                                                               | _boolean_                         | `-`        |
| `presentation`            | Panel mode: `clock` \| `picker`                                                                                           | _string_                          | `picker`   |
| `format`                  | Format: `ampm` \| `24hr` (mainly for clock)                                                                               | _string_                          | `ampm`     |
| `use-seconds`             | Enable seconds                                                                                                            | _boolean_                         | `false`    |
| `min`                     | Min time                                                                                                                  | _string_                          | `-`        |
| `max`                     | Max time                                                                                                                  | _string_                          | `-`        |
| `disabled-time`           | Disabled time filter (callback returns true to disable)                                                                   | _DisabledTime_                    | `-`        |
| `separator`               | Display separator                                                                                                         | _string_                          | `~`        |
| `show-next-day`           | Show next-day marker when end is earlier than start; skips swap on confirm. Without it, times are ordered on confirm only | _boolean_                         | `false`    |
| `time-picker-props`       | Props for `mp-time-picker` (clock)                                                                                        | _Partial\<TimePickerProps\>_      | `{}`       |
| `picker-props`            | Props for `mp-picker` (picker)                                                                                            | _Partial\<PickerProps\>_          | `{}`       |
| `time-range-picker-props` | Props for `mp-time-range-picker`                                                                                          | _Partial\<TimeRangePickerProps\>_ | `{}`       |
| `popup-props`             | Props for popup                                                                                                           | _Partial\<PopupProps\>_           | `{}`       |
| `placeholder`             | Placeholder                                                                                                               | _string_                          | `-`        |
| `clearable`               | Clearable                                                                                                                 | _boolean_                         | `false`    |
| `disabled`                | Disabled                                                                                                                  | _boolean_                         | `false`    |
| `readonly`                | Readonly                                                                                                                  | _boolean_                         | `false`    |
| `size`                    | `xs` `sm` `md` `lg` `xl`                                                                                                  | _ComponentSize_                   | `md`       |
| `variant`                 | `filled` \| `standard` \| `outline`                                                                                      | _string_                          | `standard` |

### Events

| Event    | Description            | Arguments         |
| -------- | ---------------------- | ----------------- |
| `focus`  | Focused                | `-`               |
| `blur`   | Blurred                | `-`               |
| `change` | Confirmed value change | _value: string[]_ |
| `clear`  | Cleared                | _value: string[]_ |
| `close`  | Popup closed           | _value: string[]_ |

### CSS Variables

| Variable                                 | Default                                                         |
| ---------------------------------------- | --------------------------------------------------------------- |
| `--time-range-label-font-size`           | `16px`                                                          |
| `--time-range-arrow-size`                | `20px`                                                          |
| `--time-range-toolbar-height`            | `var(--picker-toolbar-height, 44px)`                            |
| `--time-range-toolbar-padding`           | `var(--picker-toolbar-padding, 0 4px)`                          |
| `--time-range-title-text-color`          | `var(--picker-title-text-color, #555)`                          |
| `--time-range-title-font-size`           | `var(--picker-title-font-size, 16px)`                           |

Panel CSS variables: [`TimeRangePicker`](/en-US/time-range-picker).

# TimeRangePicker

> 源码已并入 `time-range/`，安装父组件时一并注册。静态成员：`TimeRange.Picker`。

### Intro

Time range selection **panel**. Embed alone when you only need the panel. The header shows start / end; tap to switch the active side.

- Uses column wheels by default (hour / minute / second)
- `presentation="clock"`: clock panel

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

### Clock Mode

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker v-model="range" presentation="clock" format="24hr" />
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
      <mp-space size="sm">
        <mp-button status="primary" variant="text">Action</mp-button>
        <mp-button status="primary" variant="text">Action</mp-button>
      </mp-space>
    </template>
  </mp-time-range-picker>
</template>
```

## API

### Props

| Prop                | Description                                                                                                                                                   | Type                          | Default  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| `v-model`           | Binding value                                                                                                                                                 | _string[]_                    | `[]`     |
| `presentation`      | Panel mode: `clock` `picker`                                                                                                                                  | _string_                      | `picker` |
| `format`            | Format: `ampm` `24hr` (mainly for clock)                                                                                                                      | _string_                      | `ampm`   |
| `use-seconds`       | Whether to select seconds                                                                                                                                     | _boolean_                     | `false`  |
| `min`               | Minimum allowed time                                                                                                                                          | _string_                      | `-`      |
| `max`               | Maximum allowed time                                                                                                                                          | _string_                      | `-`      |
| `disabled-time`     | Disabled times (callback returns true to disable)                                                                                                             | _DisabledTime_                | `-`      |
| `show-next-day`     | Show next-day marker on the end side when end is earlier than start. Panel selection does not swap; swap happens on `TimeRange` confirm when this prop is off | _boolean_                     | `false`  |
| `time-picker-props` | Props passed to `mp-time-picker` (clock)                                                                                                                      | _Partial\<TimePickerProps\>_  | `{}`     |
| `picker-props`      | Props passed to `mp-picker` (picker)                                                                                                                          | _Partial\<PickerProps\>_      | `{}`     |
| `readonly`          | Whether readonly                                                                                                                                              | _boolean_                     | `false`  |
| `elevation`         | Elevation: `true` `false` or `0-24`                                                                                                                           | _number \| boolean_ | `false`  |

### TimeRangePicker DisabledTime

| Prop      | Description                | Type                          | Default |
| --------- | -------------------------- | ----------------------------- | ------- |
| `hours`   | Restrict optional `hour`   | _Function: hour => boolean_   | `-`     |
| `minutes` | Restrict optional `minute` | _Function: minute => boolean_ | `-`     |
| `seconds` | Restrict optional `second` | _Function: second => boolean_ | `-`     |

### Events

| Event    | Description                    | Arguments         |
| -------- | ------------------------------ | ----------------- |
| `change` | Emitted when the range changes | `value: string[]` |

### Slots

| Slot      | Description          | Arguments |
| --------- | -------------------- | --------- |
| `actions` | Custom actions panel | `-`       |

### Style Variables

Component css variables. Customize via [StyleProvider](#/en-US/style-provider).

| Variable                                 | Default                                 |
| ---------------------------------------- | --------------------------------------- |
| `--time-range-picker-values-height`      | `56px`                                  |
| `--time-range-picker-values-font-size`   | `20px`                                  |
| `--time-range-picker-values-font-weight` | `500`                                   |
| `--time-range-picker-value-color`        | `var(--color-text-3)`                   |
| `--time-range-picker-value-active-color` | `var(--color-primary)`                  |
| `--time-range-picker-value-arrow-color`  | `var(--color-border-2)`                 |
| `--time-range-picker-value-arrow-size`   | `18px`                                  |
| `--time-range-picker-next-day-color`     | `var(--color-border-2)`                 |
| `--time-range-picker-border-radius`      | `var(--time-picker-border-radius, 4px)` |
| `--time-range-picker-background`         | `var(--color-fill-2)`                   |
