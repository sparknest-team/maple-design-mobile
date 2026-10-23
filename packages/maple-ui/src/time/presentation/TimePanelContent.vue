<template>
  <div :class="classes(n(), formatElevation(elevation, 2), [useSeconds, n('--with-seconds')])">
    <div :class="n('column-labels')">
      <span v-for="(label, index) in columnLabels" :key="index" :class="n('column-label')">{{ label }}</span>
    </div>
    <mp-picker
      :class="n('wheel')"
      v-bind="pickerBindingProps"
      :toolbar="false"
      :disabled="disabled || readonly"
      :columns="pickerColumns"
      :model-value="pickerValue"
      @change="handlePickerChange"
    />
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
        <component :is="nowAction" />
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
          {{ (pt ? pt : t)('pickerConfirmButtonText') }}
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
import { editorAuxiliaryActions } from '../../_components/field-presentation/editor-actions'
import MpButton from '../../button'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../../picker'
import { createNamespace, formatElevation } from '../../utils/components'
import { getTimePickerColumnLabels } from '../picker-columns'
import { props as panelProps } from '../picker-props'
import type { TimeValue } from '../time-value'
import type { useTimePanel } from '../use-time-panel'
import type { useMobileTimePanel } from './use-mobile-time-panel'

type ContentState = ReturnType<typeof useTimePanel<TimeValue>> & ReturnType<typeof useMobileTimePanel>
const { n, classes } = createNamespace('time-picker')

export default defineComponent({
  name: createNamespace('time-panel-content').name,
  components: { MpButton, MpPicker },
  props: {
    options: { type: Object as PropType<Readonly<ExtractPropTypes<typeof panelProps>>>, required: true },
    state: { type: Object as PropType<ContentState>, required: true },
  },
  setup(props) {
    const { t: pt } = injectLocaleProvider()
    const hostActions = inject(editorAuxiliaryActions, undefined)
    const nowAction = () =>
      props.options.showNowButton
        ? h(
            MpButton,
            {
              variant: 'text',
              disabled: props.state.nowDisabled.value,
              onClick: () => {
                props.state.selectNow()
              },
            },
            () => (pt ?? t)('datePickerNowButtonText'),
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

    // The owner supplies the only draft and confirmation transaction.
    return {
      hostActions,
      nowAction,
      ...toRefs(props.options),
      ...props.state,
      columnLabels: computed(() => getTimePickerColumnLabels(props.options, (key) => (pt ?? t)(key as any))),
      n,
      classes,
      formatElevation,
      t,
      pt,
    }
  },
})
</script>
