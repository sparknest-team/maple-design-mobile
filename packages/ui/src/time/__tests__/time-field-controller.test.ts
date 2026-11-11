import { defineComponent, h, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { useFieldOpen } from '../../_components/picker-field/use-field-open'
import type { TimeCommitInput } from '../time-commit'
import { useTimeFieldController } from '../use-time-field-controller'

function setup(value: TimeCommitInput = '09:00', controlled = false) {
  const state = reactive({
    value,
    disabled: false,
    readonly: false,
    clearable: true,
    min: undefined as string | undefined,
  })
  const notifications = {
    change: vi.fn(),
    select: vi.fn(),
    clear: vi.fn(),
    focus: vi.fn(),
    blur: vi.fn(),
    close: vi.fn(),
    open: vi.fn(),
  }
  const form = { onChange: vi.fn(), onClear: vi.fn(), onFocus: vi.fn(), onBlur: vi.fn() }
  let controller!: ReturnType<typeof useTimeFieldController<TimeCommitInput>>
  const acceptedOpen = ref(true)
  const wrapper = mount(
    defineComponent({
      setup() {
        const open = useFieldOpen({
          value: () => (controlled ? acceptedOpen.value : undefined),
          defaultValue: () => true,
          blocked: () => state.disabled || state.readonly,
          onChange: notifications.open,
        })
        controller = useTimeFieldController<TimeCommitInput>({
          value: () => state.value,
          open,
          clone: (next) => (Array.isArray(next) ? [...next] : next),
          rules: () => ({ format: 'HH:mm', min: state.min }),
          range: () => Array.isArray(value),
          blocked: () => state.disabled || state.readonly,
          disabled: () => state.disabled,
          clearable: () => state.clearable,
          onCommit: notifications.change,
          onSelect: notifications.select,
          onClear: notifications.clear,
          onFocus: notifications.focus,
          onBlur: notifications.blur,
          onClose: notifications.close,
          form: () => form,
        })
        return () => h('div')
      },
    }),
  )
  return { state, notifications, form, controller, wrapper, acceptedOpen }
}

describe('copied time field orchestration', () => {
  it('stages selections and dispatches commit/Form notifications once', () => {
    const { controller, notifications, form, wrapper } = setup()
    controller.select('10:30')
    expect(notifications.select).toHaveBeenCalledWith('10:30', expect.any(Date))
    expect(notifications.change).not.toHaveBeenCalled()
    expect(form.onChange).not.toHaveBeenCalled()
    expect(controller.commit()).toBe(true)
    expect(notifications.change).toHaveBeenCalledWith('10:30', expect.any(Date))
    expect(form.onChange).toHaveBeenCalledTimes(1)
    expect(notifications.close).toHaveBeenCalledWith('10:30')
    wrapper.unmount()
  })
  it('deduplicates commits while a controlled close request is pending', () => {
    const { controller, notifications, form, wrapper } = setup('09:00', true)
    controller.select('10:00', true)
    controller.commit()
    expect(notifications.change).toHaveBeenCalledTimes(1)
    expect(form.onChange).toHaveBeenCalledTimes(1)
    expect(notifications.open).toHaveBeenCalledWith(false)
    expect(notifications.close).not.toHaveBeenCalled()
    wrapper.unmount()
  })
  it('starts a new transaction for a fresh selection after a rejected controlled close', () => {
    const { controller, notifications, form, wrapper } = setup('09:00', true)
    controller.select('10:00', true)
    expect(controller.commit()).toBe(false)
    controller.select('11:00')
    expect(controller.commit()).toBe(true)
    expect(controller.commit()).toBe(false)
    expect(notifications.change).toHaveBeenCalledTimes(2)
    expect(form.onChange).toHaveBeenCalledTimes(2)
    expect(notifications.change).toHaveBeenLastCalledWith('11:00', expect.any(Date))
    wrapper.unmount()
  })
  it('rechecks current bounds on immediate commit without notifying Form on failure', () => {
    const { state, controller, notifications, form, wrapper } = setup()
    state.min = '11:00'
    controller.select('10:30', true)
    expect(notifications.select).toHaveBeenCalledTimes(1)
    expect(controller.canConfirm.value).toBe(false)
    expect(notifications.change).not.toHaveBeenCalled()
    expect(form.onChange).not.toHaveBeenCalled()
    wrapper.unmount()
  })
  it('clears through the same commit path but bypasses time validation', () => {
    const { state, controller, notifications, form, wrapper } = setup()
    state.min = '11:00'
    state.clearable = false
    expect(controller.clearField()).toBe(false)
    state.clearable = true
    expect(controller.clearField()).toBe(true)
    expect(notifications.change).toHaveBeenCalledWith(undefined, undefined)
    expect(notifications.clear).toHaveBeenCalledTimes(1)
    expect(form.onChange).toHaveBeenCalledTimes(1)
    expect(form.onClear).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
  it('keeps readonly focusable, blocks changes and releases dynamically disabled focus', () => {
    const { state, controller, notifications, form, wrapper } = setup()
    state.readonly = true
    controller.handleFocus()
    controller.handleFocus()
    expect(notifications.focus).toHaveBeenCalledTimes(1)
    expect(form.onFocus).toHaveBeenCalledTimes(1)
    expect(controller.select('10:30')).toBe(false)
    expect(controller.clearField()).toBe(false)
    expect(controller.commit()).toBe(false)
    state.disabled = true
    expect(notifications.blur).toHaveBeenCalledTimes(1)
    expect(form.onBlur).toHaveBeenCalledTimes(1)
    controller.cancel()
    expect(notifications.change).not.toHaveBeenCalled()
    expect(notifications.close).toHaveBeenCalledWith('09:00')
    wrapper.unmount()
  })
  it('isolates range drafts from source arrays, event payloads and other instances', () => {
    const a = setup(['09:00', '18:00'])
    const b = setup(['09:00', '18:00'])
    const selected = ['10:00', '19:00']
    a.controller.select(selected)
    selected[0] = '12:00'
    a.notifications.select.mock.calls[0][0][1] = '20:00'
    expect(a.controller.draft.value).toEqual(['10:00', '19:00'])
    expect(b.controller.draft.value).toEqual(['09:00', '18:00'])
    a.wrapper.unmount()
    b.wrapper.unmount()
  })
})
