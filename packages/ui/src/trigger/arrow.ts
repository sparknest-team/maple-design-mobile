import type { CSSProperties } from 'vue'
import { oppositeSide, type PlacementSide, type TriggerPlacement } from './contract'

interface ArrowRect {
  scrollLeft: number
  scrollTop: number
  width: number
  height: number
}

export function getArrowStyle(
  placement: TriggerPlacement,
  reference: ArrowRect,
  popup: ArrowRect,
  { customStyle = {}, padding = 8 }: { customStyle?: CSSProperties; padding?: number } = {},
): CSSProperties {
  const side = placement.split('-')[0] as PlacementSide
  const horizontal = side === 'left' || side === 'right'
  const size = horizontal ? popup.height : popup.width
  const center = horizontal
    ? reference.scrollTop + reference.height / 2 - popup.scrollTop
    : reference.scrollLeft + reference.width / 2 - popup.scrollLeft
  const inset = Math.min(Math.max(padding, 0), size / 2)
  const coordinate = Math.max(inset, Math.min(size - inset, center))
  const translate = side === 'top' ? '-50%,50%' : side === 'left' ? '50%,-50%' : '-50%,-50%'
  return {
    position: 'absolute',
    [horizontal ? 'top' : 'left']: `${coordinate}px`,
    [oppositeSide[side]]: '0',
    transform: `translate(${translate}) rotate(45deg)`,
    ...customStyle,
  }
}
