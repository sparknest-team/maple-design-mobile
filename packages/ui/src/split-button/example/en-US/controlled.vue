<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

const publish = () => {
  Message.info('Published')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const open = ref(false)
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-space wrap>
      <mp-button @click.stop="open = true">Open menu</mp-button>
      <mp-button @click.stop="open = false">Close menu</mp-button>
    </mp-space>
    <mp-split-button v-model:open="open" @click="publish" @select="handleSelect">
      Publish

      <template #content>
        <mp-menu-option label="Save draft" value="draft" />
        <mp-menu-option label="Save and publish" value="publish" />
        <mp-menu-option label="Unavailable" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ open ? 'Opened' : 'Closed' }}</span>
  </mp-space>
</template>
