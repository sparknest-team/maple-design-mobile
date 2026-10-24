<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoAccordion from './demos/accordion.vue'
import DemoApiReview from './demos/api-review.vue'
import DemoBasic from './demos/basic.vue'
import DemoBorderLess from './demos/border-less.vue'
import DemoCustom from './demos/custom.vue'
import DemoDestroy from './demos/destroy.vue'
import DemoDisabled from './demos/disabled.vue'
import DemoDivider from './demos/divider.vue'
import DemoExpandIcon from './demos/expand-icon.vue'
import DemoExtra from './demos/extra.vue'
import DemoIconPosition from './demos/icon-position.vue'
import DemoNested from './demos/nested.vue'
import DemoOffset from './demos/offset.vue'
import DemoToggleAll from './demos/toggle-all.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>
<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <DemoBasic />
  </section>
  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DemoDisabled />
  </section>
  <section data-demo="accordion">
    <app-type>{{ english ? 'Accordion' : '手风琴模式' }}</app-type>
    <DemoAccordion />
  </section>
  <section data-demo="nested">
    <app-type>{{ english ? 'Nested panels' : '嵌套面板' }}</app-type>
    <DemoNested />
  </section>
  <section data-demo="border-less">
    <app-type>{{ english ? 'Borderless' : '无边框模式' }}</app-type>
    <DemoBorderLess />
  </section>
  <section data-demo="divider">
    <app-type>{{ english ? 'Divider' : '分割线' }}</app-type>
    <DemoDivider />
  </section>
  <section data-demo="offset">
    <app-type>{{ english ? 'Expanded offset' : '展开间距' }}</app-type>
    <DemoOffset />
  </section>
  <section data-demo="extra">
    <app-type>{{ english ? 'Extra' : '额外节点' }}</app-type>
    <DemoExtra />
  </section>
  <section data-demo="expand-icon">
    <app-type>{{ english ? 'Expand icon' : '展开图标' }}</app-type>
    <DemoExpandIcon />
  </section>
  <section data-demo="custom">
    <app-type>{{ english ? 'Custom style' : '自定义样式' }}</app-type>
    <DemoCustom />
  </section>
  <section data-demo="icon-position">
    <app-type>{{ english ? 'Icon position' : '展开图标位置' }}</app-type>
    <DemoIconPosition />
  </section>
  <section data-demo="destroy">
    <app-type>{{ english ? 'Destroy on hide' : '隐藏时销毁' }}</app-type>
    <DemoDestroy />
  </section>
  <section data-demo="toggle-all">
    <app-type>{{ english ? 'Toggle all' : '切换全部' }}</app-type>
    <DemoToggleAll />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
