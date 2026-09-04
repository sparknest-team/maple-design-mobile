# Dialog

### Description

Use `<mp-dialog>` for component usage and explicit `Dialog.*` methods for functional usage. Both forms share one configuration model. Callable `Dialog(...)` is not supported.

## Examples

The sections below follow the same order as the controls in the mobile preview.

### Basic Usage

Component dialogs show the top-right close button by default.

```html
<script setup>
  import { ref } from 'vue'

  const open = ref(false)
</script>

<template>
  <mp-button status="warning" block @click="open = true">Component Call</mp-button>
  <mp-dialog v-model:open="open" title="Title" message="Dialog content" />
</template>
```

### Async Close

`beforeClose` closes only after `done()` is called. Functional calls default to `simple: true` and `closable: false`.

```ts
const instance = Dialog.open({
  message: 'Submitting',
  beforeClose(action, done, refs) {
    if (action !== 'confirm') return done()
    refs.confirmButtonLoading.value = true
    submit().then(done)
  },
})
```

Component dialogs support the same interception and loading refs through `before-close`.

### Function Calls

```ts
Dialog.open('Dialog content')
const instance = Dialog.open({ title: 'Title', message: 'Dialog content' })
instance.update({ title: 'Updated title' })

const action = await Dialog.open('Dialog content')
Dialog.open({ message: 'Dialog content', confirmButton: false, cancelButton: false })
```

### Alert Dialog

```ts
Dialog.alert({ title: 'Notice', message: 'Dialog content', type: 'info' })
```

### Confirm Box

```ts
await Dialog.confirm({ title: 'Confirm Action', message: 'Continue?' })
await Dialog.confirm({
  title: 'Dangerous Action',
  message: 'This action cannot be undone. Continue?',
  confirmButtonProps: { variant: 'default', status: 'danger' },
})
```

The component version uses the same `type="warning"`.

### Semantic Messages

```ts
Dialog.info({ title: 'Information', message: 'Information message' })
Dialog.success({ title: 'Success', message: 'Operation completed' })
Dialog.warning({ title: 'Warning', message: 'Confirm before continuing' })
Dialog.error({ title: 'Error', message: 'Operation failed' })
```

### Dialog Form

Use a component dialog for complex forms and validate from `before-close`.

```html
<mp-dialog v-model:open="open" title="Dialog Form" :before-close="beforeClose">
  <mp-form ref="formRef" :model="formData">...</mp-form>
</mp-dialog>
```

### Custom Footer

```html
<mp-dialog v-model:open="open">
  <template #footer="{ close, cancel, confirm }">
    <mp-button variant="text" @click="close">Close</mp-button>
    <mp-button variant="text" @click="cancel">Cancel</mp-button>
    <mp-button status="primary" @click="confirm">Confirm</mp-button>
  </template>
</mp-dialog>
```

### Custom Button Text

Confirm and cancel buttons use Button's `default` status and `text` variant unless `confirmButtonProps` or `cancelButtonProps` overrides them.

```html
<mp-dialog v-model:open="open" confirm-button-text="Continue" cancel-button-text="Exit" />
```

### Layout

The preview demonstrates custom width, simple, draggable, and fullscreen dialogs in this order.

```html
<mp-dialog v-model:open="open" :width="320" />
<mp-dialog v-model:open="simpleOpen" simple />
<mp-dialog v-model:open="draggableOpen" draggable />
<mp-dialog v-model:open="fullscreenOpen" fullscreen />
```

### Advanced Props

The preview demonstrates hidden footer, hidden title, custom body, and unmount-on-close behavior.

```html
<mp-dialog v-model:open="open" :footer="false" />
<mp-dialog v-model:open="hideTitleOpen" hide-title aria-label="Title" />
<mp-dialog v-model:open="customBodyOpen" body-class="custom-body" :body-style="{ padding: 0 }" />
<mp-dialog v-model:open="unmountOpen" unmount-on-close />
```

### Long Content

```html
<mp-dialog v-model:open="open" :body-style="{ maxHeight: '50vh', overflowY: 'auto' }">
  <p v-for="item in 12" :key="item">{{ item }}. Scrollable long content</p>
</mp-dialog>
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
| `mask`                                               | Show mask                                  | `boolean`                                     | `true`           |
| `mask-class` / `dialog-class` / `body-class`         | Custom classes                             | `string \| any[]`                             | `-`              |
| `mask-style` / `dialog-style` / `body-style`         | Custom styles                              | `StyleValue`                                  | `-`              |
| `mask-closable` / `esc-to-close` / `lock-scroll`     | Close/scroll behavior                      | `boolean`                                     | `true`           |
| `popup-container`                                    | Teleport target; `false` disables teleport | `string \| HTMLElement \| false`              | `'body'`         |
| `hide-title` / `unmount-on-close`                    | Rendering behavior                         | `boolean`                                     | `false`          |
| `draggable` / `fullscreen`                           | Layout modes                               | `boolean`                                     | `false`          |
| `mask-animation-name` / `dialog-animation-name`      | Transition names                           | `string`                                      | library defaults |
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
| `click-mask`                           | `MouseEvent`    |
| `key-escape`                           | `KeyboardEvent` |

| Slot                | Slot props                   |
| ------------------- | ---------------------------- |
| `default` / `title` | `-`                          |
| `footer`            | `confirm`, `cancel`, `close` |

The component exposes `confirm()`, `cancel()`, and `close()`. Close button, mask, Escape, and programmatic close use `close` semantics and do not emit `cancel`.

### Functional API

Opening methods accept `DialogConfig | string` and return `Promise<DialogAction | void> & DialogReturn`.
All functional dialogs use the compact layout (`simple: true`) and hide the top-right close button (`closable: false`) by default. Call options or global defaults can explicitly override either value.

| Method                                                       | Behavior                                     |
| ------------------------------------------------------------ | -------------------------------------------- |
| `Dialog.open(config)`                                        | General dialog                               |
| `Dialog.confirm(config)`                                     | Warning type and simple layout               |
| `Dialog.alert(config)`                                       | No cancel button; mask/Escape close disabled |
| `Dialog.info/success/warning/error(config)`                  | Semantic one-button dialog                   |
| `Dialog.close()`                                             | Close the latest functional dialog           |
| `Dialog.setDefaultOptions(config)` / `resetDefaultOptions()` | Manage functional defaults                   |

`DialogConfig` uses camelCase component props and also supports renderable `content`, `title`, `message`, and `footer`, plus lifecycle and interaction callbacks including `onClickMask`. `DialogReturn` exposes `close()` and `update(config)`. The same service is available as `this.$dialog` after installation.

```ts
type DialogAction = 'confirm' | 'cancel' | 'close'
type DialogType = 'info' | 'success' | 'warning' | 'error'
```
