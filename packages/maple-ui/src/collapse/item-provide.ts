import { inject } from 'vue'
import { collapseKey, type CollapseContext } from './provide'

export function useCollapse() {
  return inject<Partial<CollapseContext>>(collapseKey, {})
}
