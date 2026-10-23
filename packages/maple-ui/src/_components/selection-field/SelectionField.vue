<template>
  <FieldDecorator
    v-bind="decoration"
    :class="classes(n(), [multiple, n('--multiple')], [tagNowrap, n('--nowrap')])"
    @mousedown="handleMousedown"
    @clear="emit('clear', $event)"
    @click="emit('click', $event)"
  >
    <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
    <span :class="n('content')" :style="{ textAlign }">
      <span v-if="items.length && !hideSelection" :class="n('selection')">
        <slot name="selected">
          <template v-if="multiple && showTags">
            <Tag
              v-for="item in visibleItems"
              :key="item.key"
              v-bind="item.tagProps"
              :class="n('tag')"
              :show="true"
              :size="item.tagProps?.size ?? 'sm'"
              :nowrap="tagNowrap || item.tagProps?.nowrap"
              :closable="editable && item.closable !== false"
              @mousedown.prevent.stop
              @click.stop
              @close="remove(item)"
            >
              <SelectionTagLabel v-if="tagNowrap || item.tagProps?.nowrap" :disabled="disabled">
                <slot name="label" :data="item"><RenderContent :content="item.label" /></slot>
              </SelectionTagLabel>
              <slot v-else name="label" :data="item"><RenderContent :content="item.label" /></slot>
            </Tag>
            <Tag v-if="hiddenCount" :class="n('summary')" :show="true" size="sm">+{{ hiddenCount }}</Tag>
          </template>
          <template v-else>
            <span v-for="(item, index) in displayedItems" :key="item.key" :class="n('label')">
              <slot name="label" :data="item"><RenderContent :content="item.label" /></slot
              >{{ multiple && index < displayedItems.length - 1 ? separator : '' }}
            </span>
          </template>
        </slot>
      </span>
      <input
        v-bind="$attrs"
        :id="controlId"
        ref="inputRef"
        :class="classes(n('input'), [items.length > 0 && !hideSelection, n('input--with-value')])"
        :value="inputValue"
        :placeholder="!hint && !items.length ? placeholder : undefined"
        :disabled="disabled"
        :readonly="!searchable || readonly"
        :aria-label="typeof $attrs['aria-label'] === 'string' ? $attrs['aria-label'] : placeholder"
        :aria-expanded="open"
        :aria-invalid="error || undefined"
        :aria-autocomplete="searchable ? 'list' : 'none'"
        role="combobox"
        autocomplete="off"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @compositionstart="composing = true"
        @compositionend="handleCompositionEnd"
        @keydown="handleKeydown"
      />
    </span>
    <template v-if="$slots['clear-icon']" #clear-icon="scope"><slot name="clear-icon" v-bind="scope" /></template>
    <template #suffix>
      <span
        :class="classes(n('icon'), [loading, n('icon--loading')], [open && !loading && !searchable, n('icon--open')])"
        aria-hidden="true"
      >
        <slot v-if="loading" name="loading-icon"><IconLoading /></slot>
        <slot v-else-if="searchable && open" name="search-icon"><IconSearch /></slot>
        <slot v-else name="arrow-icon" :focus="active" :menu-open="open"><IconDown /></slot>
      </span>
      <slot name="suffix" />
    </template>
  </FieldDecorator>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch, type VNodeChild } from 'vue'
import { IconDown, IconLoading, IconSearch } from '@maplejs/icons-vue'
import FieldDecorator from '../../field-decorator/FieldDecorator.vue'
import { fieldDecoratorProps } from '../../field-decorator/props'
import Tag from '../../tag'
import { createNamespace } from '../../utils/components'
import { selectionFieldProps, type SelectionFieldItem } from './props'
import SelectionTagLabel from './SelectionTagLabel.vue'

defineOptions({ name: createNamespace('selection-field').name, inheritAttrs: false })
const props = defineProps(selectionFieldProps)
const emit = defineEmits<{
  'update:inputValue': [value: string]
  remove: [key: SelectionFieldItem['key']]
  clear: [event: Event]
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()
const { n, classes } = createNamespace('selection-field')
const inputRef = ref<HTMLInputElement>()
const active = ref(false)
const composing = ref(false)
const lastInput = ref(props.inputValue)
watch(
  () => props.inputValue,
  (value) => {
    lastInput.value = value
  },
)
const generatedId = useId()
const controlId = computed(() => props.id ?? generatedId)
const editable = computed(() => !props.disabled && !props.readonly)
const hideSelection = computed(() => !props.multiple && props.searchable && Boolean(props.inputValue))
const visibleItems = computed(() => (props.maxTagCount > 0 ? props.items.slice(0, props.maxTagCount) : props.items))
const hiddenCount = computed(() => props.items.length - visibleItems.value.length)
const displayedItems = computed(() => (props.multiple ? props.items : props.items.slice(0, 1)))
const decoration = computed(() => ({
  ...Object.fromEntries(
    Object.keys(fieldDecoratorProps).map((key) => [key, props[key as keyof typeof fieldDecoratorProps]]),
  ),
  id: controlId.value,
  value: props.items.map((item) => item.value),
  focused: props.focused || active.value || props.open,
  composing: composing.value,
}))
const RenderContent = (props: { content: VNodeChild }) => props.content

function focus() {
  inputRef.value?.focus()
}
function blur() {
  inputRef.value?.blur()
}
function handleMousedown(event: MouseEvent) {
  if (props.disabled || event.button !== 0) {
    return
  }
  const target = event.target as HTMLElement
  if (target.closest('button,a') || target === inputRef.value) {
    return
  }
  event.preventDefault()
  focus()
}
function handleFocus(event: FocusEvent) {
  active.value = true
  emit('focus', event)
}
function handleBlur(event: FocusEvent) {
  active.value = false
  emit('blur', event)
}
function handleInput(event: Event) {
  if (!editable.value || !props.searchable || composing.value) {
    return
  }
  const value = (event.target as HTMLInputElement).value
  if (value !== lastInput.value) {
    lastInput.value = value
    emit('update:inputValue', value)
  }
}
function handleCompositionEnd(event: CompositionEvent) {
  composing.value = false
  handleInput(event)
}
function remove(item: SelectionFieldItem) {
  if (editable.value && item.closable !== false) {
    emit('remove', item.key)
  }
}
function handleKeydown(event: KeyboardEvent) {
  if (composing.value || event.isComposing || event.keyCode === 229) {
    return
  }
  if (!editable.value) {
    return
  }
  if (event.key === 'Backspace' && props.multiple && !props.inputValue) {
    const item = [...props.items].reverse().find((item) => item.closable !== false)
    if (item) {
      event.preventDefault()
      remove(item)
    }
  }
  emit('keydown', event)
}
defineExpose({ inputRef, focus, blur })
</script>
