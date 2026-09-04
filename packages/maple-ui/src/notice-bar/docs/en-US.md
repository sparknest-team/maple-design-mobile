# NoticeBar

### Intro

Display temporary system notices or campaign messages.

### Basic Usage

```html
<template>
  <mp-notice-bar text="This is a notice" />
</template>
```

### Types

```html
<template>
  <mp-notice-bar type="info" text="Info" />
  <mp-notice-bar type="success" text="Success" />
  <mp-notice-bar type="warning" text="Warning" />
  <mp-notice-bar type="danger" text="Danger" />
</template>
```

### Closeable

```html
<template>
  <mp-notice-bar mode="closeable" text="Closeable notice" />
</template>
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
