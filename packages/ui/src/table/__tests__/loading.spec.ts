import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Table from '..'

test('boolean and object loading match the controlled table contract and retain rows', async () => {
  const w = mount(Table, { props: { loading: true }, slots: { default: '<tbody><tr><td>A</td></tr></tbody>' } })
  try {
    const row = w.get('tr').element
    expect(w.attributes('aria-busy')).toBe('true')
    await w.setProps({ loading: { loading: false, size: 24 } })
    expect(w.find('.mp-loading').exists()).toBe(false)
    await w.setProps({ loading: { size: 24 } })
    expect(w.find('.mp-loading').exists()).toBe(false)
    await w.setProps({ loading: { loading: true, size: 24 } })
    expect(w.find('.mp-loading').exists()).toBe(true)
    expect(w.get('tr').element).toBe(row)
    await w.setProps({ loading: false })
    expect(w.attributes('aria-busy')).toBeUndefined()
  } finally {
    w.unmount()
  }
})
