<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import CheckableTagDemo from './demos/checkable-tag.vue'
import ClosableTagDemo from './demos/closable-tag.vue'
import CustomColorTagDemo from './demos/custom-color-tag.vue'
import IconTagDemo from './demos/icon-tag.vue'
import LoadingTagDemo from './demos/loading-tag.vue'
import OutlineTagDemo from './demos/outline-tag.vue'
import RoundTagDemo from './demos/round-tag.vue'
import TagSizeDemo from './demos/tag-size.vue'
import ThemeColorTagDemo from './demos/theme-color-tag.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="theme-color-tag">
    <app-type>{{ english ? 'Theme Color' : '主题色标签' }}</app-type>
    <ThemeColorTagDemo />
  </section>

  <section data-demo="outline-tag">
    <app-type>{{ english ? 'Outline' : '描边标签' }}</app-type>
    <OutlineTagDemo />
  </section>

  <section data-demo="round-tag">
    <app-type>{{ english ? 'Round' : '圆角标签' }}</app-type>
    <RoundTagDemo />
  </section>

  <section data-demo="tag-size">
    <app-type>{{ english ? 'Size' : '标签尺寸' }}</app-type>
    <TagSizeDemo />
  </section>

  <section data-demo="closable-tag">
    <app-type>{{ english ? 'Closable' : '可关闭标签' }}</app-type>
    <ClosableTagDemo />
  </section>

  <section data-demo="loading-tag">
    <app-type>{{ english ? 'Loading' : '加载中标签' }}</app-type>
    <LoadingTagDemo />
  </section>

  <section data-demo="checkable-tag">
    <app-type>{{ english ? 'Checkable' : '可选中标签' }}</app-type>
    <CheckableTagDemo />
  </section>

  <section data-demo="icon-tag">
    <app-type>{{ english ? 'Icon' : '带图标' }}</app-type>
    <IconTagDemo />
  </section>

  <section data-demo="custom-color-tag">
    <app-type>{{ english ? 'Custom Color' : '自定义颜色' }}</app-type>
    <CustomColorTagDemo />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
