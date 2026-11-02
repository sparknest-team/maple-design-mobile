# Overlay

### Intro

Create an overlay layer to emphasize specific page elements.

## Basic examples

### Basic Usage

```demo
../example/demos/overlay-base.vue
```

## Content and presentation

### Overlay Content

```demo
../example/demos/overlay-content.vue
```

## Interaction and control

### Click Event

```demo
../example/demos/click-event.vue
```

## API

### Props

| Arguments | Description | Type | Default |
| ------------------ | ------------------------------------------------------ | ------------------------------ | -------- |
| `v-model:open` | Show overlay | _boolean_ | `false` |
| `default-open` | Whether to display by default in uncontrolled mode | _boolean_ | `false` |
| `overlay-closable` | Whether clicking the backdrop closes the Overlay | _boolean_ | `true` |
| `lock-scroll` | Whether to disable scrolling penetration, scrolling the Overlay when disabled will not cause the body to scroll | _boolean_ | `true` |
| `unmount-on-close` | Whether to unmount slot content after closing | _boolean_ | `true` |
| `popup-container` | Teleport target; `false` renders in place | _string \| HTMLElement \| false_ | `'body'` |
| `esc-to-close` | Whether to support keyboard ESC to close the overlay | _boolean_ | `true` |
| `z-index` | Custom z-index | _number_ | `-` |

### Events

| Event | Description | Arguments |
| ------------ | ------------------- | --------------- |
| `update:open` | Open state changed | `boolean` |
| `click` | Triggered when clicking the overlay | `MouseEvent` |
| `key-escape` | Triggered when click keyboard ESC | `KeyboardEvent` |
| `open` | Triggered when opening starts | `-` |
| `opened` | Triggered after opening transition | `-` |
| `close` | Triggered when closing starts | `-` |
| `closed` | Triggered after closing transition | `-` |

### Slots

| Slot | Description | Arguments |
| --------- | ---------- | ---- |
| `default` | Default slot | `-` |

## Public CSS variables

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

| Variable | Default | Meaning and use case |
| --- | --- | --- |
| `--mp-overlay-background-color` | `var(--mp-sys-color-scrim)` | Scrim background only; does not change foreground-content opacity |
| `--mp-overlay-animation-duration` | `var(--mp-sys-motion-duration-slow)` | Enter/leave duration; reduced motion may override it |
| `--mp-overlay-content-z-index` | `var(--mp-sys-layer-raised)` | Local stacking level of content above the scrim |

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.
