<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicDemo from './demos/basic.vue'
import ControlledDemo from './demos/controlled.vue'
import CustomTriggerDemo from './demos/custom-trigger.vue'
import DirectionDemo from './demos/direction.vue'
import DisabledDemo from './demos/disabled.vue'
import DragDemo from './demos/drag.vue'
import PositionDemo from './demos/position.vue'
import StatusDemo from './demos/status.vue'
import TriggerDemo from './demos/trigger.vue'
import VisibilityDemo from './demos/visibility.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <BasicDemo />
  </section>

  <section data-demo="status">
    <app-type>{{ english ? 'Theme Color Button' : '主题色按钮' }}</app-type>
    <StatusDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="position">
    <app-type>{{ english ? 'Trigger Position' : '触发器位置' }}</app-type>
    <PositionDemo />
  </section>

  <section data-demo="trigger">
    <app-type>{{ english ? 'Trigger Method' : '触发方式' }}</app-type>
    <TriggerDemo />
  </section>

  <section data-demo="direction">
    <app-type>{{ english ? 'Action Menu Popup Direction' : '动作菜单弹出方向' }}</app-type>
    <DirectionDemo />
  </section>

  <section data-demo="drag">
    <app-type>{{ english ? 'Drag' : '开启拖拽' }}</app-type>
    <DragDemo />
  </section>

  <section data-demo="visibility">
    <app-type>{{ english ? 'Trigger Show/Hide' : '触发器显示/隐藏' }}</app-type>
    <VisibilityDemo />
  </section>

  <section data-demo="controlled">
    <app-type>{{ english ? 'Action Menu Expand/Collapse' : '动作菜单展开/收起' }}</app-type>
    <ControlledDemo />
  </section>

  <section data-demo="custom-trigger">
    <app-type>{{ english ? 'Custom Trigger' : '自定义触发器' }}</app-type>
    <CustomTriggerDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
