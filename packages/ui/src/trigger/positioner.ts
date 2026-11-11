import {
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  ref,
  watch,
  type CSSProperties,
  type Ref,
} from 'vue'
import type { ReadingDirection } from '../_utils/direction'
import { getArrowStyle } from './arrow'
import type { TriggerPlacement } from './contract'
import { getPositioningSpace, getRelativeRect, getTransformOrigin, translateRectBetweenDocuments } from './geometry'
import { calculatePopupPosition, getScrollElements, getScrollViews, getSlotChangeRoots } from './position'
import { useTriggerResize } from './resize'
import type { TriggerPopupTranslate, TriggerStrategy } from './types'

interface PositionerOptions {
  placement: TriggerPlacement
  strategy: TriggerStrategy
  cover: boolean
  popupOffset: number
  popupTranslate?: TriggerPopupTranslate
  popupStyle?: CSSProperties
  arrowStyle?: CSSProperties
  showArrow: boolean
  autoFitPopupWidth: boolean
  autoFitPopupMinWidth: boolean
  autoFitPosition: boolean
  autoFitTransformOrigin: boolean
  autoFixPosition: boolean
  updateAtScroll: boolean
  scrollToClose: boolean
  scrollToCloseDistance: number
}

interface PositionerContext {
  direction?: Readonly<Ref<ReadingDirection>>
  container?: Readonly<Ref<unknown>>
  reference: Readonly<Ref<HTMLElement | SVGElement | undefined>>
  popup: Readonly<Ref<HTMLElement | undefined>>
  visible: Readonly<Ref<boolean>>
  point: Readonly<Ref<{ x: number; y: number } | undefined>>
  globalUpdateAtScroll: Readonly<Ref<boolean>>
  globalScrollToClose: Readonly<Ref<boolean>>
  requestClose(): void
  referenceResize(): void
}

export interface TriggerPositioner {
  actualPlacement: Ref<TriggerPlacement>
  popupStyle: Ref<CSSProperties>
  wrapperStyle: Ref<CSSProperties>
  arrowStyle: Ref<CSSProperties>
  referenceSize: Ref<{ width: number; height: number }>
  update(): void
}

function rafThrottle(
  callback: (event?: Event, target?: EventTarget | null) => void,
  ownerView: () => Window | null | undefined,
) {
  let frame: number | undefined
  let frameView: Window | undefined
  let latest: Event | undefined
  let latestTarget: EventTarget | null | undefined
  let generation = 0
  const run = (event?: Event) => {
    latest = event
    latestTarget = event?.currentTarget ?? event?.target
    if (frame !== undefined) {
      return
    }
    const view = (event?.target as Node | null)?.ownerDocument?.defaultView ?? ownerView()
    if (!view) {
      return
    }
    frameView = view
    const currentGeneration = generation
    frame = view.requestAnimationFrame(() => {
      if (currentGeneration !== generation) {
        return
      }
      generation++
      frame = undefined
      frameView = undefined
      const currentEvent = latest
      const currentTarget = latestTarget
      latest = undefined
      latestTarget = undefined
      callback(currentEvent, currentTarget)
    })
  }
  run.cancel = () => {
    generation++
    if (frame !== undefined) {
      frameView?.cancelAnimationFrame(frame)
    }
    frame = undefined
    frameView = undefined
    latest = undefined
    latestTarget = undefined
  }
  return run
}

export function useTriggerPositioner(options: PositionerOptions, context: PositionerContext): TriggerPositioner {
  const actualPlacement = ref<TriggerPlacement>(options.placement)
  const popupStyle = ref<CSSProperties>({})
  const wrapperStyle = ref<CSSProperties>({})
  const arrowStyle = ref<CSSProperties>({})
  const referenceSize = ref({ width: 0, height: 0 })
  let suspended = false
  let positionGeneration = 0
  let scrollElements: HTMLElement[] = []
  let scrollPositions = new WeakMap<Element, [number, number]>()
  let windowPositions = new WeakMap<Document, [number, number]>()
  let scrollViews: Window[] = []
  let slotRoots: ShadowRoot[] = []

  function update() {
    const reference = context.reference.value
    const popup = context.popup.value
    if (!reference || !popup || !context.visible.value || suspended) {
      return
    }

    const generation = ++positionGeneration
    const referenceDocument = reference.ownerDocument
    const popupDocument = popup.ownerDocument
    const current = () =>
      !suspended &&
      generation === positionGeneration &&
      context.visible.value &&
      context.reference.value === reference &&
      context.popup.value === popup &&
      reference.ownerDocument === referenceDocument &&
      popup.ownerDocument === popupDocument
    const view = popup.ownerDocument.defaultView
    const space = getPositioningSpace(popup, options.strategy)
    const point = context.point.value
    const referenceRect = point
      ? { top: point.y, bottom: point.y, left: point.x, right: point.x, width: 0, height: 0 }
      : reference.getBoundingClientRect()
    const translatedReference = translateRectBetweenDocuments(
      referenceRect,
      reference.ownerDocument,
      popup.ownerDocument,
    )
    if (!translatedReference || !current()) {
      return
    }
    const relativeReference = getRelativeRect(translatedReference, space)
    const relativePopup = getRelativeRect(popup.getBoundingClientRect(), space)
    if (!current()) {
      return
    }
    referenceSize.value = { width: relativeReference.width, height: relativeReference.height }
    if (!current()) {
      return
    }
    if (options.autoFitPopupMinWidth) {
      relativePopup.width = Math.max(relativePopup.width, relativeReference.width)
    } else if (options.autoFitPopupWidth) {
      relativePopup.width = relativeReference.width
    }

    const distance =
      options.popupOffset -
      (options.cover
        ? /^(left|right)/.test(options.placement)
          ? relativeReference.width
          : relativeReference.height
        : 0)
    const result = calculatePopupPosition(options.placement, relativeReference, relativePopup, {
      direction: context.direction?.value,
      origin: { left: space.x / space.scaleX, top: space.y / space.scaleY },
      scaleX: space.scaleX,
      scaleY: space.scaleY,
      distance,
      translate: options.popupTranslate,
      autoFitPosition: options.autoFitPosition,
      strategy: options.strategy,
      customStyle: options.popupStyle,
      view,
    })
    if (!current()) {
      return
    }
    actualPlacement.value = result.placement
    if (!current()) {
      return
    }
    popupStyle.value = {
      ...result.style,
      ...(options.autoFitPopupMinWidth ? { minWidth: `${relativeReference.width}px` } : {}),
      ...(options.autoFitPopupWidth ? { width: `${relativeReference.width}px` } : {}),
    }
    if (!current()) {
      return
    }
    wrapperStyle.value = options.autoFitTransformOrigin
      ? { transformOrigin: getTransformOrigin(result.placement, context.direction?.value) }
      : {}

    if (options.showArrow) {
      nextTick(() => {
        if (!current()) {
          return
        }
        const currentSpace = getPositioningSpace(popup, options.strategy)
        const currentReference = getRelativeRect(translatedReference, currentSpace)
        const currentPopup = getRelativeRect(popup.getBoundingClientRect(), currentSpace)
        if (!current()) {
          return
        }
        arrowStyle.value = getArrowStyle(actualPlacement.value, currentReference, currentPopup, {
          customStyle: options.arrowStyle,
        })
      })
    } else {
      arrowStyle.value = {}
    }
  }

  const scrolling = rafThrottle(
    (_event, eventTarget) => {
      const shouldClose = options.scrollToClose || context.globalScrollToClose.value
      if (shouldClose && eventTarget) {
        const target = eventTarget as HTMLElement
        const previous = scrollPositions.get(target) ?? [target.scrollTop, target.scrollLeft]
        scrollPositions.set(target, previous)
        if (
          Math.abs(target.scrollTop - previous[0]) >= options.scrollToCloseDistance ||
          Math.abs(target.scrollLeft - previous[1]) >= options.scrollToCloseDistance
        ) {
          context.requestClose()
          return
        }
      }
      update()
    },
    () => context.popup.value?.ownerDocument.defaultView,
  )

  const pendingWindowDocuments = new Set<Document>()
  const windowScrolling = rafThrottle(
    () => {
      for (const document of pendingWindowDocuments) {
        const root = document.scrollingElement ?? document.documentElement
        const current: [number, number] = [root.scrollTop, root.scrollLeft]
        const previous = windowPositions.get(document) ?? current
        if (
          (options.scrollToClose || context.globalScrollToClose.value) &&
          (Math.abs(current[0] - previous[0]) >= options.scrollToCloseDistance ||
            Math.abs(current[1] - previous[1]) >= options.scrollToCloseDistance)
        ) {
          pendingWindowDocuments.clear()
          context.requestClose()
          return
        }
      }
      pendingWindowDocuments.clear()
      update()
    },
    () => context.popup.value?.ownerDocument.defaultView,
  )

  function onWindowScroll(event: Event) {
    const view = event.currentTarget as Window | null
    if (view?.document) {
      pendingWindowDocuments.add(view.document)
    }
    windowScrolling(event)
  }

  function unbindScroll() {
    scrolling.cancel()
    windowScrolling.cancel()
    pendingWindowDocuments.clear()
    for (const element of scrollElements) {
      element.removeEventListener('scroll', scrolling)
    }
    for (const view of scrollViews) {
      view.removeEventListener('scroll', onWindowScroll)
    }
    for (const slot of slotRoots) {
      slot.removeEventListener('slotchange', onSlotChange)
    }
    slotRoots = []
    scrollViews = []
    scrollElements = []
    scrollPositions = new WeakMap()
    windowPositions = new WeakMap()
  }

  function onSlotChange() {
    positionGeneration++
    const reference = context.reference.value
    const popup = context.popup.value
    const nextElements = [...new Set([...getScrollElements(reference), ...getScrollElements(popup)])]
    const nextViews = [...new Set([...getScrollViews(reference), ...getScrollViews(popup)])]
    const nextRoots = [...new Set([...getSlotChangeRoots(reference), ...getSlotChangeRoots(popup)])]
    function changed<T>(before: T[], after: T[]) {
      return before.length !== after.length || before.some((item, index) => item !== after[index])
    }
    if (changed(scrollElements, nextElements) || changed(scrollViews, nextViews) || changed(slotRoots, nextRoots)) {
      bindScroll()
    }
    nextTick(update)
  }

  function bindScroll() {
    unbindScroll()
    const reference = context.reference.value
    const popup = context.popup.value
    const active =
      options.updateAtScroll ||
      options.scrollToClose ||
      context.globalUpdateAtScroll.value ||
      context.globalScrollToClose.value
    if (!active || !reference || !popup || !context.visible.value || suspended) {
      return
    }
    slotRoots = [...new Set([...getSlotChangeRoots(reference), ...getSlotChangeRoots(popup)])]
    for (const slot of slotRoots) {
      slot.addEventListener('slotchange', onSlotChange)
    }
    scrollElements = [...new Set([...getScrollElements(reference), ...getScrollElements(popup)])]
    for (const element of scrollElements) {
      scrollPositions.set(element, [element.scrollTop, element.scrollLeft])
      element.addEventListener('scroll', scrolling, { passive: true })
    }
    scrollViews = [...new Set([...getScrollViews(reference), ...getScrollViews(popup)])]
    for (const view of scrollViews) {
      const root = view.document.scrollingElement ?? view.document.documentElement
      windowPositions.set(view.document, [root.scrollTop, root.scrollLeft])
      view.addEventListener('scroll', onWindowScroll, { passive: true })
    }
  }

  watch(
    () => [context.visible.value, context.reference.value, context.popup.value, context.container?.value],
    () => {
      positionGeneration++
    },
    { flush: 'sync' },
  )

  watch(
    () => [
      context.visible.value,
      context.reference.value,
      context.popup.value,
      context.container?.value,
      options.updateAtScroll,
      options.scrollToClose,
      options.scrollToCloseDistance,
      context.globalUpdateAtScroll.value,
      context.globalScrollToClose.value,
    ],
    () => {
      bindScroll()
      nextTick(update)
    },
    { flush: 'post' },
  )
  watch(
    () => [
      options.placement,
      options.strategy,
      options.cover,
      options.popupOffset,
      options.popupTranslate,
      options.popupStyle,
      options.arrowStyle,
      options.showArrow,
      options.autoFitPopupWidth,
      options.autoFitPopupMinWidth,
      options.autoFitPosition,
      options.autoFitTransformOrigin,
      context.point.value,
      context.direction?.value,
    ],
    () => nextTick(update),
    { deep: true },
  )

  useTriggerResize(
    () => [
      options.autoFixPosition ? context.reference.value : undefined,
      context.popup.value,
      context.popup.value?.offsetParent,
    ],
    () => context.visible.value,
    (entries) => {
      update()
      if (entries.some((entry) => entry.target === context.reference.value)) {
        context.referenceResize()
      }
    },
  )

  onMounted(() => nextTick(update))
  onActivated(() => {
    suspended = false
    bindScroll()
    nextTick(update)
  })
  onDeactivated(() => {
    suspended = true
    positionGeneration++
    unbindScroll()
  })
  onBeforeUnmount(() => {
    suspended = true
    positionGeneration++
    unbindScroll()
  })

  return { actualPlacement, popupStyle, wrapperStyle, arrowStyle, referenceSize, update }
}
