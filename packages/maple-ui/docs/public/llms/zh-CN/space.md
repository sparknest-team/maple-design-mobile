<!-- Source: src/space/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/space -->

# Space 间隔

## 案例

### 介绍

组件库提供了 `<mp-space>` 布局的组件，使您更有效率的进行 flex 布局。

### 基本使用

Example source: src/space/example/demos/base-use.vue

```vue
<script setup></script>

<template>
  <mp-space>
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>
</template>
```

### 动态布局

切换方向、列间距和换行，添加/删除子项；行间距固定8px，列间距在8px/24px间切换。方向不会交换两个gap的几何轴含义。窄容器内未换行时可横向滚动。

Example source: src/space/example/demos/interactive-layout.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const direction = ref<'row' | 'column'>('row')
const gap = ref(8)
const wrap = ref(false)
const count = ref(3)
</script>

<template>
  <div>
    <mp-space wrap :size="8">
      <mp-button @click="direction = direction === 'row' ? 'column' : 'row'">Toggle direction</mp-button>
      <mp-button @click="gap = gap === 8 ? 24 : 8">Toggle gap</mp-button>
      <mp-button @click="wrap = !wrap">Toggle wrap</mp-button>
      <mp-button :disabled="count >= 6" @click="count++">Add item</mp-button>
      <mp-button :disabled="count <= 1" @click="count--">Remove item</mp-button>
    </mp-space>
    <p aria-live="polite">{{ direction }} / gap {{ gap }} / wrap {{ wrap }} / items {{ count }}</p>
    <div style="max-width: 100%; overflow: auto">
      <mp-space
        data-demo-layout
        :direction="direction"
        :size="[8, gap]"
        :wrap="wrap"
        style="width: 260px; max-width: 100%"
      >
        <div
          v-for="item in count"
          :key="item"
          style="width: 72px; padding: 8px; box-sizing: border-box; border: 1px solid currentColor"
        >
          Item {{ item }}
        </div>
      </mp-space>
    </div>
  </div>
</template>
```

### 垂直

Example source: src/space/example/demos/vertical.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>
</template>
```

### 间隙

Example source: src/space/example/demos/space.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="[20, 20]">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
    <mp-button>Button4</mp-button>
    <mp-button>Button5</mp-button>
    <mp-button>Button6</mp-button>
  </mp-space>
</template>
```

### 靠右

Example source: src/space/example/demos/right-align.vue

```vue
<script setup></script>

<template>
  <mp-space justify="flex-end" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### 环绕

Example source: src/space/example/demos/around.vue

```vue
<script setup></script>

<template>
  <mp-space justify="space-around" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### 居中

Example source: src/space/example/demos/center.vue

```vue
<script setup></script>

<template>
  <mp-space justify="center" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### 两端对齐

Example source: src/space/example/demos/between.vue

```vue
<script setup></script>

<template>
  <mp-space justify="space-between" :size="['2.666vmin', '2.666vmin']">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### xs / sm / md / lg / xl

Example source: src/space/example/demos/demo-8.vue

```vue
<script setup></script>

<template>
  <mp-space v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size" :size="size" wrap>
    <span>{{ size }}</span
    ><span>Item 1</span><span>Item 2</span>
  </mp-space>
</template>
```

### 布局与对齐

适用于space。调整排列方向、交叉轴对齐、主轴分配，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/space/example/demos/layout-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoLayout = __demoReactive({ direction: 'row', align: 'flex-start', justify: 'flex-start' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>direction</span
        ><mp-select
          v-model="__demoLayout['direction']"
          :clearable="false"
          :options="[
            { label: 'row', value: 'row' },
            { label: 'column', value: 'column' },
          ]"
          aria-label="direction"
        />
      </div>
      <div>
        <span>align</span
        ><mp-select
          v-model="__demoLayout['align']"
          :clearable="false"
          :options="[
            { label: 'flex-start', value: 'flex-start' },
            { label: 'flex-end', value: 'flex-end' },
            { label: 'center', value: 'center' },
            { label: 'baseline', value: 'baseline' },
            { label: 'stretch', value: 'stretch' },
          ]"
          aria-label="align"
        />
      </div>
      <div>
        <span>justify</span
        ><mp-select
          v-model="__demoLayout['justify']"
          :clearable="false"
          :options="[
            { label: 'flex-start', value: 'flex-start' },
            { label: 'flex-end', value: 'flex-end' },
            { label: 'center', value: 'center' },
            { label: 'space-around', value: 'space-around' },
            { label: 'space-between', value: 'space-between' },
            { label: 'space-evenly', value: 'space-evenly' },
          ]"
          aria-label="justify"
        />
      </div>
    </mp-space>
    <mp-space wrap :size="[8, 6]" v-bind="__demoLayout">
      <mp-button v-for="item in 8" :key="item">项目 {{ item }}</mp-button>
    </mp-space>
  </mp-space>
</template>
```

## API

### 属性

| 参数          | 说明                                                                                                  | 类型                                                       | 默认值        |
|-------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------|------------|
| `direction` | 布局方向 可选值为 `row` `column`                                                                            | _string_                                                 | `row`      |
| `justify`   | 主轴排列方式 可选值为 `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly`           | _string_                                                 | `flex-start` |
| `align`     | 交叉轴排列方式 可选值为 `stretch` `center` `flex-start` `flex-end` `baseline`，未传时根据 `direction` 推断（`row` → `center`，`column` → `stretch`） | _string_                                                 | `-`        |
| `size`      | 间距，可选值为 `xs` `sm` `md` `lg` `xl` 或 `[行间距, 列间距]` (支持长度单位)                                            | _string \| number \| [string \| number, string \| number]_ | `md`       |
| `wrap`      | 是否超出换行                                                                                              | _boolean_                                                | `false`     |
| `block`     | 是否撑满父容器宽度                                                                                           | _boolean_                                                | `true`     |

### 插槽

| 插槽名       | 说明       | 参数  |
|-----------|----------|-----|
| `default` | Space 内容 | `-` |
| `split`   | 分隔符     | `-` |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-space-size-xs-row-gap` | `var(--mp-sys-space-2)` |
| `--mp-space-size-xs-column-gap` | `var(--mp-sys-space-2)` |
| `--mp-space-size-sm-row-gap` | `var(--mp-sys-space-4)` |
| `--mp-space-size-sm-column-gap` | `var(--mp-sys-space-3)` |
| `--mp-space-size-md-row-gap` | `var(--mp-sys-space-5)` |
| `--mp-space-size-md-column-gap` | `var(--mp-sys-space-4)` |
| `--mp-space-size-lg-row-gap` | `var(--mp-sys-space-6)` |
| `--mp-space-size-lg-column-gap` | `var(--mp-sys-space-5)` |
| `--mp-space-size-xl-row-gap` | `var(--mp-sys-space-8)` |
| `--mp-space-size-xl-column-gap` | `var(--mp-sys-space-6)` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、子节点展开、主样式、尺寸 token 和配对测试纳入只读一致性检查。仅安装入口与命名空间各自适配。

两端默认均为 `size="md"`、`wrap=false`、`block=true`、`direction="row"`。未传 align 时，row 为 center、column 为 stretch。Maple 原来依赖默认换行的用法请显式添加 `wrap`。

`size` 支持全部五档预设、number（px）、数字字符串（px）、CSS 长度或表达式（例如 1rem、var(--gap)）以及二元组 `[rowGap, columnGap]`。数组始终先行后列，direction 切换不会交换它们；数组项为长度，不支持预设名。预设 [行, 列]：xs=[4,4]、sm=[8,6]、md=[12,8]、lg=[16,12]、xl=[24,16] px，两端一致，仍可通过 CSS 变量覆盖。

### 显式换行

Example source: src/space/example/demos/wrap.vue

```vue
<template>
  <mp-space wrap :size="[8, 6]">
    <mp-button v-for="item in 8" :key="item">项目 {{ item }}</mp-button>
  </mp-space>
</template>
```
