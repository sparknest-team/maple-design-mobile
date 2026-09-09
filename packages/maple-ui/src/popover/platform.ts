import { computed } from 'vue'
import type { TriggerWrapperAppearance } from '../trigger/wrapper'
import { createNamespace, formatElevation } from '../utils/components'
import type { PopoverProps } from './index'

export function useAppearance(props: PopoverProps): TriggerWrapperAppearance {
  const { n, classes } = createNamespace('popover')
  return {
    triggerBindings: computed(() => ({
      animationName: props.animationName || n(),
      arrowStyle: {
        backgroundColor: props.defaultStyle ? 'var(--mp-popover-background-color)' : undefined,
        ...props.arrowStyle,
      },
      contentClass: [
        props.contentClass,
        classes(
          n('content'),
          n('$--box'),
          props.popoverClass,
          [props.defaultStyle, n('--background-color')],
          [props.defaultStyle, formatElevation(props.elevation, 3)],
        ),
      ],
    })),
    titleClass: n('title'),
    bodyClass: n('body'),
  }
}
