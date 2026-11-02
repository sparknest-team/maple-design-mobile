<!-- Source: src/row/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/row -->

# Row

24 栏 Flex 栅格。Row 管理间距与对齐，Col 管理列宽、偏移、排序与响应式配置。需要 CSS Grid 折叠与后缀时使用 Grid。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

## 案例

### 24 栏基础布局

Example source: src/row/example/demos/basic.vue

```vue
<template>
  <div>
    <mp-row :gutter="12"
      ><mp-col :span="12"><div class="cell">12</div></mp-col
      ><mp-col :span="12"><div class="cell soft">12</div></mp-col></mp-row
    >
    <mp-row :gutter="12"
      ><mp-col v-for="i in 3" :key="i" :span="8"><div class="cell">8</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

### 双向间距与响应式间距

Example source: src/row/example/demos/gutter.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const gap = ref(16)
const vertical = ref(true)
</script>
<template>
  <div>
    <div class="controls">
      <mp-radio-group v-model="gap"
        ><mp-radio v-for="value in [0, 8, 16, 24]" :key="value" :value="value">{{ value }}px</mp-radio></mp-radio-group
      ><mp-switch v-model="vertical" aria-label="Vertical gutter" />Vertical gap
    </div>
    <mp-row :gutter="[gap, vertical ? gap : 0]"
      ><mp-col v-for="i in 6" :key="i" :span="8"
        ><div class="cell">{{ i }}</div></mp-col
      ></mp-row
    >
    <mp-row
      :gutter="[
        { xs: 8, md: 24 },
        { xs: 8, md: 16 },
      ]"
      ><mp-col v-for="i in 4" :key="i" :span="12"><div class="cell soft">Responsive gap</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

### 水平与垂直对齐

Example source: src/row/example/demos/alignment.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const justifies = ['start', 'center', 'end', 'space-around', 'space-between'] as const
const aligns = ['start', 'center', 'end', 'stretch'] as const
const justify = ref<(typeof justifies)[number]>('space-between')
const align = ref<(typeof aligns)[number]>('center')
</script>
<template>
  <div>
    <mp-radio-group v-model="justify"
      ><mp-radio v-for="value in justifies" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
    >
    <mp-radio-group v-model="align"
      ><mp-radio v-for="value in aligns" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
    >
    <mp-row :gutter="12" :justify="justify" :align="align"
      ><mp-col v-for="i in 3" :key="i" :span="6"
        ><div class="cell" :style="{ minHeight: `${36 + i * 24}px`, height: '100%' }">{{ i }}</div></mp-col
      ></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

### 换行与普通容器模式

Example source: src/row/example/demos/wrap.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const wrap = ref(true)
const div = ref(false)
</script>
<template>
  <div>
    <div class="controls">
      <mp-switch v-model="wrap" aria-label="Wrap" />Wrap<mp-switch v-model="div" aria-label="Plain div" />Plain div
    </div>
    <div style="overflow: auto; padding: 8px">
      <mp-row :gutter="12" :wrap="wrap" :div="div"
        ><mp-col v-for="i in 3" :key="i" :span="12"
          ><div class="cell">{{ i }}</div></mp-col
        ></mp-row
      >
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

### 嵌套与间距隔离


Example source: src/row/example/demos/nested.vue

```vue
<template>
  <div>
    <mp-row :gutter="24"
      ><mp-col :span="16"
        ><mp-row :gutter="8"
          ><mp-col :span="12"><div class="cell">Inner 12</div></mp-col
          ><mp-col :span="12"><div class="cell soft">Inner 12</div></mp-col></mp-row
        ></mp-col
      ><mp-col :span="8"><div class="cell">Outer 8</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

### 布局与对齐

适用于row。调整交叉轴对齐、主轴分配，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/row/example/demos/layout-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoLayout = __demoReactive({ align: 'start', justify: 'start' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>align</span
        ><mp-select
          v-model="__demoLayout['align']"
          :clearable="false"
          :options="[
            { label: 'start', value: 'start' },
            { label: 'center', value: 'center' },
            { label: 'end', value: 'end' },
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
            { label: 'start', value: 'start' },
            { label: 'center', value: 'center' },
            { label: 'end', value: 'end' },
            { label: 'space-around', value: 'space-around' },
            { label: 'space-between', value: 'space-between' },
          ]"
          aria-label="justify"
        />
      </div>
    </mp-space>
    <mp-row :gutter="12" v-bind="__demoLayout"
      ><mp-col v-for="i in 3" :key="i" :span="8"><div class="cell">8</div></mp-col></mp-row
    >
  </mp-space>
</template>
<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | Type | Default |
| --- | --- | --- | --- |
| gutter | 间距：数值、响应式对象或 [水平, 垂直] | `RowGutter` | `0` |
| justify | 水平对齐 | `start / center / end / space-around / space-between` | `start` |
| align | 垂直对齐 | `start / center / end / stretch` | `start` |
| wrap | 是否换行 | `boolean` | `true` |
| div | Row 与 Col 均作为普通容器，移除全部布局样式 | `boolean` | `false` |

### Events

| Event | Description |
| --- | --- |
| click | 原生 MouseEvent，每次点击一次 |

### Slots

| Slot | Description |
| --- | --- |
| default | 布局内容 |

### Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

换行示例分别切换换行与普通 `div` 模式。普通模式移除 Row 布局样式及子 Col 间距；间距示例区分水平与垂直间距。Row 使用 Flex，不依赖 CSS Grid。

## 响应式与可访问性

断点基于浏览器视口：xs 为基础值，sm ≥576、md ≥768、lg ≥992、xl ≥1200、xxl ≥1600px；从最大匹配断点向下取已配置值。SSR 首屏使用 xs，挂载后响应视口；Grid 折叠和动态排序在挂载后计算。组件为布局容器，不增加键盘快捷键；内容语义及可聚焦元素由调用者提供。没有公开方法和专用主题 Token。

## 导入

Grid 仅包含 Grid.Item；Row、Col 是独立组件，拥有独立源码、样式、菜单、文档和 Demo。已移除 Grid.Row/Grid.Col、Grid 入口的 Row/Col 转导出以及 GridRowInstance/GridColInstance。请从库根入口或独立 row/col 入口导入；安装 Grid 不再自动注册 Row/Col。
