# Switch

### Intro

Switching Selector.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>

<template>
  <mp-switch v-model="value" />
</template>
```

### Disabled

```html
<template>
  <mp-switch v-model="value" disabled />
</template>
```

### Readonly

```html
<template>
  <mp-switch v-model="value" readonly />
</template>
```

### Custom Color

```html
<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>

<template>
  <mp-switch v-model="value" checked-color="var(--color-warning)" unchecked-color="var(--color-info)" />
</template>
```

### Size

Use `size` prop to change size of Switch.

```html
<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>

<template>
  <mp-switch v-model="value" :size="15" />
  <mp-switch v-model="value" />
  <mp-switch v-model="value" :size="25" />
</template>
```

### Loading

```html
<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>

<template>
  <mp-switch v-model="true" loading />
</template>
```

### Validate Value

Validation rules are now configured on `mp-form-item`, see [Form](#/en-US/form).

### Asynchronous Change

In some scenarios, you may need to wait for the server to return successfully before making changes.
`lazy-change` prevents binding value updates on the component itself.
Register `before-change` events for manual updates.

```html
<script setup>
import { ref } from 'vue'

const value = ref(true)

function handleBeforeChange(value, change) {
  setTimeout(() => change(value), 500)
}
</script>

<template>
  <mp-switch 
    lazy-change
    v-model="value"
    :before-change="handleBeforeChange"
  />
</template>
```

### Variant

```html
<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>

<template>
  <mp-switch variant v-model="value" />
</template>
```

## API

### Props

| Prop             | Description | Type | Default |
|------------------| -------------- | -------- | ---------- |
| `v-model`        | Check status of Switch	| _any_ | `false` |
| `checked-value`   | The value when the switch is turned on	| _any_ | `true` |
| `unchecked-value` | The value when the switch is turned off	| _any_ | `false` |
| `disabled`       | Whether to disable switch| _boolean_ | `false` |
| `readonly`       | Whether to readonly switch | _boolean_ | `false` |
| `loading`        | Whether to show loading icon | _boolean_ | `false` |
| `ripple`         | Whether to open ripple | _boolean_ | `true` |
| `handle-elevation` | The elevation of handle button | _boolean_ | `true` |
| `checked-color`  | Background color when open | _string_ | `-` |
| `unchecked-color` | Background color when close | _string_ | `-` |
| `loading-color`  | Color of loading icon | _string_ | `-` |
| `size`           | Size of switch | _string \| number_ | `-` |
| `lazy-change`    | Whether to allow the `before-change` event to be triggered | _boolean_  | `false` |
| `variant` ***3.2.3*** | Variant mode | _boolean_ | `false` |

### Events

| Event | Description | arguments |
| ----- | -------------- | -------- |
| `click` | Emitted when component is clicked | `event: Event` |
| `change` | Emitted when check status changed | `value: any` |
| `before-change` | Triggered before a change event (`lazy-change` mode only) | `value: any` <br> `change: (value: any) => void` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--switch-track-background` | `#fff` |
| `--switch-track-active-background` | `var(--color-primary)` |
| `--switch-track-error-background` | `var(--color-danger)` |
| `--switch-ripple-color` | `var(--color-primary)` |
| `--switch-handle-background` | `var(--color-on-primary)` |
| `--switch-handle-color` | `var(--color-primary)` |
| `--switch-handle-active-color` | `var(--color-on-primary)` |
| `--switch-handle-active-background` | `var(--color-primary)` |
| `--switch-handle-error-background` | `var(--color-danger)` |
| `--switch-disabled-opacity` | `var(--opacity-disabled)` |
| `--switch-variant-width` | `52px` |
| `--switch-variant-height` | `32px` |
| `--switch-variant-track-border-color` | `#888` |
| `--switch-variant-track-background` | `var(--color-surface-container-highest)` |
| `--switch-variant-handle-width` | `24px` |
| `--switch-variant-handle-height` | `24px` |
| `--switch-variant-handle-color` | `var(--color-on-primary)` |
| `--switch-variant-handle-active-color` | `var(--color-primary)` |
| `--switch-variant-handle-background` | `#888` |
| `--switch-variant-handle-active-background` | `var(--color-on-primary)` |
| `--switch-width` | `40px` |
| `--switch-height` | `24px` |
| `--switch-track-width` | `38px` |
| `--switch-track-height` | `14.4px` |
| `--switch-track-border-radius` | `calc(20px * 2 / 3)` |
| `--switch-handle-width` | `20px` |
| `--switch-handle-height` | `20px` |
| `--switch-ripple-size` | `40px` |
| `--switch-ripple-left` | `-10px` |
| `--switch-ripple-active-left` | `10px` |
| `--switch-loading-size` | `16px` |
| `--switch-variant-ripple-left` | `-4px` |
| `--switch-variant-ripple-active-left` | `16px` |