<script setup lang="ts">
import { ref } from 'vue'

const limited = ref(true)
const fieldValue = ref<Date | string | number | (Date | string | number | null | undefined)[] | null | undefined>(
  '2025-02-12',
)
const panelValue = ref<Date | string | number | (Date | string | number | null | undefined)[] | null | undefined>(
  '2025-02-12',
)
const week = ref<0 | 1 | 6>(1)
const presentation = ref<'picker' | 'calendar'>('calendar')
</script>

<template>
  <div class="entry-demo">
    <p>仅允许选择 2025 年 2 月；移除限制不会改变已有选中值。</p>
    <mp-button @click="limited = !limited">{{ limited ? '移除日期限制' : '恢复日期限制' }}</mp-button>
    <p>根 presentation 选择展示模式；date-picker-props 只配置面板细节，不传嵌套 presentation。</p>
    <mp-space>
      <mp-button @click="presentation = 'picker'">滚轮</mp-button>
      <mp-button @click="presentation = 'calendar'">日历</mp-button>
    </mp-space>
    <p>切换周起始日时，表头与日期列一起更新，不改变选中值。</p>
    <mp-space wrap>
      <mp-button @click="week = 0">周日起始</mp-button>
      <mp-button @click="week = 1">周一起始</mp-button>
      <mp-button @click="week = 6">周六起始</mp-button>
    </mp-space>
    <div>
      <p>字段：管理输入与浮层；面板参数放在 date-picker-props。</p>
      <mp-date
        v-model="fieldValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        :panel-type="presentation"
        :date-picker-props="{ dayStartOfWeek: week }"
        placeholder="选择日期"
      />
    </div>
    <div>
      <p>纯面板：直接嵌入页面，不使用 open / popup-container。</p>
      <mp-date-picker
        v-model="panelValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        :presentation="presentation"
        :day-start-of-week="week"
        :disable-confirm="false"
      />
      <p>已提交：{{ panelValue }}</p>
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
