import { Comment, computed, defineComponent, Fragment, toRefs, type VNode } from 'vue'
import { createNamespace } from '../utils/components'
import { componentSizes } from '../utils/constants'
import { padStartFlex, toSizeUnit } from '../utils/elements'
import { flatChildren } from './children'
import { spaceProps as props, type SpaceSize } from './props'

const isInternalSize = (size: SpaceSize) => componentSizes.some((value) => value === size)

const { name, n, classes } = createNamespace('space')

function getSize(size: SpaceSize, isInternalSize: boolean): string[] {
  return isInternalSize
    ? [`var(--mp-space-size-${size}-row-gap)`, `var(--mp-space-size-${size}-column-gap)`]
    : Array.isArray(size)
      ? (size.map(toSizeUnit) as string[])
      : [toSizeUnit(size) as string, toSizeUnit(size) as string]
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { block, justify, align, wrap, direction, size } = toRefs(props)

    // 将 size 转为 CSS gap 值
    const gapStyle = computed(() => {
      const [rowGap, columnGap] = getSize(size.value, isInternalSize(size.value))
      return `${rowGap} ${columnGap}`
    })

    return () => {
      const rawChildren = (slots.default?.() ?? []) as VNode[]
      const children = (flatChildren(rawChildren) as any[]).filter(
        (node) => !(node && typeof node === 'object' && (node as VNode).type === Comment),
      )
      const hasSplit = !!slots.split

      return (
        <div
          class={classes(n(), [block.value, n('--block')])}
          style={{
            gap: gapStyle.value,
            flexDirection: direction.value,
            justifyContent: padStartFlex(justify.value),
            alignItems: padStartFlex(
              direction.value === 'row'
                ? !align.value
                  ? 'center'
                  : align.value
                : !align.value
                  ? 'stretch'
                  : align.value,
            ),
            flexWrap: wrap.value ? 'wrap' : 'nowrap',
          }}
        >
          {children.map((child, index) => {
            const key = (child as VNode)?.key ?? `mp-space-item-${index}`
            return (
              <Fragment key={key as string | number | symbol}>
                {hasSplit && index > 0 && <div class={n('item-split')}>{slots.split?.()}</div>}
                <div class={n('item')}>{child}</div>
              </Fragment>
            )
          })}
        </div>
      )
    }
  },
})
