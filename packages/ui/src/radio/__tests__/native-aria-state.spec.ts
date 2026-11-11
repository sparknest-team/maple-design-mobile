import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Radio from '..'

test('native radio owns its checked state even when a conflicting ARIA value is supplied', async () => {
  const wrapper = mount(Radio, {
    props: { editMode: 'direct', modelValue: false, inputAttrs: { 'aria-checked': 'true' } },
    attrs: { 'aria-checked': 'true' },
  })
  try {
    const input = wrapper.get('input').element as HTMLInputElement
    expect(input.hasAttribute('aria-checked')).toBe(false)
    expect(input.checked).toBe(false)
    await wrapper.setProps({ modelValue: true })
    expect(input.checked).toBe(true)
    expect(input.hasAttribute('aria-checked')).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

test('server-rendered checked state survives hydration without ARIA overrides', async () => {
  const component = { render: () => h(Radio, { editMode: 'direct', modelValue: true }) }
  const container = document.createElement('div')
  container.innerHTML = await renderToString(createSSRApp(component))
  document.body.append(container)
  const input = container.querySelector('input')!
  expect(input.checked).toBe(true)
  expect(input.hasAttribute('aria-checked')).toBe(false)
  const app = createSSRApp(component)
  try {
    app.mount(container)
    await nextTick()
    expect(container.querySelector('input')).toBe(input)
    expect(input.checked).toBe(true)
  } finally {
    app.unmount()
    container.remove()
  }
})
