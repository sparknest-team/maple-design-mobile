<!-- Source: src/grid/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/grid -->

# Grid

CSS Grid 布局：列数、跨列、间距、折叠与后缀。24 栏 Flex 布局使用 Row / Col。

> **布局怎么选**
>
> - Grid + GridItem：适合表单分栏、卡片网格，需要统一列宽、跨列、响应式列数或折叠行与后缀时使用。
> - Row + Col：适合 24 栏 Flex 布局，需要水平/垂直对齐、控制换行、固定宽度与自适应宽度组合，或响应式排序时使用。Row 控制整行，Col 控制列宽、偏移和排序。
> - Space：适合按钮、标签、文字等简单排列，只需要间距、方向和对齐时使用；更自由的宽度分配可使用原生 Flex。

## 案例

### 列数、跨列与偏移

Example source: src/grid/example/demos/basic.vue

```vue
<template>
  <div>
    <mp-grid :cols="4" :col-gap="12" :row-gap="12"
      ><mp-grid-item v-for="i in 8" :key="i" class="cell">{{ i }}</mp-grid-item></mp-grid
    >
    <mp-grid :cols="4" :col-gap="12" :row-gap="12"
      ><mp-grid-item :span="2" class="cell">span 2</mp-grid-item
      ><mp-grid-item :offset="1" class="cell soft">offset 1</mp-grid-item
      ><mp-grid-item :span="4" class="cell">span 4</mp-grid-item></mp-grid
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

### 折叠行数与后缀插槽

示例由父级保存 `collapsed` 和行数；More/Less 与开关修改同一状态。4列折叠1行时展示3项及后缀，2行时展示7项及后缀；展开后展示全部9项及后缀。后缀占一个网格位置，不是浮在内容之上的额外按钮。

Example source: src/grid/example/demos/collapse.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(true)
const rows = ref(1)
</script>
<template>
  <div>
    <div class="controls">
      <mp-switch v-model="collapsed" aria-label="Collapsed" />Collapsed<mp-radio-group v-model="rows"
        ><mp-radio :value="1">1 row</mp-radio><mp-radio :value="2">2 rows</mp-radio></mp-radio-group
      >
    </div>
    <mp-grid :cols="4" :col-gap="12" :row-gap="12" :collapsed="collapsed" :collapsed-rows="rows">
      <mp-grid-item v-for="i in 9" :key="i" class="cell">{{ i }}</mp-grid-item>
      <mp-grid-item v-slot="{ overflow }" suffix
        ><mp-button block variant="outline" @click="collapsed = !collapsed">{{
          overflow ? 'More' : 'Less'
        }}</mp-button></mp-grid-item
      >
    </mp-grid>
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

### 响应式列数、间距与跨列

Example source: src/grid/example/demos/responsive.vue

```vue
<template>
  <div>
    <p>xs: 1 column · sm: 2 columns · md: 4 columns</p>
    <mp-grid :cols="{ xs: 1, sm: 2, md: 4 }" :col-gap="{ xs: 8, md: 16 }" :row-gap="{ xs: 8, md: 16 }">
      <mp-grid-item :span="{ xs: 1, md: 2 }" class="cell">Responsive span</mp-grid-item
      ><mp-grid-item v-for="i in 6" :key="i" class="cell soft">{{ i }}</mp-grid-item>
    </mp-grid>
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

### 动态插入、删除与排序

按钮只修改本例的数据数组；删除至空时禁用 Remove first，后缀显示 End。重新插入后恢复布局与删除能力。Grid 本身不提供新增/删除业务事件。


Example source: src/grid/example/demos/dynamic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const items = ref([1, 2, 3, 4, 5])
const next = ref(6)
</script>
<template>
  <div>
    <div class="controls">
      <mp-button @click="items.unshift(next++)">Insert first</mp-button
      ><mp-button :disabled="!items.length" @click="items.shift()">Remove first</mp-button
      ><mp-button @click="items.reverse()">Reverse</mp-button>
    </div>
    <mp-grid :cols="3" :col-gap="12" :row-gap="12" collapsed
      ><mp-grid-item v-for="i in items" :key="i" class="cell">{{ i }}</mp-grid-item
      ><mp-grid-item v-slot="{ overflow }" suffix class="cell soft">{{ overflow ? '…' : 'End' }}</mp-grid-item></mp-grid
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

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | Type | Default |
| --- | --- | --- | --- |
| cols | 每行列数，最少为 1 | `number / ResponsiveValue` | `24` |
| row-gap | 行间距（px） | `number / ResponsiveValue` | `0` |
| col-gap | 列间距（px） | `number / ResponsiveValue` | `0` |
| collapsed | 折叠超出的行 | `boolean` | `false` |
| collapsed-rows | 折叠时保留行数，最少为 1 | `number` | `1` |

### Events

| Event | Description |
| --- | --- |

### Slots

| Slot | Description |
| --- | --- |
| default | 布局内容 |

### Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

## 响应式与可访问性

断点基于浏览器视口：xs 为基础值，sm ≥576、md ≥768、lg ≥992、xl ≥1200、xxl ≥1600px；从最大匹配断点向下取已配置值。SSR 首屏使用 xs，挂载后响应视口；Grid 折叠和动态排序在挂载后计算。组件为布局容器，不增加键盘快捷键；内容语义及可聚焦元素由调用者提供。没有公开方法和专用主题 Token。

## GridItem

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | 跨越格数 | number / ResponsiveValue | 1 |
| offset | 左侧留空格数 | number / ResponsiveValue | 0 |
| suffix | 行末后缀 | boolean | false |

默认插槽参数 `{ overflow: boolean }` 表示折叠是否隐藏了内容；没有自定义事件或公开方法。

## 导入

Grid 仅包含 Grid.Item；Row、Col 是独立组件，拥有独立源码、样式、菜单、文档和 Demo。已移除 Grid.Row/Grid.Col、Grid 入口的 Row/Col 转导出以及 GridRowInstance/GridColInstance。请从库根入口或独立 row/col 入口导入；安装 Grid 不再自动注册 Row/Col。
