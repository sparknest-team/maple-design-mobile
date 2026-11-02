import { computed, defineComponent, toRefs } from 'vue'
import { createNamespace } from '../utils/components'
import { componentSizes } from '../utils/constants'
import { padStartFlex, toSizeUnit } from '../utils/elements'
import { createSpaceChildren, isEmptySpaceNode } from './children'
import { isValidSpaceSize, spaceProps as props, type SpaceSize } from './props'

const isInternalSize = (size: SpaceSize) => componentSizes.some((value) => value === size)
const { name, n, classes } = createNamespace('space')

function getSize(value: SpaceSize): string[] {
  const size = isValidSpaceSize(value) ? (typeof value === 'string' ? value.trim() : value) : 'md'
  const unit = (value: number | string) => {
    const length = typeof value === 'string' && Number.isFinite(Number(value)) ? Number(value) : value
    return toSizeUnit(length) as string
  }
  return isInternalSize(size)
    ? [`var(--mp-space-size-${size}-row-gap)`, `var(--mp-space-size-${size}-column-gap)`]
    : Array.isArray(size)
      ? size.map(unit)
      : [unit(size), unit(size)]
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const { block, justify, align, wrap, direction, size } = toRefs(props)
    const flatten = createSpaceChildren()
    const gapStyle = computed(() => getSize(size.value).join(' '))

    return () => {
      const children = flatten(slots.default?.() ?? [])
      // Each invocation returns separate VNodes for its own separator instance.
      const splits = children.slice(0, -1).map(() => (slots.split?.() ?? []).filter((node) => !isEmptySpaceNode(node)))
      const hasSplit = splits.some((nodes) => nodes.length > 0)
      return (
        <div
          class={classes(n(), [block.value, n('--block')], [wrap.value && hasSplit, n('--split-wrap')])}
          style={{
            gap: gapStyle.value,
            flexDirection: direction.value,
            justifyContent: padStartFlex(justify.value),
            alignItems: padStartFlex(align.value ?? (direction.value === 'row' ? 'center' : 'stretch')),
            flexWrap: wrap.value ? 'wrap' : 'nowrap',
          }}
        >
          {children.map(({ node, key }, index) => (
            <div class={n('group')} key={key}>
              <div class={n('item')}>{node}</div>
              {(splits[index]?.length ?? 0) > 0 && <div class={n('item-split')}>{splits[index]}</div>}
            </div>
          ))}
        </div>
      )
    }
  },
})
