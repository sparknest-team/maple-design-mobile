# SwipeCell

### Intro

Swipe a cell to reveal action buttons on either side.

### Basic Usage

```html
<template>
  <mp-swipe-cell>
    <template #right>
      <mp-button status="danger" style="height: 100%">Delete</mp-button>
    </template>
    <mp-cell title="Swipe left" border />
  </mp-swipe-cell>
</template>
```

### Both Sides

```html
<template>
  <mp-swipe-cell>
    <template #left>
      <mp-button status="primary" style="height: 100%">Select</mp-button>
    </template>
    <mp-cell title="Swipe either side" border />
    <template #right>
      <mp-button status="danger" style="height: 100%">Delete</mp-button>
    </template>
  </mp-swipe-cell>
</template>
```

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
