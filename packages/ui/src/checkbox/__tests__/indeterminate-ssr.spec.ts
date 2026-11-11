import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Checkbox from '..'

test('indeterminate is restored to the native checkbox property during hydration', async () => {
  const component = { render: () => h(Checkbox, { indeterminate: true, ariaLabel: 'Partial selection' }) }
  const html = await renderToString(createSSRApp(component))
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  const input = container.querySelector('input')!
  expect(input.indeterminate).toBe(false)
  const app = createSSRApp(component)
  try {
    app.mount(container)
    await nextTick()
    expect(container.querySelector('input')).toBe(input)
    expect(input.indeterminate).toBe(true)
  } finally {
    app.unmount()
    container.remove()
  }
})

test('native checked and indeterminate properties own the state even with a conflicting ARIA attribute', async () => {
  const wrapper = mount(Checkbox, { props: { modelValue: false }, attrs: { 'aria-checked': 'true' } })
  try {
    const input = wrapper.get('input').element as HTMLInputElement
    expect(input.hasAttribute('aria-checked')).toBe(false)
    expect(input.checked).toBe(false)
    await wrapper.setProps({ modelValue: true, indeterminate: true })
    expect(input.checked).toBe(true)
    expect(input.indeterminate).toBe(true)
    expect(input.hasAttribute('aria-checked')).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
