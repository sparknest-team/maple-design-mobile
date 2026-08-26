# Dialog

### Description

Display a dialog for user interaction. `Dialog` supports both **component** and **function** usage with the same API.

- Simple confirm: pass `message` with default buttons
- Custom content: use `default` / `title` / `footer` slots
- No separate Modal component — everything is `Dialog`

## Function Call

See the Chinese documentation for examples. API tables below match the component implementation.

### Type Icon

Set `type` to `info` / `success` / `warning` / `error` to show the corresponding icon before the title.

### Confirm Box

`Dialog.confirm()` defaults to `type: warning` and shows a warning icon in the title.

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:open` | Whether to display the dialog | _boolean_ | `false` |
| `type` | Dialog type: `info` `success` `warning` `error` (shows icon in title) | _string_ | `-` |
| `title` | Title | _string_ | `Hint` |
| `width` | Width | _string \| number_ | `-` |
| `message` | Message (or use default slot) | _string_ | `-` |
| `message-align` | Message alignment: `left` `center` `right` | _string_ | `left` |
| `footer` | Show footer area | _boolean_ | `true` |
| `hide-title` | Hide title | _boolean_ | `false` |
| `body-class` | Body class | _string_ | `-` |
| `body-style` | Body style | _object_ | `-` |
| `unmount-on-close` | Unmount after close | _boolean_ | `false` |
| `confirm-button` | Show confirm button | _boolean_ | `true` |
| `cancel-button` | Show cancel button | _boolean_ | `true` |
| `confirm-button-text` | Confirm button text | _string_ | `Confirm` |
| `cancel-button-text` | Cancel button text | _string_ | `Cancel` |
| `confirm-button-text-color` | Confirm button text color | _string_ | `-` |
| `cancel-button-text-color` | Cancel button text color | _string_ | `-` |
| `confirm-button-color` | Confirm button color | _string_ | `-` |
| `cancel-button-color` | Cancel button color | _string_ | `-` |
| `confirm-button-loading` | Confirm button loading | _boolean_ | `false` |
| `cancel-button-loading` | Cancel button loading | _boolean_ | `false` |
| `confirm-button-disabled` | Confirm button disabled | _boolean_ | `false` |
| `cancel-button-disabled` | Cancel button disabled | _boolean_ | `false` |
| `confirm-button-props` | Confirm button props | _ButtonProps_ | `-` |
| `cancel-button-props` | Cancel button props | _ButtonProps_ | `-` |
| `dialog-class` | Dialog class | _string_ | `-` |
| `dialog-style` | Dialog style | _object_ | `-` |
| `mask` | Show overlay | _boolean_ | `true` |
| `mask-class` | Overlay class | _string_ | `-` |
| `mask-style` | Overlay style | _object_ | `-` |
| `lock-scroll` | Lock body scroll | _boolean_ | `true` |
| `mask-closable` | Close on overlay click | _boolean_ | `true` |
| `esc-to-close` | Close on ESC | _boolean_ | `true` |
| `popupContainer` | Teleport target | _TeleportProps['to'] \| false_ | `body` |
| `before-close` | Before close interceptor (`:before-close`) | _(action, done, refs) => void_ | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `open` | Emitted when opening | `-` |
| `opened` | Emitted after open animation | `-` |
| `close` | Emitted when closing | `-` |
| `closed` | Emitted after close animation | `-` |
| `before-close` | Before close (can prevent) | `action`, `done`, `refs` |
| `confirm` | On confirm | `-` |
| `cancel` | On cancel | `-` |
| `click-overlay` | On overlay click | `-` |
| `key-escape` | On ESC | `-` |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `Dialog` | Show dialog | _options \| string_ | `Promise<DialogAction> & DialogReturn` |
| `Dialog.open` | Open dialog | _options_ | `Promise<DialogAction> & DialogReturn` |
| `Dialog.confirm` | Confirm dialog (`type: warning`) | _options_ | `Promise<DialogAction> & DialogReturn` |
| `Dialog.alert` | Alert dialog (no cancel) | _options_ | `Promise<DialogAction> & DialogReturn` |
| `Dialog.close` | Close function dialog | `-` | `-` |
| `Dialog.setDefaultOptions` | Set default options | _options_ | `-` |
| `Dialog.resetDefaultOptions` | Reset default options | `-` | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Content | `-` |
| `title` | Title | `-` |
| `footer` | Footer actions | `slotClass`, `cancel`, `confirm` |

### Types

```ts
type DialogAction = 'confirm' | 'cancel' | 'close'
type DialogType = 'info' | 'success' | 'warning' | 'error'
```

See Chinese docs for full Dialog Options table and style variables.
