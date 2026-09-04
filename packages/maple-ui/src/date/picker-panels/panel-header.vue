<template>
  <div :class="n()">
    <mp-button
      :class="n('arrow')"
      mp-date-picker-header-cover
      round
      variant="text"
      :disabled="disabled.left"
      @click="checkDate('prev')"
    >
      <mp-icon><MIconChevronLeft /></mp-icon>
    </mp-button>
    <div :class="n('value')" @click="$emit('check-panel')">
      <transition :name="`mp-date-picker${reverse ? '-reverse' : ''}-translatex`">
        <div :key="showDate">{{ showDate }}</div>
      </transition>
    </div>
    <mp-button
      :class="n('arrow')"
      mp-date-picker-header-cover
      round
      variant="text"
      :disabled="disabled.right"
      @click="checkDate('next')"
    >
      <mp-icon><MIconChevronRight /></mp-icon>
    </mp-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import type { ComputedRef, PropType, Ref } from 'vue'
import { IconChevronLeft as MIconChevronLeft, IconChevronRight as MIconChevronRight } from '@maplejs/icons-vue'
import { toNumber } from '@maplejs/maple-shared'
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
      reverse,
      showDate,
      checkDate,
    }
  },
})
</script>
