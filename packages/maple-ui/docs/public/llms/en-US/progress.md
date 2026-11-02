<!-- Source: src/progress/docs/en-US.md; locale: en-US; page: /en-US/progress -->

# Progress

Displays determinate or indeterminate progress. Cedar and Maple maintain independent copies of the same implementation.

### basic-usage

Example source: src/progress/example/demos/basic-usage.vue

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const value = ref(0)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    if (value.value >= 100) {
      value.value = 0
      return
    }

    value.value += 20
  }, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress :percent="20" />
    <mp-progress :percent="value" :track="false" show-text />
    <mp-progress :percent="100" show-text>success</mp-progress>
  </mp-space>
</template>
```

### status

Example source: src/progress/example/demos/status.vue

```vue
<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
</script>
<template>
  <div style="display: grid; gap: 16px">
    <mp-progress v-for="status in statuses" :key="status" :status="status" :percent="60"
      ><template #text>{{ status }}</template></mp-progress
    >
    <mp-progress :percent="100" />
  </div>
</template>
```

### size

Example source: src/progress/example/demos/size.vue

```vue
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>
<template>
  <div style="display: grid; gap: 16px">
    <div v-for="size in sizes" :key="size" style="display: flex; align-items: center; gap: 16px">
      <span>{{ size }}</span
      ><mp-progress :size="size" :percent="42" /><mp-progress mode="circle" :size="size" :percent="42" />
    </div>
    <mp-progress :size="10" :percent="12.5" />
    <mp-progress size="0.75rem" :stroke-width="6" :percent="60" />
    <mp-progress mode="circle" size="6rem" :percent="75" />
  </div>
</template>
```

### circle

Example source: src/progress/example/demos/circle.vue

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const value = ref(0)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    if (value.value >= 100) {
      value.value = 0
      return
    }

    value.value += 20
  }, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <mp-space wrap :size="['8vmin', '8vmin']">
    <mp-progress
      mode="circle"
      size="18vmin"
      :percent="100"
      :color="{
        '0%': '#3fecff',
        '100%': '#6149f6',
      }"
    />
    <mp-progress mode="circle" :percent="75" size="18vmin" :track="false" />
    <mp-progress mode="circle" show-text :percent="value" stroke-width="5" size="18vmin" />
    <mp-progress mode="circle" status="success" show-text :percent="100" stroke-width="5" size="18vmin">
      success
    </mp-progress>
  </mp-space>
</template>
```

### step

Example source: src/progress/example/demos/step.vue

```vue
<template>
  <div style="display: grid; gap: 16px">
    <mp-progress :steps="5" :percent="40" />
    <mp-progress :steps="10" :percent="75" status="warning" size="lg" />
    <mp-progress :steps="5" :percent="100" />
  </div>
</template>
```

### loop

Example source: src/progress/example/demos/loop.vue

```vue
<template>
  <div style="display: grid; gap: 16px">
    <mp-progress indeterminate aria-label="Loading" />
    <mp-progress mode="circle" indeterminate aria-label="Loading" />
    <mp-progress :percent="60" animation />
  </div>
</template>
```

### advanced

Example source: src/progress/example/demos/advanced.vue

```vue
<script setup>
import { ref } from 'vue'

const gradient = ref(false)
</script>
<template>
  <div style="display: grid; gap: 16px">
    <mp-switch v-model="gradient" aria-label="Gradient" />
    <mp-progress
      :percent="65"
      :color="gradient ? { '0%': '#722ed1', '100%': '#0fc6c2' } : '#722ed1'"
      buffer-color="#eee5ff"
    />
    <div style="display: flex; gap: 24px">
      <mp-progress
        mode="circle"
        :percent="65"
        :rotate="90"
        :color="gradient ? { '0%': '#722ed1', '100%': '#0fc6c2' } : '#722ed1'"
      />
      <mp-progress mode="circle" :percent="65" :track="false"
        ><template #text="{ percent }">{{ percent }} / 100</template></mp-progress
      >
    </div>
  </div>
</template>
```

### More styles and indeterminate progress

Example source: src/progress/example/demos/style.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress :percent="40" color="linear-gradient(131.53deg, #3fecff 0%, #6149f6 100%)" />
    <mp-progress status="info" :percent="40" />
    <mp-progress status="success" :percent="60" />
    <mp-progress percent="80" stroke-width="8" color="#ff9f00" track-color="#f5cb90" />
  </mp-space>
</template>
```

Example source: src/progress/example/demos/indeterminate-progress.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress indeterminate />
    <mp-progress indeterminate status="info" />

    <mp-space wrap justify="space-between">
      <mp-progress mode="circle" indeterminate size="18vmin" />
      <mp-progress mode="circle" status="info" indeterminate size="18vmin" />
    </mp-space>
  </mp-space>
</template>
```

### API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| mode | Line or circle | `line \| circle` | `line` |
| percent | Decimal 0–100; numeric strings supported; invalid values become zero, out-of-range values clamp | `number \| string` | `0` |
| size | xs/sm/md/lg/xl or CSS length; line thickness / circle diameter | `ProgressSize` | `md` |
| stroke-width | Overrides thickness, numbers in px | `number \| string` | size preset |
| steps | Line segments, floored and clamped to 0–1000; ignored when indeterminate | `number` | `0` |
| status | default/primary/secondary/tertiary/info/success/warning/danger; default becomes success at 100 unless indeterminate | `ProgressStatus` | `default` |
| color | Solid or gradient stops; overrides status | `ProgressColor` | — |
| track-color | Background track color | `string` | — |
| buffer-color | Remaining line track decoration, not a second progress value | `ProgressColor` | — |
| track | Show track and buffer decoration | `boolean` | `true` |
| show-text | Show text; xs circle hides text | `boolean` | `true` |
| text-class | Text container class | `string` | — |
| rotate | Clockwise angle from twelve o'clock | `number` | `0` |
| animation | Determinate continuous line shimmer | `boolean` | `false` |
| indeterminate | Unknown progress; omits aria-valuenow | `boolean` | `false` |

### Sizes and slots

All five presets are implemented. Thickness: 2/3/4/6/8px; circle diameter: 16/48/64/80/96px. Custom numbers and numeric strings use px; CSS lengths such as rem, percentages and calc are retained. Invalid or nonpositive lengths fall back to md. stroke-width overrides thickness. Percentage circle sizes require a defined parent width. Cedar inherits ConfigProvider size; Maple defaults to md.

Both text and default slots receive `{ percent: number }`; text wins. Unknown progress displays an ellipsis by default. Supply aria-label for the task name. The component is display-only and emits no value updates. Built-in animations respect reduced motion.

### Types

Exports ProgressProps, ProgressInstance, ProgressSize, ProgressMode, ProgressStatus, ProgressColor and progressProps.

### Style variables

| Variable | Default |
| --- | --- |
| `--mp-progress-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-progress-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-track-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-progress-default-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-progress-primary-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-progress-secondary-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-tertiary-color` | `var(--mp-sys-color-content-tertiary)` |
| `--mp-progress-info-color` | `var(--mp-sys-color-content-info)` |
| `--mp-progress-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-progress-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-progress-danger-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-progress-line-border-radius` | `9999px` |
| `--mp-progress-text-gap` | `var(--mp-sys-space-4)` |
| `--mp-progress-steps-gap` | `var(--mp-sys-space-2)` |
| `--mp-progress-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-progress-animation-duration` | `1.5s` |

Determinate circle success/danger states show completion/failure icons, including xs. The text slot overrides them; numeric ARIA is retained.
