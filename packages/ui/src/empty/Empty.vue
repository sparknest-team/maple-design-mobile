<template>
  <div v-if="configEmpty" style="display: contents" @click="handleClick">
    <component :is="ConfigEmptyNodes" :nodes="configEmpty" />
  </div>
  <div v-else :class="n()" @click="handleClick">
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
import { computed, defineComponent, onBeforeUpdate, ref, useSlots, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { DefaultEmptyIcon, provideSkipConfigEmpty, useConfigEmpty, useDefaultDescription } from './platform'
import { emptyProps, isEmptyNamedSize } from './props'

defineOptions({ name: createNamespace('empty').name })

const props = defineProps(emptyProps)
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const slots = useSlots()
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
// Slot presence is not reactive; refresh before renders as local slot branches change.
const hasCustomContent = ref(false)
function updateCustomContent() {
  hasCustomContent.value = Boolean(slots.default || slots.image || slots.extra || props.imageUrl || props.description)
}
updateCustomContent()
onBeforeUpdate(updateCustomContent)
const configEmpty = useConfigEmpty(hasCustomContent)
const ConfigEmptyNodes = defineComponent({
  name: 'ConfigEmptyNodes',
  props: { nodes: { type: [Array, Object], required: true } },
  setup(innerProps) {
    provideSkipConfigEmpty()
    return () => innerProps.nodes
  },
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>
