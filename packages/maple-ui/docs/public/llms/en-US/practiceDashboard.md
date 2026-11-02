<!-- Source: docs/practiceDashboard.en-US.md; locale: en-US; page: /en-US/practiceDashboard -->

# 团队工作台

按类型汇总项目指标、预算、待办与最近动态。

## 完整业务体验

选择业务范围，处理待办中的项目；再进入列表或详情，核对同一个项目的状态。创建、编辑、归档和跟进都会进入最近动态。

Example source: docs/practices-examples/dashboard/basic.vue

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
const category = ref('全部')
const visible = computed(() =>
  projects.value.filter((row) => category.value === '全部' || row.category === category.value),
)
const completed = computed(() => visible.value.filter((row) => row.status === '已完成').length)
const completion = computed(() =>
  visible.value.length ? Math.round((completed.value / visible.value.length) * 100) : 0,
)
const totalBudget = computed(() => visible.value.reduce((sum, row) => sum + row.budget, 0))
const visibleEvents = computed(() =>
  activity.value
    .filter((event) => !event.project || visible.value.some((row) => row.key === event.project))
    .slice(0, 6),
)
const pending = computed(() => visible.value.filter((row) => row.status !== '已完成').slice(0, 4))
const timeLabel = (value) => new Date(value).toLocaleString('zh-CN')
</script>
<template>
  <mp-space class="practice-page" direction="column" block size="lg"
    ><mp-page-header title="团队工作台" subtitle="一份项目数据驱动指标、待办、交付与操作动态" :show-back="false"
      ><template #extra
        ><mp-space wrap><mp-button @click="reset">重置工作区</mp-button></mp-space></template
      ></mp-page-header
    ><mp-space wrap size="sm"
      ><mp-button @click="go('dashboard')">工作台</mp-button><mp-button @click="go('list')">项目列表</mp-button
      ><mp-button @click="go('card')">卡片视图</mp-button
      ><mp-button status="primary" @click="go('form')">创建申请</mp-button></mp-space
    ><mp-cell>本地演示工作区 · 各页面共享数据，刷新保留本次会话。归档可恢复，重置会还原整个工作区。</mp-cell
    ><mp-card title="业务概况"
      ><mp-form layout="vertical"
        ><mp-form-item label="业务范围"
          ><mp-select v-model="category" :options="categoryOptions" presentation="popup" /></mp-form-item></mp-form
      ><mp-grid :cols="{ xs: 2, md: 4 }" :col-gap="16" :row-gap="16"
        ><mp-grid-item><mp-statistic title="范围内项目" :value="visible.length" /></mp-grid-item
        ><mp-grid-item><mp-statistic title="已交付项目" :value="completed" /></mp-grid-item
        ><mp-grid-item><mp-statistic title="预算（元）" :value="totalBudget" show-group-separator /></mp-grid-item
        ><mp-grid-item
          ><mp-statistic title="交付完成率" :value="completion" suffix="%" /></mp-grid-item></mp-grid></mp-card
    ><mp-grid :cols="{ xs: 1, lg: 2 }" :col-gap="16" :row-gap="16"
      ><mp-grid-item
        ><mp-card title="我的待办"
          ><mp-space direction="column" block
            ><mp-card
              v-for="row in pending"
              :key="row.key"
              :title="row.name"
              :description="row.owner + ' · 截止 ' + row.dueDate"
              ><mp-progress :percent="row.progress" /><template #footer
                ><mp-space wrap
                  ><mp-button @click="go('detail', { project: row.key })">处理项目</mp-button
                  ><mp-button @click="finish(row)">完成交付</mp-button></mp-space
                ></template
              ></mp-card
            ><mp-empty v-if="!pending.length" description="该范围内的项目均已交付" /></mp-space></mp-card></mp-grid-item
      ><mp-grid-item
        ><mp-space direction="column" block
          ><mp-card title="类型交付分布"
            ><mp-space direction="column" block
              ><mp-space v-for="item in categories" :key="item.value" direction="column" block
                ><mp-cell
                  >{{ item.label }} ·
                  {{ projects.filter((row) => row.category === item.value && row.status === '已完成').length }} /
                  {{ projects.filter((row) => row.category === item.value).length }} 已完成</mp-cell
                ><mp-progress
                  :percent="
                    projects.filter((row) => row.category === item.value).length
                      ? Math.round(
                          (projects.filter((row) => row.category === item.value && row.status === '已完成').length /
                            projects.filter((row) => row.category === item.value).length) *
                            100,
                        )
                      : 0
                  " /></mp-space></mp-space></mp-card
          ><mp-card title="最近动态"
            ><mp-space direction="column" block
              ><mp-cell v-for="event in visibleEvents" :key="event.key"
                >{{ timeLabel(event.at) }} · {{ event.text }}</mp-cell
              ><mp-empty
                v-if="!visibleEvents.length"
                description="暂无操作记录" /></mp-space></mp-card></mp-space></mp-grid-item></mp-grid
    ><mp-cell role="status" aria-live="polite">{{ notice }}</mp-cell></mp-space
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
