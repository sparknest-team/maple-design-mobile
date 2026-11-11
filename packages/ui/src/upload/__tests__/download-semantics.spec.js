import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Upload from '..'

const owners = []
afterEach(() => owners.splice(0).forEach((w) => w.unmount()))
const item = { uid: 'doc', name: 'report.txt', url: 'data:text/plain,report', status: 'success', percent: 100 }
const render = (extra) => {
  const w = mount(Upload, {
    props: {
      editMode: 'direct',
      defaultValue: [item],
      showUploadButton: false,
      showPreviewButton: false,
      showRemoveButton: false,
      showDownloadButton: true,
      ...extra,
    },
  })
  owners.push(w)
  return w
}
test('disabled download retains a link role with no navigation target or Tab entry', () => {
  const w = render({ disabled: true })
  const a = w.get('a')
  expect(a.attributes('role')).toBe('link')
  expect(a.attributes('href')).toBeUndefined()
  expect(a.attributes('aria-disabled')).toBe('true')
  expect(a.attributes('tabindex')).toBe('-1')
  const event = new a.element.ownerDocument.defaultView.MouseEvent('click', { bubbles: true, cancelable: true })
  a.element.dispatchEvent(event)
  expect(event.defaultPrevented).toBe(true)
})
test('readonly still allows download and dynamic disabled restoration preserves its file target', async () => {
  const w = render({ readonly: true })
  const a = w.get('a')
  expect(a.attributes('href')).toBe(item.url)
  expect(a.attributes('download')).toBe(item.name)
  expect(a.attributes('aria-disabled')).toBeUndefined()
  await w.setProps({ disabled: true })
  expect(a.attributes('role')).toBe('link')
  expect(a.attributes('href')).toBeUndefined()
  await w.setProps({ disabled: false })
  expect(a.attributes('href')).toBe(item.url)
  expect(a.attributes('download')).toBe(item.name)
  expect(a.attributes('tabindex')).toBeUndefined()
})
