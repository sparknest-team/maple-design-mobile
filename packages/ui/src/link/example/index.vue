<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import ContentAppearanceComparison from './demos/appearance-comparison.vue'
import BasicDemo from './demos/basic.vue'
import DisabledStatusDemo from './demos/disabled-status.vue'
import ContentAppearanceComparisonEn from './demos/en-US/appearance-comparison.vue'
import EnBasicDemo from './demos/en-US/basic.vue'
import EnDisabledStatusDemo from './demos/en-US/disabled-status.vue'
import EnHoverableDemo from './demos/en-US/hoverable.vue'
import EnIconDemo from './demos/en-US/icon.vue'
import EnLoadingDemo from './demos/en-US/loading.vue'
import EnModeDemo from './demos/en-US/mode.vue'
import EnThemeColorsDemo from './demos/en-US/theme-colors.vue'
import EnUnderlineDemo from './demos/en-US/underline.vue'
import HoverableDemo from './demos/hoverable.vue'
import IconDemo from './demos/icon.vue'
import LoadingDemo from './demos/loading.vue'
import ModeDemo from './demos/mode.vue'
import ThemeColorsDemo from './demos/theme-colors.vue'
import UnderlineDemo from './demos/underline.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="link">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <EnBasicDemo v-if="english" />
    <BasicDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">链接尺寸与语义颜色</span><span lang="en-US">Link sizes and semantic colors</span>
    </h3>
    <component :is="english ? ContentAppearanceComparisonEn : ContentAppearanceComparison" />
  </section>

  <section data-demo="mode">
    <app-type>{{ english ? 'Link Mode' : '链接模式' }}</app-type>
    <EnModeDemo v-if="english" />
    <ModeDemo v-else />
  </section>

  <section data-demo="underline">
    <app-type>{{ english ? 'Underline' : '下划线' }}</app-type>
    <EnUnderlineDemo v-if="english" />
    <UnderlineDemo v-else />
  </section>

  <section data-demo="disabled-status">
    <app-type>{{ english ? 'Disabled Status' : '禁用状态' }}</app-type>
    <EnDisabledStatusDemo v-if="english" />
    <DisabledStatusDemo v-else />
  </section>

  <section data-demo="hoverable">
    <app-type>{{ english ? 'Hover Background' : '悬浮态底色' }}</app-type>
    <EnHoverableDemo v-if="english" />
    <HoverableDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="icon">
    <app-type>{{ english ? 'Icon' : '图标' }}</app-type>
    <EnIconDemo v-if="english" />
    <IconDemo v-else />
  </section>

  <section data-demo="theme-colors">
    <app-type>{{ english ? 'Firefly palette: Link / Button' : '萤火虫配色：Link / Button' }}</app-type>
    <EnThemeColorsDemo v-if="english" />
    <ThemeColorsDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="loading">
    <app-type>{{ english ? 'Loading' : '加载中' }}</app-type>
    <EnLoadingDemo v-if="english" />
    <LoadingDemo v-else />
  </section>
</template>
