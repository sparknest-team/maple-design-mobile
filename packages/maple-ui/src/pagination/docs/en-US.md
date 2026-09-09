# Pagination

Pagination with a shared API and container-responsive layout.

## Examples

### Basic and two-way binding

```html
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(1)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination v-model:current="current" :total="50" />
    <span>Current: {{ current }}</span>
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Page window and ellipsis

```html
<script setup lang="ts">
import { ref } from 'vue'
const buffer = ref(2)
const more = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls"><mp-radio-group v-model="buffer"><mp-radio v-for="value in [0, 1, 2]" :key="value" :value="value">Buffer {{ value }}</mp-radio></mp-radio-group><mp-switch v-model="more" /> Show more</div>
    <mp-pagination :total="500" :default-current="12" :buffer-size="buffer" :show-more="more" :responsive="false" />
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Page size and shared selector options

```html
<script setup lang="ts">
import { ref } from 'vue'
const pageSize = ref(10)
const current = ref(5)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination v-model:current="current" v-model:page-size="pageSize" :total="200" show-page-size :page-size-options="[10, 20, 50]" :page-size-props="{ placement: 'bottom-start' }" />
    <span>Current: {{ current }} · Page size: {{ pageSize }}</span>
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Jumper and prefix/suffix slots

```html
<script setup lang="ts">
import { ref } from 'vue'

</script>
<template>
  <div class="pagination-demo">
    <mp-pagination :total="200" show-jumper :responsive="false">
      <template #jumper-prepend>Go to</template><template #jumper-append>page</template>
    </mp-pagination>
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Five sizes and elevation

```html
<script setup lang="ts">
import { ref } from 'vue'
const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const elevation = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <mp-radio-group v-model="size"><mp-radio v-for="value in ['xs', 'sm', 'md', 'lg', 'xl']" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group>
    <div class="pagination-demo-controls"><mp-switch v-model="elevation" /> Elevation</div>
    <mp-pagination :size="size" :elevation="elevation" :total="50" show-page-size show-jumper />
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Simple mode

```html
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(3)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination v-model:current="current" :total="200" simple show-total show-page-size />
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Custom total slot

```html
<script setup lang="ts">
import { ref } from 'vue'

</script>
<template>
  <div class="pagination-demo">
    <mp-pagination :total="200" show-total><template #total="{ total }">{{ total }} records</template></mp-pagination>
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Full feature controls

```html
<script setup lang="ts">
import { ref } from 'vue'
const total = ref(true)
const jumper = ref(true)
const pageSize = ref(true)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls"><mp-switch v-model="total" /> Total<mp-switch v-model="jumper" /> Jumper<mp-switch v-model="pageSize" /> Page size</div>
    <mp-pagination :total="125" :show-total="total" :show-jumper="jumper" :show-page-size="pageSize" />
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Custom page slots and styles

```html
<script setup lang="ts">
import { ref } from 'vue'

</script>
<template>
  <div class="pagination-demo">
    <mp-pagination :total="300" :default-current="10" :buffer-size="0" :responsive="false" :page-item-style="{ borderRadius: '8px' }" :active-page-item-style="{ fontWeight: '700' }">
      <template #page-item="{ page }">{{ page }}</template>
      <template #page-item-step="{ type }">{{ type === 'previous' ? 'Prev' : 'Next' }}</template>
      <template #page-item-ellipsis>✦</template>
    </mp-pagination>
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Disabled and hide on single page

```html
<script setup lang="ts">
import { ref } from 'vue'
const disabled = ref(true)
const single = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls"><mp-switch v-model="disabled" /> Disabled<mp-switch v-model="single" /> Single page</div>
    <mp-pagination :total="single ? 5 : 200" :disabled="disabled" hide-on-single-page show-jumper show-page-size show-total />
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Data changes and auto adjustment

```html
<script setup lang="ts">
import { ref } from 'vue'
const total = ref(200)
const current = ref(18)
const autoAdjust = ref(true)
function reset() { total.value = 200; current.value = 18 }
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls"><mp-switch v-model="autoAdjust" /> Auto adjust<mp-button @click="total = 25">Reduce total</mp-button><mp-button @click="reset">Reset</mp-button></div>
    <mp-pagination v-model:current="current" :total="total" :auto-adjust="autoAdjust" show-total show-page-size />
    <span>Current: {{ current }} · Total: {{ total }}</span>
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

### Container width and compact layout

```html
<script setup lang="ts">
import { ref } from 'vue'
const width = ref(360)
const responsive = ref(true)
</script>
<template>
  <div class="pagination-demo">
    <mp-radio-group v-model="width"><mp-radio v-for="value in [280, 360, 480, 640]" :key="value" :value="value">{{ value }}px</mp-radio></mp-radio-group>
    <div class="pagination-demo-controls"><mp-switch v-model="responsive" /> Responsive</div>
    <div :style="{ width: width + 'px', maxWidth: '100%' }"><mp-pagination :total="250" :responsive="responsive" show-total show-jumper show-page-size /></div>
  </div>
</template>
<style scoped>
.pagination-demo { display: grid; gap: 16px; min-width: 0; }
.pagination-demo-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| total | Total records (required) | `number` | `—` |
| current | Current page; v-model:current | `number` | `—` |
| default-current | Initial uncontrolled page | `number` | `1` |
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
| page-size-props | Shared selector configuration; cannot override value, options or size | `PaginationPageSizeProps` | `—` |
| size | Size of all controls | `'xs' / 'sm' / 'md' / 'lg' / 'xl'` | `'md'` |
| page-item-style | Base numeric page style | `CSSProperties` | `—` |
| active-page-item-style | Additional active numeric page style | `CSSProperties` | `—` |
| base-size | Base threshold for ellipsis in full mode | `number` | `6` |
| buffer-size | Pages on either side of current page | `number` | `2` |
| elevation | Page button shadow; true uses level 2 | `boolean / number` | `false` |
| responsive | Automatically use simple mode by container width | `boolean` | `true` |
| compact-breakpoint | Maximum container width for compact mode, in px | `number` | `480` |
| auto-adjust | Preserve first record on size change; clamp after total shrinks | `boolean` | `true` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:current | Request current page update | `number` |
| change | Committed page change; paired with update:current | `number` |
| update:page-size | Request page size update | `number` |
| page-size-change | Committed size change; paired with update:page-size | `number` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| total | Total | `{ total: number }` |
| page-item | Numeric page | `{ page: number }` |
| page-item-step | Previous / next | `{ type: 'previous' / 'next' }` |
| page-item-ellipsis | Ellipsis jump | `—` |
| jumper-prepend | Separate jumper prefix | `—` |
| jumper-append | Separate jumper suffix | `—` |

### Methods

| Method | Description |
| --- | --- |

<!-- same-source-api:end -->

## Behavior

Containers at or below compact-breakpoint use simple mode automatically, including desktop sidebars. Total and page-size controls remain available and wrap. Previous/next buttons follow size without forced enlargement on narrow screens (36px by default). Set responsive=false to retain full pagination; only the page list scrolls horizontally if necessary.

The simple page input also serves as the jumper. Numeric page, ellipsis and separate jumper prefix/suffix slots render only with their corresponding full-mode controls.

Buttons support Tab, Enter and Space; the active page exposes aria-current=page. The jumper requests a numeric keyboard and commits on Enter or blur. Empty, fractional and non-numeric values do not navigate. Integers are clamped to the valid range. Disabled controls cannot submit.

Auto adjustment preserves the first visible record when page size changes and clamps pages when total shrinks. An empty dataset resets to page 1. Controlled state waits for parent updates; an explicit current update in the same batch takes priority.

### PaginationPageSizeProps

The page-size menu fits its option content independently of the compact trigger width.

Shared fields: disabled?: boolean; placement?: top / top-start / top-end / bottom / bottom-start / bottom-end; popupContainer?: string | HTMLElement | false; class?: string; style?: CSSProperties. Parent disabled takes priority. Placement defaults to bottom-start.

Arbitrary SelectProps/MenuProps are no longer forwarded. Use page-size, page-size-options and size for pagination-owned fields.

## Types

```ts
import type { PaginationProps, PaginationInstance, PaginationPageSizeProps } from '@maplejs/maple-ui'
```

## Style variables

| Token | Default |
| --- | --- |
| `--mp-pagination-text-color` | `var(--mp-color-text-1)` |
| `--mp-pagination-font-size` | `14px` |
| `--mp-pagination-gap` | `12px` |
| `--mp-pagination-item-gap` | `4px` |
| `--mp-pagination-focus-space` | `3px` |
| `--mp-pagination-size-xs` | `24px` |
| `--mp-pagination-size-sm` | `28px` |
| `--mp-pagination-size-md` | `36px` |
| `--mp-pagination-size-lg` | `44px` |
| `--mp-pagination-size-xl` | `52px` |
| `--mp-pagination-item-padding` | `8px` |
| `--mp-pagination-item-border-radius` | `4px` |
| `--mp-pagination-icon-size` | `16px` |
| `--mp-pagination-input-width` | `32px` |
| `--mp-pagination-select-width` | `max-content` |
| `--mp-pagination-touch-size` | `44px` |
| `--mp-pagination-focus-width` | `2px` |
| `--mp-pagination-focus-offset` | `1px` |
| `--mp-pagination-focus-color` | `var(--mp-color-primary)` |
| `--mp-pagination-item-background` | `transparent` |
| `--mp-pagination-hover-background` | `var(--mp-color-fill-1)` |
| `--mp-pagination-active-background` | `var(--mp-color-primary-light-1)` |
| `--mp-pagination-active-color` | `var(--mp-color-primary)` |
| `--mp-pagination-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-pagination-disabled-background` | `var(--mp-color-fill-1)` |
