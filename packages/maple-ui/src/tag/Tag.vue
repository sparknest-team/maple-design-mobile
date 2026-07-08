<template>
  <transition :name="n('$-fade')">
    <span
      v-show="computedVisible"
      :class="rootClass"
      :style="rootStyle"
      @click="handleClick"
    >
      <span v-if="$slots.icon" :class="n('icon')">
        <slot name="icon" />
      </span>
      <span v-if="nowrap" :class="n('text')">
        <slot />
      </span>
      <slot v-else />
      <span v-if="loading" :class="n('loading-icon')" aria-hidden="true" />
      <span
        v-else-if="closable"
        role="button"
        aria-label="Close"
        :class="n('close-btn')"
        @click.stop="handleClose"
      >
        <slot name="close-icon">
          <mp-icon name="close-circle" />
        </slot>
      </span>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, type CSSProperties } from 'vue'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import { tagProps } from './props'

defineOptions({
  name: createNamespace('tag').name,
})

const { n, classes } = createNamespace('tag')

const props = defineProps(tagProps)
const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'update:checked', checked: boolean): void
  (e: 'close', ev: MouseEvent): void
  (e: 'check', checked: boolean, ev: MouseEvent): void
}>()

const innerVisible = ref(props.defaultVisible)
const innerChecked = ref(props.defaultChecked)

const computedVisible = computed(() => props.visible ?? innerVisible.value)
const computedChecked = computed(() =>
  props.checkable ? (props.checked ?? innerChecked.value) : true,
)

// bordered 兼容：bordered=true 时等价 variant=outline
const computedVariant = computed(() => (props.bordered ? 'outline' : props.variant))

const rootClass = computed(() =>
  classes(
    n(),
    n(`--size-${props.size}`),
    n(`--status-${props.status}`),
    n(`--variant-${computedVariant.value}`),
    [props.loading, n('--loading')],
    [props.closable, n('--closable')],
    [props.checkable, n('--checkable')],
    [computedChecked.value, n('--checked')],
    [props.nowrap, n('--nowrap')],
  ),
)

const rootStyle = computed<CSSProperties | undefined>(() => {
  if (!props.color && !props.textColor) {
    return undefined
  }
  return {
    backgroundColor: props.color,
    color: props.textColor,
    borderColor: props.color,
  }
})

function handleClose(e: MouseEvent) {
  if (props.loading) {
    return
  }
  innerVisible.value = false
  emit('update:visible', false)
  emit('close', e)
}

function handleClick(e: MouseEvent) {
  if (!props.checkable || props.loading) {
    return
  }
  const next = !computedChecked.value
  innerChecked.value = next
  emit('update:checked', next)
  emit('check', next, e)
}
</script>

<style lang="less">
@import '../styles/common';
@import '../icon/icon';
@import './tag';
</style>
