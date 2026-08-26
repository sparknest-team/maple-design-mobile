<template>
  <transition :name="n('$-fade')">
    <span v-show="computedShow" :class="rootClass" :style="rootStyle" @click="handleClick">
      <span v-if="$slots.icon" :class="n('icon')">
        <slot name="icon" />
      </span>
      <span v-if="nowrap" :class="n('text')">
        <slot />
      </span>
      <slot v-else />
      <span v-if="loading" :class="n('loading-icon')" aria-hidden="true" />
      <span v-else-if="closable" role="button" aria-label="Close" :class="n('close-btn')" @click.stop="handleClose">
        <slot name="close-icon">
          <mp-icon><MIconCloseCircle /></mp-icon>
        </slot>
      </span>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, type CSSProperties } from 'vue'
import { IconCloseCircle as MIconCloseCircle } from '@maplejs/icons-vue'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import { tagProps } from './props'

defineOptions({
  name: createNamespace('tag').name,
})

const { n, classes } = createNamespace('tag')

const props = defineProps(tagProps)
const emit = defineEmits<{
  (e: 'update:show', show: boolean): void
  (e: 'update:checked', checked: boolean): void
  (e: 'close', ev: MouseEvent): void
  (e: 'check', checked: boolean, ev: MouseEvent): void
}>()

const innerShow = ref(props.defaultShow)
const innerChecked = ref(props.defaultChecked)

const computedShow = computed(() => props.show ?? innerShow.value)
const computedChecked = computed(() => (props.checkable ? (props.checked ?? innerChecked.value) : true))

const rootClass = computed(() =>
  classes(
    n(),
    n(`--size-${props.size}`),
    n(`--status-${props.status}`),
    n(`--variant-${props.variant}`),
    [props.loading, n('--loading')],
    [props.closable, n('--closable')],
    [props.checkable, n('--checkable')],
    [computedChecked.value, n('--checked')],
    [props.nowrap, n('--nowrap')],
    [props.round, n('--round')],
  ),
)

const rootStyle = computed<CSSProperties | undefined>(() => {
  if (!props.color && !props.textColor) {
    return undefined
  }

  if (props.variant === 'outline') {
    return {
      color: props.textColor || props.color,
      borderColor: props.color,
      backgroundColor: 'transparent',
    }
  }

  return {
    background: props.color,
    color: props.textColor,
    borderColor: props.color,
  }
})

function handleClose(e: MouseEvent) {
  if (props.loading) {
    return
  }
  innerShow.value = false
  emit('update:show', false)
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
