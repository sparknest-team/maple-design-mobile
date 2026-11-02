<!-- Source: src/progress-group/docs/en-US.md; locale: en-US; page: /en-US/progress-group -->

# ProgressGroup

## Examples

### Introduction

Display multiple values as segments of a single progress track with a matching legend.

### Basic Usage

Example source: src/progress-group/example/demos/basic.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <mp-progress-group :items="items" :max="128" show-text />
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### Track Sizes

Example source: src/progress-group/example/demos/size.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]
</script>

<template>
  <mp-space direction="column" size="md">
    <div v-for="size in sizes" :key="size" class="progress-group-example__size-row">
      <span>{{ size }}</span>
      <mp-progress-group :items="trackOnlyItems" :size="size" />
    </div>
  </mp-space>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### Orientation

Example source: src/progress-group/example/demos/orientation.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <div class="progress-group-example__orientations">
    <mp-progress-group :items="items" show-text />
    <mp-progress-group
      :items="items"
      orientation="vertical"
      size="lg"
      show-text
      class="progress-group-example__vertical"
    />
  </div>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### Circular Segments

Example source: src/progress-group/example/demos/circle.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <div class="progress-group-example__circles">
    <mp-progress-group mode="circle" :items="items" show-text />
    <mp-progress-group mode="circle" :items="items" circle-size="min(42vw, 240px)" :stroke-width="12" show-text>
      <template #text="{ value, max }">
        <div class="progress-group-example__circle-status">
          <strong>{{ value }}</strong
          ><small>/ {{ max }} GB</small>
        </div>
      </template>
    </mp-progress-group>
  </div>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### Default Color and Track Only

Example source: src/progress-group/example/demos/color.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-progress-group
      :items="[
        { label: 'Docs', value: 20 },
        { label: 'Tests', value: 35 },
      ]"
      color="#ff7d00"
      show-text
    />
    <mp-progress-group :items="trackOnlyItems" size="lg" />
  </mp-space>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### Custom Content

Example source: src/progress-group/example/demos/custom.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <mp-progress-group :items="items" :max="128" show-text>
    <template #text="{ value, max }">已使用 {{ value }} / {{ max }} GB</template>
    <template #item-trailing="{ item }">{{ item.value }} GB</template>
    <template #tooltip="{ item, percent }"
      >{{ item.label }} · {{ item.value }} GB · {{ Math.round(percent) }}%</template
    >
  </mp-progress-group>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### Overflow and keyboard

The demo's parent updates `max`, `items` and `tooltip` for both shapes; these controls are not built-in editing events. Toggle capacity between 100/200, clear/restore data or disable/enable tooltips. Disabling tooltips removes segments from the Tab order, and clearing data removes their tips. Pointer hover takes precedence over keyboard focus; leaving the hovered segment restores the focused segment's tip.

Example source: src/progress-group/example/demos/overflow-keyboard.vue

```vue
<script setup>
import { ref } from 'vue'

const initialItems = [
  { label: 'A', value: 70 },
  { label: 'B', value: 50, color: '#722ed1' },
  { label: 'C', value: 10, color: '#0fc6c2' },
]
const items = ref(initialItems)
const max = ref(100)
const tooltip = ref(true)
</script>
<template>
  <div data-demo-capacity style="display: grid; gap: 24px">
    <mp-space wrap>
      <mp-button @click="max = max === 100 ? 200 : 100">Capacity: {{ max }}</mp-button>
      <mp-button @click="items = items.length ? [] : initialItems">{{
        items.length ? 'Clear data' : 'Restore data'
      }}</mp-button>
      <mp-button @click="tooltip = !tooltip">Tooltips: {{ tooltip ? 'on' : 'off' }}</mp-button>
    </mp-space>
    <mp-progress-group :items="items" :max="max" :tooltip="tooltip" show-text aria-label="Capacity line" />
    <mp-progress-group
      mode="circle"
      :items="items"
      :max="max"
      :tooltip="tooltip"
      show-text
      aria-label="Capacity circle"
    />
    <p aria-live="polite">Items: {{ items.length }}; capacity: {{ max }}; tooltips: {{ tooltip ? 'on' : 'off' }}</p>
  </div>
</template>
```

Segments are clipped cumulatively at max in both line and circle modes. Legend and tooltip values retain the logical per-item percentages. Non-finite/negative values become zero; invalid max falls back to 100. Focus a visible segment with Tab to show its tooltip; Escape dismisses it. Moving the pointer away does not dismiss a focused segment's tooltip. Use aria-label to name the group.

All five size presets affect line thickness (2/4/8/12/16px), not circle diameter; circle-size and stroke-width control circles. CSS-length circle-size values are supported.

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| aria-label | Accessible group name | `string` | — |
| items | Segment data | `ProgressGroupItem[]` | `[]` |
| mode | Display mode | `line \| circle` | `line` |
| max | Total used to calculate each share | `number` | `100` |
| show-text | Show the summed percentage | `boolean` | `false` |
| size | Track size | `xs \| sm \| md \| lg \| xl` | `md` |
| color | Default segment color | `string` | theme primary |
| circle-size | Diameter in circle mode | `number \| string` | `120` |
| stroke-width | Track width in circle mode | `number` | `8` |
| tooltip | Enable segment hover/focus tips | `boolean` | `true` |
| orientation | Track orientation | `horizontal \| vertical` | `horizontal` |

### Slots

| Name | Slot props |
| --- | --- |
| text | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |

### Style variables

| Variable | Default |
| --- | --- |
| `--mp-progress-group-gap` | `var(--mp-sys-space-3)` |
| `--mp-progress-group-item-gap` | `var(--mp-sys-space-2)` |
| `--mp-progress-group-dot-size` | `var(--mp-sys-space-4)` |
| `--mp-progress-group-radius` | `9999px` |
| `--mp-progress-group-track-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-progress-group-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-progress-group-muted-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-group-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-progress-group-tooltip-bg` | `var(--mp-sys-color-surface-tooltip)` |
| `--mp-progress-group-tooltip-color` | `var(--mp-sys-color-content-on-dark)` |

Marks use system content-brand. Color precedence: item.color > component color > default. Custom colors require contrast validation. Both libraries use the same geometry tokens.

### Geometry and motion variables

Built-in effects respect `prefers-reduced-motion: reduce`. Track thickness applies to both horizontal and vertical layouts; circle geometry remains prop-driven.

| Token | Default |
| --- | --- |
| `--mp-progress-group-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-progress-group-tooltip-duration` | `var(--mp-sys-motion-duration-fast)` |
| `--mp-progress-group-tooltip-max-width` | `240px` |
| `--mp-progress-group-tooltip-padding` | `5px var(--mp-sys-space-4)` |
| `--mp-progress-group-tooltip-radius` | `var(--mp-sys-radius-md)` |
| `--mp-progress-group-tooltip-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-progress-group-tooltip-line-height` | `1.4` |
| `--mp-progress-group-tooltip-offset` | `var(--mp-sys-space-4)` |
| `--mp-progress-group-text-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-progress-group-size-xs-thickness` | `2px` |
| `--mp-progress-group-size-sm-thickness` | `4px` |
| `--mp-progress-group-size-md-thickness` | `8px` |
| `--mp-progress-group-size-lg-thickness` | `12px` |
| `--mp-progress-group-size-xl-thickness` | `16px` |
