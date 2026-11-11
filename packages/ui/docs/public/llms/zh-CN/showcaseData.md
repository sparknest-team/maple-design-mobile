<!-- Source: docs/showcaseData.zh-CN.md; locale: zh-CN; page: /zh-CN/showcaseData -->

# 数据与文件

先体验移动表格，再查看目录选择和剪贴板文件读取。每个示例相互独立，只读取本地文件。

## 同一份数据驱动查询、列表与统计

查询“运营部”，完成“展厅设备巡检”，再用“待处理”过滤。核对列表和已完成数量；输入不存在的关键词体验空结果，再清空筛选恢复。状态条件使用 Popup。

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

## 移动表格的基础结构

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

Example source: src/upload/example/demos/directory.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem } from '@maple-design/ui-vue'

const files = ref<UploadFileItem[]>([])
</script>
<template>
  <mp-space direction="column">
    <p>
      选择目录后查看文件列表；本例只读取本地文件，不发送请求。目录选择取决于浏览器与系统文件选择器，移动设备可使用普通多选入口。
    </p>
    <p>目录选择</p>
    <mp-upload v-model="files" directory multiple />
    <p>普通文件多选</p>
    <mp-upload multiple />
  </mp-space>
</template>
```

Example source: src/upload/example/demos/clipboard.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useUploader, type UploadFileItem } from '@maple-design/ui-vue'

const files = ref<UploadFileItem[]>([])
const message = ref('')
const rejectionMessages: Record<string, string> = {
  'max-files': '最多接收 3 张图片',
  'max-file-size': '单张图片不能超过 1 MiB',
  accept: '仅支持图片文件',
}
const uploader = useUploader({
  modelValue: () => files.value,
  onUpdateModelValue: (value) => {
    files.value = value
  },
  accept: () => 'image/*',
  maxFiles: () => 3,
  maxFileSize: () => 1024 * 1024,
  autoUpload: () => false,
  onRejected: (rejected) => {
    message.value = rejected.map((item) => rejectionMessages[item.reason] ?? '文件未能读取，请重新选择').join(', ')
  },
})
function paste(event: ClipboardEvent) {
  const incoming = Array.from(event.clipboardData?.files ?? [])
  if (!incoming.length) {
    return
  }
  event.preventDefault()
  message.value = ''
  uploader.addFiles(incoming)
}
function addExample() {
  message.value = ''
  uploader.addFiles([
    new File(['<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"/>'], 'local-example.svg', {
      type: 'image/svg+xml',
    }),
  ])
}
function reset() {
  uploader.reset()
  message.value = ''
}
</script>
<template>
  <mp-space direction="column">
    <p>将剪贴板图片粘贴到输入区。最多 3 张，每张不超过 1 MiB；只读取文件，不上传。普通文本粘贴仍按原生输入处理。</p>
    <mp-textarea placeholder="在这里粘贴图片或文本" @paste="paste" />
    <mp-space wrap>
      <mp-button @click="addExample">加入本地示例图片</mp-button>
      <mp-button @click="reset">清空列表</mp-button>
    </mp-space>
    <p role="status">已接收 {{ files.length }} 个文件。{{ message }}</p>
    <ul>
      <li v-for="file in files" :key="file.uid">{{ file.name }}</li>
    </ul>
  </mp-space>
</template>
```
