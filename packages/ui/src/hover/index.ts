import { ref, type App, type Directive, type DirectiveBinding, type Plugin } from 'vue'
import { inMobile, isFunction } from '@maple-design/shared-vue'
import { withPropsDefaultsSetter } from '../utils/components'
import HoverOverlay from './HoverOverlay.vue'
import { props as hoverOverlayProps } from './overlay-props'

export type HoverValue = Record<string, any> | ((isHovering: boolean) => void)

function shouldDisabled(arg?: string) {
  if (!arg) {
    return false
  }

  if (arg === 'desktop' && inMobile()) {
    return true
  }

  if (arg === 'mobile' && !inMobile()) {
    return true
  }

  return false
}

type SavedStyle = { value: string; priority: string }
type HoverState = { value: HoverValue; hovering: boolean; rawStyle: Record<string, SavedStyle> }
export type HoverHTMLElement = HTMLElement & { _hover?: HoverState }

function cssName(name: string) {
  if (name.startsWith('--')) {
    return name
  }
  const result = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
  return result.startsWith('ms-') ? `-${result}` : result
}

function restoreStyle(element: HoverHTMLElement) {
  const state = element._hover
  if (!state) {
    return
  }
  for (const [name, original] of Object.entries(state.rawStyle)) {
    if (original.value) {
      element.style.setProperty(name, original.value, original.priority)
    } else {
      element.style.removeProperty(name)
    }
  }
  state.rawStyle = {}
}

function applyStyle(element: HoverHTMLElement) {
  const state = element._hover
  if (!state || isFunction(state.value)) {
    return
  }
  for (const [key, value] of Object.entries(state.value ?? {})) {
    if (value == null) {
      continue
    }
    const name = cssName(key)
    state.rawStyle[name] = {
      value: element.style.getPropertyValue(name),
      priority: element.style.getPropertyPriority(name),
    }
    element.style.setProperty(name, String(value))
  }
}

function createHover(this: HoverHTMLElement) {
  const state = this._hover
  if (!state || state.hovering) {
    return
  }
  state.hovering = true
  if (isFunction(state.value)) {
    state.value(true)
  } else {
    applyStyle(this)
  }
}

function removeHover(this: HoverHTMLElement) {
  const state = this._hover
  if (!state || !state.hovering) {
    return
  }
  state.hovering = false
  if (isFunction(state.value)) {
    state.value(false)
  } else {
    restoreStyle(this)
  }
}

function bind(element: HoverHTMLElement, binding: DirectiveBinding<HoverValue>) {
  if (shouldDisabled(binding.arg)) {
    return
  }
  element._hover = { value: binding.value, hovering: false, rawStyle: {} }
  element.addEventListener('mouseenter', createHover)
  element.addEventListener('mouseleave', removeHover)
}

function unbind(element: HoverHTMLElement) {
  if (!element._hover) {
    return
  }
  restoreStyle(element)
  element.removeEventListener('mouseenter', createHover)
  element.removeEventListener('mouseleave', removeHover)
  delete element._hover
}

function mounted(element: HoverHTMLElement, binding: DirectiveBinding<HoverValue>) {
  bind(element, binding)
}

function unmounted(element: HoverHTMLElement) {
  unbind(element)
}

function beforeUpdate(element: HoverHTMLElement) {
  // Let Vue patch the underlying inline style before applying hover values again.
  restoreStyle(element)
}

function updated(element: HoverHTMLElement, binding: DirectiveBinding<HoverValue>) {
  if (shouldDisabled(binding.arg)) {
    unbind(element)
    return
  }
  const state = element._hover
  if (!state) {
    bind(element, binding)
    return
  }
  state.value = binding.value
  if (state.hovering) {
    applyStyle(element)
  }
}

const HoverDirective: Directive & Plugin = {
  mounted,
  unmounted,
  beforeUpdate,
  updated,
  install(app: App) {
    app.directive('hover', this)
  },
}

type HoverPlugin = import('vue').ObjectDirective & { install: (app: App, ...options: any[]) => any } & {
  Overlay: typeof HoverOverlay
  install(app: App): void
}

const Hover: HoverPlugin = Object.assign(HoverDirective, {
  Overlay: HoverOverlay,
  install(app: App) {
    app.directive('hover', HoverDirective)
    if (HoverOverlay.name) {
      app.component(HoverOverlay.name, HoverOverlay)
    }
  },
})

withPropsDefaultsSetter(HoverOverlay, hoverOverlayProps)

export function useHoverOverlay(): { hovering: import('vue').Ref<boolean>; handleHovering: (value: boolean) => void } {
  const hovering = ref(false)

  const handleHovering = (value: boolean) => {
    hovering.value = value
  }

  return {
    hovering,
    handleHovering,
  }
}

export { hoverOverlayProps, HoverOverlay }

export type HoverOverlayInstance = InstanceType<typeof HoverOverlay>
export type HoverInstance = typeof Hover
export const _HoverComponent: typeof Hover = Hover
export const _HoverOverlayComponent: typeof HoverOverlay = HoverOverlay

export default Hover
export type HoverOverlayProps = import('../_utils/public-props').CompatiblePublicProps<
  typeof import('./overlay-props').props
>
