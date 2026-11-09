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
import { calculatePopupPosition, getScrollElements, getScrollViews } from './position'
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

function rafThrottle(callback: (event?: Event) => void, ownerView: () => Window | null | undefined) {
  let frame: number | undefined
  let frameView: Window | undefined
  let latest: Event | undefined
  let generation = 0
  const run = (event?: Event) => {
    latest = event
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
      latest = undefined
      callback(currentEvent)
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
  let scrollElements: HTMLElement[] = []
  let scrollPositions = new WeakMap<Element, [number, number]>()
  let windowPositions = new WeakMap<Document, [number, number]>()
  let scrollViews: Window[] = []

  function update() {
    const reference = context.reference.value
    const popup = context.popup.value
    if (!reference || !popup || !context.visible.value || suspended) {
      return
    }

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
    if (!translatedReference) {
      return
    }
    const relativeReference = getRelativeRect(translatedReference, space)
    const relativePopup = getRelativeRect(popup.getBoundingClientRect(), space)
    referenceSize.value = { width: relativeReference.width, height: relativeReference.height }
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
    actualPlacement.value = result.placement
    popupStyle.value = {
      ...result.style,
      ...(options.autoFitPopupMinWidth ? { minWidth: `${relativeReference.width}px` } : {}),
      ...(options.autoFitPopupWidth ? { width: `${relativeReference.width}px` } : {}),
    }
    wrapperStyle.value = options.autoFitTransformOrigin
      ? { transformOrigin: getTransformOrigin(result.placement, context.direction?.value) }
      : {}

    if (options.showArrow) {
      nextTick(() => {
        if (!context.popup.value || !context.reference.value || !context.visible.value) {
          return
        }
        const currentSpace = getPositioningSpace(context.popup.value, options.strategy)
        const currentReference = getRelativeRect(translatedReference, currentSpace)
        const currentPopup = getRelativeRect(context.popup.value.getBoundingClientRect(), currentSpace)
        arrowStyle.value = getArrowStyle(actualPlacement.value, currentReference, currentPopup, {
          customStyle: options.arrowStyle,
        })
      })
    } else {
      arrowStyle.value = {}
    }
  }

  const scrolling = rafThrottle(
    (event) => {
      const shouldClose = options.scrollToClose || context.globalScrollToClose.value
      if (shouldClose && event?.target) {
        const target = event.target as HTMLElement
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
    scrollViews = []
    scrollElements = []
    scrollPositions = new WeakMap()
    windowPositions = new WeakMap()
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
    () => [
      context.visible.value,
      context.reference.value,
      context.popup.value,
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
    unbindScroll()
  })
  onBeforeUnmount(unbindScroll)

  return { actualPlacement, popupStyle, wrapperStyle, arrowStyle, referenceSize, update }
}
