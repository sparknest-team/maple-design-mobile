import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  reactive,
  ref,
  toRefs,
  TransitionGroup,
  watch,
  type ComponentPublicInstance,
  type InputHTMLAttributes,
  type SlotsType,
} from 'vue'
import ResizeObserver from '../_components/resize-observer-v2'
import { useOptionRequest } from '../_hooks/use-option-request'
import { INPUT_EVENTS } from '../_utils/constant'
import { isNull, isObject, isUndefined } from '../_utils/is'
import { KEYBOARD_KEY } from '../_utils/keyboard'
import FieldDecorator from '../field-decorator/FieldDecorator.vue'
import { useFormErrorDescription } from '../form/error-description'
import FeedbackIcon from '../input/InputFeedback.vue'
import { splitInputAttrs } from '../input/native-attrs'
import { useInputForm } from '../input/use-input-form'
import { useSelect } from '../select/hooks/use-select'
import OptGroup from '../select/Optgroup.vue'
import Option from '../select/Option.vue'
import SelectDropdown from '../select/SelectDropdown.vue'
import type { SelectOptionGroupInfo, SelectOptionInfo } from '../select/types'
import { isGroupOptionInfo } from '../select/utils'
import { useTagCloseLabel } from '../tag/platform'
import Tag from '../tag/Tag.vue'
import Trigger from '../trigger/trigger'
import { createNamespace } from '../utils/components'
import { resolveEmptyValue } from '../utils/empty-value'
import { useInputComposition } from '../utils/input-composition'
import { useId } from '../utils/vue-compat'
import { inputTagEmits } from './emits'
import { inputTagProps } from './props'
import { findInputTagOption, inputTagOptionsKey } from './selected-options'
import { createTagKeyResolver } from './tag-keys'
import type { InputTagFieldNames, InputTagSlots, InputTagValue, TagData, TagDataInfo } from './types'
import { getValueData } from './utils'

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  closable: 'closable',
  tagProps: 'tagProps',
}

export default defineComponent({
  name: createNamespace('input-tag').name,
  inheritAttrs: false,
  props: inputTagProps,
  emits: inputTagEmits,
  slots: Object as SlotsType<InputTagSlots>,
  /**
   * @zh 后缀元素
   * @en Suffix
   * @slot suffix
   */
  /**
   * @zh 前缀元素
   * @en Prefix
   * @slot prefix
   */
  /**
   * @zh 输入框标签的显示内容
   * @en Display content of tag
   * @slot label
   * @binding {TagData} data
   */
  setup(props, { emit, slots, attrs }) {
    const { n, classes } = createNamespace(props.baseCls ?? 'input-tag')
    const prefix = n()

    const closeLabel = useTagCloseLabel()
    const { modelValue } = toRefs(props)
    const { describe: describeError } = useFormErrorDescription()
    const inputRef = ref<HTMLInputElement>()
    const mirrorRef = ref<HTMLElement>()
    const tagsRef = ref<{ $el: HTMLElement }>()
    const generatedId = useId()
    const splitAttrs = computed(() => splitInputAttrs(attrs, INPUT_EVENTS))
    const nativeAttrs = computed(() => splitAttrs.value.native as InputHTMLAttributes & Record<string, unknown>)
    const inputId = computed(() => String(splitAttrs.value.native.id ?? generatedId))
    const { group, mergedSize, mergedDisabled, mergedReadonly, mergedError, feedback, eventHandlers } = useInputForm(
      props,
      { uninject: props.uninjectFormItemContext },
    )
    const mergedVariant = computed(() => props.variant ?? group?.variant.value ?? 'outline')
    const active = ref(true)
    const blocked = computed(() => !active.value || mergedDisabled.value || mergedReadonly.value)
    const mergedFieldNames = computed(() => ({
      ...DEFAULT_FIELD_NAMES,
      ...props.fieldNames,
    }))

    const _focused = ref(false)
    const _value = ref(props.defaultValue)
    const _inputValue = ref(props.defaultInputValue)
    const composition = useInputComposition()
    const isComposition = composition.isComposing
    const compositionValue = ref('')

    const retainInputValue = computed(() => {
      if (isObject(props.retainInputValue)) {
        return {
          create: false,
          blur: false,
          ...props.retainInputValue,
        }
      }
      return {
        create: props.retainInputValue,
        blur: props.retainInputValue,
      }
    })

    const inputStyle = reactive({
      width: '12px',
    })

    const mergedFocused = computed(() => props.focused || _focused.value)

    const updateInputValue = (value: string, ev: Event) => {
      _inputValue.value = value
      emit('update:inputValue', value)
      emit('input-value-change', value, ev)
    }

    const computedValue = computed(() => {
      const value = props.modelValue === null ? null : (props.modelValue ?? _value.value)
      if (value == null) {
        return []
      }
      if (Array.isArray(value)) {
        return props.multiple ? value : value.slice(0, 1)
      }
      return [value]
    })
    const computedInputValue = computed(() => props.inputValue ?? _inputValue.value)
    const selectedOptions = inject(inputTagOptionsKey, reactive(new Map<string | number, TagData>()))
    const source = useOptionRequest(
      () => props.options,
      () => blocked.value || Boolean(props.disabledInput),
      (error) => emit('load-error', error),
      () => props.searchDelay,
      inputTagProps,
      false,
      () => Math.max(1, props.minSearchLength),
    )
    const candidateOpen = ref(false)
    const dropdownRef = ref()
    const optionRefs = ref<Record<string, HTMLElement>>({})
    const listboxId = `${prefix}-listbox-${useId()}`
    const candidateLoading = computed(() => props.loading || source.loading.value)
    const searchEnabled = computed(() => props.options !== undefined)
    const optionsFilter = computed(() => !source.remote.value)
    const noSelectedKeys = ref<string[]>([])
    const candidateVisible = computed(
      () =>
        searchEnabled.value &&
        candidateOpen.value &&
        _focused.value &&
        !blocked.value &&
        !props.disabledInput &&
        computedInputValue.value.length >= Math.max(1, props.minSearchLength),
    )
    const restoreInput = () => {
      if (inputRef.value && !isComposition.value) {
        inputRef.value.value = computedInputValue.value
      }
    }
    const restoreAfterRender = () => {
      const current = composition.capture()
      nextTick(() => {
        if (active.value && current()) {
          restoreInput()
        }
      })
    }
    const cancelComposition = () => {
      composition.cancel()
      compositionValue.value = ''
      restoreInput()
    }
    watch(
      blocked,
      (value) => {
        if (value) {
          cancelComposition()
        }
      },
      { flush: 'sync' },
    )
    watch(
      () => props.inputValue,
      (value) => {
        if (value !== _inputValue.value) {
          cancelComposition()
        }
      },
      { flush: 'sync' },
    )
    onDeactivated(() => {
      active.value = false
      cancelComposition()
    })
    onActivated(() => {
      active.value = true
    })
    onBeforeUnmount(() => {
      active.value = false
      cancelComposition()
    })
    const handleComposition = (event: CompositionEvent) => {
      if (blocked.value) {
        cancelComposition()
        return
      }
      if (event.type === 'compositionend') {
        if (!composition.end(event)) {
          restoreInput()
          return
        }
        compositionValue.value = ''
        updateInputValue((event.target as HTMLInputElement).value, event)
        restoreAfterRender()
      } else {
        if (event.type === 'compositionstart') {
          source.cancel()
          candidateOpen.value = false
          composition.start()
        }
        if (isComposition.value) {
          compositionValue.value = (event.target as HTMLInputElement).value
        }
      }
    }
    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = props.multiple ? [] : null
      }
    })
    const handleMousedown = (event: MouseEvent) => {
      if (!mergedDisabled.value && inputRef.value && event.target !== inputRef.value) {
        event.preventDefault()
        inputRef.value.focus()
      }
    }
    const handleInput = (event: Event) => {
      if (blocked.value) {
        cancelComposition()
        return
      }
      if (!composition.accepts(event)) {
        if (!isComposition.value) {
          restoreAfterRender()
        }
        return
      }
      updateInputValue((event.target as HTMLInputElement).value, event)
      restoreAfterRender()
    }
    const resolveTagKeys = createTagKeyResolver()
    const valueData = computed(() => {
      const items = getValueData(
        computedValue.value,
        mergedFieldNames.value,
        (value) =>
          findInputTagOption(source.options.value, value, mergedFieldNames.value) ??
          props.fallbackOption?.(value) ??
          selectedOptions.get(value),
      )
      const keys = resolveTagKeys(computedValue.value, items)
      return items.map((item, index) => ({ ...item, key: keys[index] }))
    })
    const maxTagCount = computed(() =>
      Number.isFinite(props.maxTagCount) && Number.isInteger(props.maxTagCount) && props.maxTagCount >= 0
        ? props.maxTagCount
        : 0,
    )

    const tags = computed(() => {
      if (maxTagCount.value > 0) {
        const invisibleTags = valueData.value.length - maxTagCount.value
        if (invisibleTags > 0) {
          const result = valueData.value.slice(0, maxTagCount.value)
          const raw = {
            value: '__arco__more',
            label: `+${invisibleTags}...`,
            closable: false,
          }
          result.push({
            raw,
            ...raw,
            key: 'input-tag-overflow',
          })
          return result
        }
      }
      return valueData.value
    })

    const updateRawValue = (value: InputTagValue, ev: Event) => {
      _value.value = value
      emit('update:modelValue', value)
      emit('change', value, ev)
      eventHandlers.value?.onChange?.(ev)
    }
    const updateValue = (value: (string | number | TagData)[], ev: Event) => {
      updateRawValue(props.multiple ? value : (value[0] ?? null), ev)
    }

    const commitCandidate = (key: string, event: Event) => {
      const option = optionInfoMap.get(key)
      if (
        !option ||
        option.disabled ||
        blocked.value ||
        candidateLoading.value ||
        (typeof option.value !== 'string' && typeof option.value !== 'number')
      ) {
        return
      }
      const value = option.value
      if (props.uniqueValue && valueData.value.some((item) => item.value === value)) {
        return
      }
      selectedOptions.set(value, {
        ...option.raw,
        value,
        label: String(option.label ?? value),
        [mergedFieldNames.value.label]: String(option.label ?? value),
        closable: true,
      })
      updateValue(props.multiple ? computedValue.value.concat(value) : [value], event)
      emit('select', value, option)
      candidateOpen.value = false
      source.cancel()
      updateInputValue('', event)
    }
    const {
      validOptions,
      validOptionInfos,
      optionInfoMap,
      activeKey,
      handleKeyDown: handleCandidateKeyDown,
    } = useSelect({
      options: source.options,
      inputValue: computedInputValue,
      filterOption: optionsFilter,
      fieldNames: computed(() => props.fieldNames),
      loading: candidateLoading,
      open: candidateVisible,
      valueKeys: noSelectedKeys,
      dropdownRef,
      optionRefs,
      onSelect: commitCandidate,
      onOpenChange: (value) => {
        candidateOpen.value = value
      },
      enterToOpen: false,
      getOptionId: (key) => `${listboxId}-${encodeURIComponent(key)}`,
    })
    watch(
      computedInputValue,
      (value) => {
        if (!searchEnabled.value || !_focused.value || blocked.value || isComposition.value) {
          return
        }
        candidateOpen.value = value.length >= Math.max(1, props.minSearchLength)
        if (!candidateOpen.value) {
          source.cancel()
          return
        }
        emit('search', value)
        void source.search(value)
      },
      { flush: 'sync' },
    )
    watch(
      () => Math.max(1, props.minSearchLength),
      () => {
        if (!searchEnabled.value || !_focused.value || blocked.value || isComposition.value) {
          return
        }
        candidateOpen.value = computedInputValue.value.length >= Math.max(1, props.minSearchLength)
        if (candidateOpen.value) {
          void source.search(computedInputValue.value)
        } else {
          source.cancel()
        }
      },
      { flush: 'sync' },
    )
    watch(
      [validOptionInfos, candidateLoading, computedInputValue],
      () => {
        if (
          !props.autoCommitSingle ||
          !candidateVisible.value ||
          candidateLoading.value ||
          isComposition.value ||
          (source.remote.value && source.query.value !== computedInputValue.value)
        ) {
          return
        }
        const options = validOptionInfos.value.filter((option) => !option.disabled)
        if (options.length === 1) {
          commitCandidate(options[0].key, new Event('auto-commit'))
        }
      },
      { flush: 'post' },
    )

    const isTagClosable = (item: TagDataInfo) =>
      !blocked.value && !item.tagProps?.loading && Boolean(item.tagProps?.closable ?? item.closable)

    const handleRemove = (value: string | number, index: number, e: Event) => {
      if (!valueData.value[index] || !isTagClosable(valueData.value[index])) {
        return
      }
      const newValue = computedValue.value?.filter((_, i) => i !== index)
      updateValue(newValue, e)
      emit('remove', value, e)
    }

    const handleClear = (e: Event) => {
      if (blocked.value) {
        return
      }
      const newValue = resolveEmptyValue(props, props.multiple ? [] : null)
      updateRawValue(newValue, e)
      emit('clear', e)
      eventHandlers.value?.onClear?.(e)
    }

    const showClearBtn = computed(
      () => !mergedDisabled.value && !mergedReadonly.value && props.clearable && Boolean(computedValue.value.length),
    )

    const handlePressEnter = (e: KeyboardEvent, notify = true) => {
      if (computedInputValue.value) {
        e.preventDefault()
        if (props.uniqueValue && valueData.value.some((item) => item.value === computedInputValue.value)) {
          if (notify) {
            emit('press-enter', computedInputValue.value, e)
          }
          return
        }
        const newValue = props.multiple
          ? computedValue.value.concat(computedInputValue.value)
          : [computedInputValue.value]
        updateValue(newValue, e)
        if (notify) {
          emit('press-enter', computedInputValue.value, e)
        }
        if (!retainInputValue.value.create) {
          updateInputValue('', e)
        }
      }
    }

    const handleFocus = (ev: FocusEvent) => {
      _focused.value = true
      if (
        searchEnabled.value &&
        !blocked.value &&
        !props.disabledInput &&
        computedInputValue.value.length >= Math.max(1, props.minSearchLength)
      ) {
        candidateOpen.value = true
        emit('search', computedInputValue.value)
        void source.search(computedInputValue.value)
      }
      emit('focus', ev)
      eventHandlers.value?.onFocus?.(ev)
    }

    const handleBlur = (ev: FocusEvent) => {
      _focused.value = false
      candidateOpen.value = false
      source.cancel()
      if (!retainInputValue.value.blur && computedInputValue.value) {
        updateInputValue('', ev)
      }
      emit('blur', ev)
      eventHandlers.value?.onBlur?.(ev)
    }

    const getLastClosableIndex = () => {
      for (let i = valueData.value.length - 1; i >= 0; i--) {
        if (isTagClosable(valueData.value[i])) {
          return i
        }
      }
      return -1
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (blocked.value || e.defaultPrevented) {
        return
      }
      const keyCode = e.key || e.code
      if (searchEnabled.value && !isComposition.value) {
        if (keyCode === KEYBOARD_KEY.ENTER && computedInputValue.value) {
          emit('press-enter', computedInputValue.value, e)
        }
        if (candidateVisible.value) {
          handleCandidateKeyDown(e)
        }
        if (e.defaultPrevented) {
          return
        }
        if (keyCode === KEYBOARD_KEY.ENTER && computedInputValue.value) {
          e.preventDefault()
          const belowThreshold = computedInputValue.value.length < props.minSearchLength
          const failed = source.remote.value && source.query.value === computedInputValue.value && source.failed.value
          if (!candidateLoading.value && !failed && (belowThreshold || validOptionInfos.value.length === 0)) {
            handlePressEnter(e, false)
          }
          return
        }
      }
      if (!isComposition.value && computedInputValue.value && keyCode === KEYBOARD_KEY.ENTER) {
        handlePressEnter(e)
      }
      if (
        !isComposition.value &&
        tags.value.length > 0 &&
        !computedInputValue.value &&
        keyCode === KEYBOARD_KEY.BACKSPACE
      ) {
        const lastIndex = getLastClosableIndex()
        if (lastIndex >= 0) {
          handleRemove(valueData.value[lastIndex].value, lastIndex, e)
        }
      }
    }

    const setInputWidth = (width: number) => {
      if (width > 12) {
        inputStyle.width = `${width}px`
      } else {
        inputStyle.width = '12px'
      }
    }

    onMounted(() => {
      if (mirrorRef.value) {
        setInputWidth(mirrorRef.value.offsetWidth)
      }
    })

    const revealInput = () => {
      const container = tagsRef.value?.$el
      if (_focused.value && container) {
        container.scrollTop = container.scrollHeight
      }
    }
    watch([computedInputValue, () => tags.value.length, _focused], revealInput, { flush: 'post' })

    const handleResize = () => {
      if (mirrorRef.value) {
        setInputWidth(mirrorRef.value.offsetWidth)
      }
    }

    watch(computedInputValue, (value) => {
      if (inputRef.value && !isComposition.value && value !== inputRef.value.value) {
        inputRef.value.value = value
      }
    })

    const cls = computed(() =>
      classes(
        n(),
        [props.disabledInput, n('--disabled-input')],
        [mergedReadonly.value, n('--readonly')],
        [tags.value.length > 0, n('--has-tag')],
        [Boolean(slots.prefix), n('--has-prefix')],
        [
          Boolean(slots.suffix) ||
            showClearBtn.value ||
            feedback.value ||
            (props.loading && props.loadingMode !== 'line'),
          n('--has-suffix'),
        ],
        [!computedValue.value.length, n('--has-placeholder')],
      ),
    )

    const renderField = () => (
      <FieldDecorator
        {...splitAttrs.value.root}
        id={inputId.value}
        loading={candidateLoading.value}
        loadingMode={props.loadingMode}
        value={computedValue.value}
        readonly={mergedReadonly.value}
        clearable={props.clearable}
        composing={isComposition.value}
        onClear={handleClear}
        class={cls.value}
        variant={mergedVariant.value}
        size={mergedSize.value}
        disabled={mergedDisabled.value}
        error={mergedError.value}
        focused={mergedFocused.value}
        onMousedown={handleMousedown}
        v-slots={{
          prefix: slots.prefix,
          'clear-icon': slots['clear-icon'],
          suffix:
            slots.suffix || feedback.value
              ? () => (
                  <>
                    {slots.suffix?.()}
                    {feedback.value && <FeedbackIcon status={feedback.value} />}
                  </>
                )
              : undefined,
          default: () => (
            <>
              <ResizeObserver onResize={handleResize}>
                <span ref={mirrorRef} class={classes(n('mirror'))}>
                  {tags.value.length > 0
                    ? compositionValue.value || computedInputValue.value
                    : compositionValue.value || computedInputValue.value || props.placeholder}
                </span>
              </ResizeObserver>
              <TransitionGroup
                ref={tagsRef}
                tag="span"
                name={`${prefix}-zoom`}
                // @ts-expect-error Vue's TransitionGroup typings omit the forwarded class attribute.
                class={classes(n('inner'), [props.tagNowrap, n('--nowrap')])}
              >
                {tags.value.map((item, index) => {
                  const content = slots.label?.({ data: item.raw }) ?? props.formatLabel?.(item.raw) ?? item.label
                  const visibleLabel =
                    typeof content === 'string' || typeof content === 'number' ? String(content).trim() : ''
                  const label = visibleLabel || String(item.label ?? item.value)
                  return (
                    <Tag
                      class={classes(n('tag'))}
                      show
                      nowrap={props.tagNowrap}
                      {...item.tagProps}
                      key={item.key}
                      closable={isTagClosable(item)}
                      closeButtonAriaLabel={item.tagProps?.closeButtonAriaLabel ?? `${closeLabel.value} ${label}`}
                      checkable={!mergedDisabled.value && !mergedReadonly.value && item.tagProps?.checkable}
                      onClose={(ev: MouseEvent) => handleRemove(item.value, index, ev)}
                    >
                      {content}
                    </Tag>
                  )
                })}
                <input
                  {...nativeAttrs.value}
                  id={inputId.value}
                  value={isComposition.value ? inputRef.value?.value : computedInputValue.value}
                  aria-busy={candidateLoading.value ? true : nativeAttrs.value['aria-busy']}
                  aria-invalid={mergedError.value ? true : nativeAttrs.value['aria-invalid']}
                  aria-describedby={describeError(nativeAttrs.value['aria-describedby'])}
                  role={searchEnabled.value ? 'combobox' : nativeAttrs.value.role}
                  aria-autocomplete={searchEnabled.value ? 'list' : undefined}
                  aria-expanded={searchEnabled.value ? candidateVisible.value : undefined}
                  aria-controls={candidateVisible.value ? listboxId : undefined}
                  aria-activedescendant={
                    candidateVisible.value && activeKey.value
                      ? `${listboxId}-${encodeURIComponent(activeKey.value)}`
                      : undefined
                  }
                  ref={inputRef}
                  key={`${prefix}-input`}
                  class={classes(n('input'))}
                  style={inputStyle}
                  placeholder={tags.value.length === 0 ? props.placeholder : undefined}
                  disabled={mergedDisabled.value}
                  readonly={mergedReadonly.value || props.disabledInput}
                  onInput={handleInput}
                  onKeydown={handleKeyDown}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onCompositionstart={handleComposition}
                  onCompositionupdate={handleComposition}
                  onCompositionend={handleComposition}
                />
              </TransitionGroup>
            </>
          ),
        }}
      />
    )

    const renderOption = (item: SelectOptionInfo | SelectOptionGroupInfo): import('vue').VNodeChild =>
      isGroupOptionInfo(item) ? (
        <OptGroup key={item.key} label={item.label}>
          {item.options.map(renderOption)}
        </OptGroup>
      ) : (
        <Option
          key={item.key}
          value={item.value}
          disabled={item.disabled}
          internal
          ref={(node: Element | ComponentPublicInstance | null) => {
            const element = node && '$el' in node ? node.$el : node
            if (element) {
              optionRefs.value[item.key] = element as HTMLElement
            } else {
              delete optionRefs.value[item.key]
            }
          }}
          v-slots={{ default: () => item.label }}
        />
      )
    const render = () =>
      searchEnabled.value ? (
        <Trigger
          trigger="focus"
          unmountOnClose={true}
          placement="bottom-start"
          popupOffset={4}
          updateAtScroll
          preventFocus
          autoFitPopupWidth
          closeOnClickReference={false}
          open={candidateVisible.value}
          onUpdate:open={(value: boolean) => {
            candidateOpen.value = value
          }}
          v-slots={{
            content: () => (
              <SelectDropdown
                ref={dropdownRef}
                listboxId={listboxId}
                loading={candidateLoading.value}
                empty={candidateVisible.value && !validOptionInfos.value.length}
              >
                {validOptions.value.map(renderOption)}
              </SelectDropdown>
            ),
          }}
        >
          {renderField()}
        </Trigger>
      ) : (
        renderField()
      )

    return {
      inputRef,
      render,
    }
  },
  methods: {
    /**
     * @zh 使输入框获取焦点
     * @en Make the input box focus
     * @public
     */
    focus() {
      ;(this.inputRef as HTMLInputElement)?.focus()
    },
    /**
     * @zh 使输入框失去焦点
     * @en Make the input box lose focus
     * @public
     */
    blur() {
      ;(this.inputRef as HTMLInputElement)?.blur()
    },
  },
  render() {
    return this.render()
  },
})
