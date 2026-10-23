<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicDemo from './demos/basic.vue'
import DisabledStatusDemo from './demos/disabled-status.vue'
import EnBasicDemo from './demos/en-US/basic.vue'
import EnDisabledStatusDemo from './demos/en-US/disabled-status.vue'
import EnHoverableDemo from './demos/en-US/hoverable.vue'
import EnIconDemo from './demos/en-US/icon.vue'
import EnLoadingDemo from './demos/en-US/loading.vue'
import EnModeDemo from './demos/en-US/mode.vue'
import EnSemanticStatusDemo from './demos/en-US/semantic-status.vue'
import EnUnderlineDemo from './demos/en-US/underline.vue'
import HoverableDemo from './demos/hoverable.vue'
import IconDemo from './demos/icon.vue'
import LoadingDemo from './demos/loading.vue'
import ModeDemo from './demos/mode.vue'
import SemanticStatusDemo from './demos/semantic-status.vue'
import UnderlineDemo from './demos/underline.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <EnBasicDemo v-if="english" />
    <BasicDemo v-else />
  </section>

  <section data-demo="semantic-status">
    <app-type>{{ english ? 'Semantic Status' : '语义状态' }}</app-type>
    <EnSemanticStatusDemo v-if="english" />
    <SemanticStatusDemo v-else />
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

  <section data-demo="icon">
    <app-type>{{ english ? 'Icon' : '图标' }}</app-type>
    <EnIconDemo v-if="english" />
    <IconDemo v-else />
  </section>

  <section data-demo="loading">
    <app-type>{{ english ? 'Loading' : '加载中' }}</app-type>
    <EnLoadingDemo v-if="english" />
    <LoadingDemo v-else />
  </section>

  <section data-demo="hoverable">
    <app-type>{{ english ? 'Hover Background' : '悬浮态底色' }}</app-type>
    <EnHoverableDemo v-if="english" />
    <HoverableDemo v-else />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
