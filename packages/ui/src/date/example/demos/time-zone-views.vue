<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CalendarInteractiveMode } from '@maple-design/ui-vue'

const zone = ref('America/New_York')
const mode = ref<CalendarInteractiveMode>('page')
const instant = ref<number>()
const civil = ref('2026-03-08 01:30:00')
const presets = [
  ['纽约春季跳时', 'America/New_York', '2026-03-08T06:30:00Z'],
  ['纽约秋季第一次 01:30', 'America/New_York', '2026-11-01T05:30:00Z'],
  ['纽约秋季第二次 01:30', 'America/New_York', '2026-11-01T06:30:00Z'],
  ['半小时夏令时', 'Australia/Lord_Howe', '2026-10-03T15:00:00Z'],
]
function preset(index: number) {
  zone.value = presets[index][1]
  instant.value = Date.parse(presets[index][2])
}
preset(0)
const description = computed(() => {
  if (instant.value == null) {
    return '未选择'
  }
  const date = new Date(instant.value)
  return `${date.toISOString()} · ${new Intl.DateTimeFormat('zh-CN', {
    timeZone: zone.value,
    dateStyle: 'short',
    timeStyle: 'long',
  }).format(date)}`
})
</script>

<template>
  <mp-space direction="column" align="stretch" size="lg" class="zone-views-demo">
    <mp-form-item layout="vertical" size="sm" label="示例时区">
      <mp-radio-group
        v-model="zone"
        aria-label="示例时区"
        :options="['Asia/Shanghai', 'America/New_York', 'UTC', 'Australia/Lord_Howe']"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="示例日历模式">
      <mp-radio-group
        v-model="mode"
        aria-label="示例日历模式"
        :options="[
          { label: '翻页', value: 'page' },
          { label: '多月虚拟滚动', value: 'scroll' },
          { label: '单行周日历', value: 'line' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-space wrap>
      <mp-button v-for="(item, index) in presets" :key="item[2]" @click="preset(index)">{{ item[0] }}</mp-button>
    </mp-space>
    <output data-result="mode">当前模式：{{ mode }} · {{ zone }}</output>
    <p>时间戳：切换时区只改变显示。选择后确认才保存；取消保留原值。</p>
    <mp-date
      v-model="instant"
      aria-label="时区预约"
      value-format="timestamp"
      show-time
      :time-zone="zone"
      :interactive-mode="mode"
      :input-editable="false"
      edit-mode="direct"
      min="2000-01-01 00:00:00"
      max="2100-12-31 23:59:59"
    />
    <output data-result="instant">{{ description }}</output>
    <p>当地时间字符串：在纽约输入 2026-03-08 02:30:00（不存在）应被拒绝；秋季重复时间默认取第一次。</p>
    <mp-date
      v-model="civil"
      aria-label="当地时间字符串"
      show-time
      :time-zone="zone"
      :interactive-mode="mode"
      edit-mode="direct"
    />
    <output data-result="civil">{{ civil }}</output>
  </mp-space>
</template>

<style scoped>
.zone-views-demo {
  width: 100%;
}
output {
  overflow-wrap: anywhere;
}
p {
  margin: 0;
  line-height: 1.6;
}
</style>
