# Dialog

### Description

Use `<mp-dialog>` for component usage and explicit `Dialog.*` methods for functional usage. Both forms share one configuration model. Callable `Dialog(...)` is not supported.

## Examples

The sections below follow the same order as the controls in the mobile preview.

### Basic Usage

Component dialogs show the top-right close button by default.

```demo
../example/demos/basic-usage.vue
```

### Async Close

`beforeClose` closes only after `done()` is called. Functional calls default to `simple: true` and `closable: false`.



Component dialogs support the same interception and loading refs through `before-close`.

```demo
../example/demos/async-close.vue
```

### Function Calls

```demo
../example/demos/function-call.vue
```

### Alert Dialog

```demo
../example/demos/alert-dialog.vue
```

### Confirm Box



The component version uses the same `type="warning"`.

```demo
../example/demos/confirm-box.vue
```

### Semantic Messages

```demo
../example/demos/type-icon.vue
```

### Dialog Form

Use a component dialog for complex forms and validate from `before-close`.

```demo
../example/demos/form-dialog.vue
```

### Custom Footer

```demo
../example/demos/custom-footer.vue
```

### Custom Button Text

Confirm and cancel buttons use Button's `default` status and `text` variant unless `confirmButtonProps` or `cancelButtonProps` overrides them.

```demo
../example/demos/custom-button-text.vue
```

### Layout

The preview demonstrates custom width, simple, draggable, and fullscreen dialogs in this order.

```demo
../example/demos/layout.vue
```

### Advanced Props

The preview demonstrates hidden footer, hidden title, custom body, and unmount-on-close behavior.

```demo
../example/demos/advanced-props.vue
```

### Long Content

```demo
../example/demos/long-content.vue
```

## API

### Props

| Prop                                                 | Description                                | Type                                          | Default          |
| ---------------------------------------------------- | ------------------------------------------ | --------------------------------------------- | ---------------- |
| `open` **(v-model)**                                 | Visible state                              | `boolean`                                     | `-`              |
| `default-open`                                       | Initial uncontrolled state                 | `boolean`                                     | `false`          |
| `title` / `message`                                  | Title and message                          | `string`                                      | `-`              |
| `type`                                               | Semantic icon                              | `'info' \| 'success' \| 'warning' \| 'error'` | `-`              |
| `simple`                                             | Compact layout                             | `boolean`                                     | `false`          |
| `width` / `top`                                      | Width and top offset                       | `number \| string`                            | `-`              |
| `title-align`                                        | Title alignment                            | `'start' \| 'center'`                         | `'center'`       |
| `message-align`                                      | Message alignment                          | `'left' \| 'center' \| 'right'`               | `'left'`         |
| `align-center`                                       | Center vertically and horizontally         | `boolean`                                     | `true`           |
| `footer`                                             | Show footer                                | `boolean`                                     | `true`           |
| `confirm-button` / `cancel-button`                   | Show action buttons                        | `boolean`                                     | `true`           |
| `closable`                                           | Show close button                          | `boolean`                                     | `true`           |
| `confirm-button-text` / `cancel-button-text`         | Button labels                              | `string`                                      | localized        |
| `confirm-button-props` / `cancel-button-props`       | Button props, including colors             | `ButtonProps`                                 | `-`              |
| `confirm-button-loading` / `cancel-button-loading`   | Loading state                              | `boolean`                                     | `false`          |
| `confirm-button-disabled` / `cancel-button-disabled` | Disabled state                             | `boolean`                                     | `false`          |
| `overlay`                                            | Show overlay                               | `boolean`                                     | `true`           |
| `overlay-class` / `dialog-class` / `body-class`      | Custom classes                             | `string \| any[]`                             | `-`              |
| `overlay-style` / `dialog-style` / `body-style`      | Custom styles                              | `StyleValue`                                  | `-`              |
| `overlay-closable` / `esc-to-close` / `lock-scroll`  | Close/scroll behavior                      | `boolean`                                     | `true`           |
| `popup-container`                                    | Teleport target; `false` disables teleport | `string \| HTMLElement \| false`              | `'body'`         |
| `hide-title` / `unmount-on-close`                    | Rendering behavior                         | `boolean`                                     | `false`          |
| `draggable` / `fullscreen`                           | Layout modes                               | `boolean`                                     | `false`          |
| `overlay-animation-name` / `dialog-animation-name`   | Transition names                           | `string`                                      | library defaults |
| `aria-label`                                         | Accessible name without a visible title    | `string`                                      | `-`              |
| `close-button-aria-label`                            | Close button label                         | `string`                                      | `'Close dialog'` |
| `z-index`                                            | Stack level                                | `number`                                      | automatic        |
| `before-close`                                       | Close interceptor                          | `(action, done, refs) => void`                | `-`              |

### Events and slots

| Event                                  | Arguments       |
| -------------------------------------- | --------------- |
| `update:open`                          | `boolean`       |
| `open` / `opened` / `close` / `closed` | `-`             |
| `confirm` / `cancel`                   | `Event`         |
| `click-overlay`                        | `MouseEvent`    |
| `key-escape`                           | `KeyboardEvent` |

| Slot                | Slot props                   |
| ------------------- | ---------------------------- |
| `default` / `title` | `-`                          |
| `footer`            | `confirm`, `cancel`, `close` |

The component exposes `confirm()`, `cancel()`, and `close()`. Close button, overlay, Escape, and programmatic close use `close` semantics and do not emit `cancel`.

### Functional API

Opening methods accept `DialogConfig | string` and return `Promise<DialogAction | void> & DialogReturn`.
All functional dialogs use the compact layout (`simple: true`) and hide the top-right close button (`closable: false`) by default. Call options or global defaults can explicitly override either value.

| Method                                                       | Behavior                                        |
| ------------------------------------------------------------ | ----------------------------------------------- |
| `Dialog.open(config)`                                        | General dialog                                  |
| `Dialog.confirm(config)`                                     | Warning type and simple layout                  |
| `Dialog.alert(config)`                                       | No cancel button; overlay/Escape close disabled |
| `Dialog.info/success/warning/error(config)`                  | Semantic one-button dialog                      |
| `Dialog.close()`                                             | Close the latest functional dialog              |
| `Dialog.setDefaultOptions(config)` / `resetDefaultOptions()` | Manage functional defaults                      |

`DialogConfig` uses camelCase component props and also supports renderable `content`, `title`, `message`, and `footer`, plus lifecycle and interaction callbacks including `onClickOverlay`. `DialogReturn` exposes `close()` and `update(config)`. The same service is available as `this.$dialog` after installation.

```ts
type DialogAction = 'confirm' | 'cancel' | 'close'
type DialogType = 'info' | 'success' | 'warning' | 'error'
```
