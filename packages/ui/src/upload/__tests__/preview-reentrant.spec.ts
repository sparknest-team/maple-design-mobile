import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, expect, test, vi } from 'vitest'
import Upload from '..'
import { previewImage } from '../../image/preview'
import PreviewPresentation from '../preview-presentation.vue'

vi.mock('../../image/preview', () => ({ previewImage: vi.fn(() => ({ close: vi.fn() })) }))

beforeEach(() => {
  vi.mocked(previewImage).mockClear()
})

for (const scenario of ['normal', 'prevented', 'reset', 'unmount'] as const) {
  test(`image preview respects synchronous ${scenario}`, async () => {
    const file = {
      uid: 'one',
      name: 'photo.png',
      url: 'https://example.test/photo.png',
      type: 'image/png',
      status: 'success' as const,
      percent: 100,
    }
    let unmounted = false
    const wrapper = mount(Upload, {
      attachTo: document.body,
      props: {
        defaultValue: [file],
        onPreview: (_file, event) => {
          if (scenario === 'prevented') {
            event.preventDefault()
          }
          if (scenario === 'reset') {
            wrapper.vm.reset()
          }
          if (scenario === 'unmount') {
            unmounted = true
            wrapper.unmount()
          }
        },
      },
    })
    try {
      wrapper.vm.preview(file)
      await flushPromises()
      expect(previewImage).toHaveBeenCalledTimes(scenario === 'normal' ? 1 : 0)
    } finally {
      if (!unmounted) {
        wrapper.vm.closePreview()
        wrapper.unmount()
      }
    }
  })
}

for (const scenario of ['normal', 'prevented', 'reset'] as const) {
  test(`video preview respects synchronous ${scenario}`, async () => {
    const file = {
      uid: 'video',
      name: 'clip.mp4',
      url: 'https://example.test/clip.mp4',
      type: 'video/mp4',
      status: 'success' as const,
      percent: 100,
    }
    const wrapper = mount(Upload, {
      props: {
        defaultValue: [file],
        onPreview: (_file, event) => {
          if (scenario === 'prevented') {
            event.preventDefault()
          }
          if (scenario === 'reset') {
            wrapper.vm.reset()
          }
        },
      },
    })
    try {
      wrapper.vm.preview(file)
      await flushPromises()
      expect(wrapper.findComponent(PreviewPresentation).props('file')).toEqual(scenario === 'normal' ? file : undefined)
    } finally {
      wrapper.vm.closePreview()
      wrapper.unmount()
    }
  })
}

test('readonly upload can preview a file outside the list', async () => {
  const file = {
    uid: 'external',
    name: 'photo.png',
    url: 'https://example.test/photo.png',
    type: 'image/png',
    status: 'success' as const,
    percent: 100,
  }
  const wrapper = mount(Upload, { props: { readonly: true } })
  try {
    wrapper.vm.preview(file)
    expect(previewImage).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.vm.closePreview()
    wrapper.unmount()
  }
})

test('a nested preview request wins over the older preview event', async () => {
  const first = {
    uid: 'first',
    name: 'first.png',
    url: 'https://example.test/first.png',
    type: 'image/png',
    status: 'success' as const,
    percent: 100,
  }
  const second = {
    uid: 'second',
    name: 'second.png',
    url: 'https://example.test/second.png',
    type: 'image/png',
    status: 'success' as const,
    percent: 100,
  }
  const wrapper = mount(Upload, {
    props: {
      onPreview: (file) => {
        if (file.uid === 'first') {
          wrapper.vm.preview(second)
        }
      },
    },
  })
  try {
    wrapper.vm.preview(first)
    expect(previewImage).toHaveBeenCalledTimes(1)
    const options = vi.mocked(previewImage).mock.calls[0][0]
    expect(typeof options === 'object' && !Array.isArray(options) && options.images).toEqual([second.url])
  } finally {
    wrapper.vm.closePreview()
    wrapper.unmount()
  }
})

for (const firstType of ['image', 'video'] as const) {
  test(`nested preview switches from ${firstType} to the newer media`, async () => {
    const image = {
      uid: 'image',
      name: 'photo.png',
      url: 'https://example.test/photo.png',
      type: 'image/png',
      status: 'success' as const,
      percent: 100,
    }
    const video = {
      uid: 'video',
      name: 'clip.mp4',
      url: 'https://example.test/clip.mp4',
      type: 'video/mp4',
      status: 'success' as const,
      percent: 100,
    }
    const first = firstType === 'image' ? image : video
    const second = firstType === 'image' ? video : image
    const wrapper = mount(Upload, {
      props: {
        onPreview: (file) => {
          if (file.uid === first.uid) {
            wrapper.vm.preview(second)
          }
        },
      },
    })
    try {
      wrapper.vm.preview(first)
      await flushPromises()
      expect(previewImage).toHaveBeenCalledTimes(firstType === 'video' ? 1 : 0)
      expect(wrapper.findComponent(PreviewPresentation).props('file')).toEqual(
        firstType === 'image' ? video : undefined,
      )
    } finally {
      wrapper.vm.closePreview()
      wrapper.unmount()
    }
  })
}
