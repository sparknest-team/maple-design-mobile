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
| `close-on-route-change`                              | Close on browser history or hash changes   | `boolean`                                     | `false`          |
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

### Style Variables

Dialog color roles match Cedar: `--mp-dialog-background` uses the raised surface, `--mp-dialog-overlay-background` controls the backdrop, title and content use the primary content color, the close button uses the secondary content color, and `--mp-dialog-status-{info|success|warning|danger}-color` maps to readable status content roles (content-info/success/warning/danger), not status fills. Override component variables for local themes and system variables for cross-component themes. Mobile borders, sizing, and layout remain platform-specific.

#### Complete token defaults

Token groups: background/overlay-background define panel and scrim; border-* controls panel/separator borders; title-* and content-* control title/body typography and spacing; actions-* controls the footer; close-button-* controls the close action; status-* defines semantic icons; simple-*/fullscreen-* controls those modes; animation-* controls transitions. Width and margin-top define ordinary panel layout. Private drag and positioning variables are not public customization APIs.

The backdrop consumes `sys-color-scrim` through the Dialog component variable. Maple no longer uses Popup colors for Dialog. Set a per-instance backdrop variable via `overlay-style`; a variable on the panel (`dialog-style`) does not inherit to its sibling backdrop. Explicit `overlay-style.backgroundColor` wins. Teleported content needs variables on its actual DOM ancestors. Dark themes inherit the same semantic colors; geometry remains platform-specific. Status icons use readable content colors.

| Variable | Default |
| --- | --- |
| `--mp-dialog-background` | `var(--mp-sys-color-surface-raised)` |
| `--mp-dialog-overlay-background` | `var(--mp-sys-color-scrim)` |
| `--mp-dialog-border-color` | `transparent` |
| `--mp-dialog-border-width` | `0` |
| `--mp-dialog-border-radius` | `3px` |
| `--mp-dialog-width` | `280px` |
| `--mp-dialog-margin-top` | `0` |
| `--mp-dialog-title-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-dialog-title-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-dialog-title-font-weight` | `var(--mp-sys-font-weight-regular)` |
| `--mp-dialog-title-padding` | `20px 20px 0` |
| `--mp-dialog-title-min-height` | `0` |
| `--mp-dialog-title-justify` | `space-between` |
| `--mp-dialog-content-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-dialog-content-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-dialog-content-line-height` | `24px` |
| `--mp-dialog-content-padding` | `12px 20px` |
| `--mp-dialog-actions-padding` | `0 12px 12px` |
| `--mp-dialog-actions-button-gap` | `var(--mp-sys-space-3)` |
| `--mp-dialog-close-button-size` | `40px` |
| `--mp-dialog-close-button-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-dialog-close-button-font-size` | `20px` |
| `--mp-dialog-close-button-inset-inline-end` | `0` |
| `--mp-dialog-status-icon-size` | `18px` |
| `--mp-dialog-status-icon-gap` | `var(--mp-sys-space-3)` |
| `--mp-dialog-status-info-color` | `var(--mp-sys-color-content-info)` |
| `--mp-dialog-status-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-dialog-status-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-dialog-status-danger-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-dialog-simple-width` | `280px` |
| `--mp-dialog-simple-border-radius` | `var(--mp-sys-radius-lg)` |
| `--mp-dialog-simple-padding` | `20px` |
| `--mp-dialog-simple-content-gap` | `0` |
| `--mp-dialog-simple-actions-gap` | `0` |
| `--mp-dialog-fullscreen-width` | `100vw` |
| `--mp-dialog-fullscreen-height` | `100vh` |
| `--mp-dialog-animation-duration` | `var(--mp-sys-motion-duration-slow)` |
| `--mp-dialog-animation-easing` | `var(--mp-sys-motion-easing-standard)` |
