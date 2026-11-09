<template>
  <Teleport :to="popupTarget" :disabled="popupContainer === false">
    <Transition :name="`${n()}-fade`" appear @after-enter="emit('opened')" @after-leave="emit('closed')">
      <div
        v-if="open"
        v-bind="themeScope"
        :dir="readingDirection"
        :class="[n(), { [n('standalone')]: popupContainer !== false }, n(`standalone-${position}`)]"
        @mouseenter="pause"
        @mouseleave="resume"
      >
        <div
          v-bind="regionAttrs()"
          role="alert"
          :class="[
            n('wrapper'),
            n(`--variant-${variant}`),
            n(`wrapper-${status}`),
            { [n('wrapper--closable')]: closable },
          ]"
        >
          <span v-if="showIcon && (status !== 'default' || $slots.icon || icon)" :class="n('icon')">
            <slot name="icon">
              <dynamic-content v-if="icon" :value="icon" />
              <m-icon-info-circle-fill v-else-if="status === 'info'" />
              <m-icon-checkbox-marked-circle-fill v-else-if="status === 'success'" />
              <m-icon-warning v-else-if="status === 'warning'" />
              <m-icon-error v-else-if="status === 'danger'" />
              <m-icon-loading v-else-if="status === 'loading'" />
            </slot>
          </span>
          <span :class="n('content')"
            ><slot><dynamic-content :value="content" /></slot
          ></span>
          <span v-if="$slots.action || action" :class="n('action')"
            ><slot name="action"><dynamic-content :value="action" /></slot
          ></span>
          <button
            v-if="closable"
            type="button"
            :aria-label="closeButtonAriaLabel"
            :class="n('close')"
            @click="requestClose"
          >
            <m-icon-close />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, useAttrs, watch, type PropType } from 'vue'
import {
  IconCheckboxMarkedCircleFill as MIconCheckboxMarkedCircleFill,
  IconClose as MIconClose,
  IconError as MIconError,
  IconInfoCircleFill as MIconInfoCircleFill,
  IconLoading as MIconLoading,
  IconWarning as MIconWarning,
} from '@maple-design/icons-vue'
import { useDirection } from '../_utils/direction'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace } from '../utils/components'
import { usePopupContainer } from '../utils/popup-container'
import { messageProps } from './props'
import type { MessageContent } from './types'
import { useMessageTimer } from './use-message-timer'

const themeScope = useThemeScope()

const { n } = createNamespace('message')
defineOptions({ name: createNamespace('message').name, inheritAttrs: false })
const DynamicContent = defineComponent({
  props: { value: [String, Number, Boolean, Object, Array, Function] as PropType<MessageContent> },
  setup: (props) => () => (typeof props.value === 'function' ? props.value() : props.value),
})
const props = defineProps(messageProps)
const attrs = useAttrs()
const regionAttrs = () => Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'dir'))
const { dir: readingDirection } = useDirection(undefined, () => attrs.dir)
const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'open' | 'opened' | 'close' | 'closed'): void
}>()
const popupTarget = usePopupContainer(() => props.popupContainer)
const requestClose = () => emit('update:open', false)
const { pause, resume, restart } = useMessageTimer({
  open: () => props.open,
  duration: () => props.duration,
  pauseOnHover: () => props.pauseOnHover,
  resetOnUpdate: () => props.resetOnUpdate,
  close: requestClose,
})
defineExpose({ restartTimer: restart })

onMounted(() => {
  if (props.open) {
    emit('open')
  }
})
watch(
  () => props.open,
  (open, previous) => {
    if (open && !previous) {
      emit('open')
    } else if (!open && previous) {
      emit('close')
    }
  },
)
watch(() => [props.content, props.icon, props.action, props.status, props.duration], restart)
</script>
