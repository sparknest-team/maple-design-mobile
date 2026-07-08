<template>
  <transition name="mp-zoom-in-top" @after-leave="handleAfterLeave">
    <div
      v-if="visible"
      role="alert"
      :class="
        classes(
          n(),
          n('$--box'),
          n(`--${type}`),
          n(`--${variant}`),
          [hasTitle, n('--with-title')],
          [banner, n('--banner')],
          [center, n('--center')],
          formatElevation(elevation, 2),
        )
      "
      :style="rootStyle"
    >
      <div v-if="showIconNode" :class="n('icon')">
        <slot name="icon">
          <mp-icon :name="iconTypeMap[type] || 'information'" />
        </slot>
      </div>

      <div :class="n('body')">
        <div v-if="hasTitle" :class="n('title')">
          <slot name="title">{{ title }}</slot>
        </div>
        <div :class="n('content')">
          <slot>{{ message }}</slot>
        </div>
      </div>

      <div v-if="$slots.action" :class="n('action')">
        <slot name="action" />
      </div>

      <div
        v-if="closable"
        role="button"
        :class="n('close-icon')"
        @click="handleClose"
      >
        <slot name="close-icon">
          <mp-icon name="close" />
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots, type CSSProperties } from 'vue'
import { call } from '@maplejs/maple-shared'
import MpIcon from '../icon'
import { createNamespace, formatElevation } from '../utils/components'
import { alertProps, type AlertType } from './props'

defineOptions({
  name: createNamespace('alert').name,
})

const { n, classes } = createNamespace('alert')
const props = defineProps(alertProps)
const slots = useSlots()

const iconTypeMap: Record<Exclude<AlertType, 'default'>, string> = {
  info: 'information',
  success: 'checkbox-marked-circle',
  warning: 'warning',
  danger: 'error',
}

const visible = ref(true)

const hasTitle = computed(() => Boolean(props.title || slots.title))

const showIconNode = computed(() => {
  if (!props.showIcon) return false
  return true
})

const rootStyle = computed<CSSProperties>(() => {
  return props.color ? { backgroundColor: props.color } : {}
})

function handleClose(e: Event) {
  visible.value = false
  call(props.onClose, e)
}

function handleAfterLeave() {
  call(props.onAfterClose)
}
</script>

<style lang="less">
@import '../styles/common';
@import '../styles/elevation';
@import '../icon/icon';
@import './alert';
</style>
