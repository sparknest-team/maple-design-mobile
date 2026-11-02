<template><Render /></template>
<script setup lang="ts">
import {
  cloneVNode,
  computed,
  Fragment,
  h,
  isVNode,
  mergeProps,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  ref,
  useAttrs,
  watch,
  type CSSProperties,
  type VNode,
} from 'vue'
import { useDirection } from '../_utils/direction'
import { createNamespace } from '../utils/components'
import { carouselInjectionKey } from './context'
import { DownIcon, NextIcon, PreviousIcon, UpIcon } from './icons'
import { carouselLayout, normalizeIndex, requiresSlideClone, slideOffset, visibleSlides } from './layout'
import { carouselProps } from './props'
import type { CarouselEmits, CarouselExpose, CarouselSlots, CarouselToOptions } from './types'
import { useCarouselLocale } from './use-carousel-locale'

defineOptions({ name: createNamespace('carousel').name, inheritAttrs: false })
const props = defineProps(carouselProps)
const emit = defineEmits<CarouselEmits>()
const slots = defineSlots<CarouselSlots>()
const attrs = useAttrs()
const text = useCarouselLocale()
const { n, classes } = createNamespace('carousel')
const root = ref<HTMLElement>()
const { isRtl } = useDirection(
  () => root.value,
  () => attrs.dir,
)
const axisSign = computed(() => (!vertical.value && isRtl.value ? -1 : 1))
const viewportEl = ref<HTMLElement>()
const track = ref<HTMLElement>()
const keys = ref<Array<string | number | symbol>>([])
const viewport = ref(0)
const measured = ref<number[]>([])
const measuredGap = ref(0)
const local = ref(props.defaultValue)
const current = computed(() => normalizeIndex((props.modelValue ?? local.value) - 1, keys.value.length))
const vertical = computed(() => props.orientation === 'vertical')
const layout = computed(() =>
  carouselLayout(
    viewport.value,
    keys.value.length,
    props.effect === 'fade' ? 1 : props.slidesPerView,
    measuredGap.value,
    measured.value,
  ),
)
const cycle = computed(() => layout.value.total + measuredGap.value)
const offset = computed(() =>
  props.loop
    ? (layout.value.offsets[current.value] || 0) -
      (props.centeredSlides ? (viewport.value - (layout.value.sizes[current.value] || viewport.value)) / 2 : 0)
    : slideOffset(layout.value, current.value, viewport.value, props.centeredSlides),
)
const motionOffset = ref<number>()
const noMotion = ref(false)
const transitionStart = ref<number>()
const renderedOffset = computed(() => motionOffset.value ?? offset.value)
function itemShift(index: number) {
  if (!props.loop || !cycle.value || props.effect === 'fade') {
    return 0
  }
  const position = Math.min(
    renderedOffset.value - dragOffset.value,
    transitionStart.value ?? renderedOffset.value - dragOffset.value,
  )
  const start = layout.value.offsets[index] || 0
  const size = layout.value.sizes[index] || 0
  return Math.ceil((position - start - size + 0.5) / cycle.value) * cycle.value
}
const visible = computed(() =>
  props.effect === 'fade'
    ? [current.value]
    : visibleSlides(
        { ...layout.value, offsets: layout.value.offsets.map((start, index) => start + itemShift(index)) },
        renderedOffset.value,
        viewport.value,
        current.value,
      ),
)
const hovering = ref(false)
const focused = ref(false)
const dragging = ref(false)
const dragOffset = ref(0)
let active = false
let disposed = false
let autoGeneration = 0
let bindingGeneration = 0
let renderGeneration = 0
let frameOwner: Window | undefined
let bindingResize: (() => void) | undefined
let bindingWheel: ((event: WheelEvent) => void) | undefined
let hidden = false
let timer: ReturnType<typeof setTimeout> | undefined
let motionGeneration = 0
let settleTimer: ReturnType<typeof setTimeout> | undefined
let animationFrame = 0
let observer: ResizeObserver | undefined
let visibilityObserver: MutationObserver | undefined
let owner: Document | undefined
let pointer: { id: number; start: number; cross: number; last: number; time: number; target: HTMLElement } | undefined
let suppressClick = false
const autoConfig = computed(() => {
  const config = props.autoPlay
  const raw =
    typeof config === 'object' ? (config.interval ?? 3000) : typeof config === 'number' ? config : config ? 3000 : 0
  return {
    interval: Number.isFinite(raw) && raw > 0 ? raw : 0,
    hover: typeof config === 'object' ? config.hoverToPause !== false : typeof config !== 'number',
  }
})
function stop() {
  autoGeneration++
  if (timer !== undefined) {
    clearTimeout(timer)
  }
  timer = undefined
}
function schedule() {
  stop()
  if (
    !active ||
    hidden ||
    owner?.visibilityState === 'hidden' ||
    focused.value ||
    dragging.value ||
    (hovering.value && autoConfig.value.hover) ||
    !autoConfig.value.interval ||
    keys.value.length < 2 ||
    (!props.loop && current.value === keys.value.length - 1)
  ) {
    return
  }
  const token = autoGeneration
  timer = setTimeout(() => {
    if (token !== autoGeneration || !active || disposed) {
      return
    }
    // Consume before to(): synchronous model listeners may suspend this instance.
    autoGeneration++
    timer = undefined
    toIndex(current.value + 1, { isManual: false })
  }, autoConfig.value.interval)
}
function to(slideNumber: number, options: CarouselToOptions = {}) {
  toIndex(slideNumber - 1, options)
}
function toIndex(index: number, options: CarouselToOptions = {}) {
  if (!active || disposed) {
    return
  }
  if (!keys.value.length || !Number.isFinite(index)) {
    return
  }
  const next = normalizeIndex(index, keys.value.length, props.loop)
  if (next === current.value) {
    return
  }
  const previous = current.value
  if (props.modelValue === undefined) {
    local.value = next + 1
  }
  // Controlled consumers must always receive the model proposal, even when notification is suppressed.
  emit('update:modelValue', next + 1)
  if (options.event !== false) {
    emit('change', next + 1, previous + 1, options.isManual ?? true)
  }
  schedule()
}
function next(options?: CarouselToOptions) {
  toIndex(current.value + 1, options)
}
function prev(options?: CarouselToOptions) {
  toIndex(current.value - 1, options)
}
function itemStyle(index: number): CSSProperties {
  if (props.effect === 'fade') {
    return {}
  }
  const dimension = vertical.value ? 'height' : 'width'
  const shift = itemShift(index)
  return {
    translate: shift ? (vertical.value ? '0 ' + shift + 'px' : shift * axisSign.value + 'px 0') : undefined,
    [dimension]:
      props.slidesPerView === 'auto'
        ? 'auto'
        : viewport.value
          ? layout.value.sizes[index] + 'px'
          : 100 / (Number(props.slidesPerView) || 1) + '%',
    flexShrink: 0,
  }
}
provide(carouselInjectionKey, {
  keys: computed(() => keys.value),
  current,
  visible,
  itemStyle,
  slideLabel: (index: number) => text.value.slide(index + 1, keys.value.length),
})
function checkVisibility() {
  hidden = false
  for (let el: HTMLElement | null | undefined = root.value; el; el = el.parentElement) {
    const style = el.ownerDocument.defaultView?.getComputedStyle(el)
    if (
      el.hidden ||
      el.getAttribute('aria-hidden') === 'true' ||
      style?.display === 'none' ||
      style?.visibility === 'hidden'
    ) {
      hidden = true
      break
    }
  }
}
function resize() {
  if (!active || !viewportEl.value) {
    return
  }
  checkVisibility()
  viewport.value = vertical.value ? viewportEl.value.clientHeight : viewportEl.value.clientWidth
  if (track.value) {
    const style = track.value.ownerDocument.defaultView?.getComputedStyle(track.value)
    const rawGap = vertical.value ? (style?.rowGap ?? '') : (style?.columnGap ?? '')
    if (rawGap.includes('%') || rawGap.includes('calc(')) {
      const probe = viewportEl.value.ownerDocument.createElement('div')
      Object.assign(probe.style, {
        position: 'absolute',
        visibility: 'hidden',
        pointerEvents: 'none',
        width: vertical.value ? '0' : rawGap,
        height: vertical.value ? rawGap : '0',
      })
      viewportEl.value.appendChild(probe)
      const rect = probe.getBoundingClientRect()
      measuredGap.value = Math.max(0, vertical.value ? rect.height : rect.width)
      probe.remove()
    } else {
      measuredGap.value = Math.max(0, parseFloat(rawGap) || 0)
    }
    const next = Array.from(track.value.children).map((el) => {
      const box = el.getBoundingClientRect()
      return vertical.value
        ? (el as HTMLElement).offsetHeight || box.height
        : (el as HTMLElement).offsetWidth || box.width
    })
    if (JSON.stringify(next) !== JSON.stringify(measured.value)) {
      measured.value = next
    }
  }
  schedule()
}
function editable(target: EventTarget | null) {
  return !!(target as Element | null)?.closest?.(
    'input,textarea,select,button,a,[contenteditable]:not([contenteditable="false"]),[data-carousel-no-drag]',
  )
}
function cancelPointer(clearClick = true) {
  if (clearClick) {
    suppressClick = false
  }
  const capture = pointer
  pointer = undefined
  dragging.value = false
  dragOffset.value = 0
  if (capture?.target.hasPointerCapture?.(capture.id)) {
    capture.target.releasePointerCapture(capture.id)
  }
  schedule()
}
function pointerDown(event: PointerEvent) {
  if (
    !active ||
    keys.value.length < 2 ||
    event.isPrimary === false ||
    event.button > 0 ||
    editable(event.target) ||
    (event.pointerType === 'mouse' ? !props.draggable : !props.touchable)
  ) {
    return
  }
  const target = event.currentTarget as HTMLElement
  pointer = {
    id: event.pointerId,
    start: vertical.value ? event.clientY : event.clientX,
    cross: vertical.value ? event.clientX : event.clientY,
    last: 0,
    time: Date.now(),
    target,
  }
  dragging.value = true
  suppressClick = false
  stop()
  target.setPointerCapture?.(event.pointerId)
}
function pointerMove(event: PointerEvent) {
  if (!pointer || pointer.id !== event.pointerId) {
    return
  }
  const delta = (vertical.value ? event.clientY : event.clientX) - pointer.start
  const cross = Math.abs((vertical.value ? event.clientX : event.clientY) - pointer.cross)
  if (Math.abs(delta) < cross && !suppressClick) {
    cancelPointer()
    return
  }
  pointer.last = delta
  if (Math.abs(delta) > 5) {
    suppressClick = true
    if (event.cancelable) {
      event.preventDefault()
    }
  }
  dragOffset.value = props.effect === 'fade' ? 0 : delta * axisSign.value
}
function pointerUp(event: PointerEvent) {
  if (!pointer || pointer.id !== event.pointerId) {
    return
  }
  const delta = (vertical.value ? event.clientY : event.clientX) - pointer.start
  const duration = Date.now() - pointer.time
  const threshold = Math.max(20, (layout.value.sizes[current.value] || viewport.value) / 4)
  const shouldMove = Math.abs(delta) >= threshold || (duration < 250 && Math.abs(delta) >= 20)
  cancelPointer(false)
  if (shouldMove) {
    suppressClick = true
  }
  if (shouldMove) {
    toIndex(current.value + (delta * axisSign.value < 0 ? 1 : -1))
  }
}
function keydown(event: KeyboardEvent) {
  if (!active || disposed) {
    return
  }
  if (!props.keyboard || editable(event.target) || event.altKey || event.ctrlKey || event.metaKey) {
    return
  }
  const previous = vertical.value ? 'ArrowUp' : isRtl.value ? 'ArrowRight' : 'ArrowLeft'
  const following = vertical.value ? 'ArrowDown' : isRtl.value ? 'ArrowLeft' : 'ArrowRight'
  if (![previous, following, 'Home', 'End'].includes(event.key)) {
    return
  }
  event.preventDefault()
  toIndex(
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? keys.value.length - 1
        : current.value + (event.key === previous ? -1 : 1),
  )
}
let wheelTime = 0
function wheel(event: WheelEvent) {
  if (!active || disposed) {
    return
  }
  if (!props.mousewheel || editable(event.target) || keys.value.length < 2 || Math.abs(event.deltaY) < 10) {
    return
  }
  if (event.cancelable) {
    event.preventDefault()
  }
  if (Date.now() - wheelTime < 200) {
    return
  }
  wheelTime = Date.now()
  toIndex(current.value + (event.deltaY > 0 ? 1 : -1))
}
function focusin() {
  if (!active || disposed) {
    return
  }
  focused.value = true
  schedule()
}
function focusout(event: FocusEvent) {
  if (!active || disposed) {
    return
  }
  if (!root.value?.contains(event.relatedTarget as Node)) {
    focused.value = false
    schedule()
  }
}
function attach() {
  if (disposed || active) {
    return
  }
  active = true
  owner = root.value?.ownerDocument
  const binding = ++bindingGeneration
  const measure = () => {
    if (active && binding === bindingGeneration) {
      resize()
    }
  }
  bindingResize = measure
  bindingWheel = (event) => {
    if (active && binding === bindingGeneration) {
      wheel(event)
    }
  }
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(measure)
    if (viewportEl.value) {
      observer.observe(viewportEl.value)
    }
    for (const el of Array.from(track.value?.children ?? [])) {
      observer.observe(el)
    }
  }
  if (typeof MutationObserver !== 'undefined') {
    visibilityObserver = new MutationObserver(measure)
    for (let el: HTMLElement | null | undefined = root.value; el; el = el.parentElement) {
      visibilityObserver.observe(el, { attributes: true, attributeFilter: ['class', 'style', 'hidden', 'aria-hidden'] })
    }
  }
  owner?.addEventListener('visibilitychange', measure)
  owner?.defaultView?.addEventListener('resize', measure)
  viewportEl.value?.addEventListener('wheel', bindingWheel, { passive: false })
  resize()
}
function cancelMotion() {
  motionGeneration++
  clearTimeout(settleTimer)
  settleTimer = undefined
  frameOwner?.cancelAnimationFrame(animationFrame)
  animationFrame = 0
  frameOwner = undefined
}
function detach() {
  active = false
  bindingGeneration++
  renderGeneration++
  cancelMotion()
  motionOffset.value = undefined
  noMotion.value = false
  cancelPointer()
  stop()
  observer?.disconnect()
  observer = undefined
  visibilityObserver?.disconnect()
  visibilityObserver = undefined
  if (bindingResize) {
    owner?.removeEventListener('visibilitychange', bindingResize)
    owner?.defaultView?.removeEventListener('resize', bindingResize)
  }
  if (bindingWheel) {
    viewportEl.value?.removeEventListener('wheel', bindingWheel)
  }
  bindingResize = undefined
  bindingWheel = undefined
  focused.value = false
  hovering.value = false
  transitionStart.value = undefined
}
onMounted(attach)
onActivated(attach)
onDeactivated(detach)
onBeforeUnmount(() => {
  disposed = true
  detach()
})
watch(
  current,
  (index, previous) => {
    cancelMotion()
    const generation = motionGeneration
    const element = track.value
    const view = owner?.defaultView
    const valid = () =>
      active &&
      !disposed &&
      generation === motionGeneration &&
      track.value === element &&
      element?.ownerDocument.defaultView === view
    schedule()
    let from =
      motionOffset.value ??
      (props.loop
        ? (layout.value.offsets[previous] || 0) -
          (props.centeredSlides ? (viewport.value - (layout.value.sizes[previous] || viewport.value)) / 2 : 0)
        : slideOffset(layout.value, previous, viewport.value, props.centeredSlides))
    const transform = track.value && owner?.defaultView?.getComputedStyle(track.value).transform
    if (transform?.startsWith('matrix(')) {
      const matrix = transform.slice(7, -1).split(',').map(Number)
      // CSS matrices are physical; loop windows use logical offsets.
      from = -(matrix[vertical.value ? 5 : 4] || 0) * axisSign.value
    }
    noMotion.value = false
    motionOffset.value = undefined
    transitionStart.value = undefined
    if (!active || !props.loop || props.effect === 'fade' || keys.value.length < 2 || !cycle.value) {
      return
    }
    if (previous === keys.value.length - 1 && index === 0) {
      motionOffset.value = offset.value + cycle.value
    } else if (previous === 0 && index === keys.value.length - 1) {
      motionOffset.value = offset.value - cycle.value
    }
    const destination = renderedOffset.value
    // One real instance cannot occupy two places. Snap if the union needs more than one cycle.
    if (requiresSlideClone(layout.value, from, destination, viewport.value, cycle.value)) {
      noMotion.value = true
      motionOffset.value = undefined
    } else {
      transitionStart.value = from
    }
    let scheduled = false
    nextTick(() => {
      if (!valid() || scheduled) {
        return
      }
      scheduled = true
      const raw = element && view?.getComputedStyle(element).transitionDuration
      const duration = props.moveSpeed ?? (raw ? parseFloat(raw) * (raw.includes('ms') ? 1 : 1000) : 180)
      if (!valid()) {
        return
      }
      let settled = false
      settleTimer = setTimeout(
        () => {
          if (!valid() || settled) {
            return
          }
          settled = true
          settleTimer = undefined
          noMotion.value = true
          motionOffset.value = undefined
          transitionStart.value = undefined
          if (view) {
            frameOwner = view
            let first = false
            animationFrame = view.requestAnimationFrame(() => {
              if (!valid() || first) {
                return
              }
              first = true
              animationFrame = 0
              let second = false
              animationFrame = view.requestAnimationFrame(() => {
                if (!valid() || second) {
                  return
                }
                second = true
                animationFrame = 0
                frameOwner = undefined
                noMotion.value = false
              })
            })
          }
        },
        noMotion.value ? 0 : Math.max(0, duration || 0),
      )
    })
  },
  { flush: 'sync' },
)
watch(
  () => [
    props.orientation,
    props.slidesPerView,
    props.spaceBetween,
    props.effect,
    props.centeredSlides,
    props.autoPlay,
    props.loop,
    props.touchable,
    props.draggable,
  ],
  () => {
    cancelMotion()
    noMotion.value = false
    motionOffset.value = undefined
    transitionStart.value = undefined
    cancelPointer()
    const binding = bindingGeneration
    nextTick(() => {
      if (active && binding === bindingGeneration) {
        resize()
      }
    })
  },
  { deep: true },
)
const toSize = (value: string | number | undefined) =>
  typeof value === 'number' || (typeof value === 'string' && /^\d+(\.\d+)?$/.test(value)) ? value + 'px' : value
function flatten(nodes: unknown): VNode[] {
  return (Array.isArray(nodes) ? nodes : [nodes]).flatMap((node) =>
    isVNode(node) ? (node.type === Fragment ? flatten(node.children) : [node]) : [],
  )
}
const Render = () => {
  const nodes = flatten(slots.default?.()).filter(
    (node) => (node.type as { name?: string }).name === createNamespace('carousel-item').name,
  )
  const items = nodes.map((node, index) => cloneVNode(node, { key: node.key ?? '__carousel_' + index }))
  const nextKeys = items.map((node) => node.key!)
  if (nextKeys.length !== keys.value.length || nextKeys.some((key, index) => key !== keys.value[index])) {
    keys.value = nextKeys
    const render = ++renderGeneration
    const binding = bindingGeneration
    nextTick(() => {
      if (
        active &&
        render === renderGeneration &&
        (binding === bindingGeneration || (binding === 0 && bindingGeneration === 1))
      ) {
        observer?.disconnect()
        if (viewportEl.value) {
          observer?.observe(viewportEl.value)
        }
        for (const el of Array.from(track.value?.children ?? [])) {
          observer?.observe(el)
        }
        resize()
      }
    })
  }
  const scope = {
    slideNumber: current.value + 1,
    length: keys.value.length,
    hovering: hovering.value,
    next,
    prev,
    to,
    resize,
  }
  const duration: CSSProperties = {
    '--mp-internal-carousel-duration':
      props.moveSpeed !== undefined && Number.isFinite(props.moveSpeed)
        ? Math.max(0, props.moveSpeed) + 'ms'
        : undefined,
    '--mp-internal-carousel-easing': props.transitionTimingFunction,
  }
  return h(
    'div',
    {
      ...attrs,
      ref: root,
      role: 'region',
      'aria-roledescription': 'carousel',
      'aria-label': props.ariaLabel ?? text.value.label,
      tabindex: props.keyboard ? 0 : undefined,
      class: [
        classes(
          n(),
          n('--' + props.effect),
          [vertical.value, n('--vertical')],
          [isRtl.value, n('--rtl')],
          [props.indicatorPosition === 'outer', n('--outer')],
        ),
        attrs.class,
      ],
      style: [duration, { height: toSize(props.height) }, attrs.style as CSSProperties],
      ...mergeProps(
        {
          onMouseenter: () => {
            hovering.value = true
            schedule()
          },
          onMouseleave: () => {
            hovering.value = false
            schedule()
          },
          onFocusin: focusin,
          onFocusout: focusout,
          onKeydown: keydown,
        },
        Object.fromEntries(
          Object.entries(attrs).filter(([key]) =>
            ['onMouseenter', 'onMouseleave', 'onFocusin', 'onFocusout', 'onKeydown'].includes(key),
          ),
        ),
      ),
    },
    [
      h(
        'div',
        {
          ref: viewportEl,
          class: n('viewport'),
          style: { touchAction: props.touchable ? (vertical.value ? 'pan-x' : 'pan-y') : 'auto' },
          onPointerdown: pointerDown,
          onPointermove: pointerMove,
          onPointerup: pointerUp,
          onPointercancel: () => cancelPointer(),
          onLostpointercapture: () => {
            if (pointer) {
              cancelPointer()
            }
          },
          onClickCapture: (event: MouseEvent) => {
            if (suppressClick) {
              event.preventDefault()
              event.stopPropagation()
              suppressClick = false
            }
          },
          onDragstart: (event: DragEvent) => {
            if (props.draggable && !editable(event.target)) {
              event.preventDefault()
            }
          },
        },
        [
          h(
            'div',
            {
              ref: track,
              class: n('track'),
              style: {
                gap: toSize(props.spaceBetween),
                transform:
                  props.effect === 'fade'
                    ? undefined
                    : 'translate' +
                      (vertical.value ? 'Y' : 'X') +
                      '(' +
                      (-renderedOffset.value + dragOffset.value) * axisSign.value +
                      'px)',
                transitionDuration: dragging.value || noMotion.value ? '0ms' : undefined,
              },
            },
            items,
          ),
        ],
      ),
      ...(props.showArrow !== 'never' && (props.showArrow === 'always' || hovering.value || focused.value)
        ? [
            slots.prev?.(scope) ??
              h(
                'button',
                {
                  type: 'button',
                  class: [n('arrow'), n('arrow-prev'), props.arrowClass],
                  'aria-label': props.previousButtonAriaLabel ?? text.value.previous,
                  disabled: !keys.value.length || (!props.loop && current.value === 0),
                  onClick: () => prev(),
                },
                [h(vertical.value ? UpIcon : isRtl.value ? NextIcon : PreviousIcon)],
              ),
            slots.next?.(scope) ??
              h(
                'button',
                {
                  type: 'button',
                  class: [n('arrow'), n('arrow-next'), props.arrowClass],
                  'aria-label': props.nextButtonAriaLabel ?? text.value.next,
                  disabled: !keys.value.length || (!props.loop && current.value === keys.value.length - 1),
                  onClick: () => next(),
                },
                [h(vertical.value ? DownIcon : isRtl.value ? PreviousIcon : NextIcon)],
              ),
          ]
        : []),
      slots.indicator?.(scope) ??
        (props.indicator && keys.value.length > 1
          ? h(
              'div',
              { class: [n('indicators'), n('--indicators-' + props.indicatorPosition), props.indicatorClass] },
              keys.value.map((key, index) =>
                h('button', {
                  key,
                  type: 'button',
                  class: classes(n('indicator'), n('--indicator-' + props.indicatorType), [
                    index === current.value,
                    n('--indicator-active'),
                  ]),
                  'aria-label': text.value.goto(index + 1),
                  'aria-current': index === current.value ? 'true' : undefined,
                  style: props.indicatorColor ? { background: props.indicatorColor } : undefined,
                  onClick: () => toIndex(index),
                  onPointerenter: (event: PointerEvent) => {
                    if (props.trigger === 'hover' && event.pointerType === 'mouse') {
                      toIndex(index)
                    }
                  },
                }),
              ),
            )
          : null),
    ],
  )
}
defineExpose<CarouselExpose>({ next, prev, to, resize })
</script>
