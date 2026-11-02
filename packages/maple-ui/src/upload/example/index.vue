<script setup>
import { ref } from 'vue'
import { AppType, watchLang } from '@maple-design/cli/client'
import Demo5 from './demos/basic-usage.vue'
import Demo6 from './demos/before-add.vue'
import Demo7 from './demos/before-read.vue'
import Demo8 from './demos/before-remove.vue'
import Demo9 from './demos/click-action.vue'
import ClipboardDemo from './demos/clipboard.vue'
import Demo10 from './demos/custom-preview.vue'
import Demo11 from './demos/custom-render.vue'
import Demo3 from './demos/custom-surface.vue'
import DirectoryDemo from './demos/directory.vue'
import Demo5En from './demos/en-US/basic-usage.vue'
import Demo6En from './demos/en-US/before-add.vue'
import Demo7En from './demos/en-US/before-read.vue'
import Demo8En from './demos/en-US/before-remove.vue'
import Demo9En from './demos/en-US/click-action.vue'
import Demo10En from './demos/en-US/custom-preview.vue'
import Demo11En from './demos/en-US/custom-render.vue'
import Demo3En from './demos/en-US/custom-surface.vue'
import Demo4En from './demos/en-US/external-state.vue'
import LateRequestEn from './demos/en-US/late-request.vue'
import MetadataRequestEn from './demos/en-US/metadata-request.vue'
import PrepareRequestEn from './demos/en-US/prepare-request.vue'
import Demo15En from './demos/en-US/preview.vue'
import Demo1En from './demos/en-US/queue-request.vue'
import Demo0En from './demos/en-US/read-only.vue'
import Demo17En from './demos/en-US/remove-button-slot.vue'
import Demo2En from './demos/en-US/replacement-validation.vue'
import ContentSelectionLimitsComparisonEn from './demos/en-US/selection-limits-comparison.vue'
import Demo18En from './demos/en-US/state.vue'
import Demo19En from './demos/en-US/style.vue'
import Demo20En from './demos/en-US/use-progress.vue'
import Demo4 from './demos/external-state.vue'
import LateRequest from './demos/late-request.vue'
import MetadataRequest from './demos/metadata-request.vue'
import PrepareRequest from './demos/prepare-request.vue'
import Demo15 from './demos/preview.vue'
import Demo1 from './demos/queue-request.vue'
import Demo0 from './demos/read-only.vue'
import Demo17 from './demos/remove-button-slot.vue'
import Demo2 from './demos/replacement-validation.vue'
import ContentSelectionLimitsComparison from './demos/selection-limits-comparison.vue'
import StateControlsDemo from './demos/state-controls.vue'
import GroupedStateLabDemo from './demos/state-lab.vue'
import Demo18 from './demos/state.vue'
import Demo19 from './demos/style.vue'
import Demo20 from './demos/use-progress.vue'

const english = ref(false)
watchLang((lang) => {
  english.value = lang === 'en-US'
})
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="upload">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="read-only">
    <h3>{{ english ? 'Read files' : '只读取文件' }}</h3>
    <component :is="english ? Demo0En : Demo0" />
  </section>

  <section data-demo="basic-usage">
    <h3>{{ english ? 'Basic usage' : '基本使用' }}</h3>
    <component :is="english ? Demo5En : Demo5" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="state-controls">
    <h3>{{ english ? 'Dynamic readonly and disabled states' : '动态只读与禁用' }}</h3>
    <StateControlsDemo />
  </section>

  <section data-demo="state">
    <h3>{{ english ? 'Queue states' : '所有队列状态' }}</h3>
    <component :is="english ? Demo18En : Demo18" />
  </section>

  <section data-demo="state-lab">
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">交互状态切换</span><span lang="en-US">Interaction states</span>
    </h3>
    <GroupedStateLabDemo />
  </section>

  <section data-demo="custom-surface">
    <h3>{{ english ? 'Picture cards and slots' : '图卡和插槽' }}</h3>
    <component :is="english ? Demo3En : Demo3" />
  </section>

  <section data-demo="custom-render">
    <h3>{{ english ? 'Custom file item' : '自定义文件项' }}</h3>
    <component :is="english ? Demo11En : Demo11" />
  </section>

  <section data-demo="remove-button-slot">
    <h3>{{ english ? 'Custom remove button' : '自定义删除按钮' }}</h3>
    <component :is="english ? Demo17En : Demo17" />
  </section>

  <section data-demo="style">
    <h3>{{ english ? 'Custom trigger' : '自定义选择按钮' }}</h3>
    <component :is="english ? Demo19En : Demo19" />
  </section>

  <section data-demo="custom-preview">
    <h3>{{ english ? 'Custom preview' : '自定义预览' }}</h3>
    <component :is="english ? Demo10En : Demo10" />
  </section>

  <section data-demo="preview">
    <h3>{{ english ? 'Image and video preview' : '图片和视频预览' }}</h3>
    <component :is="english ? Demo15En : Demo15" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="file-sources-and-validation">
    <span lang="zh-CN">文件来源与约束</span>
    <span lang="en-US">File sources and validation</span>
  </h2>

  <section data-demo="directory"><app-type>目录选择 / Directory</app-type><DirectoryDemo /></section>

  <section data-demo="click-action">
    <h3>{{ english ? 'Custom file chooser' : '接管文件选择' }}</h3>
    <component :is="english ? Demo9En : Demo9" />
  </section>

  <section data-demo="clipboard"><app-type>剪贴板图片 / Clipboard images</app-type><ClipboardDemo /></section>

  <section data-demo="replacement-validation">
    <h3>{{ english ? 'Replacement validation' : '替换后校验' }}</h3>
    <component :is="english ? Demo2En : Demo2" />
  </section>

  <section data-demo="before-add">
    <h3>{{ english ? 'Batch filtering' : '批次筛选' }}</h3>
    <component :is="english ? Demo6En : Demo6" />
  </section>

  <section data-demo="before-read">
    <h3>{{ english ? 'Before reading' : '读取前确认' }}</h3>
    <component :is="english ? Demo7En : Demo7" />
  </section>

  <section data-demo="selection-limits-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">文件大小与数量限制</span><span lang="en-US">File size and count limits</span>
    </h3>
    <component :is="english ? ContentSelectionLimitsComparisonEn : ContentSelectionLimitsComparison" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="queues-and-progress">
    <span lang="zh-CN">队列与进度</span>
    <span lang="en-US">Queues and progress</span>
  </h2>

  <section data-demo="external-state">
    <h3>{{ english ? 'External status' : '外部状态' }}</h3>
    <component :is="english ? Demo4En : Demo4" />
  </section>

  <section data-demo="use-progress">
    <h3>{{ english ? 'External progress' : '外部上传进度' }}</h3>
    <component :is="english ? Demo20En : Demo20" />
  </section>

  <section data-demo="queue-request">
    <h3>{{ english ? 'Queue and cancellation' : '手动队列和取消' }}</h3>
    <component :is="english ? Demo1En : Demo1" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-hooks-and-requests">
    <span lang="zh-CN">异步钩子与请求</span>
    <span lang="en-US">Async hooks and requests</span>
  </h2>

  <section data-demo="before-remove">
    <h3>{{ english ? 'Before removing' : '删除前确认' }}</h3>
    <component :is="english ? Demo8En : Demo8" />
  </section>

  <section data-demo="prepare-request">
    <h3>{{ english ? 'Preparation and cancellation races' : '上传前准备与取消竞争' }}</h3>
    <component :is="english ? PrepareRequestEn : PrepareRequest" />
  </section>

  <section data-demo="metadata-request">
    <h3>{{ english ? 'Async request metadata' : '异步请求元数据' }}</h3>
    <component :is="english ? MetadataRequestEn : MetadataRequest" />
  </section>

  <section data-demo="late-request">
    <h3>{{ english ? 'Delayed request handles' : '请求句柄迟到与取消' }}</h3>
    <component :is="english ? LateRequestEn : LateRequest" />
  </section>
</template>
<style scoped>
section {
  padding: 16px;
  border-bottom: 1px solid var(--mp-sys-color-border-default);
}
h3 {
  margin: 0 0 12px;
  font-size: 14px;
}
</style>
