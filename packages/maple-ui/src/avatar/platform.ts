import { isVNode, type VNode } from 'vue'

export { IconImageClose as ImageErrorIcon } from '@maplejs/icons-vue'
export { IconLoading as ImageLoadingIcon } from '@maplejs/icons-vue'
export { toSizeUnit } from '../utils/elements'
export { useElementResize } from '../utils/resize-observer'

const ELEMENT = 1
const COMPONENT = 6
const TEXT_CHILDREN = 8
const ARRAY_CHILDREN = 16
const SLOTS_CHILDREN = 32

export function getAllElements(children: VNode[] | undefined, includeText = false): VNode[] {
  const results: VNode[] = []
  for (const item of children ?? []) {
    if (Array.isArray(item)) {
      results.push(...getAllElements(item, includeText))
      continue
    }
    if (!isVNode(item)) {
      continue
    }
    if (item.shapeFlag & ELEMENT || item.shapeFlag & COMPONENT || (includeText && item.shapeFlag & TEXT_CHILDREN)) {
      results.push(item)
    } else if (item.shapeFlag & ARRAY_CHILDREN) {
      results.push(...getAllElements(item.children as VNode[], includeText))
    } else if (item.shapeFlag & SLOTS_CHILDREN) {
      results.push(...getAllElements((item.children as { default?: () => VNode[] }).default?.() ?? [], includeText))
    }
  }
  return results
}
