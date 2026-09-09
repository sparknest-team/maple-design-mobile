<template>
  <div v-show="open" :class="n()" :style="{ pointerEvents: isForbidClick ? 'auto' : 'none', zIndex }">
    <div
      :class="
        classes(
          n('wrapper'),
          n(`wrapper-${position}`),
          formatElevation(elevation, 4),
          [vertical, n('vertical')],
          [status && MESSAGE_STATUSES.includes(status), n(`wrapper-${status}`)],
          [closable, n('wrapper--closable')],
        )
      "
      :style="{ zIndex }"
    >
      <div v-if="showIconSlot" :class="n('icon')">
        <mp-icon v-if="status && status !== 'loading' && status !== 'default'">
          <MIconCheckboxMarkedCircleFill v-if="status === 'success'" />
          <MIconWarning v-else-if="status === 'warning'" />
          <MIconInfoCircleFill v-else-if="status === 'info'" />
          <MIconError v-else />
        </mp-icon>
        <mp-loading
          v-if="status === 'loading'"
          :type="loadingType"
          :size="loadingSize"
          :color="loadingColor"
          :radius="loadingRadius"
        />
        <slot name="icon" />
      </div>
      <div :class="[n('content'), contentClass]">
        <slot>{{ content }}</slot>
      </div>
      <div v-if="$slots.action || closable" :class="n('action')">
        <slot name="action" />
        <mp-button
          v-if="closable"
          :class="n('close')"
          variant="text"
          round
          :elevation="false"
          size="sm"
          @click="handleClose"
        >
          <mp-icon :size="18"><MIconClose /></mp-icon>
        </mp-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useSlots, watch, type ComputedRef, type Ref } from 'vue'
import {
  IconCheckboxMarkedCircleFill as MIconCheckboxMarkedCircleFill,
  IconClose as MIconClose,
  IconError as MIconError,
  IconInfoCircleFill as MIconInfoCircleFill,
  IconWarning as MIconWarning,
} from '@maplejs/icons-vue'
import { call } from '@maplejs/maple-shared'
import { onSmartMounted } from '@maplejs/maple-use'
import MpButton from '../button'
import { useLock } from '../context/lock'
import { useZIndex } from '../context/zIndex'
import MpIcon from '../icon'
import MpLoading from '../loading'
import { createNamespace, formatElevation } from '../utils/components'
import { MESSAGE_STATUSES } from './index'
import { props } from './props'

const { n, classes } = createNamespace('message')

export default defineComponent({
  name: createNamespace('message-core').name,
  components: {
    MIconCheckboxMarkedCircleFill,
    MIconWarning,
    MIconInfoCircleFill,
    MIconError,
    MIconClose,
    MpLoading,
    MpIcon,
    MpButton,
  },
  props,
  emits: ['update:open', 'open', 'close'],
  setup(props, { emit }) {
    const slots = useSlots()
    const timer: Ref = ref(null)
    const { zIndex } = useZIndex(() => props.open, 1)

    useLock(
      () => props.open,
      () => props.lockScroll,
    )

    const isForbidClick: ComputedRef<boolean> = computed(() => {
      const { status, forbidClick } = props
      return status === 'loading' || forbidClick
    })

    const showIconSlot = computed(() => {
      if (!props.showIcon) {
        return false
      }

      if (props.status === 'default' && !slots.icon) {
        return false
      }

      return Boolean((props.status && props.status !== 'default') || slots.icon)
    })

    function handleClose() {
      emit('update:open', false)
    }

    function updateAfterDuration() {
      clearTimeout(timer.value)

      if (!(props.duration > 0)) {
        return
      }

      timer.value = setTimeout(() => {
        emit('update:open', false)
      }, props.duration)
    }

    watch(
      () => props.open,
      (show) => {
        if (show) {
          emit('open')
          updateAfterDuration()
        } else {
          clearTimeout(timer.value)
          emit('close')
        }
      },
    )

    watch(
      () => props._update,
      () => {
        clearTimeout(timer.value)
        updateAfterDuration()
      },
    )

    onSmartMounted(() => {
      if (props.open) {
        emit('open')
        updateAfterDuration()
      }
    })

    return {
      MESSAGE_STATUSES,
      zIndex,
      showIconSlot,
      isForbidClick,
      handleClose,
      n,
      classes,
      formatElevation,
    }
  },
})
</script>
