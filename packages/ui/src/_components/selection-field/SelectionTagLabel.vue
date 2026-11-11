<template>
  <Tooltip
    v-model:open="open"
    :restore-focus="false"
    :content="text"
    :disabled="disabled || !truncated"
    :trigger="['hover', 'focus']"
    scroll-to-close
  >
    <span
      ref="labelRef"
      :class="classes(n('tag-label'), [truncated && !disabled, n('tag-label--truncated')])"
      :tabindex="truncated && !disabled ? 0 : undefined"
      :role="truncated && !disabled ? 'button' : undefined"
      @mouseenter="measure"
      @focus="showPreview"
      @pointercancel="open = false"
      @mousedown.stop
      @click.stop="showPreview"
      @keydown="handleKeydown"
      ><slot
    /></span>
  </Tooltip>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue'
import Tooltip from '../../tooltip'
import { createNamespace } from '../../utils/components'

defineOptions({ name: createNamespace('selection-tag-label').name })
const props = defineProps({ disabled: Boolean })
const { n, classes } = createNamespace('selection-field')
const labelRef = ref<HTMLElement>()
const truncated = ref(false)
const text = ref('')
const open = ref(false)
let resizeObserver: ResizeObserver | undefined
let contentObserver: MutationObserver | undefined

function measure() {
  const label = labelRef.value
  if (!label) {
    return
  }
  text.value = label.textContent ?? ''
  truncated.value = Boolean(text.value.trim()) && label.clientWidth > 0 && label.scrollWidth > label.clientWidth
  if (!truncated.value || props.disabled) {
    open.value = false
  }
}
function showPreview() {
  measure()
  // Tap only the text; removal remains a separate action. Pointer scrolling never opens a preview.
  open.value = truncated.value && !props.disabled
}
function handleKeydown(event: KeyboardEvent) {
  if (event.target !== event.currentTarget || !['Enter', ' '].includes(event.key)) {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  showPreview()
}
onMounted(() => {
  measure()
  if (typeof ResizeObserver !== 'undefined' && labelRef.value) {
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(labelRef.value)
  }
  if (typeof MutationObserver !== 'undefined' && labelRef.value) {
    contentObserver = new MutationObserver(measure)
    contentObserver.observe(labelRef.value, { childList: true, subtree: true, characterData: true })
  }
  window.addEventListener('resize', measure)
})
onUpdated(measure)
watch(() => props.disabled, measure)
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  contentObserver?.disconnect()
  window.removeEventListener('resize', measure)
})
</script>
