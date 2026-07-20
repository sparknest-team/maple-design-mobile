<template>
  <div v-show="show" :class="n()" :style="{ pointerEvents: isForbidClick ? 'auto' : 'none', zIndex }">
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
        <mp-icon v-if="iconName" :name="iconName" />
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
        <mp-button v-if="closable" :class="n('close')" text round :elevation="false" size="small" @click="handleClose">
          <mp-icon name="close" :size="18" />
        </mp-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useSlots, watch, type ComputedRef, type Ref } from 'vue'
import { call } from '@maplejs/maple-shared'
import { onSmartMounted } from '@maplejs/maple-use'
import MpButton from '../button'
import { useLock } from '../context/lock'
import { useZIndex } from '../context/zIndex'
import MpIcon from '../icon'
import MpLoading from '../loading'
import { createNamespace, formatElevation } from '../utils/components'
import { MESSAGE_TYPE, type MessageType } from './index'
import { props } from './props'

const { n, classes } = createNamespace('message')

const ICON_TYPE_DICT: Partial<Record<MessageType, string>> = {
  success: 'checkbox-marked-circle',
  warning: 'warning',
  info: 'information',
  error: 'error',
  loading: '',
  normal: '',
}

export default defineComponent({
  name: 'MpMessageCore',
  components: {
    MpLoading,
    MpIcon,
    MpButton,
  },
  props,
  setup(props) {
    const slots = useSlots()
    const timer: Ref = ref(null)
    const { zIndex } = useZIndex(() => props.show, 1)

    useLock(
      () => props.show,
      () => props.lockScroll,
    )

    const isForbidClick: ComputedRef<boolean> = computed(() => {
      const { type, forbidClick } = props
      return type === 'loading' || forbidClick
    })

    const iconName: ComputedRef<string> = computed(() => {
      if (!props.type || !props.showIcon) {
        return ''
      }

      return ICON_TYPE_DICT[props.type] ?? ''
    })

    const showIconSlot = computed(() => {
      if (!props.showIcon) {
        return false
      }

      if (props.type === 'normal' && !slots.icon) {
        return false
      }

      return Boolean(iconName.value || props.type === 'loading' || slots.icon)
    })

    function handleClose() {
      call(props['onUpdate:show'], false)
    }

    function updateAfterDuration() {
      clearTimeout(timer.value)

      if (!(props.duration > 0)) {
        return
      }

      timer.value = setTimeout(() => {
        call(props['onUpdate:show'], false)
      }, props.duration)
    }

    watch(
      () => props.show,
      (show) => {
        if (show) {
          call(props.onOpen)
          updateAfterDuration()
        } else {
          clearTimeout(timer.value)
          call(props.onClose)
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
      if (props.show) {
        call(props.onOpen)
        updateAfterDuration()
      }
    })

    return {
      MESSAGE_TYPE,
      zIndex,
      iconName,
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

<style lang="less">
@import '../styles/common';
@import '../styles/elevation';
@import '../loading/loading';
@import '../icon/icon';
@import '../button/button';
@import './message';
</style>
