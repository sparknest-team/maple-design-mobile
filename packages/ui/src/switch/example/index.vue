<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import DemoBasic from './demos/basic.vue'
import DemoCustomColor from './demos/custom-color.vue'
import DemoCustomIcon from './demos/custom-icon.vue'
import DemoCustomText from './demos/custom-text.vue'
import DemoCustomValue from './demos/custom-value.vue'
import DemoCustom from './demos/custom.vue'
import DemoEvents from './demos/events.vue'
import DemoLoading from './demos/loading.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import DemoSwitchInterception from './demos/switch-interception.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="switch">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Controlled and default value' : '双向绑定与默认值' }}</app-type
    ><DemoBasic />
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

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-color">
    <app-type>{{ english ? 'Custom colors' : '自定义颜色' }}</app-type
    ><DemoCustomColor />
  </section>

  <section data-demo="custom-text">
    <app-type>{{ english ? 'Custom text' : '自定义文字' }}</app-type
    ><DemoCustomText />
  </section>

  <section data-demo="custom-icon">
    <app-type>{{ english ? 'Custom icons' : '自定义图标' }}</app-type
    ><DemoCustomIcon />
  </section>

  <section data-demo="custom">
    <app-type>{{ english ? 'Ripple and handle elevation' : '水波与滑块阴影' }}</app-type
    ><DemoCustom />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="state-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">交互状态对比</span><span lang="en-US">Interaction state comparison</span>
    </h3>
    <OrganizedStateLab />
  </section>

  <section data-demo="loading">
    <app-type>{{ english ? 'Loading' : '加载中' }}</app-type
    ><DemoLoading />
  </section>

  <section data-demo="events">
    <app-type>{{ english ? 'Focus and event order' : '焦点与事件顺序' }}</app-type>
    <DemoEvents />
  </section>

  <section data-demo="custom-value">
    <app-type>{{ english ? 'Custom values and events' : '自定义值与事件' }}</app-type
    ><DemoCustomValue />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-and-dynamic-data">
    <span lang="zh-CN">异步与动态数据</span>
    <span lang="en-US">Async and dynamic data</span>
  </h2>

  <section data-demo="switch-interception">
    <app-type>{{ english ? 'Async allow, deny and rejection' : '异步允许、阻止与异常' }}</app-type
    ><DemoSwitchInterception />
  </section>
</template>
