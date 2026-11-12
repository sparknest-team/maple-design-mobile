<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import ProviderBasicDemo from '../../theme-provider/example/demos/basic.vue'
import ProviderLocalDemo from '../../theme-provider/example/demos/local-theme.vue'
import BrandForm from './BrandForm.vue'
import FireflyScenes from './FireflyScenes.vue'
import LocalTheme from './LocalTheme.vue'
import ThemeDetails from './ThemeDetails.vue'

onThemeChange()

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
function setTheme(theme) {
  window.toggleTheme(theme)
}
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="themes">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="theme-1">
    <app-type>{{ english ? 'Toggle Theme' : '切换主题' }}</app-type>
    <div class="theme-choice-grid" role="group" :aria-label="english ? 'Theme presets' : '内置主题'">
      <mp-button status="primary" block @click="setTheme('lightTheme')">{{
        english ? 'Default Light' : '默认亮色'
      }}</mp-button>
      <mp-button status="primary" block @click="setTheme('darkTheme')">{{
        english ? 'Default Dark' : '默认暗色'
      }}</mp-button>
      <mp-button status="primary" block @click="setTheme('mapleLightTheme')">{{
        english ? 'Maple Light' : '枫叶亮色'
      }}</mp-button>
      <mp-button status="primary" block @click="setTheme('mapleDarkTheme')">{{
        english ? 'Maple Dark' : '枫叶暗色'
      }}</mp-button>
      <mp-button block @click="setTheme('alpsLightTheme')">Alps 乐道</mp-button>
      <mp-button block @click="setTheme('alpsDarkTheme')">Alps 乐道暗色</mp-button>
      <mp-button block @click="setTheme('fireflyLightTheme')">Firefly 萤火虫</mp-button>
      <mp-button block @click="setTheme('fireflyDarkTheme')">Firefly 萤火虫暗色</mp-button>
    </div>
    <BrandForm />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="local-themes-and-customization">
    <span lang="zh-CN">局部主题与定制</span>
    <span lang="en-US">Local themes and customization</span>
  </h2>

  <section data-demo="theme-2">
    <app-type>{{ english ? 'Local customization' : '局部定制' }}</app-type>
    <LocalTheme />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="brands-and-states">
    <span lang="zh-CN">品牌与状态对照</span>
    <span lang="en-US">Brands and states</span>
  </h2>

  <section data-demo="theme-3">
    <app-type>{{ english ? 'Firefly button surfaces' : '萤火虫按钮使用场景' }}</app-type>
    <FireflyScenes />
    <ThemeDetails />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="themeprovider-examples">
    <span lang="zh-CN">ThemeProvider 示例</span>
    <span lang="en-US">ThemeProvider examples</span>
  </h2>

  <section data-demo="basic"><ProviderBasicDemo /></section>

  <section data-demo="local-theme"><ProviderLocalDemo /></section>
</template>

<style scoped>
.theme-choice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 24px;
}
</style>
