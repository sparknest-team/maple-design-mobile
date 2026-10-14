<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AutoLabelWidthDemo from './demos/auto-label-width.vue'
import ClearTriggerDemo from './demos/clear-trigger.vue'
import ControllerDemo from './demos/controller.vue'
import CustomControlDemo from './demos/custom-control.vue'
import DecorationDemo from './demos/decoration.vue'
import EnAutoLabelWidthDemo from './demos/en-US/auto-label-width.vue'
import EnClearTriggerDemo from './demos/en-US/clear-trigger.vue'
import EnControllerDemo from './demos/en-US/controller.vue'
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
import FixedLabelWidthDemo from './demos/fixed-label-width.vue'
import FloatingPlaceholderDemo from './demos/floating-placeholder.vue'
import HelpExtraDemo from './demos/help-extra.vue'
import HorizontalLayoutDemo from './demos/horizontal-layout.vue'
import LabelColumnsDemo from './demos/label-columns.vue'
import PresentationStatusDemo from './demos/presentation-status.vue'
import VerticalLabelDemo from './demos/vertical-label.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="decoration">
    <app-type>{{ english ? 'Label and content decoration' : '标签与内容装饰' }}</app-type>
    <EnDecorationDemo v-if="english" /><DecorationDemo v-else />
  </section>
  <section data-demo="presentation-status">
    <app-type>{{ english ? 'Presentation status' : '校验展示状态' }}</app-type>
    <EnPresentationStatusDemo v-if="english" /><PresentationStatusDemo v-else />
  </section>
  <section data-demo="auto-label-width">
    <app-type>{{ english ? 'Automatic label width' : '自动标签宽度' }}</app-type>
    <EnAutoLabelWidthDemo v-if="english" />
    <AutoLabelWidthDemo v-else />
  </section>
  <section data-demo="fixed-label-width">
    <app-type>{{ english ? 'Fixed label width' : '固定标签宽度' }}</app-type>
    <EnFixedLabelWidthDemo v-if="english" />
    <FixedLabelWidthDemo v-else />
  </section>
  <section data-demo="label-columns">
    <app-type>{{ english ? 'Responsive label columns' : '响应式标签栅格' }}</app-type>
    <EnLabelColumnsDemo v-if="english" />
    <LabelColumnsDemo v-else />
  </section>
  <section data-demo="example">
    <app-type>{{ english ? 'Basic form' : '基础表单' }}</app-type>
    <EnExampleDemo v-if="english" />
    <ExampleDemo v-else />
  </section>
  <section data-demo="controller">
    <app-type>{{ english ? 'Form controller' : '表单控制' }}</app-type>
    <EnControllerDemo v-if="english" />
    <ControllerDemo v-else />
  </section>
  <section data-demo="events">
    <app-type>{{ english ? 'Form events' : '表单事件' }}</app-type>
    <EnEventsDemo v-if="english" />
    <EventsDemo v-else />
  </section>
  <section data-demo="clear-trigger">
    <app-type>{{ english ? 'Validate on clear' : '清空时校验' }}</app-type>
    <EnClearTriggerDemo v-if="english" />
    <ClearTriggerDemo v-else />
  </section>
  <section data-demo="custom-control">
    <app-type>{{ english ? 'Custom form control' : '自定义表单控件' }}</app-type>
    <EnCustomControlDemo v-if="english" />
    <CustomControlDemo v-else />
  </section>
  <section data-demo="vertical-label">
    <app-type>{{ english ? 'Outer label' : '外置标签' }}</app-type>
    <EnVerticalLabelDemo v-if="english" />
    <VerticalLabelDemo v-else />
  </section>
  <section data-demo="horizontal-layout">
    <app-type>{{ english ? 'Horizontal layout' : '左右布局' }}</app-type>
    <EnHorizontalLayoutDemo v-if="english" />
    <HorizontalLayoutDemo v-else />
  </section>
  <section data-demo="floating-placeholder">
    <app-type>{{ english ? 'Floating placeholder' : '浮动 Placeholder' }}</app-type>
    <EnFloatingPlaceholderDemo v-if="english" />
    <FloatingPlaceholderDemo v-else />
  </section>
  <section data-demo="help-extra">
    <app-type>{{ english ? 'Help and extra content' : '帮助与额外信息' }}</app-type>
    <EnHelpExtraDemo v-if="english" />
    <HelpExtraDemo v-else />
  </section>
</template>
