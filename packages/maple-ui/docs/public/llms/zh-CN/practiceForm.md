<!-- Source: docs/practiceForm.zh-CN.md; locale: zh-CN; page: /zh-CN/practiceForm -->

# 分步表单页

基础资料、计划预算、核对提交、办理结果四阶段。

## 完整业务体验

先提交空资料查看校验；填写名称和负责人，设置计划与预算。保存草稿后离开并回来恢复；确认页模拟失败并重试，成功后点击“查看项目详情”。新项目同时进入列表、卡片和工作台。

Example source: docs/practices-examples/form/basic.vue

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
const step = ref(0)
const failNext = ref(false)
const committed = ref(null)
const formMessage = ref(
  savedDraft.value ? '存在可恢复草稿，可先恢复继续办理。' : '填写基础信息后，设置计划与预算，再核对提交。',
)
function next({ errors } = {}) {
  if (errors) {
    formMessage.value = '请补全必填项。'
    return
  }
  if (step.value === 1 && projectError(draft.value)) {
    formMessage.value = projectError(draft.value)
    return
  }
  step.value++
  formMessage.value = step.value === 2 ? '请确认全部资料，返回修改不会生成项目。' : '设置项目执行计划。'
}
function saveDraft() {
  savedDraft.value = JSON.parse(JSON.stringify(draft.value))
  formMessage.value = '草稿已保存，切换页面或刷新后仍可恢复。'
}
function restoreDraft() {
  if (savedDraft.value) {
    draft.value = JSON.parse(JSON.stringify(savedDraft.value))
    step.value = 0
    formMessage.value = '已恢复上次保存的草稿。'
  }
}
function submit() {
  if (failNext.value) {
    failNext.value = false
    formMessage.value = '模拟保存失败，草稿已保留，请重试提交。'
    return
  }
  const row = workspace.save(draft.value)
  if (!row) {
    formMessage.value = projectError(draft.value)
    return
  }
  committed.value = row
  savedDraft.value = null
  step.value = 3
  formMessage.value = '项目已创建，列表、卡片和工作台已同步。'
}
function resetForm() {
  step.value = 0
  draft.value = fresh()
  committed.value = null
  failNext.value = false
  formMessage.value = '已清空当前表单，工作区里的项目不受影响。'
}
</script>
<template>
  <mp-space class="practice-page" direction="column" block size="lg"
    ><mp-page-header title="创建项目申请" subtitle="基础资料 → 计划预算 → 核对提交 → 办理完成" :show-back="false"
      ><template #extra
        ><mp-space wrap><mp-button @click="resetForm">清空当前表单</mp-button></mp-space></template
      ></mp-page-header
    ><mp-space wrap size="sm"
      ><mp-button @click="go('dashboard')">工作台</mp-button><mp-button @click="go('list')">项目列表</mp-button
      ><mp-button @click="go('card')">卡片视图</mp-button
      ><mp-button status="primary" @click="go('form')">创建申请</mp-button></mp-space
    ><mp-card
      ><mp-steps :model-value="step + 1"
        ><mp-step>基础资料</mp-step><mp-step>计划预算</mp-step><mp-step>核对提交</mp-step
        ><mp-step>办理完成</mp-step></mp-steps
      ></mp-card
    ><mp-card v-if="step === 0" title="基础资料"
      ><mp-form :model="draft" layout="vertical" @submit="next"
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
                presentation="popup" /></mp-form-item></mp-grid-item></mp-grid
        ><mp-space wrap
          ><mp-button html-type="submit" status="primary">下一步：计划预算</mp-button
          ><mp-button @click="saveDraft">保存草稿</mp-button
          ><mp-button :disabled="!savedDraft" @click="restoreDraft">恢复草稿</mp-button></mp-space
        ></mp-form
      ></mp-card
    ><mp-card v-else-if="step === 1" title="计划与预算"
      ><mp-form :model="draft" layout="vertical" @submit="next"
        ><mp-grid :cols="{ xs: 1, md: 2 }" :col-gap="16" :row-gap="8"
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
          ><mp-button html-type="submit" status="primary">下一步：核对提交</mp-button
          ><mp-button @click="step = 0">上一步</mp-button><mp-button @click="saveDraft">保存草稿</mp-button></mp-space
        ></mp-form
      ></mp-card
    ><mp-card v-else-if="step === 2" title="核对项目申请"
      ><mp-space direction="column" block
        ><mp-cell>项目：{{ draft.name }} · 负责人：{{ draft.owner }}</mp-cell
        ><mp-cell
          >类型：{{ draft.category }} · 优先级：{{ draft.priority }} · 预算：{{ money(draft.budget) }} 元</mp-cell
        ><mp-cell>执行计划：{{ draft.startDate || '待安排' }} 至 {{ draft.dueDate || '待安排' }}</mp-cell
        ><mp-cell>项目说明：{{ draft.description || '未填写' }}</mp-cell
        ><mp-checkbox v-model="failNext">模拟本次提交失败</mp-checkbox
        ><mp-space wrap
          ><mp-button status="primary" @click="submit">{{
            formMessage.includes('失败') ? '重试提交' : '确认创建项目'
          }}</mp-button
          ><mp-button @click="step = 0">返回修改</mp-button></mp-space
        ></mp-space
      ></mp-card
    ><mp-card v-else
      ><mp-result status="success" title="项目已创建" :subtitle="committed.key + ' · ' + committed.name"
        ><template #extra
          ><mp-space wrap
            ><mp-button status="primary" @click="go('detail', { project: committed.key })">查看项目详情</mp-button
            ><mp-button @click="go('list')">返回项目列表</mp-button
            ><mp-button @click="resetForm">继续创建</mp-button></mp-space
          ></template
        ></mp-result
      ></mp-card
    ><mp-cell role="status" aria-live="polite">{{ formMessage }}</mp-cell></mp-space
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
