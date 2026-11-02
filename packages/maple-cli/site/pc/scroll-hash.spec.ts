import { describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createScrollHashSync } from './scroll-hash'

function setup() {
  const scrollBehavior = vi.fn(() => false as const)
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: {} }],
    scrollBehavior,
  })
  return { router, scrollBehavior, sync: createScrollHashSync(router) }
}

describe('document scroll hash synchronization', () => {
  it('replaces only the hash, preserves query, skips scrolling and adds no back entry', async () => {
    const { router, scrollBehavior, sync } = setup()
    await router.push('/previous')
    await router.push('/zh-CN/button?scene=test')
    scrollBehavior.mockClear()
    const replace = vi.spyOn(router, 'replace')
    await sync.replace('#sizes')
    expect(router.currentRoute.value.fullPath).toBe('/zh-CN/button?scene=test#sizes')
    expect(scrollBehavior).not.toHaveBeenCalled()
    expect(router.options.scrollBehavior).toBe(scrollBehavior)
    await sync.replace('#sizes')
    expect(replace).toHaveBeenCalledTimes(1)
    await sync.replace('')
    expect(router.currentRoute.value.hash).toBe('')
    const back = new Promise<void>((resolve) => router.afterEach(() => resolve()))
    router.back()
    await back
    expect(router.currentRoute.value.path).toBe('/previous')
  })

  it('restores normal scrolling after cancelled or failed navigation', async () => {
    const { router, scrollBehavior, sync } = setup()
    await router.push('/zh-CN/button')
    router.beforeEach(() => false)
    await sync.replace('#cancelled')
    expect(router.currentRoute.value.hash).toBe('')
    expect(router.options.scrollBehavior).toBe(scrollBehavior)
    expect(sync.pending).toBe(false)
    vi.spyOn(router, 'replace').mockRejectedValueOnce(new Error('Failed navigation'))
    await expect(sync.replace('#failed')).rejects.toThrow('Failed navigation')
    expect(router.options.scrollBehavior).toBe(scrollBehavior)
    expect(sync.pending).toBe(false)
  })
})
