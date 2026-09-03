<template>
  <div
    :class="
      classes(
        n(),
        n('$--box'),
        n(`--variant-${variant}`),
        [vertical, n('--vertical'), n('--horizontal')],
        [variant === 'default', formatElevation(elevation, 2)],
      )
    "
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace, formatElevation } from '../utils/components'
import { buttonGroupProps } from './group-props'
import { useButtons, type ButtonGroupProvider } from './group-provide'

defineOptions({
  name: createNamespace('button-group').name,
})

const { n, classes } = createNamespace('button-group')

const props = defineProps(buttonGroupProps)

const { bindButtons } = useButtons()

const buttonGroupProvider: ButtonGroupProvider = {
  elevation: computed(() => props.elevation as boolean | number | string),
  status: computed(() => props.status),
  size: computed(() => props.size),
  variant: computed(() => props.variant),
  color: computed(() => props.color),
  textColor: computed(() => props.textColor),
  disabled: computed(() => props.disabled),
  stacked: computed(() => props.stacked),
  vertical: computed(() => props.vertical),
}

bindButtons(buttonGroupProvider)

defineExpose({
  buttonGroupProvider,
})
</script>
