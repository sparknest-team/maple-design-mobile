import { defineClientConfig } from 'vuepress/client'
import Locale from '../../src/locale'
import enUS from '../../src/locale/en-US'

export default defineClientConfig({
  enhance({ router }) {
    Locale.add('en-US', enUS)
    router.afterEach(to => {
      Locale.use(to.path.startsWith('/en/') || to.query.language === 'en-US' ? 'en-US' : 'zh-CN')
    })
  },
})
