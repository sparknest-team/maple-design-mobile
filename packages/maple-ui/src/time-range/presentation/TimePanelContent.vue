<template>
  <div :class="classes(n(), formatElevation(elevation, 2))">
    <div :class="n('values')">
      <button
        type="button"
        :aria-pressed="activeTab === 'start'"
        :class="classes(n('value'), [activeTab === 'start', n('value--active')])"
        @click="activeTab = 'start'"
      >
        {{ formatLabel(startValue) }}
      </button>
      <mp-icon :class="n('value-arrow')" mp-time-range-picker-cover><MIconChevronRight /></mp-icon>
      <button
        type="button"
        :aria-pressed="activeTab === 'end'"
        :class="classes(n('value'), [activeTab === 'end', n('value--active')])"
        @click="activeTab = 'end'"
      >
        <span>{{ formatLabel(endValue) }}</span>
        <span v-if="showNextDayLabel" :class="n('next-day')">{{ nextDayText }}</span>
      </button>
    </div>

    <template v-if="presentation === 'picker'">
      <mp-picker
        :key="activeTab"
        v-bind="pickerBindingProps"
        :toolbar="false"
        :columns="pickerColumns"
        :model-value="pickerValue"
        @change="handlePickerChange"
      />
    </template>
    <template v-else>
      <mp-time-picker
        v-show="activeTab === 'start'"
        presentation="clock"
        :model-value="startValue"
        v-bind="timePickerBindingProps"
        disable-confirm
        :hide-disabled-options="hideDisabledOptions"
        :format="format"
        :use12-hours="use12Hours"
        :step="step"
        :min="min"
        :max="max"
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
        :readonly="disabled || readonly"
        @update:model-value="(value) => updateSide('start', value)"
      />
      <mp-time-picker
        v-show="activeTab === 'end'"
        presentation="clock"
        :model-value="endValue"
        v-bind="timePickerBindingProps"
        disable-confirm
        :hide-disabled-options="hideDisabledOptions"
        :format="format"
        :use12-hours="use12Hours"
        :step="step"
        :min="min"
        :max="max"
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
        :readonly="disabled || readonly"
        @update:model-value="(value) => updateSide('end', value)"
      />
    </template>

    <slot name="extra" />
    <div v-if="!disableConfirm || $slots.actions" :class="n('actions')">
      <slot name="actions" :confirm="confirm" :can-confirm="canConfirm" :value="draft">
        <mp-button
          v-if="!disableConfirm"
          :class="n('confirm')"
          variant="text"
          :disabled="!canConfirm"
          @click="
            () => {
              confirm()
            }
          "
        >
          {{ translate('pickerConfirmButtonText') }}
        </mp-button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, type ExtractPropTypes, type PropType } from 'vue'
import { IconChevronRight as MIconChevronRight } from '@maplejs/icons-vue'
import MpButton from '../../button'
import MpIcon from '../../icon'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../../picker'
import type { TimeValue } from '../../time/time-value'
import MpTimePicker from '../../time/TimePicker.vue'
import type { useTimePanel } from '../../time/use-time-panel'
import { createNamespace, formatElevation } from '../../utils/components'
import { props as panelProps } from '../picker-props'
import type { useMobileRangePanel } from './use-mobile-range-panel'

type ContentState = ReturnType<typeof useTimePanel<TimeValue[]>> & ReturnType<typeof useMobileRangePanel>
const { n, classes } = createNamespace('time-range-picker')

export default defineComponent({
  name: createNamespace('time-range-panel-content').name,
  components: { MpButton, MpPicker, MIconChevronRight, MpIcon, MpTimePicker },
  props: {
    options: { type: Object as PropType<Readonly<ExtractPropTypes<typeof panelProps>>>, required: true },
    state: { type: Object as PropType<ContentState>, required: true },
  },
  setup(props) {
    const { t: pt } = injectLocaleProvider()
    const translate = (key: string) => (pt ? pt : t)(key as any)
    // Reuse the owner's refs, including clock DOM refs; no duplicate model or draft.
    return {
      ...toRefs(props.options),
      ...props.state,
      n,
      classes,
      formatElevation,
      translate,
      nextDayText: computed(() => translate('timeRangeNextDay')),
    }
  },
})
</script>
