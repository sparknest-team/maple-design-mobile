<script setup lang="ts">
import { ref } from 'vue'
import type { DateValue } from '@maple-design/ui'

const limited = ref(true)
const blockEnd20 = ref(false)
const disabledEnd = (date: Date, side: 'start' | 'end') => side === 'end' && blockEnd20.value && date.getDate() === 20
const fieldValue = ref<DateValue[]>(['2025-02-12', '2025-02-14'])
const panelValue = ref<DateValue[]>(['2025-02-12', '2025-02-14'])
const week = ref<0 | 1 | 6>(1)
</script>

<template>
  <div class="entry-demo">
    <p>Limit selectable dates to February 2025; removing limits does not change the existing selection.</p>
    <mp-button @click="limited = !limited">{{ limited ? 'Remove limits' : 'Apply limits' }}</mp-button>
    <p>Switch the first weekday: headers and date columns update together, without changing the selection.</p>
    <mp-space wrap>
      <mp-button @click="week = 0">Sunday first</mp-button>
      <mp-button @click="week = 1">Monday first</mp-button>
      <mp-button @click="week = 6">Saturday first</mp-button>
    </mp-space>
    <div>
      <p>Range field: input, popup and confirmation ownership.</p>
      <mp-date-range
        v-model="fieldValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        panel-type="calendar"
        :date-range-picker-props="{ dayStartOfWeek: week }"
      />
    </div>
    <div>
      <p>Range panel: the selected first weekday; confirm to commit.</p>
      <mp-checkbox v-model="blockEnd20">Disable day 20 as the end (keep the committed value)</mp-checkbox>
      <mp-date-range-picker
        v-model="panelValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        presentation="calendar"
        :day-start-of-week="week"
        :disable-confirm="false"
        :disabled-date="disabledEnd"
      >
        <template #actions="{ confirm, disabled }">
          <mp-button :disabled="disabled" @click="confirm">Commit range</mp-button>
        </template>
      </mp-date-range-picker>
      <p>Committed: {{ panelValue.join(' ~ ') }}</p>
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
