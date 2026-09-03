<template>
  <div :class="n('footer')">
    <div v-if="title || description" :class="n('footer-caption')">
      <div v-if="title" :class="n('footer-caption-title')" :title="title">{{ title }}</div>
      <div v-if="description" :class="n('footer-caption-description')" :title="description">
        {{ description }}
      </div>
    </div>
    <div v-if="$slots.extra" :class="n('footer-extra')">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '../utils/components'

defineOptions({
  name: createNamespace('image-footer').name,
})

defineProps<{
  title?: string
  description?: string
}>()

const { n } = createNamespace('image')
</script>
