import { demoEnglish } from '@maple-design/cli-vue/demo-language'
import enUS from './en-US'
import zhCN from './zh-CN'

export const t = (key: keyof typeof zhCN) => (demoEnglish.value ? enUS : zhCN)[key]
