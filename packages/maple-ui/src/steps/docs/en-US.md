# Steps

### Intro

Steps is a navigation bar that guides users through the steps of a task. Progress is controlled by `current`, counted from **1** (aligned with Pagination / PC).

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const current = ref(1)

function next() {
  current.value = current.value >= 4 ? 1 : current.value + 1
}
</script>

<template>
  <mp-steps :current="current">
    <mp-step>Step1</mp-step>
    <mp-step>Step2</mp-step>
    <mp-step>Step3</mp-step>
    <mp-step>Step4</mp-step>
  </mp-steps>
  <mp-button type="primary" block @click="next">next</mp-button>
</template>
```

### Error Status

Use `status="error"` to show an error state on the current step.

```html
<script setup>
import { ref } from 'vue'

const current = ref(2)
</script>

<template>
  <mp-steps :current="current" status="error">
    <mp-step>Step1</mp-step>
    <mp-step>Step2</mp-step>
    <mp-step>Step3</mp-step>
  </mp-steps>
</template>
```

### Custom Icon

Customize the node icon via the `#icon` slot. Colors are customized with `--mp-step-*` CSS variables / StyleProvider.

```html
<script setup>
import { ref } from 'vue'

const current = ref(2)
</script>

<template>
  <mp-steps :current="current">
    <mp-step>
      Step1
      <template #icon="{ status }">
        <m-icon-heart v-if="status === 'finish'" />
        <span v-else>1</span>
      </template>
    </mp-step>
    <mp-step>
      Step2
      <template #icon="{ step }">{{ step }}</template>
    </mp-step>
    <mp-step>Step3</mp-step>
  </mp-steps>
</template>
```

### Changeable

Set `changeable` to enable clicking to switch steps.

```html
<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <mp-steps v-model:current="current" changeable>
    <mp-step description="Description">Step1</mp-step>
    <mp-step description="Description">Step2</mp-step>
    <mp-step description="Description">Step3</mp-step>
  </mp-steps>
</template>
```

### Vertical

Change the display direction via the `direction` attribute.

```html
<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <mp-steps direction="vertical" :current="current">
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
| `current` | Current step (controlled, 1-based) | _number_ | `-` |
| `default-current` | Default current step (uncontrolled) | _number_ | `1` |
| `direction` | Direction, can be `vertical` | _string_ | `horizontal` |
| `status` | Status of the current step | _'wait' \| 'process' \| 'finish' \| 'error'_ | `process` |
| `changeable` | Whether steps can be switched by click | _boolean_ | `false` |

#### Step Props

| Prop | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `title` | Step title | _string_ | `-` |
| `description` | Step description | _string_ | `-` |
| `status` | Step status (overrides auto derivation) | _'wait' \| 'process' \| 'finish' \| 'error'_ | `-` |
| `disabled` | Whether disabled | _boolean_ | `false` |

### Events

#### Steps Events

| Event | Description | Arguments |
| ----- | -------------- | -------- |
| `change` | Triggered when step changes (`changeable` required) | `step: number, ev: Event` |
| `update:current` | `v-model:current` sync | `step: number` |

### Slots

#### Steps Slots

| Name | Description | Arguments |
| ----- |-----------| -------- |
| `default` | Steps content | `-` |

#### Step Slots

| Name | Description | Arguments |
| ----- | -------------- | -------- |
| `default` | Step title (takes precedence over `title`) | `-` |
| `icon` | Custom node icon | `{ step: number, status: string }` |
| `description` | Step description | `-` |

### CSS Variables

| Variable | Default |
| --- | --- |
| `--step-tag-size` | `20px` |
| `--step-tag-background` | `#9e9e9e` |
| `--step-tag-font-size` | `var(--font-size-md)` |
| `--step-tag-color` | `var(--color-white)` |
| `--step-tag-active-color` | `var(--color-primary)` |
| `--step-tag-error-color` | `var(--color-danger)` |
| `--step-tag-margin` | `4px 0` |
| `--step-tag-icon-size` | `var(--font-size-lg)` |
| `--step-content-font-size` | `var(--font-size-md)` |
| `--step-content-color` | `rgba(0, 0, 0, 0.38)` |
| `--step-content-active-color` | `#000` |
| `--step-line-background` | `#000` |
| `--step-line-gap` | `8px` |
| `--step-vertical-tag-margin` | `0 4px` |
| `--step-vertical-min-height` | `50px` |
