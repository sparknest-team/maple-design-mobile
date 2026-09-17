# FloatingPanel

### Intro
A panel floating at the bottom of the page, is often used to provide additional functionality or information, allowing users to freely drag up and down through content.

### Basic Usage

```demo
../example/demos/basic.vue
```

## API

### Props

| Prop  | Description  | Type      | Default        |
| ------- | ---- | ----- | ---- |
| `v-model:anchor`    | The panel initially displays the anchor point, or the first value of the `anchors` attribute if not passed | _number \| string_ | `-`  |
| `anchors`           | Custom anchors which unit is `px` | _number[]_ | `[100, window.innerHeight * 0.6]`  |
| `content-draggable` | Whether to allow to drag panel content area | _boolean_ | `true`  |
| `duration`          | Transition duration which unit is `ms` | _number \| string_ | `300`  |
| `elevation`         | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `true`    |
| `popup-container`          | The location of the ejector layer mount              | _TeleportProps['to'] \| false_ | `body`  |
| `safe-area`         | Whether to enable bottom safe area adaptation | _boolean_ | `false`  |

### Events

| Event | Description  | Arguments  |
| ---- | ---- | ---- |
| `anchor-change` | Triggered after moving to an anchor | `height: number` |

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
| `--floating-panel-background` | `var(--color-fill-2)` |
| `--floating-panel-header-height` | `40px` |
| `--floating-panel-toolbar-width` | `20px` |
| `--floating-panel-toolbar-height` | `3px` |
| `--floating-panel-toolbar-border-radius` | `10px` |
| `--floating-panel-toolbar-background` | `#ddd` |
| `--floating-panel-transition-timing-function` | `cubic-bezier(0.18, 0.89, 0.32, 1.28)` |