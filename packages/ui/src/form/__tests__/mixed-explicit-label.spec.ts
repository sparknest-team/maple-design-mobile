import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Input from '../../input'
import FormItem from '../FormItem.vue'

it('keeps an explicitly named mixed group and independent control names as controls change', async () => {
  const showNative = ref(true)
  const wrapper = mount({
    setup: () => () =>
      h(FormItem, { label: 'Contact', labelComponent: 'span', labelAttrs: { id: 'contact-label' } }, () =>
        h('div', { role: 'group', 'aria-labelledby': 'contact-label' }, [
          h(Input, { 'aria-label': 'Email' }),
          showNative.value ? h('input', { 'aria-label': 'Phone' }) : null,
        ]),
      ),
  })
  try {
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe('contact-label')
    expect(wrapper.get('#contact-label').text()).toContain('Contact')
    expect(wrapper.find('input[aria-label="Email"]').exists()).toBe(true)
    expect(wrapper.find('input[aria-label="Phone"]').exists()).toBe(true)
    showNative.value = false
    await nextTick()
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe('contact-label')
    expect(wrapper.find('input[aria-label="Email"]').exists()).toBe(true)
    expect(wrapper.find('input[aria-label="Phone"]').exists()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

it('renders the mixed group and its control names on the server', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(FormItem, { label: 'Contact', labelComponent: 'span', labelAttrs: { id: 'contact-label' } }, () =>
          h('div', { role: 'group', 'aria-labelledby': 'contact-label' }, [
            h(Input, { 'aria-label': 'Email' }),
            h('input', { 'aria-label': 'Phone' }),
          ]),
        ),
    }),
  )
  const container = document.createElement('div')
  container.innerHTML = html
  expect(container.querySelector('#contact-label')?.textContent).toContain('Contact')
  expect(container.querySelector('[role="group"]')?.getAttribute('aria-labelledby')).toBe('contact-label')
  expect(container.querySelector('input[aria-label="Email"]')).not.toBeNull()
  expect(container.querySelector('input[aria-label="Phone"]')).not.toBeNull()
})
