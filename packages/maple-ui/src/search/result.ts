export interface SearchResult {
  modelField?: string
  modelValue: string
  model?: Record<string, unknown>
  recentSearches: string[]
}
