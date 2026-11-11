<template>
  <div
    :class="classes(n(), n(`--size-${mergedSize}`), n(`--variant-${mergedVariant}`), [mergedDisabled, n('--disabled')])"
    role="group"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { createNamespace } from '../utils/components'
import { inputGroupKey } from './context'
import { inputGroupProps } from './props'
import { useInputForm } from './use-input-form'

defineOptions({ name: createNamespace('input-group').name })
const props = defineProps(inputGroupProps)
const { n, classes } = createNamespace('input-group')
const { group, mergedSize, mergedDisabled, mergedReadonly } = useInputForm(props)
const mergedVariant = computed(() => props.variant ?? group?.variant.value ?? 'filled')
provide(inputGroupKey, {
  size: mergedSize,
  disabled: mergedDisabled,
  readonly: mergedReadonly,
  variant: mergedVariant,
  hint: computed(() => props.hint ?? group?.hint.value),
})
</script>
