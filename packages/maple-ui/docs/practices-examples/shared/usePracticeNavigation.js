import { useRoute, useRouter } from 'vue-router'

export function usePracticeNavigation() {
  const route = useRoute()
  const router = useRouter()
  const names = {
    dashboard: 'practiceDashboard',
    list: 'practiceList',
    card: 'practiceCard',
    detail: 'practiceDetail',
    form: 'practiceForm',
    result: 'practiceResult',
  }
  function go(page, query = {}) {
    router.push({ path: `/${route.path.startsWith('/en-US/') ? 'en-US' : 'zh-CN'}/${names[page]}`, query })
  }
  function href(page, query = {}) {
    return router.resolve({ path: `/${route.path.startsWith('/en-US/') ? 'en-US' : 'zh-CN'}/${names[page]}`, query })
      .href
  }
  return { route, go, href }
}
