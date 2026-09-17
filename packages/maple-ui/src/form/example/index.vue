<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import ControllerDemo from './demos/controller.vue'
import CustomControlDemo from './demos/custom-control.vue'
import EnControllerDemo from './demos/en-US/controller.vue'
import EnCustomControlDemo from './demos/en-US/custom-control.vue'
import EnEventsDemo from './demos/en-US/events.vue'
import EnExampleDemo from './demos/en-US/example.vue'
import EnFloatingPlaceholderDemo from './demos/en-US/floating-placeholder.vue'
import EnHelpExtraDemo from './demos/en-US/help-extra.vue'
import EnHorizontalLayoutDemo from './demos/en-US/horizontal-layout.vue'
import EnVerticalLabelDemo from './demos/en-US/vertical-label.vue'
import EventsDemo from './demos/events.vue'
import ExampleDemo from './demos/example.vue'
import FloatingPlaceholderDemo from './demos/floating-placeholder.vue'
import HelpExtraDemo from './demos/help-extra.vue'
import HorizontalLayoutDemo from './demos/horizontal-layout.vue'
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
