<template>
  <div v-show="show" :class="n()" :style="{ pointerEvents: isForbidClick ? 'auto' : 'none', zIndex }">
    <div
      :class="
        classes(
          n('wrapper'),
          n(`wrapper-${position}`),
          formatElevation(elevation, 4),
          [vertical, n('vertical')],
          [type && SNACKBAR_TYPE.includes(type), n(`wrapper-${type}`)],
        )
      "
      :style="{ zIndex }"
    >
      <div :class="[n('content'), contentClass]">
        <slot>{{ content }}</slot>
      </div>
      <div v-if="iconName || type === 'loading' || $slots.icon" :class="n('icon')">
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
      <div v-if="$slots.action" :class="n('action')">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type ComputedRef, type Ref } from 'vue'
import { call } from '@maplejs/maple-shared'
import { onSmartMounted } from '@maplejs/maple-use'
import { useLock } from '../context/lock'
import { useZIndex } from '../context/zIndex'
import MpIcon from '../icon'
import MpLoading from '../loading'
import { createNamespace, formatElevation } from '../utils/components'
import { SNACKBAR_TYPE, type SnackbarType } from './index'
import { props } from './props'

const { n, classes } = createNamespace('snackbar')

const ICON_TYPE_DICT: Record<SnackbarType, string> = {
  success: 'checkbox-marked-circle',
  warning: 'warning',
  info: 'information',
  error: 'error',
  loading: '',
}

export default defineComponent({
  name: 'MpSnackbarCore',
  components: {
    MpLoading,
    MpIcon,
  },
  props,
  setup(props) {
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

    const iconName: ComputedRef<string> = computed(() => (!props.type ? '' : ICON_TYPE_DICT[props.type]))

    function updateAfterDuration() {
      timer.value = setTimeout(() => {
        if (props.type !== 'loading') {
          call(props['onUpdate:show'], false)
        }
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
      SNACKBAR_TYPE,
      zIndex,
      iconName,
      isForbidClick,
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
@import './snackbar';
</style>
