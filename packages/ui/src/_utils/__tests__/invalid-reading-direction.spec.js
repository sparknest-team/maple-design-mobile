import { resolveDirection } from '@maple-design/use-vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Slider from '../../slider'

test.each(['document', 'open', 'closed'])('ignores invalid direction attributes in %s', async (mode) => {
  const host = document.createElement('div')
  host.dir = 'rtl'
  document.body.append(host)
  const root = mode === 'document' ? host : host.attachShadow({ mode })
  const scope = document.createElement('div')
  const mountPoint = document.createElement('div')
  scope.setAttribute('dir', 'invalid')
  root.append(scope)
  scope.append(mountPoint)
  const wrapper = mount(Slider, { attachTo: mountPoint, props: { editMode: 'direct', defaultValue: 20 } })
  try {
    await flushPromises()
    const thumb = wrapper.get('[role="slider"]')
    expect(resolveDirection(thumb.element)).toBe('rtl')
    expect(thumb.element.style.left).toBe('80%')
    for (const value of ['', ' RTL ', 'invalid']) {
      scope.setAttribute('dir', value)
      await flushPromises()
      expect(resolveDirection(thumb.element)).toBe('rtl')
      expect(thumb.element.style.left).toBe('80%')
    }
    scope.dir = 'ltr'
    await flushPromises()
    expect(thumb.element.style.left).toBe('20%')
    scope.setAttribute('dir', 'invalid')
    await flushPromises()
    expect(thumb.element.style.left).toBe('80%')
    host.dir = 'ltr'
    await flushPromises()
    expect(thumb.element.style.left).toBe('20%')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('retains the supplied fallback when no valid ancestor exists', () => {
  const scope = document.createElement('div')
  scope.setAttribute('dir', 'invalid')
  const child = document.createElement('span')
  scope.append(child)
  expect(resolveDirection(child, 'rtl')).toBe('rtl')
  scope.setAttribute('dir', 'RTL')
  expect(resolveDirection(child)).toBe('rtl')
})
