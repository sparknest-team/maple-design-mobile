# Overlay

### Intro

Create an overlay layer to emphasize specific page elements.

### Basic Usage

```demo
../example/demos/overlay-base.vue
```

### Overlay Content

```demo
../example/demos/overlay-content.vue
```

### Click Event

```demo
../example/demos/click-event.vue
```

## API

### Props

| Prop               | Description                                                                                                     | Type                           | Default  |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------- |
| `v-model:open`     | Whether to display the Overlay                                                                                  | _boolean_                      | `false`  |
| `default-open`     | Whether to display by default in uncontrolled mode                                                              | _boolean_                      | `false`  |
| `overlay-closable` | Whether clicking the backdrop closes the Overlay                                                                | _boolean_                      | `true`   |
| `lock-scroll`      | Whether to disable scrolling penetration, scrolling the Overlay when disabled will not cause the body to scroll | _boolean_                      | `true`   |
| `unmount-on-close` | Whether to unmount slot content after closing                                                                   | _boolean_                      | `true`   |
| `popup-container`  | Teleport target; `false` renders in place                                                                       | _string \| HTMLElement \| false_ | `'body'` |
| `esc-to-close`     | Whether to support keyboard ESC to close the overlay                                                            | _boolean_                      | `true`   |
| `z-index`          | Custom stack level                                                                                              | _number_                       | `-`      |

### Events

| Event        | Description                          | Arguments       |
| ------------ | ------------------------------------ | --------------- |
| `update:open` | Open state changed                  | `boolean`       |
| `click`      | Triggered when clicking on overlay   | `MouseEvent`    |
| `key-escape` | Triggered when pressing keyboard ESC | `KeyboardEvent` |
| `open`       | Triggered when opening starts        | `-`             |
| `opened`     | Triggered after opening transition   | `-`             |
| `close`      | Triggered when closing starts        | `-`             |
| `closed`     | Triggered after closing transition   | `-`             |

### Slots

| Name      | Description  | SlotProps |
| --------- | ------------ | --------- |
| `default` | Default slot | `-`       |

## Public CSS variables

Defaults below are the actual :root values. Prefer component variables for customization; internal positioning variables are not public APIs.

| Variable | Default | Purpose |
| --- | --- | --- |
| `--mp-overlay-background-color` | `var(--mp-sys-color-scrim)` | Backdrop only; does not fade foreground content |
| `--mp-overlay-animation-duration` | `var(--mp-sys-motion-duration-slow)` | Enter/leave duration; reduced-motion may override |
| `--mp-overlay-content-z-index` | `var(--mp-sys-layer-raised)` | Local content layer above the backdrop |

### Reduced motion

Built-in CSS transitions respect `prefers-reduced-motion: reduce`. Final visibility, checked/expanded state and event semantics remain unchanged; custom slot animations are controlled by the application.
