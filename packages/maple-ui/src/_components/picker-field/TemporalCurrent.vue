<template>
  <div :class="[n('current'), c()]" aria-live="polite">
    <div :class="[n('current-date'), c('date')]">
      <span v-if="label" :class="[n('current-label'), c('label')]">{{ label }}</span>
      <span :class="[n('current-value'), c('value')]">{{ date }}</span>
    </div>
    <div v-if="showTime" :class="[n('current-time'), c('time')]">
      <span :class="[n('current-time-value'), c('time-value')]">{{ time }}</span>
      <button
        type="button"
        :class="[n('view-toggle'), c('toggle')]"
        :aria-label="toggleLabel"
        :title="toggleLabel"
        :aria-pressed="view === 'time'"
        @click="emit('update:view', view === 'date' ? 'time' : 'date')"
      >
        <IconClockCircle v-if="view === 'date'" aria-hidden="true" />
        <IconCalendar v-else aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { IconCalendar, IconClockCircle } from '@maple-design/icons-vue'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { createNamespace } from '../../utils/components'

defineOptions({ name: createNamespace('temporal-current').name })
const props = defineProps({
  prefix: { type: String, default: 'date-picker' },
  label: String,
  date: String,
  time: String,
  showTime: Boolean,
  view: { type: String as PropType<'date' | 'time'>, default: 'date' },
})
const emit = defineEmits<{ 'update:view': [view: 'date' | 'time'] }>()
const { n } = createNamespace(props.prefix)
const { n: c } = createNamespace('temporal-current')
const { t: pt } = injectLocaleProvider()
const toggleLabel = computed(() => (pt ?? t)(props.view === 'date' ? 'timePickerHint' : 'datePickerHint'))
</script>
