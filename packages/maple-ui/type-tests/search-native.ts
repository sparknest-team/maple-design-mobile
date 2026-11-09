import { h } from 'vue'
import { Search as RootSearch } from '@maple-design/ui'
import type { SearchEmits, SearchInstance, SearchProps, SearchResult } from '@maple-design/ui'
import SearchDefault, { Search as NamedSearch } from '../src/search'

const component: typeof SearchDefault = NamedSearch
const rootComponent: typeof RootSearch = NamedSearch
const props: SearchProps = {
  modelValue: null,
  editMode: 'popup',
  readPretty: true,
  loading: true,
  loadingMode: 'line',
  type: 'text',
  maxLength: { length: 4, errorOnly: true },
  modelModifiers: { trim: true },
}
const value: SearchEmits['change'] = [null, new Event('change')]
h(NamedSearch, {
  ...props,
  onSearch(result, event) {
    const keyword: string | null = result.modelValue
    const source: Event = event
    void [keyword, source]
  },
})
declare const result: SearchResult
const keyword: string | null = result.modelValue
declare const instance: SearchInstance
instance.focus()
instance.blur()
// @ts-expect-error The obsolete presentation alias is not a public prop.
const obsolete: SearchProps = { presentation: 'inline' }
// @ts-expect-error Search icon notifications do not carry a boolean event source.
const wrongSource: SearchEmits['change'] = ['query', false]
void [component, rootComponent, props, value, keyword, obsolete, wrongSource]
