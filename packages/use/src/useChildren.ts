import {
  computed,
  getCurrentInstance,
  isVNode,
  onUpdated,
  provide,
  reactive,
  type ComponentInternalInstance,
  type ComputedRef,
  type VNode,
} from 'vue'
import { isArray, removeItem } from '@maple-design/shared-vue'

function flatVNodes(subTree: any) {
  const vNodes: VNode[] = []

  const flat = (subTree: any) => {
    if (subTree?.component) {
      flat(subTree?.component.subTree)
      return
    }

    if (isArray(subTree?.children)) {
      subTree.children.forEach((child: any) => {
        if (isVNode(child)) {
          vNodes.push(child)

          flat(child)
        }
      })
    }
  }

  flat(subTree)

  return vNodes
}

export interface UseChildrenBaseProvider<C> {
  childInstances: ComponentInternalInstance[]

  collect(instance: ComponentInternalInstance, childProvider: C): void

  clear(instance: ComponentInternalInstance, childProvider: C): void
}

export function useChildren<P, C>(key: symbol | string) {
  const parentInstance: ComponentInternalInstance = getCurrentInstance() as ComponentInternalInstance
  const childInstances: ComponentInternalInstance[] = reactive([])
  const childProviders: C[] = []
  const length: ComputedRef<number> = computed(() => childInstances.length)

  const sortInstances = () => {
    const vNodes: any[] = flatVNodes(parentInstance.subTree)

    const sorted = [...childInstances].sort((a, b) => vNodes.indexOf(a.vnode) - vNodes.indexOf(b.vnode))
    if (sorted.every((instance, index) => instance === childInstances[index])) {
      return
    }
    const providers = sorted.map((instance) => childProviders[childInstances.indexOf(instance)])
    childInstances.splice(0, childInstances.length, ...sorted)
    childProviders.splice(0, childProviders.length, ...providers)
  }

  onUpdated(sortInstances)

  const collect = (childInstance: ComponentInternalInstance, childProvider: C) => {
    if (childInstances.includes(childInstance)) {
      return
    }
    childInstances.push(childInstance)
    childProviders.push(childProvider)
    sortInstances()
  }

  const clear = (childInstance: ComponentInternalInstance, childProvider: C) => {
    removeItem(childInstances, childInstance)
    removeItem(childProviders, childProvider)
  }

  const bindChildren = (parentProvider: P) => {
    provide<P & UseChildrenBaseProvider<C>>(key, {
      childInstances,
      collect,
      clear,
      ...parentProvider,
    })
  }

  return {
    length,
    childProviders,
    bindChildren,
  }
}
