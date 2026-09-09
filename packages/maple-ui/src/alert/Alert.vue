<template>
  <transition :name="transitionName" @after-leave="handleAfterLeave">
    <div
      v-if="visible"
      role="alert"
      :class="
        classes(
          n(),
          n(`--${status}`),
          n(`--${variant}`),
          [hasTitle(), n('--with-title')],
          [banner, n('--banner')],
          [center, n('--center')],
          formatElevation(elevation, 2),
        )
      "
      :style="rootStyle"
    >
      <div v-if="showIconNode()" :class="n('icon')">
        <slot name="icon">
          <icon-check-circle-fill v-if="status === 'success'" />
          <icon-exclamation-circle-fill v-else-if="status === 'warning'" />
          <icon-close-circle-fill v-else-if="status === 'danger'" />
          <icon-info-circle-fill v-else-if="status === 'info'" />
        </slot>
      </div>

      <div :class="n('body')">
        <div v-if="hasTitle()" :class="n('title')">
          <slot name="title">{{ title }}</slot>
        </div>
        <div :class="n('content')">
          <slot>{{ message }}</slot>
        </div>
      </div>

      <div v-if="$slots.action" :class="n('action')">
        <slot name="action" />
      </div>

      <div
        v-if="closable"
        tabindex="0"
        role="button"
        aria-label="Close"
        :class="n('close-btn')"
        @click="handleClose"
        @keydown.enter.prevent="handleKeyboardClose"
        @keydown.space.prevent="handleKeyboardClose"
      >
        <slot name="close-icon">
          <span>
            <icon-close />
          </span>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots, type CSSProperties } from 'vue'
import { createNamespace, formatElevation } from '../utils/components'
import {
  IconCheckCircleFill,
  IconClose,
  IconCloseCircleFill,
  IconExclamationCircleFill,
  IconInfoCircleFill,
  transitionName,
} from './platform'
import { alertProps } from './props'

defineOptions({
  name: createNamespace('alert').name,
})

const { n, classes } = createNamespace('alert')
const props = defineProps(alertProps)
const emit = defineEmits<{
  (event: 'close', value: MouseEvent): void
  (event: 'closed'): void
}>()
const slots = useSlots()

const visible = ref(true)

const hasTitle = () => Boolean(props.title || slots.title)

const showIconNode = () => {
  if (!props.showIcon) {
    return false
  }
  if (slots.icon) {
    return true
  }
  return props.status !== 'default'
}

const rootStyle = computed<CSSProperties>(() => {
  return props.color ? { backgroundColor: props.color } : {}
})

function handleClose(e: MouseEvent) {
  if (!visible.value) {
    return
  }
  visible.value = false
  emit('close', e)
}

function handleKeyboardClose(event: KeyboardEvent) {
  ;(event.currentTarget as HTMLElement).click()
}

function handleAfterLeave() {
  emit('closed')
}
</script>
