<template>
  <div role="listitem" :class="cls">
    <div :class="`${prefixCls}-dot-wrapper`">
      <div :class="dotLineCls" :style="computedDotLineStyle" />
      <div :class="`${prefixCls}-dot-content`">
        <div v-if="$slots.dot" :class="`${prefixCls}-dot-custom`">
          <slot name="dot" />
        </div>
        <div v-else :class="dotTypeCls" :style="computedDotStyle" />
      </div>
    </div>
    <div :class="`${prefixCls}-content-wrapper`">
      <div v-if="$slots.default" :class="`${prefixCls}-content`">
        <slot />
      </div>
      <div v-if="labelPosition !== 'relative'" :class="`${prefixCls}-label`">
        <slot v-if="$slots.label" name="label" />
        <template v-else>{{ label }}</template>
      </div>
    </div>
    <div v-if="labelPosition === 'relative'" :class="`${prefixCls}-label`">
      <slot v-if="$slots.label" name="label" />
      <template v-else>{{ label }}</template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject, PropType } from 'vue'
import { createNamespace } from '../utils/components'
import { Orientation } from '../utils/constants'
import { TimelineContext, timelineInjectionKey } from './context'
import { DotType, LineType, ModeType, TimelineItemContentPlacement } from './types'

const getDefaultPosition = (
  index: number,
  mode: ModeType,
  orientation: Orientation,
  contentPlacement?: TimelineItemContentPlacement,
) => {
  let map = ['left', 'right']
  if (orientation === 'horizontal') {
    map = ['top', 'bottom']
  }
  // CSS classes describe the axis side; contentPlacement describes the content side.
  const res =
    mode === 'alternate'
      ? contentPlacement
        ? map.includes(contentPlacement)
          ? map[1 - map.indexOf(contentPlacement)]
          : map[0]
        : map[index % 2]
      : mode

  return map.indexOf(res) > -1 ? res : map[0]
}

export default defineComponent({
  name: createNamespace('timeline-item').name,
  props: {
    /**
     * @zh 节点颜色
     * @en Dot color
     */
    dotColor: {
      type: String,
    },
    /**
     * @zh 节点类型：空心圆/实心圆
     * @en Dot type
     * @values 'hollow', 'solid'
     */
    dotType: {
      type: String as PropType<DotType>,
      default: 'solid',
      validator: (value: DotType) => ['solid', 'hollow'].includes(value),
    },
    /**
     * @zh 时间轴类型：实线/虚线/点状线
     * @en Line type
     * @values 'solid', 'dashed', 'dotted'
     */
    lineType: {
      type: String as PropType<LineType>,
      default: 'solid',
      validator: (value: LineType) => ['solid', 'dashed', 'dotted'].includes(value),
    },
    /**
     * @zh 时间轴颜色
     * @en Line Color
     */
    lineColor: {
      type: String,
    },
    /**
     * @zh 标签文本
     * @en Label text
     */
    label: {
      type: String,
    },
    /**
     * @zh 正文相对时间轴节点的侧别，仅交替模式生效；受 orientation 约束
     * @en Content side relative to the timeline
     */
    contentPlacement: {
      type: String as PropType<TimelineItemContentPlacement>,
      validator: (value: TimelineItemContentPlacement) => ['left', 'right', 'top', 'bottom'].includes(value),
    },
  },
  /**
   * @zh 自定义节点
   * @en Custom dot
   * @slot dot
   */
  /**
   * @zh 自定义标签
   * @en Custom label
   * @slot label
   */
  setup(props) {
    const prefixCls = createNamespace('timeline-item').n()
    const instance = getCurrentInstance()
    const context = inject<Partial<TimelineContext>>(timelineInjectionKey, {})

    const index = computed(() => context.items?.indexOf(instance?.uid ?? -1) ?? -1)

    const contextDirection = computed(() => {
      return context?.orientation ?? 'vertical'
    })

    const contextLabelPosition = computed(() => {
      return context?.labelPosition ?? 'same'
    })

    const cls = computed(() => {
      const { items = [], reverse, labelPosition, mode = 'left' } = context
      const orientation = contextDirection.value
      const computedPosition = getDefaultPosition(index.value, mode, orientation, props.contentPlacement)
      return [
        prefixCls,
        {
          [`${prefixCls}-${orientation}-${computedPosition}`]: orientation,
          [`${prefixCls}-label-${labelPosition}`]: labelPosition,
          [`${prefixCls}-last`]: index.value === (reverse === true ? 0 : items.length - 1),
        },
      ]
    })

    const dotLineCls = computed(() => {
      return [`${prefixCls}-dot-line`, `${prefixCls}-dot-line-is-${contextDirection.value}`]
    })

    const computedDotLineStyle = computed(() => {
      const { orientation } = context! || {}
      return {
        [orientation === 'horizontal' ? 'borderTopStyle' : 'borderLeftStyle']: props.lineType,
        ...(props.lineColor ? { borderColor: props.lineColor } : {}),
      }
    })

    const dotTypeCls = computed(() => {
      return [`${prefixCls}-dot`, `${prefixCls}-dot-${props.dotType}`]
    })

    const computedDotStyle = computed(() => {
      return {
        [props.dotType === 'solid' ? 'backgroundColor' : 'borderColor']: props.dotColor,
      }
    })

    return {
      cls,
      dotLineCls,
      dotTypeCls,
      prefixCls,
      computedDotLineStyle,
      computedDotStyle,
      labelPosition: contextLabelPosition,
    }
  },
})
</script>
