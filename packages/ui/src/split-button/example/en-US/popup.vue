<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

const lastAction = ref('')
const handleSelect = (value: unknown, option: { label?: unknown }) => {
  lastAction.value = String(value)
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button
      placement="bottom-start"
      :offset-y="8"
      :popup-max-height="160"
      :hide-on-select="false"
      @click="lastAction = 'publish'"
      @select="handleSelect"
    >
      Choose action
      <template #content>
        <mp-menu-option label="Save draft" value="draft" />
        <mp-menu-option label="Save and publish" value="publish" />
        <mp-menu-option label="Unavailable" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">Last action: {{ lastAction || 'None' }}</span>
    <span>The menu stays open after selection; click outside to close.</span>
  </mp-space>
</template>
