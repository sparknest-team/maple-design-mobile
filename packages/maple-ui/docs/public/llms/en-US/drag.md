<!-- Source: src/drag/docs/en-US.md; locale: en-US; page: /en-US/drag -->

# Drag

## Examples

### Intro

Make the element draggable freely.

### Basic Use

Example source: src/drag/example/demos/basic-use.vue

```vue
<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag"
      style="left: 16px; top: 16px"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
    >
      <mp-button status="primary">基本使用</mp-button>
    </mp-drag>
  </div>
</template>

<style scoped lang="less">
.drag-demo-surface {
  position: relative;
  height: 180px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Disabled

Example source: src/drag/example/demos/disabled.vue

```vue
<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag5"
      style="left: 16px; top: 16px"
      disabled
      attraction="x"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
      z-index="80"
    >
      <mp-button status="primary" disabled>禁止拖拽</mp-button>
    </mp-drag>
  </div>
</template>

<style scoped lang="less">
.drag-demo-surface {
  position: relative;
  height: 180px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Direction

Example source: src/drag/example/demos/direction.vue

```vue
<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag2"
      style="left: 16px; top: 16px"
      direction="x"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
    >
      <mp-button status="primary">仅可水平拖拽</mp-button>
    </mp-drag>
  </div>
</template>

<style scoped lang="less">
.drag-demo-surface {
  position: relative;
  height: 180px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Attraction Direction

Example source: src/drag/example/demos/attraction.vue

```vue
<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag3"
      style="left: 16px; top: 16px"
      attraction="x"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
    >
      <mp-button status="primary">水平吸附</mp-button>
    </mp-drag>
    <mp-drag
      ref="drag4"
      style="left: 132px; top: 88px"
      attraction="y"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
    >
      <mp-button status="primary">垂直吸附</mp-button>
    </mp-drag>
  </div>
</template>

<style scoped lang="less">
.drag-demo-surface {
  position: relative;
  height: 180px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Boundary

Example source: src/drag/example/demos/boundary.vue

```vue
<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag6"
      style="left: 24px; top: 24px"
      attraction="x"
      :boundary="{ top: 24, right: 24, bottom: 24, left: 24 }"
      :popup-container="false"
    >
      <mp-button status="primary">距边缘 24px</mp-button>
    </mp-drag>
  </div>
</template>

<style scoped lang="less">
.drag-demo-surface {
  position: relative;
  height: 180px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Reset Position

Example source: src/drag/example/demos/reset.vue

```vue
<script setup>
import { ref } from 'vue'

const drag = ref(null)
function reset() {
  drag.value?.reset()
}
</script>

<template>
  <div class="drag-demo-surface">
    <mp-drag
      ref="drag"
      style="right: 16px; bottom: 16px"
      attraction="xy"
      :boundary="{ top: 12, right: 12, bottom: 12, left: 12 }"
      :popup-container="false"
    >
      <mp-button status="primary">先拖动我</mp-button>
    </mp-drag>
    <mp-button variant="outline" @click="reset">重置位置</mp-button>
  </div>
</template>

<style scoped lang="less">
.drag-demo-surface {
  position: relative;
  height: 180px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

## API

### Props

| Prop              | Description                                          | Type                                                                                                       | Default                                    |
| ----------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `direction`       | Drag direction, optional value is `x` `y` `xy`       | _string_                                                                                                   | `xy`                                       |
| `attraction`      | Attraction direction, optional value is `x` `y` `xy` | _string_                                                                                                   | `-`                                        |
| `disabled`        | Whether to disable                                   | _boolean_                                                                                                  | `false`                                    |
| `boundary`        | Drag boundary                                        | _{ top?: number \| string, bottom?: number \| string, left?: number \| string, right?: number \| string }_ | `{ top: 0, bottom: 0, left: 0, right: 0 }` |
| `z-index`         | Drag element z-index                                 | _string \| number_                                                                                         | `90`                                       |
| `popup-container` | The location where the dragged element is mounted    | _TeleportProps['to'] \| false_                                                                             | `body`                                     |

When `popup-container` is `false`, the dragged element stays in place and calculates its boundary against the nearest positioned parent. Set `position: relative` on that parent for local dragging inside a card or panel.

### Events

| Event   | Description                            | Arguments      |
| ------- | -------------------------------------- | -------------- |
| `click` | Triggered when clicking drag component | `event: Event` |

### Methods

| Method   | Description                                                                  | Arguments | Return |
| -------- | ---------------------------------------------------------------------------- | --------- | ------ |
| `resize` | You can call this method to redraw when a drag element changes position size | `-`       | `-`    |
| `reset`  | Reset initialized position information                                       | `-`       | `-`    |

### Slots

| Name      | Description            | SlotProps |
| --------- | ---------------------- | --------- |
| `default` | Drag element's content | `-`       |
