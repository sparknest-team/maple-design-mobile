import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Dialog from '../../dialog/Dialog.vue'
import Card from '../Card.vue'

test('Escape is delivered to an inline nested dialog before its expanded card', async () => {
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: true, ripple: false },
    slots: {
      default: () =>
        h(
          Dialog,
          { open: true, popupContainer: false, title: 'Inner dialog' },
          { default: () => h('input', { 'aria-label': 'Dialog input' }) },
        ),
    },
  })
  try {
    await nextTick()
    const dialog = wrapper.findComponent(Dialog)
    await wrapper.get('input').trigger('keydown', { key: 'Escape' })
    expect(dialog.emitted('update:open')).toEqual([[false]])
    expect(wrapper.emitted('update:floating')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('a nested dialog that disables Escape still prevents its card from closing', async () => {
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: true, ripple: false },
    slots: {
      default: () => h(Dialog, { open: true, popupContainer: false, escToClose: false }, { default: () => h('input') }),
    },
  })
  try {
    await nextTick()
    await wrapper.get('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.findComponent(Dialog).emitted('update:open')).toBeUndefined()
    expect(wrapper.emitted('update:floating')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('an inline nested dialog with a low explicit z-index handles Escape before its card', async () => {
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: true, ripple: false },
    slots: {
      default: () => h(Dialog, { open: true, popupContainer: false, zIndex: 1 }, { default: () => h('input') }),
    },
  })
  try {
    await nextTick()
    await wrapper.get('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.findComponent(Dialog).emitted('update:open')).toEqual([[false]])
    expect(wrapper.emitted('update:floating')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
