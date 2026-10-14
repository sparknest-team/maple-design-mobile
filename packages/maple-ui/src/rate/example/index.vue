<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import ClearableDemo from './demos/clearable.vue'
import CustomRatingIconSizeAndGapDemo from './demos/custom-rating-icon-size-and-gap.vue'
import CustomRatingIconStyleDemo from './demos/custom-rating-icon-style.vue'
import CustomTotalRatingDemo from './demos/custom-total-rating.vue'
import DisabledAndReadonlyDemo from './demos/disabled-and-readonly.vue'
import HalfStarDemo from './demos/half-star.vue'
import KeyboardEnDemo from './demos/keyboard.en-US.vue'
import KeyboardDemo from './demos/keyboard.vue'
import ListenEventDemo from './demos/listen-event.vue'
import SymbolsEnDemo from './demos/sizes-and-symbols.en-US.vue'
import SymbolsDemo from './demos/sizes-and-symbols.vue'

onThemeChange()
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="custom-total-rating">
    <app-type>{{ english ? 'Customize Total Rating' : '自定义评分总数' }}</app-type>
    <CustomTotalRatingDemo />
  </section>

  <section data-demo="custom-rating-icon-style">
    <app-type>{{ english ? 'Customize Rating Icon Style' : '自定义评分图标样式' }}</app-type>
    <CustomRatingIconStyleDemo />
  </section>

  <section data-demo="custom-rating-icon-size-and-gap">
    <app-type>{{ english ? 'Customize Rating Icon Size And Gap' : '自定义评分图标尺寸与间隔' }}</app-type>
    <CustomRatingIconSizeAndGapDemo />
  </section>

  <section data-demo="half-star">
    <app-type>{{ english ? 'Allow Half Rating' : '使用半星' }}</app-type>
    <HalfStarDemo />
  </section>

  <section data-demo="disabled-and-readonly">
    <app-type>{{ english ? 'Disabled And Readonly' : '禁用与只读' }}</app-type>
    <DisabledAndReadonlyDemo />
  </section>

  <section data-demo="clearable">
    <app-type>{{ english ? 'Can Be Cleared' : '可清空' }}</app-type>
    <ClearableDemo />
  </section>

  <section data-demo="listen-event">
    <app-type>{{ english ? 'Listen Event' : '监听事件' }}</app-type>
    <ListenEventDemo />
  </section>
  <section data-demo="keyboard">
    <app-type>{{ english ? 'Keyboard and State' : '键盘与状态' }}</app-type>
    <KeyboardEnDemo v-if="english" /><KeyboardDemo v-else />
  </section>
  <section data-demo="sizes-and-symbols">
    <app-type>{{ english ? 'Sizes and Symbols' : '尺寸与符号' }}</app-type>
    <SymbolsEnDemo v-if="english" /><SymbolsDemo v-else />
  </section>
</template>
