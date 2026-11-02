<template>
  <button
    type="button"
    role="switch"
    :class="
      classes(
        n(),
        n('--variant-' + variant),
        n('--size-' + platform.size.value),
        [checked, n('--checked')],
        [busy, n('--loading')],
        [platform.disabled.value, n('--disabled')],
        [platform.error.value, n('--error')],
      )
    "
    :style="style"
    :aria-checked="checked"
    :aria-busy="busy || undefined"
    :aria-readonly="platform.readonly.value || undefined"
    :aria-disabled="platform.disabled.value || undefined"
    :disabled="platform.disabled.value || busy"
    @click="toggle"
    @keydown.enter.prevent="keyboardToggle"
    @keydown.space.prevent="keyboardToggle"
    @focus="focus"
    @blur="blur"
  >
    <span :class="n('track')" aria-hidden="true"></span>
    <span v-if="variant !== 'line' && platform.size.value !== 'sm'" :class="n('text')">
      <slot v-if="checked" name="checked">{{ checkedText }}</slot>
      <slot v-else name="unchecked">{{ uncheckedText }}</slot>
    </span>
    <span :class="n('handle')" :style="handleStyle">
      <span v-if="ripple && rippleKey" :key="rippleKey" :class="n('ripple')" aria-hidden="true"></span>
      <svg v-if="busy" :class="n('loading')" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="42 15" />
      </svg>
      <slot v-else-if="checked" name="checked-icon" />
      <slot v-else name="unchecked-icon" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, onActivated, onBeforeUnmount, onDeactivated, ref, watch, type CSSProperties } from 'vue'
import { invokeBeforeHook } from '../_hooks/use-action-guard'
import { createNamespace } from '../utils/components'
import { useSwitchPlatform } from './platform'
import { switchProps, type SwitchValue } from './props'

defineOptions({ name: createNamespace('switch').name })
const props = defineProps(switchProps)
const emit = defineEmits<{
  (event: 'update:modelValue', value: SwitchValue | null): void
  (event: 'change', value: SwitchValue | null, originalEvent: Event): void
  (event: 'click', originalEvent: Event): void
  (event: 'focus' | 'blur', originalEvent: FocusEvent): void
}>()
const { n, classes } = createNamespace('switch')
const platform = useSwitchPlatform(props)
const internal = ref<SwitchValue>(props.defaultValue !== undefined ? props.defaultValue : props.uncheckedValue)
const current = computed(() => (props.modelValue === undefined ? internal.value : props.modelValue))
const checked = computed(() => current.value === props.checkedValue)
const pending = ref(false)
const busy = computed(() => props.loading || pending.value)
const rippleKey = ref(0)
let active = true
let generation = 0
let controller: AbortController | undefined
function cancelPending() {
  generation++
  controller?.abort()
  controller = undefined
  pending.value = false
}
onBeforeUnmount(() => {
  active = false
  cancelPending()
})
onDeactivated(() => {
  active = false
  cancelPending()
})
onActivated(() => {
  active = true
})
watch(
  () => [
    props.modelValue,
    props.checkedValue,
    props.uncheckedValue,
    props.loading,
    platform.disabled.value,
    platform.readonly.value,
  ],
  cancelPending,
  { flush: 'sync' },
)

async function toggle(event: Event) {
  if (!active || busy.value || platform.disabled.value) {
    return
  }
  emit('click', event)
  if (platform.readonly.value) {
    return
  }
  if (props.ripple) {
    rippleKey.value++
  }
  const next = checked.value ? props.uncheckedValue : props.checkedValue
  const version = ++generation
  try {
    if (props.beforeChange) {
      const hook = props.beforeChange
      controller = new AbortController()
      pending.value = true
      const context = { signal: controller.signal, event }
      const permitted = await invokeBeforeHook(
        (done) =>
          hook(
            { value: next, previousValue: props.modelValue !== undefined ? props.modelValue : internal.value },
            done,
            context,
          ),
        context,
      )
      if (!permitted) {
        return
      }
    }
    if (!active || version !== generation || props.loading || platform.disabled.value || platform.readonly.value) {
      return
    }
    if (props.modelValue === undefined) {
      internal.value = next
    }
    emit('update:modelValue', next)
    emit('change', next, event)
    platform.notify('onChange', event)
  } catch {
    // Throwing/rejected interceptors cancel the transition, without leaking an unhandled rejection.
  } finally {
    if (version === generation) {
      pending.value = false
    }
  }
}
function keyboardToggle(event: KeyboardEvent) {
  if (!event.repeat) {
    void toggle(event)
  }
}
function focus(event: FocusEvent) {
  emit('focus', event)
  platform.notify('onFocus', event)
}
function blur(event: FocusEvent) {
  emit('blur', event)
  platform.notify('onBlur', event)
}
const style = computed<CSSProperties>(() => ({
  '--mp-switch-current-track': checked.value ? props.checkedColor : props.uncheckedColor,
  '--mp-switch-loading-color': props.loadingColor,
}))
const handleStyle = computed<CSSProperties>(() => {
  const value = props.handleElevation
  const level =
    value === true
      ? 2
      : typeof value === 'number' && Number.isFinite(value)
        ? Math.max(0, Math.min(24, Math.trunc(value)))
        : 0
  return { boxShadow: level ? '0 ' + level / 2 + 'px ' + (level + 1) + 'px var(--mp-switch-shadow-color)' : 'none' }
})
</script>
