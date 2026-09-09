import { computed } from 'vue'
import type { TriggerWrapperAppearance } from '../trigger/wrapper'
import { createNamespace } from '../utils/components'
import type { TooltipProps } from './index'

export function useAppearance(props: TooltipProps): TriggerWrapperAppearance {
  const { n, classes } = createNamespace('tooltip')
  return {
    triggerBindings: computed(() => ({
      popupClass: [classes(n('tooltip'), n('$--box')), props.popupClass],
      contentClass: undefined,
      contentStyle: undefined,
      animationName: props.animationName ?? n(),
      arrowClass: [n('arrow'), props.arrowClass],
      arrowStyle: {
        backgroundColor: props.backgroundColor || props.color || `var(--mp-tooltip-${props.status}-color)`,
        ...props.arrowStyle,
      },
    })),
    contentBindings: computed(() => ({
      class: [classes(n('content-container'), n(`--${props.status}`)), props.contentClass, { [n('--xs')]: props.xs }],
      style: { background: props.backgroundColor || props.color, color: props.textColor, ...props.contentStyle },
    })),
  }
}
