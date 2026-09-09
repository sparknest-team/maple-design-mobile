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
      <ul ref="panel" :key="panelKey" :class="n()">
        <li v-for="year in yearList" :key="year">
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
  reactive,
  ref,
  watch,
  type ComputedRef,
  type PropType,
  type Ref,
  type RendererNode,
  type UnwrapRef,
} from 'vue'
import { toNumber } from '@maplejs/maple-shared'
import { onSmartMounted } from '@maplejs/maple-use'
import dayjs from 'dayjs/esm/index.js'
import MpAffix from '../../affix'
import MpButton, { type ButtonVariant, type SemanticStatus } from '../../button'
import { createNamespace } from '../../utils/components'
import { type Choose, type ComponentProps, type PanelBtnDisabled } from '../picker-props'
import PanelHeader from './panel-header.vue'

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
    const [currentYear] = props.current.split('-')
    const panel = ref<null | HTMLElement>()
    const headerEl: Ref<RendererNode | null> = ref(null)
    const reverse: Ref<boolean> = ref(false)
    const panelKey: Ref<number> = ref(0)
    const page: Ref<number> = ref(0)
    const panelBtnDisabled: UnwrapRef<PanelBtnDisabled> = reactive({
      left: false,
      right: false,
    })

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
        if (!chooseRangeYear.length) {
          return false
        }

        const isBeforeMax = dayjs(val).isSameOrBefore(dayjs(chooseRangeYear[1]), 'year')
        const isAfterMin = dayjs(val).isSameOrAfter(dayjs(chooseRangeYear[0]), 'year')

        return isBeforeMax && isAfterMin
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
          return color ?? ''
        }
        if (yearExist()) {
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
        color: !computeText() ? color : '',
        textColor: isCover ? '' : textColorOrCover(),
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

      activeEl?.scrollIntoView({
        block: 'center',
      })
    }

    const checkDate = (checkType: string) => {
      const isPrevType = checkType === 'prev'

      reverse.value = isPrevType
      panelKey.value += isPrevType ? -1 : 1
      page.value += isPrevType ? -1 : 1
    }

    // expose for internal
    const forwardRef = (checkType: string) => {
      headerEl.value!.checkDate(checkType)
    }

    onSmartMounted(scrollToView)

    watch(
      () => props.preview,
      () => {
        page.value = 0
      },
    )

    watch(
      () => [yearList.value, props.componentProps.max, props.componentProps.min],
      (newVal) => {
        const [list, max, min] = newVal as [number[], string, string]
        if (max) {
          panelBtnDisabled.right = !dayjs(`${toNumber(list[list.length - 1])}`).isSameOrBefore(dayjs(max), 'year')
        }

        if (min) {
          panelBtnDisabled.left = !dayjs(`${toNumber(list[0])}`).isSameOrAfter(dayjs(min), 'year')
        }

        if (toNumber(list[0] <= 0)) {
          panelBtnDisabled.left = false
        }
      },
      {
        immediate: true,
      },
    )

    return {
      n,
      classes,
      buttonProps,
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
      toNumber,
    }
  },
})
</script>
