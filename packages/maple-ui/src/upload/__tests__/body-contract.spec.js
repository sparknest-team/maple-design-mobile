import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Upload from '..'
import { formHost } from '../../input-number/__tests__/form-host'

const item = {
  uid: 'file',
  name: 'paper.pdf',
  type: 'application/pdf',
  url: 'data:application/pdf,example',
  status: 'success',
  percent: 100,
}
describe('Upload body contract', () => {
  test('SSR renders without browser reading or request APIs', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Upload, { defaultValue: [item] }) }))
    expect(html).toContain('paper.pdf')
    expect(html).toContain('type="file"')
  })
  test('non-images never render as broken image thumbnails', () => {
    const wrapper = mount(Upload, { props: { defaultValue: [item], listType: 'picture' } })
    expect(wrapper.find('img').exists()).toBe(false)
    wrapper.unmount()
  })
  test('disabled download has no href or keyboard entry', () => {
    const wrapper = mount(Upload, { props: { defaultValue: [item], showDownloadButton: true, disabled: true } })
    expect(wrapper.get('a').attributes('href')).toBeUndefined()
    expect(wrapper.get('a').attributes('tabindex')).toBe('-1')
    wrapper.unmount()
  })
  test('programmatic preview exposes a cancelable event', () => {
    const onPreview = vi.fn((_file, event) => event.preventDefault())
    const wrapper = mount(Upload, { props: { defaultValue: [item], onPreview } })
    wrapper.vm.preview(item)
    expect(onPreview).toHaveBeenCalledTimes(1)
    expect(onPreview.mock.calls[0][1].defaultPrevented).toBe(true)
    wrapper.unmount()
  })
  test('nested trigger button keyboard does not invoke chooser twice', async () => {
    const requestChoose = vi.fn()
    const wrapper = mount(Upload, { props: { requestChoose }, slots: { trigger: () => h('button', 'Choose') } })
    await wrapper.get('button').trigger('keydown', { key: 'Enter' })
    expect(requestChoose).not.toHaveBeenCalled()
    await wrapper.get('button').trigger('click')
    expect(requestChoose).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
  test('Form disabled inherits, explicit false overrides and removal validates once', async () => {
    const onChange = vi.fn()
    const inherited = mount(formHost({ disabled: true }, {}, () => h(Upload)))
    expect(inherited.get('input').attributes('disabled')).toBeDefined()
    inherited.unmount()
    const wrapper = mount(
      formHost({ disabled: true }, { onChange }, () => h(Upload, { defaultValue: [item], disabled: false })),
    )
    const upload = wrapper.findComponent(Upload)
    expect(wrapper.get('input').attributes('disabled')).toBeUndefined()
    await upload.vm.remove(item)
    await nextTick()
    expect(onChange).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
