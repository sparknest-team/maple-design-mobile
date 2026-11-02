# NoticeBar

### Intro

Display temporary system notices or campaign messages.

## Basic examples

### Basic Usage

```demo
../example/demos/basic.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Icons, text and close actions follow reading order. Scrolling text travels from reading end toward reading start; RTL reverses motion without mirroring text or changing close/replay semantics.

## API

### Props

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| `text` | Notice text | `string` | `-` |
| `type` | Type | `info \| success \| warning \| danger` | `warning` |
| `mode` | `closeable` shows close icon | `closeable` | `-` |
| `icon` | Left-icon name; empty string hides it | `string` | `info-circle` |
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
