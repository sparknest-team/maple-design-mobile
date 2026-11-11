<!-- Source: src/collapse/docs/en-US.md; locale: en-US; page: /en-US/collapse -->

# Collapse

A content area which can be collapsed and expanded. Examples match Cedar Design Web, with a more compact mobile layout.

## Basic examples

### Basic usage

Group and hide complex content. Multiple panels can stay open.

Example source: src/collapse/example/demos/basic.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]">
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

## Appearance and states

### Disabled

Disable a panel with `disabled`.

Example source: src/collapse/example/demos/disabled.vue

```vue
<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-button @click="disabled = !disabled">
      {{ disabled ? 'Enable' : 'Disable' }}
    </mp-button>
    <mp-collapse :default-value="[1]">
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="1" :disabled="disabled">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2" :disabled="disabled">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>
```

## Layout and arrangement

### Nested panels

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | Uncontrolled initial expanded names | Nested panels, Icon position |
| `destroy-on-hide` | Destroy content when hidden | Nested panels |
| `offset` | Gap between expanded panels | Expanded offset |
| `expand-icon-position` | Expand-icon position within the header: left or right, default left. Does not control content expansion direction | Icon position |
| `show-expand-icon` | Whether to show expansion icons; child items decide when omitted | Icon position |
<!-- demo-config-notes:end -->


Panels can be nested.

Example source: src/collapse/example/demos/nested.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]" destroy-on-hide>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <mp-collapse :default-value="['1.1']" destroy-on-hide>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1.1">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1.2">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
      </mp-collapse>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

### Expanded offset

Control the gap between expanded panels with `offset`.

Example source: src/collapse/example/demos/offset.vue

```vue
<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-button @click="offset = !offset">
      {{ offset ? 'Hide offset' : 'Show offset' }}
    </mp-button>
    <mp-collapse v-model="activeNames" :offset="offset">
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const offset = ref(true)
const activeNames = ref<(string | number)[]>(['1', '2'])
</script>
```

### Icon position

Set `expand-icon-position` to `left` or `right`.

Example source: src/collapse/example/demos/icon-position.vue

```vue
<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-space>
      <mp-button @click="position = position === 'right' ? 'left' : 'right'">
        {{ position === 'right' ? 'Icon left' : 'Icon right' }}
      </mp-button>
      <mp-button @click="hideIcon = !hideIcon">
        {{ hideIcon ? 'Show icon' : 'Hide icon' }}
      </mp-button>
    </mp-space>
    <mp-collapse :default-value="['1']" :expand-icon-position="position" :show-expand-icon="!hideIcon">
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
        <template #extra>
          <mp-tag size="sm">city</mp-tag>
        </template>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2" disabled>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const position = ref<'left' | 'right'>('left')
const hideIcon = ref(false)
</script>
```

## Content and presentation

### Accordion

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | Uncontrolled initial expanded names | Accordion, Borders and dividers, Expand icon |
| `accordion` | Accordion mode; at most one open panel | Accordion |
| `bordered` | Whether to show border | Borders and dividers |
| `divider` | Show dividers | Borders and dividers |
| `destroy-on-hide` | Destroy content when hidden | Destroy on hide |
<!-- demo-config-notes:end -->


Use `accordion` so only one panel is open. `modelValue` remains an array with at most one item.

Example source: src/collapse/example/demos/accordion.vue

```vue
<template>
  <mp-collapse :default-value="[1]" accordion>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

### Borders and dividers

Compare outer borders and separators between panels, including their appearance while expanded.

<details>
<summary>Configuration details and limits</summary>

#### Borderless

Hide the border with `bordered="false"`.

#### Divider

Control item dividers with `divider`.

</details>

Example source: src/collapse/example/demos/border-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene2 = demoProxyRefs(
  (() => {
    const divider = ref(true)
    return { divider }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="border-less">
      <h4><span lang="zh-CN">无边框模式</span><span lang="en-US">Borderless</span></h4>
      <mp-collapse :default-value="['1']" :bordered="false">
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2" disabled>
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
      </mp-collapse>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="divider">
      <h4><span lang="zh-CN">分割线</span><span lang="en-US">Divider</span></h4>
      <mp-space
        direction="column"
        :style="{
          width: '100%',
        }"
      >
        <mp-button @click="scene2.divider = !scene2.divider">
          {{ scene2.divider ? 'Hide divider' : 'Show divider' }}
        </mp-button>
        <mp-collapse :default-value="[]" :divider="scene2.divider">
          <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </mp-collapse-item>
          <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </mp-collapse-item>
          <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </mp-collapse-item>
        </mp-collapse>
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

### Extra

Set extra content with the `extra` slot. Clicking it does not toggle the panel.

Example source: src/collapse/example/demos/extra.vue

```vue
<template>
  <mp-collapse>
    <mp-collapse-item :heading-level="3" :region="false" title="Beijing Toutiao Technology Co., Ltd." name="1">
      <template #extra>Extra</template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item :heading-level="3" :region="false" title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <template #extra>
        <mp-button status="primary" size="sm">Action</mp-button>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item :heading-level="3" :region="false" title="Beijing Toutiao Technology Co., Ltd." name="3">
      <template #extra>
        <mp-tag size="sm">city</mp-tag>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

### Expand icon

Customize the expand icon. The parent `expand-icon` slot is used by items without their own icon.

Example source: src/collapse/example/demos/expand-icon.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]">
    <template #expand-icon="{ expanded }">
      <span>{{ expanded ? '▼' : '▶' }}</span>
    </template>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <template #expand-icon="{ expanded }">
        <span>{{ expanded ? '^^' : 'vv' }}</span>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

### Destroy on hide

Destroy panel content after collapse with `destroy-on-hide`.

Example source: src/collapse/example/demos/destroy.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]" destroy-on-hide>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3" :show-expand-icon="false">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

## Customization and slots

### Custom style

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | Uncontrolled initial expanded names | Custom style |
| `bordered` | Whether to show border | Custom style |
<!-- demo-config-notes:end -->


Customize panel styles.

Example source: src/collapse/example/demos/custom.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]" :bordered="false">
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :style="customStyle" name="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :style="customStyle" :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :style="customStyle" name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup>
const customStyle = {
  borderRadius: '6px',
  marginBottom: '12px',
  overflow: 'hidden',
}
</script>
```

## Interaction and control

### Toggle all

Use `toggleAll` to expand or collapse all panels. It is a no-op in accordion mode.

Example source: src/collapse/example/demos/toggle-all.vue

```vue
<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-space wrap>
      <mp-button @click="toggleAll({ expand: 'inverse' })">Toggle all</mp-button>
      <mp-button @click="toggleAll({ expand: 'inverse', skipDisabled: true })">Toggle all (skip disabled)</mp-button>
      <mp-button @click="toggleAll({ expand: true })">Expand all</mp-button>
      <mp-button @click="toggleAll({ expand: true, skipDisabled: true })">Expand all (skip disabled)</mp-button>
      <mp-button @click="toggleAll({ expand: false })">Collapse all</mp-button>
      <mp-button @click="toggleAll({ expand: false, skipDisabled: true })">Collapse all (skip disabled)</mp-button>
    </mp-space>
    <mp-collapse ref="collapseRef" v-model="activeNames">
      <mp-collapse-item title="Panel 1" name="1">
        <div>Content 1</div>
      </mp-collapse-item>
      <mp-collapse-item title="Panel 2" name="2">
        <div>Content 2</div>
      </mp-collapse-item>
      <mp-collapse-item title="Panel 3" name="3" disabled>
        <div>Content 3</div>
      </mp-collapse-item>
      <mp-collapse-item title="Panel 4" name="4" disabled>
        <div>Content 4</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const collapseRef = ref<{
  toggleAll: (options: { expand: boolean | 'inverse'; skipDisabled?: boolean }) => void
}>()
const activeNames = ref<(string | number)[]>(['2', '4'])

const toggleAll = (options: { expand: boolean | 'inverse'; skipDisabled?: boolean }) => {
  collapseRef.value?.toggleAll(options)
}
</script>
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Header and expanded content inherit reading direction; changing direction preserves expansion. expand-icon-position left/right remain physical sides. Custom expansion graphics are not mirrored automatically.

## API

The main value uses ordinary `v-model`: `modelValue` is an array of expanded panel names, including in accordion mode. `defaultValue` initializes uncontrolled state only on creation; later changes do not reset it. Initialization does not emit `update:modelValue`. When `modelValue` is provided, the parent controls the state and its value is authoritative.

<!-- same-source-api:start -->

### Collapse Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value | Expanded names; v-model | `(string \| number)[]` | `—` |
| default-value | Uncontrolled initial expanded names | `(string \| number)[]` | `[]` |
| accordion | Accordion mode; at most one open panel | `boolean` | `false` |
| show-expand-icon | Whether to show expansion icons; child items decide when omitted | `boolean` | `—` |
| expand-icon-position | Expand-icon position within the header: left or right, default left. Does not control content expansion direction | `'left' \| 'right'` | `'left'` |
| bordered | Whether to show border | `boolean` | `true` |
| divider | Show dividers | `boolean` | `true` |
| offset | Gap between expanded panels | `boolean` | `false` |
| destroy-on-hide | Destroy content when hidden | `boolean` | `false` |

Panel content is mounted eagerly by default. When either the parent or an item enables `destroy-on-hide`, closed content is destroyed after the closing transition; reopening during the transition preserves it. Changing this setting while closed takes effect immediately. An explicit parent `show-expand-icon` overrides the item setting.

### Collapse Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:model-value | Request an expanded-name update | `(string \| number)[]` |
| change | Emitted when expanded panels change | `(string \| number)[]`, `Event` |

### Collapse Slots

| Slot | Description | Scope |
| --- | --- | --- |
| default | Panel list | `—` |

### Collapse Methods

| Method | Description |
| --- | --- |
| toggleAll | Expand or collapse all panels (no-op in accordion) |

<!-- same-source-api:end -->


The parent `expand-icon` slot is forwarded to items that do not provide their own icon. Scope: `expanded`, `disabled`, `position`. It is not rendered on the root node.

### CollapseItem Props

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| name **(required)** | Unique panel identifier corresponding to a value in `modelValue` | `string \| number` | `—` |
| title | Panel title | `string` | `—` |
| heading-level | Heading level from 1 to 6, chosen for the page; omitted by default | `1–6` | `—` |
| region | Whether content is a region landmark | `boolean` | `true` |
| disabled | Whether disabled | `boolean` | `false` |
| show-expand-icon | Whether to show an expansion icon | `boolean` | `true` |
| destroy-on-hide | Destroy content when hidden | `boolean` | `false` |

Choose `heading-level` for the page structure; set `:region="false"` when many panels would create excessive region landmarks. `extra` sits outside the header button and can contain independent actions; avoid interactive controls in title and expand-icon slots. A right-side expand icon sits inside the header button, followed by `extra`.

### CollapseItem Slots

| Slot | Description | Prop |
| --- | --- | --- |
| title | Panel title | `—` |
| extra | Extra content | `—` |
| expand-icon | Expand icon | expanded: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'` |
| default | Panel content | `—` |

## Types

### CollapseToggleAllOptions

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| expand | `'inverse'` toggles all; `boolean` expands or collapses all | `'inverse' \| boolean` | `—` |
| skipDisabled | Skip disabled panels | `boolean` | `false` |

`Collapse.Item` is the same component as `mp-collapse-item`; `app.use(Collapse)` registers both.

```ts
import type { CollapseInstance, CollapseToggleAllOptions, ExpandIconPosition } from '@maple-design/ui-vue'
```

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-collapse-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-collapse-border-radius` | `4px` | `border-radius` |
| `--mp-collapse-border-width` | `1px` | `border` |
| `--mp-collapse-content-bg` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-collapse-content-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-collapse-content-padding-vertical` | `10px` | `padding` |
| `--mp-collapse-content-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-collapse-content-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-collapse-expand-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-collapse-expand-icon-active-transform` | `rotate(-180deg)` | `transform` |
| `--mp-collapse-expand-icon-right-active-transform` | `rotate(-180deg)` | `transform` |
| `--mp-collapse-expand-icon-right-transform` | `rotate(0deg)` | `transform` |
| `--mp-collapse-expand-icon-size` | `16px` | `font-size` |
| `--mp-collapse-expand-icon-spacing-text` | `8px` | `gap` |
| `--mp-collapse-expand-icon-transform` | `rotate(0deg)` | `transform` |
| `--mp-collapse-focus-color` | `currentColor` | `outline` |
| `--mp-collapse-focus-offset` | `-2px` | `outline-offset` |
| `--mp-collapse-focus-width` | `2px` | `outline` |
| `--mp-collapse-item-border-color` | `var(--mp-sys-color-border-default)` | `border-bottom` |
| `--mp-collapse-item-border-width` | `1px` | `border-bottom` |
| `--mp-collapse-item-margin-top` | `16px` | `margin-top` |
| `--mp-collapse-line-height` | `1.5` | `line-height` |
| `--mp-collapse-motion-duration` | `0.25s` | `transition` |
| `--mp-collapse-motion-easing` | `ease` | `transition` |
| `--mp-collapse-title-bg` | `var(--mp-sys-color-surface-default)` | `background`, `background-color` |
| `--mp-collapse-title-bg-active` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-collapse-title-bg-disabled` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-collapse-title-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-collapse-title-font-weight-active` | `500` | `font-weight` |
| `--mp-collapse-title-line-height` | `24px` | `line-height` |
| `--mp-collapse-title-padding-horizontal` | `12px` | `padding` |
| `--mp-collapse-title-padding-vertical` | `10px` | `padding` |
| `--mp-collapse-title-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-collapse-title-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-collapse-border-color: var(--mp-sys-color-border-default);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Colors

Collapse public color variables use system semantics consistently in Maple/Cedar:

| Variable | Default semantic value |
| --- | --- |
| `--mp-collapse-border-color` | `--mp-sys-color-border-default` |
| `--mp-collapse-title-bg` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-bg-active` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-bg-disabled` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-text-color` | `--mp-sys-color-content-primary` |
| `--mp-collapse-title-text-color-disabled` | `--mp-sys-color-content-disabled` |
| `--mp-collapse-content-text-color` | `--mp-sys-color-content-primary` |
| `--mp-collapse-content-text-color-disabled` | `--mp-sys-color-content-disabled` |
| `--mp-collapse-content-bg` | `--mp-sys-color-surface-muted` |
| `--mp-collapse-expand-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-collapse-item-border-color` | `--mp-sys-color-border-default` |

#### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.
