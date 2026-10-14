<template>
  <div
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
import { computed, getCurrentInstance, inject } from 'vue'
import { createNamespace } from '../utils/components'
import { carouselInjectionKey } from './context'
import { carouselItemProps } from './props'
import type { CarouselItemSlots } from './types'

defineOptions({ name: createNamespace('carousel-item').name })
defineProps(carouselItemProps)
defineSlots<CarouselItemSlots>()
const { n, classes } = createNamespace('carousel-item')
const context = inject(carouselInjectionKey, undefined)
const instance = getCurrentInstance()!
const index = computed(() => context?.keys.value.indexOf(instance.vnode.key!) ?? 0)
const current = computed(() => index.value === context?.current.value)
const visible = computed(() => !context || context.visible.value.includes(index.value))
const style = computed(() => context?.itemStyle(index.value))
</script>
