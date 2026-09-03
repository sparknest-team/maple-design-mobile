<template>
  <div v-show="open" :class="n()" :style="{ pointerEvents: isForbidClick ? 'auto' : 'none', zIndex }">
    <div
      :class="
        classes(
          n('wrapper'),
          n(`wrapper-${position}`),
          formatElevation(elevation, 4),
          [vertical, n('vertical')],
          [type && MESSAGE_TYPE.includes(type), n(`wrapper-${type}`)],
          [closable, n('wrapper--closable')],
        )
      "
      :style="{ zIndex }"
    >
      <div v-if="showIconSlot" :class="n('icon')">
        <mp-icon v-if="type && type !== 'loading' && type !== 'normal'">
          <MIconCheckboxMarkedCircle v-if="type === 'success'" />
          <MIconWarning v-else-if="type === 'warning'" />
          <MIconInformation v-else-if="type === 'info'" />
          <MIconError v-else />
        </mp-icon>
        <mp-loading
          v-if="type === 'loading'"
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
        <mp-button v-if="closable" :class="n('close')" text round :elevation="false" size="sm" @click="handleClose">
          <mp-icon :size="18"><MIconWindowClose /></mp-icon>
        </mp-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useSlots, watch, type ComputedRef, type Ref } from 'vue'
import {
  IconCheckboxMarkedCircle as MIconCheckboxMarkedCircle,
  IconError as MIconError,
  IconInformation as MIconInformation,
  IconWarning as MIconWarning,
  IconWindowClose as MIconWindowClose,
} from '@maplejs/icons-vue'
import { call } from '@maplejs/maple-shared'
import { onSmartMounted } from '@maplejs/maple-use'
import MpButton from '../button'
import { useLock } from '../context/lock'
import { useZIndex } from '../context/zIndex'
import MpIcon from '../icon'
import MpLoading from '../loading'
import { createNamespace, formatElevation } from '../utils/components'
import { MESSAGE_TYPE } from './index'
import { props } from './props'

const { n, classes } = createNamespace('message')

export default defineComponent({
  name: createNamespace('message-core').name,
  components: {
    MIconCheckboxMarkedCircle,
    MIconWarning,
    MIconInformation,
    MIconError,
    MIconWindowClose,
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
      const { type, forbidClick } = props
      return type === 'loading' || forbidClick
    })

    const showIconSlot = computed(() => {
      if (!props.showIcon) {
        return false
      }

      if (props.type === 'normal' && !slots.icon) {
        return false
      }

      return Boolean((props.type && props.type !== 'normal') || slots.icon)
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
      MESSAGE_TYPE,
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
