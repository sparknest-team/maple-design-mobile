<!-- Source: docs/practiceResult.zh-CN.md; locale: zh-CN; page: /zh-CN/practiceResult -->

# 结果与异常页

结合最新项目记录提供成功反馈、异常恢复与下一步。

## 完整业务体验

体验服务失败重试、空状态创建申请和项目详情返回；办理成功时可以打开最近创建的真实本地项目。结果类型只用于本地演示，不调用真实业务后端。

Example source: docs/practices-examples/result/basic.vue

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
const state = ref(String(route.query.state || 'success'))
const retries = ref(0)
const lastProject = computed(() => rows.value.find((row) => row.key === (route.query.project || latest.value)))
const resultOptions = [
  { value: 'success', label: '办理成功' },
  { value: '500', label: '服务异常' },
  { value: '403', label: '无权限访问' },
  { value: '404', label: '项目不存在' },
  { value: 'empty', label: '暂无项目' },
]
const content = computed(
  () =>
    ({
      success: [
        '办理成功',
        lastProject.value
          ? `${lastProject.value.key} · ${lastProject.value.name}`
          : '可返回项目列表，或创建一份新申请。',
      ],
      500: ['保存暂时失败', '这是一种本地演示状态，重试恢复后可继续处理。'],
      403: ['暂时无法访问', '当前演示权限不足，请返回工作台。'],
      404: ['未找到项目', '请从项目列表重新选择，避免使用失效的项目编号。'],
      empty: ['尚未建立项目', '创建一份申请，建立完整的项目与任务清单。'],
    })[state.value] || ['结果类型无效', '请从下方选择一个演示状态。'],
)
function recover() {
  if (state.value === '500') {
    retries.value++
    state.value = 'success'
    notice.value = `重试成功（${retries.value} 次），可以继续处理。`
  } else if (state.value === 'empty') {
    go('form')
  } else {
    go('list')
  }
}
</script>
<template>
  <mp-space class="practice-page" direction="column" block size="lg"
    ><mp-page-header title="办理结果与异常恢复" subtitle="结合实际项目记录提供下一步操作" :show-back="false"
      ><template #extra><mp-space wrap></mp-space></template></mp-page-header
    ><mp-space wrap size="sm"
      ><mp-button @click="go('dashboard')">工作台</mp-button><mp-button @click="go('list')">项目列表</mp-button
      ><mp-button @click="go('card')">卡片视图</mp-button
      ><mp-button status="primary" @click="go('form')">创建申请</mp-button></mp-space
    ><mp-card title="结果体验"
      ><mp-form layout="vertical"
        ><mp-form-item label="演示结果类型"
          ><mp-select v-model="state" :options="resultOptions" presentation="popup" /></mp-form-item></mp-form></mp-card
    ><mp-card
      ><mp-result
        :status="resultOptions.some((item) => item.value === state) ? state : 'warning'"
        :title="content[0]"
        :subtitle="content[1]"
        ><template #extra
          ><mp-space wrap
            ><mp-button status="primary" @click="recover">{{
              state === '500' ? '重试处理' : state === 'empty' ? '创建项目申请' : '返回项目列表'
            }}</mp-button
            ><mp-button v-if="state === 'success' && lastProject" @click="go('detail', { project: lastProject.key })"
              >查看最新项目</mp-button
            ><mp-button @click="go('dashboard')">返回工作台</mp-button></mp-space
          ></template
        ></mp-result
      ></mp-card
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
