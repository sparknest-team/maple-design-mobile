<template>
  <div
    ref="rootEl"
    :class="classes(n(), n('$--box'), n(`--align-${align}`), n(`--size-${size}`))"
    :style="{
      '--mp-verification-code-gutter': gutterStyle,
    }"
    role="group"
    :aria-label="ariaLabel"
    @click="handleClick"
    @keydown="handleKeydown"
    @paste="handlePaste"
  >
    <div :class="n('cells')">
      <template v-for="(_, index) in cellIndexes" :key="index">
        <div :class="n('cell')" :data-index="index">
          <mp-input
            :ref="(el) => setInputRef(el, index)"
            :model-value="getDisplayChar(index)"
            :type="nativeInputType"
            autocomplete="off"
            placeholder=""
            :hint="false"
            :size="fieldSize"
            :variant="variant"
            :text-color="textColor"
            :focus-color="focusColor"
            :blur-color="blurColor"
            :disabled="formDisabled || disabled"
            :readonly="formReadonly || readonly"
            :aria-label="cellAriaLabel(index)"
            :is-force-focusing-effect="activeIndex === index"
            :is-force-error-effect="error ? true : undefined"
            :input-attrs="cellInputAttrs"
            @focus="() => handleFocus(index)"
            @blur="(event) => handleBlur(event)"
            @input="(value, event) => handleCellInput(index, value, event)"
          />
        </div>

        <div v-if="shouldRenderSeparator(index)" :class="n('separator')">
          <slot name="separator" :index="index" :character="getValueChars()[index] ?? ''">
            <maybe-v-node :is="renderSeparator(index)" />
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  useSlots,
  watch,
  type ComponentPublicInstance,
  type VNode,
} from 'vue'
import { call, clamp, isString, raf, toNumber } from '@maplejs/maple-shared'
import { onSmartMounted } from '@maplejs/maple-use'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import MpInput from '../input/Input.vue'
import { createNamespace, flatFragment, MaybeVNode } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props, type VerificationCodeFormatter } from './props'

const { name, n, classes } = createNamespace('verification-code')

export default defineComponent({
  name,
  components: {
    MpInput,
    MaybeVNode,
  },
  props,
  emits: ['update:modelValue', 'change', 'finish', 'input', 'click', 'paste'],
  setup(props, { emit }) {
    const slots = useSlots()
    const rootEl = ref<HTMLElement | null>(null)
    const inputRefs = ref<Array<InstanceType<typeof MpInput> | null>>([])
    const activeIndex = ref(-1)
    const innerValue = ref(props.defaultValue ?? '')
    const { form } = useForm()
    const { eventHandlers } = useFormItem()

    const normalizedLength = computed(() => Math.max(1, toNumber(props.length) || 6))
    const normalizedMaskSymbol = computed(() => splitChars(props.maskSymbol)[0] ?? '•')
    const mergedModelValue = computed(() => props.modelValue ?? innerValue.value)
    const normalizedValue = computed(() => normalizeValue(mergedModelValue.value))
    const cellIndexes = computed(() => Array.from({ length: normalizedLength.value }))
    const gutterStyle = computed(() => toSizeUnit(props.gutter))
    const resolvedInputmode = computed(() => (props.type === 'digit' ? 'numeric' : undefined))
    const nativeInputType = computed(() => (props.type === 'digit' ? 'tel' : 'text'))
    const cellInputAttrs = computed(() => ({
      inputmode: resolvedInputmode.value,
    }))
    const fieldSize = computed(() => props.size)
    const formDisabled = computed(() => form?.disabled.value ?? false)
    const formReadonly = computed(() => form?.readonly.value ?? false)

    let pendingFocusIndex: number | null = null
    let focusEffectQueued = false

    watch(
      () => props.modelValue,
      (value) => {
        if (value != null) {
          innerValue.value = value
        }
      },
    )

    onSmartMounted(() => {
      if (props.autofocus) {
        focus()
      }
    })

    function splitChars(value: string) {
      return Array.from(value)
    }

    function normalizeValue(value: string) {
      return transformByType(value ?? '').slice(0, normalizedLength.value)
    }

    function transformByType(value: string) {
      switch (props.type) {
        case 'digit':
          return value.replace(/\D+/g, '')

        case 'alphanumeric':
          return splitChars(value)
            .filter((char) => /[A-Za-z0-9]/.test(char))
            .join('')

        default:
          return value
      }
    }

    function getValueChars() {
      return splitChars(normalizedValue.value)
    }

    function getDisplayChar(index: number) {
      const char = getValueChars()[index] ?? ''

      if (!char) {
        return ''
      }

      return props.masked ? normalizedMaskSymbol.value : char
    }

    function cellAriaLabel(index: number) {
      if (!props.ariaLabel) {
        return undefined
      }

      return `${props.ariaLabel} ${index + 1}/${normalizedLength.value}`
    }

    function setInputRef(el: Element | ComponentPublicInstance | InstanceType<typeof MpInput> | null, index: number) {
      inputRefs.value[index] = el && '$' in el ? (el as InstanceType<typeof MpInput>) : null
    }

    function renderSeparator(index: number): VNode | string | undefined {
      if (!props.separator) {
        return undefined
      }

      const result = props.separator(index, getValueChars()[index] ?? '')
      return result == null ? undefined : result
    }

    function shouldRenderSeparator(index: number) {
      if (index >= normalizedLength.value - 1) {
        return false
      }

      if (slots.separator) {
        const vNodes = slots.separator({ index, character: getValueChars()[index] ?? '' })
        return flatFragment(vNodes).length > 0
      }

      if (!props.separator) {
        return false
      }

      const result = props.separator(index, getValueChars()[index] ?? '')
      return result != null && result !== ''
    }

    function applyFormatter(char: string, index: number, currentValue: string): string | false {
      if (!props.formatter) {
        return char
      }

      const result = (props.formatter as VerificationCodeFormatter)(char, index, currentValue)

      if (result === false) {
        return false
      }

      if (isString(result)) {
        const next = result.charAt(0)
        return next || false
      }

      return char
    }

    function formatChars(chars: string[], startIndex: number, currentValue: string) {
      const nextChars: string[] = []
      let cursor = startIndex

      for (const char of chars) {
        const formatted = applyFormatter(char, cursor, currentValue)

        if (formatted === false) {
          continue
        }

        nextChars.push(formatted)
        cursor += 1
      }

      return nextChars
    }

    function maybeEmitFinish(value: string) {
      if (splitChars(value).length !== normalizedLength.value) {
        return
      }

      emit('finish', value)
    }

    function updateValue(value: string, index: number) {
      if (value === normalizedValue.value) {
        syncCellDisplayValue(index)
        return
      }

      if (props.modelValue === undefined) {
        innerValue.value = value
      }

      emit('update:modelValue', value)
      emit('change', value)
      eventHandlers.value.onChange?.()
      eventHandlers.value.onInput?.()
      maybeEmitFinish(value)
    }

    async function focusCell(index: number) {
      const targetIndex = clamp(index, 0, normalizedLength.value - 1)
      inputRefs.value[targetIndex]?.focus?.()
      await raf()

      const inputEl = inputRefs.value[targetIndex]?.inputRef as HTMLInputElement | null | undefined
      if (document.activeElement === inputEl) {
        inputEl?.select?.()
      }
    }

    function focus(index?: number) {
      const targetIndex = index == null ? Math.min(getValueChars().length, normalizedLength.value - 1) : index
      focusCell(targetIndex)
    }

    function blur() {
      inputRefs.value.forEach((inputRef) => {
        inputRef?.blur?.()
      })
    }

    function reset() {
      if (normalizedValue.value !== '') {
        if (props.modelValue === undefined) {
          innerValue.value = ''
        }

        emit('update:modelValue', '')
        emit('change', '')
      }
    }

    function syncCellDisplayValue(index: number) {
      const inputEl = inputRefs.value[index]?.inputRef as HTMLInputElement | null | undefined

      if (inputEl) {
        inputEl.value = getDisplayChar(index)
      }
    }

    function syncAllCellDisplayValues() {
      cellIndexes.value.forEach((_, index) => {
        syncCellDisplayValue(index)
      })
    }

    function scheduleFocusEffect(index: number) {
      pendingFocusIndex = index

      if (focusEffectQueued) {
        return
      }

      focusEffectQueued = true

      nextTick(() => {
        focusEffectQueued = false

        if (pendingFocusIndex == null) {
          return
        }

        activeIndex.value = pendingFocusIndex
        focusCell(pendingFocusIndex)
        pendingFocusIndex = null
      })
    }

    function replaceChars(index: number, chars: string[]) {
      const valueChars = getValueChars()
      const targetIndex = clamp(index, 0, valueChars.length)
      const nextChars = [...valueChars]
      const currentValue = normalizedValue.value
      const processedChars = formatChars(
        chars.slice(0, normalizedLength.value - targetIndex),
        targetIndex,
        currentValue,
      )

      processedChars.forEach((char, offset) => {
        nextChars[targetIndex + offset] = char
      })

      const nextValue = nextChars.join('').slice(0, normalizedLength.value)
      updateValue(nextValue, targetIndex)
      const nextFocusIndex = clamp(targetIndex + processedChars.length, 0, normalizedLength.value - 1)

      scheduleFocusEffect(nextFocusIndex)
    }

    function removeAt(index: number, focusIndex = clamp(index, 0, normalizedLength.value - 1)) {
      const valueChars = getValueChars()

      valueChars.splice(index, 1)
      const nextValue = valueChars.join('')
      updateValue(nextValue, index)
      scheduleFocusEffect(focusIndex)
    }

    function removeWithBackspace(index: number) {
      const valueChars = getValueChars()

      if (!valueChars[index]) {
        if (index <= 0) {
          syncAllCellDisplayValues()
          return
        }

        removeAt(index - 1, index - 1)
        return
      }

      const isLastCell = index === valueChars.length - 1
      const nextFocusIndex = !isLastCell && index > 0 ? index - 1 : clamp(index, 0, normalizedLength.value - 1)
      removeAt(index, nextFocusIndex)
    }

    function handleClick(event: Event) {
      if (props.disabled || formDisabled.value) {
        return
      }

      const target = event.target as HTMLElement | null
      const cell = target?.closest(`.${n('cell')}`) as HTMLElement | null
      const indexAttr = cell?.dataset.index

      emit('click', event)

      if (indexAttr == null) {
        return
      }

      focusCell(Number(indexAttr))
    }

    function handleFocus(index: number) {
      activeIndex.value = index
      focusCell(index)
      eventHandlers.value.onFocus?.()
    }

    function handleBlur(event: FocusEvent) {
      const relatedTarget = event.relatedTarget as Node | null
      const isLeavingComponent = !relatedTarget || !rootEl.value?.contains(relatedTarget)

      if (isLeavingComponent) {
        activeIndex.value = -1
        eventHandlers.value.onBlur?.()
      }
    }

    function handleCellInput(index: number, value: string, event: Event) {
      const inputChars = splitChars(transformByType(value))
      const valueChars = getValueChars()
      const crossTargetIndex = index > valueChars.length

      emit('input', inputChars[inputChars.length - 1] ?? '', index, event)

      if (inputChars.length === 0) {
        if (crossTargetIndex) {
          scheduleFocusEffect(valueChars.length)
          syncCellDisplayValue(index)
          return
        }

        if (value === '') {
          removeAt(index)
        } else {
          syncCellDisplayValue(index)
          scheduleFocusEffect(index)
        }

        return
      }

      if (crossTargetIndex) {
        replaceChars(valueChars.length, inputChars)
        return
      }

      replaceChars(index, inputChars)
    }

    function handlePaste(event: ClipboardEvent) {
      if (!props.allowPaste || formDisabled.value || formReadonly.value || props.disabled || props.readonly) {
        return
      }

      const text = event.clipboardData?.getData('text') ?? ''

      if (!text) {
        return
      }

      event.preventDefault()

      const transformedValue = props.pasteTransform ? props.pasteTransform(text) : text
      const result = transformByType(transformedValue)

      emit('paste', result, event)

      if (!result) {
        syncAllCellDisplayValues()
        return
      }

      replaceChars(0, splitChars(result))
    }

    function handleKeydown(event: KeyboardEvent) {
      if (formDisabled.value || formReadonly.value || props.disabled || props.readonly) {
        return
      }

      const target = event.target as HTMLElement | null
      const cell = target?.closest(`.${n('cell')}`) as HTMLElement | null
      const indexAttr = cell?.dataset.index

      if (indexAttr == null) {
        return
      }

      const index = Number(indexAttr)

      if (event.key === 'Backspace' && getValueChars().length > 0) {
        event.preventDefault()
        removeWithBackspace(index)
        return
      }

      if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault()
        focusCell(index - 1)
        return
      }

      if (event.key === 'ArrowRight' && index < normalizedLength.value - 1) {
        event.preventDefault()
        focusCell(index + 1)
      }
    }

    return {
      rootEl,
      activeIndex,
      formDisabled,
      formReadonly,
      cellIndexes,
      gutterStyle,
      nativeInputType,
      cellInputAttrs,
      fieldSize,
      align: computed(() => props.align),
      size: computed(() => props.size),
      variant: computed(() => props.variant),
      disabled: computed(() => props.disabled),
      readonly: computed(() => props.readonly),
      error: computed(() => props.error),
      textColor: computed(() => props.textColor),
      focusColor: computed(() => props.focusColor),
      blurColor: computed(() => props.blurColor),
      ariaLabel: computed(() => props.ariaLabel),
      n,
      classes,
      setInputRef,
      getDisplayChar,
      getValueChars,
      cellAriaLabel,
      renderSeparator,
      shouldRenderSeparator,
      handleClick,
      handleFocus,
      handleBlur,
      handleCellInput,
      handleKeydown,
      handlePaste,
      focus,
      blur,
      reset,
    }
  },
})
</script>
