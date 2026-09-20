import { computed } from 'vue'
import type { TriggerWrapperAppearance } from '../trigger/wrapper'
import { createNamespace } from '../utils/components'
import type { TooltipProps } from './props'

export function useAppearance(props: TooltipProps): TriggerWrapperAppearance {
  const { n } = createNamespace('tooltip')
  const statusClass = computed(() => (props.status === 'default' ? undefined : n(`--status-${props.status}`)))
  return {
    triggerBindings: computed(() => ({
      popupClass: [n(), props.popupClass],
      contentClass: undefined,
      contentStyle: undefined,
      animationName: props.animationName ?? n(),
      arrowClass: [n('arrow'), statusClass.value, props.arrowClass],
      arrowStyle: { backgroundColor: props.color, ...props.arrowStyle },
    })),
    contentBindings: computed(() => ({
      class: [n('content'), statusClass.value, n(`--size-${props.size}`), props.contentClass],
      style: { backgroundColor: props.color, color: props.textColor, ...props.contentStyle },
    })),
  }
}
