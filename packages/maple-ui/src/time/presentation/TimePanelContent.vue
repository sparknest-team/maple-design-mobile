<template>
  <div ref="picker" :class="classes(n(), formatElevation(elevation, 2), [useSeconds, n('--with-seconds')])">
    <mp-picker
      v-if="presentation === 'picker'"
      v-bind="pickerBindingProps"
      :toolbar="false"
      :columns="pickerColumns"
      :model-value="pickerValue"
      @change="handlePickerChange"
    />
    <template v-else>
      <div :class="n('title')" :style="{ background: titleColor || color }">
        <div :class="n('title-hint')">{{ hint ?? (pt ? pt : t)('timePickerHint') }}</div>
        <div :class="n('title-time-container')">
          <div :class="n('title-time')">
            <div
              v-if="showHours"
              :class="classes(n('title-btn'), [type === 'hour', n('title-btn--active')])"
              role="button"
              @click="checkPanel('hour')"
            >
              {{ time.hour }}
            </div>
            <span v-if="showHours && showMinutes" :class="n('title-splitter')">:</span>
            <div
              v-if="showMinutes"
              :class="classes(n('title-btn'), [type === 'minute', n('title-btn--active')])"
              role="button"
              @click="checkPanel('minute')"
            >
              {{ time.minute }}
            </div>
            <span v-if="useSeconds && (showHours || showMinutes)" :class="n('title-splitter')">:</span>
            <div
              v-if="useSeconds"
              :class="classes(n('title-btn'), [type === 'second', n('title-btn--active')])"
              role="button"
              @click="checkPanel('second')"
            >
              {{ time.second }}
            </div>
          </div>
          <div v-if="showHours && clockFormat === 'ampm'" :class="n('title-ampm')">
            <div :class="classes(n('title-btn'), [ampm === 'am', n('title-btn--active')])" @click="checkAmpm('am')">
              AM
            </div>
            <div :class="classes(n('title-btn'), [ampm === 'pm', n('title-btn--active')])" @click="checkAmpm('pm')">
              PM
            </div>
          </div>
        </div>
      </div>
      <div :class="n('body')">
        <div ref="container" :class="n('clock-container')" @touchstart="moveHand" @touchmove="moveHand" @touchend="end">
          <transition :name="`${n()}-panel-fade`">
            <clock
              :key="type"
              ref="inner"
              :type="type"
              :ampm="ampm"
              :color="color"
              :is-inner="isInner"
              :format="clockFormat"
              :disabled-hours="disabledHours"
              :disabled-minutes="disabledMinutes"
              :disabled-seconds="disabledSeconds"
              :hide-disabled-options="hideDisabledOptions"
              :rad="getRad"
              :time="time"
              :prevent-next-update="isPreventNextUpdate || syncingClock"
              :use-seconds="useSeconds"
              :step="step"
              :max="max"
              :min="min"
              @update="update"
              @change-prevent-update="changePreventUpdate"
            />
          </transition>
        </div>
      </div>
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
          {{ (pt ? pt : t)('pickerConfirmButtonText') }}
        </mp-button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, type ExtractPropTypes, type PropType } from 'vue'
import MpButton from '../../button'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../../picker'
import { createNamespace, formatElevation } from '../../utils/components'
import Clock from '../Clock.vue'
import { props as panelProps } from '../picker-props'
import type { TimeValue } from '../time-value'
import type { useTimePanel } from '../use-time-panel'
import type { useMobileTimePanel } from './use-mobile-time-panel'

type ContentState = ReturnType<typeof useTimePanel<TimeValue>> & ReturnType<typeof useMobileTimePanel>
const { n, classes } = createNamespace('time-picker')

export default defineComponent({
  name: createNamespace('time-panel-content').name,
  components: { MpButton, MpPicker, Clock },
  props: {
    options: { type: Object as PropType<Readonly<ExtractPropTypes<typeof panelProps>>>, required: true },
    state: { type: Object as PropType<ContentState>, required: true },
  },
  setup(props) {
    const { t: pt } = injectLocaleProvider()

    // Reuse the owner's refs, including clock DOM refs; no duplicate model or draft.
    return { ...toRefs(props.options), ...props.state, n, classes, formatElevation, t, pt }
  },
})
</script>
