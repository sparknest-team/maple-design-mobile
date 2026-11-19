<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import ReviewRequestedDemo from './demos/async-data.vue'
import AsyncDevicesDemo from './demos/async-devices.vue'
import AsyncSourceDemo from './demos/async-source.vue'
import DemoClearable from './demos/clearable.vue'
import ConfirmationDemo from './demos/confirmation.vue'
import DemoCustomIcons from './demos/custom-icons.vue'
import DialogDemo from './demos/dialog.vue'
import GroupedEmptyValueDemo from './demos/empty-value.vue'
import AsyncDevicesEnglishDemo from './demos/en-US/async-devices.vue'
import ConfirmationEnglishDemo from './demos/en-US/confirmation.vue'
import DemoFieldNames from './demos/field-names.vue'
import GroupSpacingDemo from './demos/group-spacing.vue'
import LoadingDemo from './demos/loading.vue'
import DemoMultiple from './demos/multiple.vue'
import GroupedOpenTriggerTargetDemo from './demos/open-trigger-target.vue'
import OptionsReviewDemo from './demos/options-review.vue'
import DemoOptions from './demos/options.vue'
import PassthroughOptionsDemo from './demos/passthrough-options.vue'
import PopupDemo from './demos/popup.vue'
import SameLabelDemo from './demos/same-label.vue'
import SchedulerLifecycleDemo from './demos/scheduler-lifecycle.vue'
import ScrollbarLifecycleDemo from './demos/scrollbar-lifecycle.vue'
import SearchMatchingDemo from './demos/search-matching.vue'
import SelectionDataFlow from './demos/selection-data-flow.vue'
import SlotsReviewDemo from './demos/slots-review.vue'
import DemoStandard from './demos/standard.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import ThumbLifecycleDemo from './demos/thumb-lifecycle.vue'
import DemoValueMapping from './demos/value-mapping.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="select">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="standard">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <DemoStandard />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">外观配置对比</span><span lang="en-US">Appearance configuration comparison</span>
    </h3>
    <OrganizedAppearanceLab />
  </section>

  <section data-demo="control-sizes">
    <h3>Form controls / 表单控件尺寸对照</h3>
    <ControlSizes />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="selection-modes-and-options">
    <span lang="zh-CN">选择模式与选项</span>
    <span lang="en-US">Selection modes and options</span>
  </h2>

  <section data-demo="multiple">
    <app-type>{{ english ? 'Multiple selection' : '多选' }}</app-type>
    <DemoMultiple />
  </section>

  <section data-demo="confirmation">
    <ConfirmationEnglishDemo v-if="english" />
    <ConfirmationDemo v-else />
  </section>

  <section data-demo="same-label">
    <app-type>{{ english ? 'Identical labels, distinct values' : '同名选项' }}</app-type>
    <SameLabelDemo />
  </section>

  <section data-demo="value-mapping">
    <app-type>{{ english ? 'Labels and values' : '标签与绑定值' }}</app-type>
    <DemoValueMapping />
  </section>

  <section data-demo="group-spacing">
    <app-type>{{ english ? 'Group spacing' : '分组间距' }}</app-type>
    <GroupSpacingDemo />
  </section>

  <section data-demo="options-review">
    <app-type>{{ english ? 'options-review' : '子组件选项与分组' }}</app-type>
    <OptionsReviewDemo />
  </section>

  <section data-demo="options">
    <app-type>{{ english ? 'Option data' : '选项数据' }}</app-type>
    <DemoOptions />
  </section>

  <section data-demo="field-names">
    <app-type>{{ english ? 'Field mapping' : '字段映射' }}</app-type>
    <DemoFieldNames />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="search-and-filtering">
    <span lang="zh-CN">搜索与过滤</span>
    <span lang="en-US">Search and filtering</span>
  </h2>

  <section data-demo="search-matching">
    <app-type>搜索匹配规则 / Search matching</app-type>
    <SearchMatchingDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-dropdown-customization">
    <span lang="zh-CN">内容与下拉定制</span>
    <span lang="en-US">Content and dropdown customization</span>
  </h2>

  <section data-demo="custom-icons">
    <app-type>{{ english ? 'Custom icons' : '自定义图标' }}</app-type>
    <DemoCustomIcons />
  </section>

  <section data-demo="dialog">
    <app-type>{{ english ? 'Overlay presentations' : '弹层与阅读展示' }}</app-type>
    <DialogDemo />
  </section>

  <section data-demo="popup">
    <app-type>{{ english ? 'Overlay presentations' : '弹层与阅读展示' }}</app-type>
    <PopupDemo />
  </section>

  <section data-demo="slots-review">
    <app-type>{{ english ? 'slots-review' : '复杂插槽组合' }}</app-type>
    <SlotsReviewDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="value-model-and-linked-fields">
    <span lang="zh-CN">值模型与联动</span>
    <span lang="en-US">Value model and linked fields</span>
  </h2>

  <section data-demo="selection-data-flow">
    <app-type>{{ english ? 'Candidate highlighting and form data flow' : '候选高亮与表单数据流' }}</app-type>
    <SelectionDataFlow />
  </section>

  <section data-demo="empty-value">
    <app-type>{{ english ? 'Empty recognition and clear output' : '空值识别与清空输出' }}</app-type>
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">配置清空后的值</span><span lang="en-US">Configuring the clear result</span>
    </h3>
    <GroupedEmptyValueDemo />
  </section>

  <section data-demo="clearable">
    <app-type>{{ english ? 'Clearing' : '清除选择' }}</app-type>
    <DemoClearable />
  </section>

  <section data-demo="state-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">交互状态对比</span><span lang="en-US">Interaction state comparison</span>
    </h3>
    <OrganizedStateLab />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-data-and-search">
    <span lang="zh-CN">异步数据与搜索</span>
    <span lang="en-US">Async data and search</span>
  </h2>

  <section data-demo="loading">
    <app-type>{{ english ? 'Loading' : '加载状态' }}</app-type>
    <LoadingDemo />
  </section>

  <section data-demo="async-devices">
    <app-type>{{ english ? 'Async device labels' : '异步设备与 ID 回显' }}</app-type>
    <AsyncDevicesEnglishDemo v-if="english" />
    <AsyncDevicesDemo v-else />
  </section>

  <section data-demo="async-source">
    <app-type>{{ english ? 'Reusable async source' : '共用异步数据源' }}</app-type>
    <AsyncSourceDemo />
  </section>

  <section data-demo="async-data"><ReviewRequestedDemo /></section>

  <h2 class="mobile-demo-group-heading" data-demo-group="configuration-and-lifecycle">
    <span lang="zh-CN">配置与生命周期</span>
    <span lang="en-US">Configuration and lifecycle</span>
  </h2>

  <section data-demo="passthrough-options"><app-type>透传配置边界</app-type><PassthroughOptionsDemo /></section>

  <section data-demo="scheduler-lifecycle">
    <app-type>{{ english ? 'Interaction Scheduling Lifecycle' : '交互调度生命周期' }}</app-type>
    <SchedulerLifecycleDemo />
  </section>

  <section data-demo="thumb-lifecycle">
    <app-type>{{ english ? 'thumb-lifecycle' : 'Thumb drag lifecycle / 滑块拖动生命周期' }}</app-type>
    <ThumbLifecycleDemo />
  </section>

  <section data-demo="scrollbar-lifecycle">
    <app-type>{{ english ? 'scrollbar-lifecycle' : 'Scrollbar consumer lifecycle / 滚动条消费者生命周期' }}</app-type>
    <ScrollbarLifecycleDemo />
  </section>

  <section data-demo="open-trigger-target">
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">复制与编辑</span><span lang="en-US">Copying and editing</span>
    </h3>
    <GroupedOpenTriggerTargetDemo />
  </section>
</template>
