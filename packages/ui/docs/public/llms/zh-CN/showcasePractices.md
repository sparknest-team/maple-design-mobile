<!-- Source: docs/showcasePractices.zh-CN.md; locale: zh-CN; page: /zh-CN/showcasePractices -->

# 最佳实践

Example source: docs/practices-examples/overview.vue

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { usePracticeData } from './shared/usePracticeData.js'
import { usePracticeNavigation } from './shared/usePracticeNavigation.js'

const { projects, done, overdue, savedDraft } = usePracticeData()
const { go } = usePracticeNavigation()

const route = useRoute()
const router = useRouter()
const pages = [
  {
    slug: 'dashboard',
    title: '团队工作台',
    doc: 'practiceDashboard',
    summary: '范围筛选、指标联动、待办完成与详情查看。',
  },
  { slug: 'list', title: '查询列表页', doc: 'practiceList', summary: '查询、重置、分页、选择、批量完成、新建与详情。' },
  { slug: 'card', title: '项目卡片页', doc: 'practiceCard', summary: '响应式项目空间、筛选、收藏、新建与详情。' },
  {
    slug: 'detail',
    title: '业务详情页',
    doc: 'practiceDetail',
    summary: '动态项目资料、交付任务、进度、跟进与可恢复归档。',
  },
  { slug: 'form', title: '分步表单页', doc: 'practiceForm', summary: '必填校验、草稿恢复、信息确认、失败重试与结果。' },
  {
    slug: 'result',
    title: '结果与异常页',
    doc: 'practiceResult',
    summary: '成功、服务失败、无权限、页面丢失和空结果。',
  },
]
function open(page) {
  router.push(`/${route.path.startsWith('/en-US/') ? 'en-US' : 'zh-CN'}/${page.doc}`)
}
</script>
<template>
  <mp-space direction="column" block size="lg"
    ><mp-page-header
      title="常用业务页面"
      subtitle="从查询、创建到处理与反馈，全部使用自有组件"
      :show-back="false"
    /><mp-grid :cols="{ xs: 2, md: 4 }" :col-gap="16" :row-gap="16"
      ><mp-grid-item
        ><mp-card><mp-statistic title="在管项目" :value="projects.length" /></mp-card></mp-grid-item
      ><mp-grid-item
        ><mp-card><mp-statistic title="已交付" :value="done" /></mp-card></mp-grid-item
      ><mp-grid-item
        ><mp-card><mp-statistic title="逾期待处理" :value="overdue" /></mp-card></mp-grid-item
      ><mp-grid-item
        ><mp-card
          ><mp-space direction="column"
            ><mp-tag>{{ savedDraft ? '有未提交草稿' : '没有未提交草稿' }}</mp-tag
            ><mp-button @click="go('form')">{{ savedDraft ? '继续填写草稿' : '创建第一份申请' }}</mp-button></mp-space
          ></mp-card
        ></mp-grid-item
      ></mp-grid
    ><mp-card
      ><mp-cell
        >以项目协作为同一业务背景，演示真实的查询、校验、取消、提交和恢复。所有页面共享项目台账与操作记录，刷新保留会话数据，归档可恢复。</mp-cell
      ></mp-card
    ><mp-grid style="width: 100%" :cols="{ xs: 1, md: 2 }" :col-gap="16" :row-gap="16"
      ><mp-grid-item v-for="(page, index) in pages" :key="page.slug"
        ><mp-card :title="page.title" :subtitle="'0' + (index + 1)" :description="page.summary"
          ><template #footer
            ><mp-button status="primary" @click="open(page)">打开{{ page.title }}</mp-button></template
          ></mp-card
        ></mp-grid-item
      ></mp-grid
    ></mp-space
  >
</template>
```

参考页面的信息分组与操作流程，界面全部由本库组件实现，不引入 Ant Design、Arco 或 TDesign 的组件和样式。

参考：[Ant Design 表单页面设计](https://ant.design/docs/spec/research-form/) · [Arco Design Pro](https://github.com/arco-design/arco-design-pro) · [TDesign Starter](https://tdesign.tencent.com/starter)。
