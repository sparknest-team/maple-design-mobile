<!-- Source: docs/practiceDetail.zh-CN.md; locale: zh-CN; page: /zh-CN/practiceDetail -->

# 业务详情页

动态项目资料、任务清单、交付进度、跟进、操作记录与归档。

## 完整业务体验

从列表或卡片进入一个具体项目；编辑资料后取消，确认原值未变；保存编辑、完成任务并添加跟进，再到工作台查看操作动态。

Example source: docs/practices-examples/detail/basic.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { projectError, usePracticeData } from '../shared/usePracticeData.js'
import { usePracticeNavigation } from '../shared/usePracticeNavigation.js'

const data = usePracticeData()
const {
  workspace,
  rows,
  projects,
  favorites,
  activity,
  savedDraft,
  latest,
  query,
  applied,
  current,
  selected,
  notice,
  statusOptions,
  categories,
  categoryOptions,
  priorities,
  filtered,
  pageRows,
  done,
  budget,
  overdue,
  active,
  detailOpen,
  createOpen,
  archiveOpen,
  editingKey,
  draft,
  fresh,
  search,
  clear,
  show,
  finish,
  finishSelected,
  startCreate,
  startEdit,
  create,
  requestArchive,
  confirmArchive,
  restore,
  favorite,
  reset,
  exportCsv,
} = data
const { route, go, href } = usePracticeNavigation()
const required = [(value) => !!value?.trim() || '此项不能为空']
const money = (value) => Number(value).toLocaleString('zh-CN', { maximumFractionDigits: 2 })
const project = computed(() => rows.value.find((row) => row.key === (route.query.project || projects.value[0]?.key)))
const noteText = ref('')
const projectEvents = computed(() => activity.value.filter((event) => event.project === project.value?.key))
const info = computed(() =>
  project.value
    ? [
        { label: '项目编号', value: project.value.key },
        { label: '负责人', value: project.value.owner },
        { label: '业务类型', value: project.value.category },
        { label: '优先级', value: project.value.priority },
        { label: '开始日期', value: project.value.startDate },
        { label: '截止日期', value: project.value.dueDate },
        { label: '预算', value: money(project.value.budget) + ' 元' },
        { label: '当前状态', value: project.value.archived ? '已归档' : project.value.status },
      ]
    : [],
)
function addNote() {
  if (workspace.note(project.value, noteText.value)) {
    noteText.value = ''
    notice.value = '跟进已添加到项目记录和工作台动态。'
  }
}
const timeLabel = (value) => new Date(value).toLocaleString('zh-CN')
</script>
<template>
  <mp-space class="practice-page" direction="column" block size="lg"
    ><mp-result v-if="!project" status="404" title="项目不存在" subtitle="该项目可能已重置或编号无效"
      ><template #extra><mp-button @click="go('list')">返回项目列表</mp-button></template></mp-result
    ><template v-else
      ><mp-page-header title="项目业务详情" subtitle="项目资料、任务清单和操作记录在所有页面同步" :show-back="false"
        ><template #extra
          ><mp-space wrap
            ><mp-button v-if="!project.archived" @click="startEdit(project)">编辑项目</mp-button
            ><mp-button
              v-if="!project.archived"
              :disabled="project.status === '已完成'"
              status="primary"
              @click="finish(project)"
              >完成交付</mp-button
            ><mp-button v-if="project.archived" @click="restore(project)">恢复项目</mp-button
            ><mp-button v-else @click="requestArchive([project.key])">归档项目</mp-button></mp-space
          ></template
        ></mp-page-header
      ><mp-space wrap size="sm"
        ><mp-button @click="go('dashboard')">工作台</mp-button><mp-button @click="go('list')">项目列表</mp-button
        ><mp-button @click="go('card')">卡片视图</mp-button
        ><mp-button status="primary" @click="go('form')">创建申请</mp-button></mp-space
      ><mp-card :title="project.name" :subtitle="project.key" :description="project.description"
        ><template #title-action
          ><mp-tag>{{ project.archived ? '已归档' : project.status }}</mp-tag></template
        ><mp-progress :percent="project.progress" /><mp-steps
          :model-value="project.status === '已完成' ? 3 : project.status === '进行中' ? 2 : 1"
          ><mp-step>项目创建</mp-step><mp-step>执行交付</mp-step><mp-step>交付完成</mp-step></mp-steps
        ></mp-card
      ><mp-tabs default-value="info"
        ><mp-tab-pane name="info" title="基本资料"
          ><mp-card title="项目资料"
            ><mp-space direction="column" block
              ><mp-cell v-for="item in info" :key="item.label" :title="item.label">{{ item.value }}</mp-cell></mp-space
            ></mp-card
          ></mp-tab-pane
        ><mp-tab-pane name="tasks" title="任务清单"
          ><mp-card title="交付任务"
            ><mp-space direction="column" block
              ><mp-checkbox
                v-for="task in project.tasks"
                :key="task.key"
                :model-value="task.done"
                :disabled="project.archived"
                @update:model-value="(checked) => workspace.toggleTask(project, task.key, checked)"
                >{{ task.title }}</mp-checkbox
              ></mp-space
            ></mp-card
          ></mp-tab-pane
        ><mp-tab-pane name="history" title="操作记录"
          ><mp-card title="项目动态"
            ><mp-space direction="column" block
              ><mp-cell v-for="event in projectEvents" :key="event.key"
                >{{ timeLabel(event.at) }} · {{ event.text }}</mp-cell
              ><mp-empty
                v-if="!projectEvents.length"
                description="项目尚无新增记录" /></mp-space></mp-card></mp-tab-pane></mp-tabs
      ><mp-card title="新增跟进"
        ><mp-form layout="vertical"
          ><mp-form-item label="跟进内容"
            ><mp-textarea
              v-model="noteText"
              placeholder="记录当前进展、风险或下一步计划"
              :disabled="project.archived"
              presentation="inline" /></mp-form-item></mp-form
        ><mp-button status="primary" :disabled="!noteText.trim() || project.archived" @click="addNote"
          >添加跟进</mp-button
        ></mp-card
      ><mp-cell role="status" aria-live="polite">{{ notice }}</mp-cell
      ><mp-dialog
        v-model:open="createOpen"
        :title="editingKey ? '编辑项目资料' : '快速创建项目'"
        :footer="false"
        :unmount-on-close="true"
        ><mp-form :model="draft" layout="vertical" @submit="create"
          ><mp-grid :cols="{ xs: 1, md: 2 }" :col-gap="16" :row-gap="8"
            ><mp-grid-item
              ><mp-form-item label="项目名称" field="name" :rules="required" feedback
                ><mp-input
                  v-model="draft.name"
                  presentation="inline"
                  placeholder="项目名称" /></mp-form-item></mp-grid-item
            ><mp-grid-item
              ><mp-form-item label="负责人" field="owner" :rules="required" feedback
                ><mp-input
                  v-model="draft.owner"
                  presentation="inline"
                  placeholder="负责人" /></mp-form-item></mp-grid-item
            ><mp-grid-item
              ><mp-form-item label="业务类型" field="category"
                ><mp-select
                  v-model="draft.category"
                  :options="categories"
                  presentation="popup" /></mp-form-item></mp-grid-item
            ><mp-grid-item
              ><mp-form-item label="优先级" field="priority"
                ><mp-select
                  v-model="draft.priority"
                  :options="priorities"
                  presentation="popup" /></mp-form-item></mp-grid-item
            ><mp-grid-item
              ><mp-form-item label="开始日期" field="startDate"
                ><mp-date
                  v-model="draft.startDate"
                  value-format="YYYY-MM-DD"
                  presentation="popup" /></mp-form-item></mp-grid-item
            ><mp-grid-item
              ><mp-form-item label="截止日期" field="dueDate"
                ><mp-date
                  v-model="draft.dueDate"
                  value-format="YYYY-MM-DD"
                  presentation="popup" /></mp-form-item></mp-grid-item
            ><mp-grid-item
              ><mp-form-item label="项目预算（元）" field="budget"
                ><mp-input-number
                  v-model="draft.budget"
                  :min="0"
                  :precision="2"
                  presentation="inline" /></mp-form-item></mp-grid-item></mp-grid
          ><mp-form-item label="项目说明" field="description"
            ><mp-textarea
              v-model="draft.description"
              presentation="inline"
              placeholder="项目目标、交付物和验收要求" /></mp-form-item
          ><mp-space wrap
            ><mp-button html-type="submit" status="primary">{{ editingKey ? '保存项目' : '创建项目' }}</mp-button
            ><mp-button @click="createOpen = false">取消</mp-button></mp-space
          ><mp-cell role="status" aria-live="polite">{{ notice }}</mp-cell></mp-form
        ></mp-dialog
      ><mp-dialog v-model:open="archiveOpen" title="确认归档项目" :footer="false"
        ><mp-space direction="column" block
          ><mp-cell>将归档所选项目。项目、任务和操作记录会保留，可在“已归档”筛选中恢复。</mp-cell
          ><mp-space wrap
            ><mp-button status="warning" @click="confirmArchive">确认归档</mp-button
            ><mp-button @click="archiveOpen = false">取消归档</mp-button></mp-space
          ></mp-space
        ></mp-dialog
      ></template
    ></mp-space
  >
</template>
<style scoped>
.practice-page {
  width: 100%;
  min-width: 0;
}
.practice-page :deep(.mp-grid-item) {
  min-width: 0;
}
.practice-page :deep(.mp-grid) {
  width: 100%;
}
.practice-page :deep(.mp-space__item) {
  min-width: 0;
}
</style>
```

## 移动端业务适配

全部使用 Maple 自有组件。手机列表使用可选择的项目卡片，资料使用 Cell 展示，选择与日期使用 Popup。任务、跟进、收藏、归档和草稿在这些页面间共享，刷新保留当前浏览器会话数据。

业务数据在 `practices-examples/shared/usePracticeData.js` 中；示例使用合成数据，不访问真实业务接口。归档可恢复，重置会还原整个工作区。

参考信息组织：[Ant Design 表单页面](https://ant.design/docs/spec/research-form/) · [Arco Design Pro](https://github.com/arco-design/arco-design-pro) · [TDesign Starter](https://tdesign.tencent.com/starter)。全部界面使用本库组件组合。
