<!-- Source: src/table/docs/en-US.md; locale: en-US; page: /en-US/table -->

# Table

## Examples

### Intro

A minimal table, when you need to display some data in the form of a table, you may use it.

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

### 任务筛选与数据联动

查询任务或部门、按状态筛选、完成任务；统计和结果同步更新，支持空结果与恢复。

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
        ><mp-input v-model="keyword" presentation="inline" placeholder="搜索任务或部门" clearable
      /></mp-form-item>
      <mp-form-item label="任务状态"
        ><mp-select v-model="status" :options="options" presentation="popup"
      /></mp-form-item>
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

## API

### Props

| Prop         | Description | Type | Default |
|--------------| -------------- | -------- | ---------- |
| `full-width` | The width of the `table` (including the scrollable part) | _string \| number_ | `100%` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `true`    |
| `scroller-height` ***3.2.0*** | The height of the scroll container, which can be used to implement functions such as longitudinal partial scrolling and fixed table headers. | _string \| number_ | `-` |

### Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Content of `table` | `-` |
| `footer` | Footer of `table` | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--table-background` | `#fff` |
| `--table-border-radius` | `2px` |
| `--table-thead-border-bottom` | `thin solid var(--color-border-2)` |
| `--table-thead-th-text-color` | `rgba(0, 0, 0, 0.6)` |
| `--table-thead-th-text-align` | `left` |
| `--table-thead-th-font-size` | `14px` |
| `--table-thead-tr-border-bottom` | `thin solid var(--color-border-2)` |
| `--table-tbody-tr-hover-background` | `#eee` |
| `--table-tbody-tr-border-bottom` | `thin solid var(--color-border-2)` |
| `--table-tbody-td-text-color` | `#555` |
| `--table-tbody-td-font-size` | `16px` |
| `--table-tbody-td-text-align` | `left`|
| `--table-row-height` | `46px` |
| `--table-row-padding` | `0 16px` |
| `--table-footer-border-top` | `thin solid var(--color-border-2)` |
