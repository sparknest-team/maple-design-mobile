import { computed } from 'vue'
import type { TriggerWrapperAppearance } from '../trigger/wrapper'
import { createNamespace } from '../utils/components'
import type { PopoverProps } from './props'

export function useAppearance(props: PopoverProps): TriggerWrapperAppearance {
  const { n } = createNamespace('popover')
  return {
    triggerBindings: computed(() => ({
      popupClass: [n(), props.popupClass],
      contentClass: undefined,
      contentStyle: undefined,
      animationName: props.animationName ?? n(),
      arrowClass: [n('arrow'), props.arrowClass],
      arrowStyle: props.arrowStyle,
    })),
    contentBindings: computed(() => ({
      class: [n('content'), props.contentClass],
      style: props.contentStyle,
    })),
    titleClass: n('title'),
    bodyClass: n('body'),
  }
}
