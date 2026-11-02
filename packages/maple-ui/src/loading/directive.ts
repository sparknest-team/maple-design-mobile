import {
  defineComponent,
  h,
  reactive,
  render,
  type ComponentPublicInstance,
  type Directive,
  type DirectiveBinding,
} from 'vue'
import Loading from './Loading.vue'
import type { LoadingSize, LoadingType } from './props'

const locks = new WeakMap<Document, { count: number; owned: boolean }>()

function acquireBodyLock(document: Document) {
  let state = locks.get(document)
  if (!state) {
    state = { count: 0, owned: !document.body.classList.contains('mp-loading-parent--hidden') }
    locks.set(document, state)
  }
  const lease = state
  lease.count++
  document.body.classList.add('mp-loading-parent--hidden')
  let released = false
  return () => {
    if (released) {
      return
    }
    released = true
    if (--lease.count === 0) {
      if (lease.owned) {
        document.body.classList.remove('mp-loading-parent--hidden')
      }
      locks.delete(document)
    }
  }
}

const INSTANCE_KEY = Symbol('MapleLoading')

export interface LoadingDirectiveOptions {
  loading: boolean
  tip?: string
  type?: LoadingType
  size?: LoadingSize
  radius?: string | number
  color?: string
  hideIcon?: boolean
  fullscreen?: boolean
  background?: string
}

type LoadingRenderOptions = Omit<LoadingDirectiveOptions, 'loading'>

interface LoadingElement extends HTMLElement {
  [INSTANCE_KEY]?: {
    container: HTMLElement
    options: LoadingRenderOptions
    restorePosition: boolean
    releaseLock?: () => void
    fullscreen: boolean
  }
}

const DirectiveLoading = defineComponent({
  props: ['options'],
  setup(props) {
    return () =>
      h(
        Loading,
        {
          ...props.options,
          loading: true,
        },
        {
          // Force the same content/overlay/body rendering branch used by
          // <mp-loading :loading="true">...</mp-loading> without moving DOM
          // nodes that are owned by the host component.
          default: () => h('span', { class: 'mp-loading-directive__placeholder', 'aria-hidden': 'true' }),
        },
      )
  },
})

function getAppContext(instance: unknown) {
  return (instance as (ComponentPublicInstance & { $?: { appContext?: object } }) | null)?.$?.appContext
}

function isLoading(value: boolean | LoadingDirectiveOptions) {
  return typeof value === 'boolean' ? value : value.loading
}

function getOptions(value: boolean | LoadingDirectiveOptions): LoadingRenderOptions {
  if (typeof value === 'boolean') {
    return {}
  }
  const { loading: _, ...options } = value
  return options
}

function mountLoading(el: LoadingElement, binding: DirectiveBinding<boolean | LoadingDirectiveOptions>) {
  const options = reactive<LoadingRenderOptions>(getOptions(binding.value))
  const document = el.ownerDocument
  const container = document.createElement('div')
  // The overlay is inside the host: consume clicks before they reach Card/ancestors.
  container.addEventListener(
    'click',
    (event) => {
      event.preventDefault()
      event.stopPropagation()
    },
    true,
  )
  const fullscreen = options.fullscreen === true
  const restorePosition =
    !fullscreen &&
    !el.classList.contains('mp-loading-parent--relative') &&
    document.defaultView?.getComputedStyle(el).position === 'static'

  container.className = fullscreen ? 'mp-loading-directive mp-loading-directive--fullscreen' : 'mp-loading-directive'
  if (options.background) {
    container.style.setProperty('--mp-loading-overlay-background', options.background)
  }

  const vnode = h(DirectiveLoading, { options })
  vnode.appContext = getAppContext(binding.instance) as typeof vnode.appContext
  render(vnode, container)

  const releaseLock = fullscreen ? acquireBodyLock(document) : undefined
  if (fullscreen) {
    document.body.appendChild(container)
  } else {
    if (restorePosition) {
      el.classList.add('mp-loading-parent--relative')
    }
    el.appendChild(container)
  }

  el[INSTANCE_KEY] = { container, options, restorePosition, releaseLock, fullscreen }
}

function unmountLoading(el: LoadingElement) {
  const state = el[INSTANCE_KEY]
  if (!state) {
    return
  }

  render(null, state.container)
  state.container.remove()
  if (state.restorePosition) {
    el.classList.remove('mp-loading-parent--relative')
  }
  state.releaseLock?.()
  el[INSTANCE_KEY] = undefined
}

export const vLoading: Directive<LoadingElement, boolean | LoadingDirectiveOptions> = {
  mounted(el, binding) {
    if (isLoading(binding.value)) {
      mountLoading(el, binding)
    }
  },
  updated(el, binding) {
    if (isLoading(binding.value) && !el[INSTANCE_KEY]) {
      mountLoading(el, binding)
    } else if (!isLoading(binding.value)) {
      unmountLoading(el)
    } else if (el[INSTANCE_KEY]) {
      const options = getOptions(binding.value)
      if (el[INSTANCE_KEY].fullscreen !== (options.fullscreen === true)) {
        unmountLoading(el)
        mountLoading(el, binding)
        return
      }
      const current = el[INSTANCE_KEY].options
      for (const key of Object.keys(current)) {
        delete current[key as keyof LoadingRenderOptions]
      }
      Object.assign(current, options)
      if (options.background) {
        el[INSTANCE_KEY].container.style.setProperty('--mp-loading-overlay-background', options.background)
      } else {
        el[INSTANCE_KEY].container.style.removeProperty('--mp-loading-overlay-background')
      }
    }
  },
  unmounted: unmountLoading,
  getSSRProps() {
    return {}
  },
}
