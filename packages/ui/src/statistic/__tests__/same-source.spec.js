import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('statistic')

describe('statistic copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('updates placeholder when default slot appears and disappears', async () => {
    const enabled = ref(false)
    const w = mount({
      setup: () => () => h(Component, { placeholder: 'empty' }, enabled.value ? { default: () => 'value' } : {}),
    })
    expect(w.text()).toBe('empty')
    enabled.value = true
    await nextTick()
    expect(w.text()).toBe('value')
    enabled.value = false
    await nextTick()
    expect(w.text()).toBe('empty')
    w.unmount()
  })
  it('formats precision, separators and affixes', () => {
    const w = mount(Component, {
      props: { value: 1234.5, precision: 2, showGroupSeparator: true, separator: '_', prefix: '$', suffix: 'USD' },
    })
    expect(w.text()).toBe('$1_234.50USD')
    w.unmount()
  })
})

it('safely formats invalid precision and large finite values', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(Component, { props: { value: 12.34, precision: -1 } })
  expect(w.text()).toBe('12')
  await w.setProps({ precision: 101 })
  expect(w.text()).toBe('12')
  await w.setProps({ value: 1e300, precision: 50 })
  expect(w.text()).not.toContain('Infinity')
  expect(w.text()).toContain('e+300')
  await w.setProps({ value: 2.5, precision: 0 })
  expect(w.text()).toBe('3')
  expect(warn).toHaveBeenCalled()
  w.unmount()
  warn.mockRestore()
})

it('avoids animation when finite endpoints would overflow their difference', () => {
  const w = mount(Component, { props: { value: 1e308, valueFrom: -1e308, precision: 2, animation: true } })
  expect(w.text()).toContain('e+308')
  expect(w.text()).not.toContain('Infinity')
  w.unmount()
})

it('does not animate non-finite values and normalizes invalid animation inputs', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(Component, { props: { value: Infinity, valueFrom: NaN, animationDuration: -1, animation: true } })
  expect(w.text()).toBe('Infinity')
  await w.setProps({ value: 10, start: false })
  expect(w.text()).toBe('0')
  expect(warn).toHaveBeenCalled()
  w.unmount()
  warn.mockRestore()
})
