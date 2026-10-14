<template>
  <span ref="iconEl" :class="cls" :style="innerStyle" @click="emit('click', $event)">
    <slot v-if="$slots.default" />
    <component :is="iconComponent" v-else-if="iconComponent" />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, getCurrentInstance, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
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
const iconEl = ref<HTMLElement | null>(null)
const transitionDuration = computed(() => {
  const duration = Number(props.transition)
  return Number.isFinite(duration) ? Math.max(0, duration) : 0
})
let active = true
let disposed = false
let timer: ReturnType<typeof setTimeout> | undefined
let timerGeneration = 0
let motionGeneration = 0
let stopMotionObserver: (() => void) | undefined
function cancelTransition() {
  timerGeneration += 1
  clearTimeout(timer)
  timer = undefined
  animateInProgress.value = false
}
function detachMotionObserver() {
  motionGeneration += 1
  stopMotionObserver?.()
  stopMotionObserver = undefined
}
function bindMotionObserver() {
  detachMotionObserver()
  const view = iconEl.value?.ownerDocument.defaultView
  if (typeof view?.matchMedia !== 'function') {
    reducedMotion.value = false
    return
  }
  const generation = motionGeneration
  const media = view.matchMedia('(prefers-reduced-motion: reduce)')
  const update = () => {
    if (disposed || !active || generation !== motionGeneration) {
      return
    }
    reducedMotion.value = media.matches
  }
  update()
  media.addEventListener?.('change', update)
  stopMotionObserver = () => media.removeEventListener?.('change', update)
}
onMounted(bindMotionObserver)
onDeactivated(() => {
  active = false
  cancelTransition()
  detachMotionObserver()
  nextName.value = props.name
})
onActivated(() => {
  if (active || disposed) {
    return
  }
  active = true
  nextName.value = props.name
  bindMotionObserver()
})
onBeforeUnmount(() => {
  disposed = true
  active = false
  cancelTransition()
  detachMotionObserver()
})

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
  styles.transitionDuration = `${transitionDuration.value}ms`
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
  [() => props.name, reducedMotion, transitionDuration],
  ([newName, reduce], [oldName], onCleanup) => {
    cancelTransition()
    if (disposed) {
      return
    }
    const duration = transitionDuration.value
    if (!active || reduce || newName === oldName || oldName == null || duration === 0) {
      nextName.value = newName
      return
    }
    animateInProgress.value = true
    const generation = timerGeneration
    timer = setTimeout(() => {
      if (disposed || !active || generation !== timerGeneration) {
        return
      }
      timerGeneration += 1
      timer = undefined
      nextName.value = newName
      animateInProgress.value = false
    }, duration)
    onCleanup(cancelTransition)
  },
  { immediate: true },
)
</script>
