<!-- Source: src/tooltip/docs/en-US.md; locale: en-US; page: /en-US/tooltip -->

# Tooltip

Provides a short description for a control, icon, or truncated text. It responds to hover and keyboard focus by default. Use Popover for interactive content.

## Basic examples

### Basic usage

Example source: src/tooltip/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip">
    <mp-button status="primary">基本使用</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## Appearance and states

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Size

Tooltip implements only `md` and `xs`; the default is `md`.

#### Appearance combinations

Use this example for supplementary descriptions on hover. Adjust status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

Example source: src/tooltip/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef } from 'vue'

const __demoAppearance = __demoReactive({ status: 'default', size: 'md' })
const demoCompareFields = [
  { name: 'status', values: ['default', 'primary', 'info', 'success', 'warning', 'danger'] },
  { name: 'size', values: ['xs', 'md'] },
]
const demoCompareAxis = demoRef('status')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="status">
        <mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
          ]"
          aria-label="status"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'md', value: 'md' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-tooltip content="Tooltip" v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }">
          <mp-button>默认</mp-button>
        </mp-tooltip>
      </section>
    </div>
  </mp-space>
</template>
<style scoped lang="less">
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
```

## Layout and arrangement

### Placement, offset and trigger

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Hint content | Placement, offset and trigger |
| `placement` | Preferred popup side relative to the trigger, default top. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Placement, offset and trigger |
| `popup-translate` | Additional screen-axis translation | Placement, offset and trigger |
| `trigger` | Interaction | Placement, offset and trigger |
<!-- demo-config-notes:end -->


Example source: src/tooltip/example/demos/placement.vue

```vue
<script setup>
import { ref } from 'vue'

const placementValue = ref('top')
const placementOptions = ref([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
])
</script>

<template>
  <mp-form-item layout="vertical" size="sm" label="placementValue">
    <mp-select v-model="placementValue" aria-label="placementValue" :hint="false">
      <mp-option v-for="(item, index) in placementOptions" :key="index" :label="item" />
    </mp-select>
  </mp-form-item>
  <div class="placement-container">
    <mp-tooltip content="Tooltip" :placement="placementValue">
      <mp-button status="primary">
        <m-icon-star-fill />
      </mp-button>
    </mp-tooltip>
  </div>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/tooltip/example/demos/offset.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip" :popup-translate="[64, -10]">
    <mp-button status="primary">偏移量</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/tooltip/example/demos/trigger.vue

```vue
<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-form-item layout="vertical" size="sm" label="trigger">
    <mp-radio-group
      v-model="trigger"
      aria-label="trigger"
      :options="[
        { label: 'click', value: 'click' },
        { label: 'hover', value: 'hover' },
      ]"
      variant="button"
      size="sm"
    />
  </mp-form-item>
  <mp-tooltip content="Tooltip" style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">触发方式</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## Content and presentation

### Content, status and color

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Hint content | Content, status and color, Events and disabled state |
| `color` | Background color | Content, status and color |
| `text-color` | Custom text color | Content, status and color |
| `disabled` | Prevent opening | Events and disabled state |
<!-- demo-config-notes:end -->


Example source: src/tooltip/example/demos/content-slot.vue

```vue
<script setup></script>

<template>
  <mp-tooltip>
    <mp-button status="primary">内容插槽</mp-button>

    <template #content>
      <m-icon-star-fill />
    </template>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```



Example source: src/tooltip/example/demos/custom-color.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip" color="#d81b60" text-color="#fff">
    <mp-button status="primary">自定义颜色</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### Events and disabled state

Example source: src/tooltip/example/demos/events.vue

```vue
<script setup>
import { Message } from '@maple-design/ui-vue'
</script>

<template>
  <mp-tooltip
    content="Tooltip"
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button status="primary">注册事件</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/tooltip/example/demos/disabled.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip" disabled>
    <mp-button status="primary">禁用提示</mp-button>
  </mp-tooltip>

  <div style="margin-bottom: 100px"></div>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## Usage notes

### Configuration

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

With Teleport, variables must be in the actual popup scope, for example through `popup-style`. Trigger-button variables do not automatically inherit into popups.

## API

Tooltip inherits Trigger positioning, container, controlled state, and `close` policies. Its defaults are `hide-empty=true` and `auto-fit-transform-origin=true`; an omitted `animation-name` uses the Tooltip animation. Empty content hides only the tooltip and does not change `open`; component nodes count as content. The instance exposes seven methods: `open`, `close`, `resize`, `allowClose`, `getReference`, `focusReference`, and `setReference`.

### Tooltip Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:open | Controlled open state | `boolean` | — |
| default-open | Initial uncontrolled state | `boolean` | `false` |
| content | Hint content | `string` | — |
| status | Panel intent | `default \| primary \| info \| success \| warning \| danger` | `default` |
| size | Implemented sizes | `xs \| md` | `md` |
| color | Background color | `string` | — |
| text-color | Custom text color | `string` | — |
| trigger | Interaction | `TriggerEvent \| TriggerEvent[]`<br>`TriggerEvent: 'manual' \| 'focus' \| 'hover' \| 'click' \| 'contextMenu'` | `['hover', 'focus']` |
| placement | Preferred popup side relative to the trigger, default top. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | `TriggerPlacement`<br>`'left' \| 'right' \| 'bottom' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `top` |
| show-arrow | Show the arrow | `boolean` | `true` |
| popup-offset | Main-axis distance | `number` | `10` |
| popup-translate | Additional screen-axis translation | `[number, number] \| Record` | — |
| popup-container | Render target; false renders locally | `string \| HTMLElement \| false` | `body` |
| reference | External trigger element | `string \| HTMLElement \| SVGElement` | — |
| disabled | Prevent opening | `boolean` | `false` |
| unmount-on-close | Unmount after close | `boolean` | `true` |

### Tooltip Events

| Event | Description |
| --- | --- |
| update:open | Requests a controlled open-state change |
| open-change | Requests any open-state change |
| open | Opening starts |
| opened | Enter transition completes |
| close | Closing starts |
| closed | Leave transition completes |
| click-outside | Clicked outside the popup |

### Tooltip Slots

| Slot | Description |
| --- | --- |
| default | Trigger element |
| content | Tooltip `content`; falls back to `content` |

### Tooltip Methods

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

Tooltip content has role="tooltip". While open, its ID is added to the actual reference aria-describedby without duplicating existing descriptions. Closing, changing references or unmounting removes only that tooltip ID and preserves other descriptions. Use color for backgrounds and text-color for text; backgroundColor and boolean xs props are not supported.

## CSS Variables

All built-in themes use opacity 1. Colored solid text follows Button on-dark in both light/dark modes. Maple dark mode retains 4px radius, 14px font and 8px/16px vertical/horizontal padding. Neutral surfaces remain dark in both modes. `color` sets content/arrow backgrounds; `text-color` sets text. Explicit content-style/arrow-style override their respective nodes. Recheck custom colors/opacity.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-tooltip-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | `background-color` |
| `--mp-tooltip-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-tooltip-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-tooltip-line-height` | `var(--mp-line-height)` | `line-height` |
| `--mp-tooltip-max-width` | `350px` | `max-width` |
| `--mp-tooltip-opacity` | `1` | `opacity` |
| `--mp-tooltip-padding-horizontal` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-tooltip-padding-vertical` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-tooltip-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tooltip-size-xs-padding-horizontal` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-tooltip-size-xs-padding-vertical` | `var(--mp-sys-space-2)` | `padding` |
| `--mp-tooltip-status-danger-background` | `var(--mp-sys-color-status-danger)` | `background-color` |
| `--mp-tooltip-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-info-background` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-tooltip-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-primary-background` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-tooltip-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-success-background` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-tooltip-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-warning-background` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-tooltip-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-tooltip-background: var(--mp-sys-color-surface-tooltip);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
