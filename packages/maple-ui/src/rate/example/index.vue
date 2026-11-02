<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomRatingIconSizeAndGapDemo from './demos/custom-rating-icon-size-and-gap.vue'
import CustomRatingIconStyleDemo from './demos/custom-rating-icon-style.vue'
import DisabledAndReadonlyDemo from './demos/disabled-and-readonly.vue'
import HalfStarDemo from './demos/half-star.vue'
import KeyboardEnDemo from './demos/keyboard.en-US.vue'
import KeyboardDemo from './demos/keyboard.vue'
import ListenEventDemo from './demos/listen-event.vue'
import SymbolsEnDemo from './demos/sizes-and-symbols.en-US.vue'
import SymbolsDemo from './demos/sizes-and-symbols.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import ContentValueRulesComparison from './demos/value-rules-comparison.vue'

onThemeChange()
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="rate">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="disabled-and-readonly">
    <app-type>{{ english ? 'Disabled And Readonly' : '禁用与只读' }}</app-type>
    <DisabledAndReadonlyDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="sizes-and-symbols">
    <app-type>{{ english ? 'sizes-and-symbols' : '尺寸与符号' }}</app-type>
    <SymbolsEnDemo v-if="english" /><SymbolsDemo v-else />
  </section>

  <section data-demo="custom-rating-icon-size-and-gap">
    <app-type>{{ english ? 'Customize Rating Icon Size And Gap' : '自定义评分图标尺寸与间隔' }}</app-type>
    <CustomRatingIconSizeAndGapDemo />
  </section>

  <section data-demo="half-star">
    <app-type>{{ english ? 'Allow Half Rating' : '使用半星' }}</app-type>
    <HalfStarDemo />
  </section>

  <section data-demo="value-rules-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">评分总数与清除</span><span lang="en-US">Rating count and clearing</span>
    </h3>
    <ContentValueRulesComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-rating-icon-style">
    <app-type>{{ english ? 'Customize Rating Icon Style' : '自定义评分图标样式' }}</app-type>
    <CustomRatingIconStyleDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>

  <section data-demo="keyboard">
    <app-type>{{ english ? 'keyboard' : '键盘与状态' }}</app-type>
    <KeyboardEnDemo v-if="english" /><KeyboardDemo v-else />
  </section>

  <section data-demo="listen-event">
    <app-type>{{ english ? 'Listen Event' : '监听事件' }}</app-type>
    <ListenEventDemo />
  </section>
</template>
