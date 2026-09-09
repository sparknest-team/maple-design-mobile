import {
  defineComponent,
  h,
  mergeProps,
  Transition,
  vShow,
  withDirectives,
  type CSSProperties,
  type PropType,
  type VNodeRef,
} from 'vue'
import { createNamespace } from '../utils/components'
import type { TriggerPlacement } from './contract'

export interface TriggerPopupOptions {
  rendered: boolean
  displayed: boolean
  visible: boolean
  animating: boolean
  placement: TriggerPlacement
  setPopup: VNodeRef
  popupClass?: any
  wrapperClass?: any
  contentClass?: any
  arrowClass?: any
  popupStyle?: CSSProperties
  wrapperStyle?: CSSProperties
  contentStyle?: CSSProperties
  arrowStyle?: CSSProperties
  showArrow?: boolean
  animationName?: string
  duration?: number | { enter: number; leave: number }
  hooks: Record<string, () => void>
  handlers?: Record<string, (event: any) => void>
  attrs?: Record<string, unknown>
}

// Independent copies share the DOM contract; engines only supply placement and styles.
export default defineComponent({
  name: createNamespace('trigger-popup').name,
  inheritAttrs: false,
  props: { options: { type: Object as PropType<TriggerPopupOptions>, required: true } },
  setup(props, { slots }) {
    return () => {
      const o = props.options
      if (!o.rendered) {
        return null
      }
      return h(
        'div',
        mergeProps(
          o.attrs ?? {},
          {
            ref: o.setPopup,
            class: o.popupClass,
            style: [
              o.popupStyle,
              {
                display: o.displayed ? undefined : 'none',
                pointerEvents: o.animating ? 'none' : o.popupStyle?.pointerEvents,
              },
            ],
            'trigger-placement': o.placement,
          },
          o.handlers ?? {},
        ),
        [
          h(
            Transition,
            { name: o.animationName, duration: o.duration, appear: true, ...o.hooks },
            {
              default: () =>
                withDirectives(
                  h('div', { class: o.wrapperClass, style: [{ position: 'relative' }, o.wrapperStyle] }, [
                    h('div', { class: o.contentClass, style: o.contentStyle }, slots.content?.()),
                    o.showArrow ? h('div', { class: o.arrowClass, style: o.arrowStyle, 'aria-hidden': 'true' }) : null,
                  ]),
                  [[vShow, o.visible]],
                ),
            },
          ),
        ],
      )
    }
  },
})
