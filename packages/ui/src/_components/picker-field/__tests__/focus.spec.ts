import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { useFieldFocus } from '../use-field-focus'

function setup() {
  const disabled = ref(false)
  const onFocus = vi.fn()
  const onBlur = vi.fn()
  let focus!: ReturnType<typeof useFieldFocus>
  const wrapper = mount(
    defineComponent({
      setup() {
        focus = useFieldFocus({ disabled: () => disabled.value, onFocus, onBlur })
        return () => h('div')
      },
    }),
  )
  return { disabled, onFocus, onBlur, focus, wrapper }
}

describe('copied field focus boundary', () => {
  it('dispatches one focus/blur per transition', () => {
    const state = setup()
    state.focus.handleBlur()
    state.focus.handleFocus()
    state.focus.handleFocus()
    expect(state.onFocus).toHaveBeenCalledTimes(1)
    state.focus.handleBlur()
    state.focus.handleBlur()
    expect(state.onBlur).toHaveBeenCalledTimes(1)
    expect(state.focus.focused.value).toBe(false)
    state.wrapper.unmount()
  })

  it('releases disabled focus and can focus again after enabling', () => {
    const state = setup()
    state.focus.handleFocus()
    state.disabled.value = true
    expect(state.focus.focused.value).toBe(false)
    expect(state.onBlur).toHaveBeenCalledTimes(1)
    state.focus.handleFocus()
    expect(state.onFocus).toHaveBeenCalledTimes(1)
    state.disabled.value = false
    state.focus.handleFocus()
    expect(state.onFocus).toHaveBeenCalledTimes(2)
    state.wrapper.unmount()
  })

  it('keeps instances independent and stops watching at unmount', () => {
    const first = setup()
    const second = setup()
    first.focus.handleFocus()
    expect(second.focus.focused.value).toBe(false)
    first.wrapper.unmount()
    first.disabled.value = true
    expect(first.onBlur).not.toHaveBeenCalled()
    second.wrapper.unmount()
  })
})
