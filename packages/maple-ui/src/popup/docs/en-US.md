# Popup

### Intro

Create a container that can pop up from top, bottom, left, right and center. `popupContainer` inserts into the end of the `body` by default.

### Popup Position

```demo
../example/demos/popup-position.vue
```

### Overlay Style

```demo
../example/demos/overlay-style.vue
```

### Event

```demo
../example/demos/event.vue
```

## API

### Props

| Prop                   | Description                                                                                                   | Type                           | Default  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------- |
| `v-model:open`         | Whether to display the Popup                                                                                  | _boolean_                      | `false`  |
| `position`             | Popup position with optional value of `top` `bottom` `right` `left` `center`                                  | _string_                       | `center` |
| `overlay`              | Whether to display the overlay                                                                                | _boolean_                      | `true`   |
| `overlay-class`        | Custom overlay class                                                                                          | _string_                       | `-`      |
| `overlay-style`        | Custom overlay style                                                                                          | _object_                       | `-`      |
| `default-style`        | Whether to enable the default style                                                                           | _boolean_                      | `true`   |
| `transition`           | Transition animation name                                                                                     | _string_                       | `-`      |
| `lock-scroll`          | Whether to disable scrolling penetration, scrolling the Popup when disabled will not cause the body to scroll | _boolean_                      | `true`   |
| `overlay-closable`     | Whether to click the overlay to close the Popup                                                               | _boolean_                      | `true`   |
| `esc-to-close`         | Whether to support keyboard ESC to close the popup                                                            | _boolean_                      | `true`   |
| `popup-container`       | The location of the Popup to mount                                                                            | _TeleportProps['to'] \| false_ | `body`   |
| `safe-area`            | Whether to enable bottom safety zone adaptation                                                               | _boolean_                      | `false`  |
| `safe-area-top`        | Whether to enable top safety zone adaptation                                                                  | _boolean_                      | `false`  |
| `z-index` _**3.3.10**_ | The zIndex of element                                                                                         | _number_                       | `-`      |

### Events

| Event           | Description                                   | Arguments       |
| --------------- | --------------------------------------------- | --------------- |
| `open`          | Triggered when the Popup is open              | `-`             |
| `opened`        | Triggered when the Popup open-animation ends  | `-`             |
| `close`         | Triggered when the Popup is close             | `-`             |
| `closed`        | Triggered when the Popup close-animation ends | `-`             |
| `click-overlay` | Triggered when you click the overlay          | `MouseEvent`    |
| `key-escape`    | Triggered when pressing ESC                   | `KeyboardEvent` |

### Slots

| Name      | Description   | SlotProps |
| --------- | ------------- | --------- |
| `default` | Popup content | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                           | Default             |
| ---------------------------------- | ------------------- |
| `--popup-overlay-background-color` | `rgba(0, 0, 0, .6)` |
| `--popup-content-background-color` | `var(--color-bg-1)` |
