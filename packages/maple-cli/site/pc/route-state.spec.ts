import { computed, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { MenuTypes, type Menu } from '../utils'
import { getPcSiteRoute } from './route-state'

const menu: Menu[] = [
  { doc: 'button', type: MenuTypes.COMPONENT, text: {} },
  { doc: 'input', type: MenuTypes.COMPONENT, text: {} },
  { doc: 'guide', type: MenuTypes.DOCUMENTATION, text: {} },
]

describe('PC site mobile preview route', () => {
  it('tracks component and hash changes from the reactive router state', () => {
    const path = ref('/zh-CN/button')
    const hash = ref('')
    const state = computed(() => getPcSiteRoute(path.value, hash.value, menu, '/home', true))

    expect(state.value).toMatchObject({ componentName: 'button', menuName: 'button', useMobile: true })
    path.value = '/zh-CN/input'
    hash.value = '#basic'
    expect(state.value).toMatchObject({ componentName: 'input', menuName: 'input', hash: 'basic' })

    path.value = '/zh-CN/guide'
    expect(state.value).toMatchObject({ componentName: 'home', menuName: 'guide' })

    path.value = '/en-US/button'
    expect(state.value).toMatchObject({ language: 'en-US', componentName: 'button' })
  })
})
