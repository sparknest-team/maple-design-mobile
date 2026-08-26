import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import { doubleRaf, getStyle, isString, preventDefault } from '@maplejs/maple-shared'
import { onWindowResize, useEventListener, useVModel } from '@maplejs/maple-use'
import { type Placement as PopperPlacement, type PositioningStrategy } from '@popperjs/core'
import computeStyles from '@popperjs/core/lib/modifiers/computeStyles.js'
import flip from '@popperjs/core/lib/modifiers/flip.js'
import offset from '@popperjs/core/lib/modifiers/offset.js'
import { createPopper } from '@popperjs/core/lib/popper-lite.js'
import { type Instance, type Modifier } from '@popperjs/core/lib/types'
import { useStack } from '../context/stack'
import { useZIndex } from '../context/zIndex'
import { toPxNum } from '../utils/elements'

export type NeededPopperPlacement = Exclude<PopperPlacement, 'auto' | 'auto-start' | 'auto-end'>

export interface Position {
  placement: NeededPopperPlacement
  skidding: number
  distance: number
}

export interface ReferenceSize {
  width: number
  height: number
}

export type Reference = string | HTMLElement

export type Placement =
  | NeededPopperPlacement
  | 'cover-top'
  | 'cover-top-start'
  | 'cover-top-end'
  | 'cover-bottom'
  | 'cover-bottom-start'
  | 'cover-bottom-end'
  | 'cover-left'
  | 'cover-right'

export type TriggerEvent = 'hover' | 'click' | 'manual' | 'contextMenu'

export interface UseFloatingTriggerOptions {
  open: boolean
  trigger: TriggerEvent
  placement: Placement
  strategy: PositioningStrategy
  disabled: boolean
  offsetX: string | number
  offsetY: string | number
  reference?: string | HTMLElement
  closeOnClickReference?: boolean
  escToClose?: boolean
  cascadeOptimization?: boolean
  alignPoint?: boolean
}

export type FloatingTriggerEmit = (
  event: 'update:open' | 'open' | 'close' | 'closed' | 'click-outside',
  ...args: any[]
) => void

export function useFloatingTrigger(options: UseFloatingTriggerOptions, emit: FloatingTriggerEmit) {
  const popover: Ref<null | HTMLElement> = ref(null)
  const referenceSize: Ref<ReferenceSize> = ref({ width: 0, height: 0 })
  const show = useVModel(options, 'open', {
    passive: true,
    defaultValue: false,
    emit(_event, value) {
      emit('update:open', value)
      if (value) {
        emit('open')
      } else {
        emit('close')
      }
    },
  })

  const { zIndex } = useZIndex(() => show.value, 1)
  useStack(() => show.value, zIndex)

  let popoverInstance: Instance | null = null
  let reference: Reference | undefined = undefined
  let defaultReference: HTMLElement | undefined = undefined
  let eventTarget: HTMLElement | undefined = undefined
  let pointRect: { x: number; y: number } | null = null
  let enterPopover = false
  let enterReference = false
  let allowClose = true

  useEventListener(() => window, 'keydown', handleKeydown)
  watch(() => [options.offsetX, options.offsetY, options.placement, options.strategy], resize)
  watch(() => options.disabled, close)
  watch(() => options.reference, recreatePopperInstance)
  watch(popover, recreatePopperInstance)
  watch(
    () => show.value,
    (newValue) => {
      if (newValue) {
        resize()
      }
    },
  )

  onWindowResize(resize)
  onMounted(createPopperInstance)
  onUnmounted(destroyPopperInstance)

  function createPopperInstance() {
    eventTarget = getEventTarget()
    if (!eventTarget) {
      return
    }

    if (popover.value) {
      popoverInstance = createPopper(getPopperReference() as HTMLElement, popover.value, getPopperOptions())
    }
    eventTarget.addEventListener('mouseenter', handleReferenceMouseenter)
    eventTarget.addEventListener('mouseleave', handleReferenceMouseleave)
    eventTarget.addEventListener('click', handleReferenceClick)
    eventTarget.addEventListener('contextmenu', handleReferenceContextmenu)
    document.addEventListener('click', handleClickOutside)
  }

  function recreatePopperInstance() {
    destroyPopperInstance()
    createPopperInstance()
  }

  function destroyPopperInstance() {
    if (eventTarget) {
      eventTarget.removeEventListener('mouseenter', handleReferenceMouseenter)
      eventTarget.removeEventListener('mouseleave', handleReferenceMouseleave)
      eventTarget.removeEventListener('click', handleReferenceClick)
      eventTarget.removeEventListener('contextmenu', handleReferenceContextmenu)
      eventTarget = undefined
    }

    popoverInstance?.destroy()
    popoverInstance = null
    document.removeEventListener('click', handleClickOutside)
  }

  function computeReferenceSize() {
    const target = getEventTarget()
    if (!target) {
      return
    }

    const { width, height } = getStyle(target)

    referenceSize.value = {
      width: toPxNum(width),
      height: toPxNum(height),
    }
  }

  function getTransformOrigin() {
    switch (options.placement) {
      case 'top':
      case 'cover-bottom':
        return 'bottom'

      case 'top-start':
      case 'right-end':
      case 'cover-bottom-start':
        return 'bottom left'

      case 'top-end':
      case 'left-end':
      case 'cover-bottom-end':
        return 'bottom right'

      case 'bottom':
      case 'cover-top':
        return 'top'

      case 'bottom-start':
      case 'right-start':
      case 'cover-top-start':
        return 'top left'

      case 'bottom-end':
      case 'left-start':
      case 'cover-top-end':
        return 'top right'

      case 'left':
      case 'cover-right':
        return 'right'

      case 'right':
      case 'cover-left':
        return 'left'
    }
  }

  function handleReferenceMouseenter() {
    if (options.trigger !== 'hover') {
      return
    }

    enterReference = true

    open()
  }

  async function handleReferenceMouseleave() {
    if (options.trigger !== 'hover') {
      return
    }

    enterReference = false

    await doubleRaf()

    if (enterPopover) {
      return
    }

    close()
  }

  function handlePopoverMouseenter() {
    if (options.trigger !== 'hover') {
      return
    }

    enterPopover = true

    if (options.cascadeOptimization) {
      allowClose = false
    }
  }

  async function handlePopoverMouseleave() {
    if (options.trigger !== 'hover') {
      return
    }

    enterPopover = false

    await doubleRaf()

    if (enterReference) {
      return
    }

    close()
  }

  function handleReferenceClick() {
    if (options.trigger === 'contextMenu') {
      if (show.value) {
        close()
      }
      return
    }

    if (options.trigger !== 'click') {
      return
    }

    if (options.closeOnClickReference && show.value) {
      close()
      return
    }

    open()
  }

  function handleReferenceContextmenu(event: MouseEvent) {
    if (options.trigger !== 'contextMenu') {
      return
    }

    preventDefault(event)

    if (options.alignPoint) {
      pointRect = { x: event.clientX, y: event.clientY }
    }

    open()
    resize()
  }

  function handleClickOutside(e: Event) {
    const target = getEventTarget()

    if (target && !target.contains(e.target as Node)) {
      if (options.trigger !== 'click' && options.trigger !== 'contextMenu') {
        return
      }

      handlePopoverClose()
      emit('click-outside', e)
    }
  }

  function handlePopoverClose() {
    close()
  }

  function handleClosed() {
    resize()
    emit('closed')
  }

  function getPosition(): Position {
    const { offsetX, offsetY, placement } = options

    computeReferenceSize()

    const offset = {
      x: toPxNum(offsetX),
      y: toPxNum(offsetY),
    }

    switch (placement) {
      case 'cover-top':
        return {
          placement: 'bottom',
          skidding: offset.x,
          distance: offset.y - referenceSize.value.height,
        }

      case 'cover-top-start':
        return {
          placement: 'bottom-start',
          skidding: offset.x,
          distance: offset.y - referenceSize.value.height,
        }

      case 'cover-top-end':
        return {
          placement: 'bottom-end',
          skidding: offset.x,
          distance: offset.y - referenceSize.value.height,
        }

      case 'cover-bottom':
        return {
          placement: 'top',
          skidding: offset.x,
          distance: -offset.y - referenceSize.value.height,
        }

      case 'cover-bottom-start':
        return {
          placement: 'top-start',
          skidding: offset.x,
          distance: -offset.y - referenceSize.value.height,
        }

      case 'cover-bottom-end':
        return {
          placement: 'top-end',
          skidding: offset.x,
          distance: -offset.y - referenceSize.value.height,
        }

      case 'cover-left':
        return {
          placement: 'right',
          skidding: offset.y,
          distance: offset.x - referenceSize.value.width,
        }

      case 'cover-right':
        return {
          placement: 'left',
          skidding: offset.y,
          distance: -offset.x - referenceSize.value.width,
        }

      case 'left':
      case 'left-start':
      case 'left-end':
        return {
          placement,
          skidding: offset.y,
          distance: -offset.x,
        }

      case 'top':
      case 'top-start':
      case 'top-end':
        return {
          placement,
          skidding: offset.x,
          distance: -offset.y,
        }

      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return {
          placement,
          skidding: offset.x,
          distance: offset.y,
        }

      case 'right':
      case 'right-start':
      case 'right-end':
        return {
          placement,
          skidding: offset.y,
          distance: offset.x,
        }
    }
  }

  function getPopperOptions() {
    const { placement, skidding, distance } = getPosition()
    const modifiers: Modifier<any, any>[] = [
      {
        ...flip,
        enabled: show.value,
      },
      {
        ...offset,
        options: {
          offset: [skidding, distance],
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
        name: 'applyTransformOrigin',
        enabled: show.value,
        phase: 'beforeWrite',
        fn({ state }) {
          state.styles.popper.transformOrigin = getTransformOrigin()
        },
      },
    ]

    return {
      placement,
      modifiers,
      strategy: options.strategy,
    }
  }

  function getEventTarget() {
    const targetReference = reference ?? options.reference ?? defaultReference

    if (isString(targetReference)) {
      return document.querySelector(targetReference) as HTMLElement | undefined
    }

    return targetReference ?? undefined
  }

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

  function getReference() {
    return getEventTarget()
  }

  function setAllowClose(value: boolean) {
    allowClose = value
  }

  function setReference(newReference: Reference) {
    reference = newReference
    recreatePopperInstance()
  }

  function setDefaultReference(newReference?: HTMLElement) {
    if (defaultReference === newReference) {
      return
    }

    defaultReference = newReference
    if (!reference && !options.reference) {
      recreatePopperInstance()
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    const { escToClose = false } = options
    if (event.key === 'Escape' && escToClose && show.value) {
      preventDefault(event)
      close()
    }
  }

  // expose
  function resize() {
    popoverInstance?.setOptions(getPopperOptions())
  }

  // expose
  function open() {
    if (options.disabled) {
      return
    }

    show.value = true
  }

  // expose
  function close() {
    if (!allowClose) {
      return
    }

    show.value = false
  }

  return {
    show,
    popover,
    zIndex,
    referenceSize,
    handlePopoverClose,
    handlePopoverMouseenter,
    handlePopoverMouseleave,
    handleClosed,
    getReference,
    setReference,
    setDefaultReference,
    setAllowClose,
    resize,
    open,
    close,
  }
}
