<script setup lang="ts">
import { ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variants = ['default', 'text', 'outline', 'tonal'] as const
const layouts = ['icon', 'inline', 'stacked'] as const
const size = ref<(typeof sizes)[number]>('md')
const variant = ref<(typeof variants)[number]>('tonal')
const items = [
  { status: 'default', icon: 'plus', label: 'Add' },
  { status: 'primary', icon: 'reply', label: 'Reply' },
  { status: 'info', icon: 'info-circle', label: 'Info' },
  { status: 'success', icon: 'check', label: 'Confirm' },
  { status: 'warning', icon: 'delete', label: 'Delete' },
  { status: 'danger', icon: 'close', label: 'Close' },
] as const
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>Variant</span>
        <mp-select
          v-model="variant"
          :options="variants.map((value) => ({ label: value, value }))"
          :clearable="false"
          aria-label="Icon button variant"
        />
      </div>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          :options="sizes.map((value) => ({ label: value, value }))"
          :clearable="false"
          aria-label="Icon button size"
        />
      </div>
    </mp-space>
    <mp-space v-for="layout in layouts" :key="layout" direction="column" :size="8">
      <span>{{
        layout === 'icon'
          ? 'Icon only / 纯图标'
          : layout === 'inline'
            ? 'Icon and text / 横排图文'
            : 'Stacked / 上下堆叠'
      }}</span>
      <mp-space wrap>
        <mp-button
          v-for="item in items"
          :key="item.label"
          :status="item.status"
          :variant="variant"
          :size="size"
          :stacked="layout === 'stacked'"
          :round="layout === 'icon'"
          :aria-label="item.label"
        >
          <template #icon>
            <m-icon-plus v-if="item.icon === 'plus'" />
            <m-icon-reply v-else-if="item.icon === 'reply'" />
            <m-icon-info-circle v-else-if="item.icon === 'info-circle'" />
            <m-icon-check v-else-if="item.icon === 'check'" />
            <m-icon-delete v-else-if="item.icon === 'delete'" />
            <m-icon-close v-else-if="item.icon === 'close'" />
          </template>
          <template v-if="layout !== 'icon'" #default>{{ item.label }}</template>
        </mp-button>
      </mp-space>
    </mp-space>
  </mp-space>
</template>
