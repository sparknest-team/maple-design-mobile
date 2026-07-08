# Steps

### Intro

Steps is a navigation bar that guides users through the steps of a task.

### Basic Usage

Use `active` prop to control the progress of step, value is index of step and is counted from `0`.

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)

function next() {
  active.value = (active.value + 1) % 4
}
</script>

<template>
  <mp-steps :active="active">
    <mp-step>Step1</mp-step>
    <mp-step>Step2</mp-step>
    <mp-step>Step3</mp-step>
    <mp-step>Step4</mp-step>
  </mp-steps>
  <mp-button type="primary" block @click="next">next</mp-button>
</template>
```


### Custom Style

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-steps
    :active="active"
    active-color="var(--color-danger)" 
    inactive-color="var(--color-warning)"
  >
    <mp-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">
      Step1
    </mp-step>
    <mp-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">
      Step2
    </mp-step>
    <mp-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">
      Step3
    </mp-step>
    <mp-step active-icon="heart" current-icon="fire" inactive-icon="heart-half-full">
      Step4
    </mp-step>
  </mp-steps>
</template>
```

### Vertical Mode

Change the display direction of the step bar through the `direction` attribute.

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-steps direction="vertical" :active="active">
    <mp-step>Step1</mp-step>
    <mp-step>Step2</mp-step>
    <mp-step>Step3</mp-step>
    <mp-step>Step4</mp-step>
  </mp-steps>
</template>
```

## API

### Props

#### Steps Props

| Prop | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `active` | Active step | _string \| number_ | `0` |
| `direction` | Mode of steps, can be set to `horizontal` `vertical` | _string_ | `horizontal` |
| `active-color` | Active step color | _string_ | `-` |
| `inactive-color` | Inactive step color | _string_ | `-` |

#### Step Props

| Prop | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `active-icon` | Active icon name  | _string_ | `check` |
| `current-icon` | Icon name of current ste	 | _string_ | `-`|
| `inactive-icon` | Inactive icon name	 | _string_ | `-`|
| `active-icon-namespace` | Active icon namespace  | _string_ | `mp-icon` |
| `current-icon-namespace` | Current icon namespace | _string_ |`mp-icon` |
| `inactive-icon-namespace` | Inactive icon namespace | _string_ | `mp-icon` |

### Events

#### Steps Events

| Event | Description | arguments |
| ----- | -------------- | -------- |
| `click-step` | Emitted after click step | `index: number` |

### Slots

#### Steps Slots

| Name | Description      | SlotProps |
| ----- |------------------| -------- |
| `default` | Content of steps | `-`|

#### Step Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Content of step | `-`|

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--step-tag-size` | `20px` |
| `--step-tag-background` | `#9e9e9e` |
| `--step-tag-font-size` | `var(--font-size-md)` |
| `--step-tag-color` | `var(--color-on-primary)` |
| `--step-tag-active-color` | `var(--color-primary)` |
| `--step-tag-margin` | `4px 0` |
| `--step-tag-icon-size` | `var(--font-size-lg)` |
| `--step-content-font-size` | `var(--font-size-md)` |
| `--step-content-color` | `rgba(0, 0, 0, 0.38)` |
| `--step-content-active-color` | `#000` |
| `--step-line-background` | `#000` |
| `--step-line-gap` | `8px` |
| `--step-vertical-tag-margin` | `0 4px` |
| `--step-vertical-min-height` | `50px` |
