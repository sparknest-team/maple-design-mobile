<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="fab">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <BasicDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="status">
    <app-type>{{ english ? 'Theme Color Button' : '主题色按钮' }}</app-type>
    <StatusDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-positioning">
    <span lang="zh-CN">外观与定位</span>
    <span lang="en-US">Appearance and positioning</span>
  </h2>

  <section data-demo="position">
    <app-type>{{ english ? 'Trigger Position' : '触发器位置' }}</app-type>
    <PositionDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="actions-and-interaction">
    <span lang="zh-CN">动作与交互</span>
    <span lang="en-US">Actions and interaction</span>
  </h2>

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
</template>
