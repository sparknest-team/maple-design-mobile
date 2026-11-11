<script setup>
import { computed, ref } from 'vue'

const mode = ref('calendar')
const showTime = ref(false)
const hideYear = ref(false)
const dateFields = computed(() => (hideYear.value ? ['month', 'day'] : ['year', 'month', 'day']))
const dateRange = ref([])
const dateTimeRange = ref([])
const range = computed({
  get: () => (showTime.value ? dateTimeRange.value : dateRange.value),
  set: (value) => {
    if (showTime.value) {
      dateTimeRange.value = value
    } else {
      dateRange.value = value
    }
  },
})
</script>

<template>
  <mp-space direction="column" align="stretch" size="lg">
    <mp-form-item layout="vertical" size="sm" label="选择模式">
      <mp-radio-group
        v-model="mode"
        aria-label="选择模式"
        :options="[
          { label: '日历选择', value: 'calendar' },
          { label: '列式选择', value: 'picker' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-space align="center">
      <span>包含时间</span>
      <mp-switch v-model="showTime" aria-label="包含时间" />
    </mp-space>
    <mp-space v-if="mode === 'picker'" align="center">
      <span>不选择年份</span>
      <mp-switch v-model="hideYear" aria-label="不选择年份" />
    </mp-space>
    <p>切换日历选择与列式选择；开启“包含时间”可体验日期时间范围，切换模式保留已选值。</p>
    <mp-date-range
      v-model="range"
      :date-fields="dateFields"
      :time-fields="['hour', 'minute']"
      :format="showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
      :value-format="showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
      :panel-type="mode"
      :show-time="showTime"
      :disable-confirm="false"
    />
  </mp-space>
</template>
