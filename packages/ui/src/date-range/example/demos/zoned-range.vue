<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CalendarInteractiveMode } from '@maple-design/ui-vue'

const zone = ref('America/New_York')
const mode = ref<CalendarInteractiveMode>('page')
const lock = ref('none')
const locked = computed(() => [
  lock.value === 'start' || lock.value === 'both',
  lock.value === 'end' || lock.value === 'both',
])
const range = ref<number[]>([])
const days = ref(['2026-10-01', '2026-10-03'])
const presets = [
  ['跨月范围', 'America/New_York', '2026-10-31T14:30:00Z', '2026-11-02T15:00:00Z'],
  ['春季跳时', 'America/New_York', '2026-03-08T06:30:00Z', '2026-03-08T07:30:00Z'],
  ['秋季第二次 01:30', 'America/New_York', '2026-11-01T06:30:00Z', '2026-11-01T07:30:00Z'],
  ['半小时夏令时', 'Australia/Lord_Howe', '2026-10-03T15:00:00Z', '2026-10-03T16:00:00Z'],
]
function preset(index: number) {
  zone.value = presets[index][1]
  range.value = presets[index].slice(2).map(Date.parse)
}
preset(0)
const description = computed(() =>
  range.value
    .map((value) => {
      const date = new Date(value)
      return `${date.toISOString()} · ${new Intl.DateTimeFormat('zh-CN', {
        timeZone: zone.value,
        dateStyle: 'short',
        timeStyle: 'long',
      }).format(date)}`
    })
    .join(' → '),
)
</script>

<template>
  <mp-space direction="column" align="stretch" size="lg" class="zoned-range-demo">
    <p>原有日期范围：检查整月日历和底部确认区，面板不应被限制为半屏。</p>
    <mp-date-range
      v-model="days"
      aria-label="普通日期范围"
      :interactive-mode="mode"
      :time-zone="zone"
      :disabled="locked"
      :input-editable="false"
      edit-mode="direct"
    />
    <output data-result="days">{{ days }}</output>
    <mp-form-item layout="vertical" size="sm" label="范围时区">
      <mp-radio-group
        v-model="zone"
        aria-label="范围时区"
        :options="['Asia/Shanghai', 'America/New_York', 'UTC', 'Australia/Lord_Howe']"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="范围日历模式">
      <mp-radio-group
        v-model="mode"
        aria-label="范围日历模式"
        :options="[
          { label: '翻页', value: 'page' },
          { label: '多月虚拟滚动', value: 'scroll' },
          { label: '单行周日历', value: 'line' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="范围锁定">
      <mp-radio-group
        v-model="lock"
        aria-label="范围锁定"
        :options="[
          { label: '两端可编辑', value: 'none' },
          { label: '锁定开始', value: 'start' },
          { label: '锁定结束', value: 'end' },
          { label: '两端锁定', value: 'both' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <output data-result="mode">当前模式：{{ mode }} · {{ zone }} · {{ lock }}</output>
    <p>模式、时区和锁定设置同时作用于本例两种范围。点击日期字段即可展开日历。</p>
    <mp-space wrap
      ><mp-button v-for="(item, index) in presets" :key="item[2]" @click="preset(index)">{{
        item[0]
      }}</mp-button></mp-space
    >
    <p>
      面板保留顶部起止日期摘要，下方摘要显示当前编辑端点；每次打开默认编辑开始端并定位开始日期（开始端锁定时编辑结束端）。锁定端不允许修改，确认保存，取消保留原值。
    </p>
    <mp-space wrap>
      <mp-button @click="days = ['2026-08-01', '2026-08-03']">六行月份</mp-button>
      <mp-button @click="days = ['2026-10-01', '2026-10-03']">截图月份</mp-button>
    </mp-space>
    <mp-date-range
      v-model="range"
      aria-label="跨时区行程"
      value-format="timestamp"
      show-time
      :time-zone="zone"
      :interactive-mode="mode"
      :disabled="locked"
      :input-editable="false"
      edit-mode="direct"
      min="2000-01-01 00:00:00"
      max="2100-12-31 23:59:59"
    />
    <output data-result="range">{{ description }}</output>
  </mp-space>
</template>

<style scoped>
.zoned-range-demo {
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
