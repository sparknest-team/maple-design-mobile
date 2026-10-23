import { toPxNum } from '../utils/elements'
import type { MenuProps } from './props'

/** 公共定位选项；本库独立维护，外观和端侧默认值不进入此层。 */
export function getRootTriggerOptions(props: MenuProps) {
  return {
    disabled: props.disabled,
    placement: props.placement,
    cover: props.cover,
    popupContainer: props.popupContainer,
    popupClass: props.popupClass,
    popupTranslate: [toPxNum(props.offsetX), toPxNum(props.offsetY)],
    autoFitPopupWidth: props.autoFitPopupWidth,
    reference: props.reference,
    strategy: props.strategy,
    mouseEnterDelay: props.mouseEnterDelay,
    mouseLeaveDelay: props.mouseLeaveDelay,
    closeOnClickReference: props.closeOnClickReference,
    alignPoint: props.alignPoint,
  }
}
