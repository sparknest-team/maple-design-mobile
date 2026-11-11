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
const columns = [
  { title: '项目 / 编号', slotName: 'project' },
  { title: '负责人', dataIndex: 'owner' },
  { title: '进度与状态', slotName: 'state' },
  { title: '预算', slotName: 'budget' },
  { title: '截止日期', dataIndex: 'dueDate' },
  { title: '操作', slotName: 'actions' },
]
</script>
<template>
  <mp-space class="practice-page" direction="column" block size="lg"
    ><mp-page-header title="项目管理" subtitle="统一查询、编辑、交付与归档的项目台账" :show-back="false"
      ><template #extra
        ><mp-space wrap
          ><mp-button @click="exportCsv">导出查询结果</mp-button><mp-button @click="reset">重置工作区</mp-button
          ><mp-button status="primary" @click="startCreate">快速新建</mp-button></mp-space
        ></template
      ></mp-page-header
    ><mp-space wrap size="sm"
      ><mp-button @click="go('dashboard')">工作台</mp-button><mp-button @click="go('list')">项目列表</mp-button
      ><mp-button @click="go('card')">卡片视图</mp-button
      ><mp-button status="primary" @click="go('form')">创建申请</mp-button></mp-space
    ><mp-cell>本地演示工作区 · 各页面共享数据，刷新保留本次会话。归档可恢复，重置会还原整个工作区。</mp-cell
    ><mp-grid :cols="{ xs: 2, md: 4 }" :col-gap="16" :row-gap="16"
      ><mp-grid-item
        ><mp-card><mp-statistic title="在管项目" :value="projects.length" /></mp-card></mp-grid-item
      ><mp-grid-item
        ><mp-card><mp-statistic title="已交付" :value="done" /></mp-card></mp-grid-item
      ><mp-grid-item
        ><mp-card><mp-statistic title="逾期待处理" :value="overdue" /></mp-card></mp-grid-item
      ><mp-grid-item
        ><mp-card
          ><mp-statistic
            title="预算合计（元）"
            :value="budget"
            show-group-separator /></mp-card></mp-grid-item></mp-grid
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
    ><mp-card title="项目台账"
      ><template #title-action
        ><mp-space wrap
          ><mp-button :disabled="!selected.length || applied.archived" @click="finishSelected"
            >交付选中（{{ selected.length }}）</mp-button
          ><mp-button :disabled="!selected.length || applied.archived" @click="requestArchive([...selected])"
            >归档选中</mp-button
          ></mp-space
        ></template
      ><mp-space direction="column" block
        ><mp-card
          v-for="row in pageRows"
          :key="row.key"
          :title="row.name"
          :subtitle="row.key"
          :description="row.owner + ' · ' + row.category"
          ><template #title-action
            ><mp-checkbox
              :model-value="selected.includes(row.key)"
              :aria-label="`选择${row.name}`"
              @update:model-value="
                (checked) => (selected = checked ? [...selected, row.key] : selected.filter((key) => key !== row.key))
              " /></template
          ><mp-space direction="column" block
            ><mp-space wrap
              ><mp-tag>{{ row.status }}</mp-tag
              ><mp-tag>{{ row.priority }}优先级</mp-tag></mp-space
            ><mp-progress :percent="row.progress" /><mp-cell title="截止日期">{{ row.dueDate || '未设置' }}</mp-cell
            ><mp-cell title="预算">{{ money(row.budget) }} 元</mp-cell></mp-space
          ><template #footer
            ><mp-space wrap
              ><mp-button size="sm" @click="go('detail', { project: row.key })">详情</mp-button
              ><mp-button v-if="!row.archived" size="sm" @click="startEdit(row)">编辑</mp-button
              ><mp-button v-if="!row.archived" size="sm" :disabled="row.status === '已完成'" @click="finish(row)"
                >交付</mp-button
              ><mp-button v-if="row.archived" size="sm" @click="restore(row)">恢复</mp-button
              ><mp-button v-else size="sm" @click="requestArchive([row.key])">归档</mp-button></mp-space
            ></template
          ></mp-card
        ></mp-space
      ><mp-empty v-if="!filtered.length" description="没有匹配项目，清空筛选可恢复结果" /><template #footer
        ><mp-pagination v-model="current" :total="filtered.length" :page-size="4" /></template></mp-card
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
    ><mp-dialog v-model:open="archiveOpen" title="确认归档项目" :footer="false"
      ><mp-space direction="column" block
        ><mp-cell>将归档所选项目。项目、任务和操作记录会保留，可在“已归档”筛选中恢复。</mp-cell
        ><mp-space wrap
          ><mp-button status="warning" @click="confirmArchive">确认归档</mp-button
          ><mp-button @click="archiveOpen = false">取消归档</mp-button></mp-space
        ></mp-space
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
