import type { StyleValue, VNode } from 'vue'
import { computed, defineComponent, inject, nextTick, ref, toRefs, useId, watch } from 'vue'
import { selectionEditorSurface } from '../_components/selected-options/context'
import VirtualList from '../_components/virtual-list-v2'
import { isFunction, isNull, isUndefined } from '../_utils/is'
import Empty from '../empty'
import Input from '../input'
import { useInputForm } from '../input/use-input-form'
import { useSelect } from '../select/hooks/use-select'
import Optgroup from '../select/Optgroup.vue'
import Option from '../select/Option.vue'
import SelectDropdown from '../select/SelectDropdown.vue'
import type { FilterOption, SelectOptionData, SelectOptionGroupInfo, SelectOptionInfo } from '../select/types'
import { getKeyFromValue, isGroupOptionInfo } from '../select/utils'
import Trigger from '../trigger'
import { createNamespace, getPrefixCls } from '../utils/components'
import { normalizeTextInputValue } from '../utils/text-input-value'
import { autoCompleteProps } from './props'
import type { AutoCompleteOptionData, AutoCompleteOptionInfo } from './props'

const { n, classes } = createNamespace('auto-complete')

export default defineComponent({
  name: createNamespace('auto-complete').name,
  inheritAttrs: false,
  props: autoCompleteProps,
  emits: {
    'update:modelValue': (value: string) => true,
    input: (value: string, ev: Event) => true,
    search: (value: string, ev: Event) => true,
    change: (value: string, ev: Event) => true,
    select: (value: string, option: AutoCompleteOptionInfo, ev: Event) => true,
    clear: (ev: Event) => true,
    focus: (ev: FocusEvent) => true,
    blur: (ev: FocusEvent) => true,
    'dropdown-scroll': (ev: Event) => true,
    'dropdown-reach-bottom': (ev: Event) => true,
  },
  setup(props, { emit, attrs, slots, expose }) {
    const prefixCls = getPrefixCls('auto-complete')
    const editor = inject(selectionEditorSurface, undefined)
    const { modelValue, options, fieldNames } = toRefs(props)
    const { mergedSize, mergedDisabled, mergedReadonly, mergedError, eventHandlers, group } = useInputForm(props)
    const mergedVariant = computed(() => props.variant ?? group?.variant.value ?? 'outline')

    const inputRef = ref<InstanceType<typeof Input>>()
    const dropdownRef = ref()
    const virtualListRef = ref()
    const optionRefs = ref<Record<string, HTMLElement>>({})
    const focused = ref(false)
    const open = ref(false)
    const innerValue = ref(props.defaultValue)
    const computedValue = computed(() => props.modelValue ?? innerValue.value)
    let committedValue = computedValue.value
    let pendingCommittedValue: string | undefined
    let requestedInputValue: string | undefined
    let clearing = false

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        innerValue.value = ''
      }
    })

    watch(computedValue, (value) => {
      if (value === pendingCommittedValue) {
        committedValue = value
        pendingCommittedValue = undefined
        requestedInputValue = undefined
      } else if (value === requestedInputValue) {
        requestedInputValue = undefined
      } else {
        committedValue = value
      }
    })

    const computedValueKeys = computed(() => (computedValue.value ? [getKeyFromValue(computedValue.value)] : []))
    const component = computed(() => (props.virtualListProps ? 'div' : 'li'))

    const strictFilterOption = (inputValue: string, option: SelectOptionData) =>
      String(option[props.fieldNames?.label ?? 'label'] ?? option[props.fieldNames?.value ?? 'value'] ?? '').includes(
        inputValue,
      )

    const mergedFilterOption = computed<FilterOption>(() => {
      const filterOption = props.filterOption
      if (isFunction(filterOption)) {
        return (inputValue: string, option: SelectOptionData) =>
          filterOption(inputValue, option as AutoCompleteOptionData)
      }
      if (filterOption === false) {
        return false
      }
      if (props.strict) {
        return strictFilterOption
      }
      return true
    })

    const editable = computed(() => !mergedDisabled.value && !mergedReadonly.value)
    const optionsReady = ref(false)
    const computedOpen = computed(
      () =>
        optionsReady.value &&
        editable.value &&
        (editor || open.value) &&
        validOptionInfos.value.length > 0 &&
        props.shouldOpen(computedValue.value),
    )
    const listboxId = `${prefixCls}-listbox-${useId()}`
    const getOptionId = (key: string) => `${listboxId}-option-${encodeURIComponent(key)}`

    const handleOpenChange = (nextOpen: boolean) => {
      open.value = nextOpen && editable.value && !clearing
    }

    const closeDropdown = () => {
      open.value = false
    }

    const openDropdown = () => {
      if (editable.value) {
        open.value = true
      }
    }

    const updateValue = (value: string) => {
      const changed = value !== computedValue.value
      innerValue.value = value
      if (changed) {
        emit('update:modelValue', value)
      }
      return changed
    }

    const emitChange = (value: string, ev: Event, notifyForm = false) => {
      if (value === committedValue) {
        return false
      }
      pendingCommittedValue = value
      if (value === computedValue.value) {
        committedValue = value
      }
      emit('change', value, ev)
      if (notifyForm) {
        eventHandlers.value?.onChange?.(ev)
      }
      return true
    }

    const getOptionInfo = (item: SelectOptionInfo): AutoCompleteOptionInfo => ({
      value: String(item.value),
      label: String(item.label),
      disabled: Boolean(item.disabled),
      raw: item.raw as AutoCompleteOptionData,
    })

    const handleSelect = (key: string, ev: Event) => {
      const item = optionInfoMap.get(key)
      if (!item || item.disabled || !editable.value) {
        return
      }

      const option = getOptionInfo(item)
      const limit = typeof props.maxLength === 'object' ? props.maxLength : { length: props.maxLength }
      const value = normalizeTextInputValue(option.value, {
        maxLength: limit.length,
        errorOnly: 'errorOnly' in limit && limit.errorOnly,
        wordLength: props.wordLength,
        wordSlice: props.wordSlice,
      })
      const changed = updateValue(value)
      emit('select', value, option, ev)
      if (changed) {
        emitChange(value, ev, true)
      }
      closeDropdown()
    }

    let pendingSearch: { value: string; event: Event } | undefined
    let clearEvent: Event | undefined
    const handleInputUpdate = (value: string) => {
      requestedInputValue = value
      updateValue(value)
      const search = pendingSearch
      pendingSearch = undefined
      if (search) {
        emit('search', value, search.event)
        openDropdown()
      }
    }

    const handleInput = (value: string, ev: Event) => {
      if (!editable.value) {
        return
      }
      emit('input', value, ev)
      pendingSearch = ev === clearEvent ? undefined : { value, event: ev }
      clearEvent = undefined
    }

    const handleChange = (value: string, ev: Event) => {
      if (ev.defaultPrevented) {
        return
      }
      emitChange(value, ev)
    }

    const handleClear = (ev: Event) => {
      clearing = true
      nextTick(() => {
        clearing = false
      })
      clearEvent = ev
      pendingSearch = undefined
      closeDropdown()
      emit('clear', ev)
    }

    const handleFocus = (ev: FocusEvent) => {
      focused.value = true
      if (!clearing) {
        openDropdown()
      }
      emit('focus', ev)
    }

    const handleBlur = (ev: FocusEvent) => {
      focused.value = false
      closeDropdown()
      emit('blur', ev)
    }

    const handleDropdownScroll = (ev: Event) => emit('dropdown-scroll', ev)
    const handleDropdownReachBottom = (ev: Event) => emit('dropdown-reach-bottom', ev)

    const { validOptions, optionInfoMap, validOptionInfos, activeKey, handleKeyDown } = useSelect({
      options,
      inputValue: computedValue,
      filterOption: mergedFilterOption,
      fieldNames,
      open: computedOpen,
      valueKeys: computedValueKeys,
      component,
      dropdownRef,
      optionRefs,
      virtualListRef,
      onSelect: handleSelect,
      onOpenChange: handleOpenChange,
      enterToOpen: false,
    })

    optionsReady.value = true

    const handleInputKeydown = (ev: KeyboardEvent) => {
      if (ev.key === 'Tab') {
        closeDropdown()
        return
      }
      handleKeyDown(ev)
    }

    const getOptionContent = (item: SelectOptionInfo) => {
      if (isFunction(slots.option)) {
        const data = getOptionInfo(item)
        return () => slots.option?.({ data })
      }
      if (isFunction(item.render)) {
        return item.render
      }
      return () => item.label
    }

    const renderOption = (item: SelectOptionInfo | SelectOptionGroupInfo): VNode => {
      if (isGroupOptionInfo(item)) {
        return (
          <Optgroup key={item.key} label={item.label}>
            {item.options.map(renderOption)}
          </Optgroup>
        )
      }
      return (
        <Option
          ref={(instance: any) => {
            if (instance?.$el) {
              optionRefs.value[item.key] = instance.$el
            }
          }}
          key={item.key}
          {...({
            id: getOptionId(item.key),
            role: 'option',
            'aria-selected': editor ? computedValueKeys.value.includes(item.key) : activeKey.value === item.key,
            'aria-disabled': Boolean(item.disabled),
            onMousedown: (ev: MouseEvent) => ev.preventDefault(),
          } as any)}
          value={item.value}
          disabled={item.disabled}
          internal
          v-slots={{ default: getOptionContent(item) }}
        />
      )
    }

    const renderDropdown = () => (
      <SelectDropdown
        ref={dropdownRef}
        {...({ id: listboxId, role: 'listbox' } as any)}
        class={classes(n('dropdown'))}
        virtualList={Boolean(props.virtualListProps)}
        onScroll={handleDropdownScroll}
        onReachBottom={handleDropdownReachBottom}
        v-slots={{
          default: () => validOptions.value.map((item) => renderOption(item as SelectOptionInfo)),
          'virtual-list': () => (
            <VirtualList
              {...(props.virtualListProps as any)}
              ref={virtualListRef}
              data={validOptions.value}
              v-slots={{
                item: ({ item }: { item: SelectOptionInfo }) => renderOption(item),
              }}
            />
          ),
          footer: slots.footer,
        }}
      />
    )

    const mergedInputAttrs = computed(() => ({
      ...props.inputAttrs,
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-expanded': computedOpen.value,
      'aria-controls': listboxId,
      'aria-activedescendant': computedOpen.value && activeKey.value ? getOptionId(activeKey.value) : undefined,
      autocomplete: 'off',
    }))

    const renderInput = (restAttrs: Record<string, unknown>) => (
      <Input
        {...restAttrs}
        ref={inputRef}
        modelValue={computedValue.value}
        defaultValue={props.defaultValue}
        size={mergedSize.value}
        variant={editor ? 'outline' : mergedVariant.value}
        disabled={mergedDisabled.value}
        readonly={mergedReadonly.value}
        error={mergedError.value}
        hint={editor ? false : props.hint}
        line={props.line}
        textColor={props.textColor}
        focusColor={props.focusColor}
        blurColor={props.blurColor}
        enterkeyhint={props.enterkeyhint}
        ariaLabel={props.ariaLabel}
        clearable={props.clearable}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        showWordLimit={props.showWordLimit}
        wordLength={props.wordLength}
        wordSlice={props.wordSlice}
        inputAttrs={mergedInputAttrs.value}
        v-slots={{
          prefix: slots.prefix,
          suffix: slots.suffix,
          'clear-icon': slots['clear-icon'],
        }}
        onUpdate:modelValue={handleInputUpdate}
        onInput={handleInput}
        onChange={handleChange}
        onClear={handleClear}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeydown={handleInputKeydown}
      />
    )

    const render = () => {
      const { class: className, style, ...restAttrs } = attrs
      if (editor) {
        return (
          <div class={[classes(n()), className]} style={style as StyleValue}>
            {renderInput(restAttrs)}
            {computedOpen.value ? renderDropdown() : (slots.empty?.() ?? <Empty />)}
          </div>
        )
      }
      return (
        <Trigger
          trigger="focus"
          placement="bottom-start"
          animationName="slide-dynamic-origin"
          autoFitTransformOrigin
          closeOnClickReference={false}
          preventFocus
          popupOffset={4}
          autoFitPopupWidth
          unmountOnClose={true}
          {...props.triggerProps}
          open={computedOpen.value}
          disabled={!editable.value}
          popupContainer={
            props.popupContainer !== undefined ? props.popupContainer : props.triggerProps?.popupContainer
          }
          onUpdate:open={handleOpenChange}
          v-slots={{ content: renderDropdown }}
        >
          <div class={[classes(n()), className]} style={style as StyleValue}>
            {renderInput(restAttrs)}
          </div>
        </Trigger>
      )
    }

    expose({
      focus: () => inputRef.value?.focus(),
      blur: () => inputRef.value?.blur(),
    })

    return render
  },
})
