import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('Upload keeps its labels before and after the public locale loads', async () => {
  await import('../../upload/index')
  const { useUploadLocale } = await import('../../upload/use-upload-locale')
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const Inspector = defineComponent({
    setup: () => {
      const labels = useUploadLocale()
      return () => h('output', JSON.stringify(labels.value))
    },
  })
  const wrapper = mount(Inspector)
  const labels = () => JSON.parse(wrapper.text())
  try {
    expect(labels()).toEqual({
      replace: '替换',
      duration: '视频时长',
      upload: '上传',
      dropFiles: '将文件拖拽到此处',
      preview: '预览',
      download: '下载',
      cancel: '取消',
      retry: '重试',
      remove: '删除',
      close: '关闭',
    })
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(labels().upload).toBe(locale.enUS['upload.buttonText'])
    locale.add('upload-partial', {})
    locale.use('upload-partial')
    await nextTick()
    expect(labels().upload).toBe('undefined')
    locale.merge('upload-partial', { 'upload.buttonText': '', 'upload.delete': 'Custom' })
    await nextTick()
    expect(labels()).toMatchObject({ upload: '', remove: 'Custom' })
    locale.use('zh-CN')
    await nextTick()
    expect(labels().upload).toBe('上传')
  } finally {
    wrapper.unmount()
  }
}, 20000)
