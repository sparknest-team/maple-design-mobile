import type { CSSProperties } from 'vue'
import type { TriggerPlacement } from './contract'

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
  const horizontal = /^(left|right)/.test(placement)
  const size = horizontal ? popup.height : popup.width
  const center = horizontal
    ? reference.scrollTop + reference.height / 2 - popup.scrollTop
    : reference.scrollLeft + reference.width / 2 - popup.scrollLeft
  const inset = Math.min(Math.max(padding, 0), size / 2)
  const coordinate = Math.max(inset, Math.min(size - inset, center))
  const side = placement.split('-')[0]
  const edge = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[side]!
  const translate = { top: '-50%,50%', bottom: '-50%,-50%', left: '50%,-50%', right: '-50%,-50%' }[side]
  return {
    position: 'absolute',
    [horizontal ? 'top' : 'left']: `${coordinate}px`,
    [edge]: '0',
    transform: `translate(${translate}) rotate(45deg)`,
    ...customStyle,
  }
}
