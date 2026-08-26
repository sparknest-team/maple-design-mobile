# Drag

### Intro

Make the element draggable freely.

### Basic Use

```html
<template>
  <mp-drag>
    <mp-button type="primary">Basic Use</mp-button>
  </mp-drag>
</template>
```

### Direction

```html
<template>
  <mp-drag direction="x">
    <mp-button type="primary">Direction</mp-button>
  </mp-drag>
</template>
```

### Attraction Direction

```html
<template>
  <mp-drag style="left: 0; top: 0" attraction="x">
    <mp-button type="primary">X Attraction</mp-button>
  </mp-drag>
  <mp-drag style="left: 100px; top: 0" attraction="y">
    <mp-button type="primary">Y Attraction</mp-button>
  </mp-drag>
</template>
```

### Disabled

```html
<template>
  <mp-drag disabled>
    <mp-button type="primary" disabled>Disabled</mp-button>
  </mp-drag>
</template>
```

### Boundary

```html
<template>
  <mp-drag style="top: 80px; left: 80px" :boundary="{ top: 80, bottom: 80, left: 80, right: 80 }">
    <mp-button type="primary">Boundary</mp-button>
  </mp-drag>
</template>
```

### Reset Position

```html
<script setup>
import { ref } from 'vue'

const drag = ref(null)

function reset() {
  drag.value.reset()
}
</script>

<template>
  <mp-drag ref="drag" style="top: 100px">
    <mp-button type="primary">Drag Element</mp-button>
  </mp-drag>

  <mp-button type="primary" @click="reset">Reset Position</mp-button>
</template>
```

## API

### Props

| Prop | Description   | Type  | Default |
|---------------------|-------------|------|--------------|
| `direction`  | Drag direction, optional value is `x` `y` `xy`	 | _string_ | `xy` |
| `attraction`  | Attraction direction, optional value is `x` `y` `xy`	 | _string_ | `-` |
| `disabled`  | Whether to disable | _boolean_ | `false` |
| `boundary`  | Drag boundary | _{ top?: number \| string, bottom?: number \| string, left?: number \| string, right?: number \| string }_ | `{ top: 0, bottom: 0, left: 0, right: 0 }` |
| `z-index`  | Drag element z-index | _string \| number_ | `90` |
| `popupContainer`  | The location where the dragged element is mounted | _TeleportProps['to'] \| false_ | `body` |

### Events

| Event    | Description                 | Arguments                   |
| -------- | --------------------------- | --------------------------- |
| `click` | Triggered when clicking drag component  | `event: Event` |

### Methods

| Method   | Description                                                          | Arguments       | Return |
| -------- | -------------------------------------------------------------------- | --------------- | ------ |
| `resize` | You can call this method to redraw when a drag element changes position size | `-`             | `-`    |
| `reset` | Reset initialized position information | `-` | `-` |

### Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Drag element's content | `-` |