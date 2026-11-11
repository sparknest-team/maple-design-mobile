import { useParent } from '@maple-design/use-vue'
import { BUTTON_GROUP_BIND_BUTTON_KEY, ButtonGroupProvider } from './group-provide'

export function useButtonGroup() {
  const { bindParent, parentProvider, index } = useParent<ButtonGroupProvider, null>(BUTTON_GROUP_BIND_BUTTON_KEY)

  return {
    index,
    buttonGroup: parentProvider,
    bindButtonGroup: bindParent,
  }
}
