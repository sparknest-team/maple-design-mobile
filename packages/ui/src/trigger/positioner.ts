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
import { createFrame } from '../_utils/animation-frame'
import type { ReadingDirection } from '../_utils/direction'
import { getArrowStyle } from './arrow'
import type { TriggerPlacement } from './contract'
import { getPositioningSpace, getRelativeRect, getTransformOrigin, translateRectBetweenDocuments } from './geometry'
import { calculatePopupPosition, positionAncestors } from './position'
import { observeReferenceMotion, trackPopupAnchor } from './reference-motion'
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

export function useTriggerPositioner(options: PositionerOptions, context: PositionerContext): TriggerPositioner {
  const actualPlacement = ref<TriggerPlacement>(options.placement)
  const popupStyle = ref<CSSProperties>({})
  const wrapperStyle = ref<CSSProperties>({})
  const arrowStyle = ref<CSSProperties>({})
  const referenceSize = ref({ width: 0, height: 0 })
  let suspended = false
  let positionGeneration = 0
  type ScrollTarget = HTMLElement | Window
  const scrollPositions = new Map<ScrollTarget, [number, number]>()
  const pendingScroll = new Set<ScrollTarget>()
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
      ? { top: point.y, left: point.x, width: 0, height: 0 }
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
    const focusRoot = reference.getRootNode() as Document | ShadowRoot
    const focused = focusRoot.activeElement
    const result = calculatePopupPosition(options.placement, relativeReference, relativePopup, {
      // Keep the active combobox visible when neither vertical placement fits above the keyboard.
      keepVerticalAnchor: !point && focused?.matches('[role="combobox"]') && reference.contains(focused),
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

  function scrollRoot(target: ScrollTarget) {
    return 'ownerDocument' in target ? target : (target.document.scrollingElement ?? target.document.documentElement)
  }

  function rafThrottle(callback: () => void) {
    const frame = createFrame()
    const run = (event?: Event) => {
      const view =
        (event?.target as Node | null)?.ownerDocument?.defaultView ?? context.popup.value?.ownerDocument.defaultView
      if (view) {
        frame.request(view, callback)
      }
    }
    run.cancel = frame.cancel
    return run
  }

  const scrolling = rafThrottle(() => {
    let close = false
    if (options.scrollToClose || context.globalScrollToClose.value) {
      for (const target of pendingScroll) {
        const previous = scrollPositions.get(target)
        const root = scrollRoot(target)
        if (
          previous &&
          (Math.abs(root.scrollTop - previous[0]) >= options.scrollToCloseDistance ||
            Math.abs(root.scrollLeft - previous[1]) >= options.scrollToCloseDistance)
        ) {
          close = true
          break
        }
      }
    }
    pendingScroll.clear()
    if (close) {
      context.requestClose()
    } else {
      update()
    }
  })

  function onScroll(event: Event) {
    const target = event.currentTarget as ScrollTarget
    if (scrollPositions.has(target)) {
      pendingScroll.add(target)
      scrolling(event)
    }
  }

  function ancestors() {
    return positionAncestors([context.reference.value, context.popup.value], true)
  }

  const motionUpdate = rafThrottle(update)
  let stopMotion: (() => void) | undefined
  let stopTracking: (() => void) | undefined

  function unbindScroll() {
    stopTracking?.()
    stopTracking = undefined
    stopMotion?.()
    stopMotion = undefined
    motionUpdate.cancel()
    scrolling.cancel()
    pendingScroll.clear()
    for (const target of scrollPositions.keys()) {
      target.removeEventListener('scroll', onScroll)
    }
    scrollPositions.clear()
    for (const root of slotRoots) {
      root.removeEventListener('slotchange', onSlotChange)
    }
    slotRoots = []
  }

  function onSlotChange() {
    positionGeneration++
    const { targets, roots } = ancestors()
    function changed<T>(before: T[], after: T[]) {
      return before.length !== after.length || before.some((item, index) => item !== after[index])
    }
    if (changed([...scrollPositions.keys()], targets) || changed(slotRoots, roots)) {
      bindScroll()
    }
    nextTick(update)
  }

  function bindScroll() {
    unbindScroll()
    const reference = context.reference.value
    const popup = context.popup.value
    if (!reference || !popup || !context.visible.value || suspended) {
      return
    }
    const updateAtScroll = options.updateAtScroll || context.globalUpdateAtScroll.value
    if (options.autoFixPosition) {
      stopMotion = observeReferenceMotion(reference, motionUpdate)
      // A keyboard opened elsewhere can pan any element-anchored popup on a touch device.
      const touchPoints = reference.ownerDocument.defaultView?.navigator.maxTouchPoints ?? 0
      if (!context.point.value && (touchPoints > 0 || updateAtScroll)) {
        stopTracking = trackPopupAnchor(reference, popup, update)
      }
    }
    if (!updateAtScroll && !options.scrollToClose && !context.globalScrollToClose.value) {
      return
    }
    const { targets, roots } = ancestors()
    slotRoots = roots
    for (const slot of roots) {
      slot.addEventListener('slotchange', onSlotChange)
    }
    for (const target of targets) {
      const root = scrollRoot(target)
      scrollPositions.set(target, [root.scrollTop, root.scrollLeft])
      target.addEventListener('scroll', onScroll, { passive: true })
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
      Boolean(context.point.value),
      options.autoFixPosition,
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
  function suspend() {
    suspended = true
    positionGeneration++
    unbindScroll()
  }
  onDeactivated(suspend)
  onBeforeUnmount(suspend)

  return { actualPlacement, popupStyle, wrapperStyle, arrowStyle, referenceSize, update }
}
