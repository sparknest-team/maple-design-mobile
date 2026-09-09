<template>
  <transition :name="n() + '-fade'">
    <span
      v-if="computedShow"
      v-bind="$attrs"
      :class="cls"
      :style="style"
      :role="checkable ? 'checkbox' : undefined"
      :aria-checked="checkable ? computedChecked : undefined"
      :tabindex="checkable ? 0 : undefined"
      @click="handleClick"
      @keydown.enter.prevent="handleKeyboardActivation"
      @keydown.space.prevent="handleKeyboardActivation"
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
        role="button"
        aria-label="IconClose"
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
import { computed, ref, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { IconClose, IconLoading, useTagPlatform } from './platform'
import { tagProps } from './props'
import { TAG_COLORS } from './types'

defineOptions({ name: createNamespace('tag').name, inheritAttrs: false })
const props = defineProps(tagProps)
const emit = defineEmits<{
  'update:show': [show: boolean]
  'update:checked': [checked: boolean]
  close: [event: MouseEvent]
  check: [checked: boolean, event: MouseEvent]
}>()
const { n, classes } = createNamespace('tag')
const { mergedSize, rtl } = useTagPlatform(props)
const isBuiltInColor = computed(() => props.color && TAG_COLORS.includes(props.color as any))
const isCustomColor = computed(() => props.color && !TAG_COLORS.includes(props.color as any))
const _show = ref(props.defaultShow)
const _checked = ref(props.defaultChecked)
const computedShow = computed(() => props.show ?? _show.value)
const computedChecked = computed(() => (props.checkable ? (props.checked ?? _checked.value) : true))

const handleClose = (ev: MouseEvent) => {
  if (props.loading) {
    return
  }
  _show.value = false
  emit('update:show', false)
  emit('close', ev)
}

const handleClick = (ev: MouseEvent) => {
  if (props.checkable && !props.loading) {
    const newChecked = !computedChecked.value
    _checked.value = newChecked
    emit('update:checked', newChecked)
    emit('check', newChecked, ev)
  }
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
    [rtl.value, n('--rtl')],
  )
})

const style = computed(() => {
  if (isCustomColor.value || props.textColor) {
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
  return undefined
})
</script>
