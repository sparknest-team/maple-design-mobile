<!-- Source: src/popover/docs/en-US.md; locale: en-US; page: /en-US/popover -->

# Popover

Shows structured, interactive content after the reference is clicked. Use Tooltip for a short, non-interactive description.

## Examples

### Basic usage

Example source: src/popover/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-popover title="设备状态">
    <mp-button status="primary">基本使用</mp-button>
    <template #content>
      <p>设备：生产线 A-03</p>
      <p>状态：运行中</p>
    </template>
  </mp-popover>
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

### Interactive content and retained state

Example source: src/popover/example/demos/interactive.vue

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
const draft = ref('')
</script>

<template>
  <mp-popover v-model:open="open" title="快速备注">
    <mp-button status="primary">编辑备注</mp-button>
    <template #content>
      <mp-space direction="column">
        <mp-input v-model="draft" placeholder="关闭后再次打开，草稿仍会保留" />
        <mp-button status="primary" block @click="open = false">完成</mp-button>
      </mp-space>
    </template>
  </mp-popover>
</template>
```

### Placement and offset

Example source: src/popover/example/demos/placement.vue

```vue
<script setup>
import { ref } from 'vue'

const placementValue = ref('bottom-start')
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
    <mp-popover :placement="placementValue">
      <mp-button status="primary">
        <m-icon-star-fill />
      </mp-button>
      <template #content>
        <mp-cell>选项</mp-cell>
        <mp-cell>选项</mp-cell>
        <mp-cell>选项</mp-cell>
      </template>
    </mp-popover>
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

Example source: src/popover/example/demos/offset.vue

```vue
<script setup></script>

<template>
  <mp-popover :popup-translate="[36, 18]">
    <mp-button status="primary">偏移量</mp-button>
    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
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

Example source: src/popover/example/demos/auto-fit-popup-width.vue

```vue
<script setup></script>

<template>
  <mp-popover auto-fit-popup-width>
    <mp-button status="primary">与触发元素同宽</mp-button>

    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
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

### Trigger and controlled state

Example source: src/popover/example/demos/trigger.vue

```vue
<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-select v-model="trigger" :hint="false">
    <mp-option label="click" />
    <mp-option label="hover" />
    <mp-option label="contextMenu" />
  </mp-select>
  <mp-popover style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">触发方式</mp-button>

    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
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

Example source: src/popover/example/demos/two-way-binding.vue

```vue
<script setup>
import { ref } from 'vue'

const show = ref(false)
function closeMenu() {
  show.value = false
}
</script>

<template>
  <mp-popover v-model:open="show">
    <mp-button status="primary">双向绑定</mp-button>

    <template #content>
      <mp-cell @click="closeMenu">选项</mp-cell>
      <mp-cell @click="closeMenu">选项</mp-cell>
      <mp-cell @click="closeMenu">选项</mp-cell>
    </template>
  </mp-popover>

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

Example source: src/popover/example/demos/events.vue

```vue
<script setup>
import { Message } from '@maple-design/ui'
</script>

<template>
  <mp-popover
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button status="primary">注册事件</mp-button>

    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
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

Example source: src/popover/example/demos/disabled.vue

```vue
<script setup></script>

<template>
  <mp-popover disabled>
    <mp-button status="primary" disabled>禁用气泡卡片</mp-button>

    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
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

## API

Popover inherits Trigger positioning, container, controlled state, dismissal and exposed methods.

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:open | Controlled open state | `boolean` | — |
| default-open | Initial uncontrolled state | `boolean` | `false` |
| title | Heading | `string` | — |
| content | Body | `string` | — |
| trigger | Interaction | `TriggerEvent \| TriggerEvent[]` | `click` |
| placement | Preferred placement | `TriggerPlacement` | `bottom` |
| show-arrow | Show the arrow | `boolean` | `true` |
| popup-offset | Main-axis distance | `number` | `10` |
| popup-translate | Additional screen-axis translation | `[number, number] \| Record` | — |
| popup-container | Teleport target; false renders inline | `string \| HTMLElement \| false` | `body` |
| reference | External reference element | `string \| HTMLElement \| SVGElement` | — |
| disabled | Prevent opening | `boolean` | `false` |
| unmount-on-close | Unmount after close; false retains draft state | `boolean` | `false` |
| close-on-click-reference | Close when the reference is clicked again | `boolean` | `true` |

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
| title | Heading; falls back to the `title` prop |
| content | Body; falls back to the `content` prop |

### Methods

`open()`, `close()`, `resize()`, `allowClose()`, `getReference()`, `setReference()` and `focusReference()`.

The reference is connected to the panel with `aria-controls` and `aria-expanded`. Use Trigger for unstyled positioning. Popover has no `defaultStyle`, `popoverClass`, or `elevation`; customize with tokens, `content-class`, or `content-style`.

## Public CSS variables

Defaults below are the actual :root values. Prefer component variables for customization; internal positioning variables are not public APIs.

| Variable | Default | Purpose |
| --- | --- | --- |
| `--mp-popover-background` | `var(--mp-sys-color-surface-overlay)` | Panel and arrow background |
| `--mp-popover-text-color` | `var(--mp-sys-color-content-secondary)` | Content foreground |
| `--mp-popover-border-color` | `var(--mp-sys-color-border-default)` | Panel and arrow border color |
| `--mp-popover-border-width` | `1px` | Panel and arrow border width |
| `--mp-popover-border-radius` | `var(--mp-sys-radius-md)` | Panel corner radius |
| `--mp-popover-box-shadow` | `0 3px 3px -2px var(--mp-shadow-key-umbra-opacity), 0 3px 4px 0 var(--mp-shadow-key-penumbra-opacity), 0 1px 8px 0 var(--mp-shadow-key-ambient-opacity)` | Panel shadow; platform-specific |
| `--mp-popover-arrow-z-index` | `1` | Arrow layer inside this popup |
| `--mp-popover-padding-horizontal` | `var(--mp-sys-space-7)` | Horizontal content padding |
| `--mp-popover-padding-vertical` | `var(--mp-sys-space-6)` | Vertical content padding |
| `--mp-popover-font-size` | `var(--mp-sys-font-size-md)` | Content font size |
| `--mp-popover-line-height` | `var(--mp-line-height)` | Content line height |
| `--mp-popover-title-text-color` | `var(--mp-sys-color-content-primary)` | Title foreground |
| `--mp-popover-title-font-size` | `var(--mp-sys-font-size-lg)` | Title font size |
| `--mp-popover-title-font-weight` | `var(--mp-sys-font-weight-medium)` | Title font weight |
| `--mp-popover-title-content-gap` | `var(--mp-sys-space-2)` | Title/body gap |
| `--mp-popover-animation-duration` | `var(--mp-sys-motion-duration-standard)` | Enter/leave duration; reduced-motion may override |

Maple dark retains a 2px corner radius. Shadows remain platform-specific. Panel and arrow share background and border tokens, even if Trigger CSS loads last.

With Teleport, apply variables to the actual popup scope (for example via `popup-style`); variables on the reference button do not automatically inherit into the popup.
