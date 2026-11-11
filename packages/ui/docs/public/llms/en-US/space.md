<!-- Source: src/space/docs/en-US.md; locale: en-US; page: /en-US/space -->

# Space

### Intro

The component library provides a layout component,
`<mp-space>`,
so that you can do flex layout more efficiently.

## Basic examples

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

## Appearance and states

### Space Size

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `wrap` | Whether to exceed the line break | Space Size, xs / sm / md / lg / xl |
| `size` | Gap: `xs`/`sm`/`md`/`lg`/`xl` or [rowGap, columnGap], supporting CSS lengths | Space Size, xs / sm / md / lg / xl |
<!-- demo-config-notes:end -->


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

## Layout and arrangement

### Vertical

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | Gap: `xs`/`sm`/`md`/`lg`/`xl` or [rowGap, columnGap], supporting CSS lengths | Vertical, Main-axis alignment comparison, Explicit Wrapping |
| `justify` | Main axis arrangement, Can be set to `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly` | Main-axis alignment comparison, Space Around, Layout and alignment |
| `direction` | Row/column order of children, default row; column stacks them vertically. Does not use horizontal/vertical values | Vertical, Layout and alignment |
| `wrap` | Whether to exceed the line break | Explicit Wrapping, Layout and alignment |
| `align` | Cross-axis alignment: `stretch`/`center`/`flex-start`/`flex-end`/`baseline`. Omitted values follow `direction`: `row` → `center`, `column` → `stretch` | Layout and alignment |
<!-- demo-config-notes:end -->


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

### Main-axis alignment comparison

Compare end, center and space-between alignment while observing how remaining space is allocated.

Example source: src/space/example/demos/en-US/alignment-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="right-align">
      <h4><span lang="zh-CN">靠右</span><span lang="en-US">Right Align</span></h4>
      <mp-space justify="flex-end" :size="['2.666vmin', '2.666vmin']">
        <mp-button>Button1</mp-button>
        <mp-button>Button2</mp-button>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="center">
      <h4><span lang="zh-CN">居中</span><span lang="en-US">Align Center</span></h4>
      <mp-space justify="center" :size="['2.666vmin', '2.666vmin']">
        <mp-button>Button1</mp-button>
        <mp-button>Button2</mp-button>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="between">
      <h4><span lang="zh-CN">两端对齐</span><span lang="en-US">Space Between</span></h4>
      <mp-space justify="space-between" :size="['2.666vmin', '2.666vmin']">
        <mp-button>Button1</mp-button>
        <mp-button>Button2</mp-button>
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

### Explicit Wrapping

Example source: src/space/example/demos/en-US/wrap.vue

```vue
<template>
  <mp-space wrap :size="[8, 6]">
    <mp-button v-for="item in 8" :key="item">Item {{ item }}</mp-button>
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
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="direction">
        <mp-radio-group
          v-model="__demoLayout['direction']"
          aria-label="direction"
          :options="[
            { label: 'row', value: 'row' },
            { label: 'column', value: 'column' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="align">
        <mp-radio-group
          v-model="__demoLayout['align']"
          aria-label="align"
          :options="[
            { label: 'flex-start', value: 'flex-start' },
            { label: 'flex-end', value: 'flex-end' },
            { label: 'center', value: 'center' },
            { label: 'baseline', value: 'baseline' },
            { label: 'stretch', value: 'stretch' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="justify">
        <mp-select
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
      </mp-form-item>
    </mp-form>
    <mp-space wrap :size="[8, 6]" v-bind="__demoLayout">
      <mp-button v-for="item in 8" :key="item">项目 {{ item }}</mp-button>
    </mp-space>
  </mp-space>
</template>
```

## Interaction and control

### Interactive layout

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `wrap` | Whether to exceed the line break | Interactive layout |
| `size` | Gap: `xs`/`sm`/`md`/`lg`/`xl` or [rowGap, columnGap], supporting CSS lengths | Interactive layout |
| `direction` | Row/column order of children, default row; column stacks them vertically. Does not use horizontal/vertical values | Interactive layout |
<!-- demo-config-notes:end -->


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

## Separators and wrapping

### Split wrapping and content state

Change wrapping, direction and order after typing a draft. A separator stays with its preceding item and may appear at a line end.

Example source: src/space/example/demos/split-wrapping.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const wrap = ref(true)
const direction = ref<'row' | 'column'>('row')
const items = ref(['A', 'B', 'C'])
</script>
<template>
  <mp-space wrap :size="8">
    <mp-button data-space-toggle-wrap @click="wrap = !wrap">换行 / Wrap</mp-button>
    <mp-button data-space-toggle-direction @click="direction = direction === 'row' ? 'column' : 'row'"
      >方向 / Direction</mp-button
    >
    <mp-button data-space-reorder @click="items = [...items].reverse()">重排 / Reorder</mp-button>
  </mp-space>
  <p>输入草稿后切换布局或重排，文字仍跟随对应项。Drafts stay with their items.</p>
  <div style="max-width: 100%; overflow: auto">
    <mp-space
      data-space-split-demo
      :size="12"
      :wrap="wrap"
      :direction="direction"
      style="width: 260px; max-width: 100%"
    >
      <template v-for="item in items" :key="item">
        <label class="space-split-field">
          <span>Item {{ item }}</span>
          <mp-input edit-mode="direct" :aria-label="'Draft ' + item" placeholder="草稿 / Draft" />
        </label>
      </template>
      <template #split><span aria-hidden="true">/</span></template>
    </mp-space>
  </div>
  <p>分隔符跟随前项，允许位于行尾。Separators stay with the preceding item.</p>
</template>
<style scoped>
.space-split-field {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  width: 110px;
}
.space-split-field :deep(input) {
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
```

## Reading direction

Inherits the nearest native `dir`. `direction="row"` follows reading order; `column` remains top to bottom. justify/align flex-start and flex-end follow their respective flex axes. `size=[rowGap,columnGap]` always describes row and `column` gaps without swapping in RTL. Wrapping and split slots follow content order. Direction changes do not reverse data or recreate children with stable keys.

## API

### Children and size boundaries

Reordering keyed Fragment groups preserves local child identity. Whitespace, empty text, comments and empty Fragments do not generate spacing items. Meaningful text, numeric zero and empty elements are retained. Empty split content does not produce separators.

With wrap and split, a separator follows the previous item and may appear at a line end; hiding separators at every line boundary is not guaranteed. An item wider than its available line may still overflow. Without wrap, existing Flex gap and justify allocation remain. Layout switches do not recreate content nodes.

block switches the container between flex and inline-flex. align=stretch stretches the internal item wrapper without guaranteeing that its control fills it. Use the child control's block or width:100% when needed.

Invalid size shapes, negative/nonfinite numbers and arrays other than pairs fall back to md with development diagnostics. Array entries are lengths and do not accept preset names. CSS var/calc expressions remain supported; the browser handles syntax and resolved lengths.


### Space Props

| Prop | Description | Type | Default |
| ------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------ |
| `direction` | Row/column order of children, default row; column stacks them vertically. Does not use horizontal/vertical values | _string_ | `row` |
| `justify` | Main axis arrangement, Can be set to `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly` | _string_ | `flex-start` |
| `align` | Cross-axis alignment: `stretch`/`center`/`flex-start`/`flex-end`/`baseline`. Omitted values follow `direction`: `row` → `center`, `column` → `stretch` | _string_ | `-` |
| `size` | Gap: `xs`/`sm`/`md`/`lg`/`xl` or [rowGap, columnGap], supporting CSS lengths | _string \| number \| [string \| number, string \| number]_ | `md` |
| `wrap` | Whether to exceed the line break | _boolean_ | `false` |
| `block` | Use flex instead of inline-flex | _boolean_ | `true` |

### Space Slots

| Slot | Description | Prop |
| ----------- | ---------- | ----- |
| `default` | Content of space | `-` |
| `split` | Range separator | `-` |

## Types

```ts
import type { SpaceProps, SpaceSize, SpaceDirection, SpaceAlign, SpaceJustify, SpaceInternalSize, SpaceInstance } from '@maple-design/ui-vue'
```

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-space-size-lg-column-gap` | `var(--mp-sys-space-5)` | Component styling |
| `--mp-space-size-lg-row-gap` | `var(--mp-sys-space-6)` | Component styling |
| `--mp-space-size-md-column-gap` | `var(--mp-sys-space-4)` | Component styling |
| `--mp-space-size-md-row-gap` | `var(--mp-sys-space-5)` | Component styling |
| `--mp-space-size-sm-column-gap` | `var(--mp-sys-space-3)` | Component styling |
| `--mp-space-size-sm-row-gap` | `var(--mp-sys-space-4)` | Component styling |
| `--mp-space-size-xl-column-gap` | `var(--mp-sys-space-6)` | Component styling |
| `--mp-space-size-xl-row-gap` | `var(--mp-sys-space-8)` | Component styling |
| `--mp-space-size-xs-column-gap` | `var(--mp-sys-space-2)` | Component styling |
| `--mp-space-size-xs-row-gap` | `var(--mp-sys-space-2)` | Component styling |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-space-size-lg-column-gap: var(--mp-sys-space-5);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
