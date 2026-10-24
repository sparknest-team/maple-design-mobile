<script setup lang="ts">
import { ref } from 'vue'
import type { DateShortcut } from '@maple-design/ui'

const selected = ref('2025-01-15')
const viewport = ref('2025-01-01')
const acceptNavigation = ref(true)
const notice = ref('')
const shortcutNotice = ref('')
const shortcuts: DateShortcut[] = [
  { label: '下个月', value: '2025-02-15' },
  { label: '不可选', value: '2025-03-01', disabled: true },
]
function navigate(value: unknown) {
  if (acceptNavigation.value && typeof value === 'string') {
    viewport.value = value
  }
}
function observe(_value: unknown, _dates: unknown, texts: unknown) {
  notice.value = String(texts)
}
function choose(shortcut: DateShortcut) {
  shortcutNotice.value = String(shortcut.label)
}
</script>

<template>
  <mp-checkbox v-model="acceptNavigation">接受视口请求</mp-checkbox>
  <mp-date
    v-model="selected"
    panel-type="calendar"
    :input-editable="false"
    format="DD/MM/YYYY"
    :date-picker-props="{ pickerValue: viewport, shortcuts }"
    @update:picker-value="navigate"
    @picker-value-change="observe"
    @select-shortcut="choose"
  />
  <p>选择模型：{{ selected }}；受控视口：{{ viewport }}</p>
  <p>视口通知：{{ notice }}；快捷项通知：{{ shortcutNotice }}</p>
  <p>导航不改变选择模型；拒绝视口请求后，日历仍显示原月份。快捷项先选择草稿，确认后提交。</p>
</template>
