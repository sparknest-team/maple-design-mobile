# Counter

### Intro

Used to enter or adjust numbers within a certain range.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-counter v-model="value"/>
</template>
```

### Set Value Range

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-counter :min="0" :max="5" v-model="value"/>
</template>
```

### Set Step

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-counter :step="10" v-model="value"/>
</template>
```

### Decimal Length

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-counter :decimal-length="1" v-model="value" />
</template>
```

### Set Size

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-counter
    input-text-size="18px"
    input-width="50px"
    button-size="36px"
    v-model="value"
  />
</template>
```

### Disabled

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-counter disabled v-model="value"/>
</template>
```

### Readonly

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-counter readonly v-model="value"/>
</template>
```

### Asynchronous Change

In some scenarios, you may need to wait for the server to return successfully before making changes.
`lazy-change` prevents binding value updates on the component itself.
Register `before-change` events for manual updates.

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)

function handleBeforeChange(value, change) {
  setTimeout(() => change(value), 500)
}
</script>

<template>
  <mp-counter
    lazy-change
    v-model="value"
    :before-change="handleBeforeChange"
  />
</template>
```

> For form validation of the counter, please use the [FormItem component](#/en-US/form-item).

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | The value of the binding | _number_ | `0` |
| `min` | Minimum value | _string \| number_ | `-` |
| `max` | Maximum value | _string \| number_ | `-` |
| `step` | Step size | _string \| number_ | `1` |
| `decimal-length` | Preserve decimal places | _string \| number_ | `-` |
| `color` | Background color | _string_ | `-` |
| `input-width` | The width of the input box | _string \| number_ | `-` |
| `input-text-size` | The text size of the input box | _string \| number_ | `-` |
| `button-size` | Button size | _string \| number_ | `-` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24`, not in simple mode | _number \| boolean_|  `true` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `disable-increment` | Whether to disable increments | _boolean_ | `false` |
| `disable-decrement` | Whether to disable decrements | _boolean_ | `false` |
| `disable-input` | Whether to disable input | _boolean_ | `false` |
| `increment-button` | Whether to display the increment button | _boolean_ | `true` |
| `decrement-button` | Whether to display the decrement button | _boolean_ | `true` |
| `press` | Long press the open button | _boolean_ | `true` |
| `ripple` | Whether to open ripple | _boolean_ | `true` |
| `lazy-change` | Whether to prevent the component itself from updating the bound value | _boolean_ | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `before-change` | Triggered before the change (lazy-change mode only) | `value: number` <br> `change: (value: string \| number) => void` |
| `change` | Triggered on change | `value: number` |
| `increment` | Triggered on increment | `value: number` |
| `decrement` | Triggered on decrement | `value: number` |


### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                        | Default                      |
|---------------------------------|------------------------------|
| `--counter-padding`             | `0 4px`                      |
| `--counter-font-color`          | `#fff`                       |
| `--counter-background`          | `var(--color-primary)`       |
| `--counter-input-width`         | `28px`                       |
| `--counter-input-margin`        | `0 4px`                      |
| `--counter-input-font-size`     | `14px`                       |
| `--counter-button-size`         | `28px`                       |
| `--counter-button-text-color`         | `#fff`                       |
| `--counter-button-icon-size`    | `100%`                       |
| `--counter-disabled-color`      | `var(--color-disabled)`      |
| `--counter-disabled-opacity`    | `var(--opacity-disabled)`    |
| `--counter-error-color`         | `var(--color-danger)`        |