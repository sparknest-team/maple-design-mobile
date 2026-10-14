# SwipeCell

## Intro

Swipe a cell to reveal action buttons on either side.

## Examples

### Basic Usage

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

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Identifier | `string \| number` | `''` |
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
