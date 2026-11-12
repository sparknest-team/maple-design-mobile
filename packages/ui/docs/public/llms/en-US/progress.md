<!-- Source: src/progress/docs/en-US.md; locale: en-US; page: /en-US/progress -->

# Progress

Displays determinate or indeterminate task progress.

## Basic examples

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

## Appearance and states

### Progress sizes and states

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | xs/sm/md/lg/xl or CSS length; line thickness / circle diameter | Progress sizes and states |
| `percent` | Decimal 0–100; numeric strings supported; invalid values become zero, out-of-range values clamp | Progress sizes and states |
| `mode` | Line or circle | Progress sizes and states |
| `stroke-width` | Overrides thickness, numbers in px | Progress sizes and states |
| `status` | default/primary/secondary/tertiary/info/success/warning/danger; default becomes success at 100 unless indeterminate | Progress sizes and states |
<!-- demo-config-notes:end -->


Compare sizes and semantic states independently of circular, stepped and indeterminate models.

Example source: src/progress/example/demos/appearance-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    return { sizes }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
    return { statuses }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">五档与自定义尺寸</span><span lang="en-US">size</span></h4>
      <mp-space direction="column" size="16px">
        <mp-space v-for="size in scene1.sizes" :key="size" wrap size="16px" align="center">
          <span>{{ size }}</span
          ><mp-progress :size="size" :percent="42" /><mp-progress mode="circle" :size="size" :percent="42" />
        </mp-space>
        <mp-progress :size="10" :percent="12.5" />
        <mp-progress size="0.75rem" :stroke-width="6" :percent="60" />
        <mp-progress mode="circle" size="6rem" :percent="75" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="status">
      <h4><span lang="zh-CN">八种状态</span><span lang="en-US">status</span></h4>
      <mp-space direction="column" size="16px">
        <mp-progress v-for="status in scene2.statuses" :key="status" :status="status" :percent="60"
          ><template #text>{{ status }}</template></mp-progress
        >
        <mp-progress :percent="100" />
      </mp-space>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
```

## Content and presentation

### circle

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `percent` | Decimal 0–100; numeric strings supported; invalid values become zero, out-of-range values clamp | circle, step, loop |
| `mode` | Line or circle | circle, loop, advanced |
| `size` | xs/sm/md/lg/xl or CSS length; line thickness / circle diameter | circle, step, More styles and indeterminate progress |
| `color` | Solid or gradient stops; overrides status | circle, advanced, More styles and indeterminate progress |
| `status` | default/primary/secondary/tertiary/info/success/warning/danger; default becomes success at 100 unless indeterminate | circle, step, More styles and indeterminate progress |
| `track` | Show track and buffer decoration | circle, advanced |
<!-- demo-config-notes:end -->


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
  <mp-space direction="column" size="16px">
    <mp-progress :steps="5" :percent="40" />
    <mp-progress :steps="10" :percent="75" status="warning" size="lg" />
    <mp-progress :steps="5" :percent="100" />
  </mp-space>
</template>
```

### loop

Example source: src/progress/example/demos/loop.vue

```vue
<template>
  <mp-space direction="column" size="16px">
    <mp-progress indeterminate aria-label="Loading" />
    <mp-progress mode="circle" indeterminate aria-label="Loading" />
    <mp-progress :percent="60" animation />
  </mp-space>
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
  <mp-space direction="column" size="16px">
    <mp-switch v-model="gradient" aria-label="Gradient" />
    <mp-progress
      :percent="65"
      :color="gradient ? { '0%': '#722ed1', '100%': '#0fc6c2' } : '#722ed1'"
      buffer-color="#eee5ff"
    />
    <mp-space wrap size="24px">
      <mp-progress
        mode="circle"
        :percent="65"
        :rotate="90"
        :color="gradient ? { '0%': '#722ed1', '100%': '#0fc6c2' } : '#722ed1'"
      />
      <mp-progress mode="circle" :percent="65" :track="false"
        ><template #text="{ percent }">{{ percent }} / 100</template></mp-progress
      >
    </mp-space>
  </mp-space>
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

## Reading direction

Linear progress grows from inline start, and active/indeterminate animation follows reading direction. Percentages, numeric values and ring angles do not reverse. Reduced-motion preferences still apply.

## Usage notes

### Configuration

Determinate circular success/danger states show completion/failure icons, including xs. The text slot overrides these; ARIA numeric values remain.

### Layout updates

Circular `stroke-width` is resolved in the component CSS context, including `1em`, `calc()`, `var()` and percentages; a percentage is relative to the circle diameter. Font, variable and size changes update the geometry, and stroke width is capped at 99% of the diameter.

## API

### Progress Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| mode | Line or circle | `line \| circle` | `line` |
| percent | Decimal 0–100; numeric strings supported; invalid values become zero, out-of-range values clamp | `number \| string` | `0` |
| size | xs/sm/md/lg/xl or CSS length; line thickness / circle diameter | `ProgressSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `md` |
| stroke-width | Overrides thickness, numbers in px | `number \| string` | Follows size |
| steps | Line segments, floored and clamped to 0–1000; ignored when indeterminate | `number` | `0` |
| status | default/primary/secondary/tertiary/info/success/warning/danger; default becomes success at 100 unless indeterminate | `ProgressStatus`<br>`'default' \| 'success' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'warning' \| 'danger'` | `default` |
| color | Solid or gradient stops; overrides status | `string \| Record<string, string>` | — |
| track-color | Background track color | `string` | — |
| buffer-color | Remaining line track decoration, not a second progress value | `ProgressColor` | — |
| track | Show track and buffer decoration | `boolean` | `true` |
| show-text | Show text; xs circle hides text | `boolean` | `true` |
| text-class | Text container class | `string` | — |
| rotate | Clockwise angle from twelve o'clock | `number` | `0` |
| animation | Determinate continuous line shimmer | `boolean` | `false` |
| indeterminate | Unknown progress; omits aria-valuenow | `boolean` | `false` |

### Size semantics

| size | xs | sm | md | lg | xl |
| --- | --- | --- | --- | --- | --- |
| Linear thickness / default circular stroke in px | 2 | 3 | 4 | 6 | 8 |
| Circular diameter in px | 16 | 48 | 64 | 80 | 96 |

`size=12` / `size="12"` means 12px; `size="2rem"`, `"50%"` and `"calc(100% - 2px)"` retain CSS lengths. Custom linear size controls thickness; custom circular size controls diameter. stroke-width always takes precedence for thickness. Invalid/nonpositive lengths fall back to md. Percentage circular diameters require a definite parent width. All five presets are implemented; xs circular progress hides text. Cedar inherits omitted size from ConfigProvider; Maple defaults to md.

### Progress Slots

| Slot | Prop | Description |
| --- | --- | --- |
| text | `{ percent: number }` | Takes precedence over default |
| default | `{ percent: number }` | Custom display text |

Indeterminate progress shows an ellipsis by default; use the text slot for business text. The component does not mutate values or emit updates. Provide `aria-label` for the business task. All built-in animations respect reduced-motion settings.

## Types

Exports `ProgressProps`, `ProgressInstance`, `ProgressSize`, `ProgressMode`, `ProgressStatus`, `ProgressColor` and runtime `progressProps`.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-progress-animation-duration` | `1.5s` | `animation`, `animation-delay` |
| `--mp-progress-danger-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-progress-default-color` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-progress-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-progress-info-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-progress-line-border-radius` | `9999px` | `border-radius` |
| `--mp-progress-primary-color` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-progress-secondary-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-progress-steps-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-progress-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-progress-tertiary-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-progress-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-progress-text-gap` | `var(--mp-sys-space-4)` | `gap` |
| `--mp-progress-track-color` | `var(--mp-sys-color-state-hover)` | `background`, `stroke` |
| `--mp-progress-transition-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-progress-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-progress-danger-color: var(--mp-sys-color-content-danger);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
