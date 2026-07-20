# Message

### Description

Lightweight global feedback. Supports both **component** and **function** usage.

Shared function demos with Cedar: basic, types, custom icon, position, duration, closable, update by `id`, loading, multiple. Component usage and Mobile extensions are Maple-only.

## Function Call

### Basic Usage

```ts
import { Message } from '@maplejs/maple-ui'

Message('This is a message')
```

### Message Type

`info` / `success` / `warning` / `error` / `loading` / `normal`.  
`loading` defaults to `duration: 0` (manual `close`). `normal` has no icon by default.

### Custom Icon

```ts
Message.info({
  content: 'This is a message',
  icon: () => h(Icon, { name: 'heart' }),
})
```

### Position

`top` / `center` / `bottom` (`center` is Mobile-only; Cedar is `top` / `bottom`).

### Duration

```ts
Message({ content: 'This is a message', duration: 1000 })
```

### Closable

```ts
Message({ content: 'This is a message', closable: true, duration: 0 })
```

### Update Content

Same `id` updates an existing message.

### Loading

```ts
const message = Message.loading('waiting...')
setTimeout(() => {
  message.close()
  Message.success('Loaded')
}, 2000)
```

### Multiple

Instances stack by default. `Message.clear()` / `Message.clear('top')`.

### Custom Action (Mobile)

Function `action` is Maple-only (not in Cedar).

## Component Call

Declarative `mp-message` is Maple-only. See Chinese docs for full examples: basic, vertical, bottom + action, custom icon slot, forbid click, closable.

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:show` | Whether to show | _boolean_ | `false` |
| `type` | `success` `warning` `info` `error` `loading` `normal` | _string_ | `-` |
| `position` | `top` `center` `bottom` | _string_ | `top` |
| `content` | Content | _string_ | `-` |
| `duration` | Duration ms; `0` means no auto close | _number_ | `3000` |
| `show-icon` | Show icon | _boolean_ | `true` |
| `closable` | Show close button | _boolean_ | `false` |
| `vertical` | Vertical layout | _boolean_ | `false` |
| `forbid-click` | Block click through | _boolean_ | `false` |
| `lock-scroll` | Lock scroll | _boolean_ | `false` |
| `elevation` | Elevation | _boolean \| string \| number_ | `true` |
| `teleport` | Teleport target | _TeleportProps['to'] \| false_ | `body` |

### Methods

| Method | Description | Return |
| --- | --- | --- |
| `Message` / type methods | Open message | `MessageReturn` |
| `Message.clear` | Clear all (optional position) | `-` |
| `Message.setDefaultOptions` | Set defaults | `-` |
| `Message.resetDefaultOptions` | Reset defaults | `-` |

### MessageReturn

| Property | Description |
| --- | --- |
| `close` | Close current message |

### Slots

`default` / `icon` / `action`

See Chinese docs for Options table and style variables.
