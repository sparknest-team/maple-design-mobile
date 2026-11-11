import { Locale } from '@maple-design/ui-vue'
import enUS from './en-US'
import zhCN from './zh-CN'

const { add, use: exampleUse, t, merge } = Locale.useLocale()

const use = (lang: string) => {
  Locale.use(lang)
  exampleUse(lang)
}

export { add, use, t, merge }

add('en-US', enUS)
add('zh-CN', zhCN)
