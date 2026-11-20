import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Trigger from '..'

it('retains current caller descriptions when they change on an active reference', async () => {
  const original = ref('before')
  const instance = ref<any>()
  const wrapper = mount(
    {
      render: () =>
        h(
          Trigger,
          { ref: instance, open: true, popupContainer: false, referenceAttrs: { 'aria-describedby': 'auto' } },
          {
            default: () => h('button', { 'aria-describedby': original.value }, 'Anchor'),
            content: () => 'Details',
          },
        ),
    },
    { attachTo: document.body },
  )
  const outside = document.createElement('button')
  document.body.append(outside)
  try {
    await nextTick()
    await nextTick()
    const button = wrapper.get('button').element
    expect(button.getAttribute('aria-describedby')?.split(/\s+/)).toEqual(['before', 'auto'])
    original.value = 'after'
    await nextTick()
    await nextTick()
    expect(button.getAttribute('aria-describedby')?.split(/\s+/)).toEqual(['after', 'auto'])
    instance.value.setReference(outside)
    await nextTick()
    await nextTick()
    expect(button.getAttribute('aria-describedby')).toBe('after')
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

it('preserves simultaneous caller and reference attribute updates', async () => {
  const original = ref('before')
  const extra = ref('auto-old')
  const instance = ref<any>()
  const wrapper = mount(
    {
      render: () =>
        h(
          Trigger,
          { ref: instance, open: true, popupContainer: false, referenceAttrs: { 'aria-describedby': extra.value } },
          {
            default: () => h('button', { 'aria-describedby': original.value }, 'Anchor'),
            content: () => 'Details',
          },
        ),
    },
    { attachTo: document.body },
  )
  const outside = document.createElement('button')
  document.body.append(outside)
  try {
    await nextTick()
    await nextTick()
    const button = wrapper.get('button').element
    original.value = 'after'
    extra.value = 'auto-new'
    await nextTick()
    await nextTick()
    expect(button.getAttribute('aria-describedby')?.split(/\s+/)).toEqual(['after', 'auto-new'])
    instance.value.setReference(outside)
    await nextTick()
    await nextTick()
    expect(button.getAttribute('aria-describedby')).toBe('after')
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})
