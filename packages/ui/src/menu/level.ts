import { inject, nextTick, onBeforeUnmount, provide, watch, type Ref } from 'vue'
import { menuLevelKey, type MenuBranch, type MenuLevel } from './context'

/** Each level owns only its immediate children, including slot-created submenus. */
export function useMenuLevel(visible: Ref<boolean>, branch?: MenuBranch) {
  const parent = inject(menuLevelKey, undefined)
  const children = new Set<MenuBranch>()
  const unregister = branch && parent?.register(branch)
  const level: MenuLevel = {
    visible,
    leave: branch
      ? () => {
          branch.allowClose()
          branch.close()
          nextTick(() => {
            if (!visible.value) {
              branch.focus?.()
            }
          })
        }
      : undefined,
    register(child) {
      children.add(child)
      return () => {
        children.delete(child)
      }
    },
    activate(active) {
      children.forEach((child) => {
        child.allowClose()
        if (child !== active) {
          child.close()
        }
      })
    },
  }
  provide(menuLevelKey, level)
  if (branch) {
    watch(
      () => parent?.visible.value,
      (value) => {
        if (value === false) {
          branch.close()
        }
      },
    )
  }
  watch(visible, (value) => {
    if (!value) {
      level.activate()
    }
  })
  onBeforeUnmount(() => unregister?.())
  return { level, activate: () => parent?.activate(branch) }
}
