import { defineComponent, h, mergeProps, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
import { createNamespace } from '../utils/components'
import { watermarkProps } from './props'
import { renderWatermark, WatermarkRenderError } from './renderer'
import type { WatermarkError } from './types'

const THEME_ATTRIBUTE = 'maple-theme'
const STYLE_ELEMENT_ID = 'maple-style-vars'
const TOKEN_NAME = '--mp-watermark-content-color'
const PROVIDER_CLASS = 'mp-style-provider'
const DEFAULT_COLOR = 'rgba(0, 0, 0, 0.15)'
const { name, n } = createNamespace('watermark')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: watermarkProps,
  emits: {
    error: (_payload: WatermarkError) => true,
  },
  setup(props, { attrs, emit, expose, slots }) {
    const wrapper = ref<HTMLElement>()
    let layer: HTMLDivElement | undefined
    let active = false
    let generation = 0
    let hostObserver: MutationObserver | undefined
    let layerObserver: MutationObserver | undefined
    const themeObservers: MutationObserver[] = []

    const stopIntegrityObservers = () => {
      hostObserver?.disconnect()
      layerObserver?.disconnect()
      hostObserver = undefined
      layerObserver = undefined
    }

    const stopThemeObservers = () => {
      themeObservers.splice(0).forEach((observer) => observer.disconnect())
    }

    const getHost = () => (props.fullscreen ? document.body : wrapper.value)

    const ensureLayer = () => {
      if (!layer) {
        layer = document.createElement('div')
        layer.setAttribute('aria-hidden', 'true')
      }
      const host = getHost()
      if (host && layer.parentNode !== host) {
        host.appendChild(layer)
      }
      return layer
    }

    const observeIntegrity = () => {
      stopIntegrityObservers()
      if (!active || !props.antiTamper || typeof MutationObserver === 'undefined') {
        return
      }
      const host = getHost()
      const currentLayer = layer
      if (!host || !currentLayer) {
        return
      }
      hostObserver = new MutationObserver((mutations) => {
        if (mutations.some((mutation) => Array.from(mutation.removedNodes).includes(currentLayer))) {
          ensureLayer()
          void redraw()
          observeIntegrity()
        }
      })
      hostObserver.observe(host, { childList: true })
      layerObserver = new MutationObserver(() => void redraw())
      layerObserver.observe(currentLayer, { attributes: true, attributeFilter: ['class', 'style'] })
    }

    const applyLayer = (dataUrl?: string, size?: [number, number]) => {
      const currentLayer = ensureLayer()
      layerObserver?.disconnect()
      currentLayer.className = [n('layer'), props.fullscreen && n('layer--fullscreen')].filter(Boolean).join(' ')
      currentLayer.style.zIndex = String(props.zIndex)
      currentLayer.style.backgroundRepeat = props.repeat ? 'repeat' : 'no-repeat'
      currentLayer.style.backgroundImage = dataUrl ? `url("${dataUrl}")` : 'none'
      currentLayer.style.backgroundSize = size ? `${size[0]}px ${size[1]}px` : ''
      const offset = props.offset ?? [props.gap[0] / 2, props.gap[1] / 2]
      currentLayer.style.backgroundPosition = `${offset[0] - props.gap[0] / 2}px ${offset[1] - props.gap[1] / 2}px`
      if (active && props.antiTamper) {
        observeIntegrity()
      }
    }

    const emitError = (error: unknown) => {
      const source = error instanceof WatermarkRenderError ? error.source : 'canvas'
      emit('error', { source, error: error instanceof WatermarkRenderError ? error.cause : error })
    }

    async function redraw() {
      if (!active || !wrapper.value) {
        return
      }
      const version = ++generation
      ensureLayer()
      const color = getComputedStyle(wrapper.value).getPropertyValue(TOKEN_NAME).trim() || DEFAULT_COLOR
      const options = {
        content: props.content,
        image: props.image,
        width: props.width,
        height: props.height,
        gap: props.gap,
        rotate: props.rotate,
        font: props.font,
        alpha: props.alpha,
        grayscale: props.grayscale,
        staggered: props.repeat && props.staggered,
        color,
      }
      try {
        const result = await renderWatermark(options)
        if (version !== generation || !active) {
          return
        }
        applyLayer(result?.dataUrl, result?.size)
      } catch (error) {
        if (version !== generation || !active) {
          return
        }
        emitError(error)
        if (error instanceof WatermarkRenderError && error.source === 'image' && props.content) {
          try {
            const result = await renderWatermark({ ...options, image: undefined })
            if (version === generation && active) {
              applyLayer(result?.dataUrl, result?.size)
            }
          } catch (fallbackError) {
            if (version === generation && active) {
              emitError(fallbackError)
              applyLayer()
            }
          }
        } else {
          applyLayer()
        }
      }
    }

    const observeTheme = () => {
      stopThemeObservers()
      if (!active || typeof MutationObserver === 'undefined' || !wrapper.value) {
        return
      }
      const observe = (target: Node, options: MutationObserverInit) => {
        const observer = new MutationObserver(() => void redraw())
        observer.observe(target, options)
        themeObservers.push(observer)
      }
      observe(document.documentElement, {
        attributes: true,
        attributeFilter: [THEME_ATTRIBUTE, 'class', 'style'],
      })
      observe(document.head, { childList: true, subtree: true, characterData: true })
      const provider = wrapper.value.closest(`.${PROVIDER_CLASS}`)
      if (provider) {
        observe(provider, { attributes: true, attributeFilter: ['class', 'style'] })
      }
      const styleElement = document.getElementById(STYLE_ELEMENT_ID)
      if (styleElement) {
        observe(styleElement, { childList: true, subtree: true, characterData: true })
      }
    }

    const start = () => {
      if (active || typeof document === 'undefined') {
        return
      }
      active = true
      ensureLayer()
      observeIntegrity()
      observeTheme()
      void redraw()
    }

    const stop = () => {
      active = false
      generation += 1
      stopIntegrityObservers()
      stopThemeObservers()
      layer?.remove()
    }

    watch(
      () => ({ ...props }),
      () => {
        if (!active) {
          return
        }
        ensureLayer()
        observeIntegrity()
        void redraw()
      },
      { deep: true, flush: 'post' },
    )
    onMounted(start)
    onActivated(start)
    onDeactivated(stop)
    onBeforeUnmount(stop)
    expose({ redraw })

    return () => h('div', mergeProps(attrs, { ref: wrapper, class: n() }), slots.default?.())
  },
})
