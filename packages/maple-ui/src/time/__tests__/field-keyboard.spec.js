import { describe, expect, it } from 'vitest'
import TimeRange from '../../time-range/TimeRange.vue'
import Time from '../Time.vue'
import { changeWheel, fieldState, mountField, selectField } from './field-test-utils'

describe.each([
  ['single', Time],
  ['range', TimeRange],
])('%s field keyboard/focus ownership', (_name, Field) => {
  it('opens only the local trigger and never reacts to window keys', async () => {
    const first = mountField(Field)
    const second = mountField(Field)
    fieldState(first).focus()
    fieldState(second).focus()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(first.emitted('update:open')).toBeUndefined()
    expect(second.emitted('update:open')).toBeUndefined()
    await first.trigger('keydown', { key: 'Enter' })
    expect(first.emitted('update:open')).toEqual([[true]])
    expect(second.emitted('update:open')).toBeUndefined()
    first.unmount()
    second.unmount()
  })

  it('requests cancellation on Tab without preventing native navigation', () => {
    const wrapper = mountField(Field, { props: { open: true } })
    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
    wrapper.element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    expect(fieldState(wrapper).open.value).toBe(true)
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })

  it('allows escape/cancel after becoming readonly without committing', async () => {
    const wrapper = mountField(Field, { props: { defaultOpen: true } })
    await wrapper.setProps({ readonly: true })
    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(fieldState(wrapper).open.value).toBe(false)
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })

  it('deduplicates focus, reports blur while open and clears disabled focus', async () => {
    const wrapper = mountField(Field, { props: { defaultOpen: true } })
    fieldState(wrapper).focus()
    fieldState(wrapper).focus()
    fieldState(wrapper).blur()
    expect(wrapper.emitted('focus')).toHaveLength(1)
    expect(wrapper.emitted('blur')).toHaveLength(1)
    fieldState(wrapper).focus()
    await wrapper.setProps({ disabled: true })
    expect(fieldState(wrapper).controlProps.value.focused).toBe(false)
    expect(wrapper.emitted('blur')).toHaveLength(2)
    wrapper.unmount()
  })

  it('honors readonly and ignores composing or interactive child keys', async () => {
    const wrapper = mountField(Field, {
      props: { readonly: true },
      slots: { prefix: '<button class="custom-action">action</button>' },
    })
    fieldState(wrapper).focus()
    expect(wrapper.emitted('focus')).toHaveLength(1)
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await wrapper.setProps({ readonly: false })
    await wrapper.trigger('keydown', { key: 'Enter', isComposing: true })
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await wrapper.find('.custom-action').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await wrapper.trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await wrapper.trigger('keyup', { key: ' ' })
    expect(wrapper.emitted('update:open')).toEqual([[true]])
    wrapper.unmount()
  })
})
