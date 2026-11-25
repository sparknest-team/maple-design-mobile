import {
  cloneVNode,
  Comment,
  computed,
  defineComponent,
  Fragment,
  h,
  inject,
  isVNode,
  nextTick,
  ref,
  ssrContextKey,
  Teleport,
  Text,
  type ComponentInternalInstance,
  type VNode,
} from 'vue'
import { renderReference } from '@maple-design/ui-vue/trigger/server'
import { useDirection } from '../_utils/direction'
import { createNamespace } from '../utils/components'
import { useModalScrollBranch } from '../utils/modal-focus'
import { usePopupContainer } from '../utils/popup-container'
import { useVisualSurface } from '../utils/visual-surface'
import { useTriggerInteraction } from './interaction'
import { useTriggerPlatform } from './platform'
import { useTriggerPopup } from './popup'
import { usePopupMoveFocus } from './popup-move-focus'
import { useTriggerPositioner } from './positioner'
import { triggerProps } from './props'
import { referenceSsrMarker, useTriggerReference, useTriggerReferenceAttrs, useTriggerTarget } from './reference'
import { isTriggerReferenceListener, useTriggerReferenceListeners } from './reference-listeners'
import { useTriggerRender } from './render'
import { useTriggerState } from './state'

function bindFirstReference(nodes: VNode[], value: unknown, bindAttrs?: (node: VNode) => VNode): VNode[] {
  if (!value && !bindAttrs) {
    return nodes
  }
  let merged = false
  const visit = (items: VNode[]): VNode[] =>
    items.map((node) => {
      if (merged || !isVNode(node)) {
        return node
      }
      if (node.type === Fragment && Array.isArray(node.children)) {
        const children = visit(node.children as VNode[])
        return h(Fragment, node.props, children)
      }
      if (typeof node.type === 'string' || typeof node.type === 'object' || typeof node.type === 'function') {
        merged = true
        const reference = value ? cloneVNode(node, { class: value }, true) : node
        return bindAttrs ? bindAttrs(reference) : reference
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
    const serverRendering = !!inject(ssrContextKey, null)
    const ReferenceSlot = {
      props: ['children'],
      ssrRender(
        ctx: { children: VNode[] },
        push: (value: Promise<string[]>) => void,
        parent: ComponentInternalInstance,
      ) {
        push(
          Promise.all([
            renderReference(h(Fragment, null, ctx.children), parent, referenceAttrs.value, referenceSsrMarker),
          ]),
        )
      },
    }
    const popup = ref<HTMLElement>()
    const point = ref<{ x: number; y: number }>()
    const { nodes, element: slotElement } = useTriggerReference()
    const { element: reference, getReference, setReference } = useTriggerTarget(slotElement, () => props.reference)
    const { dir } = useDirection(
      () => reference.value,
      () => props.dir ?? attrs.dir,
    )
    useTriggerReferenceListeners(reference, attrs)
    const { visible, request } = useTriggerState(props, emit)
    const referenceAttrs = computed(() => {
      const value =
        typeof props.referenceAttrs === 'function' ? props.referenceAttrs(visible.value) : props.referenceAttrs
      return value ?? {}
    })
    const bindReferenceAttrs = useTriggerReferenceAttrs(reference, slotElement, referenceAttrs)
    const platform = useTriggerPlatform(visible, () => popup.value?.ownerDocument ?? reference.value?.ownerDocument)
    useModalScrollBranch(() => (visible.value ? popup.value : undefined))
    const popupTarget = usePopupContainer(() => props.popupContainer)
    const positionContainer = computed(() => (props.popupContainer === false ? false : popupTarget.value))
    const isMovingBlur = usePopupMoveFocus(popupTarget, () => props.popupContainer === false, popup, visible)
    const renderState = useTriggerRender(visible, () => props.unmountOnClose, emit)

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

    const TriggerPopup = useTriggerPopup(props, {
      n,
      visible,
      renderState,
      popupAttrs,
      positioner,
      zIndex: platform.zIndex,
      popup,
      interaction,
    })

    expose({
      open: interaction.open,
      close: interaction.close,
      resize: positioner.update,
      // Kept for existing instance callers. Dismissal is already enabled.
      allowClose() {},
      getReference,
      setReference,
      focusReference: interaction.focusReference,
      isTopLayer: platform.onStackTop,
    })

    return () => {
      const contentNodes = renderState.rendered.value ? (slots.content?.() ?? []) : []
      const hiddenByEmpty = props.hideEmpty && isEmptyContent(contentNodes)
      let componentReference = false
      const referenceNodes = bindFirstReference(
        slots.default?.() ?? [],
        visible.value ? props.openedClass : undefined,
        props.reference == null && Object.keys(referenceAttrs.value).length
          ? (node) => {
              if (typeof node.type === 'string') {
                return bindReferenceAttrs(node)
              }
              componentReference = true
              return node
            }
          : undefined,
      )
      nodes.value = referenceNodes

      return (
        <>
          {serverRendering && componentReference ? h(ReferenceSlot, { children: referenceNodes }) : referenceNodes}
          <Teleport to={popupTarget.value} disabled={props.popupContainer === false}>
            {/* Keep the Teleport child boundary stable during Vue 3.2 hydration. */}
            <>
              <TriggerPopup content={contentNodes} hiddenByEmpty={hiddenByEmpty} />
            </>
          </Teleport>
        </>
      )
    }
  },
})
