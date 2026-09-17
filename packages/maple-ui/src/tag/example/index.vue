<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
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
    <app-type>{{ english ? 'Theme Color Tag' : '主题色标签' }}</app-type>
    <ThemeColorTagDemo />
  </section>

  <section data-demo="outline-tag">
    <app-type>{{ english ? 'Outline Tag' : '描边标签' }}</app-type>
    <OutlineTagDemo />
  </section>

  <section data-demo="round-tag">
    <app-type>{{ english ? 'Round Tag' : '圆角标签' }}</app-type>
    <RoundTagDemo />
  </section>

  <section data-demo="tag-size">
    <app-type>{{ english ? 'Tag Size' : '标签尺寸' }}</app-type>
    <TagSizeDemo />
  </section>

  <section data-demo="closable-tag">
    <app-type>{{ english ? 'Closable Tag' : '可关闭标签' }}</app-type>
    <ClosableTagDemo />
  </section>

  <section data-demo="loading-tag">
    <app-type>{{ english ? 'Loading Tag' : '加载中标签' }}</app-type>
    <LoadingTagDemo />
  </section>

  <section data-demo="checkable-tag">
    <app-type>{{ english ? 'Checkable Tag' : '可选中标签' }}</app-type>
    <CheckableTagDemo />
  </section>

  <section data-demo="icon-tag">
    <app-type>{{ english ? 'Tag with Icon' : '带图标' }}</app-type>
    <IconTagDemo />
  </section>

  <section data-demo="custom-color-tag">
    <app-type>{{ english ? 'Custom Color' : '自定义颜色' }}</app-type>
    <CustomColorTagDemo />
  </section>
</template>
