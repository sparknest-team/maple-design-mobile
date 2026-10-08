import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { shouldSyncMobileRoute } from './route-sync'

describe('mobile preview route synchronization', () => {
  it('does not overwrite the PC route when the iframe first loads', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/home', component: {} },
        { path: '/button', component: {} },
        { path: '/input', component: {} },
      ],
    })
    const synchronizedPaths: string[] = []
    router.afterEach((to, from, failure) => {
      if (shouldSyncMobileRoute(from, failure)) {
        synchronizedPaths.push(to.path)
      }
    })

    await router.push('/button')
    expect(synchronizedPaths).toEqual([])

    await router.push('/input')
    expect(synchronizedPaths).toEqual(['/input'])
  })
})
