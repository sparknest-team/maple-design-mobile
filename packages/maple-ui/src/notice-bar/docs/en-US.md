# NoticeBar

### Intro

Display temporary system notices or campaign messages.

### Basic Usage

```demo
../example/demos/basic.vue
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `text` | Notice text | `string` | `-` |
| `type` | Tone | `info \| success \| warning \| danger` | `warning` |
| `mode` | `closeable` shows close icon | `closeable` | `-` |
| `icon` | Left icon name | `string` | `info-circle` |
| `color` | Text color | `string` | `-` |
| `background` | Background color | `string` | `-` |
| `scrollable` | Enable marquee | `boolean` | `false` |
| `speed` | Scroll speed (px/s) | `number \| string` | `50` |
| `delay` | Delay before scroll (s) | `number \| string` | `1` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `close` | Emitted on close | `event` |
| `replay` | Emitted after one scroll loop | `-` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Content |
| `icon` | Left icon |
| `action` | Right action |
