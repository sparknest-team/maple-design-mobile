<template>
  <div :class="classes(n(), n('$--box'))">
    <div v-if="$slots.icon" :class="n('image-container')">
      <slot name="icon" :size="normalizedImageSize" />
    </div>
    <div v-else :class="n('image-container')" aria-hidden="true">
      <div :class="classes(n('image'), n(status), [animation, n('--animated')])" :style="imageStyle">
        <component :is="statusComponent" />
      </div>
    </div>

    <div v-if="title || $slots.title" :class="n('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="subtitle || $slots.subtitle" :class="n('subtitle')">
      <slot name="subtitle">{{ subtitle }}</slot>
    </div>
    <div v-if="$slots.extra" :class="n('extra')">
      <slot name="extra" />
    </div>
    <div v-if="$slots.default" :class="n('content')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { resultStatusComponents } from './platform'
import { resultProps } from './props'

defineOptions({
  name: createNamespace('result').name,
})

const props = defineProps(resultProps)
const { n, classes } = createNamespace('result')
const statusComponent = computed(() => resultStatusComponents[props.status])
const normalizedImageSize = computed(() => (props.imageSize == null ? undefined : toSizeUnit(props.imageSize)))
const imageStyle = computed(() => ({
  '--mp-result-image-size': normalizedImageSize.value,
}))
</script>
