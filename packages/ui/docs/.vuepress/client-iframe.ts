import { defineClientConfig } from 'vuepress/client'
import { useDocsDirection } from '@sparknest/ui-doc-preview-vue'
import Locale from '../../src/locale'
import '@maple-foundation'

export default defineClientConfig({
  setup() {
    useDocsDirection()
  },
  enhance({ router }) {
    Locale.add('zh-CN', Locale.zhCN)
    Locale.add('en-US', Locale.enUS)
    router.afterEach((to) => {
      const language = to.query.language === 'en-US' ? 'en-US' : 'zh-CN'
      Locale.use(language)
      document.documentElement.lang = language
    })
  },
})
