<!-- Source: src/tooltip/docs/en-US.md; locale: en-US; page: /en-US/tooltip -->

# Tooltip

Provides a short description for a control, icon, or truncated text. It responds to hover and keyboard focus by default. Use Popover for interactive content.

## Examples

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

### Size

Tooltip implements only `md` and `xs`; the default is `md`.

Example source: src/tooltip/example/demos/size.vue

```vue
<template>
  <mp-space wrap>
    <mp-tooltip content="Compact tooltip" size="xs">
      <mp-button size="sm">xs</mp-button>
    </mp-tooltip>
    <mp-tooltip content="Default tooltip" size="md">
      <mp-button size="sm">md</mp-button>
    </mp-tooltip>
  </mp-space>
</template>
```

### Content, status and color

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

Example source: src/tooltip/example/demos/theme-color-tooltip.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="['14vmin', '2.666vmin']">
    <mp-tooltip content="Tooltip">
      <mp-button>默认</mp-button>
    </mp-tooltip>
    <mp-tooltip status="primary" content="Tooltip">
      <mp-button status="primary">主要</mp-button>
    </mp-tooltip>
    <mp-tooltip status="info" content="Tooltip">
      <mp-button status="info">信息</mp-button>
    </mp-tooltip>
    <mp-tooltip status="success" content="Tooltip">
      <mp-button status="success">成功</mp-button>
    </mp-tooltip>
    <mp-tooltip status="warning" content="Tooltip">
      <mp-button status="warning">警告</mp-button>
    </mp-tooltip>
    <mp-tooltip status="danger" content="Tooltip">
      <mp-button status="danger">危险</mp-button>
    </mp-tooltip>
  </mp-space>
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

### Placement, offset and trigger

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
  <mp-select v-model="placementValue" :hint="false">
    <mp-option v-for="(item, index) in placementOptions" :key="index" :label="item" />
  </mp-select>
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
  <mp-select v-model="trigger" :hint="false">
    <mp-option label="click" />
    <mp-option label="hover" />
  </mp-select>
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

### Events and disabled state

Example source: src/tooltip/example/demos/events.vue

```vue
<script setup>
import { Message } from '@maple-design/ui'
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

### Appearance combinations

Use this example for supplementary descriptions on hover. Adjust status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/tooltip/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ status: 'default', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>status</span
        ><mp-select
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
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'md', value: 'md' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-tooltip content="Tooltip" v-bind="__demoAppearance">
      <mp-button>默认</mp-button>
    </mp-tooltip>
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
```

## API

Tooltip inherits Trigger positioning, container, controlled state, dismissal and exposed methods.

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:open | Controlled open state | `boolean` | — |
| default-open | Initial uncontrolled state | `boolean` | `false` |
| content | Tooltip content | `string` | — |
| status | Panel intent | `default \| primary \| info \| success \| warning \| danger` | `default` |
| size | Implemented sizes | `xs \| md` | `md` |
| color | Custom background | `string` | — |
| text-color | Custom text color | `string` | — |
| trigger | Interaction | `TriggerEvent \| TriggerEvent[]` | `['hover', 'focus']` |
| placement | Preferred placement | `TriggerPlacement` | `top` |
| show-arrow | Show the arrow | `boolean` | `true` |
| popup-offset | Main-axis distance | `number` | `10` |
| popup-translate | Additional screen-axis translation | `[number, number] \| Record` | — |
| popup-container | Teleport target; false renders inline | `string \| HTMLElement \| false` | `body` |
| reference | External reference element | `string \| HTMLElement \| SVGElement` | — |
| disabled | Prevent opening | `boolean` | `false` |
| unmount-on-close | Unmount after close | `boolean` | `true` |

### Events

| Event | Description |
| --- | --- |
| update:open | Requests a controlled open-state change |
| open-change | Requests any open-state change |
| open | Opening starts |
| opened | Enter transition completes |
| close | Closing starts |
| closed | Leave transition completes |
| click-outside | The pointer activated outside the floating layer |

### Slots

| Slot | Description |
| --- | --- |
| default | Reference element |
| content | Tooltip content; falls back to the `content` prop |

### Methods

`open()`, `close()`, `resize()`, `allowClose()`, `getReference()`, `setReference()` and `focusReference()`.

The content has `role="tooltip"` and is connected to the actual reference with `aria-describedby`. Cedar and Maple keep independent copies of the same implementation; there are no `backgroundColor` or boolean `xs` compatibility aliases.

## Public CSS variables

Defaults below are the actual :root values. Prefer component variables for customization; internal positioning variables are not public APIs.

| Variable | Default | Purpose |
| --- | --- | --- |
| `--mp-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | Panel and arrow background |
| `--mp-tooltip-text-color` | `var(--mp-sys-color-content-on-dark)` | Content foreground |
| `--mp-tooltip-status-primary-background` | `var(--mp-sys-color-action-primary)` | primary status panel/arrow background |
| `--mp-tooltip-status-info-background` | `var(--mp-sys-color-status-info)` | info status panel/arrow background |
| `--mp-tooltip-status-success-background` | `var(--mp-sys-color-status-success)` | success status panel/arrow background |
| `--mp-tooltip-status-warning-background` | `var(--mp-sys-color-status-warning)` | warning status panel/arrow background |
| `--mp-tooltip-status-danger-background` | `var(--mp-sys-color-status-danger)` | danger status panel/arrow background |
| `--mp-tooltip-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | primary status foreground; pair with its fill |
| `--mp-tooltip-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | info status foreground; pair with its fill |
| `--mp-tooltip-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | success status foreground; pair with its fill |
| `--mp-tooltip-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | warning status foreground; pair with its fill |
| `--mp-tooltip-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | danger status foreground; pair with its fill |
| `--mp-tooltip-padding-horizontal` | `var(--mp-sys-space-6)` | Horizontal content padding |
| `--mp-tooltip-padding-vertical` | `var(--mp-sys-space-4)` | Vertical content padding |
| `--mp-tooltip-font-size` | `var(--mp-sys-font-size-md)` | Content font size |
| `--mp-tooltip-line-height` | `var(--mp-line-height)` | Content line height |
| `--mp-tooltip-border-radius` | `var(--mp-sys-radius-md)` | Panel corner radius |
| `--mp-tooltip-max-width` | `350px` | Maximum hint width |
| `--mp-tooltip-opacity` | `1` | Content and arrow opacity; recheck contrast |
| `--mp-tooltip-size-xs-padding-horizontal` | `var(--mp-sys-space-4)` | xs size: Horizontal content padding |
| `--mp-tooltip-size-xs-padding-vertical` | `var(--mp-sys-space-2)` | xs size: Vertical content padding |
| `--mp-tooltip-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | xs size: Content font size |
| `--mp-tooltip-animation-duration` | `var(--mp-sys-motion-duration-standard)` | Enter/leave duration; reduced-motion may override |

All built-in themes use opacity 1. Colored solid states follow Button and use on-dark text in both modes. Maple dark retains 4px radius, 14px font and 8px/16px vertical/horizontal padding. The neutral surface is dark in both modes. `color` sets panel and arrow backgrounds; `text-color` sets text. Explicit `content-style` / `arrow-style` override their respective nodes. Recheck custom colors/opacity.

With Teleport, apply variables to the actual popup scope (for example via `popup-style`); variables on the reference button do not automatically inherit into the popup.
