<!-- Source: docs/practiceCard.zh-CN.md; locale: zh-CN; page: /zh-CN/practiceCard -->

# 项目卡片页

收藏、组合筛选、项目计划和快速编辑。

## 完整业务体验

收藏项目，勾选“仅看收藏”并查询；进入完整详情后修改负责人或执行计划，再返回卡片或列表核对结果。

Example source: docs/practices-examples/card/basic.vue

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
</script>
<template>
  <mp-space class="practice-page" direction="column" block size="lg"
    ><mp-page-header title="项目协作空间" subtitle="按业务类型发现项目，收藏与编辑在列表同步" :show-back="false"
      ><template #extra
        ><mp-space wrap><mp-button status="primary" @click="startCreate">快速新建</mp-button></mp-space></template
      ></mp-page-header
    ><mp-space wrap size="sm"
      ><mp-button @click="go('dashboard')">工作台</mp-button><mp-button @click="go('list')">项目列表</mp-button
      ><mp-button @click="go('card')">卡片视图</mp-button
      ><mp-button status="primary" @click="go('form')">创建申请</mp-button></mp-space
    ><mp-cell>本地演示工作区 · 各页面共享数据，刷新保留本次会话。归档可恢复，重置会还原整个工作区。</mp-cell
    ><mp-card title="项目筛选"
      ><mp-form :model="query" layout="vertical" @submit="search"
        ><mp-grid :cols="{ xs: 1, md: 3 }" :col-gap="16" :row-gap="8"
          ><mp-grid-item
            ><mp-form-item label="关键词"
              ><mp-input
                v-model="query.keyword"
                placeholder="项目、编号、负责人或类型"
                edit-mode="direct"
                clearable /></mp-form-item></mp-grid-item
          ><mp-grid-item
            ><mp-form-item label="项目状态"
              ><mp-select
                v-model="query.status"
                :options="statusOptions"
                edit-mode="popup" /></mp-form-item></mp-grid-item
          ><mp-grid-item
            ><mp-form-item label="业务类型"
              ><mp-select
                v-model="query.category"
                :options="categoryOptions"
                edit-mode="popup" /></mp-form-item></mp-grid-item></mp-grid
        ><mp-space wrap
          ><mp-checkbox v-model="query.archived" edit-mode="direct">查看已归档项目</mp-checkbox
          ><mp-checkbox v-model="query.favorites" edit-mode="direct">仅看收藏</mp-checkbox
          ><mp-button html-type="submit" status="primary">查询项目</mp-button
          ><mp-button @click="clear">清空筛选</mp-button></mp-space
        ></mp-form
      ></mp-card
    ><mp-cell>共 {{ filtered.length }} 个项目 · 已收藏 {{ favorites.length }} 个</mp-cell
    ><mp-grid :cols="{ xs: 1, md: 2, xl: 3 }" :col-gap="16" :row-gap="16"
      ><mp-grid-item v-for="row in filtered" :key="row.key"
        ><mp-card :title="row.name" :subtitle="row.key" :description="row.owner + ' · ' + row.category"
          ><template #title-action
            ><mp-tag :status="row.status === '已完成' ? 'success' : 'primary'">{{ row.status }}</mp-tag></template
          ><mp-space direction="column" block
            ><mp-cell>{{ row.description }}</mp-cell
            ><mp-progress :percent="row.progress" /><mp-tag
              >截止 {{ row.dueDate || '待安排' }} · 预算 {{ money(row.budget) }} 元</mp-tag
            ></mp-space
          ><template #footer
            ><mp-space wrap
              ><mp-button status="primary" @click="go('detail', { project: row.key })">进入项目</mp-button
              ><mp-button :aria-pressed="favorites.includes(row.key)" @click="favorite(row)">{{
                favorites.includes(row.key) ? '取消收藏' : '收藏项目'
              }}</mp-button
              ><mp-button v-if="!row.archived" @click="startEdit(row)">编辑资料</mp-button
              ><mp-button v-else @click="restore(row)">恢复项目</mp-button></mp-space
            ></template
          ></mp-card
        ></mp-grid-item
      ></mp-grid
    ><mp-empty v-if="!filtered.length" description="暂无匹配项目，调整条件或新建项目" /><mp-cell
      role="status"
      aria-live="polite"
      >{{ notice }}</mp-cell
    ><mp-dialog
      v-model:open="createOpen"
      :title="editingKey ? '编辑项目资料' : '快速创建项目'"
      :footer="false"
      :unmount-on-close="true"
      ><mp-form :model="draft" layout="vertical" @submit="create"
        ><mp-grid :cols="{ xs: 1, md: 2 }" :col-gap="16" :row-gap="8"
          ><mp-grid-item
            ><mp-form-item label="项目名称" field="name" :rules="required" feedback
              ><mp-input v-model="draft.name" edit-mode="direct" placeholder="项目名称" /></mp-form-item></mp-grid-item
          ><mp-grid-item
            ><mp-form-item label="负责人" field="owner" :rules="required" feedback
              ><mp-input v-model="draft.owner" edit-mode="direct" placeholder="负责人" /></mp-form-item></mp-grid-item
          ><mp-grid-item
            ><mp-form-item label="业务类型" field="category"
              ><mp-select
                v-model="draft.category"
                :options="categories"
                edit-mode="popup" /></mp-form-item></mp-grid-item
          ><mp-grid-item
            ><mp-form-item label="优先级" field="priority"
              ><mp-select
                v-model="draft.priority"
                :options="priorities"
                edit-mode="popup" /></mp-form-item></mp-grid-item
          ><mp-grid-item
            ><mp-form-item label="开始日期" field="startDate"
              ><mp-date
                v-model="draft.startDate"
                value-format="YYYY-MM-DD"
                edit-mode="popup" /></mp-form-item></mp-grid-item
          ><mp-grid-item
            ><mp-form-item label="截止日期" field="dueDate"
              ><mp-date
                v-model="draft.dueDate"
                value-format="YYYY-MM-DD"
                edit-mode="popup" /></mp-form-item></mp-grid-item
          ><mp-grid-item
            ><mp-form-item label="项目预算（元）" field="budget"
              ><mp-input-number
                v-model="draft.budget"
                :min="0"
                :precision="2"
                edit-mode="direct" /></mp-form-item></mp-grid-item></mp-grid
        ><mp-form-item label="项目说明" field="description"
          ><mp-textarea
            v-model="draft.description"
            edit-mode="direct"
            placeholder="项目目标、交付物和验收要求" /></mp-form-item
        ><mp-space wrap
          ><mp-button html-type="submit" status="primary">{{ editingKey ? '保存项目' : '创建项目' }}</mp-button
          ><mp-button @click="createOpen = false">取消</mp-button></mp-space
        ><mp-cell role="status" aria-live="polite">{{ notice }}</mp-cell></mp-form
      ></mp-dialog
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
