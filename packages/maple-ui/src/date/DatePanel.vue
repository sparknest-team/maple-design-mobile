<template>
  <div
    :class="
      classes(
        n('layout'),
        n(`layout--${options.shortcutsPosition ?? 'bottom'}`),
        [Boolean(hostActions), n('layout--embedded')],
        [!hostActions, n('layout--standalone')],
        [isRange, n('layout--range')],
        [options.showTime, n('layout--time')],
        [String(options.type) === 'week', n('layout--week')],
        [
          Boolean(options.shortcuts?.length) && (options.shortcutsPosition ?? 'bottom') !== 'bottom',
          n('layout--side-shortcuts'),
        ],
      )
    "
  >
    <DateShortcuts
      v-if="options.shortcuts?.length && !quick.enabled.value"
      :shortcuts="options.shortcuts"
      :position="options.shortcutsPosition ?? 'bottom'"
      :blocked="blocked"
      @choose="tools.choose"
      @preview="tools.preview"
    />
    <div :class="n('main')">
      <DatePanelContent
        v-bind="$attrs"
        :endpoint-editor="endpointEditor"
        :options="options"
        :range="isRange"
        :value="tools.displayValue.value"
        :picker-value="tools.pickerValue.value"
        :can-confirm="selection.canConfirm.value"
        @navigate="tools.navigate"
        @select="select"
        @confirm="confirm()"
      >
        <template v-for="name in forwardedSlots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
      </DatePanelContent>
      <p v-if="orderError && !feedbackHosted" :class="n('order-error')" role="alert">{{ orderError }}</p>
      <DatePanelActions
        v-if="!hostActions"
        :show-now="showNow"
        :show-confirm="options.disableConfirm === false || quick.open.value || quick.pending.value"
        :now-disabled="nowDisabled"
        :can-confirm="selection.canConfirm.value"
        :show-quick="quick.enabled.value"
        :quick-open="quick.open.value"
        :quick-disabled="blocked"
        @toggle-quick="quick.toggle"
        @select-now="selectNow"
        @confirm="confirm()"
      >
        <template v-if="$slots.actions" #default="scope"><slot name="actions" v-bind="scope" /></template>
      </DatePanelActions>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, h, inject, nextTick, onBeforeUnmount, onMounted, provide, useSlots, watch, type PropType } from 'vue'
import { editorAuxiliaryActions, useEditorFeedback } from '../_components/field-presentation/editor-actions'
import { provideRangePanel } from '../_components/picker-field/range-field-context'
import { useFieldValue } from '../_components/picker-field/use-field-value'
import { createNamespace } from '../utils/components'
import { resolveEmptyValue } from '../utils/empty-value'
import { currentDateValue, provideDateCurrent } from './date-current'
import { provideDateLocale, scopeDateOptions } from './date-locale'
import { isDateEndpointSelectionValid } from './date-rules'
import { dateEventPayload, outputDateValue, parseDateValue, type DateSelection } from './date-value'
import DatePanelActions from './DatePanelActions.vue'
import DateShortcuts from './DateShortcuts.vue'
import type { DatePanelOptions } from './panel-state'
import { simultaneousDateLayout } from './presentation/calendar-layout'
import DatePanelContent from './presentation/DatePanelContent.vue'
import { useDateLocale } from './presentation/use-date-locale'
import { usePanelActionsLocale } from './presentation/use-panel-actions-locale'
import { useRangeQuickSelection } from './range-quick-selection'
import { useDatePanelTools } from './use-date-panel-tools'
import { useDateSelection } from './use-date-selection'
import { dateWheelDraft } from './wheel-draft'

defineOptions({ name: createNamespace('date-panel').name, inheritAttrs: false })
const props = defineProps({
  options: {
    type: Object as PropType<DatePanelOptions & { presentation?: import('./datetime').DateTimePresentation }>,
    required: true,
  },
  range: Boolean,
  endpointEditor: Boolean,
})
const emit = defineEmits([
  'update:modelValue',
  'change',
  'select',
  'confirm',
  'update:pickerValue',
  'picker-value-change',
  'select-shortcut',
  'draft-initialize',
])
const { n, classes } = createNamespace('date-panel')
const language = useDateLocale()
const { orderErrorText } = usePanelActionsLocale()
const options = computed(() => scopeDateOptions(props.options, language.value, props.options.dayStartOfWeek ?? 0))
provideDateLocale(() => options.value)
const hostActions = inject(editorAuxiliaryActions, undefined)
provide(simultaneousDateLayout, !hostActions)
const slots = useSlots()
const forwardedSlots = computed(() => Object.keys(slots).filter((name) => name !== 'actions'))
const rangeIndex = provideRangePanel()
if (props.endpointEditor) {
  // A new field editor session always starts at the first editable endpoint.
  const locked = options.value.disabled
  rangeIndex.value = Array.isArray(locked) && locked[0] && !locked[1] ? 1 : 0
}
const activeIndex = computed(() => {
  const index = rangeIndex.value === 1 ? 1 : 0
  const locked = options.value.disabled
  return Array.isArray(locked) && locked[index] && !locked[index ^ 1] ? index ^ 1 : index
})
provideDateCurrent(() => options.value.showCurrent !== false)
const isRange = computed(() => props.range || Boolean(options.value.range))
const model = useFieldValue<DateSelection>({
  value: () => options.value.modelValue,
  defaultValue: () => options.value.defaultValue ?? (isRange.value || options.value.multiple ? [] : undefined),
})
const blocked = computed(() =>
  Boolean(
    options.value.readonly ||
    (Array.isArray(options.value.disabled) ? options.value.disabled.every(Boolean) : options.value.disabled),
  ),
)
const selection = useDateSelection({
  emptyValue: () =>
    resolveEmptyValue<DateSelection>(options.value, props.range || options.value.multiple ? [] : undefined),
  value: () => model.value.value,
  rules: () => options.value,
  range: () => isRange.value,
  allowReversedDraft: () => isRange.value,
  validate: props.endpointEditor
    ? (value) => isDateEndpointSelectionValid(value, options.value, activeIndex.value)
    : undefined,
  multiple: () => Boolean(options.value.multiple),
  blocked: () => blocked.value,
  disabledParts: () => (Array.isArray(options.value.disabled) ? options.value.disabled : []),
  onSelect: (value) => {
    const payload = dateEventPayload(value, options.value)
    emit('select', value, payload.dates, payload.texts)
  },
  onCommit: (value) => {
    model.setValue(value)
    const payload = dateEventPayload(value, options.value)
    emit('update:modelValue', value)
    emit('change', value, payload.dates, payload.texts)
  },
  onConfirm: () => {
    const value = selection.draft.value
    const payload = dateEventPayload(value, options.value)
    emit('confirm', value, payload.dates, payload.texts)
  },
})
function initializeWheelDraft() {
  if (options.value.presentation !== 'picker' || options.value.multiple || blocked.value) {
    return
  }
  const next = dateWheelDraft(selection.draft.value, options.value, isRange.value)
  if (next !== selection.draft.value && selection.initialize(next)) {
    emit('draft-initialize', next)
  }
}
onMounted(initializeWheelDraft)
watch([() => options.value, () => blocked.value, () => model.value.value], initializeWheelDraft, {
  flush: 'post',
})
const tools = useDatePanelTools({
  options: () => {
    if (!props.endpointEditor || !isRange.value) {
      return options.value
    }
    const value = Array.isArray(selection.draft.value) ? selection.draft.value[0] : undefined
    let start = parseDateValue(value, options.value)
    if (!start) {
      return options.value
    }
    const minimum = parseDateValue(options.value.min, options.value)
    const maximum = parseDateValue(options.value.max, options.value)
    if (minimum && start.valueOf() < minimum.valueOf()) {
      start = minimum
    }
    if (maximum && start.valueOf() > maximum.valueOf()) {
      start = maximum
    }
    return { ...options.value, defaultPickerValue: [outputDateValue(start.toDate(), options.value)] }
  },
  range: () => isRange.value,
  value: () => selection.draft.value,
  blocked: () => blocked.value,
  valid: selection.valid,
  select: (value) => {
    if (props.endpointEditor && Array.isArray(value)) {
      const next = Array.isArray(selection.draft.value) ? [...selection.draft.value] : [undefined, undefined]
      next[activeIndex.value] = value[activeIndex.value]
      return selection.select(next, options.value.disableConfirm !== false && !quick.pending.value)
    }
    return selection.select(value, options.value.disableConfirm !== false && !quick.pending.value)
  },
  onShortcut: (shortcut) => emit('select-shortcut', shortcut),
  onNavigate: (value) => {
    const payload = dateEventPayload(value, options.value)
    emit('update:pickerValue', value)
    emit('picker-value-change', value, payload.dates, payload.texts)
  },
})
function select(value: DateSelection) {
  tools.endPreview()
  if (reversed(value) && selection.editable(value)) {
    quick.pending.value = true
  }
  return selection.select(value, options.value.disableConfirm !== false && !quick.pending.value)
}

const quick = useRangeQuickSelection(
  options,
  computed(() => isRange.value && !props.endpointEditor),
  blocked,
  selection,
  () => tools.endPreview(),
  (shortcut) => emit('select-shortcut', shortcut),
)
const showNow = computed(() => !options.value.multiple && options.value.showNowButton !== false)
function nowCandidate(): DateSelection {
  const now = currentDateValue({ ...options.value, format: undefined })
  if (!isRange.value) {
    return now
  }
  const next = Array.isArray(selection.draft.value) ? [...selection.draft.value] : [undefined, undefined]
  next[activeIndex.value] = now
  return next
}
const nowDisabled = computed(() => {
  if (blocked.value) {
    return true
  }
  if (!isRange.value) {
    return !selection.valid(nowCandidate())
  }
  const locked = options.value.disabled
  if (Array.isArray(locked) && locked[activeIndex.value]) {
    return true
  }
  return !selection.editable(nowCandidate())
})
function selectNow() {
  if (!showNow.value || nowDisabled.value) {
    return false
  }
  quick.pending.value = true
  const candidate = nowCandidate()
  const index = activeIndex.value
  const selected = select(candidate)
  if (selected) {
    const current = Array.isArray(candidate) ? candidate[index] : candidate
    const date = parseDateValue(current, options.value)!
    const unit = options.value.type === 'year' || options.value.type === 'month' ? 'year' : 'month'
    const viewport = isRange.value
      ? [
          outputDateValue(date.startOf(unit).toDate(), options.value),
          outputDateValue(date.startOf(unit).add(1, unit).toDate(), options.value),
        ]
      : current
    // End the shortcut preview first, then reveal Now through the normal viewport owner.
    nextTick(() => {
      if (quick.pending.value) {
        tools.navigate(viewport)
      }
    })
  }
  return selected
}
function confirm() {
  const committed = selection.commit()
  if (committed) {
    quick.pending.value = false
  }
  return committed
}
function reversed(value: DateSelection) {
  if (!isRange.value || !Array.isArray(value) || value.length !== 2) {
    return false
  }
  const start = parseDateValue(value[0], options.value)
  const end = parseDateValue(value[1], options.value)
  return Boolean(start && end && start.valueOf() > end.valueOf())
}
const orderError = computed(() =>
  reversed(selection.draft.value) ? orderErrorText(Boolean(options.value.showTime)) : '',
)
const feedbackHosted = useEditorFeedback(() => orderError.value)
// Render the same action component in the host footer instead of a second panel footer.
const auxiliary = () =>
  h(
    DatePanelActions,
    {
      showNow: showNow.value,
      showConfirm: false,
      showQuick: quick.enabled.value,
      quickOpen: quick.open.value,
      quickDisabled: blocked.value,
      onToggleQuick: quick.toggle,
      nowDisabled: nowDisabled.value,
      canConfirm: selection.canConfirm.value,
      onSelectNow: selectNow,
    },
    slots.actions ? { default: slots.actions } : undefined,
  )
if (hostActions) {
  hostActions.value = auxiliary
}
onBeforeUnmount(() => {
  if (hostActions?.value === auxiliary) {
    hostActions.value = undefined
  }
})
</script>
