import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Message, { _MessageComponent, messageProps } from '..'

beforeEach(() => vi.useFakeTimers())
afterEach(async () => {
  Message.clear()
  await vi.runAllTimersAsync()
  document.body.innerHTML = ''
  Message.resetDefaultOptions()
  vi.useRealTimers()
})
describe('Message default variant contract', () => {
  it('uses neutral for component and imperative defaults', async () => {
    Message.resetDefaultOptions()
    expect(messageProps.variant.default).toBe('neutral')
    const wrapper = mount(_MessageComponent, { props: { open: true, popupContainer: false, duration: 0 } })
    expect(wrapper.find('.mp-message--variant-neutral').exists()).toBe(true)
    wrapper.unmount()
    Message({ content: 'Default', duration: 0 })
    await Promise.resolve()
    expect(document.body.querySelector('.mp-message--variant-neutral')).toBeTruthy()
  })
  it('preserves explicit variants and resets default options to neutral', async () => {
    Message.setDefaultOptions({ variant: 'solid', duration: 0 })
    Message({ id: 'variant-owner', content: 'Solid' })
    await Promise.resolve()
    expect(document.body.querySelector('.mp-message--variant-solid')).toBeTruthy()
    Message({ id: 'variant-owner', content: 'Tonal', variant: 'tonal' })
    await Promise.resolve()
    expect(document.body.querySelectorAll('.mp-message')).toHaveLength(1)
    expect(document.body.querySelector('.mp-message--variant-tonal')).toBeTruthy()
    Message.clear()
    Message.resetDefaultOptions()
    Message({ content: 'Reset', duration: 0 })
    await Promise.resolve()
    expect(document.body.querySelector('.mp-message--variant-neutral')).toBeTruthy()
  })
})
