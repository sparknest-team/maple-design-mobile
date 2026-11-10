<template>
  <FieldDecorator
    v-bind="{ ...splitInputAttrs($attrs).root, ...decoration }"
    decorative-hint
    :class="n()"
    @clear="emit('clear', $event)"
    @click="handleClick"
  >
    <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
    <span
      :class="n('controls')"
      :role="range && groupLabelId && !$slots.selected ? 'group' : undefined"
      :aria-labelledby="range && !$slots.selected ? groupLabelId : undefined"
    >
      <slot name="selected">
        <template v-for="(_, index) in values" :key="index">
          <span v-if="index > 0" :class="n('separator')"
            ><slot name="separator">{{ separator }}</slot></span
          >
          <span v-if="index === 1 && endHint" :class="n('end-hint')">{{ endHint }}</span>
          <input
            v-bind="inputAttributes(index)"
            :id="props.inputAttrs?.[index]?.id ?? (index === 0 ? controlId : controlId + '-' + index)"
            :ref="(element) => setInput(element, index)"
            :class="[n('input'), (hint || !placeholders[index]) && n('input--hide-placeholder')]"
            :value="editing[index] ?? ''"
            :placeholder="placeholders[index] || placeholder"
            :disabled="disabled || disabledParts[index]"
            :readonly="readonly || !editable"
            :aria-expanded="open"
            :aria-invalid="error ? true : inputAttributes(index)['aria-invalid']"
            :aria-describedby="describeError(inputAttributes(index)['aria-describedby'])"
            :aria-haspopup="popupRole"
            role="combobox"
            autocomplete="off"
            @focus="handleFocus($event, index)"
            @click="activate(index)"
            @blur="handleBlur($event, index)"
            @input="handleInput($event, index)"
            @compositionstart="composing = true"
            @compositionend="handleCompositionEnd($event, index)"
            @keydown="handleKeydown($event, index)"
          />
        </template>
      </slot>
    </span>
    <template v-if="$slots['clear-icon']" #clear-icon="scope"><slot name="clear-icon" v-bind="scope" /></template>
    <template #suffix>
      <button
        type="button"
        :class="n('open-trigger')"
        data-field-open-trigger
        :disabled="disabled || readonly"
        :aria-label="placeholder || placeholders[0] || selectText"
        :aria-expanded="open"
        :aria-haspopup="popupRole"
        @mousedown.prevent
      >
        <slot name="arrow-icon" :focus="active" :popup-open="open">
          <IconClockCircle v-if="kind === 'time'" aria-hidden="true" />
          <IconCalendar v-else aria-hidden="true" />
        </slot>
      </button>
      <slot name="suffix" />
    </template>
  </FieldDecorator>
</template>

<script setup lang="ts">
import {
  computed,
  mergeProps,
  nextTick,
  ref,
  useAttrs,
  useId,
  watch,
  type ComponentPublicInstance,
  type InputHTMLAttributes,
} from 'vue'
import { IconCalendar, IconClockCircle } from '@maple-design/icons-vue'
import FieldDecorator from '../../field-decorator/FieldDecorator.vue'
import { fieldDecoratorProps } from '../../field-decorator/props'
import { useFormErrorDescription } from '../../form/error-description'
import { useFormItemLabel } from '../../form/label-context'
import { splitInputAttrs } from '../../input/native-attrs'
import { createNamespace } from '../../utils/components'
import { useFieldTexts } from '../field-presentation/texts'
import { blockFieldOpenClick, isFieldOpenClick } from '../picker-field/open-trigger'
import { pickerFieldProps } from './props'
import { useRangeFieldIndex } from './range-field-context'

defineOptions({
  name: createNamespace('picker-field').name,
  inheritAttrs: false,
})
const { select: selectText } = useFieldTexts()
const formLabel = useFormItemLabel()
const props = defineProps(pickerFieldProps)
const attrs = useAttrs()
function inputAttributes(index: number): InputHTMLAttributes & Record<string, unknown> {
  const part = props.inputAttrs?.[index] ?? {}
  const common = splitInputAttrs(attrs).native
  const merged = mergeProps(common, part as Record<string, unknown>)
  const descriptions = [common['aria-describedby'], part['aria-describedby']].flatMap((value) =>
    typeof value === 'string' ? value.split(/\s+/).filter(Boolean) : [],
  )
  if (descriptions.length) {
    merged['aria-describedby'] = [...new Set(descriptions)].join(' ')
  }
  if ('aria-label' in part && !('aria-labelledby' in part)) {
    delete merged['aria-labelledby']
  }
  if ('aria-labelledby' in part && !('aria-label' in part)) {
    delete merged['aria-label']
  }
  return merged as InputHTMLAttributes & Record<string, unknown>
}
const { describe: describeError } = useFormErrorDescription()
const emit = defineEmits<{
  edit: [texts: string[], index: number]
  commit: [texts: string[], index: number, event: Event]
  focus: [event: FocusEvent, index: number]
  blur: [event: FocusEvent, index: number]
  clear: [event: Event]
  click: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
}>()
const { n } = createNamespace('picker-field')
function handleClick(event: MouseEvent) {
  if (!isFieldOpenClick(event, props.openTriggerTarget)) {
    blockFieldOpenClick(event)
  }
  emit('click', event)
}
const generatedId = useId()
const controlId = computed(() => props.id ?? generatedId)
const groupLabelId = computed(() => {
  const label = formLabel?.value
  if (!label) {
    return undefined
  }
  const ids = [props.inputAttrs?.[0]?.id ?? controlId.value, props.inputAttrs?.[1]?.id ?? `${controlId.value}-1`]
  return !label.target || ids.includes(label.target) ? label.id : undefined
})
const inputs: (HTMLInputElement | undefined)[] = []
const activeIndex = useRangeFieldIndex(() => props.disabledParts)
const active = ref(false)
watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      active.value = false
    }
  },
  { flush: 'sync' },
)
const composing = ref(false)
const editing = ref([...props.texts])
const dirty = ref(false)
watch(
  () => [props.editable, props.disabled, props.readonly],
  () => {
    editing.value = [...props.texts]
    dirty.value = false
    composing.value = false
  },
)
const values = computed(() => (props.range ? [props.texts[0] ?? '', props.texts[1] ?? ''] : [props.texts[0] ?? '']))
watch(
  () => props.texts,
  (value) => {
    editing.value = [...value]
    dirty.value = false
  },
  { deep: true },
)
const decoration = computed(() => ({
  ...Object.fromEntries(
    Object.keys(fieldDecoratorProps).map((key) => [key, props[key as keyof typeof fieldDecoratorProps]]),
  ),
  cursor: props.openTriggerTarget === 'icon' && !props.disabled && !props.readonly ? 'text' : props.cursor,
  id: controlId.value,
  placeholder: props.placeholder ?? props.placeholders[0],
  value: props.texts.some(Boolean) ? props.texts : [],
  focused: props.focused || props.open || active.value,
  composing: composing.value,
}))
function setInput(element: Element | ComponentPublicInstance | null, index: number) {
  inputs[index] = element ? (element as HTMLInputElement) : undefined
}
function activate(index: number) {
  if (!props.disabled && !props.readonly && !props.disabledParts[index]) {
    activeIndex.value = index
  }
}
function focus(index = activeIndex.value) {
  const target =
    !inputs[index] || inputs[index]?.disabled ? inputs.find((input) => input && !input.disabled) : inputs[index]
  target?.focus()
}
function blur() {
  inputs.forEach((input) => input?.blur())
}
function handleFocus(event: FocusEvent, index: number) {
  activate(index)
  if (active.value) {
    return
  }
  active.value = true
  emit('focus', event, index)
}
function commit(event: Event, index: number) {
  if (
    !dirty.value ||
    composing.value ||
    !props.editable ||
    props.disabled ||
    props.readonly ||
    props.disabledParts[index]
  ) {
    return
  }
  dirty.value = false
  emit('commit', [...editing.value], index, event)
  nextTick(() => {
    // Accepted updates have flushed; invalid or rejected drafts return to the model.
    if (!dirty.value && !composing.value) {
      editing.value = [...props.texts]
    }
  })
}
function handleBlur(event: FocusEvent, index: number) {
  if (inputs.includes(event.relatedTarget as HTMLInputElement)) {
    return
  }
  commit(event, index)
  active.value = false
  emit('blur', event, index)
  editing.value = [...props.texts]
}
function handleInput(event: Event, index: number) {
  if (props.disabled || props.readonly || !props.editable || props.disabledParts[index]) {
    return
  }
  editing.value[index] = (event.target as HTMLInputElement).value
  dirty.value = true
  if (!composing.value) {
    emit('edit', [...editing.value], index)
  }
}
function handleCompositionEnd(event: CompositionEvent, index: number) {
  composing.value = false
  handleInput(event, index)
}
function handleKeydown(event: KeyboardEvent, index: number) {
  if (event.defaultPrevented || composing.value || event.isComposing || event.keyCode === 229) {
    return
  }
  if (event.key === 'Enter') {
    commit(event, index)
  }
  if (event.key === 'Escape') {
    editing.value = [...props.texts]
    dirty.value = false
  }
  emit('keydown', event)
}
defineExpose({ focus, blur, commit: (event: Event) => commit(event, activeIndex.value) })
</script>
