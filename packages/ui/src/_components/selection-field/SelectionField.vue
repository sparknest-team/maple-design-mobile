<template>
  <FieldDecorator
    v-bind="decoration"
    decorative-hint
    :class="
      classes(
        n(),
        [multiple, n('--multiple')],
        [tagNowrap, n('--nowrap')],
        [openTriggerTarget === 'icon', n('--icon-trigger')],
      )
    "
    @mousedown="handleMousedown"
    @clear="emit('clear', $event)"
    @click="handleClick"
  >
    <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
    <span
      :class="n('content')"
      :style="{
        '--mp-internal-selection-text-align': textAlign,
        '--mp-internal-selection-justify': textAlign
          ? { left: 'left', center: 'center', right: 'right' }[textAlign]
          : undefined,
      }"
    >
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
        :class="
          classes(
            n('input'),
            [items.length > 0 && !hideSelection, n('input--with-value')],
            [Boolean(placeholder) && (hint || items.length > 0), n('input--hide-placeholder')],
          )
        "
        :value="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="!searchable || readonly"
        :aria-expanded="open"
        :aria-invalid="error ? true : ($attrs['aria-invalid'] as AriaAttributes['aria-invalid'])"
        :aria-describedby="describeError($attrs['aria-describedby'])"
        :aria-busy="loading || undefined"
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
    <template v-if="$slots['loading-icon']" #loading-icon><slot name="loading-icon" /></template>
    <template #suffix>
      <button
        v-if="!loading || loadingMode === 'line'"
        type="button"
        data-field-open-trigger
        :tabindex="openTriggerTabIndex"
        :disabled="disabled || readonly"
        :aria-label="placeholder || selectText"
        :aria-expanded="open"
        :aria-haspopup="($attrs['aria-haspopup'] as AriaAttributes['aria-haspopup']) ?? 'listbox'"
        :aria-controls="typeof $attrs['aria-controls'] === 'string' ? $attrs['aria-controls'] : undefined"
        :class="classes(n('icon'), [open && !searchable, n('icon--open')])"
      >
        <slot v-if="searchable && open" name="search-icon"><IconSearch /></slot>
        <slot v-else name="arrow-icon" v-bind="{ focus: active, menuOpen: open }"><IconDown /></slot>
      </button>
      <slot name="suffix" />
    </template>
  </FieldDecorator>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch, type AriaAttributes, type VNodeChild } from 'vue'
import { IconDown, IconSearch } from '@maple-design/icons-vue'
import FieldDecorator from '../../field-decorator/FieldDecorator.vue'
import { fieldDecoratorProps } from '../../field-decorator/props'
import { useFormErrorDescription } from '../../form/error-description'
import Tag from '../../tag'
import { createNamespace } from '../../utils/components'
import { useFieldTexts } from '../field-presentation/texts'
import { blockFieldOpenClick, isFieldOpenClick } from '../picker-field/open-trigger'
import { selectionFieldProps, type SelectionFieldItem } from './props'
import SelectionTagLabel from './SelectionTagLabel.vue'

defineOptions({ name: createNamespace('selection-field').name, inheritAttrs: false })
const { select: selectText } = useFieldTexts()
const props = defineProps(selectionFieldProps)
const { describe: describeError } = useFormErrorDescription()
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
function handleClick(event: MouseEvent) {
  if (!isFieldOpenClick(event, props.openTriggerTarget)) {
    blockFieldOpenClick(event)
  }
  emit('click', event)
}
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
  cursor: props.openTriggerTarget === 'icon' && !props.disabled && !props.readonly ? 'text' : props.cursor,
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
  if (props.disabled || props.openTriggerTarget === 'icon' || event.button !== 0) {
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
