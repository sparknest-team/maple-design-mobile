<template>
  <component
    :is="dynamic ? n('$-popup') : Transition"
    v-bind="
      dynamic
        ? {
            onOpen: () => $emit('open'),
            onOpened: () => $emit('opened'),
            onClose: () => $emit('close'),
            onClosed: () => $emit('closed'),
            onClickOverlay: handlePopupOverlayClick,
            onKeyEscape: handlePopupKeyEscape,
            overlayClosable,
            escToClose,
            popupContainer,
            open: mergedOpen,
            safeAreaInsetBottom: safeArea,
            safeAreaInsetLeft: safeArea,
            safeAreaInsetRight: safeArea,
            closeOnRouteChange: true,
            'onUpdate:open': handlePopupUpdateShow,
            placement: 'bottom',
            class: n('popup'),
          }
        : null
    "
    mp-picker-cover
  >
    <div :class="n()" v-bind="$attrs">
      <div v-if="toolbar" :class="n('toolbar')">
        <slot name="cancel">
          <mp-button
            :class="n('cancel-button')"
            mp-picker-cover
            variant="text"
            :text-color="cancelButtonTextColor"
            @click="cancel"
          >
            {{ cancelButtonText ?? (pt ? pt : t)('pickerCancelButtonText') }}
          </mp-button>
        </slot>
        <slot name="title">
          <div :class="n('title')">{{ title ?? (pt ? pt : t)('pickerTitle') }}</div>
        </slot>
        <slot name="confirm">
          <mp-button
            :class="n('confirm-button')"
            variant="text"
            mp-picker-cover
            :disabled="confirmButtonDisabled"
            :text-color="confirmButtonTextColor"
            @click="confirm"
          >
            {{ confirmButtonText ?? (pt ? pt : t)('pickerConfirmButtonText') }}
          </mp-button>
        </slot>
      </div>
      <div :class="n('columns')" :style="{ height: `${columnHeight}px` }">
        <div
          v-for="(c, columnIndex) in scrollColumns"
          :key="columnIndex"
          :class="n('column')"
          role="listbox"
          :aria-describedby="describeError($attrs['aria-describedby'])"
          :aria-invalid="mergedError ? true : ($attrs['aria-invalid'] as HTMLAttributes['aria-invalid'])"
          :tabindex="!disabled && c.column.some((option) => !isOptionDisabled(option)) ? 0 : -1"
          :aria-label="`${title ?? (pt ? pt : t)('pickerTitle')} ${columnIndex + 1}`"
          :aria-disabled="disabled || c.column.every(isOptionDisabled) || undefined"
          :aria-activedescendant="
            !disabled && c.column[c.index] && !isOptionDisabled(c.column[c.index])
              ? `${controlId}-${columnIndex}-${c.index}`
              : undefined
          "
          @keydown="handleColumnKeydown($event, c)"
          @touchstart.passive="handleTouchstart($event, c)"
          @touchmove.prevent="handleTouchmove($event, c)"
          @touchend="handleTouchend(c)"
        >
          <div
            :ref="(el) => setScrollEl(el, c)"
            :class="n('scroller')"
            :style="{
              transform: `translateY(${c.translate}px)`,
              transitionDuration: `${c.duration}ms`,
              transitionProperty: c.duration ? 'transform' : 'none',
            }"
            @transitionend="handleTransitionend(c, $event)"
          >
            <div
              v-for="(option, index) in c.column"
              :id="`${controlId}-${columnIndex}-${index}`"
              :key="getValue(option)"
              role="option"
              :aria-selected="index === c.index && !isOptionDisabled(option)"
              :aria-disabled="isOptionDisabled(option) || undefined"
              :class="
                classes(
                  n('option'),
                  option.className,
                  [isOptionSelected(option), n('option--selected')],
                  [isOptionDisabled(option), n('option--disabled')],
                )
              "
              :style="{ height: `${optionHeight}px` }"
              @click="handleClick(c, index)"
            >
              <div :class="classes(n('text'), option.textClassName)">{{ option[getOptionKey('text')] }}</div>
              <mp-icon
                v-if="isOptionSelected(option) && !isOptionDisabled(option)"
                :class="n('option-check')"
                mp-picker-cover
                ><MIconCheck
              /></mp-icon>
            </div>
          </div>
        </div>
        <div
          :class="n('picked')"
          :style="{
            top: `${center}px`,
            height: `${optionHeight}px`,
          }"
        ></div>
        <div :class="n('mask')" :style="{ backgroundSize: `100% ${(columnHeight - optionHeight) / 2}px` }"></div>
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onActivated,
  onDeactivated,
  onMounted,
  onScopeDispose,
  ref,
  toRaw,
  Transition,
  useId,
  watch,
  type ComponentPublicInstance,
  type HTMLAttributes,
  type SlotsType,
} from 'vue'
import { IconCheck as MIconCheck } from '@maple-design/icons-vue'
import { call, clamp, clampArrayRange, toNumber } from '@maple-design/shared-vue'
import { useTouch } from '@maple-design/use-vue'
import MpButton from '../button/base'
import { useFormErrorDescription } from '../form/error-description'
import { useFormItem } from '../form/item-provide'
import MpIcon from '../icon'
import { injectLocaleProvider } from '../locale-provider/provide'
import { temporalText as t } from '../locale/temporal-text'
import MpPopup from '../popup'
import { createNamespace } from '../utils/components'
import { getTranslateY, toPxNum } from '../utils/elements'
import { useFieldNames } from '../utils/options'
import { props, type PickerColumnOption } from './props'
import type { PickerEmits, PickerSlots } from './types'

export interface ScrollColumn {
  id: number
  touching: boolean
  index: number
  prevY: number
  momentumPrevY: number
  momentumTime: number
  translate: number
  duration: number
  scrolling: boolean
  column: PickerColumnOption[]
  scrollEl: HTMLElement | null
}

const { name, n, classes } = createNamespace('picker')

const MOMENTUM_RECORD_TIME = 300
const MOMENTUM_ALLOW_DISTANCE = 15
const TRANSITION_DURATION = 200
const MOMENTUM_TRANSITION_DURATION = 1000
let sid = 0

export default defineComponent({
  name,
  components: {
    MIconCheck,
    MpButton,
    MpIcon,
    MpPopup,
  },
  inheritAttrs: false,
  props,
  slots: Object as SlotsType<PickerSlots>,
  emits: {
    confirm: (..._args: PickerEmits['confirm']) => true,
    cancel: (..._args: PickerEmits['cancel']) => true,
    change: (..._args: PickerEmits['change']) => true,
    'update:open': (..._args: PickerEmits['update:open']) => true,
    'update:modelValue': (..._args: PickerEmits['update:modelValue']) => true,
    open: () => true,
    opened: () => true,
    close: () => true,
    closed: () => true,
    'click-overlay': (..._args: PickerEmits['click-overlay']) => true,
    'key-escape': (..._args: PickerEmits['key-escape']) => true,
  },
  setup(props, { emit }) {
    const { describe: describeError } = useFormErrorDescription()
    const { mergedError } = useFormItem()
    const localOpen = ref(props.defaultOpen)
    const mergedOpen = computed(() => props.open ?? localOpen.value)
    const controlId = useId()
    const reducedMotion = ref(false)
    let motionQuery: MediaQueryList | undefined
    let motionListener: (() => void) | undefined
    let motionMounted = false
    let motionActive = true
    let motionDisposed = false
    let motionEpoch = 0
    const completions = new WeakMap<ScrollColumn, HTMLElement | null>()
    const canUseMotion = () => motionMounted && motionActive && !motionDisposed && (!props.dynamic || mergedOpen.value)
    const isCurrentColumn = (column: ScrollColumn) => canUseMotion() && scrollColumns.value.includes(column)
    function syncMotion() {
      reducedMotion.value = Boolean(motionQuery?.matches)
      if (reducedMotion.value) {
        for (const column of scrollColumns.value) {
          if (column.duration) {
            completions.delete(column)
            column.duration = 0
            column.scrolling = false
            handleScrollColumnChange(column)
          }
        }
      }
    }
    function releaseMotion() {
      const query = motionQuery
      const listener = motionListener
      motionQuery = undefined
      motionListener = undefined
      if (listener) {
        query?.removeEventListener?.('change', listener)
      }
    }
    function bindMotion() {
      if (!canUseMotion() || motionListener) {
        return
      }
      if (typeof window.matchMedia === 'function') {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)')
        const listener = () => {
          if (canUseMotion() && motionQuery === query && motionListener === listener) {
            syncMotion()
          }
        }
        motionQuery = query
        motionListener = listener
        syncMotion()
        if (motionListener === listener) {
          query.addEventListener?.('change', listener)
        }
      }
    }
    function retireMotion() {
      motionEpoch++
      endTouch()
      for (const column of scrollColumns.value) {
        completions.delete(column)
        column.duration = 0
        column.scrolling = false
        column.touching = false
      }
      releaseMotion()
    }
    onMounted(() => {
      motionMounted = true
      bindMotion()
    })
    onActivated(() => {
      const wasActive = motionActive
      motionActive = true
      if (!wasActive) {
        initScrollColumns()
      }
      bindMotion()
    })
    onDeactivated(() => {
      motionActive = false
      retireMotion()
    })
    onScopeDispose(() => {
      motionDisposed = true
      retireMotion()
    })
    const localValue = ref([...props.defaultValue])
    const modelValue = computed({
      get: () => props.modelValue ?? localValue.value,
      set: (value: (string | number)[]) => {
        if (props.modelValue === undefined) {
          localValue.value = value
        }
        emit('update:modelValue', value)
      },
    })
    const scrollColumns = ref<ScrollColumn[]>([])
    const visibleColumnsCount = computed(() => toNumber(props.columnsCount))
    const optionHeight = computed(() => toPxNum(props.optionHeight))
    const optionCount = computed(() => toPxNum(props.optionCount))
    const center = computed(() => (optionCount.value * optionHeight.value) / 2 - optionHeight.value / 2)
    const columnHeight = computed(() => optionCount.value * optionHeight.value)
    const { prevY, moveY, dragging, startTouch, moveTouch, endTouch } = useTouch()
    const { t: pt } = injectLocaleProvider()
    const fieldNames = useFieldNames(props, { label: 'text' })

    let prevIndexes: number[] = []

    initScrollColumns()

    watch(() => props.columns, initScrollColumns, { deep: true })
    watch([visibleColumnsCount, () => props.columnsCount != null], reconcileVisibleColumns)
    watch([optionHeight, optionCount], () => {
      motionEpoch++
      endTouch()
      for (const column of scrollColumns.value) {
        column.touching = false
        column.scrolling = false
        scrollTo(column)
      }
      setPrevIndexes(getPicked().indexes)
    })

    watch(() => modelValue.value, initScrollColumns)
    watch(
      () => [props.dynamic, mergedOpen.value],
      () => {
        if (canUseMotion()) {
          bindMotion()
        } else {
          retireMotion()
        }
      },
      { flush: 'sync' },
    )

    watch(
      () => props.disabled,
      (disabled) => {
        if (disabled) {
          endTouch()
          initScrollColumns()
        }
      },
    )

    function getOptionKey(key: 'text' | 'value' | 'children') {
      const keyMap = {
        text: fieldNames.value.label,
        value: fieldNames.value.value,
        children: fieldNames.value.children,
      }

      return keyMap[key]
    }

    function getValue(option: PickerColumnOption): string | number {
      return option[getOptionKey('value')] ?? option[getOptionKey('text')]
    }

    function isOptionSelected(option: PickerColumnOption) {
      const value = getValue(option)
      return props.selectedValues.some((item) => item === value)
    }

    function isOptionDisabled(option?: PickerColumnOption) {
      return Boolean(option?.disabled)
    }

    const confirmButtonDisabled = computed(
      () =>
        props.disabled ||
        scrollColumns.value.length === 0 ||
        scrollColumns.value.some(({ column, index }) => !column[index] || isOptionDisabled(column[index])),
    )

    function setPrevIndexes(indexes: number[]) {
      prevIndexes = [...indexes]
    }

    function normalizeNormalMode(columns: PickerColumnOption[][], values = modelValue.value) {
      const visibleColumns = props.columnsCount != null ? columns.slice(0, visibleColumnsCount.value) : columns
      return visibleColumns.map((column, idx) => {
        const scrollColumn: ScrollColumn = {
          id: sid++,
          prevY: 0,
          momentumPrevY: 0,
          touching: false,
          translate: center.value,
          index: 0,
          duration: 0,
          momentumTime: 0,
          column,
          scrollEl: null,
          scrolling: false,
        }
        const value = values[idx]
        const index = scrollColumn.column.findIndex((option) => value === getValue(option))
        scrollColumn.index = index === -1 ? 0 : index
        scrollTo(scrollColumn)
        return scrollColumn
      })
    }

    function normalizeCascadeMode(column: PickerColumnOption[], values = modelValue.value) {
      const scrollColumns: ScrollColumn[] = []

      createChildren(scrollColumns, column, true, 1, values)

      return scrollColumns
    }

    function createChildren(
      scrollColumns: ScrollColumn[],
      children: PickerColumnOption[],
      syncModelValue = true,
      depth = 1,
      values = modelValue.value,
    ) {
      if (children.length && (props.columnsCount == null || depth <= visibleColumnsCount.value)) {
        const scrollColumn: ScrollColumn = {
          id: sid++,
          prevY: 0,
          momentumPrevY: 0,
          touching: false,
          translate: center.value,
          index: 0,
          duration: 0,
          momentumTime: 0,
          column: children,
          scrollEl: null,
          scrolling: false,
        }

        scrollColumns.push(scrollColumn)

        if (syncModelValue) {
          const value = values[scrollColumns.length - 1]
          const index = children.findIndex((option) => value === getValue(option))
          scrollColumn.index = index === -1 ? 0 : index
        }

        scrollTo(scrollColumn)
        createChildren(
          scrollColumns,
          scrollColumn.column[scrollColumn.index][getOptionKey('children')] ?? [],
          syncModelValue,
          depth + 1,
          values,
        )
      }
    }

    function rebuildChildren(scrollColumn: ScrollColumn) {
      scrollColumns.value.splice(scrollColumns.value.indexOf(scrollColumn) + 1)
      createChildren(
        scrollColumns.value,
        scrollColumn.column[scrollColumn.index][getOptionKey('children')] ?? [],
        false,
        scrollColumns.value.length + 1,
      )
    }

    function reconcileVisibleColumns() {
      motionEpoch++
      endTouch()
      const previous = scrollColumns.value
      const values = [...modelValue.value]
      getPicked().values.forEach((value, index) => {
        values[index] = value
      })
      const next = props.cascade
        ? normalizeCascadeMode(props.columns as PickerColumnOption[], values)
        : normalizeNormalMode(props.columns as PickerColumnOption[][], values)
      scrollColumns.value = next.map((column, index) => {
        const retained = previous[index]
        if (!retained || toRaw(retained.column) !== toRaw(column.column)) {
          return column
        }
        retained.touching = false
        retained.scrolling = false
        scrollTo(retained)
        return retained
      })
      setPrevIndexes(getPicked().indexes)
    }

    function initScrollColumns() {
      motionEpoch++
      scrollColumns.value = props.cascade
        ? normalizeCascadeMode(props.columns as PickerColumnOption[])
        : normalizeNormalMode(props.columns as PickerColumnOption[][])

      const { indexes } = getPicked()
      setPrevIndexes(indexes)
    }

    function setScrollEl(el: Element | ComponentPublicInstance | null, scrollColumn: ScrollColumn) {
      scrollColumn.scrollEl = el as HTMLElement
    }

    function handlePopupUpdateShow(value: boolean) {
      if (props.open === undefined) {
        localOpen.value = value
      }
      emit('update:open', value)
    }

    function handlePopupOverlayClick(event: MouseEvent) {
      emit('click-overlay', event)
    }

    function handlePopupKeyEscape(event: KeyboardEvent) {
      emit('key-escape', event)
    }

    function clampTranslate(scrollColumn: ScrollColumn) {
      const minTranslate = center.value - scrollColumn.column.length * optionHeight.value
      const maxTranslate = optionHeight.value + center.value
      scrollColumn.translate = clamp(scrollColumn.translate, minTranslate, maxTranslate)
    }

    function getTargetIndex(scrollColumn: ScrollColumn, viewTranslate: number) {
      const index = Math.round((center.value - viewTranslate) / optionHeight.value)
      return clampArrayRange(index, scrollColumn.column)
    }

    function updateTranslate(scrollColumn: ScrollColumn) {
      scrollColumn.translate = center.value - scrollColumn.index * optionHeight.value
      return scrollColumn.translate
    }

    function getPicked() {
      const values: (string | number)[] = []
      const indexes: number[] = []
      const options: PickerColumnOption[] = []

      scrollColumns.value.forEach(({ column, index }) => {
        const option = column[index]
        if (!option) {
          return
        }

        values.push(getValue(option))
        indexes.push(index)
        options.push(option)
      })

      return {
        values,
        indexes,
        options,
      }
    }

    function scrollTo(scrollColumn: ScrollColumn, duration = 0) {
      updateTranslate(scrollColumn)
      scrollColumn.duration = reducedMotion.value ? 0 : duration
      if (scrollColumn.duration) {
        completions.set(scrollColumn, scrollColumn.scrollEl)
      } else {
        completions.delete(scrollColumn)
      }
    }

    function momentum(scrollColumn: ScrollColumn, distance: number, duration: number) {
      scrollColumn.translate += (Math.abs(distance / duration) / 0.003) * (distance < 0 ? -1 : 1)
    }

    function handleClick(scrollColumn: ScrollColumn, index: number) {
      if (
        !isCurrentColumn(scrollColumn) ||
        props.disabled ||
        dragging.value ||
        !scrollColumn.column[index] ||
        isOptionDisabled(scrollColumn.column[index])
      ) {
        return
      }

      motionEpoch++
      scrollColumn.index = index
      scrollTo(scrollColumn, TRANSITION_DURATION)
      if (!scrollColumn.duration) {
        handleScrollColumnChange(scrollColumn)
      }
    }

    function handleColumnKeydown(event: KeyboardEvent, column: ScrollColumn) {
      if (!isCurrentColumn(column) || props.disabled) {
        return
      }
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.isComposing ||
        event.keyCode === 229
      ) {
        return
      }
      if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
        return
      }
      event.preventDefault()
      event.stopPropagation()
      const enabled = column.column.flatMap((option, index) => (isOptionDisabled(option) ? [] : [index]))
      const target =
        event.key === 'Home'
          ? enabled[0]
          : event.key === 'End'
            ? enabled[enabled.length - 1]
            : event.key === 'ArrowDown'
              ? enabled.find((index) => index > column.index)
              : [...enabled].reverse().find((index) => index < column.index)
      if (target === undefined || target === column.index) {
        return
      }
      motionEpoch++
      column.index = target
      column.scrolling = false
      scrollTo(column)
      handleScrollColumnChange(column)
    }

    function handleTouchstart(event: TouchEvent, scrollColumn: ScrollColumn) {
      if (!isCurrentColumn(scrollColumn) || !scrollColumn.scrollEl || props.disabled) {
        return
      }
      motionEpoch++
      scrollColumn.touching = true
      scrollColumn.translate = getTranslateY(scrollColumn.scrollEl as HTMLElement)
      startTouch(event)
    }

    function handleTouchmove(event: TouchEvent, scrollColumn: ScrollColumn) {
      if (!isCurrentColumn(scrollColumn) || props.disabled) {
        return
      }
      if (!scrollColumn.touching) {
        return
      }

      motionEpoch++
      moveTouch(event)
      scrollColumn.scrolling = false
      scrollColumn.duration = 0
      scrollColumn.prevY = prevY.value
      scrollColumn.translate += moveY.value

      clampTranslate(scrollColumn)

      const now = performance.now()
      if (now - scrollColumn.momentumTime > MOMENTUM_RECORD_TIME) {
        scrollColumn.momentumTime = now
        scrollColumn.momentumPrevY = scrollColumn.translate
      }
    }

    function handleTouchend(scrollColumn: ScrollColumn) {
      if (!isCurrentColumn(scrollColumn) || !scrollColumn.touching) {
        return
      }
      if (props.disabled) {
        endTouch()
        scrollColumn.touching = false
        return
      }
      endTouch()

      scrollColumn.touching = false
      scrollColumn.prevY = 0
      const distance = scrollColumn.translate - scrollColumn.momentumPrevY
      const duration = performance.now() - scrollColumn.momentumTime
      const shouldMomentum =
        !reducedMotion.value && Math.abs(distance) >= MOMENTUM_ALLOW_DISTANCE && duration <= MOMENTUM_RECORD_TIME
      const oldTranslate = scrollColumn.translate

      if (shouldMomentum) {
        momentum(scrollColumn, distance, duration)
      }

      scrollColumn.index = getTargetIndex(scrollColumn, scrollColumn.translate)
      scrollTo(scrollColumn, shouldMomentum ? MOMENTUM_TRANSITION_DURATION : TRANSITION_DURATION)
      scrollColumn.scrolling = scrollColumn.translate !== oldTranslate

      // Can't trigger transition end when not scrolling, change needs to be triggered manually.
      if (!scrollColumn.scrolling || !scrollColumn.duration) {
        scrollColumn.scrolling = false
        handleScrollColumnChange(scrollColumn)
      }
    }

    function handleTransitionend(scrollColumn: ScrollColumn, event?: TransitionEvent) {
      if (
        !isCurrentColumn(scrollColumn) ||
        !completions.has(scrollColumn) ||
        completions.get(scrollColumn) !== scrollColumn.scrollEl ||
        (event &&
          (event.target !== scrollColumn.scrollEl || (event.propertyName && event.propertyName !== 'transform')))
      ) {
        return
      }
      completions.delete(scrollColumn)
      scrollColumn.duration = 0
      scrollColumn.scrolling = false
      handleScrollColumnChange(scrollColumn)
    }

    function isSamePicked() {
      const { indexes } = getPicked()
      return indexes.every((index, idx) => index === prevIndexes[idx])
    }

    function handleScrollColumnChange(scrollColumn: ScrollColumn) {
      if (!isCurrentColumn(scrollColumn) || props.disabled) {
        return
      }
      const epoch = motionEpoch
      const { cascade } = props

      if (isSamePicked()) {
        return
      }

      if (cascade) {
        rebuildChildren(scrollColumn)
      }

      const hasScrolling = scrollColumns.value.some((scrollColumn) => scrollColumn.scrolling)
      const hasTouching = scrollColumns.value.some((scrollColumn) => scrollColumn.touching)
      if (hasScrolling || hasTouching) {
        return
      }

      // rebuild will update the value of picked, so need to get the latest value again.
      const { values, indexes, options } = getPicked()
      setPrevIndexes(indexes)
      emit('change', values, indexes, options)
      if (epoch === motionEpoch && isCurrentColumn(scrollColumn) && !props.disabled) {
        modelValue.value = values
      }
    }

    function stopScroll() {
      if (props.cascade) {
        const currentScrollColumn = scrollColumns.value.find((scrollColumn) => scrollColumn.scrolling)

        if (currentScrollColumn) {
          currentScrollColumn.index = getTargetIndex(currentScrollColumn, getTranslateY(currentScrollColumn.scrollEl!))
          currentScrollColumn.scrolling = false
          scrollTo(currentScrollColumn)
          rebuildChildren(currentScrollColumn)
        }
      } else {
        scrollColumns.value.forEach((scrollColumn) => {
          scrollColumn.index = getTargetIndex(scrollColumn, getTranslateY(scrollColumn.scrollEl!))
          scrollTo(scrollColumn)
        })
      }
    }

    // expose
    function confirm() {
      if (!canUseMotion()) {
        return
      }
      stopScroll()

      if (confirmButtonDisabled.value) {
        return
      }

      const { values, indexes, options } = getPicked()
      setPrevIndexes(indexes)
      emit('confirm', values, indexes, options)
    }

    // expose
    function cancel() {
      if (!canUseMotion()) {
        return
      }
      stopScroll()

      const { values, indexes, options } = getPicked()
      setPrevIndexes(indexes)
      emit('cancel', values, indexes, options)
    }

    return {
      describeError,
      mergedError,
      mergedOpen,
      controlId,
      handleColumnKeydown,
      optionHeight,
      optionCount,
      scrollColumns,
      columnHeight,
      center,
      confirmButtonDisabled,
      Transition,
      toRaw,
      pt,
      t,
      n,
      classes,
      isOptionSelected,
      isOptionDisabled,
      setScrollEl,
      getOptionKey,
      getValue,
      handlePopupUpdateShow,
      handlePopupOverlayClick,
      handlePopupKeyEscape,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      handleTransitionend,
      confirm,
      cancel,
      handleClick,
    }
  },
})
</script>
