import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Upload from '..'

test.each(['beforeAdd', 'beforeRead'])('%s must finish before the editor can confirm', async (key) => {
  let release!: (value: any) => void
  const hook = vi.fn(
    () =>
      new Promise((resolve) => {
        release = resolve
      }),
  )
  const beforeCommit = vi.fn(() => true)
  const file = new File(['data'], 'a.txt', { type: 'text/plain' })
  const wrapper = mount(Upload, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: [],
      autoUpload: false,
      resolveType: 'file',
      [key]: hook,
      beforeCommit,
    },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[type="file"]')
    Object.defineProperty(input.element, 'files', { configurable: true, value: [file] })
    await input.trigger('change')
    await flushPromises()
    expect(hook).toHaveBeenCalledTimes(1)
    const button = wrapper.get('.mp-field-presentation__footer button').element.closest('button')!
    expect(button.disabled).toBe(true)
    await wrapper.get('.mp-field-presentation__footer button').trigger('click')
    await flushPromises()
    expect(wrapper.get('[aria-expanded]').attributes('aria-expanded')).toBe('true')
    expect(beforeCommit).not.toHaveBeenCalled()
    release(key === 'beforeAdd' ? [file] : true)
    await flushPromises()
    expect(button.disabled).toBe(false)
    expect(wrapper.text()).toContain('a.txt')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.get('.mp-field-presentation__footer button').trigger('click')
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([expect.objectContaining({ name: 'a.txt' })])
  } finally {
    wrapper.unmount()
  }
})

test('confirmation waits across hooks and asynchronous file preparation', async () => {
  let releaseRead!: (value: boolean) => void
  let releaseThumbnail!: (value: string) => void
  const beforeRead = vi.fn(
    () =>
      new Promise<boolean>((resolve) => {
        releaseRead = resolve
      }),
  )
  const thumbnail = vi.fn(
    () =>
      new Promise<string>((resolve) => {
        releaseThumbnail = resolve
      }),
  )
  const file = new File(['data'], 'a.txt', { type: 'text/plain' })
  const wrapper = mount(Upload, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: [],
      autoUpload: false,
      resolveType: 'file',
      beforeRead,
      createThumbnailUrl: thumbnail,
    },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[type="file"]')
    Object.defineProperty(input.element, 'files', { configurable: true, value: [file] })
    await input.trigger('change')
    await flushPromises()
    const button = wrapper.get('.mp-field-presentation__footer button').element.closest('button')!
    expect(button.disabled).toBe(true)
    releaseRead(true)
    await flushPromises()
    expect(thumbnail).toHaveBeenCalledTimes(1)
    expect(button.disabled).toBe(true)
    releaseThumbnail('example://thumbnail')
    await flushPromises()
    expect(button.disabled).toBe(false)
    expect(wrapper.text()).toContain('a.txt')
  } finally {
    wrapper.unmount()
  }
})

test.each(['beforeRemove', 'beforeUpload'])(
  '%s blocks field confirmation until the explicit guard settles',
  async (key) => {
    let release!: (value: boolean) => void
    const hook = vi.fn(
      () =>
        new Promise<boolean>((resolve) => {
          release = resolve
        }),
    )
    const beforeCommit = vi.fn(() => true)
    const request = vi.fn(() => ({}))
    const file = new File(['data'], 'existing.txt', { type: 'text/plain' })
    const initial = { uid: 'existing', name: 'existing.txt', file, status: 'ready' as const, percent: 0 }
    const wrapper = mount(Upload, {
      attachTo: document.body,
      props: {
        editMode: 'popup',
        defaultOpen: true,
        popupContainer: false,
        modelValue: [initial],
        autoUpload: false,
        customRequest: request,
        [key]: hook,
        beforeCommit,
      },
    })
    try {
      await flushPromises()
      const work = key === 'beforeRemove' ? wrapper.vm.remove(initial) : wrapper.vm.submit()
      await flushPromises()
      expect(hook).toHaveBeenCalledTimes(1)
      const confirm = wrapper.get('.mp-field-presentation__footer button')
      const button = confirm.element.closest('button')!
      expect(button.disabled).toBe(true)
      await confirm.trigger('click')
      expect(beforeCommit).not.toHaveBeenCalled()
      release(true)
      await work
      await flushPromises()
      expect(button.disabled).toBe(false)
      if (key === 'beforeUpload') {
        expect(request).toHaveBeenCalledTimes(1)
      }
      await confirm.trigger('click')
      await flushPromises()
      expect(beforeCommit).toHaveBeenCalledTimes(1)
      if (key === 'beforeRemove') {
        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([])
      }
    } finally {
      wrapper.unmount()
    }
  },
)

test('overlapping beforeUpload guards keep confirmation disabled until all settle', async () => {
  const release: Array<(value: boolean) => void> = []
  const beforeUpload = vi.fn(
    () =>
      new Promise<boolean>((resolve) => {
        release.push(resolve)
      }),
  )
  const request = vi.fn(() => ({}))
  const files = ['a', 'b'].map((uid) => ({
    uid,
    name: `${uid}.txt`,
    file: new File([uid], `${uid}.txt`),
    status: 'ready' as const,
    percent: 0,
  }))
  const wrapper = mount(Upload, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: files,
      autoUpload: false,
      customRequest: request,
      beforeUpload,
    },
  })
  try {
    await flushPromises()
    const work = wrapper.vm.submit()
    await flushPromises()
    expect(beforeUpload).toHaveBeenCalledTimes(2)
    const button = wrapper.get('.mp-field-presentation__footer button').element.closest('button')!
    expect(button.disabled).toBe(true)
    release[0](true)
    await flushPromises()
    expect(button.disabled).toBe(true)
    release[1](true)
    await work
    await flushPromises()
    expect(button.disabled).toBe(false)
    expect(request).toHaveBeenCalledTimes(2)
  } finally {
    wrapper.unmount()
  }
})

test.each(['beforeRemove', 'beforeUpload'])('closing ignores late %s results', async (key) => {
  let release!: (value: boolean) => void
  const hook = vi.fn(
    () =>
      new Promise<boolean>((resolve) => {
        release = resolve
      }),
  )
  const request = vi.fn(() => ({}))
  const beforeCommit = vi.fn(() => true)
  const initial = {
    uid: 'existing',
    name: 'existing.txt',
    file: new File(['data'], 'existing.txt'),
    status: 'ready' as const,
    percent: 0,
  }
  const wrapper = mount(Upload, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: [initial],
      autoUpload: false,
      customRequest: request,
      [key]: hook,
      beforeCommit,
    },
  })
  try {
    await flushPromises()
    const work = key === 'beforeRemove' ? wrapper.vm.remove(initial) : wrapper.vm.submit()
    await flushPromises()
    expect(hook).toHaveBeenCalledTimes(1)
    await wrapper.get('.mp-field-presentation__close').trigger('click')
    await flushPromises()
    release(true)
    await work
    await flushPromises()
    expect(beforeCommit).not.toHaveBeenCalled()
    expect(request).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.get('[aria-expanded]').attributes('aria-expanded')).toBe('false')
  } finally {
    wrapper.unmount()
  }
})

test('disabled reset preserves an active removal guard in direct mode', async () => {
  let release!: (value: boolean) => void
  const beforeRemove = vi.fn(
    () =>
      new Promise<boolean>((resolve) => {
        release = resolve
      }),
  )
  const file = {
    uid: 'existing',
    name: 'existing.txt',
    file: new File(['data'], 'existing.txt'),
    status: 'ready' as const,
    percent: 0,
  }
  const wrapper = mount(Upload, { props: { editMode: 'direct', defaultValue: [file], beforeRemove } })
  try {
    const work = wrapper.vm.remove(file)
    await flushPromises()
    expect(wrapper.get('.mp-upload').attributes('aria-busy')).toBe('true')
    await wrapper.setProps({ disabled: true })
    await wrapper.vm.reset()
    await wrapper.setProps({ disabled: false })
    expect(wrapper.get('.mp-upload').attributes('aria-busy')).toBe('true')
    release(true)
    await work
    await flushPromises()
    expect(wrapper.get('.mp-upload').attributes('aria-busy')).toBeUndefined()
    expect(wrapper.vm.getFiles()).toEqual([])
  } finally {
    wrapper.unmount()
  }
})
