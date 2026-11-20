import { demoEnglish } from '@maple-design/cli-vue/demo-language'
import { watchEffect } from 'vue'
import { add, use } from '../../../locale'
import componentEnUS from '../../../locale/en-US'
import componentZhCN from '../../../locale/zh-CN'
import enUS from './en-US'
import zhCN from './zh-CN'

export const t = (key: keyof typeof zhCN) => (demoEnglish.value ? enUS : zhCN)[key]

add('zh-CN', componentZhCN)
add('en-US', componentEnUS)

export function useComponentLanguage() {
  watchEffect(() => use(demoEnglish.value ? 'en-US' : 'zh-CN'))
}
