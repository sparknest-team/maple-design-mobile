<template>
  <div :class="n('wrapper')" v-bind="$attrs">
    <div v-if="$slots.header" :class="n('header')">
      <slot name="header" />
    </div>

    <header v-if="showHeading()" :class="n()">
      <div :class="n('main')">
        <button
          v-if="showBack"
          type="button"
          :class="n('back')"
          :aria-label="props.backButtonAriaLabel ?? backLabel"
          @click="handleBack"
        >
          <slot name="back"><BackIcon :class="n('back-icon')" /></slot>
        </button>
        <div v-if="$slots.avatar" :class="n('avatar')">
          <slot name="avatar" />
        </div>
        <div v-if="$slots.title || title" :class="n('title')">
          <slot name="title">{{ title }}</slot>
        </div>
        <div v-if="$slots.subtitle || subtitle" :class="n('subtitle')">
          <slot name="subtitle">{{ subtitle }}</slot>
        </div>
      </div>
      <div v-if="$slots.extra || extra" :class="n('extra')">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </header>

    <div v-if="$slots.default" :class="n('content')"><slot /></div>
    <div v-if="$slots.footer" :class="n('footer')"><slot name="footer" /></div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import { createNamespace } from '../utils/components'
import { BackIcon, usePageHeaderBackLabel } from './platform'
import { pageHeaderProps } from './props'

defineOptions({ name: createNamespace('page-header').name, inheritAttrs: false })
const { n } = createNamespace('page-header')
const props = defineProps(pageHeaderProps)
const slots = useSlots()
const backLabel = usePageHeaderBackLabel()
const emit = defineEmits<{ back: [event: MouseEvent] }>()
const showHeading = () =>
  props.showBack ||
  Boolean(slots.avatar || slots.title || props.title || slots.subtitle || props.subtitle || slots.extra || props.extra)
const handleBack = (event: MouseEvent) => emit('back', event)
</script>
