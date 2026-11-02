<!-- Source: src/space/docs/en-US.md; locale: en-US; page: /en-US/space -->

# Space

## Examples

### Intro

The component library provides a layout component,
`<mp-space>`,
so that you can do flex layout more efficiently.

### Basic Use

Example source: src/space/example/demos/en-US/base-use.vue

```vue
<script setup></script>

<template>
  <mp-space>
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>
</template>
```

### Interactive layout

Toggle direction, column gap and wrapping, or add/remove items. Row gap stays 8px; column gap switches between 8px and 24px. Direction does not swap these geometric axes. The narrow preview scrolls horizontally without wrapping.

Example source: src/space/example/demos/interactive-layout.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const direction = ref<'row' | 'column'>('row')
const gap = ref(8)
const wrap = ref(false)
const count = ref(3)
</script>

<template>
  <div>
    <mp-space wrap :size="8">
      <mp-button @click="direction = direction === 'row' ? 'column' : 'row'">Toggle direction</mp-button>
      <mp-button @click="gap = gap === 8 ? 24 : 8">Toggle gap</mp-button>
      <mp-button @click="wrap = !wrap">Toggle wrap</mp-button>
      <mp-button :disabled="count >= 6" @click="count++">Add item</mp-button>
      <mp-button :disabled="count <= 1" @click="count--">Remove item</mp-button>
    </mp-space>
    <p aria-live="polite">{{ direction }} / gap {{ gap }} / wrap {{ wrap }} / items {{ count }}</p>
    <div style="max-width: 100%; overflow: auto">
      <mp-space
        data-demo-layout
        :direction="direction"
        :size="[8, gap]"
        :wrap="wrap"
        style="width: 260px; max-width: 100%"
      >
        <div
          v-for="item in count"
          :key="item"
          style="width: 72px; padding: 8px; box-sizing: border-box; border: 1px solid currentColor"
        >
          Item {{ item }}
        </div>
      </mp-space>
    </div>
  </div>
</template>
```

### Vertical

Example source: src/space/example/demos/en-US/vertical.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>
</template>
```

### Space Size

Example source: src/space/example/demos/en-US/space.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="[20, 20]">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
    <mp-button>Button4</mp-button>
    <mp-button>Button5</mp-button>
    <mp-button>Button6</mp-button>
  </mp-space>
</template>
```

### Right Align

Example source: src/space/example/demos/en-US/right-align.vue

```vue
<script setup></script>

<template>
  <mp-space justify="flex-end" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### Space Around

Example source: src/space/example/demos/en-US/around.vue

```vue
<script setup></script>

<template>
  <mp-space justify="space-around" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### Align Center

Example source: src/space/example/demos/en-US/center.vue

```vue
<script setup></script>

<template>
  <mp-space justify="center" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### Space Between

Example source: src/space/example/demos/en-US/between.vue

```vue
<script setup></script>

<template>
  <mp-space justify="space-between" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### xs / sm / md / lg / xl

Example source: src/space/example/demos/en-US/demo-8.vue

```vue
<script setup></script>

<template>
  <mp-space v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size" :size="size" wrap>
    <span>{{ size }}</span
    ><span>Item 1</span><span>Item 2</span>
  </mp-space>
</template>
```

### Explicit Wrapping

Example source: src/space/example/demos/en-US/wrap.vue

```vue
<template>
  <mp-space wrap :size="[8, 6]">
    <mp-button v-for="item in 8" :key="item">Item {{ item }}</mp-button>
  </mp-space>
</template>
```

### Layout and alignment

Use this example for space. Adjust direction, cross-axis alignment, main-axis distribution and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/space/example/demos/layout-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoLayout = __demoReactive({ direction: 'row', align: 'flex-start', justify: 'flex-start' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>direction</span
        ><mp-select
          v-model="__demoLayout['direction']"
          :clearable="false"
          :options="[
            { label: 'row', value: 'row' },
            { label: 'column', value: 'column' },
          ]"
          aria-label="direction"
        />
      </div>
      <div>
        <span>align</span
        ><mp-select
          v-model="__demoLayout['align']"
          :clearable="false"
          :options="[
            { label: 'flex-start', value: 'flex-start' },
            { label: 'flex-end', value: 'flex-end' },
            { label: 'center', value: 'center' },
            { label: 'baseline', value: 'baseline' },
            { label: 'stretch', value: 'stretch' },
          ]"
          aria-label="align"
        />
      </div>
      <div>
        <span>justify</span
        ><mp-select
          v-model="__demoLayout['justify']"
          :clearable="false"
          :options="[
            { label: 'flex-start', value: 'flex-start' },
            { label: 'flex-end', value: 'flex-end' },
            { label: 'center', value: 'center' },
            { label: 'space-around', value: 'space-around' },
            { label: 'space-between', value: 'space-between' },
            { label: 'space-evenly', value: 'space-evenly' },
          ]"
          aria-label="justify"
        />
      </div>
    </mp-space>
    <mp-space wrap :size="[8, 6]" v-bind="__demoLayout">
      <mp-button v-for="item in 8" :key="item">项目 {{ item }}</mp-button>
    </mp-space>
  </mp-space>
</template>
```

## API

### Props

| Prop        | Description                                                                                             | Type     | Default |
|-------------|---------------------------------------------------------------------------------------------------------|----------|---------|
| `direction` | Layout direction, can be set to `row` `column`                                                          | _string_ | `row`   |
| `justify`   | Main axis arrangement, Can be set to `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly` | _string_ | `flex-start` |
| `align`     | Cross axis arrangement, Can be set to `stretch` `center` `flex-start` `flex-end` `baseline`. Inferred when omitted (`row` → `center`, `column` → `stretch`) | _string_ | `-`     |
| `size`      | Spacing, can be set to `xs` `sm` `md` `lg` `xl` or `[Vertical, Horizontal]`(Support length unit) | _string \| number \| [string \| number, string \| number]_ |`md`|
| `wrap`      | Whether to exceed the line break                                                                        | _boolean_ | `false`  |
| `block` | Use flex instead of inline-flex | _boolean_ | `true` |

### Slots

| Name      | Description      | SlotProps |
|-----------|------------------|-----------|
| `default` | Content of space | `-`       |

| `split` | Separator between effective children | `-` |

### Style Variables

| Variable | Default |
| --- | --- |
| `--mp-space-size-xs-row-gap` | `var(--mp-sys-space-2)` |
| `--mp-space-size-xs-column-gap` | `var(--mp-sys-space-2)` |
| `--mp-space-size-sm-row-gap` | `var(--mp-sys-space-4)` |
| `--mp-space-size-sm-column-gap` | `var(--mp-sys-space-3)` |
| `--mp-space-size-md-row-gap` | `var(--mp-sys-space-5)` |
| `--mp-space-size-md-column-gap` | `var(--mp-sys-space-4)` |
| `--mp-space-size-lg-row-gap` | `var(--mp-sys-space-6)` |
| `--mp-space-size-lg-column-gap` | `var(--mp-sys-space-5)` |
| `--mp-space-size-xl-row-gap` | `var(--mp-sys-space-8)` |
| `--mp-space-size-xl-column-gap` | `var(--mp-sys-space-6)` |

## Independent source copies

Both libraries independently maintain the rendering, Props, child flattening, styles, spacing tokens and tests. No runtime core or instances are shared. Both default to size=md, wrap=false, block=true and direction=row. Maple users relying on implicit wrapping must explicitly add wrap.

Numbers and numeric strings use px; CSS lengths and expressions are preserved. A tuple always means [rowGap, columnGap], regardless of direction. Tuple entries are lengths, not preset names. All five presets are supported and match Cedar, including built-in Maple themes. Override CSS variables for custom spacing.
