import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
import { collapseItemProps, collapseProps } from './props'

const Collapse = withInstall(
  _Collapse,
  Object.assign(_Collapse, {
    Item: CollapseItem,
  }),
  { components: [_Collapse, CollapseItem] },
)

withPropsDefaultsSetter(Collapse, collapseProps)
withPropsDefaultsSetter(CollapseItem, collapseItemProps)

export { collapseProps, collapseItemProps, CollapseItem }

export type CollapseInstance = InstanceType<typeof _Collapse>
export type CollapseItemInstance = InstanceType<typeof CollapseItem>
export type {
  CollapseActiveNames,
  CollapseItemProps,
  CollapseName,
  CollapseProps,
  CollapseToggleAllOptions,
  ExpandIconPosition,
} from './props'
export const _CollapseComponent: typeof Collapse = Collapse
export const _CollapseItemComponent: typeof CollapseItem = CollapseItem

export default Collapse
