import {
  cloneVNode,
  Comment,
  computed,
  defineComponent,
  Fragment,
  h,
  nextTick,
  ref,
  Teleport,
  Text,
  type VNode,
} from 'vue'
import { useDirection } from '../_utils/direction'
import { createNamespace } from '../utils/components'
import { usePopupContainer } from '../utils/popup-container'
import { useVisualSurface } from '../utils/visual-surface'
import { useTriggerInteraction } from './interaction'
import { useTriggerPlatform } from './platform'
import TriggerPopup from './popup'
import { usePopupMoveFocus } from './popup-move-focus'
import { useTriggerPositioner } from './positioner'
import { triggerProps } from './props'
import { useTriggerReference, useTriggerReferenceAttrs, useTriggerTarget } from './reference'
import { isTriggerReferenceListener, useTriggerReferenceListeners } from './reference-listeners'
import { useTriggerRender } from './render'
import { useTriggerState } from './state'

function mergeFirstReferenceClass(nodes: VNode[], value: unknown): VNode[] {
  if (!value) {
    return nodes
  }
  let merged = false
  const visit = (items: VNode[]): VNode[] =>
    items.map((node) => {
      if (merged) {
        return node
      }
      if (node.type === Fragment && Array.isArray(node.children)) {
        const children = visit(node.children as VNode[])
        return h(Fragment, node.props, children)
      }
      if (typeof node.type === 'string' || typeof node.type === 'object' || typeof node.type === 'function') {
        merged = true
        return cloneVNode(node, { class: value }, true)
      }
      return node
    })
  return visit(nodes)
}

function isEmptyContent(nodes: VNode[]): boolean {
  return nodes.every((node) => {
    if (node.type === Comment) {
      return true
    }
    if (node.type === Text) {
      return !String(node.children ?? '').trim()
    }
    if (node.type === Fragment && Array.isArray(node.children)) {
      return isEmptyContent(node.children as VNode[])
    }
    return false
  })
}

const { name, n } = createNamespace('trigger')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: triggerProps,
  emits: {
    'update:open': (_visible: boolean) => true,
    'open-change': (_visible: boolean) => true,
    open: () => true,
    opened: () => true,
    close: () => true,
    closed: () => true,
    'click-outside': (_event: Event) => true,
    resize: () => true,
  },
  setup(props, { attrs, emit, expose, slots }) {
    const popup = ref<HTMLElement>()
    const point = ref<{ x: number; y: number }>()
    const { nodes, element: slotElement } = useTriggerReference()
    const { element: reference, getReference, setReference } = useTriggerTarget(slotElement, () => props.reference)
    const { dir } = useDirection(
      () => reference.value,
      () => props.dir ?? attrs.dir,
    )
    useTriggerReferenceListeners(reference, attrs)
    const { visible, request } = useTriggerState(props, (event, value) => {
      if (event === 'update:open') {
        emit('update:open', value)
      } else {
        emit('open-change', value)
      }
    })
    const referenceAttrs = computed(() => {
      const value =
        typeof props.referenceAttrs === 'function' ? props.referenceAttrs(visible.value) : props.referenceAttrs
      return value ?? {}
    })
    useTriggerReferenceAttrs(reference, referenceAttrs)
    const platform = useTriggerPlatform(visible, () => popup.value?.ownerDocument ?? reference.value?.ownerDocument)
    const popupTarget = usePopupContainer(() => props.popupContainer)
    const positionContainer = computed(() => (props.popupContainer === false ? false : popupTarget.value))
    const isMovingBlur = usePopupMoveFocus(popupTarget, () => props.popupContainer === false, popup, visible)
    const renderState = useTriggerRender(
      visible,
      () => props.unmountOnClose,
      (event) => {
        if (event === 'open') {
          emit('open')
        } else if (event === 'opened') {
          emit('opened')
        } else if (event === 'close') {
          emit('close')
        } else {
          emit('closed')
        }
      },
    )

    useVisualSurface(
      () => (renderState.displayed.value ? popup.value : undefined),
      () => platform.zIndex.value,
    )
    const positioner = useTriggerPositioner(props, {
      direction: dir,
      container: positionContainer,
      reference,
      popup,
      visible,
      point,
      globalUpdateAtScroll: platform.globalUpdateAtScroll,
      globalScrollToClose: platform.globalScrollToClose,
      requestClose: () => request(false),
      referenceResize: () => emit('resize'),
    })
    const interaction = useTriggerInteraction(props, {
      visible,
      reference,
      popup,
      popupTarget: positionContainer,
      isMovingBlur,
      request,
      isTopLayer: platform.onStackTop,
      onPoint: (event) => {
        point.value = props.alignPoint ? { x: event.clientX, y: event.clientY } : undefined
        nextTick(positioner.update)
      },
      onOutside: (event) => emit('click-outside', event),
    })
    const popupAttrs = computed(() => ({
      ...Object.fromEntries(Object.entries(attrs).filter(([key]) => !isTriggerReferenceListener(key))),
      dir: dir.value,
    }))

    expose({
      open: interaction.open,
      close: interaction.close,
      resize: positioner.update,
      allowClose: interaction.allowClose,
      getReference,
      setReference,
      focusReference: interaction.focusReference,
      isTopLayer: platform.onStackTop,
    })

    return () => {
      const referenceNodes = mergeFirstReferenceClass(
        slots.default?.() ?? [],
        visible.value ? props.openedClass : undefined,
      )
      const contentNodes = renderState.rendered.value ? (slots.content?.() ?? []) : []
      const hiddenByEmpty = props.hideEmpty && isEmptyContent(contentNodes)
      nodes.value = referenceNodes

      return (
        <>
          {referenceNodes}
          <Teleport to={popupTarget.value} disabled={props.popupContainer === false}>
            {/* Keep the Teleport child boundary stable during Vue 3.2 hydration. */}
            <>
              <TriggerPopup
                options={{
                  rendered: renderState.rendered.value && !hiddenByEmpty,
                  displayed: renderState.displayed.value,
                  visible: visible.value,
                  animating: renderState.animating.value,
                  placement: positioner.actualPlacement.value,
                  setPopup: (element: any) => {
                    popup.value = element ?? undefined
                  },
                  popupClass: [n('popup'), n(`--placement-${positioner.actualPlacement.value}`), props.popupClass],
                  wrapperClass: n('popup-wrapper'),
                  contentClass: [n('content'), props.contentClass],
                  arrowClass: [n('arrow'), props.arrowClass],
                  popupStyle: { ...positioner.popupStyle.value, zIndex: platform.zIndex.value },
                  wrapperStyle: positioner.wrapperStyle.value,
                  contentStyle: props.contentStyle,
                  arrowStyle: positioner.arrowStyle.value,
                  showArrow: props.showArrow,
                  animationName: props.animationName,
                  duration: props.duration,
                  hooks: renderState.hooks,
                  attrs: popupAttrs.value,
                  handlers: {
                    onMouseenter: interaction.popupEnter,
                    onMouseleave: interaction.popupLeave,
                    onFocusin: interaction.popupFocus,
                    onFocusout: interaction.popupBlur,
                    onMousedown: (event: MouseEvent) => {
                      if (props.preventFocus) {
                        event.preventDefault()
                      }
                    },
                  },
                }}
                v-slots={{ content: () => contentNodes }}
              />
            </>
          </Teleport>
        </>
      )
    }
  },
})
