<script setup lang="ts">
import { computed, provide } from 'vue'
import { useResponsiveState } from '../grid/hook/use-responsive-state'
import { createNamespace } from '../utils/components'
import { ROW_CONTEXT_KEY } from './context'
import { rowProps } from './props'
import { normalizeRowGutter, rowAligns, rowJustifies } from './validation'

defineOptions({ name: createNamespace('row').name })
const props = defineProps(rowProps)
const emit = defineEmits<{ (event: 'click', value: MouseEvent): void }>()
const { n, classes } = createNamespace('row')
const normalizedGutter = computed(() => normalizeRowGutter(props.gutter))
const horizontal = useResponsiveState(
  computed(() => normalizedGutter.value[0]),
  0,
)
const vertical = useResponsiveState(
  computed(() => normalizedGutter.value[1]),
  0,
)
const effectiveAlign = computed(() => (rowAligns.includes(props.align) ? props.align : 'start'))
const effectiveJustify = computed(() => (rowJustifies.includes(props.justify) ? props.justify : 'start'))
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
        [!div, n(`--align-${effectiveAlign}`)],
        [!div, n(`--justify-${effectiveJustify}`)],
      )
    "
    :style="style"
    @click="emit('click', $event)"
  >
    <slot />
  </div>
</template>
