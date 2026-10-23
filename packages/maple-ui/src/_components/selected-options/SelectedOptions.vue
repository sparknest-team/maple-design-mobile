<template>
  <div v-if="multiple" :class="n()">
    <div :class="n('summary')">
      <button
        v-if="mobile"
        type="button"
        :class="n('toggle')"
        :aria-expanded="showSelected"
        :aria-controls="detailsId"
        :aria-label="showSelected ? texts.selectionBack.value : countText"
        @click="showSelected = !showSelected"
      >
        <span v-if="showSelected" aria-hidden="true">‹</span>
        <span role="status">{{ countText }}</span>
        <span v-if="!showSelected" aria-hidden="true">›</span>
      </button>
      <span v-else role="status">{{ countText }}</span>
      <button type="button" :class="n('clear')" :disabled="disabled || !removable" @click="$emit('clear', $event)">
        {{ texts.clear.value }}
      </button>
    </div>
    <ul v-if="mobile && showSelected" :id="detailsId" :class="n('details')" :aria-label="countText">
      <li v-for="item in items" :key="item.key" :class="n('item')">
        <span :class="n('label')"
          ><slot name="label" :item="item"><Label :value="item.label" /></slot
        ></span>
        <button
          type="button"
          :class="n('remove')"
          :disabled="disabled || item.closable === false"
          :aria-label="`${texts.selectionRemove.value} ${item.text ?? labelText(item)}`"
          @click="$emit('remove', item.key)"
        >
          ×
        </button>
      </li>
      <li v-if="!items.length" :class="n('empty')">{{ texts.selectionEmpty.value }}</li>
    </ul>
    <div v-else-if="!mobile && items.length" :class="n('tags')" :aria-label="countText">
      <span v-for="item in items" :key="item.key" :class="n('tag')">
        <span :class="n('label')"
          ><slot name="label" :item="item"><Label :value="item.label" /></slot
        ></span>
        <button
          type="button"
          :class="n('remove')"
          :disabled="disabled || item.closable === false"
          :aria-label="`${texts.selectionRemove.value} ${item.text ?? labelText(item)}`"
          @click="$emit('remove', item.key)"
        >
          ×
        </button>
      </span>
    </div>
    <div v-show="!mobile || !showSelected" :class="n('options')"><slot /></div>
  </div>
  <slot v-else />
</template>
<script setup lang="ts">
import { computed, inject, provide, ref, useId, watch, type VNodeChild } from 'vue'
import { createNamespace } from '../../utils/components'
import { useFieldTexts } from '../field-presentation/texts'
import { selectionEditorSurface, selectionListStyle, type SelectedOptionItem } from './context'
import { mobile } from './platform'

defineOptions({ name: createNamespace('selected-options').name })
const props = defineProps<{
  open?: boolean
  multiple?: boolean
  items: SelectedOptionItem[]
  disabled?: boolean
  limit?: number
}>()
defineEmits<{ remove: [key: string | number | symbol]; clear: [event: MouseEvent] }>()
const { n } = createNamespace('selected-options')
const texts = useFieldTexts()
const showSelected = ref(false)
const detailsId = useId()
watch(
  () => props.open,
  (open) => {
    if (open === false) {
      showSelected.value = false
    }
  },
)
const countText = computed(
  () =>
    texts.selectionCount.value.replace('{count}', String(props.items.length)) +
    (props.limit ? ` / ${props.limit}` : ''),
)
const removable = computed(() => props.items.some((item) => item.closable !== false))
const labelText = (item: SelectedOptionItem) =>
  typeof item.label === 'string' || typeof item.label === 'number' ? String(item.label) : String(item.key)
const Label = (labelProps: { value?: VNodeChild }) => labelProps.value
provide(selectionListStyle, !mobile || Boolean(inject(selectionEditorSurface, undefined)))
</script>
