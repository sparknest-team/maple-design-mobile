import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as searchProps } from './props'
import Search from './Search.vue'

withInstall(Search)
withPropsDefaultsSetter(Search, searchProps)

export { searchProps }

export type SearchInstance = InstanceType<typeof Search>
export const _SearchComponent = Search

export default Search
