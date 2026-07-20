<template>
  <teleport to="body" :disabled="!teleport || disabled">
    <div
      ref="backTopEl"
      :class="classes(n(), [show, n('--active')], [!teleport, n('--inline')])"
      :style="{
        right: toSizeUnit(right),
        bottom: toSizeUnit(bottom),
      }"
      v-bind="$attrs"
      @click.stop="handleClick"
    >
      <slot>
        <mp-button :elevation="elevation" status="primary" mp-back-top-cover>
          <mp-icon name="chevron-up" />
        </mp-button>
      </slot>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, onMounted, ref, type TeleportProps } from 'vue'
import { call, getScrollLeft, getScrollTop } from '@maplejs/maple-shared'
import { onSmartUnmounted } from '@maplejs/maple-use'
import MpButton from '../button'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import { getParentScroller, getTarget, scrollTo, toPxNum, toSizeUnit } from '../utils/elements'
import { easeInOutCubic } from '../utils/shared'
import { throttleByRaf } from '../utils/throttle-by-raf'
import { props } from './props'

const { name, n, classes } = createNamespace('back-top')

export default defineComponent({
  name,
  components: {
    MpButton,
    MpIcon,
  },
  inheritAttrs: false,
  props,
  setup(props) {
    const show = ref(false)
    const backTopEl = ref<HTMLElement | null>(null)
    const disabled = ref<TeleportProps['disabled']>(true)

    let scroller: HTMLElement | Window

    const teleport = computed(() => props.teleport)

    const handleScroll = throttleByRaf(() => {
      setBackTopVisibility()
    })

    onMounted(() => {
      setScroller()
      addScrollerEventListener()
      setBackTopVisibility()
      if (props.teleport) {
        disabled.value = false
      }
    })

    onActivated(addScrollerEventListener)
    onSmartUnmounted(removeScrollerEventListener)

    function setBackTopVisibility() {
      show.value = getScrollTop(scroller) >= toPxNum(props.visibilityHeight)
    }

    function handleClick(event: Event) {
      call(props.onClick, event)

      const left = getScrollLeft(scroller)

      scrollTo(scroller, {
        left,
        duration: props.duration,
        animation: easeInOutCubic,
      })
    }

    function setScroller() {
      scroller = props.target ? getTarget(props.target, 'BackTop') : getParentScroller(backTopEl.value!)
    }

    function addScrollerEventListener() {
      scroller.addEventListener('scroll', handleScroll)
    }

    function removeScrollerEventListener() {
      if (!scroller) {
        // may be null in nuxt
        return
      }

      handleScroll.cancel()
      scroller.removeEventListener('scroll', handleScroll)
    }

    return {
      teleport,
      disabled,
      show,
      backTopEl,
      toSizeUnit,
      n,
      classes,
      handleClick,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../button/button';
@import '../icon/icon';
@import './backTop';
</style>
