<template>
  <div :class="n()">
    <div :class="n('content')">
      <panel-header
        ref="headerEl"
        type="day"
        :date="preview"
        :disabled="panelBtnDisabled"
        @check-panel="clickMonth"
        @check-date="checkDate"
      />
      <transition :name="`${nDate()}${reverse ? '-reverse' : ''}-translatex`">
        <div :key="panelKey">
          <ul :class="n('head')">
            <li v-for="week in sortWeekList" :key="week">{{ getDayAbbr(week) }}</li>
          </ul>
          <ul :class="n('body')">
            <li v-for="(day, index) in days" :key="index">
              <mp-button
                mp-day-picker-cover
                round
                :ripple="false"
                :elevation="componentProps.buttonElevation"
                v-bind="{
                  ...buttonProps(day),
                }"
                @click="(event: Event) => chooseDay(day, event)"
              >
                {{ filterDay(day) }}
              </mp-button>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type ComputedRef, type PropType, type Ref, type RendererNode } from 'vue'
import { toNumber } from '@maplejs/maple-shared'
import dayjs from 'dayjs/esm/index.js'
import isSameOrAfter from 'dayjs/esm/plugin/isSameOrAfter/index.js'
import isSameOrBefore from 'dayjs/esm/plugin/isSameOrBefore/index.js'
import MpButton, { type ButtonVariant, type SemanticStatus } from '../../button'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { createNamespace } from '../../utils/components'
import { calendarMonthDays } from '../../utils/picker-data'
import {
  WEEK_HEADER,
  type Choose,
  type ComponentProps,
  type PanelBtnDisabled,
  type Preview,
  type Week,
} from '../picker-props'
import PanelHeader from './PanelHeader.vue'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const { n, classes } = createNamespace('day-picker')
const { n: nDate } = createNamespace('date-picker')

export default defineComponent({
  name: createNamespace('day-picker-panel').name,
  components: {
    MpButton,
    PanelHeader,
  },
  props: {
    choose: {
      type: Object as PropType<Choose>,
      required: true,
    },
    preview: {
      type: Object as PropType<Preview>,
      required: true,
    },
    current: {
      type: String,
      required: true,
    },
    clickMonth: {
      type: Function as PropType<() => void>,
      required: true,
    },
    componentProps: {
      type: Object as PropType<ComponentProps>,
      required: true,
    },
  },
  emits: ['check-preview', 'choose-day'],

  setup(props, { emit }) {
    const [currentYear, currentMonth, currentDay] = props.current.split('-')
    const reverse: Ref<boolean> = ref(false)
    const panelKey: Ref<number> = ref(0)
    const headerEl: Ref<RendererNode | null> = ref(null)

    const { t: pt } = injectLocaleProvider()

    const isCurrent: ComputedRef<boolean> = computed(
      () => props.preview.previewYear === currentYear && props.preview.previewMonth === currentMonth,
    )

    const isSame: ComputedRef<boolean> = computed(
      () =>
        props.choose.chooseYear === props.preview.previewYear &&
        props.choose.chooseMonth === props.preview.previewMonth,
    )

    const sortWeekList: ComputedRef<Array<Week>> = computed(() => {
      const index = WEEK_HEADER.findIndex((week: Week) => week === String(props.componentProps.dayStartOfWeek))

      if (index === -1 || index === 0) {
        return WEEK_HEADER
      }

      return [...WEEK_HEADER.slice(index), ...WEEK_HEADER.slice(0, index)]
    })

    const getDayAbbr = (key: Week): string => (pt || t)('datePickerWeekDict')?.[key].abbr ?? ''

    const filterDay = (day: number): number | string => (day > 0 ? day : '')

    const days = computed(() => {
      const {
        preview: { previewMonth, previewYear },
      }: { preview: Preview } = props

      const monthNum = calendarMonthDays(Number(previewYear), Number(previewMonth))
      const firstDayToWeek = dayjs(`${previewYear}-${previewMonth}-01`).day()
      const index = sortWeekList.value.findIndex((week: Week) => week === `${firstDayToWeek}`)
      return [...Array(index).fill(-1), ...Array.from(Array(monthNum + 1).keys())].filter((value) => value)
    })

    const panelBtnDisabled = computed<PanelBtnDisabled>(() => {
      const { previewYear, previewMonth } = props.preview
      const { max, min } = props.componentProps
      return {
        right: !!max && !dayjs(`${previewYear}-${toNumber(previewMonth) + 1}`).isSameOrBefore(dayjs(max), 'month'),
        left: !!min && !dayjs(`${previewYear}-${toNumber(previewMonth) - 1}`).isSameOrAfter(dayjs(min), 'month'),
      }
    })

    const inRange = (day: number) => {
      const {
        preview: { previewYear, previewMonth },
        componentProps: { min, max },
      }: { preview: Preview; componentProps: ComponentProps } = props

      let isBeforeMax = true
      let isAfterMin = true
      const previewDate = `${previewYear}-${previewMonth}-${day}`

      if (max) {
        isBeforeMax = dayjs(previewDate).isSameOrBefore(dayjs(max), 'day')
      }
      if (min) {
        isAfterMin = dayjs(previewDate).isSameOrAfter(dayjs(min), 'day')
      }

      return isBeforeMax && isAfterMin
    }

    const shouldChoose = (val: string): boolean => {
      const {
        choose: { chooseDays, chooseRangeDay },
        componentProps: { range },
      }: { choose: Choose; componentProps: ComponentProps } = props

      if (range) {
        if (!chooseRangeDay.length) {
          return false
        }

        const isBeforeMax = dayjs(val).isSameOrBefore(dayjs(chooseRangeDay[1]), 'day')
        const isAfterMin = dayjs(val).isSameOrAfter(dayjs(chooseRangeDay[0]), 'day')
        return isBeforeMax && isAfterMin
      }

      return chooseDays.includes(val)
    }

    const buttonProps = (day: number) => {
      if (day < 0) {
        return {
          variant: 'text' as ButtonVariant,
          status: 'default' as SemanticStatus,
          textColor: '',
          class: n('button'),
          disabled: true,
        }
      }

      const {
        choose: { chooseDay },
        preview: { previewYear, previewMonth },
        componentProps: { disabledDate, color, multiple, range },
      }: { choose: Choose; preview: Preview; componentProps: ComponentProps } = props

      const val = `${previewYear}-${previewMonth}-${day}`

      const dayExist = (): boolean => {
        if (range || multiple) {
          return shouldChoose(val)
        }

        return toNumber(chooseDay) === day && isSame.value
      }

      const computeDisabled = (): boolean => {
        if (!inRange(day)) {
          return true
        }
        if (!disabledDate) {
          return false
        }

        return !!disabledDate(val)
      }
      const disabled = computeDisabled()

      const computeText = (): boolean => {
        if (disabled) {
          return true
        }
        if (range || multiple) {
          return !shouldChoose(val)
        }

        return !isSame.value || toNumber(chooseDay) !== day
      }

      const computeOutline = (): boolean => {
        // Not satisfied with the basic conditions, the basic conditions are the current year, the current month, the current day, and the showCurrent as true
        if (!(isCurrent.value && toNumber(currentDay) === day && props.componentProps.showCurrent)) {
          return false
        }

        if ((range || multiple || isSame.value) && disabled) {
          return true
        }

        // Outside the selection range
        if (range || multiple) {
          return !shouldChoose(val)
        }

        // In the same year but not selected
        if (isSame.value) {
          return chooseDay !== currentDay
        }

        return true
      }

      const textColorOrCover = (): string => {
        if (disabled) {
          return ''
        }
        if (computeOutline()) {
          return color ?? ''
        }
        if (dayExist()) {
          return ''
        }

        return `${nDate()}-color-cover`
      }

      const isCover = textColorOrCover().startsWith(nDate())
      const variant: ButtonVariant = computeOutline() ? 'outline' : computeText() ? 'text' : 'default'
      const status: SemanticStatus = !computeText() ? 'primary' : 'default'

      return {
        variant,
        status,
        textColor: isCover ? '' : textColorOrCover(),
        [`${nDate()}-color-cover`]: isCover,
        class: classes(n('button'), n('button--usable'), [disabled, n('button--disabled')]),
        disabled,
      }
    }

    const checkDate = (checkType: string) => {
      reverse.value = checkType === 'prev'
      panelKey.value += checkType === 'prev' ? -1 : 1
      emit('check-preview', 'month', checkType)
    }

    const chooseDay = (day: number, event: Event) => {
      const buttonEl = event.currentTarget as HTMLButtonElement
      if (buttonEl.classList.contains(n('button--disabled'))) {
        return
      }

      emit('choose-day', day)
    }

    // expose for internal
    const forwardRef = (checkType: string) => {
      headerEl.value!.checkDate(checkType)
    }

    return {
      n,
      nDate,
      days,
      reverse,
      headerEl,
      panelKey,
      sortWeekList,
      panelBtnDisabled,
      forwardRef,
      filterDay,
      getDayAbbr,
      checkDate,
      chooseDay,
      buttonProps,
    }
  },
})
</script>
