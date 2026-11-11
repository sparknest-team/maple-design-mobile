import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('Image retains preview labels when the public locale loads later', async () => {
  await import('../../image/index')
  const { useActionLabels, useImagePreviewLabel } = await import('../../image/platform')
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const Inspector = defineComponent({
    setup() {
      const actions = useActionLabels()
      const preview = useImagePreviewLabel()
      return () => h('output', JSON.stringify({ ...actions.value, preview: preview.value }))
    },
  })
  const wrapper = mount(Inspector)
  const labels = () => JSON.parse(wrapper.text())
  try {
    expect(labels()).toEqual({
      prev: '上一张图片',
      next: '下一张图片',
      fullScreen: '全屏',
      rotateLeft: '向左旋转',
      rotateRight: '向右旋转',
      originalSize: '原始尺寸',
      zoomOut: '缩小',
      zoomIn: '放大',
      download: '下载图片',
      close: '关闭图片预览',
      preview: '预览图片',
    })
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(labels()).toEqual({
      prev: locale.enUS['imagePreview.prev'],
      next: locale.enUS['imagePreview.next'],
      fullScreen: locale.enUS['imagePreview.fullScreen'],
      rotateLeft: locale.enUS['imagePreview.rotateLeft'],
      rotateRight: locale.enUS['imagePreview.rotateRight'],
      originalSize: locale.enUS['imagePreview.originalSize'],
      zoomOut: locale.enUS['imagePreview.zoomOut'],
      zoomIn: locale.enUS['imagePreview.zoomIn'],
      download: locale.enUS['imagePreview.download'],
      close: locale.enUS['imagePreview.close'],
      preview: locale.enUS['image.preview'],
    })
    locale.add('image-partial', {})
    locale.use('image-partial')
    await nextTick()
    expect(labels()).toEqual({
      prev: 'Previous image',
      next: 'Next image',
      fullScreen: 'Fullscreen',
      rotateLeft: 'Rotate left',
      rotateRight: 'Rotate right',
      originalSize: 'Original size',
      zoomOut: 'Zoom out',
      zoomIn: 'Zoom in',
      download: 'Download image',
      close: 'Close image preview',
      preview: 'Preview image',
    })
    locale.merge('image-partial', { 'image.preview': '', 'imagePreview.close': 'Dismiss' })
    await nextTick()
    expect(labels()).toMatchObject({ preview: '', close: 'Dismiss' })
    locale.use('zh-CN')
    await nextTick()
    expect(labels().preview).toBe('预览图片')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { 'image.preview': 'Scoped', 'imagePreview.close': '' } } },
          { default: () => h(Inspector) },
        ),
    })
    try {
      expect(JSON.parse(scoped.get('output').text())).toMatchObject({ preview: 'Scoped', close: '' })
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 20000)
