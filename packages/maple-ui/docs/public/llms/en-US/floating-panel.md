<!-- Source: src/floating-panel/docs/en-US.md; locale: en-US; page: /en-US/floating-panel -->

# FloatingPanel

## Examples

### Intro
A panel floating at the bottom of the page, is often used to provide additional functionality or information, allowing users to freely drag up and down through content.

### Basic Usage

The demo is confined to a 400px container using `popup-container=false` and a local fixed-position containing block, so it does not cover the documentation. Application panels still default to the window bottom. Custom anchors are 80, 180 and 320px; the header-only example lets content scroll without resizing the panel.

Example source: src/floating-panel/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const tabsRef = ref(null)
const active = ref('basic')
const anchors = ref([80, 180, 320])
const anchor = ref(80)
const styleVars = ref({
  '--mp-tab-padding': '2px',
})
</script>

<template>
  <mp-style-provider class="floating-panel-demo-surface" :style-vars="styleVars">
    <mp-tabs v-model="active" style="margin-top: 14px">
      <mp-tabs-navs ref="tabsRef">
        <mp-tab-nav name="basic" title="基本使用" />
        <mp-tab-nav name="anchors" title="自定义锚点" />
        <mp-tab-nav name="head" title="仅头部拖拽" />
      </mp-tabs-navs>

      <mp-tabs-items>
        <mp-tab-item name="basic">
          <mp-floating-panel v-if="active === 'basic'" :anchors="[80, 320]" :popup-container="false">
            <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border />
          </mp-floating-panel>
        </mp-tab-item>
        <mp-tab-item name="anchors">
          <mp-floating-panel v-if="active === 'anchors'" v-model="anchor" :anchors="anchors" :popup-container="false">
            <div style="text-align: center; padding: 5px 15px">
              <p>面板锚点高度为 {{ Math.floor(anchor) }} px</p>
            </div>
          </mp-floating-panel>
        </mp-tab-item>
        <mp-tab-item name="head">
          <mp-floating-panel
            v-if="active === 'head'"
            :anchors="[80, 320]"
            :content-draggable="false"
            :popup-container="false"
          >
            <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border />
          </mp-floating-panel>
        </mp-tab-item>
      </mp-tabs-items>
    </mp-tabs>
  </mp-style-provider>
</template>

<style scoped>
.floating-panel-demo-surface {
  position: relative;
  height: 400px;
  overflow: hidden;
  transform: translateZ(0);
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: 8px;
}
</style>
```

## API

### Model and default value

Use ordinary `v-model`. `modelValue` is the current anchor height in pixels. `defaultValue` initializes uncontrolled state only at creation; changing it later does not reset the current state. A supplied model takes precedence. Initialization emits no `update:modelValue`.

### Props

| Prop  | Description  | Type      | Default        |
| ------- | ---- | ----- | ---- |
| `v-model`    | Current settled height in pixels; updated after dragging and snapping | _number_ | `-`  |
| `default-value` | Initial uncontrolled height, read only at creation | _number_ | `100` |
| `anchors`           | Custom anchors which unit is `px` | _number[]_ | `[100, window.innerHeight * 0.6]`  |
| `content-draggable` | Whether to allow to drag panel content area | _boolean_ | `true`  |
| `duration`          | Transition duration which unit is `ms` | _number \| string_ | `300`  |
| `elevation`         | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `true`    |
| `popup-container`          | The location of the ejector layer mount              | _TeleportProps['to'] \| false_ | `body`  |
| `safe-area`         | Whether to enable bottom safe area adaptation | _boolean_ | `false`  |

### Events

| Event | Description  | Arguments  |
| ---- | ---- | ---- |
| `update:model-value` | Height after dragging and snapping; not emitted during initialization | `height: number` |
| `height-change` | Triggered after moving to an anchor | `height: number` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Custom panel content | `-` |
| `header` ***3.2.12***  | Custom panel header  | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable  | Default  |
| ---------- | -------- |
| `--floating-panel-z-index` | `999` |
| `--floating-panel-border-top` | `none` |
| `--floating-panel-border-radius` | `0` |
| `--mp-floating-panel-background` | `var(--mp-sys-color-surface-overlay)` |
| `--floating-panel-header-height` | `40px` |
| `--floating-panel-toolbar-width` | `20px` |
| `--floating-panel-toolbar-height` | `3px` |
| `--floating-panel-toolbar-border-radius` | `10px` |
| `--floating-panel-toolbar-background` | `#ddd` |
| `--floating-panel-transition-timing-function` | `cubic-bezier(0.18, 0.89, 0.32, 1.28)` |
