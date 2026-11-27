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
  <mp-space wrap>
    <mp-split-button
      disabled
      :button-props="{ disabled: false }"
      :trigger-button-props="{ disabled: false }"
      @click="publish"
      @select="handleSelect"
    >
      All disabled

      <template #content>
        <mp-menu-option label="Save draft" value="draft" />
        <mp-menu-option label="Save and publish" value="publish" />
        <mp-menu-option label="Unavailable" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button :button-props="{ disabled: true }" @click="publish" @select="handleSelect">
      Main disabled

      <template #content>
        <mp-menu-option label="Save draft" value="draft" />
        <mp-menu-option label="Save and publish" value="publish" />
        <mp-menu-option label="Unavailable" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button :trigger-button-props="{ disabled: true }" @click="publish" @select="handleSelect">
      Menu disabled

      <template #content>
        <mp-menu-option label="Save draft" value="draft" />
        <mp-menu-option label="Save and publish" value="publish" />
        <mp-menu-option label="Unavailable" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
