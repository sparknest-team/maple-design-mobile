import { withInstall } from '../utils/components'
import { searchProps } from './props'
import SearchSource from './Search.vue'

const Search = withInstall(SearchSource)

export { Search, searchProps }
export type { SearchEditMode, SearchActionType, SearchField, SearchProps, SearchShape } from './props'
export type { SearchResult } from './result'

export type SearchInstance = InstanceType<typeof Search>
export const _SearchComponent: typeof Search = Search

export default Search

export type { SearchEmits, SearchSlots, SearchExpose } from './types'
