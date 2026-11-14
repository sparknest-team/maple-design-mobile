import {
  ComponentPublicInstance,
  computed,
  defineComponent,
  inject,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  PropType,
  reactive,
  ref,
  toRef,
  toRefs,
  useId,
  watch,
} from 'vue'
import ResizeObserver from '../_components/resize-observer-v2'
import { useOptionRequest } from '../_hooks/use-option-request'
import { isFunction, isNull, isUndefined } from '../_utils/is'
import { useFormItem } from '../form/item-provide'
import Input from '../input/base'
import { useSelect } from '../select/hooks/use-select'
import OptGroup from '../select/Optgroup.vue'
import Option from '../select/Option.vue'
import SelectDropdown from '../select/SelectDropdown.vue'
import { SelectOptionData, SelectOptionGroup, SelectOptionGroupInfo, SelectOptionInfo } from '../select/types'
import { getKeyFromValue, isGroupOptionInfo } from '../select/utils'
import Textarea from '../textarea/presentation'
import { getSizeStyles } from '../textarea/utils'
import Trigger from '../trigger/trigger'
import { createNamespace, getPrefixCls } from '../utils/components'
import { resolveEmptyValue } from '../utils/empty-value'
import { mentionEmits } from './emits'
import { mentionProps } from './props'
import { mentionKey, mentionLabelsKey, syncMentionLabels } from './selected-labels'
import { parseMentionParts, serializeMentionParts, type MentionPart, type MentionTokenValue } from './token-codec'
import {
  diffMentionText,
  projectMentionParts,
  remapMentionOffset,
  replaceMentionRange,
  sliceMentionRange,
  type MentionSpan,
} from './token-edit'
import { resolveMentionLabel } from './token-label'
import { MeasureInfo } from './types'
import { getLastMeasureIndex, getTextBeforeSelection, isValidSearch } from './utils'

const { name } = createNamespace('mention')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: mentionProps,
  emits: mentionEmits,
  /**
   * @zh 选项内容
   * @en Display content of options
   * @slot option
   * @binding {OptionInfo} data
   */
  setup(props, { emit, attrs, slots }) {
    const prefixCls = getPrefixCls('mention')
    const listboxId = `${prefixCls}-listbox-${useId()}`
    const optionId = (key: string) => `${listboxId}-option-${encodeURIComponent(key)}`

    const active = ref(true)
    let disposed = false
    const lifecycleEpoch = ref(0)
    const available = () => active.value && !disposed
    let mirrorGeneration = 0
    let styleGeneration = 0
    const invalidateMirror = () => {
      mirrorGeneration++
    }

    const { mergedDisabled, mergedReadonly, eventHandlers } = useFormItem({
      disabled: toRef(props, 'disabled'),
      readonly: toRef(props, 'readonly'),
    })

    const { modelValue } = toRefs(props)
    const source = useOptionRequest(
      () => props.options,
      () => !available() || mergedDisabled.value || mergedReadonly.value,
      (error) => emit('load-error', error),
      () => props.searchDelay,
      mentionProps,
      false,
      () => props.minSearchLength,
    )
    const effectiveLoading = computed(() => props.loading || source.loading.value)
    const data = source.options
    const dropdownRef = ref()
    const optionRefs = ref<Record<string, HTMLElement>>({})
    const _value = ref<string | null>(props.defaultValue)
    const computedValue = computed(() => (props.modelValue === null ? '' : (props.modelValue ?? _value.value ?? '')))
    const labelOwner = inject(mentionLabelsKey, undefined)
    const selectedLabels = labelOwner?.labels ?? reactive(new Map<string, string>())
    const selectedParts = computed(() => (props.atomic ? parseMentionParts(computedValue.value) : []))
    const syncSelectedLabels = () => {
      syncMentionLabels(
        selectedLabels,
        props.atomic ? computedValue.value : '',
        source.options.value,
        labelOwner?.preservedModel(),
      )
    }
    watch([selectedParts, source.options], syncSelectedLabels, { immediate: true, deep: true, flush: 'sync' })
    const mentionLabel = (value: MentionTokenValue) =>
      resolveMentionLabel(value, source.options.value, props.fallbackOption, selectedLabels.get(mentionKey(value)))
    const retainSelectedLabel = (value: MentionTokenValue, label: string) => {
      const key = mentionKey(value)
      nextTick(() => {
        if (selectedParts.value.some((part) => part.type === 'mention' && mentionKey(part.value) === key)) {
          selectedLabels.set(key, label)
        }
        syncSelectedLabels()
      })
    }
    const atomicSpans = computed(() => (props.atomic ? projectMentionParts(selectedParts.value, mentionLabel) : []))
    const displayValue = computed(() =>
      props.atomic ? atomicSpans.value.map((span) => span.text).join('') : computedValue.value,
    )
    let activeInput: HTMLInputElement | HTMLTextAreaElement | undefined
    const composing = ref(false)
    let projectedModel = computedValue.value
    let selectionGeneration = 0
    let editGeneration = 0
    watch(
      atomicSpans,
      (next, previous) => {
        const sameModel = projectedModel === computedValue.value
        projectedModel = computedValue.value
        const input = activeInput
        if (!props.atomic || composing.value || !sameModel || !input || input.ownerDocument.activeElement !== input) {
          return
        }
        const start = remapMentionOffset(previous, next, input.selectionStart ?? 0)
        const end = remapMentionOffset(previous, next, input.selectionEnd ?? start)
        const generation = ++selectionGeneration
        nextTick(() => {
          if (available() && generation === selectionGeneration && input.ownerDocument.activeElement === input) {
            input.setSelectionRange(start, end)
          }
        })
      },
      { flush: 'sync' },
    )
    const atomicRoot = ref<HTMLElement>()
    const atomicOverlay = ref<HTMLElement>()
    const atomicOverlayStyle = ref<Record<string, string>>({})
    let atomicResizeObserver: { observe(target: Element): void; disconnect(): void } | undefined
    type HistoryEntry = { value: string; caret: number; labels: Array<[string, string]> }
    const undoHistory: HistoryEntry[] = []
    const redoHistory: HistoryEntry[] = []
    let lastWritten: string | null | undefined
    watch(
      () => props.atomic,
      () => {
        undoHistory.length = 0
        redoHistory.length = 0
        selectionGeneration++
        editGeneration++
      },
    )
    const showAtomicOverlay = computed(
      () => props.atomic && !composing.value && atomicSpans.value.some((span) => span.part.type === 'mention'),
    )

    const syncAtomicOverlay = () => {
      if (!available()) {
        return
      }
      const root = atomicRoot.value
      const input = root?.querySelector<HTMLInputElement | HTMLTextAreaElement>('input,textarea')
      const overlay = atomicOverlay.value
      if (!root || !input || !overlay) {
        return
      }
      const rect = input.getBoundingClientRect()
      const parent = root.getBoundingClientRect()
      const style = input.ownerDocument.defaultView?.getComputedStyle(input)
      if (!style) {
        return
      }
      atomicOverlayStyle.value = {
        left: `${rect.left - parent.left}px`,
        top: `${rect.top - parent.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        font: style.font,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        padding: style.padding,
        textAlign: style.textAlign,
        direction: style.direction,
        wordBreak: style.wordBreak,
        overflowWrap: style.overflowWrap,
        tabSize: style.tabSize,
        whiteSpace: props.type === 'textarea' ? 'pre-wrap' : 'pre',
      }
      overlay.scrollLeft = input.scrollLeft
      overlay.scrollTop = input.scrollTop
    }
    watch(
      [displayValue, showAtomicOverlay, () => props.type, effectiveLoading, mergedDisabled, mergedReadonly],
      () => {
        if (props.atomic) {
          nextTick(syncAtomicOverlay)
        }
      },
      { flush: 'post' },
    )
    watch(
      [atomicRoot, () => props.type, () => props.atomic],
      ([root, , enabled]) => {
        atomicResizeObserver?.disconnect()
        atomicResizeObserver = undefined
        if (!enabled || !root) {
          return
        }
        const Observer = root.ownerDocument.defaultView?.ResizeObserver
        if (!Observer) {
          return
        }
        atomicResizeObserver = new Observer(syncAtomicOverlay)
        atomicResizeObserver.observe(root)
        const input = root.querySelector('input,textarea')
        if (input) {
          atomicResizeObserver.observe(input)
        }
      },
      { flush: 'post' },
    )
    onMounted(() => {
      if (props.atomic) {
        nextTick(syncAtomicOverlay)
      }
      window.addEventListener('resize', syncAtomicOverlay)
    })
    onBeforeUnmount(() => {
      atomicResizeObserver?.disconnect()
      window.removeEventListener('resize', syncAtomicOverlay)
    })

    const renderAtomicOverlay = () =>
      showAtomicOverlay.value && (
        <div
          ref={atomicOverlay}
          class={`${prefixCls}-atomic-overlay`}
          style={atomicOverlayStyle.value}
          aria-hidden="true"
        >
          {atomicSpans.value.map((span) =>
            span.part.type === 'mention' ? <span class={`${prefixCls}-atomic-token`}>{span.text}</span> : span.text,
          )}
        </div>
      )
    const atomicEvents = {
      onScrollCapture: syncAtomicOverlay,
      onCompositionstartCapture: (event: CompositionEvent) => {
        composing.value = true
        const input = event.target as HTMLInputElement | HTMLTextAreaElement
        compositionRange = {
          start: input.selectionStart ?? 0,
          end: input.selectionEnd ?? 0,
          display: displayValue.value,
          model: computedValue.value,
          spans: atomicSpans.value,
        }
      },
      onCompositionendCapture: () => {
        composing.value = false
        nextTick(syncAtomicOverlay)
      },
      onBeforeinputCapture: (event: InputEvent) => {
        if (!props.atomic || mergedDisabled.value || mergedReadonly.value) {
          return
        }
        if (event.inputType === 'historyUndo' || event.inputType === 'historyRedo') {
          event.preventDefault()
          restoreHistory(event.inputType === 'historyRedo')
          return
        }
        if (event.isComposing || composing.value) {
          return
        }
        const input = event.target as HTMLInputElement | HTMLTextAreaElement
        let start = input.selectionStart ?? 0,
          end = input.selectionEnd ?? start
        if (
          start === end &&
          (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward')
        ) {
          const span = atomicSpans.value.find(
            (item) =>
              item.part.type === 'mention' &&
              (event.inputType === 'deleteContentBackward'
                ? item.start < start && start <= item.end
                : item.start <= start && start < item.end),
          )
          if (span) {
            start = span.start
            end = span.end
          }
        }
        const intersects = atomicSpans.value.some(
          (span) =>
            span.part.type === 'mention' &&
            ((start < span.end && end > span.start) || (start === end && start > span.start && start < span.end)),
        )
        if (!intersects) {
          return
        }
        const deleting = event.inputType.startsWith('delete')
        const inserting = event.inputType === 'insertText' && event.data !== null
        if (deleting || inserting) {
          activeInput = input
          event.preventDefault()
          const inserted = inserting ? (event.data ?? '') : ''
          const edit = replaceMentionRange(
            atomicSpans.value,
            start,
            end,
            inserted ? [{ type: 'text', text: inserted }] : [],
          )
          updateAtomic(edit.parts, edit.start + inserted.length)
          updateAtomicSearch(edit.parts, edit.start + inserted.length)
        }
      },
      onCopyCapture: (event: ClipboardEvent) => copyAtomic(event, false),
      onCutCapture: (event: ClipboardEvent) => copyAtomic(event, true),
      onPasteCapture: (event: ClipboardEvent) => pasteAtomic(event),
    }

    const applyAtomicValue = (value: string, caret: number, record: boolean) => {
      if (value === computedValue.value) {
        return
      }
      if (record) {
        undoHistory.push({
          value: computedValue.value,
          caret: activeInput?.selectionStart ?? caret,
          labels: [...selectedLabels],
        })
        if (undoHistory.length > 100) {
          undoHistory.shift()
        }
        redoHistory.length = 0
      }
      lastWritten = value
      _value.value = value
      emit('update:modelValue', value)
      emit('change', value)
      eventHandlers.value?.onChange?.()
      const input = activeInput
      selectionGeneration++
      const generation = ++editGeneration
      nextTick(() => {
        // Input/Textarea restores its own native selection in the same tick.
        // Apply the atomic edit's expanded range after that restoration.
        nextTick(() => {
          if (available() && generation === editGeneration && input && input.ownerDocument.activeElement === input) {
            input.setSelectionRange(caret, caret)
          }
        })
      })
    }
    const updateAtomic = (parts: MentionPart[], caret: number) =>
      applyAtomicValue(serializeMentionParts(parts), caret, true)
    const restoreHistory = (redo: boolean) => {
      const source = redo ? redoHistory : undoHistory
      const target = redo ? undoHistory : redoHistory
      const entry = source.pop()
      if (!entry) {
        return
      }
      target.push({ value: computedValue.value, caret: activeInput?.selectionStart ?? 0, labels: [...selectedLabels] })
      applyAtomicValue(entry.value, entry.caret, false)
      for (const [key, label] of entry.labels) {
        selectedLabels.set(key, label)
      }
      nextTick(syncSelectedLabels)
      updateAtomicSearch(parseMentionParts(entry.value), entry.caret)
    }
    const copyAtomic = (event: ClipboardEvent, cut: boolean) => {
      if (!props.atomic || !event.clipboardData || (cut && (mergedDisabled.value || mergedReadonly.value))) {
        return
      }
      const input = event.target as HTMLInputElement | HTMLTextAreaElement
      const start = input.selectionStart ?? 0,
        end = input.selectionEnd ?? start
      if (start === end) {
        return
      }
      const selected = sliceMentionRange(atomicSpans.value, start, end)
      const visible = projectMentionParts(selected, mentionLabel)
      event.clipboardData.setData('text/plain', visible.map((item) => item.text).join(''))
      event.clipboardData.setData('application/x-cedar-mention', serializeMentionParts(selected))
      event.preventDefault()
      if (cut) {
        activeInput = input
        const edit = replaceMentionRange(atomicSpans.value, start, end, [])
        updateAtomic(edit.parts, edit.start)
        updateAtomicSearch(edit.parts, edit.start)
      }
    }
    const pasteAtomic = (event: ClipboardEvent) => {
      if (!props.atomic || mergedDisabled.value || mergedReadonly.value) {
        return
      }
      const markup = event.clipboardData?.getData('application/x-cedar-mention')
      const input = event.target as HTMLInputElement | HTMLTextAreaElement
      const start = input.selectionStart ?? 0,
        end = input.selectionEnd ?? start
      const intersects = atomicSpans.value.some(
        (span) =>
          span.part.type === 'mention' &&
          ((start < span.end && end > span.start) || (start === end && start > span.start && start < span.end)),
      )
      if (!markup && !intersects) {
        return
      }
      const text = event.clipboardData?.getData('text/plain') ?? ''
      const parts: MentionPart[] = markup ? parseMentionParts(markup) : text ? [{ type: 'text', text }] : []
      activeInput = input
      const edit = replaceMentionRange(atomicSpans.value, start, end, parts)
      const length = projectMentionParts(parts, mentionLabel).reduce((sum, item) => sum + item.text.length, 0)
      event.preventDefault()
      updateAtomic(edit.parts, edit.start + length)
      updateAtomicSearch(edit.parts, edit.start + length)
    }

    watch(modelValue, (value) => {
      if (props.atomic && value !== lastWritten) {
        undoHistory.length = 0
        redoHistory.length = 0
      }
      lastWritten = undefined
      if (isUndefined(value) || isNull(value)) {
        _value.value = ''
      }
    })

    const computedValueKeys = computed(() => (computedValue.value ? [getKeyFromValue(computedValue.value)] : []))
    const measureInfo = ref<MeasureInfo>({
      measuring: false,
      location: -1,
      prefix: '',
      text: '',
    })
    const navigatedOptions = ref(false)

    const resetMeasureInfo = () => {
      measureInfo.value = {
        measuring: false,
        location: -1,
        prefix: '',
        text: '',
      }
      navigatedOptions.value = false
    }

    let compositionRange:
      { start: number; end: number; display: string; model: string; spans: MentionSpan[] } | undefined
    const updateSearch = (text: string, spans = atomicSpans.value) => {
      const lastMeasure = getLastMeasureIndex(text, props.prefix)
      const withinMention =
        props.atomic &&
        spans.some(
          (span) =>
            span.part.type === 'mention' && lastMeasure.location >= span.start && lastMeasure.location < span.end,
        )
      if (lastMeasure.location > -1 && !withinMention) {
        const query = text.slice(lastMeasure.location + lastMeasure.prefix.length)
        if (isValidSearch(query, props.split)) {
          if (query.length < props.minSearchLength) {
            source.cancel()
            resetMeasureInfo()
            return
          }
          if (query !== measureInfo.value.text || lastMeasure.prefix !== measureInfo.value.prefix) {
            navigatedOptions.value = false
          }
          _open.value = true
          measureInfo.value = { measuring: true, text: query, ...lastMeasure }
          emit('search', query, lastMeasure.prefix)
          void source.search(query)
          return
        }
      }
      if (measureInfo.value.location > -1) {
        source.cancel()
        resetMeasureInfo()
      }
    }
    const updateAtomicSearch = (parts: MentionPart[], caret: number) => {
      const spans = projectMentionParts(parts, mentionLabel)
      updateSearch(
        spans
          .map((span) => span.text)
          .join('')
          .slice(0, caret),
        spans,
      )
    }

    const inputRef = ref<{
      textareaRef?: HTMLTextAreaElement
      focus?: () => void
      blur?: () => void
    }>()

    const measureText = computed(() => measureInfo.value.text)
    const filterOption = computed(() => !source.remote.value)
    const searchFields = computed(() => ['label', 'value'] as const)

    let clearEvent: Event | undefined
    const handleInput = (value: string | null, e: Event) => {
      if (e === clearEvent) {
        clearEvent = undefined
        return
      }
      if (!available() || mergedDisabled.value || mergedReadonly.value) {
        return
      }
      activeInput = e.target as HTMLInputElement | HTMLTextAreaElement
      if (props.atomic) {
        const next = value ?? ''
        const range = compositionRange
        compositionRange = undefined
        if (range && range.model !== computedValue.value) {
          return
        }
        const previous = range?.display ?? displayValue.value
        const spans = range?.spans ?? atomicSpans.value
        const diff = diffMentionText(previous, next)
        const suffix = range ? previous.slice(range.end) : ''
        const matchesRange = range && next.startsWith(previous.slice(0, range.start)) && next.endsWith(suffix)
        const start = matchesRange ? range.start : diff.start
        const end = matchesRange ? range.end : diff.end
        const inserted = matchesRange ? next.slice(start, next.length - suffix.length) : diff.text
        const edit = replaceMentionRange(spans, start, end, inserted ? [{ type: 'text', text: inserted }] : [])
        let caret = edit.start + inserted.length
        if (range) {
          // Labels can resolve while the native IME is active. Its offsets refer
          // to the pre-composition display, not to the newly resolved display.
          const before = projectMentionParts(edit.parts, (id) => {
            const previousSpan = spans.find((span) => span.part.type === 'mention' && Object.is(span.part.value, id))
            return previousSpan && previousSpan.part.type === 'mention'
              ? previousSpan.text.slice((previousSpan.part.prefix ?? '@').length)
              : String(id)
          })
          const after = projectMentionParts(edit.parts, mentionLabel)
          caret = remapMentionOffset(before, after, caret)
        }
        updateAtomic(edit.parts, caret)
        updateAtomicSearch(edit.parts, caret)
      }
      if (!props.atomic) {
        updateSearch(getTextBeforeSelection(e.target as HTMLInputElement))
        _value.value = value
        emit('update:modelValue', value)
        emit('change', value)
        eventHandlers.value?.onChange?.()
      }
    }

    const handleClear = (ev: Event) => {
      clearEvent = ev
      resetMeasureInfo()
      if (!available() || mergedDisabled.value || mergedReadonly.value) {
        return
      }
      const next = resolveEmptyValue(props, '')
      if (props.atomic && computedValue.value !== next) {
        undoHistory.push({
          value: computedValue.value,
          caret: activeInput?.selectionStart ?? 0,
          labels: [...selectedLabels],
        })
        if (undoHistory.length > 100) {
          undoHistory.shift()
        }
        redoHistory.length = 0
        lastWritten = next
      }
      _value.value = next
      emit('update:modelValue', next)
      emit('change', next)
      eventHandlers.value?.onChange?.()
      emit('clear', ev)
    }

    const _open = ref(false)
    const computedOpen = computed(
      () =>
        available() &&
        !mergedDisabled.value &&
        !mergedReadonly.value &&
        _open.value &&
        measureInfo.value.measuring &&
        (validOptionInfos.value.length > 0 || effectiveLoading.value),
    )

    const handleResize = () => {
      if (!available() || props.type !== 'textarea') {
        return
      }
      if (props.atomic) {
        nextTick(syncAtomicOverlay)
      }
      const element = inputRef.value?.textareaRef
      const view = element?.ownerDocument.defaultView
      if (!element || !view) {
        return
      }
      const generation = ++styleGeneration
      const current = () =>
        available() &&
        generation === styleGeneration &&
        props.type === 'textarea' &&
        element === inputRef.value?.textareaRef
      const declaration = view.getComputedStyle(element)
      if (!current()) {
        return
      }
      const styles = getSizeStyles(declaration)
      if (current()) {
        mirrorStyle.value = styles
      }
    }

    const handleOpenChange = (open: boolean) => {
      if (!available() || mergedDisabled.value || mergedReadonly.value) {
        return
      }
      _open.value = open
    }

    const insertAtomicMention = (
      value: MentionTokenValue,
      label: string,
      prefix: string,
      start: number,
      end: number,
    ) => {
      const following = atomicSpans.value
        .map((span) => span.text)
        .join('')
        .slice(end, end + 1)
      const addSpace = !following || !/\s/.test(following)
      const parts: MentionPart[] = [{ type: 'mention', value, ...(prefix === '@' ? {} : { prefix }) }]
      if (addSpace) {
        parts.push({ type: 'text', text: ' ' })
      }
      const edit = replaceMentionRange(atomicSpans.value, start, end, parts)
      updateAtomic(edit.parts, edit.start + prefix.length + label.length + (addSpace || following === ' ' ? 1 : 0))
    }

    const handleSelect = (key: string, e: Event) => {
      if (!available() || mergedDisabled.value || mergedReadonly.value || effectiveLoading.value) {
        return
      }
      const option = optionInfoMap.get(key)
      if (!option || option.disabled) {
        return
      }
      const { value } = option
      const measureStart = measureInfo.value.location
      const measureEnd = measureInfo.value.location + measureInfo.value.prefix.length + measureInfo.value.text.length
      if (props.atomic) {
        if (
          (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') ||
          (typeof value === 'number' && !Number.isFinite(value))
        ) {
          return
        }
        selectedLabels.set(mentionKey(value), String(option.label ?? value))
        const prefix = measureInfo.value.prefix
        emit('select', value)
        insertAtomicMention(value, String(option.label ?? value), prefix, measureStart, measureEnd)
        retainSelectedLabel(value, String(option.label ?? value))
        resetMeasureInfo()
        return
      }
      let head = (_value.value ?? '').slice(0, measureStart)
      let tail = (_value.value ?? '').slice(measureEnd)
      // 如过匹配内容之前或者之后已经存在内容，需要添加分割字符
      head += !head || head.endsWith(props.split) || head.endsWith('\n') ? '' : props.split
      tail = (!tail || (!tail.startsWith(props.split) && !tail.startsWith('\n')) ? props.split : '') + tail

      const match = `${measureInfo.value.prefix}${value}`
      const nextValue = `${head}${match}${tail}`

      _value.value = nextValue
      emit('select', value)
      emit('update:modelValue', nextValue)
      emit('change', nextValue)
      resetMeasureInfo()
      eventHandlers.value?.onChange?.()
    }

    const { validOptions, optionInfoMap, validOptionInfos, activeKey, handleKeyDown } = useSelect({
      options: data,
      inputValue: measureText,
      filterOption,
      searchFields,
      loading: effectiveLoading,
      open: computedOpen,
      valueKeys: computedValueKeys,
      dropdownRef,
      optionRefs,
      onSelect: handleSelect,
      onOpenChange: handleOpenChange,
      enterToOpen: false,
    })

    watch(
      [validOptionInfos, effectiveLoading, measureInfo],
      () => {
        if (
          !props.autoCommitSingle ||
          effectiveLoading.value ||
          !_open.value ||
          !measureInfo.value.measuring ||
          !available() ||
          mergedDisabled.value ||
          mergedReadonly.value ||
          composing.value ||
          !activeInput ||
          activeInput.ownerDocument.activeElement !== activeInput ||
          activeInput.selectionStart !==
            measureInfo.value.location + measureInfo.value.prefix.length + measureInfo.value.text.length ||
          activeInput.selectionEnd !== activeInput.selectionStart ||
          (source.remote.value && source.query.value !== measureInfo.value.text)
        ) {
          return
        }
        const candidates = validOptionInfos.value.filter((option) => !option.disabled)
        if (candidates.length === 1) {
          handleSelect(candidates[0].key, new Event('auto-commit'))
        }
      },
      { flush: 'post' },
    )
    watch(
      () => props.minSearchLength,
      () => {
        if (activeInput && activeInput.ownerDocument.activeElement === activeInput && !composing.value) {
          updateSearch(getTextBeforeSelection(activeInput))
        }
      },
    )

    const suggestionAttrs = computed(
      () =>
        ({
          role: props.type === 'input' ? 'combobox' : 'textbox',
          'aria-multiline': props.type === 'textarea' ? true : undefined,
          'aria-autocomplete': 'list',
          'aria-haspopup': 'listbox',
          'aria-expanded': props.type === 'input' ? computedOpen.value : undefined,
          'aria-controls': computedOpen.value ? listboxId : undefined,
          'aria-activedescendant':
            computedOpen.value && !effectiveLoading.value && activeKey.value ? optionId(activeKey.value) : undefined,
        }) as const,
    )

    const mirrorStyle = ref()

    onMounted(handleResize)

    const getOptionContentFunc = (item: SelectOptionInfo) => {
      if (isFunction(slots.option)) {
        const optionInfo = optionInfoMap.get(item.key)
        const optionSlot = slots.option
        return () => optionSlot({ data: optionInfo })
      }
      return () => item.label
    }

    const renderOption = (item: SelectOptionInfo | SelectOptionGroupInfo): import('vue').VNodeChild => {
      if (isGroupOptionInfo(item)) {
        return (
          <OptGroup key={item.key} label={item.label}>
            {item.options.map(renderOption)}
          </OptGroup>
        )
      }
      return (
        <Option
          {...({ id: optionId(item.key), 'aria-selected': activeKey.value === item.key } as any)}
          ref={(ref: ComponentPublicInstance) => {
            if (ref?.$el) {
              optionRefs.value[item.key] = ref.$el
            }
          }}
          v-slots={{ default: getOptionContentFunc(item) }}
          key={item.key}
          value={item.value}
          disabled={item.disabled}
          internal
        />
      )
    }

    const renderDropdown = () => {
      return (
        <SelectDropdown
          ref={dropdownRef}
          loading={effectiveLoading.value}
          {...({ id: listboxId, role: 'listbox', 'aria-busy': effectiveLoading.value || undefined } as any)}
        >
          {validOptions.value.map(renderOption)}
        </SelectDropdown>
      )
    }

    const mirrorRef = ref<HTMLElement>()

    const mirrorSources = [computedOpen, computedValue, measureInfo, validOptionInfos, () => props.type, mergedDisabled]
    watch(
      mirrorSources,
      () => {
        invalidateMirror()
        styleGeneration++
      },
      { flush: 'sync' },
    )
    // Capture the rendered textarea/mirror pair, not a previous mode's refs.
    watch(
      mirrorSources,
      () => {
        if (!available() || props.type !== 'textarea') {
          return
        }
        handleResize()
        if (!computedOpen.value) {
          return
        }
        const input = inputRef.value
        const element = input?.textareaRef
        const mirror = mirrorRef.value
        if (!element || !mirror) {
          return
        }
        const generation = ++mirrorGeneration
        const current = () =>
          available() &&
          generation === mirrorGeneration &&
          computedOpen.value &&
          props.type === 'textarea' &&
          input === inputRef.value &&
          element === inputRef.value?.textareaRef &&
          mirror === mirrorRef.value
        nextTick(() => {
          if (!current()) {
            return
          }
          // Consume once, before a geometry getter or native method can reenter.
          mirrorGeneration++
          const consumedGeneration = mirrorGeneration
          const top = element.scrollTop
          if (
            !available() ||
            consumedGeneration !== mirrorGeneration ||
            !computedOpen.value ||
            input !== inputRef.value ||
            element !== inputRef.value?.textareaRef ||
            mirror !== mirrorRef.value
          ) {
            return
          }
          if (Number.isFinite(top)) {
            mirror.scrollTo(0, Math.max(0, top))
          }
        })
      },
      { flush: 'post' },
    )

    onDeactivated(() => {
      active.value = false
      lifecycleEpoch.value++
      invalidateMirror()
      styleGeneration++
    })
    onBeforeUnmount(() => {
      disposed = true
      active.value = false
      lifecycleEpoch.value++
      invalidateMirror()
      styleGeneration++
    })
    onActivated(() => {
      if (active.value || disposed) {
        return
      }
      lifecycleEpoch.value++
      active.value = true
      if (props.atomic) {
        nextTick(syncAtomicOverlay)
      }
    })

    /** Make the input focus while its owner is active and enabled. @public */
    const focus = () => {
      if (available() && !mergedDisabled.value) {
        inputRef.value?.focus?.()
      }
    }
    /** Make the input blur while its owner is active. @public */
    const blur = () => {
      if (available()) {
        inputRef.value?.blur?.()
      }
    }
    const onKeydown = (event: KeyboardEvent) => {
      if (
        props.atomic &&
        available() &&
        !mergedDisabled.value &&
        !mergedReadonly.value &&
        !event.isComposing &&
        event.keyCode !== 229 &&
        event.key === 'Enter' &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !event.shiftKey &&
        _open.value &&
        measureInfo.value.measuring &&
        measureText.value &&
        validOptionInfos.value.length === 0 &&
        !effectiveLoading.value &&
        props.fallbackOption
      ) {
        const value = measureText.value
        const option = props.fallbackOption(value)
        if (option) {
          selectedLabels.set(mentionKey(value), String(option.label ?? value))
          const start = measureInfo.value.location
          const end = start + measureInfo.value.prefix.length + value.length
          const prefix = measureInfo.value.prefix
          activeInput = event.target as HTMLInputElement | HTMLTextAreaElement
          event.preventDefault()
          emit('select', value)
          insertAtomicMention(value, String(option.label ?? value), prefix, start, end)
          retainSelectedLabel(value, String(option.label ?? value))
          resetMeasureInfo()
          return
        }
      }
      if (
        available() &&
        !mergedDisabled.value &&
        !mergedReadonly.value &&
        !effectiveLoading.value &&
        !event.isComposing &&
        event.keyCode !== 229 &&
        computedOpen.value
      ) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          navigatedOptions.value = true
        }
        if (
          event.key === 'Enter' &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey &&
          !event.shiftKey &&
          !navigatedOptions.value &&
          !source.remote.value
        ) {
          const query = measureText.value.toLowerCase()
          const exact = validOptionInfos.value.filter(
            (item) =>
              !item.disabled &&
              (typeof item.value === 'string' || typeof item.value === 'number' || typeof item.value === 'boolean') &&
              String(item.value).toLowerCase() === query,
          )
          if (exact.length === 1) {
            event.preventDefault()
            handleSelect(exact[0].key, event)
            return
          }
        }
      }
      if (
        props.atomic &&
        !event.isComposing &&
        event.keyCode !== 229 &&
        !mergedDisabled.value &&
        !mergedReadonly.value &&
        (event.metaKey || event.ctrlKey)
      ) {
        const key = event.key.toLowerCase()
        if (key === 'z' || key === 'y') {
          activeInput = event.target as HTMLInputElement | HTMLTextAreaElement
          event.preventDefault()
          restoreHistory(key === 'y' || event.shiftKey)
          return
        }
      }
      if (
        props.atomic &&
        !event.isComposing &&
        event.keyCode !== 229 &&
        !mergedDisabled.value &&
        !mergedReadonly.value &&
        (event.key === 'Backspace' || event.key === 'Delete')
      ) {
        const input = event.target as HTMLInputElement | HTMLTextAreaElement
        activeInput = input
        const start = input.selectionStart ?? 0
        const end = input.selectionEnd ?? start
        if (start === end) {
          const span = atomicSpans.value.find(
            (item) =>
              item.part.type === 'mention' &&
              (event.key === 'Backspace'
                ? item.start < start && start <= item.end
                : item.start <= start && start < item.end),
          )
          if (span) {
            event.preventDefault()
            const edit = replaceMentionRange(atomicSpans.value, span.start, span.end, [])
            updateAtomic(edit.parts, edit.start)
            updateAtomicSearch(edit.parts, edit.start)
            return
          }
        }
      }
      if (
        props.atomic &&
        !event.isComposing &&
        event.keyCode !== 229 &&
        !event.shiftKey &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
      ) {
        const input = event.target as HTMLInputElement | HTMLTextAreaElement
        const start = input.selectionStart ?? 0
        if (start === input.selectionEnd) {
          const rtl = input.ownerDocument.defaultView?.getComputedStyle(input).direction === 'rtl'
          const backward = (event.key === 'ArrowLeft') !== rtl
          const span = atomicSpans.value.find(
            (item) =>
              item.part.type === 'mention' &&
              (backward ? item.start < start && start <= item.end : item.start <= start && start < item.end),
          )
          if (span) {
            event.preventDefault()
            const position = backward ? span.start : span.end
            input.setSelectionRange(position, position)
            return
          }
        }
      }
      if (
        available() &&
        !mergedDisabled.value &&
        !mergedReadonly.value &&
        !event.defaultPrevented &&
        !event.isComposing &&
        event.keyCode !== 229
      ) {
        handleKeyDown(event)
      }
    }

    const onFocus = (ev: FocusEvent) => {
      if (!available() || mergedDisabled.value || mergedReadonly.value) {
        return
      }
      if (props.atomic) {
        activeInput = ev.target as HTMLInputElement | HTMLTextAreaElement
      }
      emit('focus', ev)
    }
    const onBlur = (ev: FocusEvent) => {
      if (!available()) {
        return
      }
      source.cancel()
      resetMeasureInfo()
      emit('blur', ev)
    }

    const render = () => {
      const epoch = lifecycleEpoch.value
      if (props.type === 'textarea') {
        return (
          <div
            ref={atomicRoot}
            class={[
              prefixCls,
              props.atomic && `${prefixCls}-atomic`,
              showAtomicOverlay.value && `${prefixCls}-atomic--overlay`,
              props.atomic && mergedDisabled.value && `${prefixCls}-atomic--disabled`,
            ]}
            {...(props.atomic ? atomicEvents : {})}
          >
            <ResizeObserver
              onResize={() => {
                if (epoch === lifecycleEpoch.value) {
                  handleResize()
                }
              }}
            >
              <Textarea
                v-slots={{ 'clear-icon': slots['clear-icon'] }}
                {...attrs}
                textareaAttrs={{ ...(attrs.textareaAttrs as object), ...suggestionAttrs.value }}
                loading={effectiveLoading.value}
                ref={inputRef}
                clearable={props.clearable}
                emptyValue={props.emptyValue}
                modelValue={displayValue.value}
                disabled={mergedDisabled.value}
                readonly={mergedReadonly.value}
                onInput={handleInput}
                onClear={handleClear}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeydown={onKeydown}
              />
            </ResizeObserver>
            {renderAtomicOverlay()}
            {measureInfo.value.measuring && (validOptionInfos.value.length > 0 || effectiveLoading.value) && (
              <div ref={mirrorRef} style={mirrorStyle.value} class={`${prefixCls}-measure`}>
                {displayValue.value?.slice(0, measureInfo.value.location)}
                <Trigger
                  v-slots={{ content: renderDropdown }}
                  trigger="focus"
                  placement="bottom-start"
                  popupOffset={4}
                  preventFocus={true}
                  open={computedOpen.value}
                  closeOnClickReference={false}
                  onUpdate:open={handleOpenChange}
                >
                  <span>{measureInfo.value.prefix}</span>
                </Trigger>
              </div>
            )}
          </div>
        )
      }

      const inputNode = (
        <Trigger
          v-slots={{ content: renderDropdown }}
          trigger="focus"
          placement="bottom-start"
          animationName="slide-dynamic-origin"
          popupOffset={4}
          preventFocus={true}
          open={computedOpen.value}
          closeOnClickReference={false}
          autoFitPopupWidth
          autoFitTransformOrigin
          disabled={mergedDisabled.value || mergedReadonly.value}
          onUpdate:open={handleOpenChange}
        >
          <Input
            loading={effectiveLoading.value}
            v-slots={slots}
            {...attrs}
            inputAttrs={{ ...(attrs.inputAttrs as object), ...suggestionAttrs.value }}
            ref={inputRef}
            clearable={props.clearable}
            emptyValue={props.emptyValue}
            modelValue={displayValue.value}
            disabled={mergedDisabled.value}
            readonly={mergedReadonly.value}
            onInput={handleInput}
            onClear={handleClear}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeydown={onKeydown}
          />
        </Trigger>
      )
      return props.atomic ? (
        <div
          ref={atomicRoot}
          class={[
            `${prefixCls}-atomic`,
            showAtomicOverlay.value && `${prefixCls}-atomic--overlay`,
            mergedDisabled.value && `${prefixCls}-atomic--disabled`,
          ]}
          {...atomicEvents}
        >
          {inputNode}
          {renderAtomicOverlay()}
        </div>
      ) : (
        inputNode
      )
    }

    return {
      inputRef,
      focus,
      blur,
      render,
    }
  },
  render() {
    return this.render()
  },
})
