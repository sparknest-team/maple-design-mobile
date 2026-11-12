import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Switch from '..'
import Input from '../../input'

test('beforeChange must complete before draft and beforeCommit can submit it', async () => {
  let allowChange, allowCommit
  const beforeChange = vi.fn(
    () =>
      new Promise((resolve) => {
        allowChange = resolve
      }),
  )
  const beforeCommit = vi.fn(
    () =>
      new Promise((resolve) => {
        allowCommit = resolve
      }),
  )
  const wrapper = mount(Switch, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: false,
      beforeChange,
      beforeCommit,
    },
  })
  try {
    await flushPromises()
    const control = wrapper.get('[role="switch"]')
    await control.trigger('click')
    expect(beforeChange).toHaveBeenCalledTimes(1)
    expect(control.attributes('aria-checked')).toBe('false')
    expect(beforeCommit).not.toHaveBeenCalled()
    allowChange(true)
    await flushPromises()
    expect(control.attributes('aria-checked')).toBe('true')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.get('.mp-field-presentation__footer button').trigger('click')
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(beforeCommit.mock.calls[0][0]).toEqual({ value: true, previousValue: false })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    allowCommit(true)
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  } finally {
    wrapper.unmount()
  }
})

test('rejected change and commit retain the previous external value', async () => {
  const beforeChange = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true)
  const beforeCommit = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true)
  const wrapper = mount(Switch, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: false,
      beforeChange,
      beforeCommit,
    },
  })
  try {
    await flushPromises()
    const control = wrapper.get('[role="switch"]')
    await control.trigger('click')
    await flushPromises()
    expect(control.attributes('aria-checked')).toBe('false')
    expect(beforeCommit).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await control.trigger('click')
    await flushPromises()
    expect(control.attributes('aria-checked')).toBe('true')
    await wrapper.get('.mp-field-presentation__footer button').trigger('click')
    await flushPromises()
    expect(control.attributes('aria-checked')).toBe('true')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.get('.mp-field-presentation__footer button').trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(beforeChange).toHaveBeenCalledTimes(2)
    expect(beforeCommit).toHaveBeenCalledTimes(2)
  } finally {
    wrapper.unmount()
  }
})

test('pending change blocks confirmation until its draft is ready', async () => {
  let resolveChange, signal
  const beforeChange = vi.fn((_value, _done, context) => {
    signal = context.signal
    return new Promise((resolve) => {
      resolveChange = resolve
    })
  })
  const beforeCommit = vi.fn(() => true)
  const wrapper = mount(Switch, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: false,
      beforeChange,
      beforeCommit,
    },
  })
  try {
    await flushPromises()
    await wrapper.get('[role="switch"]').trigger('click')
    expect(signal.aborted).toBe(false)
    await wrapper.get('.mp-field-presentation__footer button').trigger('click')
    await flushPromises()
    expect(wrapper.get('[aria-expanded]').attributes('aria-expanded')).toBe('true')
    expect(signal.aborted).toBe(false)
    expect(beforeCommit).not.toHaveBeenCalled()
    resolveChange(true)
    await flushPromises()
    expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe('true')
    await wrapper.get('.mp-field-presentation__footer button').trigger('click')
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  } finally {
    wrapper.unmount()
  }
})

test.each(['close', 'unmount'])('%s aborts a pending change and ignores its late result', async (action) => {
  let resolveChange, signal
  const beforeChange = vi.fn((_value, _done, context) => {
    signal = context.signal
    return new Promise((resolve) => {
      resolveChange = resolve
    })
  })
  const beforeCommit = vi.fn(() => true)
  const wrapper = mount(Switch, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: false,
      beforeChange,
      beforeCommit,
    },
  })
  try {
    await flushPromises()
    await wrapper.get('[role="switch"]').trigger('click')
    if (action === 'close') {
      await wrapper.get('.mp-field-presentation__close').trigger('click')
    } else {
      wrapper.unmount()
    }
    await flushPromises()
    expect(signal.aborted).toBe(true)
    resolveChange(true)
    await flushPromises()
    expect(beforeCommit).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    if (action !== 'unmount') {
      wrapper.unmount()
    }
  }
})

test('closing and reopening clears the old pending state and ignores its late rejection', async () => {
  let rejectChange, signal
  const beforeChange = vi.fn((_value, _done, context) => {
    signal = context.signal
    return new Promise((_resolve, reject) => {
      rejectChange = reject
    })
  })
  const beforeCommit = vi.fn(() => true)
  const wrapper = mount(Switch, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: false,
      beforeChange,
      beforeCommit,
    },
  })
  try {
    await flushPromises()
    await wrapper.get('[role="switch"]').trigger('click')
    await wrapper.get('.mp-field-presentation__close').trigger('click')
    await flushPromises()
    expect(signal.aborted).toBe(true)
    await wrapper.get('[aria-expanded]').trigger('click')
    await flushPromises()
    const confirm = wrapper.get('.mp-field-presentation__footer button')
    const button = confirm.element.closest('button')
    expect(button.disabled).toBe(false)
    rejectChange(new Error('late failure'))
    await flushPromises()
    expect(wrapper.get('[aria-expanded]').attributes('aria-expanded')).toBe('true')
    expect(button.disabled).toBe(false)
    expect(beforeCommit).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('a rejected beforeChange re-enables confirmation without changing the draft', async () => {
  let rejectChange
  const beforeChange = vi.fn(
    () =>
      new Promise((_resolve, reject) => {
        rejectChange = reject
      }),
  )
  const wrapper = mount(Switch, {
    attachTo: document.body,
    props: { editMode: 'popup', defaultOpen: true, popupContainer: false, modelValue: false, beforeChange },
  })
  try {
    await flushPromises()
    await wrapper.get('[role="switch"]').trigger('click')
    const button = wrapper.get('.mp-field-presentation__footer button').element.closest('button')
    expect(button.disabled).toBe(true)
    rejectChange(new Error('denied'))
    await flushPromises()
    expect(button.disabled).toBe(false)
    expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe('false')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('a nested Switch wait does not disable an Input editor confirmation', async () => {
  let resolveInner, signal
  const wrapper = mount(Input, {
    attachTo: document.body,
    props: { editMode: 'popup', defaultOpen: true, popupContainer: false, modelValue: 'old' },
    slots: {
      suffix: () =>
        h(Switch, {
          editMode: 'direct',
          beforeChange: (_value, _done, context) => {
            signal = context.signal
            return new Promise((resolve) => {
              resolveInner = resolve
            })
          },
        }),
    },
  })
  try {
    await flushPromises()
    await wrapper.get('[role="switch"]').trigger('click')
    await flushPromises()
    expect(signal.aborted).toBe(false)
    expect(wrapper.get('.mp-field-presentation__footer button').element.closest('button').disabled).toBe(false)
    resolveInner(true)
    await flushPromises()
  } finally {
    wrapper.unmount()
  }
})
