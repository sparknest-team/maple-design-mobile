export interface SearchResult {
  modelField?: string
  modelValue: string | null
  model?: Record<string, unknown>
  recentSearches: string[]
}
