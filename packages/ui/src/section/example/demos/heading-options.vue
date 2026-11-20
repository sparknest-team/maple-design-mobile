<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SectionMarkerPlacement, SectionStatus, SectionVariant } from '@maple-design/ui-vue'

const variants = ['plain', 'heading-line', 'tonal', 'outline'] as const
const variant = ref<SectionVariant>('outline')
const statuses = ['default', 'info', 'success', 'warning', 'danger'] as const
const status = ref<SectionStatus>('default')
const withTitle = ref(false)
const withDescription = ref(false)
const showMarker = ref(false)
const preferredPlacement = ref<SectionMarkerPlacement>('title')
const markerPlacement = computed({
  get: () => (withTitle.value ? preferredPlacement.value : 'section'),
  set: (value: SectionMarkerPlacement) => {
    preferredPlacement.value = value
  },
})
</script>

<template>
  <mp-space direction="column" align="stretch">
    <mp-radio-group v-model="variant" aria-label="分组风格">
      <mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio>
    </mp-radio-group>
    <mp-radio-group v-model="status" aria-label="分组状态">
      <mp-radio v-for="value in statuses" :key="value" :value="value">{{ value }}</mp-radio>
    </mp-radio-group>
    <mp-space wrap>
      <mp-checkbox v-model="withTitle">显示标题</mp-checkbox>
      <mp-checkbox v-model="withDescription">显示说明</mp-checkbox>
      <mp-checkbox v-model="showMarker">显示色条</mp-checkbox>
    </mp-space>
    <mp-radio-group v-model="markerPlacement" :disabled="!showMarker" aria-label="色条位置">
      <mp-radio value="title" :disabled="!withTitle">标题旁</mp-radio>
      <mp-radio value="section">整个分区</mp-radio>
    </mp-radio-group>
    <mp-section
      :marker-placement="markerPlacement"
      :variant="variant"
      :status="status"
      :show-marker="showMarker"
      :title="withTitle ? '成员权限' : undefined"
      :description="withDescription ? '权限变更将应用到所有项目成员。' : undefined"
    >
      <dl>
        <dt>管理员</dt>
        <dd>管理成员、修改项目设置</dd>
        <dt>成员</dt>
        <dd>查看项目、更新任务</dd>
      </dl>
    </mp-section>
  </mp-space>
</template>
