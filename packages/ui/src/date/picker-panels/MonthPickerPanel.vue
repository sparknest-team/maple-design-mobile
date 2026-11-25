<template>
  <div :class="n()">
    <div :class="n('content')">
      <panel-header
        ref="headerEl"
        type="month"
        :date="preview"
        :disabled="panelBtnDisabled"
        @check-panel="clickYear"
        @check-date="checkDate"
      />
      <transition :name="`${nDate()}${reverse ? '-reverse' : ''}-translatex`">
        <ul :key="panelKey" @pointerleave="clearPreview" @keydown="onGridKeydown">
          <li
            v-for="month in MONTH_LIST"
            :key="month"
            :class="[rangeClasses(dateOf(month)), { [n('range--disabled')]: buttonProps(month).disabled }]"
            @pointerenter="previewCell(month, $event)"
          >
            <mp-button
              mp-month-picker-cover
              :ripple="false"
              :elevation="componentProps.buttonElevation"
              v-bind="{
                ...buttonProps(month),
              }"
              @click="(event: Event) => chooseMonth(month, event)"
            >
              {{ getMonthAbbr(month) }}
            </mp-button>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import type { ComputedRef, PropType, Ref, RendererNode } from 'vue'
import { toNumber } from '@maple-design/shared-vue'
import { navigateTemporalGrid } from '../../_utils/temporal-keyboard'
import type { ButtonVariant, SemanticStatus } from '../../button'
import MpButton from '../../button/base'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { dateText as t } from '../../locale/date-text'
import { createNamespace } from '../../utils/components'
import { dateMonthLabel } from '../date-labels'
import { MONTH_LIST } from '../picker-props'
import type { Choose, ComponentProps, Month, PanelBtnDisabled, Preview } from '../picker-props'
import { isRangeHighlighted } from '../range-highlight'
import { useCalendarRangeStyle } from '../use-calendar-range-style'
import { withinCalendarBounds } from './calendar-bounds'
import PanelHeader from './PanelHeader.vue'

const { n, classes } = createNamespace('month-picker')
const { n: nDate } = createNamespace('date-picker')

export default defineComponent({
  name: createNamespace('month-picker-panel').name,
  components: {
    MpButton,
    PanelHeader,
  },
  props: {
    rangePending: Boolean,
    readonly: Boolean,
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
    clickYear: {
      type: Function as PropType<() => void>,
      required: true,
    },
    componentProps: {
      type: Object as PropType<ComponentProps>,
      required: true,
    },
  },
  emits: ['check-preview', 'choose-month'],

  setup(props, { emit }) {
    const dateOf = (key: string) => `${props.preview.previewYear}-${key}`
    const { rangeState, rangeClasses, preview, clearPreview } = useCalendarRangeStyle({
      endpoints: () => props.choose.chooseRangeMonth,
      pending: () => props.rangePending,
      enabled: () => props.componentProps.range && props.componentProps.type === 'month',
      readonly: () => props.readonly,
      version: () => [props.preview, props.componentProps],
      unit: 'month',
      name: n,
    })
    const previewCell = (key: string, event: PointerEvent) => preview(dateOf(key), event, buttonProps(key).disabled)
    const [currentYear, currentMonth] = props.current.split('-')
    const reverse: Ref<boolean> = ref(false)
    const panelKey: Ref<number> = ref(0)
    const headerEl: Ref<RendererNode | null> = ref(null)

    const { t: pt } = injectLocaleProvider()

    const isSameYear: ComputedRef<boolean> = computed(() => props.choose.chooseYear === props.preview.previewYear)

    const isCurrentYear: ComputedRef<boolean> = computed(() => props.preview.previewYear === currentYear)

    const getMonthAbbr = (key: Month): string => {
      const month = (pt || t)('datePickerMonthDict')?.[key]
      return dateMonthLabel(props.componentProps.abbreviation, month?.abbr ?? '', month?.name ?? '')
    }

    const inRange = (key: string): boolean => {
      const {
        preview: { previewYear },
        componentProps: { min, max },
      }: { preview: Preview; componentProps: ComponentProps } = props
      return withinCalendarBounds(`${previewYear}-${key}`, 'month', min, max)
    }

    const shouldChoose = (val: string): boolean => {
      const {
        choose: { chooseMonths, chooseDays, chooseRangeMonth },
        componentProps: { type, range },
      }: { choose: Choose; componentProps: ComponentProps } = props

      if (range) {
        return isRangeHighlighted(val, chooseRangeMonth, 'month')
      }

      if (type === 'month') {
        return chooseMonths.includes(val)
      }
      return chooseDays.some((value) => value.includes(val))
    }

    const buttonProps = (key: string) => {
      const {
        choose: { chooseMonth },
        preview: { previewYear },
        componentProps: { disabledDate, color, multiple, range },
      }: { choose: Choose; preview: Preview; componentProps: ComponentProps } = props

      const val = `${previewYear}-${key}`

      const monthExist = (): boolean => {
        if (range || multiple) {
          return shouldChoose(val)
        }
        return chooseMonth === key && isSameYear.value
      }

      const computeDisabled = (): boolean => {
        if (!inRange(key)) {
          return true
        }
        if (!disabledDate) {
          return false
        }

        return !!disabledDate(val)
      }
      const disabled = computeDisabled()

      const computeText = (): boolean => {
        if (range && props.componentProps.type === 'month') {
          const state = rangeState(dateOf(key))
          return disabled || state.previewing || !(state.start || state.end)
        }
        if (disabled) {
          return true
        }
        if (range || multiple) {
          return !shouldChoose(val)
        }

        return !isSameYear.value || chooseMonth !== key
      }

      const computeOutline = (): boolean => {
        // Not met the basic conditions, the basic conditions are the current year, the current month, and the showCurrent as true
        if (!(isCurrentYear.value && currentMonth === key && props.componentProps.showCurrent)) {
          return false
        }

        if ((range || multiple || isSameYear.value) && disabled) {
          return true
        }

        // Outside the selection range
        if (range || multiple) {
          return !shouldChoose(val)
        }

        // In the same year but not selected
        if (isSameYear.value) {
          return chooseMonth !== currentMonth
        }

        return true
      }

      const textColorOrCover = (): string => {
        if (disabled) {
          return ''
        }
        if (computeOutline()) {
          return color ?? 'var(--mp-date-calendar-today-color)'
        }
        if (monthExist()) {
          return ''
        }

        return `${nDate()}-color-cover`
      }

      const isCover = textColorOrCover().startsWith(nDate())
      const variant: ButtonVariant =
        range && rangeState(dateOf(key)).inside
          ? computeText()
            ? 'text'
            : 'default'
          : computeOutline()
            ? 'outline'
            : computeText()
              ? 'text'
              : 'default'
      const status: SemanticStatus = !computeText() ? 'primary' : 'default'

      return {
        variant,
        status,
        color: !computeText() ? (color ?? 'var(--mp-date-calendar-selected-background)') : '',
        textColor: !computeText() ? 'var(--mp-date-calendar-selected-color)' : isCover ? '' : textColorOrCover(),
        [`${nDate()}-color-cover`]: isCover,
        class: classes(n('button'), [disabled, n('button--disabled')]),
        disabled,
      }
    }

    const chooseMonth = (month: Month, event: Event) => {
      const buttonEl = event.currentTarget as HTMLButtonElement
      if (buttonEl.classList.contains(n('button--disabled'))) {
        return
      }

      emit('choose-month', month)
    }

    const checkDate = (checkType: string) => {
      clearPreview()
      reverse.value = checkType === 'prev'
      panelKey.value += checkType === 'prev' ? -1 : 1
      emit('check-preview', 'year', checkType)
    }

    // expose for internal
    const forwardRef = (checkType: string) => {
      headerEl.value!.checkDate(checkType)
    }

    const panelBtnDisabled = computed<PanelBtnDisabled>(() => {
      const year = toNumber(props.preview.previewYear)
      const { max, min } = props.componentProps
      return {
        right: !withinCalendarBounds(`${year + 1}`, 'year', undefined, max),
        left: !withinCalendarBounds(`${year - 1}`, 'year', min),
      }
    })

    return {
      onGridKeydown: (event: KeyboardEvent) => navigateTemporalGrid(event, 'button[mp-month-picker-cover]', 3),
      n,
      nDate,
      t,
      MONTH_LIST,
      headerEl,
      reverse,
      panelKey,
      panelBtnDisabled,
      forwardRef,
      buttonProps,
      dateOf,
      rangeClasses,
      previewCell,
      clearPreview,
      getMonthAbbr,
      chooseMonth,
      checkDate,
    }
  },
})
</script>
