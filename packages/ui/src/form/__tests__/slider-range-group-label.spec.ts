import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Slider from '../../slider'
import FormItem from '../FormItem.vue'

it('names an explicitly targeted range group without replacing endpoint names', async () => {
  const target = ref('range')
  const role = ref<string | undefined>()
  const label = ref('Price range')
  const wrapper = mount({
    setup: () => () =>
      h(FormItem, { label: label.value, labelAttrs: { id: 'price-label', for: target.value } }, () =>
        h(Slider, { id: 'range', range: true, showInput: true, ariaLabel: ['Minimum', 'Maximum'], role: role.value }),
      ),
  })
  try {
    const group = () => wrapper.get('#range')
    expect(group().attributes('role')).toBe('group')
    expect(group().attributes('aria-labelledby')).toBe('price-label')
    expect(wrapper.findAll('[role="slider"]').map((node) => node.attributes('aria-label'))).toEqual([
      'Minimum',
      'Maximum',
    ])
    expect(wrapper.findAll('[role="spinbutton"]').map((node) => node.attributes('aria-label'))).toEqual([
      'Minimum',
      'Maximum',
    ])
    target.value = 'other'
    await nextTick()
    expect(group().attributes('role')).toBeUndefined()
    expect(group().attributes('aria-labelledby')).toBeUndefined()
    target.value = 'range'
    role.value = 'presentation'
    await nextTick()
    expect(group().attributes('role')).toBe('presentation')
    expect(group().attributes('aria-labelledby')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

it('renders the explicitly targeted range group in SSR', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(FormItem, { label: 'Price range', labelAttrs: { id: 'price-label', for: 'range' } }, () =>
          h(Slider, { id: 'range', range: true, ariaLabel: ['Minimum', 'Maximum'] }),
        ),
    }),
  )
  const container = document.createElement('div')
  container.innerHTML = html
  expect(container.querySelector('#range')?.getAttribute('role')).toBe('group')
  expect(container.querySelector('#range')?.getAttribute('aria-labelledby')).toBe('price-label')
})

it('preserves root attrs, classes, styles and once listeners', async () => {
  const click = vi.fn()
  const wrapper = mount(Slider, {
    attrs: { id: 'range', 'data-test': 'kept', class: 'custom', style: { margin: '2px' }, onClickOnce: click },
    props: { range: true },
  })
  try {
    expect(wrapper.attributes('data-test')).toBe('kept')
    expect(wrapper.classes()).toContain('custom')
    expect((wrapper.element as HTMLElement).style.margin).toBe('2px')
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(click).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
  }
})
