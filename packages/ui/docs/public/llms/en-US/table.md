<!-- Source: src/table/docs/en-US.md; locale: en-US; page: /en-US/table -->

# Table

### Intro

A minimal table, when you need to display some data in the form of a table, you may use it.

The scrollable region name follows the active language and can be overridden locally with the `table.scrollable` LocaleProvider message.

## Basic examples

### Basic Usage

Example source: src/table/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>数学</th>
        <th>英语</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>耗子君</td>
        <td>124</td>
        <td>38</td>
      </tr>
      <tr>
        <td>火猫桑</td>
        <td>100</td>
        <td>135</td>
      </tr>
    </tbody>
  </mp-table>
</template>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
  align-items: center;
  height: 48px;
}
</style>
```

## Scrolling and sticky positioning

### Fixed Table Headers

Scroll the Table's own body container to keep the header at its local top; footer pagination stays outside that scrolling body. Maple Table is a lightweight slot container, not Cedar Table's sorting, row-selection or remote-data API. Local pagination does not imply those features are implemented.

Example source: src/table/example/demos/fixed-header.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const current = ref(1)
const pageSize = ref(10)
const list2 = computed(() => gen(current.value, pageSize.value))
function gen(current, size) {
  return Array.from({ length: size }).map((_, index) => {
    const id = (current - 1) * size + index + 1

    return {
      name: `Name ${id}`,
      math: id,
      english: id,
    }
  })
}
</script>

<template>
  <mp-table scroller-height="400px">
    <thead style="position: sticky; top: 0">
      <tr>
        <th>姓名</th>
        <th>数学</th>
        <th>英语</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="l in list2" :key="l.name">
        <td>{{ l.name }}</td>
        <td>{{ l.math }}</td>
        <td>{{ l.english }}</td>
      </tr>
    </tbody>

    <template #footer>
      <div class="footer">
        <mp-pagination
          v-model="current"
          v-model:page-size="pageSize"
          :total="100"
          :page-size-options="[5, 10]"
          show-page-size
        />
      </div>
    </template>
  </mp-table>
</template>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
  align-items: center;
  height: 48px;
}
</style>
```

## Content and slots

### Footer Slots

The local synthetic-data examples bind current and pageSize separately with v-model:current and v-model:page-size. The change event supplies only the page number, not the old pair of page and size; do not hardcode current to 1. Page-size updates follow Pagination's item-position rule, and the two Table instances keep independent models.

You can insert something in the tail slot, the most common is to insert a `Pagination`.

Example source: src/table/example/demos/slot.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const current = ref(1)
const pageSize = ref(10)
const list = computed(() => gen(current.value, pageSize.value))
function gen(current, size) {
  return Array.from({ length: size }).map((_, index) => {
    const id = (current - 1) * size + index + 1

    return {
      name: `Name ${id}`,
      math: id,
      english: id,
    }
  })
}
</script>

<template>
  <mp-table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>数学</th>
        <th>英语</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="l in list" :key="l.name">
        <td>{{ l.name }}</td>
        <td>{{ l.math }}</td>
        <td>{{ l.english }}</td>
      </tr>
    </tbody>

    <template #footer>
      <div class="footer">
        <mp-pagination
          v-model="current"
          v-model:page-size="pageSize"
          :total="100"
          :page-size-options="[5, 10]"
          show-page-size
        />
      </div>
    </template>
  </mp-table>
</template>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
  align-items: center;
  height: 48px;
}
</style>
```

## Business workflows

### Task filtering and linked data

Search tasks/departments, filter by status and complete tasks. Statistics/results update together, including empty results and recovery.

Example source: src/table/example/demos/task-workbench.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const original = () => [
  { key: '01', name: '展厅设备巡检', department: '运营部', status: '待处理' },
  { key: '02', name: '网站交互验收', department: '研发部', status: '进行中' },
  { key: '03', name: '品牌物料审核', department: '设计部', status: '待处理' },
  { key: '04', name: '移动端体验走查', department: '研发部', status: '已完成' },
  { key: '05', name: '会议室设备维护', department: '运营部', status: '进行中' },
]
const rows = ref(original())
const keyword = ref('')
const status = ref('全部')
const applied = ref({ keyword: '', status: '全部' })
const message = ref('显示全部任务。输入条件后点击查询。')
const options = ['全部', '待处理', '进行中', '已完成'].map((value) => ({ value, label: value }))
const filtered = computed(() =>
  rows.value.filter(
    (row) =>
      (!applied.value.keyword || `${row.name} ${row.department}`.includes(applied.value.keyword)) &&
      (applied.value.status === '全部' || row.status === applied.value.status),
  ),
)
const completed = computed(() => rows.value.filter((row) => row.status === '已完成').length)
const columns = [
  { title: '任务', dataIndex: 'name' },
  { title: '部门', dataIndex: 'department' },
  { title: '状态', dataIndex: 'status' },
  { title: '操作', slotName: 'action' },
]
function search() {
  applied.value = { keyword: keyword.value.trim(), status: status.value }
  message.value = `查询完成，找到 ${filtered.value.length} 条任务。`
}
function clear() {
  keyword.value = ''
  status.value = '全部'
  applied.value = { keyword: '', status: '全部' }
  message.value = '已清空筛选条件。'
}
function finish(row) {
  row.status = '已完成'
  message.value = `已完成“${row.name}”，统计与列表已同步。`
}
function reset() {
  rows.value = original()
  clear()
  message.value = '任务和筛选已恢复，可以重新演示。'
}
</script>
<template>
  <section class="task-workbench" aria-label="巡检任务数据联动">
    <div class="task-workbench__metrics">
      <span
        >全部 <strong>{{ rows.length }}</strong></span
      ><span
        >已完成 <strong>{{ completed }}</strong></span
      ><span
        >当前结果 <strong>{{ filtered.length }}</strong></span
      >
    </div>
    <mp-form :model="applied" layout="vertical" @submit="search">
      <mp-form-item label="搜索任务或部门"
        ><mp-input v-model="keyword" edit-mode="direct" placeholder="搜索任务或部门" clearable
      /></mp-form-item>
      <mp-form-item label="任务状态"><mp-select v-model="status" :options="options" edit-mode="popup" /></mp-form-item>
      <mp-space wrap
        ><mp-button html-type="submit" status="primary">查询任务</mp-button
        ><mp-button @click="clear">清空筛选</mp-button><mp-button @click="reset">恢复全部任务</mp-button></mp-space
      >
    </mp-form>
    <p role="status" aria-live="polite">{{ message }}</p>
    <mp-table
      ><thead>
        <tr>
          <th>任务</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in filtered" :key="row.key">
          <td>
            {{ row.name }}<small>{{ row.department }}</small>
          </td>
          <td>{{ row.status }}</td>
          <td>
            <mp-button :disabled="row.status === '已完成'" :aria-label="`完成${row.name}`" @click="finish(row)"
              >完成</mp-button
            >
          </td>
        </tr>
      </tbody></mp-table
    >
    <p v-if="!filtered.length">没有匹配任务。修改关键词或点击“清空筛选”恢复结果。</p>
    <small>先查询“运营部”，完成一条任务，再用状态过滤；统计与结果来自同一份本地任务数据。</small>
  </section>
</template>
<style scoped>
.task-workbench {
  min-width: 0;
  width: 100%;
}
.task-workbench__metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
.task-workbench__metrics > span {
  padding: 12px 16px;
  background: var(--mp-color-fill-1);
  border-radius: 8px;
}
.task-workbench__metrics strong {
  margin-left: 8px;
  color: var(--mp-sys-color-content-brand);
}
.task-workbench small {
  display: block;
  margin-top: 8px;
  color: var(--mp-color-text-2);
}
</style>
```

## Loading and waiting

### Controlled loading

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Explicit business loading state | `boolean / Partial<LoadingProps>` | `false` |


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

Example source: src/table/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
<template>
  <mp-space direction="column" style="width: 100%" :size="16">
    <mp-form layout="vertical"
      ><mp-form-item label="加载状态 / Loading"><mp-switch v-model="loading" /></mp-form-item
    ></mp-form>
    <mp-table :loading="loading"
      ><thead>
        <tr>
          <th>名称 / Name</th>
          <th>状态 / Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alice</td>
          <td>Ready</td>
        </tr>
      </tbody></mp-table
    >
    <p>通过 loading 显式控制等待展示，普通事件返回 Promise 不会自动加载。Loading is controlled by business state.</p>
  </mp-space>
</template>
```

## Usage notes

### Table data and slots

Use table slots to compose headers, rows and cells. Table has no `data`, `columns`, sorting or filtering configuration.

## API

### Table Props

| Prop | Description | Type | Default |
| -------------- | -------------- | -------- | ---------- |
| `loading` | Explicit loading state; an object requires `loading: true` | _boolean \| `Partial<LoadingProps>`_ | `false` |
| `full-width` | The width of the `table` (including the scrollable part) | _string \| number_ | `100%` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_ | `true` |
| `scroller-height` ***3.2.0*** | The height of the scroll container, which can be used to implement functions such as longitudinal partial scrolling and fixed table headers. | _string \| number_ | `-` |

### Table Slots

| Name | Description | Prop |
| ----- | -------------- | -------- |
| `default` | Content of `table` | `-` |
| `footer` | Footer of `table` | `-` |

## Reading direction and scrolling

Table inherits native reading direction, with headers/cells defaulting to inline-start alignment. Custom alignment tokens may still specify physical left/right. The native scroll viewport is focusable: Left/Right scrolls visually, and Home/End reaches reading boundaries. Direction changes preserve the distance from inline start, clamped to the new range. Maple Table is a native slotted table and does not add Cedar data-column freezing, column resizing or grouped-header APIs.

Object syntax must explicitly include `{ loading: true, size: 24 }`. A configuration object without loading does not enable it, matching Cedar Table.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-table-background` | `#fff` | `background` |
| `--mp-table-border-radius` | `2px` | `border-radius` |
| `--mp-table-footer-border-top` | `thin solid var(--mp-color-border-2)` | `border-top` |
| `--mp-table-row-height` | `46px` | `height`, `min-height` |
| `--mp-table-row-padding` | `0 16px` | `padding` |
| `--mp-table-tbody-td-font-size` | `16px` | `font-size` |
| `--mp-table-tbody-td-text-align` | `start` | `text-align` |
| `--mp-table-tbody-td-text-color` | `#555` | `color` |
| `--mp-table-tbody-tr-border-bottom` | `thin solid var(--mp-color-border-2)` | `border-bottom` |
| `--mp-table-tbody-tr-hover-background` | `#eee` | `background` |
| `--mp-table-thead-border-bottom` | `thin solid var(--mp-color-border-2)` | `border-bottom` |
| `--mp-table-thead-th-font-size` | `14px` | `font-size` |
| `--mp-table-thead-th-text-align` | `start` | `text-align` |
| `--mp-table-thead-th-text-color` | `rgba(0, 0, 0, 0.6)` | `color` |
| `--mp-table-thead-tr-border-bottom` | `thin solid var(--mp-color-border-2)` | `border-bottom` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-table-background: #fff;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
