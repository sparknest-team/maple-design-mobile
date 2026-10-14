<template>
  <div
    ref="rootEl"
    :class="classes(n(), n(`--size-${mergedSize}`), n(`--align-${align}`))"
    :style="
      gutter === undefined
        ? undefined
        : { '--mp-verification-code-gutter': typeof gutter === 'number' ? gutter + 'px' : gutter }
    "
    role="group"
    :aria-label="ariaLabel"
    :aria-invalid="mergedError || undefined"
    @paste="handlePaste"
    @click="handleClick"
    @compositionstart="composing = true"
    @compositionend="composing = false"
  >
    <div :class="n('cells')">
      <template v-for="(_, index) in lengthValue" :key="index">
        <div :class="n('cell')" :data-index="index">
          <Input
            :ref="(el) => setInputRef(el, index)"
            :model-value="display(index)"
            :size="mergedSize"
            :variant="variant"
            :hint="false"
            :clearable="false"
            :disabled="mergedDisabled"
            :readonly="mergedReadonly"
            :error="mergedError"
            :text-color="textColor"
            :focus-color="focusColor"
            :blur-color="blurColor"
            :aria-label="ariaLabel ? `${ariaLabel} ${index + 1}/${lengthValue}` : undefined"
            :input-attrs="{
              inputmode: type === 'digit' ? 'numeric' : 'text',
              autocomplete: index === 0 ? 'one-time-code' : 'off',
            }"
            @input="(value, event) => handleInput(index, value, event)"
            @keydown="(event) => handleKeydown(index, event)"
            @focus="(event) => handleFocus(index, event)"
            @blur="handleBlur"
          />
        </div>
        <SeparatorValue v-if="index < lengthValue - 1" :index="index" />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Comment,
  computed,
  h,
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onScopeDispose,
  ref,
  useSlots,
  type ComponentPublicInstance,
} from 'vue'
import Input, { type InputInstance } from '../input'
import { createNamespace } from '../utils/components'
import { useVerificationForm } from './form-adapter'
import { verificationCodeProps } from './props'
import type { VerificationCodeEmits, VerificationCodeSlots } from './types'

defineOptions({ name: createNamespace('verification-code').name })
const props = defineProps(verificationCodeProps)
const emit = defineEmits<VerificationCodeEmits>()
defineSlots<VerificationCodeSlots>()
const slots = useSlots()
const { n, classes } = createNamespace('verification-code')
const { mergedDisabled, mergedReadonly, mergedError, mergedSize, eventHandlers } = useVerificationForm(props)
const rootEl = ref<HTMLElement>()
const inputs = ref<Array<InputInstance | null>>([])
const inner = ref(props.defaultValue)
const composing = ref(false)
const focused = ref(false)
let alive = true
let generation = 0
const suspend = () => {
  alive = false
  generation++
  composing.value = false
  focused.value = false
}
onScopeDispose(suspend)
onDeactivated(suspend)
onActivated(() => {
  alive = true
})
function afterRender(callback: () => void) {
  const current = generation
  nextTick(() => {
    if (alive && current === generation) {
      callback()
    }
  })
}
const lengthValue = computed(() => (Number.isInteger(props.length) && props.length > 0 ? props.length : 6))
const filter = (value: string) =>
  props.type === 'digit'
    ? value.replace(/\D/g, '')
    : props.type === 'alphanumeric'
      ? value.replace(/[^a-z0-9]/gi, '')
      : value
const value = computed(() =>
  Array.from(filter(props.modelValue ?? inner.value))
    .slice(0, lengthValue.value)
    .join(''),
)
const chars = computed(() => Array.from(value.value))
const blocked = computed(() => mergedDisabled.value || mergedReadonly.value)
const display = (index: number) =>
  chars.value[index] ? (props.masked ? Array.from(props.maskSymbol)[0] || '•' : chars.value[index]) : ''
const SeparatorValue = ({ index }: { index: number }) => {
  const content =
    slots.separator?.({ index, character: chars.value[index] ?? '' }) ??
    props.separator?.(index, chars.value[index] ?? '')
  const visible = (Array.isArray(content) ? content : [content]).some(
    (node) =>
      node != null &&
      node !== false &&
      node !== '' &&
      (typeof node !== 'object' || !('type' in node) || node.type !== Comment),
  )
  return visible ? h('span', { class: n('separator') }, [content]) : null
}
function setInputRef(el: Element | ComponentPublicInstance | null, index: number) {
  inputs.value[index] = el as InputInstance | null
}
function focus(index = Math.min(chars.value.length, lengthValue.value - 1)) {
  if (mergedDisabled.value || !alive) {
    return
  }
  const target = inputs.value[Math.max(0, Math.min(index, lengthValue.value - 1))]
  target?.focus()
  afterRender(() => {
    if (alive) {
      target?.select()
    }
  })
}
function blur() {
  inputs.value.forEach((input) => input?.blur())
}
function restore() {
  inputs.value.forEach((input, index) => {
    if (input?.inputRef) {
      input.inputRef.value = display(index)
    }
  })
}
function submit(next: string, index: number, event?: Event) {
  if (blocked.value || next === value.value) {
    afterRender(restore)
    return
  }
  const previous = value.value
  if (event) {
    emit('input', Array.from(next)[index] ?? '', index, event)
    eventHandlers.value?.onInput?.(event)
  }
  if (props.modelValue === undefined) {
    inner.value = next
  }
  emit('update:modelValue', next)
  emit('change', next)
  eventHandlers.value?.onChange?.(event)
  afterRender(() => {
    if (!alive) {
      return
    }
    restore()
    if (value.value === next && next !== previous && Array.from(next).length === lengthValue.value) {
      emit('finish', next)
    }
  })
}
function reset() {
  if (!composing.value) {
    submit('', 0)
  }
}
function replace(index: number, text: string, event: Event) {
  const target = Math.min(index, chars.value.length)
  const next = [...chars.value]
  let cursor = target
  for (const char of Array.from(filter(text))) {
    if (cursor >= lengthValue.value) {
      break
    }
    const result = props.formatter?.(char, cursor, next.join(''))
    if (result === false) {
      continue
    }
    const formatted = typeof result === 'string' ? Array.from(filter(result))[0] : char
    if (!formatted) {
      continue
    }
    next[cursor++] = formatted
  }
  const proposal = next.join('')
  submit(proposal, target, event)
  afterRender(() => {
    if (alive && value.value === proposal && cursor > target) {
      focus(Math.min(cursor, lengthValue.value - 1))
    }
  })
}
function handleInput(index: number, text: string, event: Event) {
  if (blocked.value) {
    afterRender(restore)
    return
  }
  // Input emits only after composition is committed.
  if (text === '') {
    const next = [...chars.value]
    next.splice(index, 1)
    submit(next.join(''), index, event)
  } else {
    const inputEvent = event as InputEvent
    const data = inputEvent.data
    // A caret after an existing character must still replace this cell.
    // Autofill and composition may supply a whole code instead.
    const singleInsertion =
      event.type === 'input' && inputEvent.inputType === 'insertText' && data != null && Array.from(data).length === 1
    const compositionCommit = event.type === 'compositionend'
    replace(index, data && (props.masked || singleInsertion || compositionCommit) ? data : text, event)
  }
}
function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  if (blocked.value || composing.value || !props.allowPaste) {
    return
  }
  const raw = event.clipboardData?.getData('text') ?? ''
  const text = filter(props.pasteTransform ? props.pasteTransform(raw) : raw)
  emit('paste', text, event)
  const cell = (event.target as Element | null)?.closest?.('[data-index]')
  replace(Number(cell?.getAttribute('data-index') ?? 0), text, event)
}
function handleKeydown(index: number, event: KeyboardEvent) {
  if (mergedDisabled.value || composing.value || event.isComposing || event.keyCode === 229) {
    return
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    focus(index + (event.key === 'ArrowLeft' ? -1 : 1))
    return
  }
  if (mergedReadonly.value || !['Backspace', 'Delete'].includes(event.key)) {
    return
  }
  event.preventDefault()
  const target = event.key === 'Backspace' && !chars.value[index] ? Math.max(index - 1, 0) : index
  const next = [...chars.value]
  next.splice(target, 1)
  submit(next.join(''), target, event)
  afterRender(() => {
    if (alive) {
      focus(target)
    }
  })
}
function handleFocus(index: number, event: FocusEvent) {
  if (!focused.value) {
    focused.value = true
    emit('focus', event)
    eventHandlers.value?.onFocus?.(event)
  }
  afterRender(() => {
    if (alive) {
      inputs.value[index]?.select()
    }
  })
}
function handleBlur(event: FocusEvent) {
  if (event.relatedTarget && rootEl.value?.contains(event.relatedTarget as Node)) {
    return
  }
  if (focused.value) {
    focused.value = false
    emit('blur', event)
    eventHandlers.value?.onBlur?.(event)
  }
}
function handleClick(event: MouseEvent) {
  if (!mergedDisabled.value) {
    emit('click', event)
  }
}
onMounted(() => {
  if (props.autofocus) {
    focus()
  }
})
defineExpose({ focus, blur, reset })
</script>
