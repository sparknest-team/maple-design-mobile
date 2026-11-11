<!-- Source: src/floating-panel/docs/en-US.md; locale: en-US; page: /en-US/floating-panel -->

# FloatingPanel

### Intro
A panel floating at the bottom of the page, is often used to provide additional functionality or information, allowing users to freely drag up and down through content.

## Basic examples

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
  <mp-theme-provider class="floating-panel-demo-surface" :style-vars="styleVars">
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
            <template #header>
              <div class="panel-height-controls">
                <mp-button
                  html-type="button"
                  :disabled="anchor === 80"
                  @click="anchor = anchors[Math.max(0, anchors.indexOf(anchor) - 1)]"
                >
                  收起
                </mp-button>
                <span aria-live="polite">{{ anchor }} px</span>
                <mp-button
                  html-type="button"
                  :disabled="anchor === 320"
                  @click="anchor = anchors[Math.min(anchors.length - 1, anchors.indexOf(anchor) + 1)]"
                >
                  展开
                </mp-button>
              </div>
            </template>
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
  </mp-theme-provider>
</template>

<style scoped>
.panel-height-controls {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 40px;
}
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

## Usage notes

### Configuration

Native `id`, `aria-*`, class, style and event listeners apply to the actual panel root. Internal transforms merge with business styles.

## API

### Value and default value

Use normal `v-model`. `modelValue` is the strictly controlled docked height in px. `defaultValue` initializes uncontrolled state once and later changes do not reset it. An explicit binding takes precedence; initialization does not emit `update:modelValue`. Dragging shows a temporary height. Ending notifies the candidate anchor; a refusing parent restores the effective bound anchor. `touchcancel`, deactivation, or model/anchor changes during dragging cancel without committing.

### FloatingPanel Props

| Prop | Description | Type | Default |
| ------------------ | ----------------------------------------------------------------- | ---------- | ---------------- |
| `v-model` | Current settled height in pixels; updated after dragging and snapping | _number_ | `-` |
| `default-value` | Initial uncontrolled height, read only at creation | _number_ | `100` |
| `anchors` | Finite nonnegative anchors in px. Invalid entries are filtered and duplicates removed; empty or entirely invalid arrays use defaults. Sorting is unnecessary; ties prefer the earlier supplied entry. | _number[]_ | `[100, window.innerHeight * 0.6]` |
| `content-draggable` | Whether to allow to drag panel content area | _boolean_ | `true` |
| `duration` | Finite nonnegative animation duration in ms. Numeric strings are supported; invalid values fall back to 300 and 0 disables transform animation. | _number \| string_ | `300` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_ | `true` |
| `popup-container` | Mount target: defaults to body; false renders in place. Supports a selector or HTMLElement. | _PopupContainer_ | `body` |
| `safe-area` | Whether to adapt to the bottom, left and right safe areas | _boolean_ | `false` |

Omitting `popup-container` mounts to `body`; `false` renders inline. Missing or invalid selectors fall back to `body` with a development warning. Targets can change at runtime, and SSR does not query browser DOM.

### FloatingPanel Events

| Event | Description | Arguments |
| --- | --- | --- |
| `update:model-value` | Height after dragging and snapping; not emitted during initialization | `height: number` |
| `height-change` | Notifies a changed candidate anchor on drag end; parent acceptance is not guaranteed. | `height: number` |

### FloatingPanel Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Custom panel content | `-` |
| `header` | Custom panel header | `-` |

### Keyboard and types

The custom-anchor example uses native Collapse and Expand buttons in the header slot. Enter/Space adjusts the same v-model. The default drag handle supports touch only. The panel root does not automatically declare a dialog or button role; provide region names and interaction semantics for the content.

Heights and initial values must be finite and nonnegative; invalid values display the minimum effective anchor. Dynamic anchors rematch the nearest value without writing back. External changes do not emit user commit events. Events are notifications; Promises are not awaited and do not drive loading. `content-draggable=false` preserves native content scrolling.

```ts
import { FloatingPanel } from '@maple-design/ui-vue/floating-panel'
import type { FloatingPanelProps, FloatingPanelInstance, PopupContainer } from '@maple-design/ui-vue'
```

No custom public instance methods. Eight props, two events and two unscoped slots. PopupContainer accepts HTMLElement, selectors and false; the shared type is authoritative.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-floating-panel-background` | `var(--mp-sys-color-surface-overlay)` | `background-color`, `box-shadow` |
| `--mp-floating-panel-border-radius` | `0` | `border-top-left-radius`, `border-top-right-radius` |
| `--mp-floating-panel-border-top` | `none` | `border-top` |
| `--mp-floating-panel-header-height` | `30px` | `height` |
| `--mp-floating-panel-toolbar-background` | `#ddd` | `background` |
| `--mp-floating-panel-toolbar-border-radius` | `10px` | `border-radius` |
| `--mp-floating-panel-toolbar-height` | `3px` | `height` |
| `--mp-floating-panel-toolbar-width` | `20px` | `width` |
| `--mp-floating-panel-transition-timing-function` | `cubic-bezier(0.18, 0.89, 0.32, 1.28)` | Component styling |
| `--mp-floating-panel-z-index` | `999` | `z-index` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-floating-panel-background: var(--mp-sys-color-surface-overlay);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
