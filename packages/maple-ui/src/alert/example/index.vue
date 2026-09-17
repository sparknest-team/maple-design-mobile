<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import ActionDemo from './demos/action.vue'
import AllowToCloseDemo from './demos/allow-to-close.vue'
import BannerDemo from './demos/banner.vue'
import CenterDemo from './demos/center.vue'
import CustomCloseIconDemo from './demos/custom-close-icon.vue'
import CustomIconDemo from './demos/custom-icon.vue'
import MessageDemo from './demos/message.vue'
import ShowIconDemo from './demos/show-icon.vue'
import TitleDemo from './demos/title.vue'
import TypeDemo from './demos/type.vue'
import VariantDemo from './demos/variant.vue'

const type = ref('info')
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="title">
    <app-type>{{ english ? 'Title' : '标题' }}</app-type>
    <TitleDemo />
  </section>

  <section data-demo="message">
    <app-type>{{ english ? 'Message' : '信息' }}</app-type>
    <MessageDemo />
  </section>

  <section data-demo="type">
    <app-type>{{ english ? 'Type' : '类型' }}</app-type>
    <TypeDemo />
  </section>

  <section data-demo="variant">
    <app-type>{{ english ? 'Variant' : '变体' }}</app-type>
    <VariantDemo />
  </section>

  <section data-demo="center">
    <app-type>{{ english ? 'Center' : '居中' }}</app-type>
    <CenterDemo />
  </section>

  <section data-demo="banner">
    <app-type>{{ english ? 'Banner' : '通栏' }}</app-type>
    <BannerDemo />
  </section>

  <section data-demo="show-icon">
    <app-type>{{ english ? 'Hide Icon' : '隐藏图标' }}</app-type>
    <ShowIconDemo />
  </section>

  <section data-demo="custom-icon">
    <app-type>{{ english ? 'Custom Icon' : '自定义图标' }}</app-type>
    <CustomIconDemo />
  </section>

  <section data-demo="action">
    <app-type>{{ english ? 'Action' : '操作区' }}</app-type>
    <ActionDemo />
  </section>

  <section data-demo="allow-to-close">
    <app-type>{{ english ? 'Allow to Close' : '允许关闭' }}</app-type>
    <AllowToCloseDemo />
  </section>

  <section data-demo="custom-close-icon">
    <app-type>{{ english ? 'Custom Close Icon' : '自定义关闭图标' }}</app-type>
    <CustomCloseIconDemo />
  </section>
</template>
