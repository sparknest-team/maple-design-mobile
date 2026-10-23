<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import DemoBasic from './demos/basic.vue'
import DemoCustomColor from './demos/custom-color.vue'
import DemoCustomIcon from './demos/custom-icon.vue'
import DemoCustomText from './demos/custom-text.vue'
import DemoCustomValue from './demos/custom-value.vue'
import DemoCustom from './demos/custom.vue'
import DemoDisabled from './demos/disabled.vue'
import DemoEvents from './demos/events.vue'
import DemoLoading from './demos/loading.vue'
import DemoReadonly from './demos/readonly.vue'
import DemoSize from './demos/size.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import DemoSwitchInterception from './demos/switch-interception.vue'
import DemoType from './demos/type.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Controlled and default value' : '双向绑定与默认值' }}</app-type
    ><DemoBasic />
  </section>
  <section data-demo="size">
    <app-type>{{ english ? 'Three sizes' : '三种尺寸' }}</app-type
    ><DemoSize />
  </section>
  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type
    ><DemoDisabled />
  </section>
  <section data-demo="readonly">
    <app-type>{{ english ? 'Read only' : '只读' }}</app-type
    ><DemoReadonly />
  </section>
  <section data-demo="type">
    <app-type>{{ english ? 'Four variants' : '四种变体' }}</app-type
    ><DemoType />
  </section>
  <section data-demo="loading">
    <app-type>{{ english ? 'Loading' : '加载中' }}</app-type
    ><DemoLoading />
  </section>
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
  <section data-demo="custom-value">
    <app-type>{{ english ? 'Custom values and events' : '自定义值与事件' }}</app-type
    ><DemoCustomValue />
  </section>
  <section data-demo="switch-interception">
    <app-type>{{ english ? 'Async allow, deny and rejection' : '异步允许、阻止与异常' }}</app-type
    ><DemoSwitchInterception />
  </section>
  <section data-demo="events">
    <app-type>{{ english ? 'Focus and event order' : '焦点与事件顺序' }}</app-type>
    <DemoEvents />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
