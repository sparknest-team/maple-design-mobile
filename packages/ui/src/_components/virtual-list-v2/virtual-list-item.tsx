import {
  cloneVNode,
  defineComponent,
  Fragment,
  getCurrentInstance,
  inject,
  InjectionKey,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  Ref,
  VNode,
  watch,
} from 'vue'
import { createNamespace } from '../../utils/components'

export const measurementVersionKey: InjectionKey<Ref<number>> = Symbol('virtual-list-measurement-version')

const { name } = createNamespace('virtual-list-item')

export default defineComponent({
  name,
  props: {
    index: Number,
    canMeasureZero: Function,
    hasItemSize: {
      type: Function,
      required: true,
    },
    setItemSize: {
      type: Function,
      required: true,
    },
  },
  setup(props, { slots }) {
    const key = getCurrentInstance()?.vnode.key as string | number
    const elements = new Map<number, HTMLElement>()
    const refCallbacks = new Map<number, (value: object | null) => void>()
    let observer: ResizeObserver | undefined

    const refFor = (index: number) => {
      if (!refCallbacks.has(index)) {
        refCallbacks.set(index, (value) => {
          const element = value && '$el' in value ? value.$el : value
          const previous = elements.get(index)
          if (previous && previous !== element) {
            observer?.unobserve(previous)
          }
          if (element && typeof element === 'object' && 'nodeType' in element && element.nodeType === 1) {
            elements.set(index, element as HTMLElement)
            observer?.observe(element as HTMLElement)
          } else {
            elements.delete(index)
          }
        })
      }
      return refCallbacks.get(index)!
    }

    const setItemSize = () => {
      const rects = Array.from(elements.values(), (element) => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ element, rect }) => rect.width !== 0 || rect.height !== 0 || element.getClientRects().length > 0)
        .map(({ rect }) => rect)
      const height = rects.length
        ? Math.max(...rects.map((rect) => rect.bottom)) - Math.min(...rects.map((rect) => rect.top))
        : 0
      if (height) {
        props.setItemSize(key, height)
      } else if (elements.size > 0 && props.canMeasureZero?.()) {
        props.setItemSize(key, 0, true)
      }
    }

    const measureAndObserve = () => {
      if (!observer) {
        const Observer = elements.values().next().value?.ownerDocument.defaultView?.ResizeObserver
        if (Observer) {
          observer = new Observer(setItemSize)
          elements.forEach((element) => observer?.observe(element))
        }
      }
      setItemSize()
    }
    const measurementVersion = inject(measurementVersionKey, undefined)
    if (measurementVersion) {
      watch(measurementVersion, measureAndObserve, { flush: 'post' })
    }
    onMounted(measureAndObserve)
    onUpdated(measureAndObserve)
    onBeforeUnmount(() => {
      setItemSize()
      observer?.disconnect()
    })

    return () => {
      let index = 0
      const preserve = (nodes: VNode[]): VNode[] =>
        nodes.map((node) => {
          if (Array.isArray(node)) {
            return preserve(node) as unknown as VNode
          }
          if (!node || typeof node !== 'object') {
            return node
          }
          if (node.type === Fragment && Array.isArray(node.children)) {
            const fragment = cloneVNode(node)
            fragment.children = preserve(node.children as VNode[])
            ;(fragment as VNode & { dynamicChildren: VNode[] | null }).dynamicChildren = null
            return fragment
          }
          if (typeof node.type === 'string' || typeof node.type === 'object' || typeof node.type === 'function') {
            return cloneVNode(node, { ref: refFor(index++), 'data-virtual-list-index': props.index }, true)
          }
          return node
        })
      return preserve(slots.default?.() ?? [])
    }
  },
})
