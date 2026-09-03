<template>
  <div :class="classNames" :style="styles" @click="handleClick">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { isArray } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { useResponsiveState } from './hook/use-responsive-state'
import { props } from './row-props'
import { useCols } from './row-provide'

const { name, n, classes } = createNamespace('row')

export default defineComponent({
  name,
  props,
  emits: ['click'],
  setup(props, { emit }) {
    const { gutter, align, justify, div, wrap } = toRefs(props)

    const classNames = computed(() =>
      classes(
        [!div.value, n()],
        [!div.value && !wrap.value, n('--nowrap')],
        [!div.value && align.value, n(`--align-${align.value}`)],
        [!div.value && justify.value, n(`--justify-${justify.value}`)],
      ),
    )

    const propGutterHorizontal = computed(() => (isArray(gutter.value) ? gutter.value[0] : gutter.value))
    const propGutterVertical = computed(() => (isArray(gutter.value) ? gutter.value[1] : 0))
    const gutterHorizontal = useResponsiveState(propGutterHorizontal as any, 0)
    const gutterVertical = useResponsiveState(propGutterVertical as any, 0)

    const styles = computed(() => {
      const result: {
        marginTop?: string
        marginBottom?: string
        marginLeft?: string
        marginRight?: string
      } = {}
      if ((gutterHorizontal.value || gutterVertical.value) && !div.value) {
        const marginHorizontal = -gutterHorizontal.value / 2
        const marginVertical = -gutterVertical.value / 2
        if (marginHorizontal) {
          result.marginLeft = `${marginHorizontal}px`
          result.marginRight = `${marginHorizontal}px`
        }
        if (marginVertical) {
          result.marginTop = `${marginVertical}px`
          result.marginBottom = `${marginVertical}px`
        }
      }
      return result
    })

    const resultGutter = computed<[number, number]>(() => [gutterHorizontal.value, gutterVertical.value])
    const { bindCols } = useCols()
    bindCols({
      gutter: resultGutter,
      div: computed(() => !!div.value),
    })

    function handleClick(e: Event) {
      emit('click', e)
    }

    return {
      classNames,
      styles,
      handleClick,
    }
  },
})
</script>
