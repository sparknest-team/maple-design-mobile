<template>
  <teleport :to="popupTarget" :disabled="!teleport || disabled">
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
          <MIconChevronUp />
        </mp-button>
      </slot>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, onMounted, ref, type TeleportProps } from 'vue'
import { IconChevronUp as MIconChevronUp } from '@maplejs/icons-vue'
import { call, getScrollLeft, getScrollTop } from '@maplejs/maple-shared'
import { onSmartUnmounted } from '@maplejs/maple-use'
import MpButton from '../button'
import { createNamespace } from '../utils/components'
import { getParentScroller, getTarget, scrollTo, toPxNum, toSizeUnit } from '../utils/elements'
import { usePopupContainer } from '../utils/popup-container'
import { easeInOutCubic } from '../utils/shared'
import { throttleByRaf } from '../utils/throttle-by-raf'
import { props } from './props'

const { name, n, classes } = createNamespace('back-top')

export default defineComponent({
  name,
  components: {
    MIconChevronUp,
    MpButton,
  },
  inheritAttrs: false,
  props,
  emits: ['click'],
  setup(props, { emit }) {
    const show = ref(false)
    const backTopEl = ref<HTMLElement | null>(null)
    const disabled = ref<TeleportProps['disabled']>(true)

    let scroller: HTMLElement | Window

    const teleport = computed(() => props.popupContainer !== false)
    const popupTarget = usePopupContainer(() => props.popupContainer)

    const handleScroll = throttleByRaf(() => {
      setBackTopVisibility()
    })

    onMounted(() => {
      setScroller()
      addScrollerEventListener()
      setBackTopVisibility()
      disabled.value = false
    })

    onActivated(addScrollerEventListener)
    onSmartUnmounted(removeScrollerEventListener)

    function setBackTopVisibility() {
      show.value = getScrollTop(scroller) >= toPxNum(props.visibleHeight)
    }

    function handleClick(event: Event) {
      emit('click', event)

      const left = getScrollLeft(scroller)

      scrollTo(scroller, {
        left,
        duration: props.duration,
        animation: easeInOutCubic,
      })
    }

    function setScroller() {
      scroller = props.targetContainer
        ? getTarget(props.targetContainer, 'BackTop')
        : getParentScroller(backTopEl.value!)
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
      popupTarget,
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
