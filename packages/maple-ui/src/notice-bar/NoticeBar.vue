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
          :aria-label="'close'"
          @click="handleClose"
          @keydown.enter.space.prevent="handleClose"
          ><MIconClose
        /></mp-icon>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import { IconClose as MIconClose } from '@maplejs/icons-vue'
import { toNumber } from '@maplejs/maple-shared'
import MpIcon from '../icon'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
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
    const visible = ref(true)
    const contentRef = ref<HTMLElement | null>(null)
    const textRef = ref<HTMLElement | null>(null)
    const duration = ref(0)

    const textStyle = computed(() => {
      if (!props.scrollable) {
        return undefined
      }
      return {
        animationDuration: `${duration.value}s`,
        animationDelay: `${toNumber(props.delay)}s`,
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
    })

    function updateDuration() {
      if (!props.scrollable || !contentRef.value || !textRef.value) {
        duration.value = 0
        return
      }
      const distance = textRef.value.offsetWidth + contentRef.value.offsetWidth
      const speed = Math.max(toNumber(props.speed), 1)
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
      n,
      classes,
      handleClose,
      handleAnimationIteration,
    }
  },
})
</script>
