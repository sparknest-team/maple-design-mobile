<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import DemoAccordion from './demos/accordion.vue'
import DemoBasic from './demos/basic.vue'
import ContentBorderComparison from './demos/border-comparison.vue'
import DemoCustom from './demos/custom.vue'
import DemoDestroy from './demos/destroy.vue'
import DemoDisabled from './demos/disabled.vue'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="collapse">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <DemoBasic />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DemoDisabled />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="nested">
    <app-type>{{ english ? 'Nested panels' : '嵌套面板' }}</app-type>
    <DemoNested />
  </section>

  <section data-demo="offset">
    <app-type>{{ english ? 'Expanded offset' : '展开间距' }}</app-type>
    <DemoOffset />
  </section>

  <section data-demo="icon-position">
    <app-type>{{ english ? 'Icon position' : '展开图标位置' }}</app-type>
    <DemoIconPosition />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="accordion">
    <app-type>{{ english ? 'Accordion' : '手风琴模式' }}</app-type>
    <DemoAccordion />
  </section>

  <section data-demo="border-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">边框与分隔线</span><span lang="en-US">Borders and dividers</span>
    </h3>
    <ContentBorderComparison />
  </section>

  <section data-demo="extra">
    <app-type>{{ english ? 'Extra' : '额外节点' }}</app-type>
    <DemoExtra />
  </section>

  <section data-demo="expand-icon">
    <app-type>{{ english ? 'Expand icon' : '展开图标' }}</app-type>
    <DemoExpandIcon />
  </section>

  <section data-demo="destroy">
    <app-type>{{ english ? 'Destroy on hide' : '隐藏时销毁' }}</app-type>
    <DemoDestroy />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom">
    <app-type>{{ english ? 'Custom style' : '自定义样式' }}</app-type>
    <DemoCustom />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="toggle-all">
    <app-type>{{ english ? 'Toggle all' : '切换全部' }}</app-type>
    <DemoToggleAll />
  </section>
</template>
