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
          <mp-icon v-if="type !== 'default'">
            <MIconInformation v-if="type === 'info'" />
            <MIconCheckboxMarkedCircle v-else-if="type === 'success'" />
            <MIconWarning v-else-if="type === 'warning'" />
            <MIconError v-else />
          </mp-icon>
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

      <div v-if="closable" tabindex="-1" role="button" aria-label="Close" :class="n('close-icon')" @click="handleClose">
        <slot name="close-icon">
          <mp-icon><MIconWindowClose /></mp-icon>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots, type CSSProperties } from 'vue'
import {
  IconCheckboxMarkedCircle as MIconCheckboxMarkedCircle,
  IconError as MIconError,
  IconInformation as MIconInformation,
  IconWarning as MIconWarning,
  IconWindowClose as MIconWindowClose,
} from '@maplejs/icons-vue'
import { call } from '@maplejs/maple-shared'
import MpIcon from '../icon'
import { createNamespace, formatElevation } from '../utils/components'
import { alertProps } from './props'

defineOptions({
  name: createNamespace('alert').name,
})

const { n, classes } = createNamespace('alert')
const props = defineProps(alertProps)
const emit = defineEmits(['close', 'after-close'])
const slots = useSlots()

const visible = ref(true)

const hasTitle = computed(() => Boolean(props.title || slots.title))

const showIconNode = computed(() => {
  if (!props.showIcon) {
    return false
  }
  if (slots.icon) {
    return true
  }
  return props.type !== 'default'
})

const rootStyle = computed<CSSProperties>(() => {
  return props.color ? { backgroundColor: props.color } : {}
})

function handleClose(e: Event) {
  visible.value = false
  emit('close', e)
}

function handleAfterLeave() {
  emit('after-close')
}
</script>

<style lang="less">
@import '../styles/common';
@import '../styles/elevation';
@import '../icon/icon';
@import './alert';
</style>
