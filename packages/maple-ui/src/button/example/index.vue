<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoAutoLoading from './demos/auto-loading.vue'
import DemoBasic from './demos/basic.vue'
import DemoBlock from './demos/block.vue'
import DemoButtonGroup from './demos/button-group.vue'
import DemoCustomColor from './demos/custom-color.vue'
import DemoDisabled from './demos/disabled.vue'
import DemoLoading from './demos/loading.vue'
import DemoNativeEvents from './demos/native-events.vue'
import DemoRound from './demos/round.vue'
import DemoSize from './demos/size.vue'
import DemoStacked from './demos/stacked.vue'
import DemoVariants from './demos/variants.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Eight statuses' : '八种主题色' }}</app-type>
    <DemoBasic />
  </section>
  <section data-demo="variants">
    <app-type>{{ english ? 'Four variants' : '四种变体' }}</app-type>
    <DemoVariants />
  </section>
  <section data-demo="size">
    <app-type>{{ english ? 'Five sizes' : '五档尺寸' }}</app-type>
    <DemoSize />
  </section>
  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled buttons and links' : '禁用与链接拦截' }}</app-type>
    <DemoDisabled />
  </section>
  <section data-demo="loading">
    <app-type>{{ english ? 'Loading layouts and animations' : '加载布局与动画' }}</app-type>
    <DemoLoading />
  </section>
  <section data-demo="auto-loading">
    <app-type>{{ english ? 'Sync, async and rejection recovery' : '同步、异步与失败恢复' }}</app-type>
    <DemoAutoLoading />
  </section>
  <section data-demo="block">
    <app-type>{{ english ? 'Block buttons' : '块级按钮' }}</app-type>
    <DemoBlock />
  </section>
  <section data-demo="custom-color">
    <app-type>{{ english ? 'Colors, ripple and elevation' : '颜色、水波与阴影' }}</app-type>
    <DemoCustomColor />
  </section>
  <section data-demo="round">
    <app-type>{{ english ? 'Icon slots and round buttons' : '图标插槽与圆形按钮' }}</app-type>
    <DemoRound />
  </section>
  <section data-demo="stacked">
    <app-type>{{ english ? 'Stacked icon and text' : '图标文字堆叠' }}</app-type>
    <DemoStacked />
  </section>
  <section data-demo="button-group">
    <app-type>{{ english ? 'Group inheritance and overrides' : '按钮组继承与覆盖' }}</app-type>
    <DemoButtonGroup />
  </section>
  <section data-demo="native-events">
    <app-type>{{ english ? 'Native form, focus and touch events' : '原生表单、焦点与触摸事件' }}</app-type>
    <DemoNativeEvents />
  </section>
</template>
