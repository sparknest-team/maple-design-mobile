<script setup lang="ts">
import { computed, provide } from 'vue'
import { useResponsiveState } from '../grid/hook/use-responsive-state'
import { createNamespace } from '../utils/components'
import { ROW_CONTEXT_KEY } from './context'
import { rowProps } from './props'

defineOptions({ name: createNamespace('row').name })
const props = defineProps(rowProps)
const emit = defineEmits<{ (event: 'click', value: MouseEvent): void }>()
const { n, classes } = createNamespace('row')
const horizontal = useResponsiveState(
  computed(() => (Array.isArray(props.gutter) ? props.gutter[0] : props.gutter)),
  0,
)
const vertical = useResponsiveState(
  computed(() => (Array.isArray(props.gutter) ? props.gutter[1] : 0)),
  0,
)
const gutter = computed<[number, number]>(() => [Math.max(0, horizontal.value), Math.max(0, vertical.value)])
provide(ROW_CONTEXT_KEY, { gutter, div: computed(() => props.div) })
const style = computed(() =>
  props.div
    ? undefined
    : {
        marginLeft: gutter.value[0] ? `${-gutter.value[0] / 2}px` : undefined,
        marginRight: gutter.value[0] ? `${-gutter.value[0] / 2}px` : undefined,
        marginTop: gutter.value[1] ? `${-gutter.value[1] / 2}px` : undefined,
        marginBottom: gutter.value[1] ? `${-gutter.value[1] / 2}px` : undefined,
      },
)
</script>
<template>
  <div
    :class="
      classes(
        [!div, n()],
        [!div && !wrap, n('--nowrap')],
        [!div, n(`--align-${align}`)],
        [!div, n(`--justify-${justify}`)],
      )
    "
    :style="style"
    @click="emit('click', $event)"
  >
    <slot />
  </div>
</template>
