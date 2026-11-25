import { h } from 'vue'
import { IconChevronRight } from '@maple-design/icons-vue'

export function renderArrowIcon(vertical: boolean, previous: boolean, rtl: boolean) {
  const rotate = vertical ? (previous ? -90 : 90) : previous !== rtl ? 180 : 0
  return h(IconChevronRight, { rotate })
}
