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
    <p>Limit selectable dates to February 2025; removing limits does not change the existing selection.</p>
    <mp-button @click="limited = !limited">{{ limited ? 'Remove limits' : 'Apply limits' }}</mp-button>
    <p>The root presentation selects the view. Nested date-picker-props only configures calendar appearance.</p>
    <mp-space>
      <mp-button @click="presentation = 'picker'">Wheel</mp-button>
      <mp-button @click="presentation = 'calendar'">Calendar</mp-button>
    </mp-space>
    <p>Changing the first weekday updates both headers and date columns, without changing the selection.</p>
    <mp-space wrap>
      <mp-button @click="week = 0">Sunday first</mp-button>
      <mp-button @click="week = 1">Monday first</mp-button>
      <mp-button @click="week = 6">Saturday first</mp-button>
    </mp-space>
    <div>
      <p>Field: input and popup ownership; use date-picker-props for presentation.</p>
      <mp-date
        v-model="fieldValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        :panel-type="presentation"
        :date-picker-props="{ dayStartOfWeek: week }"
        placeholder="Select date"
      />
    </div>
    <div>
      <p>Panel: embedded directly, without open or popup-container.</p>
      <mp-date-picker
        v-model="panelValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        :presentation="presentation"
        :day-start-of-week="week"
        :disable-confirm="false"
      />
      <p>Committed: {{ panelValue }}</p>
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
