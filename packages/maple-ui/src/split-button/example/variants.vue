<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'

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
const variants = ['default', 'outline', 'tonal', 'text'] as const
const statuses = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'secondary', 'tertiary'] as const
const variant = ref<(typeof variants)[number]>('default')
const status = ref<(typeof statuses)[number]>('default')
const disabled = ref(false)
</script>

<template>
  <div class="split-button-demo">
    <div class="split-button-demo-control">
      <span>Variant</span>
      <mp-radio-group v-model="variant">
        <mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
    <div class="split-button-demo-control">
      <span>Status</span>
      <mp-radio-group v-model="status">
        <mp-radio v-for="value in statuses" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
    <label><input v-model="disabled" type="checkbox" /> Disabled</label>

    <mp-split-button :variant="variant" :status="status" :disabled="disabled" @click="publish" @select="handleSelect">
      {{ variant }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
  </div>
</template>

<style scoped>
.split-button-demo {
  display: grid;
  gap: 16px;
  justify-items: start;
}
.split-button-demo-control {
  display: grid;
  gap: 8px;
}
</style>
