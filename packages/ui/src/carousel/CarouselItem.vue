<template>
  <div
    ref="element"
    :class="classes(n(), [current, n('--active')])"
    :style="style"
    role="group"
    aria-roledescription="slide"
    :aria-label="context?.slideLabel(index)"
    :aria-hidden="!visible"
    :inert="!visible || undefined"
    tabindex="-1"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, inject, onBeforeUnmount, ref, watch } from 'vue'
import { createNamespace } from '../utils/components'
import { carouselInjectionKey } from './context'
import { carouselItemProps } from './props'
import type { CarouselItemSlots } from './types'

defineOptions({ name: createNamespace('carousel-item').name })
defineProps(carouselItemProps)
defineSlots<CarouselItemSlots>()
const { n, classes } = createNamespace('carousel-item')
const context = inject(carouselInjectionKey, undefined)
const element = ref<HTMLElement>()
const instance = getCurrentInstance()!
const index = computed(() => context?.keys.value.indexOf(instance.vnode.key!) ?? 0)
const current = computed(() => index.value === context?.current.value)
const visible = computed(() => !context || context.visible.value.includes(index.value))
const style = computed(() => context?.itemStyle(index.value))
watch(
  visible,
  (isVisible) => {
    if (!isVisible) {
      context?.focusIfHidden(element.value)
    }
  },
  { flush: 'sync' },
)
onBeforeUnmount(() => context?.focusIfHidden(element.value))
</script>
