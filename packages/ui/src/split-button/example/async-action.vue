<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const completed = ref(0)
const publishing = ref(false)
const publish = async () => {
  if (publishing.value) {
    return
  }
  publishing.value = true
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 800))
    completed.value += 1
    Message.info('发布成功 / Published')
  } finally {
    publishing.value = false
  }
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button :button-props="{ loading: publishing }" @click="publish" @select="handleSelect">
      {{ english ? 'Publish' : '发布' }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ english ? 'Completed' : '完成次数' }}: {{ completed }}</span>
  </mp-space>
</template>
