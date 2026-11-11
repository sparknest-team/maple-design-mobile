<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const publish = () => {
  Message.info(english.value ? 'Published' : '发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button placement="bottom-end" @click="publish" @select="handleSelect">
    {{ english ? 'Publish' : '发布' }}

    <template #content>
      <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
      <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
      <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
