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

### Clock Presentation

Hour, minute, and second wheels are used by default. Set `presentation="clock"` to use the clock panel.

```html
<script setup>
  import { ref } from 'vue'

  const time = ref()
</script>

<template>
  <mp-time v-model="time" presentation="clock" format="24hr" placeholder="Select time with clock" clearable />
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

| Prop                | Description                                             | Type                         | Default    |
| ------------------- | ------------------------------------------------------- | ---------------------------- | ---------- |
| `v-model`           | Bound value (`HH:mm` or `HH:mm:ss`)                     | _string_                     | `-`        |
| `open`              | Controlled popup visibility                             | _boolean_                    | `-`        |
| `presentation`      | Panel mode: `clock` or `picker`                         | _string_                     | `picker`   |
| `format`            | Display format: `ampm` `24hr`                           | _string_                     | `ampm`     |
| `use-seconds`       | Enable seconds                                          | _boolean_                    | `false`    |
| `min`               | Minimum time                                            | _string_                     | `-`        |
| `max`               | Maximum time                                            | _string_                     | `-`        |
| `disabled-time`     | Disabled time filter (callback returns true to disable) | _DisabledTime_               | `-`        |
| `time-picker-props` | Props passed to `mp-time-picker`                        | _Partial\<TimePickerProps\>_ | `{}`       |
| `picker-props`      | Props passed to `mp-picker`                             | _Partial\<PickerProps\>_     | `{}`       |
| `popup-props`       | Props passed to popup                                   | _Partial\<PopupProps\>_      | `{}`       |
| `placeholder`       | Placeholder                                             | _string_                     | `-`        |
| `clearable`         | Show clear button                                       | _boolean_                    | `false`    |
| `disabled`          | Disabled                                                | _boolean_                    | `false`    |
| `readonly`          | Readonly                                                | _boolean_                    | `false`    |
| `size`              | Size: `xs` `sm` `md` `lg` `xl`                          | _ComponentSize_              | `md`       |
| `variant`           | Variant: `filled` `standard` `outlined`                 | _string_                     | `standard` |

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

### Type Definitions

```ts
type DisabledTime = {
  hours?: (hour: number) => boolean
  minutes?: (minute: number) => boolean
  seconds?: (second: number) => boolean
}
```

# TimePicker

> 源码已并入 `time/`，安装父组件时一并注册。静态成员：`Time.Picker`。

### Intro

Time selection **panel**. It uses column wheels by default and can also render a clock face.

Form field: [`Time`](/en-US/time). Time range field: [`TimeRange`](/en-US/time-range). Time range panel: [`TimeRangePicker`](/en-US/time-range-picker).

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('11:20')
</script>

<template>
  <mp-time-picker v-model="date" />
</template>
```

### Clock Mode

Set `presentation="clock"` to render the clock face.

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('11:20')
</script>

<template>
  <mp-time-picker v-model="date" presentation="clock" />
</template>
```

### 24hr Format

Use `format` prop to change the format of the picker. The default value of `format` is `ampm`.

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('15:20')
</script>

<template>
  <mp-time-picker v-model="date" presentation="clock" format="24hr" />
</template>
```

### Show Seconds

Use `use-seconds` to show seconds.

In clock mode, selecting hour / minute / second advances to the next unit. Tap the corresponding digit in the title to switch back.

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('17:36:22')
</script>

<template>
  <mp-time-picker v-model="date" presentation="clock" format="24hr" use-seconds />
</template>
```

### Readonly

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('07:10')
</script>

<template>
  <mp-time-picker v-model="date" readonly />
</template>
```

### Time Limit

Use `min`, `max` and `disabled-time` prop to allow the maximum and minimum time.

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('07:10:12')

  const disabledTime = {
    hours: (hour) => hour % 2 !== 0,
    minutes: (minute) => minute % 15 !== 0,
    seconds: (second) => second % 2 !== 0,
  }
</script>

<template>
  <mp-time-picker v-model="date" format="24hr" use-seconds min="2:28:38" max="19:40:22" :disabled-time="disabledTime" />
</template>
```

### Actions Slots

```html
<script setup>
  import { ref } from 'vue'

  const date = ref('17:36:22')
</script>

<template>
  <mp-time-picker v-model="date">
    <template #actions>
      <mp-space size="small">
        <mp-button status="primary" variant="text">ACTION</mp-button>
        <mp-button status="primary" variant="text">ACTION</mp-button>
      </mp-space>
    </template>
  </mp-time-picker>
</template>
```

## API

### Props

| Prop            | Description                                                                                                        | Type                          | Default       |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------------- |
| `v-model`       | Selected time（ISO 8601 format, `HH:mm` or `HH:mm:ss`）                                                            | _string_                      | `-`           |
| `presentation`  | Panel mode: `picker` or `clock`                                                                                    | _string_                      | `picker`      |
| `picker-props`  | Props passed to `Picker` in column-wheel mode                                                                      | _object_                      | `-`           |
| `format`        | Picker type, optional values `ampm` `24hr`                                                                         | _string_                      | `ampm`        |
| `color`         | Picker color                                                                                                       | _string_                      | `-`           |
| `title-color`   | Color of picker title. If not specified it will use the color defined by `color` prop or the default picker color. | _string_                      | `-`           |
| `hint`          | Picker hint                                                                                                        | _string_                      | `SELECT TIME` |
| `elevation`     | Elevation level, options `true` `false` and level of `0-24`                                                        | _string \| number \| boolean_ | `false`       |
| `min`           | Minimum allowed time (ISO 8601 format)                                                                             | _string_                      | `-`           |
| `max`           | Maximum allowed time (ISO 8601 format)                                                                             | _string_                      | `-`           |
| `disabled-time` | Disabled time filter (callback returns true to disable)                                                            | _DisabledTime_                | `-`           |
| `readonly`      | Readonly                                                                                                           | _boolean_                     | `false`       |
| `use-seconds`   | Whether to display seconds                                                                                         | _boolean_                     | `false`       |

### TimePicker DisabledTime

| Prop      | Description                 | Type                          | Default |
| --------- | --------------------------- | ----------------------------- | ------- |
| `hours`   | Limit the optional `hour`   | _Function: hour => boolean_   | `-`     |
| `minutes` | Limit the optional `minute` | _Function: minute => boolean_ | `-`     |
| `seconds` | Limit the optional `second` | _Function: second => boolean_ | `-`     |

### Events

| Event    | Description                | arguments       |
| -------- | -------------------------- | --------------- |
| `change` | Emitted after time changed | `value: string` |

### slots

| Name      | Description                          | SlotProps |
| --------- | ------------------------------------ | --------- |
| `actions` | Custom the views in the action panel | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                             | Default                     |
| ---------------------------------------------------- | --------------------------- |
| `--time-picker-border-radius`                        | `4px`                       |
| `--time-picker-font-size`                            | `var(--font-size-md)`       |
| `--time-picker-min-width`                            | `290px`                     |
| `--time-picker-title-height`                         | `105px`                     |
| `--time-picker-title-padding`                        | `16px`                      |
| `--time-picker-title-margin-bottom`                  | `8px`                       |
| `--time-picker-title-color`                          | `#fff`                      |
| `--time-picker-title-background`                     | `var(--color-primary)`      |
| `--time-picker-title-hint-color`                     | `'#fff'`                    |
| `--time-picker-title-hint-font-size`                 | `14px`                      |
| `--time-picker-title-hint-min-height`                | `21px`                      |
| `--time-picker-title-inactive-opacity`               | `0.6`                       |
| `--time-picker-title-time-font-size`                 | `50px`                      |
| `--time-picker-title-time-margin`                    | `0 5px`                     |
| `--time-picker-title-time-border-radius`             | `4px`                       |
| `--time-picker-title-time-padding`                   | `4px 6px`                   |
| `--time-picker-title-time-background`                | `rgba(255, 255, 255, 0.12)` |
| `--time-picker-title-time-active-background`         | `rgba(255, 255, 255, 0.28)` |
| `--time-picker-title-time-container-justify-content` | `flex-end`                  |
| `--time-picker-title-ampm-button-active-background`  | `transparent`               |
| `--time-picker-title-ampm-margin-left`               | `10px`                      |
| `--time-picker-title-ampm-border-radius`             | `0`                         |
| `--time-picker-title-ampm-border`                    | `none`                      |
| `--time-picker-title-ampm-button-padding`            | `2px`                       |
| `--time-picker-clock-left`                           | `27px`                      |
| `--time-picker-clock-right`                          | `27px`                      |
| `--time-picker-clock-top`                            | `27px`                      |
| `--time-picker-clock-bottom`                         | `27px`                      |
| `--time-picker-clock-container-width`                | `256px`                     |
| `--time-picker-clock-container-height`               | `256px`                     |
| `--time-picker-clock-container-background`           | `#e0e0e0`                   |
| `--time-picker-clock-hand-height`                    | `calc(50% - 4px)`           |
| `--time-picker-clock-hand-width`                     | `2px`                       |
| `--time-picker-clock-hand-bottom`                    | `50%`                       |
| `--time-picker-clock-hand-left`                      | `calc(50% - 1px)`           |
| `--time-picker-clock-hand-background`                | `var(--color-primary)`      |
| `--time-picker-clock-hand-border-color`              | `var(--color-primary)`      |
| `--time-picker-clock-hand-before-width`              | `10px`                      |
| `--time-picker-clock-hand-before-height`             | `10px`                      |
| `--time-picker-clock-hand-before-border-width`       | `2px`                       |
| `--time-picker-clock-hand-after-width`               | `4px`                       |
| `--time-picker-clock-hand-after-height`              | `4px`                       |
| `--time-picker-clock-item-height`                    | `32px`                      |
| `--time-picker-clock-item-width`                     | `32px`                      |
| `--time-picker-clock-item-active-background`         | `var(--color-primary)`      |
| `--time-picker-clock-item-active-color`              | `var(--color-white)`        |
| `--time-picker-clock-item-disable-color`             | `rgba(0, 0, 0, 0.26)`       |
| `--time-picker-clock-item-disable-background`        | `#bdbdbd`                   |
| `--time-picker-clock-item-text-color`                | `#555`                      |
| `--time-picker-inner-left`                           | `36px`                      |
| `--time-picker-inner-right`                          | `36px`                      |
| `--time-picker-inner-top`                            | `36px`                      |
| `--time-picker-inner-bottom`                         | `36px`                      |
| `--time-picker-body-background`                      | `#fff`                      |
| `--time-picker-body-height`                          | `288px`                     |
| `--time-picker-actions-padding`                      | `0 8px 12px 8px`            |
