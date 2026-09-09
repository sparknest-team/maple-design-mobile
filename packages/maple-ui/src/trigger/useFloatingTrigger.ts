import { CSSProperties, nextTick, onMounted, onUnmounted, ref, shallowRef, watch, type Ref } from 'vue'
import {
  computeStyles,
  createPopperLite as createPopper,
  eventListeners,
  flip,
  offset,
  preventOverflow,
  type Instance,
  type Modifier,
  type PositioningStrategy,
} from '@popperjs/core'
import { useStack } from '../context/stack'
import { useZIndex } from '../context/zIndex'
import { toPxNum } from '../utils/elements'
import { getArrowStyle } from './arrow'
import type { TriggerPlacement } from './contract'
import { getPositioningSpace, getRelativeRect, getTriggerPosition } from './geometry'
import { useTriggerInteraction, type InteractionOptions, type TriggerEvent } from './interaction'
import { useTriggerTarget, type Reference, type TriggerElement } from './reference'
import { useTriggerResize } from './resize'
import { useTriggerState } from './state'

export { getTriggerPosition } from './geometry'

export type { TriggerEvent } from './interaction'

export type { Reference } from './reference'

export type NeededPopperPlacement = TriggerPlacement

export interface Position {
  placement: NeededPopperPlacement
  skidding: number
  distance: number
}

export interface ReferenceSize {
  width: number
  height: number
}

export type Placement = TriggerPlacement

export interface UseFloatingTriggerOptions extends InteractionOptions {
  open?: boolean
  defaultOpen?: boolean
  trigger: TriggerEvent | TriggerEvent[]
  placement: Placement
  cover?: boolean
  strategy: PositioningStrategy
  disabled: boolean
  offsetX: string | number
  offsetY: string | number
  reference?: Reference
  closeOnClickReference?: boolean
  escToClose?: boolean
  cascadeOptimization?: boolean
  showArrow?: boolean
  arrowStyle?: CSSProperties
  alignPoint?: boolean
}

export type FloatingTriggerEmit = (
  event: 'update:open' | 'open-change' | 'open' | 'close' | 'closed' | 'click-outside',
  ...args: any[]
) => void

export function useFloatingTrigger(options: UseFloatingTriggerOptions, emit: FloatingTriggerEmit) {
  const popover: Ref<null | HTMLElement> = ref(null)
  const actualPlacement = ref(options.placement)
  const arrowStyle: Ref<CSSProperties> = ref({})
  const referenceSize: Ref<ReferenceSize> = ref({ width: 0, height: 0 })
  const { visible: show, request: requestOpen } = useTriggerState(options, emit)

  const { zIndex } = useZIndex(() => show.value, 1)
  const { onStackTop } = useStack(() => show.value, zIndex)

  let popoverInstance: Instance | null = null
  const defaultReference = shallowRef<TriggerElement>()
  const {
    element: referenceElement,
    getReference,
    setReference,
  } = useTriggerTarget(defaultReference, () => options.reference)
  let pointRect: { x: number; y: number } | null = null

  watch(
    () => [
      options.offsetX,
      options.offsetY,
      options.placement,
      options.cover,
      options.strategy,
      options.showArrow,
      options.arrowStyle,
    ],
    resize,
  )
  watch(referenceElement, recreatePopperInstance)
  watch(popover, recreatePopperInstance)
  watch(
    () => show.value,
    (newValue) => {
      if (newValue) {
        resize()
      }
    },
  )

  const interaction = useTriggerInteraction(options, {
    visible: show,
    reference: referenceElement,
    popup: popover,
    request: requestOpen,
    isTopLayer: onStackTop,
    onOutside: (event) => emit('click-outside', event),
    onPoint: (event) => {
      if (options.alignPoint) {
        pointRect = { x: event.clientX, y: event.clientY }
      }
      nextTick(resize)
    },
  })
  const { open, close, setAllowClose } = interaction

  useTriggerResize(
    () => [referenceElement.value, popover.value, popover.value?.offsetParent],
    () => show.value,
    resize,
  )
  onMounted(recreatePopperInstance)
  onUnmounted(destroyPopperInstance)

  function createPopperInstance() {
    const eventTarget = getEventTarget()
    if (!eventTarget) {
      return
    }

    if (popover.value) {
      popoverInstance = createPopper(getPopperReference(), popover.value, getPopperOptions())
    }
  }

  function recreatePopperInstance() {
    destroyPopperInstance()
    createPopperInstance()
  }

  function destroyPopperInstance() {
    popoverInstance?.destroy()
    popoverInstance = null
  }

  function computeReferenceSize() {
    const target = getEventTarget()
    if (!target) {
      return
    }

    const space = popover.value ? getPositioningSpace(popover.value) : { x: 0, y: 0, scaleX: 1, scaleY: 1 }
    const { width, height } = getRelativeRect(target.getBoundingClientRect(), space)
    if (referenceSize.value.width !== width || referenceSize.value.height !== height) {
      referenceSize.value = { width, height }
    }
  }

  function getPosition(): Position {
    const { offsetX, offsetY, placement } = options

    computeReferenceSize()

    const offset = {
      x: toPxNum(offsetX),
      y: toPxNum(offsetY),
    }

    return getTriggerPosition(placement, offset.x, offset.y, referenceSize.value, options.cover)
  }

  function getPopperOptions() {
    const { placement } = getPosition()
    const modifiers: Modifier<any, any>[] = [
      { ...eventListeners, enabled: show.value },
      {
        ...flip,
        enabled: show.value,
      },
      { ...preventOverflow, enabled: show.value, options: { tether: false, padding: 0 } },
      {
        ...offset,
        options: {
          offset: ({ placement, reference }: { placement: Placement; reference: ReferenceSize }) => {
            const { skidding, distance } = getTriggerPosition(
              placement,
              toPxNum(options.offsetX),
              toPxNum(options.offsetY),
              reference,
              options.cover,
            )
            return [skidding, distance]
          },
        },
      },
      {
        ...computeStyles,
        options: {
          adaptive: false,
          gpuAcceleration: false,
        },
        enabled: show.value,
      },
      {
        name: 'updateRenderGeometry',
        enabled: show.value,
        phase: 'beforeWrite',
        fn({ state }) {
          actualPlacement.value = state.placement as Placement
          if (options.showArrow) {
            const coordinates = state.modifiersData.popperOffsets ?? { x: 0, y: 0 }
            const reference = state.rects.reference
            const style = getArrowStyle(
              actualPlacement.value,
              { ...reference, scrollLeft: reference.x, scrollTop: reference.y },
              { ...state.rects.popper, scrollLeft: coordinates.x, scrollTop: coordinates.y },
              { customStyle: options.arrowStyle },
            )
            if (JSON.stringify(style) !== JSON.stringify(arrowStyle.value)) {
              arrowStyle.value = style
            }
          }
        },
      },
    ]

    return {
      placement,
      modifiers,
      strategy: options.strategy,
    }
  }

  const getEventTarget = () => referenceElement.value

  function getPopperReference() {
    const target = getEventTarget()!

    if (!options.alignPoint) {
      return target
    }

    return {
      contextElement: target,
      getBoundingClientRect: () => {
        if (pointRect) {
          const { x, y } = pointRect
          return {
            width: 0,
            height: 0,
            top: y,
            right: x,
            bottom: y,
            left: x,
            x,
            y,
            toJSON: () => {},
          }
        }

        return target.getBoundingClientRect()
      },
    }
  }

  function setDefaultReference(newReference?: TriggerElement) {
    defaultReference.value = newReference
  }

  // expose
  function resize() {
    popoverInstance?.setOptions(getPopperOptions())
  }

  return {
    show,
    popover,
    zIndex,
    referenceSize,
    focusReference: interaction.focusReference,
    handlePopoverMouseenter: interaction.popupEnter,
    handlePopoverMouseleave: interaction.popupLeave,
    handlePopoverFocus: interaction.popupFocus,
    handlePopoverBlur: interaction.popupBlur,
    actualPlacement,
    arrowStyle,
    getReference,
    isTopLayer: onStackTop,
    setReference,
    setDefaultReference,
    setAllowClose,
    resize,
    open,
    close,
  }
}
