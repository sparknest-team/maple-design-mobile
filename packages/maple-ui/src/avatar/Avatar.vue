<template>
  <div
    ref="avatarElement"
    :class="
      classes(
        n(),
        n('$--box'),
        n(`--${mergedShape}`),
        [bordered, n('--bordered')],
        [hoverable, n('--hoverable')],
        [hasTriggerIcon, n('--with-trigger')],
      )
    "
    :style="outerStyle"
    @click="handleClick"
  >
    <span ref="contentElement" :class="n(imageUrl ? 'image' : 'text')" :style="contentStyle">
      <template v-if="imageUrl">
        <slot v-if="hasError" name="error">
          <img v-if="error" :src="error" role="img" :alt="alt" :style="imageStyle" />
          <MIconCloseCircleFill v-else />
        </slot>
        <template v-else>
          <img
            v-if="lazy"
            v-lazy="imageUrl"
            role="img"
            :alt="alt"
            :style="imageStyle"
            :lazy-loading="loading"
            :lazy-error="error"
            @load="handleLoad"
          />
          <img
            v-else
            v-show="isLoaded"
            role="img"
            :src="imageUrl"
            :alt="alt"
            :style="imageStyle"
            @load="handleLoad"
            @error="handleError"
          />
          <template v-if="!lazy && !isLoaded">
            <img v-if="loading" :src="loading" role="img" :alt="alt" :style="imageStyle" />
            <slot v-else><MIconLoading /></slot>
          </template>
        </template>
      </template>
      <slot v-else />
    </span>

    <span v-if="hasTriggerIcon" :class="n(`trigger-icon-${triggerType}`)" :style="triggerIconStyle">
      <slot name="trigger-icon" />
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, nextTick, onMounted, onUpdated, ref, type CSSProperties } from 'vue'
import { IconCloseCircleFill as MIconCloseCircleFill, IconLoading as MIconLoading } from '@maplejs/icons-vue'
import Lazy, { type LazyHTMLElement } from '../lazy'
import { createNamespace } from '../utils/components'
import { avatarGroupInjectionKey } from './context'
import { props } from './props'

const { name, n, classes } = createNamespace('avatar')

export default defineComponent({
  name,
  components: { MIconCloseCircleFill, MIconLoading },
  directives: { Lazy },
  props,
  emits: {
    click: (_event: MouseEvent) => true,
    load: () => true,
    error: () => true,
  },
  setup(props, { emit, slots }) {
    const group = inject(avatarGroupInjectionKey, undefined)
    const avatarElement = ref<HTMLElement | null>(null)
    const contentElement = ref<HTMLElement | null>(null)
    const scale = ref(1)
    const isLoaded = ref(false)
    const hasError = ref(false)

    const mergedShape = computed(() => group?.shape.value ?? props.shape)
    const mergedSize = computed(() => group?.size.value ?? props.size)
    const mergedAutoFixFontSize = computed(() => group?.autoFixFontSize.value ?? props.autoFixFontSize)
    const hasTriggerIcon = computed(() => Boolean(slots['trigger-icon']))
    const outerStyle = computed<CSSProperties>(() => {
      const style: CSSProperties =
        mergedSize.value == null
          ? {}
          : {
              width: `${mergedSize.value}px`,
              height: `${mergedSize.value}px`,
              fontSize: `${mergedSize.value / 2}px`,
            }
      if (props.color) {
        style.backgroundColor = props.color
      }
      if (props.borderColor) {
        style.borderColor = props.borderColor
      }
      return style
    })
    const imageStyle = computed<CSSProperties>(() => ({ objectFit: props.objectFit }))
    const contentStyle = computed<CSSProperties>(() => (props.imageUrl ? {} : { transform: `scale(${scale.value})` }))

    function updateScale() {
      if (!mergedAutoFixFontSize.value || props.imageUrl) {
        return
      }
      nextTick(() => {
        const avatarWidth = avatarElement.value?.offsetWidth ?? 0
        const contentWidth = contentElement.value?.scrollWidth ?? 0
        scale.value = avatarWidth && contentWidth > avatarWidth ? avatarWidth / (contentWidth + 8) : 1
      })
    }

    function handleClick(event: MouseEvent) {
      emit('click', event)
    }

    function handleLoad(event: Event) {
      if (props.lazy) {
        const el = event.currentTarget as LazyHTMLElement
        if (el._lazy?.state === 'success') {
          isLoaded.value = true
          hasError.value = false
          emit('load')
        }
        if (el._lazy?.state === 'error') {
          hasError.value = true
          emit('error')
        }
        return
      }

      isLoaded.value = true
      hasError.value = false
      emit('load')
    }

    function handleError() {
      hasError.value = true
      emit('error')
    }

    onMounted(updateScale)
    onUpdated(updateScale)

    return {
      n,
      classes,
      avatarElement,
      contentElement,
      mergedShape,
      outerStyle,
      contentStyle,
      imageStyle,
      isLoaded,
      hasError,
      hasTriggerIcon,
      handleClick,
      handleLoad,
      handleError,
    }
  },
})
</script>
