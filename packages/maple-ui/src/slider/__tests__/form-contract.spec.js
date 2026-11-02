import { computed, h, provide, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Slider from '..'
import { FORM_ITEM_BIND_CONTROL_KEY } from '../../form/item-provide'

describe('Slider Form integration', () => {
  function create(props = {}) {
    const state = reactive({ disabled: false, readonly: false, error: false })
    const handlers = { onChange: vi.fn(), onFocus: vi.fn(), onBlur: vi.fn() }
    const context = {
      disabled: computed(() => state.disabled),
      readonly: computed(() => state.readonly),
      error: computed(() => state.error),
      errorMessage: computed(() => ''),
      size: computed(() => 'md'),
      hasOuterLabel: computed(() => false),
      eventHandlers: computed(() => handlers),
      validateWithTrigger: vi.fn(),
    }
    const wrapper = mount({
      setup() {
        provide(FORM_ITEM_BIND_CONTROL_KEY, context)
        return () => h(Slider, { editMode: 'direct', defaultValue: 20, ...props })
      },
    })
    return { wrapper, state, handlers }
  }
  test('inherits and reacts to readonly disabled and error', async () => {
    const { wrapper, state, handlers } = create()
    const thumb = wrapper.get('[role="slider"]')
    state.readonly = true
    await wrapper.vm.$nextTick()
    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(handlers.onChange).not.toHaveBeenCalled()
    expect(thumb.attributes('aria-readonly')).toBe('true')
    state.readonly = false
    state.disabled = true
    state.error = true
    await wrapper.vm.$nextTick()
    expect(thumb.attributes('tabindex')).toBeUndefined()
    expect(thumb.attributes('aria-invalid')).toBe('true')
    state.disabled = false
    await wrapper.vm.$nextTick()
    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(handlers.onChange).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
  test('internal InputNumber validates and reports focus only once', async () => {
    const { wrapper, handlers } = create({ showInput: true, step: 5 })
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(handlers.onFocus).toHaveBeenCalledTimes(1)
    await input.setValue('42')
    await input.trigger('keydown', { key: 'Enter' })
    expect(handlers.onChange).toHaveBeenCalledTimes(1)
    expect(wrapper.get('[role="slider"]').attributes('aria-valuenow')).toBe('40')
    await input.trigger('blur')
    expect(handlers.onBlur).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
