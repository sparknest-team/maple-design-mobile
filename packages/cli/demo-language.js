import { computed } from 'vue'
import { Locale } from '@maple-design/ui-vue'

export const demoEnglish = computed(() => Locale.currentMessage.value.lang === 'en-US')
