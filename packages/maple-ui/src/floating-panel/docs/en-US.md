# FloatingPanel

### Intro
A panel floating at the bottom of the page, is often used to provide additional functionality or information, allowing users to freely drag up and down through content.

## Basic examples

### Basic Usage

The demo is confined to a 400px container using `popup-container=false` and a local fixed-position containing block, so it does not cover the documentation. Application panels still default to the window bottom. Custom anchors are 80, 180 and 320px; the header-only example lets content scroll without resizing the panel.

```demo
../example/demos/basic.vue
```

## API

### Value and default value

Use ordinary `v-model`. `modelValue` is current docking height in px. `defaultValue` initializes uncontrolled state once without later resets. Explicit binding wins, with no initialization `update:modelValue`.

### Props

| Arguments | Description | Type | Default |
| ------------------ | ----------------------------------------------------------------- | ---------- | ---------------- |
| `v-model` | Current settled height in pixels; updated after dragging and snapping | _number_ | `-` |
| `default-value` | Initial uncontrolled height, read only at creation | _number_ | `100` |
| `anchors` | Custom anchors which unit is `px` | _number[]_ | `[100, window.innerHeight * 0.6]` |
| `content-draggable` | Whether to allow to drag panel content area | _boolean_ | `true` |
| `duration` | Transition duration which unit is `ms` | _number \| string_ | `300` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_ | `true` |
| `popup-container` | Mount target: body when omitted, false for inline; selector or HTMLElement | _string \| HTMLElement \| false_ | `body` |
| `safe-area` | Whether to enable bottom safety zone adaptation | _boolean_ | `false` |

Omitting `popup-container` mounts to `body`; `false` renders inline. Missing or invalid selectors fall back to `body` with a development warning. Targets can change at runtime, and SSR does not query browser DOM.

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `update:model-value` | Height after dragging and snapping; not emitted during initialization | `height: number` |
| `height-change` | Triggered after moving to an anchor | `height: number` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Custom panel content | `-` |
| `header` ***3.2.12*** | Custom panel header | `-` |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
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

Native id, aria attributes, class, style and event listeners apply to the actual panel root; business styles merge with the built-in transform.
