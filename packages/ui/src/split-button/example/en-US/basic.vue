<script setup lang="ts">
import { Message } from '@maple-design/ui-vue'

const publish = () => {
  Message.info('Published')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button placement="bottom-end" @click="publish" @select="handleSelect">
    Publish

    <template #content>
      <mp-menu-option label="Save draft" value="draft" />
      <mp-menu-option label="Save and publish" value="publish" />
      <mp-menu-option label="Unavailable" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
