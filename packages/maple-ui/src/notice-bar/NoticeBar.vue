<template>
  <div
    v-show="visible"
    :class="classes(n(), n(`--${type}`), n('$--box'))"
    :style="rootStyle"
    role="status"
    :aria-live="scrollable ? 'off' : 'polite'"
  >
    <div :class="n('left')">
      <slot name="icon">
        <mp-registered-icon v-if="icon" :name="icon" :class="n('icon')" />
      </slot>
    </div>

    <div ref="contentRef" :class="n('content')">
      <div
        ref="textRef"
        :class="classes(n('text'), [scrollable, n('text--scroll')])"
        :style="textStyle"
        @animationiteration="handleAnimationIteration"
      >
        <slot>{{ text }}</slot>
      </div>
    </div>

    <div v-if="mode === 'closeable' || $slots.action" :class="n('right')">
      <slot name="action">
        <mp-icon
          v-if="mode === 'closeable'"
          role="button"
          tabindex="0"
          :class="n('close')"
          :aria-label="closeLabel"
          @click="handleClose"
          @keydown.enter.space.prevent="handleClose"
          ><MIconClose
        /></mp-icon>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch,
} from 'vue'
import { IconClose as MIconClose } from '@maple-design/icons-vue'
import { toNumber } from '@maple-design/shared'
import MpIcon from '../icon'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n, classes } = createNamespace('notice-bar')

export default defineComponent({
  name,
  components: {
    MIconClose,
    MpIcon,
    MpRegisteredIcon,
  },
  props,
  emits: ['close', 'replay'],
  setup(props, { emit }) {
    const { t: translate } = injectLocaleProvider()
    const closeLabel = computed(() => String(translate?.('common.close') ?? t('common.close') ?? 'Close'))
    const visible = ref(true)
    const contentRef = ref<HTMLElement | null>(null)
    const textRef = ref<HTMLElement | null>(null)
    const duration = ref(0)
    let resizeObserver: ResizeObserver | undefined

    const textStyle = computed(() => {
      if (!props.scrollable) {
        return undefined
      }
      const delay = toNumber(props.delay)
      return {
        animationDuration: `${duration.value}s`,
        animationDelay: `${Number.isFinite(delay) ? delay : 0}s`,
        animationPlayState: props.paused ? 'paused' : 'running',
      }
    })

    const rootStyle = computed(() => ({
      color: props.color,
      background: props.background,
    }))

    watch(
      () => [props.text, props.scrollable, props.speed],
      () => {
        nextTick(updateDuration)
      },
    )

    onMounted(() => {
      nextTick(updateDuration)
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(updateDuration)
        if (contentRef.value) {
          resizeObserver.observe(contentRef.value)
        }
        if (textRef.value) {
          resizeObserver.observe(textRef.value)
        }
      }
      window.addEventListener('resize', updateDuration)
    })
    onActivated(() => {
      nextTick(updateDuration)
    })
    onUpdated(updateDuration)
    onBeforeUnmount(() => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', updateDuration)
    })

    function updateDuration() {
      if (!props.scrollable || !contentRef.value || !textRef.value) {
        duration.value = 0
        return
      }
      const distance = textRef.value.offsetWidth
      const requestedSpeed = toNumber(props.speed)
      const speed = Number.isFinite(requestedSpeed) ? Math.max(requestedSpeed, 1) : 1
      duration.value = distance / speed
    }

    function handleClose(event: Event) {
      visible.value = false
      emit('close', event)
    }

    function handleAnimationIteration() {
      emit('replay')
    }

    return {
      visible,
      contentRef,
      textRef,
      textStyle,
      rootStyle,
      closeLabel,
      n,
      classes,
      handleClose,
      handleAnimationIteration,
    }
  },
})
</script>
