<template>
  <transition :name="n() + '-fade'">
    <span
      v-if="computedShow"
      ref="rootRef"
      v-bind="$attrs"
      :class="cls"
      :style="style"
      :role="checkable ? 'checkbox' : undefined"
      :aria-checked="checkable ? computedChecked : undefined"
      :aria-disabled="checkable && loading ? true : undefined"
      :aria-busy="loading ? true : undefined"
      :tabindex="checkable ? 0 : loading ? -1 : undefined"
      @click="handleClick"
      @keydown.enter="handleRootKeyboardActivation"
      @keydown.space="handleRootKeyboardActivation"
    >
      <span v-if="$slots.icon" :class="classes(n('icon'))">
        <slot name="icon" />
      </span>
      <span v-if="nowrap" :class="classes(n('text'))">
        <slot />
      </span>
      <slot v-else />
      <span
        v-if="closable && !loading"
        ref="closeRef"
        role="button"
        :aria-label="closeButtonAriaLabel ?? closeLabel"
        tabindex="0"
        :class="classes(n('close-btn'))"
        @click.stop="handleClose"
        @keydown.enter.prevent.stop="handleKeyboardActivation"
        @keydown.space.prevent.stop="handleKeyboardActivation"
      >
        <slot name="close-icon">
          <icon-close />
        </slot>
      </span>
      <span v-if="loading" :class="classes(n('loading-icon'))">
        <icon-loading />
      </span>
    </span>
  </transition>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { IconClose, IconLoading, useTagCloseLabel, useTagPlatform } from './platform'
import { tagProps } from './props'
import { TAG_COLORS, type TagEmits, type TagSlots } from './types'

defineOptions({ name: createNamespace('tag').name, inheritAttrs: false })
const props = defineProps(tagProps)
const emit = defineEmits<TagEmits>()
defineSlots<TagSlots>()
const { n, classes } = createNamespace('tag')
const { mergedSize } = useTagPlatform(props)
const closeLabel = useTagCloseLabel()
const isBuiltInColor = computed(() => props.color && TAG_COLORS.includes(props.color as any))
const isCustomColor = computed(() => props.color && !TAG_COLORS.includes(props.color as any))
const _show = ref(props.defaultShow)
const _checked = ref(props.defaultValue)
const computedShow = computed(() => props.show ?? _show.value)
const computedChecked = computed(() => (props.checkable ? (props.modelValue ?? _checked.value) : true))

const rootRef = ref<HTMLElement>()
const closeRef = ref<HTMLElement>()
watch(
  () => props.loading,
  async (loading) => {
    const close = closeRef.value
    const doc = close?.ownerDocument
    if (!loading || !close || !doc || !close.contains(doc.activeElement)) {
      return
    }
    await nextTick()
    if (props.loading && rootRef.value?.isConnected && (!doc.activeElement || doc.activeElement === doc.body)) {
      rootRef.value.focus()
    }
  },
)

const handleClose = (ev: MouseEvent) => {
  if (props.loading) {
    return
  }
  _show.value = false
  emit('update:show', false)
  emit('close', ev)
}

const handleClick = (ev: MouseEvent) => {
  const target = ev.target as Element | null
  const interactive = target?.closest?.(
    'a[href], button, input, select, textarea, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"], [role="checkbox"], [role="switch"]',
  )
  if (interactive && interactive !== ev.currentTarget) {
    return
  }
  if (props.checkable && !props.loading) {
    const newChecked = !computedChecked.value
    _checked.value = newChecked
    emit('update:modelValue', newChecked)
    emit('check', newChecked, ev)
  }
}

const handleRootKeyboardActivation = (ev: KeyboardEvent) => {
  if (!props.checkable || props.loading || ev.target !== ev.currentTarget) {
    return
  }
  ev.preventDefault()
  ;(ev.currentTarget as HTMLElement).click()
}

const handleKeyboardActivation = (ev: KeyboardEvent) => {
  ;(ev.currentTarget as HTMLElement).click()
}

const cls = computed(() => {
  return classes(
    n(),
    n(`--size-${mergedSize.value}`),
    n(`--variant-${props.variant}`),
    [props.status && !isBuiltInColor.value && !isCustomColor.value, n(`--status-${props.status}`)],
    [props.loading, n('--loading')],
    [!computedShow.value, n('--hide')],
    [isBuiltInColor.value, n(`--${props.color}`)],
    [props.checkable, n('--checkable')],
    [computedChecked.value, n('--checked')],
    [props.nowrap, n('--nowrap')],
    [props.round, n('--round')],
    [isCustomColor.value, n('--custom-color')],
  )
})

const style = computed(() => {
  if (isCustomColor.value) {
    if (props.variant === 'outline') {
      return {
        color: props.textColor || props.color,
        borderColor: props.color,
        backgroundColor: 'transparent',
      } as CSSProperties
    }
    return {
      background: props.color,
      color: props.textColor,
      borderColor: props.color,
    } as CSSProperties
  }
  return props.textColor ? { color: props.textColor } : undefined
})
</script>
