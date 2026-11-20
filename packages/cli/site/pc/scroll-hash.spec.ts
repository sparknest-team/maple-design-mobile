import { describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createScrollHashSync } from './scroll-hash'

function setup() {
  const scrollBehavior = vi.fn(() => false as const)
  const history = createMemoryHistory()
  const router = createRouter({
    history,
    routes: [{ path: '/:pathMatch(.*)*', component: {} }],
    scrollBehavior,
  })
  return { router, history, scrollBehavior, sync: createScrollHashSync(router) }
}

describe('document scroll hash synchronization', () => {
  it('updates browser history without navigating, scrolling or adding a back entry', async () => {
    const { router, history, scrollBehavior, sync } = setup()
    await router.push('/previous')
    await router.push('/zh-CN/button?scene=test#intro')
    scrollBehavior.mockClear()
    const replace = vi.spyOn(history, 'replace')
    const onNavigation = vi.fn()
    router.beforeEach(onNavigation)

    sync.replace('#sizes')
    sync.replace('#sizes')
    expect(history.location).toBe('/zh-CN/button?scene=test#sizes')
    expect(replace).toHaveBeenCalledTimes(1)
    expect(onNavigation).not.toHaveBeenCalled()
    expect(scrollBehavior).not.toHaveBeenCalled()
    expect(router.currentRoute.value.hash).toBe('#intro')

    sync.replace('')
    expect(history.location).toBe('/zh-CN/button?scene=test')
    const back = new Promise<void>((resolve) => router.afterEach(() => resolve()))
    router.back()
    await back
    expect(router.currentRoute.value.path).toBe('/previous')
  })

  it('does not overwrite the address while a page component is loading', async () => {
    const { router, history, sync } = setup()
    let finishLoading: (() => void) | undefined
    let startedLoading: (() => void) | undefined
    const loading = new Promise<void>((resolve) => { startedLoading = resolve })
    router.addRoute({
      path: '/next',
      component: () => new Promise((resolve) => {
        finishLoading = () => resolve({})
        startedLoading?.()
      }),
    })
    await router.push('/zh-CN/card')
    const navigation = router.push('/next')
    await loading
    sync.replace('#old-section')
    expect(history.location).toBe('/zh-CN/card')
    finishLoading?.()
    await navigation
    expect(history.location).toBe('/next')
    sync.dispose()
  })
})
