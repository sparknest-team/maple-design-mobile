<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import BeforeAddDemo from './demos/before-add.vue'
import BeforeReadDemo from './demos/before-read.vue'
import BeforeRemoveDemo from './demos/before-remove.vue'
import ClickActionDemo from './demos/click-action.vue'
import CustomPreviewDemo from './demos/custom-preview.vue'
import CustomRenderDemo from './demos/custom-render.vue'
import DisabledDemo from './demos/disabled.vue'
import MaxFileSizeDemo from './demos/max-file-size.vue'
import MaxFilesDemo from './demos/max-files.vue'
import PreviewDemo from './demos/preview.vue'
import ReadonlyDemo from './demos/readonly.vue'
import RemoveButtonSlotDemo from './demos/remove-button-slot.vue'
import StateDemo from './demos/state.vue'
import StyleDemo from './demos/style.vue'
import UseProgressDemo from './demos/use-progress.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="preview">
    <app-type>{{ english ? 'File Preview' : '文件预览' }}</app-type>
    <PreviewDemo />
  </section>

  <section data-demo="custom-preview">
    <app-type>{{ english ? 'Custom Preview' : '自定义预览' }}</app-type>
    <CustomPreviewDemo />
  </section>

  <section data-demo="state">
    <app-type>{{ english ? 'Upload State' : '上传状态' }}</app-type>
    <StateDemo />
  </section>

  <section data-demo="use-progress">
    <app-type>{{ english ? 'Use Progress' : '使用进度条' }}</app-type>
    <UseProgressDemo />
  </section>

  <section data-demo="max-files">
    <app-type>{{ english ? 'Max Files' : '文件数量限制' }}</app-type>
    <MaxFilesDemo />
  </section>

  <section data-demo="max-file-size">
    <app-type>{{ english ? 'File Size Limit' : '文件大小限制' }}</app-type>
    <MaxFileSizeDemo />
  </section>

  <section data-demo="before-add">
    <app-type>{{ english ? 'File List Filter' : '文件列表过滤' }}</app-type>
    <BeforeAddDemo />
  </section>

  <section data-demo="before-read">
    <app-type>{{ english ? 'Upload Preprocessing' : '上传预处理' }}</app-type>
    <BeforeReadDemo />
  </section>

  <section data-demo="click-action">
    <app-type>{{ english ? 'Upload Button Click Event' : '上传按钮点击事件' }}</app-type>
    <ClickActionDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <ReadonlyDemo />
  </section>

  <section data-demo="before-remove">
    <app-type>{{ english ? 'Remove Preprocessing' : '删除前处理' }}</app-type>
    <BeforeRemoveDemo />
  </section>

  <section data-demo="style">
    <app-type>{{ english ? 'Customize upload styles' : '自定义上传样式' }}</app-type>
    <StyleDemo />
  </section>

  <section data-demo="custom-render">
    <app-type>{{ english ? 'Custom render file list' : '自定义渲染文件列表' }}</app-type>
    <CustomRenderDemo />
  </section>

  <section data-demo="remove-button-slot">
    <app-type>{{ english ? 'Custom Remove Button' : '自定义删除按钮' }}</app-type>
    <RemoveButtonSlotDemo />
  </section>
</template>
