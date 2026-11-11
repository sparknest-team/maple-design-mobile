import { nextTick } from 'vue'
import { resolveDirection } from '../_utils/direction'
import type { CascaderOptionInfo } from './types'

/** A lazy forward navigation may continue only while the original focus and path still belong to it. */
export function startKeyboardLazy(
  event: KeyboardEvent,
  node: CascaderOptionInfo | undefined,
  hasLoader: boolean,
  searchActive: boolean,
  expand: (option: CascaderOptionInfo) => Promise<void>,
  stillActive: (key: string) => boolean,
  navigate: (event: Event, physicalRight: boolean) => void,
  focus: () => void,
): Promise<void> | undefined {
  if (
    searchActive ||
    !node ||
    node.disabled ||
    node.isLeaf ||
    node.children ||
    !hasLoader ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return
  }
  const horizontal = event.key === 'ArrowRight' || event.key === 'ArrowLeft'
  const right = event.key === 'ArrowRight'
  const forward = horizontal && right !== (resolveDirection(event.target as Element) === 'rtl')
  if (event.key !== 'Enter' && event.key !== ' ' && !forward) {
    return
  }
  const target = event.target as HTMLElement | null
  const task = expand(node)
  if (!forward) {
    return task
  }
  return task.then(async () => {
    await nextTick()
    if (!target?.isConnected || target.ownerDocument.activeElement !== target || !stillActive(node.key)) {
      return
    }
    navigate(event, right)
    focus()
  })
}
