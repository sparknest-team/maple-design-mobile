# SwipeCell

## Examples

### Basic Usage

`name` identifies the item in `open`, `close`, and `before-close` payloads; it does not render text. Put visible content in the default slot, such as `<mp-cell title="Order title" />`. The example shows the emitted name and position.

Swipe left to reveal the right-side action.

```demo
../example/demos/basic.vue
```

### Both Sides

```demo
../example/demos/both-sides.vue
```

### Before Close

```demo
../example/demos/before-close.vue
```

`Dialog.confirm(...)` resolves with an action. Only `confirm` allows closing; `cancel` and `close` preserve the revealed actions. The basic Delete button demonstrates closing only; implement data deletion in your application.

## Drag cancellation and click suppression



## Confirmation lifetime



## Intro

Swipe a cell to reveal action buttons on either side.

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Item identity returned by open, close, and before-close; does not render text | `string \| number` | `''` |
| `left-width` | Left action width | `number \| string` | `auto` |
| `right-width` | Right action width | `number \| string` | `auto` |
| `before-close` | Hook before close | `(args) => boolean \| Promise<boolean>` | `-` |
| `disabled` | Disable swipe | `boolean` | `false` |
| `stop-propagation` | Stop touchmove bubbling | `boolean` | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Emitted on click | `position` |
| `open` | Emitted when opened | `{ name, position }` |
| `close` | Emitted when closed | `{ name, position }` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Main content |
| `left` | Left actions |
| `right` | Right actions |

### Methods

| Method | Description | Arguments |
| --- | --- | --- |
| `open` | Open side | `left \| right` |
| `close` | Close | `-` |
