# SwipeCell

Swipe cell content left/right to reveal actions, commonly for deletion/favorites in lists.

## Basic examples

### Basic Usage

`name` identifies the item in `open`, `close`, and `before-close` payloads; it does not render text. Put visible content in the default slot, such as `<mp-cell title="Order title" />`. The example shows the emitted name and position.

Swipe left to reveal the right-side action.

```demo
../example/demos/basic.vue
```

## Directions and actions

### Both Sides

```demo
../example/demos/both-sides.vue
```

## Async closing control

### Before Close

```demo
../example/demos/before-close.vue
```

`Dialog.confirm(...)` resolves with an action. Only `confirm` allows closing; `cancel` and `close` preserve the revealed actions. The basic Delete button demonstrates closing only; implement data deletion in your application.

## Loading and waiting

### Controlled loading

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Explicit business loading state | `boolean` | `false` |

External loading blocks close/switch requests; internal before-hook waiting is merged for display.


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

```demo
../example/demos/loading.vue
```

## API

### Props

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| `name` | Item identity returned by open, close, and before-close; does not render text | `string \| number` | `''` |
| `left-width` | Left action-area width; `auto` measures content | `number \| string` | `auto` |
| `right-width` | Right action width | `number \| string` | `auto` |
| `before-close` | Before-close hook; `false` prevents closing | `(args) => boolean \| Promise<boolean>` | `-` |
| `disabled` | Disable swipe | `boolean` | `false` |
| `stop-propagation` | Stop `touchmove` bubbling | `boolean` | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered when the cell is clicked | `position: left \| right \| cell \| outside` |
| `open` | Emitted on open | `{ name, position }` |
| `close` | Emitted on close | `{ name, position }` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Main content |
| `left` | Left actions |
| `right` | Right action |

### Methods

| Method | Description | Arguments |
| --- | --- | --- |
| `open` | Open the sidebar | `left \| right` |
| `close` | Collapse | `-` |

### Before-hook waiting feedback

Before-hook waits show visible feedback and aria-busy. Rejected or failed operations recover; duplicate submissions do not start another copy. Notification event Promises never drive loading. Hook failures emit guard-error; close() resolves without closing. A new gesture cancels the old close request.

### guard-error

Emitted once with `(error, position)` after a close hook fails.
