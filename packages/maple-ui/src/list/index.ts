import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _List from './List.vue'
import ListItem from './ListItem.vue'
import { listProps } from './props'

const List = withInstall(
  _List,
  Object.assign(_List, {
    Item: ListItem,
  }),
  { components: [_List, ListItem] },
)

withPropsDefaultsSetter(List, listProps)

export { listProps, List, ListItem }
export type { ListProps, ListSize } from './props'

export type ListInstance = InstanceType<typeof _List>
export type ListItemInstance = InstanceType<typeof ListItem>
export const _ListComponent = List
export const _ListItemComponent = ListItem

export default List
