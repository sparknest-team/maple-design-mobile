<template>
  <span :class="cls" :style="innerStyle" @click="emit('click', $event)">
    <slot v-if="$slots.default" />
    <component :is="iconComponent" v-else-if="iconComponent" />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { registeredPrefix, spinClass } from './platform'
import { iconProps } from './props'

defineOptions({
  name: createNamespace('icon').name,
})

const props = defineProps(iconProps)
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const instance = getCurrentInstance()
const prefixCls = createNamespace('icon').n()
const nextName = ref<string>()
const animateInProgress = ref(false)
const reducedMotion = ref(false)
let stopMotionObserver: (() => void) | undefined
onMounted(() => {
  if (typeof window.matchMedia !== 'function') {
    return
  }
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  const update = () => {
    reducedMotion.value = media.matches
  }
  update()
  media.addEventListener?.('change', update)
  stopMotionObserver = () => media.removeEventListener?.('change', update)
})
onBeforeUnmount(() => stopMotionObserver?.())

const iconComponent = computed(() => {
  if (!nextName.value) {
    return undefined
  }
  const componentName = `Icon${nextName.value
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('')}`
  const components = instance?.appContext.components
  return components?.[componentName] ?? components?.[`${registeredPrefix}${componentName}`]
})

const innerStyle = computed(() => {
  const styles: CSSProperties = {}
  if (props.size != null) {
    styles.fontSize = toSizeUnit(props.size)
  }
  if (props.rotate) {
    styles.rotate = `${props.rotate}deg`
  }
  if (props.color) {
    styles.color = props.color
  }
  styles.transitionDuration = `${Number(props.transition) || 0}ms`
  return styles
})

const cls = computed(() => [
  prefixCls,
  {
    [spinClass]: props.spin,
    [props.animationClass ?? `${prefixCls}--shrinking`]: animateInProgress.value,
  },
])

watch(
  [() => props.name, reducedMotion],
  ([newName, reduce], [oldName], onCleanup) => {
    animateInProgress.value = false
    const duration = Math.max(0, Number(props.transition) || 0)
    if (reduce || newName === oldName || oldName == null || !Number.isFinite(duration) || duration === 0) {
      nextName.value = newName
      return
    }
    animateInProgress.value = true
    const timer = setTimeout(() => {
      nextName.value = newName
      animateInProgress.value = false
    }, duration)
    onCleanup(() => clearTimeout(timer))
  },
  { immediate: true },
)
</script>
