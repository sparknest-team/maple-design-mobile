<!-- Source: src/drag/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/drag -->

# 拖拽

## 案例

### 介绍

使元素可以自由拖拽。

### 基本使用

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

### 禁用

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

### 拖拽方向

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

### 吸附方向

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

### 拖拽区域

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

### 重置位置

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

### 属性

| 参数              | 说明                            | 类型                                                                                                       | 默认值                                     |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `direction`       | 拖拽方向，可选值 `x`, `y`, `xy` | _string_                                                                                                   | `xy`                                       |
| `attraction`      | 吸附方向，可选值 `x`, `y`, `xy` | _string_                                                                                                   | `-`                                        |
| `disabled`        | 是否禁用                        | _boolean_                                                                                                  | `false`                                    |
| `boundary`        | 拖拽范围                        | _{ top?: number \| string, bottom?: number \| string, left?: number \| string, right?: number \| string }_ | `{ top: 0, bottom: 0, left: 0, right: 0 }` |
| `z-index`         | 拖拽元素的层级                  | _string \| number_                                                                                         | `90`                                       |
| `popup-container` | 拖拽元素挂载的位置              | _TeleportProps['to'] \| false_                                                                             | `body`                                     |

当 `popup-container` 为 `false` 时，拖拽元素不再传送到 `body`，而是相对最近的定位父元素进行绝对定位和边界计算。父元素应设置 `position: relative`，适合卡片、面板等局部拖拽场景。

### 事件

| 事件名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| `click` | 点击组件时触发 | `event: Event` |

### 方法

| 方法名   | 说明                                     | 参数 | 返回值 |
| -------- | ---------------------------------------- | ---- | ------ |
| `resize` | 产生位置大小变化时可以调用此方法进行重绘 | `-`  | `-`    |
| `reset`  | 重置初始化时的位置信息                   | `-`  | `-`    |

### 插槽

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `default` | 拖拽元素的内容 | `-`  |
