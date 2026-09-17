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
| `popup-container`  | The location of the Overlay to mount                                                                            | _TeleportProps['to'] \| false_ | `'body'` |
| `esc-to-close`     | Whether to support keyboard ESC to close the overlay                                                            | _boolean_                      | `true`   |
| `z-index`          | Custom stack level                                                                                              | _number_                       | `-`      |

### Events

| Event        | Description                          | Arguments       |
| ------------ | ------------------------------------ | --------------- |
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

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                        | Default             |
| ------------------------------- | ------------------- |
| `--mp-overlay-background-color` | `rgba(0, 0, 0, .6)` |
