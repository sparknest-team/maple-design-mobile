<template>
  <div :class="n()">
    <mp-button
      :class="n('arrow')"
      mp-date-picker-header-cover
      round
      variant="text"
      :disabled="disabled.left"
      :aria-label="previousLabel"
      @click="checkDate('prev')"
    >
      <mp-icon><MIconChevronLeft /></mp-icon>
    </mp-button>
    <component
      :is="type === 'year' ? 'div' : 'button'"
      :type="type === 'year' ? undefined : 'button'"
      :class="n('value')"
      @click="type !== 'year' && $emit('check-panel')"
    >
      <transition :name="`mp-date-picker${reverse ? '-reverse' : ''}-translatex`">
        <div :key="showDate">{{ showDate }}</div>
      </transition>
      <mp-icon v-if="type !== 'year'" :class="n('toggle-icon')"><MIconChevronDown /></mp-icon>
    </component>
    <mp-button
      :class="n('arrow')"
      mp-date-picker-header-cover
      round
      variant="text"
      :disabled="disabled.right"
      :aria-label="nextLabel"
      @click="checkDate('next')"
    >
      <mp-icon><MIconChevronRight /></mp-icon>
    </mp-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import type { ComputedRef, PropType, Ref } from 'vue'
import {
  IconChevronDown as MIconChevronDown,
  IconChevronLeft as MIconChevronLeft,
  IconChevronRight as MIconChevronRight,
} from '@maple-design/icons-vue'
import { toNumber } from '@maple-design/shared-vue'
import MpButton from '../../button'
import MpIcon from '../../icon'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { createNamespace } from '../../utils/components'
import type { PanelBtnDisabled, Preview } from '../picker-props'

const { n } = createNamespace('date-picker-header')

export default defineComponent({
  name: createNamespace('panel-header').name,
  components: {
    MIconChevronLeft,
    MIconChevronRight,
    MIconChevronDown,
    MpButton,
    MpIcon,
  },
  props: {
    date: {
      type: Object as PropType<Preview>,
      required: true,
    },
    type: {
      type: String,
      default: 'date',
    },
    disabled: {
      type: Object as PropType<PanelBtnDisabled>,
      required: true,
    },
  },
  emits: ['check-panel', 'check-date'],

  setup(props, { emit }) {
    const reverse: Ref<boolean> = ref(false)
    const forwardOrBackNum: Ref<number> = ref(0)
    const { t: pt } = injectLocaleProvider()
    const label = (direction: 'Previous' | 'Next') => {
      const unit = props.type === 'year' ? 'Period' : props.type === 'month' ? 'Year' : 'Month'
      const key = `datePicker${direction}${unit}`
      return pt?.(key) ?? t(key)
    }
    const previousLabel = computed(() => label('Previous'))
    const nextLabel = computed(() => label('Next'))

    const showDate: ComputedRef<number | string> = computed(() => {
      const { date, type } = props
      const { previewMonth, previewYear }: Preview = date

      if (type === 'year') {
        return previewYear
      }

      if (type === 'month') {
        return toNumber(previewYear) + forwardOrBackNum.value
      }

      const monthName = (pt || t)('datePickerMonthDict')?.[previewMonth!].name
      return (pt || t)('lang') === 'zh-CN' ? `${previewYear} ${monthName}` : `${monthName} ${previewYear}`
    })

    const checkDate = (checkType: string) => {
      if ((checkType === 'prev' && props.disabled.left) || (checkType === 'next' && props.disabled.right)) {
        return
      }

      emit('check-date', checkType)
      reverse.value = checkType === 'prev'
      forwardOrBackNum.value += checkType === 'prev' ? -1 : 1
    }

    watch(
      () => props.date,
      () => {
        forwardOrBackNum.value = 0
      },
    )

    return {
      n,
      previousLabel,
      nextLabel,
      reverse,
      showDate,
      checkDate,
    }
  },
})
</script>
