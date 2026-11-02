<!-- Source: src/progress-group/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/progress-group -->

# ProgressGroup 分段进度条

## 案例

### 介绍

将多个数值展示为同一条进度轨中的分段，并提供对应图例。

### 基础用法

Example source: src/progress-group/example/demos/basic.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <mp-progress-group :items="items" :max="128" show-text />
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 进度轨尺寸

Example source: src/progress-group/example/demos/size.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]
</script>

<template>
  <mp-space direction="column" size="md">
    <div v-for="size in sizes" :key="size" class="progress-group-example__size-row">
      <span>{{ size }}</span>
      <mp-progress-group :items="trackOnlyItems" :size="size" />
    </div>
  </mp-space>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 排列方向

Example source: src/progress-group/example/demos/orientation.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <div class="progress-group-example__orientations">
    <mp-progress-group :items="items" show-text />
    <mp-progress-group
      :items="items"
      orientation="vertical"
      size="lg"
      show-text
      class="progress-group-example__vertical"
    />
  </div>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 环形分段进度

Example source: src/progress-group/example/demos/circle.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <div class="progress-group-example__circles">
    <mp-progress-group mode="circle" :items="items" show-text />
    <mp-progress-group mode="circle" :items="items" circle-size="min(42vw, 240px)" :stroke-width="12" show-text>
      <template #text="{ value, max }">
        <div class="progress-group-example__circle-status">
          <strong>{{ value }}</strong
          ><small>/ {{ max }} GB</small>
        </div>
      </template>
    </mp-progress-group>
  </div>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 默认颜色与纯进度轨

Example source: src/progress-group/example/demos/color.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-progress-group
      :items="[
        { label: 'Docs', value: 20 },
        { label: 'Tests', value: 35 },
      ]"
      color="#ff7d00"
      show-text
    />
    <mp-progress-group :items="trackOnlyItems" size="lg" />
  </mp-space>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 自定义内容

Example source: src/progress-group/example/demos/custom.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <mp-progress-group :items="items" :max="128" show-text>
    <template #text="{ value, max }">已使用 {{ value }} / {{ max }} GB</template>
    <template #item-trailing="{ item }">{{ item.value }} GB</template>
    <template #tooltip="{ item, percent }"
      >{{ item.label }} · {{ item.value }} GB · {{ Math.round(percent) }}%</template
    >
  </mp-progress-group>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 超额数据与键盘提示

示例按钮由父级更新 `max`、`items` 和 `tooltip`，同步驱动线形与环形；它们不是组件内置的编辑事件。可切换容量 100/200、清空/恢复数据、关闭/开启提示。关闭提示后分段不再进入 Tab 顺序，清空后不保留提示。鼠标悬浮优先于键盘焦点，离开悬浮段后回到焦点段提示。

Example source: src/progress-group/example/demos/overflow-keyboard.vue

```vue
<script setup>
import { ref } from 'vue'

const initialItems = [
  { label: 'A', value: 70 },
  { label: 'B', value: 50, color: '#722ed1' },
  { label: 'C', value: 10, color: '#0fc6c2' },
]
const items = ref(initialItems)
const max = ref(100)
const tooltip = ref(true)
</script>
<template>
  <div data-demo-capacity style="display: grid; gap: 24px">
    <mp-space wrap>
      <mp-button @click="max = max === 100 ? 200 : 100">Capacity: {{ max }}</mp-button>
      <mp-button @click="items = items.length ? [] : initialItems">{{
        items.length ? 'Clear data' : 'Restore data'
      }}</mp-button>
      <mp-button @click="tooltip = !tooltip">Tooltips: {{ tooltip ? 'on' : 'off' }}</mp-button>
    </mp-space>
    <mp-progress-group :items="items" :max="max" :tooltip="tooltip" show-text aria-label="Capacity line" />
    <mp-progress-group
      mode="circle"
      :items="items"
      :max="max"
      :tooltip="tooltip"
      show-text
      aria-label="Capacity circle"
    />
    <p aria-live="polite">Items: {{ items.length }}; capacity: {{ max }}; tooltips: {{ tooltip ? 'on' : 'off' }}</p>
  </div>
</template>
```

线形与环形按数据顺序累计裁剪到 max；图例和提示仍保留每项原始占比。例如 70+50 时第二段实际显示 30%，图例仍为 50%。非有限值和负数归零，非法 max 回退 100。Tab 聚焦可见分段展示提示，Escape 关闭；鼠标离开不会关闭仍处于焦点的提示。用 aria-label 为整个分组命名。

size 五档均实现，仅影响线形厚度（2/4/8/12/16px）；环形用 circle-size（支持 number/CSS长度）和 stroke-width。累计文本开关为 show-text，自定义插槽为 text，已删除旧布尔 status / status 插槽。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| aria-label | 分组的无障碍名称 | `string` | — |
| items | 分段数据 | `ProgressGroupItem[]` | `[]` |
| mode | 展示模式 | `line \| circle` | `line` |
| max | 计算占比时的总值 | `number` | `100` |
| show-text | 是否展示累计百分比 | `boolean` | `false` |
| size | 进度轨尺寸 | `xs \| sm \| md \| lg \| xl` | `md` |
| color | 默认分段颜色 | `string` | `content-brand` |
| circle-size | 环形模式的直径 | `number \| string` | `120` |
| stroke-width | 环形模式的轨道宽度 | `number` | `8` |
| tooltip | 是否显示分段悬浮/聚焦提示 | `boolean` | `true` |
| orientation | 排列方向 | `horizontal \| vertical` | `horizontal` |

### Slots

| 名称 | 插槽参数 |
| --- | --- |
| text | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |

### 样式变量

| 变量 | 默认值 |
| --- | --- |
| `--mp-progress-group-gap` | `var(--mp-sys-space-3)` |
| `--mp-progress-group-item-gap` | `var(--mp-sys-space-2)` |
| `--mp-progress-group-dot-size` | `var(--mp-sys-space-4)` |
| `--mp-progress-group-radius` | `9999px` |
| `--mp-progress-group-track-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-progress-group-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-progress-group-muted-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-group-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-progress-group-tooltip-bg` | `var(--mp-sys-color-surface-tooltip)` |
| `--mp-progress-group-tooltip-color` | `var(--mp-sys-color-content-on-dark)` |

图形标记默认使用 system content-brand。颜色优先级：item.color → 组件 color → 默认值。自定义颜色需自行验证对比度；几何 Token 保留平台差异。

### Geometry and motion variables

Built-in effects respect `prefers-reduced-motion: reduce`. Track thickness applies to both horizontal and vertical layouts; circle geometry remains prop-driven.

| Token | Default |
| --- | --- |
| `--mp-progress-group-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-progress-group-tooltip-duration` | `var(--mp-sys-motion-duration-fast)` |
| `--mp-progress-group-tooltip-max-width` | `240px` |
| `--mp-progress-group-tooltip-padding` | `5px var(--mp-sys-space-4)` |
| `--mp-progress-group-tooltip-radius` | `var(--mp-sys-radius-md)` |
| `--mp-progress-group-tooltip-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-progress-group-tooltip-line-height` | `1.4` |
| `--mp-progress-group-tooltip-offset` | `var(--mp-sys-space-4)` |
| `--mp-progress-group-text-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-progress-group-size-xs-thickness` | `2px` |
| `--mp-progress-group-size-sm-thickness` | `4px` |
| `--mp-progress-group-size-md-thickness` | `8px` |
| `--mp-progress-group-size-lg-thickness` | `12px` |
| `--mp-progress-group-size-xl-thickness` | `16px` |
