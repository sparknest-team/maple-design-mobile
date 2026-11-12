import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Slider from '../../slider'

it('exposes an explicitly labelled range as a named group and respects role changes', async () => {
  const name = ref<string | undefined>('price-label')
  const role = ref<string | undefined>()
  const wrapper = mount({
    setup: () => () =>
      h(Slider, {
        id: 'range',
        range: true,
        ariaLabel: ['Minimum', 'Maximum'],
        'aria-labelledby': name.value,
        role: role.value,
      }),
  })
  try {
    const root = () => wrapper.get('#range')
    expect(root().attributes('role')).toBe('group')
    expect(root().attributes('aria-labelledby')).toBe('price-label')
    expect(wrapper.findAll('[role="slider"]').map((node) => node.attributes('aria-label'))).toEqual([
      'Minimum',
      'Maximum',
    ])
    role.value = 'presentation'
    await nextTick()
    expect(root().attributes('role')).toBe('presentation')
    role.value = undefined
    name.value = undefined
    await nextTick()
    expect(root().attributes('role')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

it('retains an explicitly named range group in SSR', async () => {
  const html = await renderToString(
    createSSRApp({ render: () => h(Slider, { id: 'range', range: true, 'aria-labelledby': 'price-label' }) }),
  )
  const container = document.createElement('div')
  container.innerHTML = html
  expect(container.querySelector('#range')?.getAttribute('role')).toBe('group')
  expect(container.querySelector('#range')?.getAttribute('aria-labelledby')).toBe('price-label')
})
