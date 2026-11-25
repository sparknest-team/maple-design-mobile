import {
  h,
  mergeProps,
  Transition,
  vShow,
  withDirectives,
  type ComponentPublicInstance,
  type ExtractPropTypes,
  type Ref,
  type VNode,
} from 'vue'
import { useThemeScope } from '../theme-provider/context'
import type { useTriggerInteraction } from './interaction'
import type { TriggerPositioner } from './positioner'
import type { triggerProps } from './props'
import type { useTriggerRender } from './render'

interface PopupContext {
  n: (suffix?: string) => string
  visible: Readonly<Ref<boolean>>
  renderState: ReturnType<typeof useTriggerRender>
  popupAttrs: Readonly<Ref<Record<string, unknown>>>
  positioner: TriggerPositioner
  zIndex: Readonly<Ref<number>>
  popup: Ref<HTMLElement | undefined>
  interaction: ReturnType<typeof useTriggerInteraction>
}

export function useTriggerPopup(
  props: Readonly<ExtractPropTypes<typeof triggerProps>>,
  { n, visible, renderState, popupAttrs, positioner, zIndex, popup, interaction }: PopupContext,
) {
  const themeScope = useThemeScope()
  const setPopup = (element: Element | ComponentPublicInstance | null) => {
    popup.value = element ? (element as HTMLElement) : undefined
  }
  const handlers = {
    onMouseenter: interaction.popupEnter,
    onMouseleave: interaction.popupLeave,
    onFocusin: interaction.popupFocus,
    onFocusout: interaction.popupBlur,
    onMousedown: (event: MouseEvent) => {
      if (props.preventFocus) {
        event.preventDefault()
      }
    },
  }

  // Position and transition changes belong to the popup's render effect.
  return function TriggerPopup({ content, hiddenByEmpty }: { content: VNode[]; hiddenByEmpty?: boolean }) {
    if (!renderState.rendered.value || hiddenByEmpty) {
      return null
    }
    const placement = positioner.actualPlacement.value
    const style = positioner.popupStyle.value
    return h(
      'div',
      mergeProps(
        themeScope.value,
        popupAttrs.value,
        {
          ref: setPopup,
          class: [n('popup'), n(`--placement-${placement}`), props.popupClass],
          style: {
            ...style,
            zIndex: zIndex.value,
            display: renderState.displayed.value ? undefined : 'none',
            pointerEvents: renderState.animating.value ? 'none' : style.pointerEvents,
          },
          'trigger-placement': placement,
        },
        handlers,
      ),
      [
        h(
          Transition,
          { name: props.animationName, duration: props.duration, appear: true, ...renderState.hooks },
          {
            default: () =>
              withDirectives(
                h(
                  'div',
                  {
                    class: n('popup-wrapper'),
                    style: [{ position: 'relative' }, positioner.wrapperStyle.value],
                  },
                  [
                    h('div', { class: [n('content'), props.contentClass], style: props.contentStyle }, content),
                    props.showArrow
                      ? h('div', {
                          class: [n('arrow'), props.arrowClass],
                          style: positioner.arrowStyle.value,
                          'aria-hidden': 'true',
                        })
                      : null,
                  ],
                ),
                [[vShow, visible.value]],
              ),
          },
        ),
      ],
    )
  }
}
