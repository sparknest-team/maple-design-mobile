<template>
  <div
    ref="card"
    v-ripple="{ disabled: !ripple || floater }"
    :class="
      classes(
        n(),
        [isRow, n('--direction-row')],
        [direction === 'row-reverse', n('--direction-row-reverse')],
        n(`--size-${mergedSize}`),
        n(`--variant-${variant}`),
        [hoverable, n('--hoverable')],

        [variant === 'default', formatElevation(elevation, 1)],
      )
    "
    :style="{
      zIndex: floated ? zIndex : undefined,
    }"
    @focusin="onCardFocus"
    @click="handleClick"
  >
    <div
      ref="cardFloater"
      :class="n('floater')"
      :style="{
        width: floaterWidth,
        height: floaterHeight,
        top: floaterTop,
        left: floaterLeft,
        overflow: floaterOverflow,
        position: floaterPosition,
        zIndex: floated ? zIndex : undefined,
        background: variant === 'outline' && !floated ? 'transparent' : undefined,
        transition: floated
          ? `background-color ${duration}ms, color ${duration}ms, width ${duration}ms, height ${duration}ms, top ${duration}ms, left ${duration}ms`
          : undefined,
      }"
      @keydown="handleFloatingKeydown"
    >
      <slot name="cover">
        <img
          v-if="imageSrc"
          :class="n('image')"
          :style="{
            objectFit: imageFit,
            height: toSizeUnit(imageHeight),
            width: toSizeUnit(imageWidth),
          }"
          :src="imageSrc"
          :alt="imageAlt"
        />
      </slot>

      <div :class="n('container')">
        <slot name="header">
          <div v-if="title || $slots.title || $slots['title-action']" :class="n('title')" :style="titleStyle">
            <slot name="title" :slot-class="n('title-text')">
              <span v-if="title" :class="n('title-text')">{{ title }}</span>
            </slot>
            <span v-if="$slots['title-action']" :class="n('title-action')"><slot name="title-action" /></span>
          </div>
          <slot name="subtitle" :slot-class="n('subtitle')">
            <div v-if="subtitle" :class="n('subtitle')">{{ subtitle }}</div>
          </slot>
        </slot>
        <BaseDivider v-if="topDivider" :class="n('divider')" />
        <div v-if="$slots.default" :class="n('content')">
          <slot />
        </div>
        <slot name="description" :slot-class="n('description')">
          <div v-if="description" :class="n('description')">{{ description }}</div>
        </slot>
        <BaseDivider v-if="bottomDivider" :class="n('divider')" />
        <div v-if="$slots.footer" :class="n('footer')">
          <slot name="footer" />
        </div>
        <div
          v-if="$slots['floating-content'] && !isRow"
          ref="floatingContent"
          :class="n('floating-content')"
          :inert="!props.floating ? true : undefined"
          :aria-hidden="!props.floating || (!focusReveal && opacity === '0') ? true : undefined"
          :style="{
            height: contentHeight,
            opacity,
            transition: focusReveal ? 'none' : `opacity ${duration * 2}ms`,
          }"
        >
          <slot name="floating-content" />
        </div>
      </div>

      <div
        v-if="showFloatingButtons"
        ref="floatingButtons"
        :class="classes(n('floating-buttons'), n('$--box'))"
        :inert="!props.floating ? true : undefined"
        :aria-hidden="!props.floating || (!focusReveal && opacity === '0') ? true : undefined"
        :style="{
          zIndex,
          opacity,
          transition: focusReveal ? 'none' : `opacity ${duration * 2}ms`,
        }"
      >
        <slot name="close-button">
          <BaseButton
            data-card-cover
            :class="classes(n('close-button'), n('$-elevation--6'))"
            :aria-label="props.closeButtonAriaLabel ?? closeLabel"
            @click.stop="close"
          >
            <BaseIcon data-card-cover :class="n('close-button-icon')"><MIconClose /></BaseIcon>
          </BaseButton>
        </slot>
      </div>
    </div>

    <div
      :class="n('holder')"
      :style="{
        width: holderWidth,
        height: holderHeight,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, shallowRef, watch } from 'vue'
import { IconClose as MIconClose } from '@maple-design/icons-vue'
import { doubleRaf, getRect } from '@maple-design/shared-vue'
import { isShadowRoot } from '../_utils/is-shadow-root'
import BaseButton from '../button/base'
import { useLock } from '../context/lock'
import { useZIndex } from '../context/zIndex'
import BaseDivider from '../divider'
import BaseIcon from '../icon'
import vRipple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { usePopupLayer } from '../utils/popup-layer'
import { watchDetachedCard } from './detached-card-monitor'
import { useCardCloseLabel, useCardSize } from './platform'
import { cardProps } from './props'

defineOptions({ name: createNamespace('card').name })
const { n, classes } = createNamespace('card')
const props = defineProps(cardProps)
const emit = defineEmits<{ click: [event: Event]; 'update:floating': [value: boolean] }>()
const mergedSize = useCardSize(() => props.size)
const closeLabel = useCardCloseLabel()
const duration = computed(() =>
  Number.isFinite(props.floatingDuration) && props.floatingDuration >= 0 ? props.floatingDuration : 250,
)
const RIPPLE_DELAY = 500
const card = ref<null | HTMLElement>(null)
const cardFloater = ref<null | HTMLElement>(null)
const floatingContent = ref<null | HTMLElement>(null)
const floatingButtons = ref<null | HTMLElement>(null)
const holderWidth = ref('auto')
const holderHeight = ref('auto')
const floaterWidth = ref('100%')
const floaterHeight = ref('100%')
const floaterTop = ref('auto')
const floaterLeft = ref('auto')
const floaterPosition = ref<'static' | 'absolute' | 'fixed' | 'relative' | 'sticky' | undefined>(undefined)
const floaterOverflow = ref('hidden')
const contentHeight = ref('0px')
const opacity = ref('0')
const focusReveal = ref(false)
const isRow = computed(() => props.direction !== 'column')
const showFloatingButtons = ref(false)
const floated = ref(false)
const { zIndex } = useZIndex(() => props.floating && !isRow.value, 1)

let generation = 0
let active = true
let disposed = false
let dropdownFloaterTop = 'auto'
let dropdownFloaterLeft = 'auto'
let dropper: ReturnType<typeof setTimeout> | undefined
const floater = shallowRef<ReturnType<typeof setTimeout> | null>(null)

const cardDocument = shallowRef<Document>()
const cardConnected = ref(true)

useLock(
  () => props.floating,
  () => !isRow.value && cardConnected.value,
  () => (cardDocument.value ?? card.value?.ownerDocument)?.body,
)

let previousFocusRoot: Document | ShadowRoot | undefined
function focusedCardContext(): Element | null {
  const element = card.value
  if (!element) {
    return null
  }
  const root = element.getRootNode()
  if ('activeElement' in root) {
    previousFocusRoot = root as Document | ShadowRoot
  }
  if (
    previousFocusRoot &&
    previousFocusRoot !== element.ownerDocument &&
    previousFocusRoot.ownerDocument !== element.ownerDocument
  ) {
    previousFocusRoot = undefined
  }
  let focused = (previousFocusRoot?.activeElement ?? element.ownerDocument.activeElement) as Element | null
  while (focused?.shadowRoot?.activeElement) {
    focused = focused.shadowRoot.activeElement
  }
  return focused
}
function closestAcrossRoots(element: Element | null, selector: string): Element | null {
  while (element) {
    const match = element.closest(selector)
    if (match) {
      return match
    }
    const root = element.getRootNode()
    element = isShadowRoot(root) ? root.host : null
  }
  return null
}
function composedContains(container: Element | null, element: Element | null): boolean {
  while (container && element) {
    if (container.contains(element)) {
      return true
    }
    const root = element.getRootNode()
    element = isShadowRoot(root) ? root.host : null
  }
  return false
}

onMounted(() => {
  focusedCardContext()
  if (wantsFloating()) {
    trackFocusRoot()
  }
})

let returnFocus: HTMLElement | null = null
function onCardFocus(event: FocusEvent) {
  // A child may focus itself while the opening animation is still waiting.
  // Reveal that content immediately so focus is not left in a clipped, transparent area.
  if (
    wantsFloating() &&
    (composedContains(floatingContent.value, event.target as Element | null) ||
      composedContains(floatingButtons.value, event.target as Element | null))
  ) {
    focusReveal.value = true
    contentHeight.value = 'auto'
    opacity.value = '1'
    floaterOverflow.value =
      openingWaiting && composedContains(floatingButtons.value, event.target as Element | null) ? 'visible' : 'auto'
  }
  const related = event.relatedTarget as HTMLElement | null
  const document = card.value?.ownerDocument
  if (
    !active &&
    wantsFloating() &&
    related &&
    typeof related.focus === 'function' &&
    !composedContains(card.value, related) &&
    related !== document?.body &&
    related !== document?.documentElement
  ) {
    returnFocus = related
  }
  focusedCardContext()
}
let stopInactiveFocusTracking: (() => void) | undefined
function trackInactiveFocus() {
  stopInactiveFocusTracking?.()
  const document = card.value?.ownerDocument
  if (!document) {
    return
  }
  const remember = (target: EventTarget | null) => {
    const element = target as HTMLElement | null
    if (
      element &&
      typeof element.focus === 'function' &&
      !composedContains(card.value, element) &&
      element !== document.body &&
      element !== document.documentElement
    ) {
      returnFocus = element
    }
  }
  remember(focusedCardContext())
  const onFocus = () => remember(focusedCardContext())
  document.addEventListener('focusin', onFocus, true)
  stopInactiveFocusTracking = () => document.removeEventListener('focusin', onFocus, true)
}
function updateReturnFocus(open: boolean) {
  const document = card.value?.ownerDocument
  if (!document) {
    return
  }
  const focused = focusedCardContext() as HTMLElement | null
  if (open) {
    returnFocus = focused && focused !== document.body && focused !== document.documentElement ? focused : null
    return
  }
  const target = returnFocus
  returnFocus = null
  const hiddenArea = closestAcrossRoots(focused, `.${n('floating-content')}, .${n('floating-buttons')}`)
  if (
    hiddenArea &&
    cardFloater.value?.contains(hiddenArea) &&
    target?.isConnected &&
    !closestAcrossRoots(target, '[inert]')
  ) {
    target.focus({ preventScroll: true })
  }
}

const wantsFloating = () => props.floating && !isRow.value
const { onStackTop, syncOwner } = usePopupLayer(
  () => wantsFloating() && cardConnected.value,
  zIndex,
  () => cardDocument.value ?? card.value?.ownerDocument,
  true,
)
const available = () => active && !disposed
let focusRootObserver: MutationObserver | undefined
let stopDetachedCard: (() => void) | undefined
function stopFocusRootTracking() {
  stopDetachedCard?.()
  stopDetachedCard = undefined
  focusRootObserver?.disconnect()
  focusRootObserver = undefined
}
function trackFocusRoot() {
  stopFocusRootTracking()
  const element = card.value
  if (element) {
    cardDocument.value = element.ownerDocument
  }
  const Observer = element?.ownerDocument.defaultView?.MutationObserver
  if (!element || !Observer || !available() || !wantsFloating()) {
    return
  }
  let ancestors: Node[] = []
  const update = () => {
    if (!available() || !wantsFloating() || card.value !== element) {
      return
    }
    cardDocument.value = element.ownerDocument
    cardConnected.value = element.isConnected
    if (element.isConnected) {
      stopDetachedCard?.()
      stopDetachedCard = undefined
    } else if (!stopDetachedCard) {
      stopDetachedCard = watchDetachedCard(() => {
        if (element.isConnected) {
          update()
        }
      })
    }
    if (motionDocument !== element.ownerDocument) {
      trackMotion(element)
    }
    if (openingFrameDocument && openingFrameDocument !== element.ownerDocument && openingWaiting) {
      floating(true)
    }
    const root = element.getRootNode()
    if ('activeElement' in root) {
      previousFocusRoot = root as Document | ShadowRoot
    }
    const next: Node[] = []
    let node: Node | null = element.parentNode
    while (node) {
      next.push(node)
      node = node.parentNode ?? (isShadowRoot(node) ? node.host : null)
    }
    if (next.length === ancestors.length && next.every((entry, index) => entry === ancestors[index])) {
      return
    }
    focusRootObserver?.disconnect()
    ancestors = next
    for (const ancestor of ancestors) {
      focusRootObserver?.observe(ancestor, { childList: true })
    }
  }
  focusRootObserver = new Observer(update)
  update()
}
let openingWaiting = false
let openingFrameDocument: Document | undefined
let cancelOpeningFrames: (() => void) | undefined
function waitForOwnerFrames(view: Window): Promise<boolean> {
  cancelOpeningFrames?.()
  return new Promise((resolve) => {
    let handle: number | undefined
    let settled = false
    const finish = (completed: boolean) => {
      if (settled) {
        return
      }
      settled = true
      if (cancelOpeningFrames === cancel) {
        cancelOpeningFrames = undefined
      }
      resolve(completed)
    }
    const cancel = () => {
      if (handle !== undefined) {
        view.cancelAnimationFrame?.(handle)
      }
      finish(false)
    }
    cancelOpeningFrames = cancel
    handle = view.requestAnimationFrame(() => {
      if (settled) {
        return
      }
      handle = view.requestAnimationFrame(() => finish(true))
    })
  })
}
let reducedMotion = false
let motionDocument: Document | undefined
let stopMotionTracking: (() => void) | undefined
function trackMotion(element: HTMLElement | null) {
  stopMotionTracking?.()
  stopMotionTracking = undefined
  reducedMotion = false
  motionDocument = element?.ownerDocument
  const view = element?.ownerDocument.defaultView
  if (!view || typeof view.matchMedia !== 'function') {
    return
  }
  const query = view.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = query.matches
  const change = (event: MediaQueryListEvent) => {
    reducedMotion = event.matches
    if (!reducedMotion || !available()) {
      return
    }
    if (wantsFloating() && openingWaiting) {
      floating()
    } else if (!wantsFloating() && dropper !== undefined) {
      dropdown()
    }
  }
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', change)
    stopMotionTracking = () => query.removeEventListener('change', change)
  } else if (typeof query.addListener === 'function') {
    query.addListener(change)
    stopMotionTracking = () => query.removeListener(change)
  }
  if (reducedMotion && available()) {
    if (wantsFloating() && openingWaiting) {
      floating()
    } else if (!wantsFloating() && dropper !== undefined) {
      dropdown()
    }
  }
}
watch(
  card,
  (element) => {
    if (available()) {
      trackMotion(element)
    }
    if (element && wantsFloating() && available()) {
      updateReturnFocus(true)
      trackFocusRoot()
    }
  },
  { flush: 'sync' },
)
function current(token: number, element: HTMLElement | null) {
  return available() && token === generation && card.value === element
}

watch(
  wantsFloating,
  (value) => {
    const token = ++generation
    cancelOpeningFrames?.()
    if (!active) {
      if (!disposed && value) {
        trackInactiveFocus()
      } else {
        stopInactiveFocusTracking?.()
        stopInactiveFocusTracking = undefined
        returnFocus = null
      }
      return
    }
    updateReturnFocus(value)
    if (value) {
      trackFocusRoot()
    } else {
      stopFocusRootTracking()
    }
    let consumed = false
    nextTick(() => {
      if (!available() || token !== generation || consumed || value !== wantsFloating()) {
        return
      }
      consumed = true
      if (value) {
        floating()
      } else if (
        floater.value !== null ||
        floated.value ||
        floaterPosition.value !== undefined ||
        contentHeight.value !== '0px'
      ) {
        dropdown()
      }
    })
  },
  { immediate: true, flush: 'sync' },
)

function floating(skipRippleDelay = false) {
  if (!available() || !wantsFloating()) {
    return
  }
  const token = ++generation
  cancelOpeningFrames?.()
  openingFrameDocument = undefined
  const element = card.value
  let consumed = false
  clearTimeout(floater.value ?? undefined)
  clearTimeout(dropper)
  dropper = undefined
  openingWaiting = true
  floater.value = setTimeout(
    async () => {
      if (!element || !current(token, element) || !wantsFloating() || consumed) {
        return
      }
      consumed = true
      const { width, height, left, top } = getRect(element)
      // Measurement can invoke application-provided geometry hooks.
      if (!current(token, element) || !wantsFloating()) {
        return
      }
      holderWidth.value = toSizeUnit(width)!
      holderHeight.value = toSizeUnit(height)!
      floaterWidth.value = holderWidth.value
      floaterHeight.value = holderHeight.value
      floaterTop.value = toSizeUnit(top)!
      floaterLeft.value = toSizeUnit(left)!
      floaterPosition.value = 'fixed'
      dropdownFloaterTop = floaterTop.value
      dropdownFloaterLeft = floaterLeft.value
      showFloatingButtons.value = true

      // The existing non-abortable helper still settles; only this continuation
      // owns permission to expand. It is not a CSS animation-duration timer.
      if (!reducedMotion) {
        openingFrameDocument = element.ownerDocument
        const view = element.ownerDocument.defaultView
        if (
          view &&
          typeof document !== 'undefined' &&
          element.ownerDocument !== document &&
          typeof view.requestAnimationFrame === 'function'
        ) {
          if (!(await waitForOwnerFrames(view))) {
            return
          }
        } else {
          await doubleRaf()
        }
      }
      if (!current(token, element) || !wantsFloating()) {
        return
      }
      openingFrameDocument = undefined
      openingWaiting = false
      floaterTop.value = '0'
      floaterLeft.value = '0'
      floaterWidth.value = '100vw'
      floaterHeight.value = '100vh'
      contentHeight.value = 'auto'
      opacity.value = '1'
      floaterOverflow.value = 'auto'
      floated.value = true
    },
    props.ripple && !reducedMotion && !skipRippleDelay ? RIPPLE_DELAY : 0,
  )
}

function dropdown() {
  if (!available() || wantsFloating()) {
    return
  }
  const token = ++generation
  cancelOpeningFrames?.()
  openingFrameDocument = undefined
  const element = card.value
  let consumed = false
  clearTimeout(dropper)
  clearTimeout(floater.value ?? undefined)
  openingWaiting = false
  floater.value = null
  if (element && floaterPosition.value === 'fixed') {
    const { width, height, left, top } = getRect(element)
    if (!current(token, element) || wantsFloating()) {
      return
    }
    holderWidth.value = toSizeUnit(width)!
    holderHeight.value = toSizeUnit(height)!
    dropdownFloaterTop = toSizeUnit(top)!
    dropdownFloaterLeft = toSizeUnit(left)!
  }
  floaterWidth.value = holderWidth.value
  floaterHeight.value = holderHeight.value
  floaterTop.value = dropdownFloaterTop
  floaterLeft.value = dropdownFloaterLeft
  contentHeight.value = '0px'
  focusReveal.value = false
  opacity.value = '0'
  showFloatingButtons.value = false
  dropper = setTimeout(
    () => {
      if (!current(token, element) || wantsFloating() || consumed) {
        return
      }
      consumed = true
      dropper = undefined
      holderWidth.value = 'auto'
      holderHeight.value = 'auto'
      floaterWidth.value = '100%'
      floaterHeight.value = '100%'
      floaterTop.value = 'auto'
      floaterLeft.value = 'auto'
      dropdownFloaterTop = 'auto'
      dropdownFloaterLeft = 'auto'
      floaterOverflow.value = 'hidden'
      floaterPosition.value = undefined
      floated.value = false
    },
    reducedMotion ? 0 : duration.value,
  )
}
function handleFloatingKeydown(event: KeyboardEvent) {
  if (
    !available() ||
    !wantsFloating() ||
    event.key !== 'Escape' ||
    event.isComposing ||
    event.keyCode === 229 ||
    event.defaultPrevented
  ) {
    return
  }
  // Let the browser dispatch cancel to a nested native dialog first.
  const insideNativeModal = event.composedPath().some((target) => {
    const dialog = target as HTMLDialogElement
    if (dialog.localName !== 'dialog' || !dialog.open) {
      return false
    }
    if ('closedBy' in dialog && ['closerequest', 'any'].includes(String(dialog.closedBy))) {
      return true
    }
    return !dialog.ownerDocument.defaultView?.CSS?.supports('selector(:modal)') || dialog.matches(':modal')
  })
  if (insideNativeModal) {
    return
  }
  const owner = card.value?.ownerDocument
  if (owner && cardDocument.value !== owner) {
    cardDocument.value = owner
    syncOwner()
  }
  if (card.value?.isConnected && !cardConnected.value) {
    cardConnected.value = true
    syncOwner()
  }
  if (!onStackTop(event)) {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  close()
}
function close() {
  if (available()) {
    emit('update:floating', false)
  }
}
function handleClick(e: Event) {
  if (available()) {
    emit('click', e)
  }
}
onBeforeUnmount(() => {
  stopFocusRootTracking()
  disposed = true
  stopMotionTracking?.()
  stopMotionTracking = undefined
  stopInactiveFocusTracking?.()
  stopInactiveFocusTracking = undefined
  cleanup()
})
onDeactivated(() => {
  stopFocusRootTracking()
  stopMotionTracking?.()
  stopMotionTracking = undefined
  cleanup()
  if (!disposed && wantsFloating()) {
    trackInactiveFocus()
  }
})
onActivated(() => {
  if (disposed || active) {
    return
  }
  active = true
  trackMotion(card.value)
  stopInactiveFocusTracking?.()
  stopInactiveFocusTracking = undefined
  if (wantsFloating()) {
    trackFocusRoot()
    if (!composedContains(card.value, focusedCardContext())) {
      updateReturnFocus(true)
    }
    floating()
  } else if (floaterPosition.value !== undefined || floated.value || contentHeight.value !== '0px') {
    dropdown()
  }
})
function cleanup() {
  cancelOpeningFrames?.()
  openingFrameDocument = undefined
  openingWaiting = false
  active = false
  generation++
  clearTimeout(floater.value ?? undefined)
  clearTimeout(dropper)
  floater.value = null
  dropper = undefined
}
</script>
