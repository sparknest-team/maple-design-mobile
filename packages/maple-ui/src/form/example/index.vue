<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import AsyncFieldsDemo from './demos/async-fields.vue'
import AsyncRaceDemo from './demos/async-race.vue'
import AutoLabelWidthDemo from './demos/auto-label-width.vue'
import ClearTriggerDemo from './demos/clear-trigger.vue'
import ControllerDemo from './demos/controller.vue'
import CrossFieldDemo from './demos/cross-field.vue'
import CustomControlDemo from './demos/custom-control.vue'
import DecorationDemo from './demos/decoration.vue'
import EnAsyncFieldsDemo from './demos/en-US/async-fields.vue'
import EnAsyncRaceDemo from './demos/en-US/async-race.vue'
import EnAutoLabelWidthDemo from './demos/en-US/auto-label-width.vue'
import EnClearTriggerDemo from './demos/en-US/clear-trigger.vue'
import EnControllerDemo from './demos/en-US/controller.vue'
import EnCrossFieldDemo from './demos/en-US/cross-field.vue'
import EnCustomControlDemo from './demos/en-US/custom-control.vue'
import EnDecorationDemo from './demos/en-US/decoration.vue'
import EnEventsDemo from './demos/en-US/events.vue'
import EnExampleDemo from './demos/en-US/example.vue'
import EnFixedLabelWidthDemo from './demos/en-US/fixed-label-width.vue'
import EnFloatingPlaceholderDemo from './demos/en-US/floating-placeholder.vue'
import EnHelpExtraDemo from './demos/en-US/help-extra.vue'
import EnHorizontalLayoutDemo from './demos/en-US/horizontal-layout.vue'
import EnLabelColumnsDemo from './demos/en-US/label-columns.vue'
import EnPresentationStatusDemo from './demos/en-US/presentation-status.vue'
import EnVerticalLabelDemo from './demos/en-US/vertical-label.vue'
import EventsDemo from './demos/events.vue'
import ExampleDemo from './demos/example.vue'
import DemoFieldChoice from './demos/field-choice.vue'
import DemoFieldComponents from './demos/field-components.vue'
import DemoFieldDate from './demos/field-date.vue'
import DemoFieldPanelActions from './demos/field-panel-actions.vue'
import FieldPresentationDemo from './demos/field-presentation.vue'
import OrganizedFieldRangeBoundaries from './demos/field-range-boundaries.vue'
import DemoFieldRating from './demos/field-rating.vue'
import DemoFieldSelection from './demos/field-selection.vue'
import DemoFieldTime from './demos/field-time.vue'
import DemoFieldTree from './demos/field-tree.vue'
import DemoFieldUpload from './demos/field-upload.vue'
import FixedLabelWidthDemo from './demos/fixed-label-width.vue'
import FloatingPlaceholderDemo from './demos/floating-placeholder.vue'
import HelpExtraDemo from './demos/help-extra.vue'
import HorizontalLayoutDemo from './demos/horizontal-layout.vue'
import LabelColumnsDemo from './demos/label-columns.vue'
import PresentationState from './demos/presentation-state.vue'
import PresentationStatusDemo from './demos/presentation-status.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import VerticalLabelDemo from './demos/vertical-label.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="example">
    <app-type>{{ english ? 'Basic Form' : '基础表单' }}</app-type>
    <EnExampleDemo v-if="english" />
    <ExampleDemo v-else />
  </section>
  <section data-demo="controller">
    <app-type>{{ english ? 'Form Controller' : '表单控制' }}</app-type>
    <EnControllerDemo v-if="english" />
    <ControllerDemo v-else />
  </section>
  <section data-demo="events">
    <app-type>{{ english ? 'Form Events' : '表单事件' }}</app-type>
    <EnEventsDemo v-if="english" />
    <EventsDemo v-else />
  </section>
  <section data-demo="clear-trigger">
    <app-type>{{ english ? 'Validate on clear' : '清空时校验' }}</app-type>
    <EnClearTriggerDemo v-if="english" />
    <ClearTriggerDemo v-else />
  </section>
  <section data-demo="label-columns">
    <app-type>{{ english ? 'Responsive label columns' : '响应式标签栅格' }}</app-type>
    <EnLabelColumnsDemo v-if="english" />
    <LabelColumnsDemo v-else />
  </section>
  <section data-demo="fixed-label-width">
    <app-type>{{ english ? 'Fixed label width' : '固定标签宽度' }}</app-type>
    <EnFixedLabelWidthDemo v-if="english" />
    <FixedLabelWidthDemo v-else />
  </section>
  <section data-demo="auto-label-width">
    <app-type>{{ english ? 'Automatic label width' : '自动标签宽度' }}</app-type>
    <EnAutoLabelWidthDemo v-if="english" />
    <AutoLabelWidthDemo v-else />
  </section>
  <section data-demo="cross-field">
    <app-type>{{ english ? 'Cross-field validation and native submit' : '跨字段校验与原生提交' }}</app-type>
    <EnCrossFieldDemo v-if="english" /><CrossFieldDemo v-else />
  </section>
  <section data-demo="field-components">
    <app-type>{{ english ? 'Text and numeric fields' : '文本与数值字段' }}</app-type
    ><DemoFieldComponents />
  </section>
  <section data-demo="field-choice">
    <app-type>{{ english ? 'Boolean and choice fields' : '开关与勾选字段' }}</app-type
    ><DemoFieldChoice />
  </section>
  <section data-demo="field-selection">
    <app-type>{{ english ? 'Selection fields' : '下拉选择字段' }}</app-type
    ><DemoFieldSelection />
  </section>
  <section data-demo="field-tree">
    <app-type>{{ english ? 'Hierarchical fields' : '层级选择字段' }}</app-type
    ><DemoFieldTree />
  </section>
  <section data-demo="field-date">
    <app-type>{{ english ? 'Date fields' : '日期字段' }}</app-type
    ><DemoFieldDate />
  </section>
  <section data-demo="field-time">
    <app-type>{{ english ? 'Time fields' : '时间字段' }}</app-type
    ><DemoFieldTime />
  </section>
  <section data-demo="field-rating">
    <app-type>{{ english ? 'Progress and rating fields' : '进度与评分字段' }}</app-type
    ><DemoFieldRating />
  </section>
  <section data-demo="field-upload">
    <app-type>{{ english ? 'Attachment fields' : '附件字段' }}</app-type
    ><DemoFieldUpload />
  </section>
  <section data-demo="field-panel-actions">
    <app-type>{{ english ? 'Standalone panel actions' : '独立面板操作区' }}</app-type
    ><DemoFieldPanelActions />
  </section>
  <section data-demo="decoration">
    <app-type>{{ english ? 'Label and content decoration' : '标签与内容装饰' }}</app-type>
    <EnDecorationDemo v-if="english" /><DecorationDemo v-else />
  </section>
  <section data-demo="presentation-state">
    <app-type>{{ english ? 'Disabled, readonly and asynchronous confirmation' : '禁用、只读与异步确认' }}</app-type
    ><PresentationState />
  </section>
  <section data-demo="field-range-boundaries">
    <app-type>{{ english ? 'Cross-page range boundaries' : '日期范围的跨页边界' }}</app-type>
    <OrganizedFieldRangeBoundaries />
  </section>
  <section data-demo="presentation-status">
    <app-type>{{ english ? 'Presentation status' : '校验展示状态' }}</app-type>
    <EnPresentationStatusDemo v-if="english" /><PresentationStatusDemo v-else />
  </section>
  <section data-demo="async-fields">
    <app-type>{{ english ? 'Independent async fields' : '多字段异步聚合' }}</app-type>
    <EnAsyncFieldsDemo v-if="english" /><AsyncFieldsDemo v-else />
  </section>
  <section data-demo="async-race">
    <app-type>{{ english ? 'Async validation response order' : '异步校验的返回顺序' }}</app-type>
    <EnAsyncRaceDemo v-if="english" /><AsyncRaceDemo v-else />
  </section>
  <section data-demo="vertical-label">
    <app-type>{{ english ? 'Outer Label (aligned with Cedar)' : '外置标签（推荐与 Cedar 对齐）' }}</app-type>
    <EnVerticalLabelDemo v-if="english" />
    <VerticalLabelDemo v-else />
  </section>
  <section data-demo="horizontal-layout">
    <app-type>{{ english ? 'Horizontal Layout' : '左右布局' }}</app-type>
    <EnHorizontalLayoutDemo v-if="english" />
    <HorizontalLayoutDemo v-else />
  </section>
  <section data-demo="floating-placeholder">
    <app-type>{{ english ? 'Floating Placeholder (no label)' : '浮动 Placeholder（不写 label）' }}</app-type>
    <EnFloatingPlaceholderDemo v-if="english" />
    <FloatingPlaceholderDemo v-else />
  </section>
  <section data-demo="help-extra">
    <app-type>{{ english ? 'Help and Extra Content' : '帮助与额外信息' }}</app-type>
    <EnHelpExtraDemo v-if="english" />
    <HelpExtraDemo v-else />
  </section>

  <section data-demo="custom-control">
    <app-type>{{ english ? 'Custom Form Control' : '自定义表单控件' }}</app-type>
    <EnCustomControlDemo v-if="english" />
    <CustomControlDemo v-else />
  </section>
  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>
  <section data-demo="field-presentation"><app-type>字段展示与确认提交</app-type><FieldPresentationDemo /></section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
