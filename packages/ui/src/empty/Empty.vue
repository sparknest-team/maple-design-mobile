<template>
  <div v-if="configEmpty" style="display: contents" @click="emit('click', $event)">
    <component :is="ConfigEmptyNodes" :nodes="configEmpty" />
  </div>
  <div v-else :class="n()" @click="emit('click', $event)">
    <div v-if="showIcon" :class="imageClass" :style="imageStyle">
      <slot name="image">
        <img v-if="imageUrl" :src="imageUrl" :alt="alt" />
        <DefaultEmptyIcon v-else />
      </slot>
    </div>
    <div v-if="showDescription" :class="n('description')">
      <slot>{{ description || defaultDescription }}</slot>
    </div>
    <div v-if="$slots.extra" :class="n('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { ConfigEmptyNodes, DefaultEmptyIcon, useConfigEmpty, useDefaultDescription } from './platform'
import { emptyProps, isEmptyNamedSize } from './props'

defineOptions({ name: createNamespace('empty').name })

const props = defineProps(emptyProps)
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const { n, classes } = createNamespace('empty')
const defaultDescription = useDefaultDescription()
const namedSize = computed(() => (isEmptyNamedSize(props.imageSize) ? props.imageSize : ''))
const imageClass = computed(() => classes(n('image'), namedSize.value ? n(`image--${namedSize.value}`) : undefined))
const imageStyle = computed<CSSProperties>(() => {
  if (namedSize.value) {
    return {}
  }
  const size = typeof props.imageSize === 'number' ? `${props.imageSize}px` : props.imageSize
  return { width: size, height: size, fontSize: size }
})
const configEmpty = useConfigEmpty(props)
</script>
