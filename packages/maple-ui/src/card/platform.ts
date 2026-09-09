import { computed } from 'vue'
import type { CardSize } from './props'

export function useCardSize(size: () => CardSize | undefined) {
  return computed<CardSize>(() => size() ?? 'md')
}
