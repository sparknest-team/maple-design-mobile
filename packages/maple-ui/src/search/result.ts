export interface SearchResult {
  modelField?: string
  modelValue?: string
  searchField?: string
  searchText?: string
  model?: Record<string, any>
  recentSearches: string[]
}
