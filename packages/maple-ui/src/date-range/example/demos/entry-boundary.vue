<script setup lang="ts">
import { ref } from 'vue'
import type { DateValue } from '@maplejs/maple-ui'

const limited = ref(true)
const fieldValue = ref<DateValue[]>(['2025-02-12', '2025-02-14'])
const panelValue = ref<DateValue[]>(['2025-02-12', '2025-02-14'])
const week = ref<0 | 1 | 6>(1)
</script>

<template>
  <div class="entry-demo">
    <p>仅允许选择 2025 年 2 月；移除限制不会改变已有选中值。</p>
    <mp-button @click="limited = !limited">{{ limited ? '移除日期限制' : '恢复日期限制' }}</mp-button>
    <p>切换周起始日：表头与日期列一起更新，不改变选中值。</p>
    <mp-space wrap>
      <mp-button @click="week = 0">周日起始</mp-button>
      <mp-button @click="week = 1">周一起始</mp-button>
      <mp-button @click="week = 6">周六起始</mp-button>
    </mp-space>
    <div>
      <p>范围字段：管理输入、浮层和确认流程。</p>
      <mp-date-range
        v-model="fieldValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        presentation="calendar"
        :date-range-picker-props="{ dayStartOfWeek: week }"
      />
    </div>
    <div>
      <p>范围面板：日历按所选周起始日排列，点击确认后才提交。</p>
      <mp-date-range-picker
        v-model="panelValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        presentation="calendar"
        :day-start-of-week="week"
        :disable-confirm="false"
      >
        <template #actions="{ confirm, disabled }">
          <mp-button :disabled="disabled" @click="confirm">提交日期范围</mp-button>
        </template>
      </mp-date-range-picker>
      <p>已提交：{{ panelValue.join(' ~ ') }}</p>
    </div>
  </div>
</template>

<style scoped>
.entry-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
