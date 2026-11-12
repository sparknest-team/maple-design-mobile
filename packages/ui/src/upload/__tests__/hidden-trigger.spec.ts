import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Upload from '..'

it.each(['hidden', 'inert'] as const)('ignores a trigger hidden by %s and updates when exposed', async (attribute) => {
  const hidden = ref(true)
  const wrapper = mount(
    {
      setup: () => () =>
        h(
          Upload,
          { editMode: 'direct', ripple: false },
          {
            trigger: () => [
              h('div', { [attribute]: hidden.value ? '' : undefined }, [h('button', 'Hidden')]),
              h('span', 'Choose'),
            ],
          },
        ),
    },
    { attachTo: document.body },
  )
  try {
    await flushPromises()
    const trigger = () => wrapper.get('[class*="upload__trigger"]')
    expect(trigger().attributes('role')).toBe('button')
    expect(trigger().attributes('tabindex')).toBe('0')
    hidden.value = false
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBeUndefined()
    expect(trigger().attributes('tabindex')).toBeUndefined()
    hidden.value = true
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBe('button')
  } finally {
    wrapper.unmount()
  }
})

it('still treats aria-hidden interactive controls as focusable', async () => {
  const wrapper = mount(Upload, {
    props: { editMode: 'direct', ripple: false },
    slots: { trigger: () => h('div', { 'aria-hidden': 'true' }, h('button', 'Focusable')) },
  })
  try {
    await flushPromises()
    expect(wrapper.get('[class*="upload__trigger"]').attributes('role')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

it.each(['hidden', 'inert'] as const)('keyboard and custom button choose once when %s changes', async (attribute) => {
  const hidden = ref(true)
  const wrapper = mount({
    setup: () => () =>
      h(
        Upload,
        { editMode: 'direct', ripple: false },
        {
          trigger: () => [
            h('div', { [attribute]: hidden.value ? '' : undefined }, [h('button', { type: 'button' }, 'Custom')]),
            h('span', 'Choose'),
          ],
        },
      ),
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[type="file"]').element as HTMLInputElement
    const open = vi.spyOn(input, 'click').mockImplementation(() => {})
    const trigger = () => wrapper.get('[class*="upload__trigger"]')
    await trigger().trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(open).toHaveBeenCalledTimes(1)
    await trigger().trigger('keydown', { key: ' ' })
    await flushPromises()
    expect(open).toHaveBeenCalledTimes(2)
    hidden.value = false
    await nextTick()
    await flushPromises()
    await wrapper.get('button').trigger('click')
    await flushPromises()
    expect(open).toHaveBeenCalledTimes(3)
    open.mockRestore()
  } finally {
    wrapper.unmount()
  }
})

it.each(['style', 'class'] as const)('updates when a custom trigger is hidden with %s', async (mode) => {
  const hidden = ref(true)
  const style = document.createElement('style')
  style.textContent = '.upload-trigger-test-hidden { display: none }'
  document.head.append(style)
  const wrapper = mount(
    {
      setup: () => () =>
        h(
          Upload,
          { editMode: 'direct', ripple: false },
          {
            trigger: () => [
              h(
                'div',
                {
                  class: mode === 'class' && hidden.value ? 'upload-trigger-test-hidden' : undefined,
                  style: mode === 'style' && hidden.value ? { display: 'none' } : undefined,
                },
                [h('button', 'Hidden')],
              ),
              h('span', 'Choose'),
            ],
          },
        ),
    },
    { attachTo: document.body },
  )
  try {
    await flushPromises()
    const trigger = () => wrapper.get('[class*="upload__trigger"]')
    expect(trigger().attributes('role')).toBe('button')
    hidden.value = false
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBeUndefined()
    hidden.value = true
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBe('button')
  } finally {
    wrapper.unmount()
    style.remove()
  }
})

it('respects visibility inherited by a button and a visible override', async () => {
  const visible = ref(false)
  const wrapper = mount(
    {
      setup: () => () =>
        h(
          Upload,
          { editMode: 'direct', ripple: false },
          {
            trigger: () => [
              h('div', { style: { visibility: 'hidden' } }, [
                h('button', { style: { visibility: visible.value ? 'visible' : 'hidden' } }, 'Custom'),
              ]),
              h('span', 'Choose'),
            ],
          },
        ),
    },
    { attachTo: document.body },
  )
  try {
    await flushPromises()
    const trigger = () => wrapper.get('[class*="upload__trigger"]')
    expect(trigger().attributes('role')).toBe('button')
    visible.value = true
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBeUndefined()
    visible.value = false
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBe('button')
  } finally {
    wrapper.unmount()
  }
})

it('ignores hidden inputs with tabindex and updates when their type becomes text', async () => {
  const type = ref('hidden')
  const wrapper = mount(
    {
      setup: () => () =>
        h(
          Upload,
          { editMode: 'direct', ripple: false },
          {
            trigger: () => [
              h('input', { type: type.value, tabindex: 0, style: { display: 'block' } }),
              h('span', 'Choose'),
            ],
          },
        ),
    },
    { attachTo: document.body },
  )
  try {
    const trigger = () => wrapper.get('[class*="upload__trigger"]')
    await flushPromises()
    expect(trigger().attributes('role')).toBe('button')
    expect(trigger().attributes('tabindex')).toBe('0')
    type.value = 'text'
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBeUndefined()
    type.value = 'hidden'
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBe('button')
  } finally {
    wrapper.unmount()
  }
})
