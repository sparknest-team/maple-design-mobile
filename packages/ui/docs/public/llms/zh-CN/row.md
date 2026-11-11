<!-- Source: src/row/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/row -->

# Row

24 栏 Flex 栅格。Row 管理间距与对齐，Col 管理列宽、偏移、排序与响应式配置。需要 CSS Grid 折叠与后缀时使用 Grid。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

默认水平与垂直间距均为 16px（`gutter=[16, 16]`）。显式传入数值或响应式对象仅设置水平间距；需要双向间距时使用二元数组，`gutter=0` 可关闭间距。

## 基础示例

### 24 栏基础布局

Example source: src/row/example/demos/basic.vue

```vue
<template>
  <div class="row-demo">
    <mp-row
      ><mp-col :span="12"><div class="cell">12</div></mp-col
      ><mp-col :span="12"><div class="cell soft">12</div></mp-col></mp-row
    >
    <mp-row
      ><mp-col v-for="i in 3" :key="i" :span="8"><div class="cell">8</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
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

## 布局与排列

### 双向间距与响应式间距

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `gutter` | 间距：数值、响应式对象或 [水平, 垂直] | 双向间距与响应式间距、水平与垂直对齐、换行与普通容器模式 |
| `justify` | 水平对齐 | 水平与垂直对齐、布局与对齐 |
| `align` | 垂直对齐 | 水平与垂直对齐、布局与对齐 |
| `wrap` | 是否换行 | 换行与普通容器模式 |
| `div` | Row 与 Col 均作为普通容器，移除全部布局样式 | 换行与普通容器模式 |
<!-- demo-config-notes:end -->

Example source: src/row/example/demos/gutter.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const gap = ref(16)
const vertical = ref(true)
</script>
<template>
  <div class="row-demo">
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
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
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
  <div class="row-demo">
    <mp-radio-group v-model="justify"
      ><mp-radio v-for="value in justifies" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
    >
    <mp-radio-group v-model="align"
      ><mp-radio v-for="value in aligns" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
    >
    <mp-row :justify="justify" :align="align"
      ><mp-col v-for="i in 3" :key="i" :span="6"
        ><div class="cell" :style="{ minHeight: `${36 + i * 24}px`, height: '100%' }">{{ i }}</div></mp-col
      ></mp-row
    >
  </div>
</template>

<style scoped>
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
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
  <div class="row-demo">
    <div class="controls">
      <mp-switch v-model="wrap" aria-label="Wrap" />Wrap<mp-switch v-model="div" aria-label="Plain div" />Plain div
    </div>
    <div style="overflow: auto; padding: 8px">
      <mp-row :wrap="wrap" :div="div"
        ><mp-col v-for="i in 3" :key="i" :span="12"
          ><div class="cell">{{ i }}</div></mp-col
        ></mp-row
      >
    </div>
  </div>
</template>

<style scoped>
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
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
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="align">
        <mp-radio-group
          v-model="__demoLayout['align']"
          aria-label="align"
          :options="[
            { label: 'start', value: 'start' },
            { label: 'center', value: 'center' },
            { label: 'end', value: 'end' },
            { label: 'stretch', value: 'stretch' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="justify">
        <mp-radio-group
          v-model="__demoLayout['justify']"
          aria-label="justify"
          :options="[
            { label: 'start', value: 'start' },
            { label: 'center', value: 'center' },
            { label: 'end', value: 'end' },
            { label: 'space-around', value: 'space-around' },
            { label: 'space-between', value: 'space-between' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
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
### Row Props

| 属性 | 说明 | Type | Default |
| --- | --- | --- | --- |
| gutter | 间距：数值、响应式对象或 [水平, 垂直] | `RowGutter` | `[16, 16]` |
| justify | 水平对齐 | `start / center / end / space-around / space-between` | `start` |
| align | 垂直对齐 | `start / center / end / stretch` | `start` |
| wrap | 是否换行 | `boolean` | `true` |
| div | Row 与 Col 均作为普通容器，移除全部布局样式 | `boolean` | `false` |

### Row Events

| Event | Description |
| --- | --- |
| click | 原生 MouseEvent，每次点击一次 |

### Row Slots

| Slot | Description |
| --- | --- |
| default | 布局内容 |

### Row Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

换行示例分别切换换行与普通 `div` 模式。普通模式移除 Row 布局样式及子 Col 间距；间距示例区分水平与垂直间距。Row 使用 Flex，不依赖 CSS Grid。

## 响应式与可访问性

Row 的响应式 gutter 通过 JavaScript matchMedia 计算，SSR 使用 xs，挂载后同步视口。Col 的断点由 CSS 媒体查询实现，SSR 已输出所有配置类，不依赖挂载后测量。断点依据视口：xs 为基础，sm ≥576、md ≥768、lg ≥992、xl ≥1200、xxl ≥1600px；仅覆盖已配置字段。offset 从逻辑行内起点偏移，RTL 自动镜像。order 只改变视觉顺序，不改变 DOM、键盘或辅助技术阅读顺序。

span、offset 及断点中的对应字段接受 0–24 整数；span=0 隐藏，offset=24 偏移整行。order 接受有限整数，支持负数和大于 24 的排序值，最终按浏览器 CSS order 规则计算。gutter 接受有限非负数、六断点对象或恰好两个成员的 [水平, 垂直] 数组。开发环境诊断未知断点、无效数值及枚举；无效 span 回退 24，无效 offset/order 忽略，断点对象保留有效字段，无效 gutter 分量按 0 处理。

## 导入

Grid 仅包含 Grid.Item。Row、Col 是独立组件，请从库根入口或对应的 row/col 子入口导入；安装 Grid 不会注册 Row 或 Col。旧 Grid.Row/Grid.Col 以及 GridRowInstance/GridColInstance 不再提供。

## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
