<template>
  <div :class="classes(n(), formatElevation(elevation, 2))">
    <div :class="n('column-labels')" :data-temporal-split="pickerSplit">
      <span v-for="(label, index) in columnLabels" :key="index" :class="n('column-label')">{{ label }}</span>
    </div>
    <mp-picker
      role="group"
      :aria-label="`${translate('timeRangeStart')} / ${translate('timeRangeEnd')}`"
      :class="n('wheel')"
      :data-temporal-split="pickerSplit"
      v-bind="pickerBindingProps"
      :toolbar="false"
      :disabled="disabled || readonly"
      :columns="pickerColumns"
      :model-value="pickerValue"
      @pointerdown.capture="activateWheel"
      @touchstart.capture.passive="activateWheel"
      @focusin="activateWheel"
      @change="handlePickerChange"
    />

    <div v-if="showNextDayLabel" :class="n('next-day')" role="status">{{ nextDayText }}</div>
    <p v-if="orderInvalid && !feedbackHosted" :class="n('order-error')" role="alert">
      {{ translate('timeRangeOrderError') }}
    </p>
    <slot name="extra" />
    <div
      v-if="$slots.actions || (!hostActions && (showNowButton || !disableConfirm || confirmationRequired))"
      :class="n('actions')"
    >
      <slot
        name="actions"
        :confirm="confirm"
        :can-confirm="canConfirm"
        :value="draft"
        :select-now="selectNow"
        :now-disabled="nowDisabled"
      >
        <component :is="nowAction" v-if="!hostActions" />
        <mp-button
          v-if="!disableConfirm || confirmationRequired"
          :class="n('confirm')"
          status="primary"
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
import {
  computed,
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
  toRefs,
  type ExtractPropTypes,
  type PropType,
} from 'vue'
import { editorAuxiliaryActions, useEditorFeedback } from '../../_components/field-presentation/editor-actions'
import MpButton from '../../button'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../../picker'
import { getTimePickerColumnLabels } from '../../time/picker-columns'
import type { TimeValue } from '../../time/time-value'
import type { useTimePanel } from '../../time/use-time-panel'
import { createNamespace, formatElevation } from '../../utils/components'
import { props as panelProps } from '../picker-props'
import type { useMobileRangePanel } from './use-mobile-range-panel'

type ContentState = ReturnType<typeof useTimePanel<TimeValue[]>> & ReturnType<typeof useMobileRangePanel>
const { n, classes } = createNamespace('time-range-picker')

export default defineComponent({
  name: createNamespace('time-range-panel-content').name,
  components: { MpButton, MpPicker },
  props: {
    options: { type: Object as PropType<Readonly<ExtractPropTypes<typeof panelProps>>>, required: true },
    state: { type: Object as PropType<ContentState>, required: true },
  },
  setup(props) {
    const { t: pt } = injectLocaleProvider()
    const translate = (key: string) => (pt ? pt : t)(key as any)
    const columnLabels = computed(() => {
      const labels = getTimePickerColumnLabels(props.options, translate)
      return [...labels, ...labels]
    })
    const hostActions = inject(editorAuxiliaryActions, undefined)
    const feedbackHosted = useEditorFeedback(() =>
      props.state.orderInvalid.value ? translate('timeRangeOrderError') : undefined,
    )
    const nowAction = () =>
      props.options.showNowButton
        ? h(
            MpButton,
            {
              variant: 'text',
              disabled: props.state.nowDisabled.value,
              'aria-label': `${translate(props.state.activeIndex.value === 0 ? 'timeRangeStart' : 'timeRangeEnd')}${translate('datePickerNowButtonText')}`,
              onClick: () => {
                props.state.selectNow()
              },
            },
            () => translate('datePickerNowButtonText'),
          )
        : undefined
    if (hostActions) {
      hostActions.value = nowAction
    }
    onBeforeUnmount(() => {
      if (hostActions?.value === nowAction) {
        hostActions.value = undefined
      }
    })
    // Reuse the owner's refs; no duplicate model or draft.
    return {
      hostActions,
      feedbackHosted,
      nowAction,
      ...toRefs(props.options),
      ...props.state,
      n,
      columnLabels,
      classes,
      formatElevation,
      translate,
      nextDayText: computed(() => translate('timeRangeNextDay')),
    }
  },
})
</script>
