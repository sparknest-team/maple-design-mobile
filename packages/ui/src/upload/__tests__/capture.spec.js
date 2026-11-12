import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Upload from '..'

test('photo selection omits capture unless camera capture is requested', async () => {
  const wrapper = mount(Upload, { props: { accept: 'image/*' } })
  const input = wrapper.get('input[type="file"]')
  expect(input.attributes('accept')).toBe('image/*')
  expect(input.element.hasAttribute('capture')).toBe(false)

  for (const [capture, expected] of [
    [true, ''],
    ['user', 'user'],
    ['environment', 'environment'],
    ['', ''],
    [false, undefined],
    [undefined, undefined],
  ]) {
    await wrapper.setProps({ capture })
    expect(input.attributes('capture')).toBe(expected)
  }
  wrapper.unmount()
})

test('server-rendered photo selection does not request camera capture by default', async () => {
  for (const props of [{}, { capture: false }]) {
    const html = await renderToString(createSSRApp({ render: () => h(Upload, { accept: 'image/*', ...props }) }))
    expect(html).toContain('accept="image/*"')
    expect(html).not.toMatch(/\scapture(?:=|\s|>)/)
  }
})
