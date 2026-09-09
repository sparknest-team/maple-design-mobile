import { computed } from 'vue'
import type { TagProps } from './props'

export { IconClose, IconLoading } from '@maplejs/icons-vue'
export function useTagPlatform(props: Readonly<TagProps>) {
  return { mergedSize: computed(() => props.size ?? 'md'), rtl: computed(() => false) }
}
