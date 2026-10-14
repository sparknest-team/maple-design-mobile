import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Message, { messageProps } from '..'
import VarMessage from '../Message.vue'

test('message component plugin and public contract', () => {
  const app = createApp({}).use(Message.Component)
  expect(app.component(VarMessage.name)).toBeTruthy()
  expect(messageProps.status.validator('danger')).toBe(true)
  expect(messageProps.position.validator('center')).toBe(true)
  expect(messageProps.duration.validator(0)).toBe(true)
})

test('message component is controlled and exposes an accessible close button', async () => {
  const wrapper = mount(VarMessage, {
    props: { open: true, popupContainer: false, closable: true, duration: 0, content: 'Message' },
  })
  await wrapper.get('button[aria-label="Close message"]').trigger('click')
  expect(wrapper.emitted('update:open')).toEqual([[false]])
  expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  await wrapper.setProps({ open: false })
  expect(wrapper.emitted('close')).toHaveLength(1)
})

test('message variants apply to component, service, defaults and id updates', async () => {
  expect(messageProps.variant.default).toBe('neutral')
  expect(messageProps.variant.validator('tonal')).toBe(true)
  const wrapper = mount(VarMessage, { props: { open: true, popupContainer: false, duration: 0 } })
  expect(wrapper.find('.mp-message--variant-neutral').exists()).toBe(true)
  for (const variant of ['neutral', 'tonal', 'solid']) {
    await wrapper.setProps({ variant })
    expect(wrapper.find('.mp-message--variant-' + variant).exists()).toBe(true)
  }
  wrapper.unmount()
  Message.setDefaultOptions({ variant: 'tonal', duration: 0 })
  Message.info({ id: 'variant-check', content: 'tonal' })
  await Promise.resolve()
  expect(document.body.querySelector('.mp-message--variant-tonal')).toBeTruthy()
  Message.success({ id: 'variant-check', variant: 'neutral', content: 'updated' })
  await Promise.resolve()
  expect(document.body.querySelector('.mp-message--variant-neutral')).toBeTruthy()
  expect(document.body.querySelector('.mp-message--variant-tonal')).toBeFalsy()
  Message.clear()
  Message.resetDefaultOptions()
})

test('message emits one lifecycle sequence per open cycle', async () => {
  const wrapper = mount(VarMessage, { props: { open: false, popupContainer: false, duration: 0 } })
  await wrapper.setProps({ open: true })
  await wrapper.setProps({ open: false })
  expect(wrapper.emitted('open')).toHaveLength(1)
  expect(wrapper.emitted('close')).toHaveLength(1)
})
