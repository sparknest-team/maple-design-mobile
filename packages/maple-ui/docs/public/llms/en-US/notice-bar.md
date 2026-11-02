<!-- Source: src/notice-bar/docs/en-US.md; locale: en-US; page: /en-US/notice-bar -->

# NoticeBar

## Examples

### Intro

Display temporary system notices or campaign messages.

### Basic Usage

Example source: src/notice-bar/example/demos/basic.vue

```vue
<template>
  <div class="notice-bar-example">
    <mp-notice-bar text="这是一条通知信息" />
    <mp-notice-bar style="margin-top: 12px" type="info" text="信息提示" />
    <mp-notice-bar style="margin-top: 12px" mode="closeable" text="可关闭通知" />
    <mp-notice-bar style="margin-top: 12px" scrollable text="这是一条很长很长的通知，将会横向滚动播放。" />
  </div>
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
