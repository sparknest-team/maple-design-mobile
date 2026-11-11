<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import AsyncFieldsDemo from './demos/async-fields.vue'
import AsyncRaceDemo from './demos/async-race.vue'
import ChangeSourceDemo from './demos/change-source.vue'
import ClearTriggerDemo from './demos/clear-trigger.vue'
import ControllerDemo from './demos/controller.vue'
import CrossFieldDemo from './demos/cross-field.vue'
import CustomControlDemo from './demos/custom-control.vue'
import DecorationDemo from './demos/decoration.vue'
import DemoEmptyText from './demos/empty-text.vue'
import DemoEmptyValuesValidation from './demos/empty-values-validation.vue'
import EnAsyncFieldsDemo from './demos/en-US/async-fields.vue'
import EnAsyncRaceDemo from './demos/en-US/async-race.vue'
import EnClearTriggerDemo from './demos/en-US/clear-trigger.vue'
import EnControllerDemo from './demos/en-US/controller.vue'
import EnCrossFieldDemo from './demos/en-US/cross-field.vue'
import EnCustomControlDemo from './demos/en-US/custom-control.vue'
import EnDecorationDemo from './demos/en-US/decoration.vue'
import DemoEmptyTextEn from './demos/en-US/empty-text.vue'
import DemoEmptyValuesValidationEn from './demos/en-US/empty-values-validation.vue'
import EnEventsDemo from './demos/en-US/events.vue'
import EnExampleDemo from './demos/en-US/example.vue'
import EnFloatingPlaceholderDemo from './demos/en-US/floating-placeholder.vue'
import EnHelpExtraDemo from './demos/en-US/help-extra.vue'
import EnHorizontalLayoutDemo from './demos/en-US/horizontal-layout.vue'
import ContentLabelWidthComparisonEn from './demos/en-US/label-width-comparison.vue'
import EnPresentationStatusDemo from './demos/en-US/presentation-status.vue'
import EnVerticalLabelDemo from './demos/en-US/vertical-label.vue'
import EventsDemo from './demos/events.vue'
import ExampleDemo from './demos/example.vue'
import DemoFieldChoice from './demos/field-choice.vue'
import DemoFieldComponents from './demos/field-components.vue'
import DemoFieldDate from './demos/field-date.vue'
import FieldIdentityDemo from './demos/field-identity.vue'
import DemoFieldPanelActions from './demos/field-panel-actions.vue'
import FieldPresentationDemo from './demos/field-presentation.vue'
import OrganizedFieldRangeBoundaries from './demos/field-range-boundaries.vue'
import DemoFieldRating from './demos/field-rating.vue'
import DemoFieldSelection from './demos/field-selection.vue'
import DemoFieldTime from './demos/field-time.vue'
import DemoFieldTree from './demos/field-tree.vue'
import DemoFieldUpload from './demos/field-upload.vue'
import FloatingPlaceholderDemo from './demos/floating-placeholder.vue'
import HelpExtraDemo from './demos/help-extra.vue'
import HorizontalLayoutDemo from './demos/horizontal-layout.vue'
import ContentLabelWidthComparison from './demos/label-width-comparison.vue'
import LayoutComparison from './demos/layout-comparison.vue'
import PlatformPresentationDemo from './demos/platform-presentation.vue'
import PresentationState from './demos/presentation-state.vue'
import PresentationStatusDemo from './demos/presentation-status.vue'
import SelectionSummaryDemo from './demos/selection-summary.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import SubmitInputsDemo from './demos/submit-inputs.vue'
import ScenarioDemo from './demos/task-workflow.vue'
import VerticalLabelDemo from './demos/vertical-label.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="form">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="example">
    <app-type>{{ english ? 'Basic Form' : '基础表单' }}</app-type>
    <EnExampleDemo v-if="english" />
    <ExampleDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="form-appearance-and-layout">
    <span lang="zh-CN">表单外观与布局</span>
    <span lang="en-US">Form appearance and layout</span>
  </h2>

  <section data-demo="layout-comparison">
    <app-type>{{ english ? 'Layout switching and item overrides' : '布局切换与单项覆盖' }}</app-type>
    <LayoutComparison :english="english" />
  </section>

  <section data-demo="decoration">
    <app-type>{{ english ? 'Label and content decoration' : '标签与内容装饰' }}</app-type>
    <EnDecorationDemo v-if="english" /><DecorationDemo v-else />
  </section>

  <section data-demo="label-width-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">标签宽度方案对比</span><span lang="en-US">Label width strategies</span>
    </h3>
    <component :is="english ? ContentLabelWidthComparisonEn : ContentLabelWidthComparison" />
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

  <h2 class="mobile-demo-group-heading" data-demo-group="fields-and-data-model">
    <span lang="zh-CN">字段与数据模型</span>
    <span lang="en-US">Fields and data model</span>
  </h2>

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

  <section data-demo="selection-summary">
    <app-type>{{ english ? 'Direct / popup selection summaries' : '直接／弹窗编辑的已选区域对照' }}</app-type>
    <SelectionSummaryDemo />
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

  <h2 class="mobile-demo-group-heading" data-demo-group="validation-and-submission">
    <span lang="zh-CN">校验与提交</span>
    <span lang="en-US">Validation and submission</span>
  </h2>

  <section data-demo="cross-field">
    <app-type>{{ english ? 'Cross-field validation and native submit' : '跨字段校验与原生提交' }}</app-type>
    <EnCrossFieldDemo v-if="english" /><CrossFieldDemo v-else />
  </section>

  <section data-demo="clear-trigger">
    <app-type>{{ english ? 'Validate on clear' : '清空时校验' }}</app-type>
    <EnClearTriggerDemo v-if="english" />
    <ClearTriggerDemo v-else />
  </section>

  <section data-demo="empty-values-validation">
    <app-type>{{ english ? 'Empty markers and required validation' : '空值标记与必填校验' }}</app-type>
    <component :is="english ? DemoEmptyValuesValidationEn : DemoEmptyValuesValidation" />
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

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

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

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-control">
    <app-type>{{ english ? 'Custom Form Control' : '自定义表单控件' }}</app-type>
    <EnCustomControlDemo v-if="english" />
    <CustomControlDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="field-presentation-and-interaction">
    <span lang="zh-CN">字段呈现与交互</span>
    <span lang="en-US">Field presentation and interaction</span>
  </h2>

  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>

  <section data-demo="field-presentation"><app-type>字段展示与确认提交</app-type><FieldPresentationDemo /></section>

  <section data-demo="empty-text">
    <app-type>{{ english ? 'Reading placeholders and inheritance' : '阅读空文案与配置继承' }}</app-type>
    <component :is="english ? DemoEmptyTextEn : DemoEmptyText" />
  </section>

  <section data-demo="presentation-status">
    <app-type>{{ english ? 'Presentation status' : '校验展示状态' }}</app-type>
    <EnPresentationStatusDemo v-if="english" /><PresentationStatusDemo v-else />
  </section>

  <section id="platform-presentation" data-demo="platform-presentation">
    <app-type>{{ english ? 'Desktop and mobile presentation' : '桌面与移动的同场景展示' }}</app-type
    ><PlatformPresentationDemo />
  </section>

  <section data-demo="field-panel-actions">
    <app-type>{{ english ? 'Standalone panel actions' : '独立面板操作区' }}</app-type
    ><DemoFieldPanelActions />
  </section>

  <section data-demo="change-source">
    <app-type>{{ english ? 'Confirmation event source' : '确认事件来源' }}</app-type
    ><ChangeSourceDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="dynamic-and-async-fields">
    <span lang="zh-CN">动态与异步字段</span>
    <span lang="en-US">Dynamic and async fields</span>
  </h2>

  <section data-demo="async-fields">
    <app-type>{{ english ? 'Independent async fields' : '多字段异步聚合' }}</app-type>
    <EnAsyncFieldsDemo v-if="english" /><AsyncFieldsDemo v-else />
  </section>

  <section data-demo="presentation-state">
    <app-type>{{ english ? 'Disabled, readonly and asynchronous confirmation' : '禁用、只读与异步确认' }}</app-type
    ><PresentationState />
  </section>

  <section data-demo="async-race">
    <app-type>{{ english ? 'Async validation response order' : '异步校验的返回顺序' }}</app-type>
    <EnAsyncRaceDemo v-if="english" /><AsyncRaceDemo v-else />
  </section>

  <section data-demo="field-range-boundaries">
    <app-type>{{ english ? 'Cross-page range boundaries' : '日期范围的跨页边界' }}</app-type>
    <OrganizedFieldRangeBoundaries />
  </section>

  <section data-demo="submit-inputs">
    <app-type>{{ english ? 'Async submit input ownership' : '异步提交的输入归属' }}</app-type>
    <SubmitInputsDemo />
  </section>

  <section data-demo="field-identity">
    <app-type>{{ english ? 'Dynamic field identity and reset' : '动态字段与重置初值' }}</app-type>
    <FieldIdentityDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="business-workflows">
    <span lang="zh-CN">业务流程</span>
    <span lang="en-US">Business workflows</span>
  </h2>

  <section id="task-workflow" data-demo="task-workflow">
    <h3>巡检任务完整流程</h3>
    <ScenarioDemo />
  </section>
</template>
