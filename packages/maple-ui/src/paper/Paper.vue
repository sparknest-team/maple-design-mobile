<template>
  <div
    v-ripple="{ disabled: !ripple }"
    :class="
      classes(
        n(),
        formatElevation(elevation, 2),
        [bordered, n('--bordered')],
        [round, n('--round')],
        [inline, n('--inline')],
        [ripple, n('--interactive')],
      )
    "
    :style="{ width: toSizeUnit(width), height: toSizeUnit(height), borderRadius: toSizeUnit(radius) }"
    @click="emit('click', $event)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import vRipple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { paperProps } from './props'

defineOptions({ name: createNamespace('paper').name })
defineProps(paperProps)
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const { n, classes } = createNamespace('paper')
</script>
