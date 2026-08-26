<template>
  <div v-if="visible" :class="classNames" :style="styles" @click="handleClick">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isNumber, isPlainObject, isString } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { props, type FlexType } from './props'
import { useParentRow } from './provide'

const { name, n, classes } = createNamespace('col')

function getAllowableFlexValue(flexValue: FlexType | undefined) {
  if (
    (isString(flexValue) && (['initial', 'auto', 'none'].includes(flexValue) || /^\d+$/.test(flexValue))) ||
    isNumber(flexValue)
  ) {
    return flexValue
  }
  if (isString(flexValue) && /^\d+(px|em|rem|%)$/.test(flexValue)) {
    return `0 0 ${flexValue}`
  }
  return undefined
}

export default defineComponent({
  name,
  props,
  emits: ['click'],
  setup(props, { emit }) {
    const { row, bindCol } = useParentRow()
    bindCol(null)

    const flexValue = computed(() => getAllowableFlexValue(props.flex))

    const mergeClassName = computed(() => {
      const isDiv = row?.div.value
      const { span, offset, order, xs, sm, md, lg, xl, xxl } = props
      const result: Record<string, boolean | number | undefined> = {
        [n()]: !isDiv,
        [n(`--order-${order}`)]: !!order,
        [n(`--span-${span}`)]: !isDiv && !xs && !sm && !md && !lg && !xl && !xxl,
        [n(`--offset-${offset}`)]: !!(offset && offset > 0),
      }

      const screenList = { xs, sm, md, lg, xl, xxl }
      Object.keys(screenList).forEach((screen) => {
        const screenValue = screenList[screen as keyof typeof screenList]
        if (isNumber(screenValue)) {
          result[n(`--span-${screen}-${screenValue}`)] = true
        } else if (isPlainObject(screenValue)) {
          if (screenValue.span != null) {
            result[n(`--span-${screen}-${screenValue.span}`)] = true
          }
          if (screenValue.offset != null) {
            result[n(`--offset-${screen}-${screenValue.offset}`)] = true
          }
          if (screenValue.order != null) {
            result[n(`--order-${screen}-${screenValue.order}`)] = true
          }
        }
      })

      return result
    })

    const classNames = computed(() => (flexValue.value ? n() : mergeClassName.value))

    const paddingStyles = computed(() => {
      const result: {
        paddingLeft?: string
        paddingRight?: string
        paddingTop?: string
        paddingBottom?: string
      } = {}
      const gutter = row?.gutter.value
      const isDiv = row?.div.value
      if (Array.isArray(gutter) && !isDiv) {
        const paddingHorizontal = (gutter[0] && gutter[0] / 2) || 0
        const paddingVertical = (gutter[1] && gutter[1] / 2) || 0
        if (paddingHorizontal) {
          result.paddingLeft = `${paddingHorizontal}px`
          result.paddingRight = `${paddingHorizontal}px`
        }
        if (paddingVertical) {
          result.paddingTop = `${paddingVertical}px`
          result.paddingBottom = `${paddingVertical}px`
        }
      }
      return result
    })

    const flexStyles = computed(() => (flexValue.value ? { flex: flexValue.value } : {}))

    const visible = computed(() => {
      // span 0 hides; when using only responsive props, CSS handles display:none
      if (flexValue.value) {
        return true
      }
      if (props.xs || props.sm || props.md || props.lg || props.xl || props.xxl) {
        return true
      }
      return props.span !== 0
    })

    function handleClick(e: Event) {
      emit('click', e)
    }

    return {
      visible,
      classNames,
      styles: computed(() => ({ ...paddingStyles.value, ...flexStyles.value })),
      handleClick,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './col';
</style>
