<!-- Source: src/pagination/docs/en-US.md; locale: en-US; page: /en-US/pagination -->

# Pagination

Pagination with a shared API and container-responsive layout.

## Basic examples

### Basic and two-way binding

Example source: src/pagination/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination v-model="current" :total="50" />
    <span>Current: {{ current }}</span>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

## Appearance and states

### Five sizes and elevation

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `total` | Total item count; required | Five sizes and elevation, Disabled and hide on single page |
| `show-page-size` | Show page size selector | Five sizes and elevation, Disabled and hide on single page |
| `show-jumper` | Show separate jumper in full mode; simple mode includes input | Five sizes and elevation, Disabled and hide on single page |
| `size` | Size of all controls | Five sizes and elevation |
| `elevation` | Page button shadow; true uses level 2 | Five sizes and elevation |
| `disabled` | Disable all interactions | Disabled and hide on single page |
<!-- demo-config-notes:end -->


Example source: src/pagination/example/demos/size.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const elevation = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <mp-radio-group v-model="size"
      ><mp-radio v-for="value in ['xs', 'sm', 'md', 'lg', 'xl']" :key="value" :value="value">{{
        value
      }}</mp-radio></mp-radio-group
    >
    <div class="pagination-demo-controls"><mp-switch v-model="elevation" /> Elevation</div>
    <mp-pagination :size="size" :elevation="elevation" :total="50" show-page-size show-jumper />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### Disabled and hide on single page

Example source: src/pagination/example/demos/disabled.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
const single = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-switch v-model="disabled" /> Disabled<mp-switch v-model="single" /> Single page
    </div>
    <mp-pagination
      :total="single ? 5 : 200"
      :disabled="disabled"
      hide-on-single-page
      show-jumper
      show-page-size
      show-total
    />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

## Pagination modes and information

### Simple mode

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `total` | Total item count; required | Simple mode, Page window and ellipsis, Totals, page sizes and jumpers |
| `show-total` | Show total | Simple mode, Totals, page sizes and jumpers |
| `show-page-size` | Show page size selector | Simple mode, Totals, page sizes and jumpers |
| `responsive` | Automatically use simple mode by container width | Page window and ellipsis, Totals, page sizes and jumpers |
| `simple` | Explicit simple mode | Simple mode |
| `default-value` | Initial uncontrolled page | Page window and ellipsis |
<!-- demo-config-notes:end -->


Example source: src/pagination/example/demos/simple.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(3)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination v-model="current" :total="200" simple show-total show-page-size />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### Page window and ellipsis

Example source: src/pagination/example/demos/more-page-size.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const buffer = ref(2)
const more = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-radio-group v-model="buffer"
        ><mp-radio v-for="value in [0, 1, 2]" :key="value" :value="value">Buffer {{ value }}</mp-radio></mp-radio-group
      ><mp-switch v-model="more" /> Show more
    </div>
    <mp-pagination :total="500" :default-value="12" :buffer-size="buffer" :show-more="more" :responsive="false" />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### Totals, page sizes and jumpers

Compare total labels, page-size selection and page jumpers. Change the available controls and observe their output.

Example source: src/pagination/example/demos/auxiliary-controls-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene2 = demoProxyRefs(
  (() => {
    const pageSize = ref(10)

    const current = ref(5)
    return { pageSize, current }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="show-total">
      <h4><span lang="zh-CN">自定义总数插槽</span><span lang="en-US">Custom total slot</span></h4>
      <div class="pagination-demo">
        <mp-pagination :total="200" show-total
          ><template #total="{ total }">{{ total }} records</template></mp-pagination
        >
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="show-page-size">
      <h4>
        <span lang="zh-CN">每页条数与公共选择器配置</span
        ><span lang="en-US">Page size and shared selector options</span>
      </h4>
      <div class="pagination-demo">
        <mp-pagination
          v-model="scene2.current"
          v-model:page-size="scene2.pageSize"
          :total="200"
          show-page-size
          :page-size-options="[10, 20, 50, 100]"
          :page-size-props="{
            placement: 'bottom-start',
          }"
        />
        <span>Current: {{ scene2.current }} · Page size: {{ scene2.pageSize }}</span>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="show-jumper">
      <h4><span lang="zh-CN">跳转与前后缀插槽</span><span lang="en-US">Jumper and prefix/suffix slots</span></h4>
      <div class="pagination-demo">
        <mp-pagination :total="200" show-jumper :responsive="false">
          <template #jumper-prepend>Go to</template><template #jumper-append>page</template>
        </mp-pagination>
      </div>
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
.demo-comparison-case--1 {
  .pagination-demo {
    display: grid;
    gap: 16px;
    min-width: 0;
  }
  .pagination-demo-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
}
.demo-comparison-case--2 {
  .pagination-demo {
    display: grid;
    gap: 16px;
    min-width: 0;
  }
  .pagination-demo-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
}
.demo-comparison-case--3 {
  .pagination-demo {
    display: grid;
    gap: 16px;
    min-width: 0;
  }
  .pagination-demo-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
}
</style>
```

## Page size, navigation and buttons

### Custom page slots and styles

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `total` | Total item count; required | Custom page slots and styles |
| `default-value` | Initial uncontrolled page | Custom page slots and styles |
| `buffer-size` | Pages on either side of current page | Custom page slots and styles |
| `responsive` | Automatically use simple mode by container width | Custom page slots and styles |
| `page-item-style` | Base numeric page style | Custom page slots and styles |
| `active-page-item-style` | Additional active numeric page style | Custom page slots and styles |
<!-- demo-config-notes:end -->


Example source: src/pagination/example/demos/custom-page-button.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination
      :total="300"
      :default-value="10"
      :buffer-size="0"
      :responsive="false"
      :page-item-style="{ borderRadius: '8px' }"
      :active-page-item-style="{ fontWeight: '700' }"
    >
      <template #page-item="{ page }">{{ page }}</template>
      <template #page-item-step="{ type }">{{ type === 'previous' ? 'Prev' : 'Next' }}</template>
      <template #page-item-ellipsis>✦</template>
    </mp-pagination>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

## Responsive layout and data changes

### Container width and compact layout

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `total` | Total item count; required | Container width and compact layout, Data changes and auto adjustment, Full feature controls |
| `show-total` | Show total | Container width and compact layout, Data changes and auto adjustment, Full feature controls |
| `show-page-size` | Show page size selector | Container width and compact layout, Data changes and auto adjustment, Full feature controls |
| `show-jumper` | Show separate jumper in full mode; simple mode includes input | Container width and compact layout, Full feature controls |
| `responsive` | Automatically use simple mode by container width | Container width and compact layout |
| `auto-adjust` | Preserve first record on size change; clamp after total shrinks | Data changes and auto adjustment |
<!-- demo-config-notes:end -->


Example source: src/pagination/example/demos/responsive.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const width = ref(360)
const responsive = ref(true)
</script>
<template>
  <div class="pagination-demo">
    <mp-radio-group v-model="width" wrap
      ><mp-radio v-for="value in [280, 360, 480, 640]" :key="value" :value="value"
        >{{ value }}px</mp-radio
      ></mp-radio-group
    >
    <div class="pagination-demo-controls"><mp-switch v-model="responsive" /> Responsive</div>
    <div :style="{ width: width + 'px', maxWidth: '100%' }">
      <mp-pagination :total="250" :responsive="responsive" show-total show-jumper show-page-size />
    </div>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### Data changes and auto adjustment

Example source: src/pagination/example/demos/auto-adjust.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const total = ref(200)
const current = ref(18)
const autoAdjust = ref(true)
function reset() {
  total.value = 200
  current.value = 18
}
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-switch v-model="autoAdjust" /> Auto adjust<mp-button @click="total = 25">Reduce total</mp-button
      ><mp-button @click="reset">Reset</mp-button>
    </div>
    <mp-pagination v-model="current" :total="total" :auto-adjust="autoAdjust" show-total show-page-size />
    <span>Current: {{ current }} · Total: {{ total }}</span>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### Full feature controls

Example source: src/pagination/example/demos/all.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const total = ref(true)
const jumper = ref(true)
const pageSize = ref(true)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-switch v-model="total" /> Total<mp-switch v-model="jumper" /> Jumper<mp-switch v-model="pageSize" /> Page size
    </div>
    <mp-pagination :total="125" :show-total="total" :show-jumper="jumper" :show-page-size="pageSize" />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Page numbers and previous/next meanings remain unchanged; default navigation icons follow reading direction. Page entry, disabled boundaries and selection do not change. Business code controls direction for custom icon slots.

## Triggers and positioning

### Popup placement

Use `page-size-props.placement` for the page-size selector popup, defaulting to `bottom-start`. The position adjusts when space is limited. This option does not change pagination layout.

## API

Use ordinary `v-model`: `modelValue` is the current page, starting at 1; pageSize independently controls items per page. `defaultValue` initializes uncontrolled state once without later resets or initialization `update:modelValue`. When `modelValue` is supplied, the parent value controls the display.

<!-- same-source-api:start -->

### Pagination Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| total | Total item count; required | `number` | `—` |
| model-value | Current page; v-model | `number` | `—` |
| default-value | Initial uncontrolled page | `number` | `1` |
| page-size | Page size; v-model:page-size | `number` | `—` |
| default-page-size | Initial uncontrolled page size | `number` | `10` |
| disabled | Disable all interactions | `boolean` | `false` |
| hide-on-single-page | Hide with at most one page | `boolean` | `false` |
| simple | Explicit simple mode | `boolean` | `false` |
| show-total | Show total | `boolean` | `false` |
| show-more | Append forward jump in full mode | `boolean` | `false` |
| show-jumper | Show separate jumper in full mode; simple mode includes input | `boolean` | `false` |
| show-page-size | Show page size selector | `boolean` | `false` |
| page-size-options | Positive integer size options | `number[]` | `[10, 20, 30, 40, 50]` |
| page-size-props | Optional restricted configuration for the page-size Select. Placement defaults to bottom-start and reaches Trigger through Select.triggerProps for automatic positioning; cannot override pagination values, options or size | `PaginationPageSizeProps` | `—` |
| size | Size of all controls | `'xs' / 'sm' / 'md' / 'lg' / 'xl'` | `'md'` |
| page-item-style | Base numeric page style | `CSSProperties` | `—` |
| active-page-item-style | Additional active numeric page style | `CSSProperties` | `—` |
| base-size | Base threshold for ellipsis in full mode | `number` | `6` |
| buffer-size | Pages on either side of current page | `number` | `2` |
| elevation | Page button shadow; true uses level 2 | `boolean / number` | `false` |
| responsive | Automatically use simple mode by container width | `boolean` | `true` |
| compact-breakpoint | Maximum container width for compact mode, in px | `number` | `480` |
| auto-adjust | Preserve first record on size change; clamp after total shrinks | `boolean` | `true` |

Totals, page numbers and page sizes use JavaScript safe integers. Finite positive values above the safe range are capped at the maximum safe integer and produce a development warning. To bound rendered page controls, base-size is capped at 201 and buffer-size at 100; out-of-range values produce a development warning.

Responsive switches between full and simple layouts preserve the page-jump draft without submitting it. Focus is preserved when both layouts display a jump input. Press Enter or leave the input to submit.

After a keyboard quick jump, if the ellipsis button disappears and the target page is accepted, focus moves to the current page button. Rejected controlled updates or focus moved elsewhere do not steal focus.

auto-adjust requests an adjustment only when total or page-size changes after creation; it does not clamp the initial default-value or controlled model-value to the page count. A controlled parent may reject the request.

### Pagination Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:model-value | Request current page update | `number` |
| change | Committed page change; paired with update:modelValue | `number` |
| update:page-size | Request page size update | `number` |
| page-size-change | Committed size change; paired with update:page-size | `number` |

### Pagination Slots

| Slot | Description | Scope |
| --- | --- | --- |
| total | Total | `{ total: number }` |
| page-item | Numeric page | `{ page: number }` |
| page-item-step | Previous / next | `{ type: 'previous' / 'next' }` |
| page-item-ellipsis | Ellipsis jump | `—` |
| jumper-prepend | Separate jumper prefix | `—` |
| jumper-append | Separate jumper suffix | `—` |

### Pagination Methods

| Method | Description |
| --- | --- |

<!-- same-source-api:end -->

## Types

```ts
import type { PaginationProps, PaginationInstance, PaginationPageSizeProps } from '@maple-design/ui-vue'
```

## Behavior

Containers at or below `compact-breakpoint` automatically use compact mode, consistently in desktop sidebars and mobile. Totals/page-size selectors remain; auxiliary controls wrap. Previous and next buttons follow the configured size. `responsive=false` retains full page numbers; extremely narrow page lists scroll internally without widening the page.

The compact current-page input also serves as the jumper, so no duplicate jumper appears. `page-item`, `page-item-ellipsis`, `jumper-prepend` and `jumper-append` render only in their full-mode controls.

Page buttons support Tab/Enter/Space, with `aria-current=page` on the current page. The jumper requests a numeric keyboard and submits on Enter/blur. Empty, nonnumeric or fractional values do not navigate; out-of-range integers clamp to valid pages. Disabled blocks all commits.

`auto-adjust` tries to preserve the previous page's first item when page size changes, clamps to the last page after total reductions and returns to page 1 for zero items. Controlled mode proposes updates only; the parent decides the display. An explicit parent modelValue in the same update batch takes precedence.

Both full and compact jumper inputs show the current page. Navigation, external modelValue changes and page-size adjustments update them together. Invalid input restores the current page number.

### PaginationPageSizeProps

Page-size selectors fit selected text/arrow with only item spacing, updating on option/locale changes. `--mp-pagination-select-width` overrides width. Popup menus size independently from option contents.

Both platforms support `disabled?: boolean`, `placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'`, `popupContainer?: string | HTMLElement | false`, `class?: string` and `style?: CSSProperties`. Outer disabled takes precedence. Default placement is bottom-start.

Use the documented page-size selector options. page-size, page-size-options and size control the pagination value, options and dimensions.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-pagination-active-background` | `var(--mp-color-primary-light-1)` | `background` |
| `--mp-pagination-active-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-pagination-disabled-background` | `var(--mp-color-fill-1)` | `background` |
| `--mp-pagination-disabled-color` | `var(--mp-color-text-disabled)` | `color` |
| `--mp-pagination-focus-color` | `var(--mp-sys-color-content-brand)` | `outline` |
| `--mp-pagination-focus-offset` | `1px` | `outline-offset` |
| `--mp-pagination-focus-space` | `3px` | `padding` |
| `--mp-pagination-focus-width` | `2px` | `outline` |
| `--mp-pagination-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-pagination-gap` | `var(--mp-sys-space-5)` | `gap` |
| `--mp-pagination-hover-background` | `var(--mp-color-fill-1)` | `background` |
| `--mp-pagination-icon-size` | `16px` | `height`, `width` |
| `--mp-pagination-input-width` | `32px` | `width` |
| `--mp-pagination-item-background` | `transparent` | `background` |
| `--mp-pagination-item-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-pagination-item-gap` | `var(--mp-sys-space-2)` | `gap`, `padding-inline-start` |
| `--mp-pagination-item-padding` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-pagination-select-width` | `max-content` | `width` |
| `--mp-pagination-size-lg` | `44px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-size-md` | `36px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-size-sm` | `28px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-size-xl` | `52px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-size-xs` | `24px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-text-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-pagination-touch-size` | `44px` | `min-height` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-pagination-active-background: var(--mp-color-primary-light-1);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
