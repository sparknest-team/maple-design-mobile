import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { searchProps } from './props'
import Search from './Search.vue'

withInstall(Search)
withPropsDefaultsSetter(Search, searchProps)

export { searchProps }
export type { SearchActionType, SearchField, SearchProps, SearchShape } from './props'
export type { SearchResult } from './result'

export type SearchInstance = InstanceType<typeof Search>
export const _SearchComponent: typeof Search = Search

export default Search

export type { SearchEmits, SearchSlots, SearchExpose } from './types'
