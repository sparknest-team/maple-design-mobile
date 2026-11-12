<template>
  <div>
    <mp-affix css-mode>
      <panel-header
        ref="headerEl"
        type="year"
        :date="{
          previewYear: `${yearList[0]} ~ ${yearList[yearList.length - 1]}`,
        }"
        :disabled="panelBtnDisabled"
        @check-date="checkDate"
      />
    </mp-affix>

    <transition :name="`${nDate()}${reverse ? '-reverse' : ''}-translatex`">
      <ul ref="panel" :key="panelKey" :class="n()" @pointerleave="clearPreview" @keydown="onGridKeydown">
        <li
          v-for="year in yearList"
          :key="year"
          :class="[rangeClasses(dateOf(`${year}`)), { [n('range--disabled')]: buttonProps(`${year}`).disabled }]"
          @pointerenter="previewCell(`${year}`, $event)"
        >
          <mp-button
            mp-year-picker-cover
            :ripple="false"
            :elevation="componentProps.buttonElevation"
            v-bind="{
              ...buttonProps(`${year}`),
            }"
            @click="(event: Event) => chooseYear(year, event)"
          >
            {{ year }}
          </mp-button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onDeactivated,
  ref,
  watch,
  type ComputedRef,
  type PropType,
  type Ref,
  type RendererNode,
} from 'vue'
import { toNumber } from '@maple-design/shared-vue'
import { onSmartMounted } from '@maple-design/use-vue'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'
import { navigateTemporalGrid } from '../../_utils/temporal-keyboard'
import MpAffix from '../../affix'
import type { ButtonVariant, SemanticStatus } from '../../button'
import MpButton from '../../button/base'
import { createNamespace } from '../../utils/components'
import { type Choose, type ComponentProps, type PanelBtnDisabled } from '../picker-props'
import { isRangeHighlighted } from '../range-highlight'
import { useCalendarRangeStyle } from '../use-calendar-range-style'
import PanelHeader from './PanelHeader.vue'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const { n, classes } = createNamespace('year-picker')
const { n: nDate } = createNamespace('date-picker')

export default defineComponent({
  name: createNamespace('year-picker-panel').name,
  components: {
    MpButton,
    MpAffix,
    PanelHeader,
  },
  props: {
    rangePending: Boolean,
    readonly: Boolean,
    choose: {
      type: Object as PropType<Choose>,
      required: true,
    },
    current: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
    },
    componentProps: {
      type: Object as PropType<ComponentProps>,
      required: true,
    },
  },
  emits: ['choose-year'],

  setup(props, { emit }) {
    const dateOf = (year: string) => year
    const { rangeState, rangeClasses, preview, clearPreview } = useCalendarRangeStyle({
      endpoints: () => props.choose.chooseRangeYear,
      pending: () => props.rangePending,
      enabled: () => props.componentProps.range && props.componentProps.type === 'year',
      readonly: () => props.readonly,
      version: () => [props.preview, props.componentProps],
      unit: 'year',
      name: n,
    })
    const previewCell = (year: string, event: PointerEvent) => preview(dateOf(year), event, buttonProps(year).disabled)
    const [currentYear] = props.current.split('-')
    const panel = ref<null | HTMLElement>()
    const headerEl: Ref<RendererNode | null> = ref(null)
    const reverse: Ref<boolean> = ref(false)
    const panelKey: Ref<number> = ref(0)
    const page: Ref<number> = ref(0)

    const yearList: ComputedRef<Array<number>> = computed(() => {
      if (!props.preview) {
        return []
      }

      const startYear = Math.floor(toNumber(props.preview) / 100 + page.value) * 100
      return Array.from(Array(100), (_v, k) => Math.max(0, startYear) + k)
    })

    const shouldChoose = (val: string): boolean => {
      const {
        choose: { chooseMonths, chooseDays, chooseYears, chooseRangeYear },
        componentProps: { type, range },
      }: { choose: Choose; componentProps: ComponentProps } = props

      if (range) {
        return isRangeHighlighted(val, chooseRangeYear, 'year')
      }

      if (type === 'year') {
        return chooseYears.includes(val)
      }
      if (type === 'month') {
        return chooseMonths.some((value) => value.includes(val))
      }

      return chooseDays.some((value) => value.includes(val))
    }

    const inRange = (year: string): boolean => {
      const {
        componentProps: { min, max },
      }: { componentProps: ComponentProps } = props

      const isBeforeMax = max ? dayjs(year).isSameOrBefore(dayjs(max), 'year') : true
      const isAfterMin = min ? dayjs(year).isSameOrAfter(dayjs(min), 'year') : true

      return isBeforeMax && isAfterMin
    }

    const buttonProps = (year: string) => {
      const {
        choose: { chooseYear },
        componentProps: { disabledDate, color, multiple, range },
      }: { choose: Choose; componentProps: ComponentProps } = props

      const yearExist = (): boolean => {
        if (range || multiple) {
          return shouldChoose(year)
        }

        return chooseYear === year
      }

      const computeDisabled = (): boolean => {
        if (!inRange(year)) {
          return true
        }
        if (!disabledDate) {
          return false
        }

        return !!disabledDate(year)
      }
      const disabled = computeDisabled()

      const computeText = (): boolean => {
        if (range && props.componentProps.type === 'year') {
          const state = rangeState(dateOf(year))
          return disabled || state.previewing || !(state.start || state.end)
        }
        if (disabled) {
          return true
        }
        if (range || multiple) {
          return !shouldChoose(year)
        }

        return chooseYear !== year
      }

      const computeOutline = (): boolean => {
        if (!(currentYear === year && props.componentProps.showCurrent)) {
          return false
        }

        if ((range || multiple) && disabled) {
          return true
        }

        // Outside the selection range
        if (range || multiple) {
          return !shouldChoose(year)
        }

        return chooseYear !== currentYear
      }

      const textColorOrCover = (): string => {
        if (disabled) {
          return ''
        }
        if (computeOutline()) {
          return color ?? 'var(--mp-date-calendar-today-color)'
        }
        if (yearExist()) {
          return ''
        }

        return `${nDate()}-color-cover`
      }

      const isCover = textColorOrCover().startsWith(nDate())
      const variant: ButtonVariant =
        range && rangeState(dateOf(year)).inside
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

    const chooseYear = (year: number, event: Event) => {
      const buttonEl = event.currentTarget as HTMLButtonElement
      if (buttonEl.classList.contains(n('button--disabled'))) {
        return
      }

      emit('choose-year', year)
    }

    const scrollToView = () => {
      const activeEl =
        panel.value!.querySelector('.mp-button--status-primary') ??
        panel.value!.querySelector('.mp-button--variant-outline')

      if (!activeEl) {
        return
      }
      // Align only inside the panel's nearest scroll surface. Native scrollIntoView
      // also scrolls the document while a dialog is being mounted or transitioned.
      let container = panel.value?.parentElement
      while (container && container !== document.body && container !== document.documentElement) {
        if (/(auto|scroll)/.test(getComputedStyle(container).overflowY)) {
          if (container.clientHeight > 0 && container.scrollHeight > container.clientHeight) {
            const target = activeEl.getBoundingClientRect()
            const viewport = container.getBoundingClientRect()
            // Dialog entry can scale the DOM; scrollTop uses unscaled layout pixels.
            const scale = container.offsetHeight > 0 ? viewport.height / container.offsetHeight || 1 : 1
            const top =
              container.scrollTop +
              (target.top - viewport.top) / scale -
              container.clientTop -
              (container.clientHeight - target.height / scale) / 2
            container.scrollTop = Math.max(0, Math.min(top, container.scrollHeight - container.clientHeight))
          }
          return
        }
        container = container.parentElement
      }
    }

    const checkDate = (checkType: string) => {
      clearPreview()
      const isPrevType = checkType === 'prev'

      reverse.value = isPrevType
      panelKey.value += isPrevType ? -1 : 1
      page.value += isPrevType ? -1 : 1
    }

    // expose for internal
    const forwardRef = (checkType: string) => {
      headerEl.value!.checkDate(checkType)
    }

    let alignmentGeneration = 0
    let alignmentActive = false
    const requestAlignment = () => {
      if (!alignmentActive) {
        return
      }
      const generation = ++alignmentGeneration
      nextTick(() => {
        if (generation === alignmentGeneration) {
          scrollToView()
        }
      })
    }
    onSmartMounted(() => {
      alignmentActive = true
      requestAlignment()
    })
    watch(() => props.choose, requestAlignment, { deep: true, flush: 'post' })
    const retireAlignment = () => {
      alignmentActive = false
      alignmentGeneration++
    }
    onBeforeUnmount(retireAlignment)
    onDeactivated(retireAlignment)

    function resetPage() {
      page.value = 0
      requestAlignment()
    }

    watch(
      () => props.preview,
      () => {
        page.value = 0
      },
    )

    const panelBtnDisabled = computed<PanelBtnDisabled>(() => {
      const list = yearList.value
      const { max, min } = props.componentProps
      return {
        right: !!max && !dayjs(`${toNumber(list[list.length - 1])}`).isSameOrBefore(dayjs(max), 'year'),
        left: list[0] > 0 && !!min && !dayjs(`${toNumber(list[0])}`).isSameOrAfter(dayjs(min), 'year'),
      }
    })

    return {
      onGridKeydown: (event: KeyboardEvent) => navigateTemporalGrid(event, 'button[mp-year-picker-cover]', 3),
      n,
      classes,
      buttonProps,
      dateOf,
      rangeClasses,
      previewCell,
      clearPreview,
      panel,
      headerEl,
      yearList,
      reverse,
      panelKey,
      panelBtnDisabled,
      nDate,
      checkDate,
      chooseYear,
      forwardRef,
      resetPage,
      toNumber,
    }
  },
})
</script>
