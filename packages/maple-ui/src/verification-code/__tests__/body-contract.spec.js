import { createSSRApp, h, KeepAlive, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import VerificationCode from '..'
import { formHost } from '../../input-number/__tests__/form-host'

const paste = (wrapper, text) => wrapper.trigger('paste', { clipboardData: { getData: () => text } })
describe('verification code paired contract', () => {
  test('IME after an existing character replaces from the committed text', async () => {
    const wrapper = mount(VerificationCode, {
      props: { editMode: 'direct', defaultValue: '1234', type: 'text', length: 4 },
    })
    const input = wrapper.find('input').element
    for (const [data, expected] of [
      ['中', '中234'],
      ['中文', '中文34'],
    ]) {
      input.setSelectionRange(input.value.length, input.value.length)
      input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }))
      input.value += data
      input.dispatchEvent(
        new InputEvent('input', { bubbles: true, inputType: 'insertCompositionText', data, isComposing: true }),
      )
      input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data }))
      await nextTick()
      expect(wrapper.emitted('change').at(-1)).toEqual([expected])
    }
    expect(wrapper.emitted('change')).toHaveLength(2)
    wrapper.unmount()
  })
  test('typing at the end of a filled cell replaces only that cell', async () => {
    const wrapper = mount(VerificationCode, {
      props: { editMode: 'direct', defaultValue: '1234', length: 4 },
      attachTo: document.body,
    })
    const input = wrapper.find('input').element
    input.focus()
    await nextTick()
    input.setSelectionRange(1, 1)
    input.value = '19'
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: '9' }))
    await nextTick()
    expect(wrapper.emitted('change')).toEqual([['9234']])
    expect(wrapper.findAll('input').map((cell) => cell.element.value)).toEqual(['9', '2', '3', '4'])
    wrapper.unmount()
  })
  test('real autofill and Unicode insertion preserve formatter and complete codes', async () => {
    const wrapper = mount(VerificationCode, {
      props: { editMode: 'direct', length: 4, type: 'text', formatter: (char) => char.toUpperCase() },
    })
    const input = wrapper.find('input').element
    input.value = 'ab12'
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertReplacementText', data: 'ab12' }))
    await nextTick()
    expect(wrapper.emitted('change').at(-1)).toEqual(['AB12'])
    input.value = 'A😀'
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: '😀' }))
    await nextTick()
    expect(wrapper.emitted('change').at(-1)).toEqual(['😀B12'])
    wrapper.unmount()
  })

  test('deactivation cancels queued focus and finish', async () => {
    const shown = ref(true)
    const finish = vi.fn()
    const wrapper = mount(
      {
        setup: () => () =>
          h(KeepAlive, null, () =>
            shown.value ? h(VerificationCode, { editMode: 'direct', length: 2, onFinish: finish }) : null,
          ),
      },
      { attachTo: document.body },
    )
    const input = wrapper.find('input').element
    input.value = '12'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    shown.value = false
    await nextTick()
    await nextTick()
    expect(finish).not.toHaveBeenCalled()
    expect(wrapper.find('input').exists()).toBe(false)
    shown.value = true
    await nextTick()
    expect(document.activeElement).not.toBe(wrapper.findAll('input')[1].element)
    wrapper.unmount()
  })
  test('Form notification is once per whole-code edit and group focus boundary', async () => {
    const handlers = { onInput: vi.fn(), onChange: vi.fn(), onFocus: vi.fn(), onBlur: vi.fn() }
    const wrapper = mount(
      formHost({}, handlers, () => h(VerificationCode, { editMode: 'direct', length: 2 })),
      { attachTo: document.body },
    )
    const inputs = wrapper.findAll('input')
    inputs[0].element.focus()
    await inputs[0].setValue('1')
    await nextTick()
    inputs[1].element.blur()
    await nextTick()
    expect(handlers.onInput).toHaveBeenCalledTimes(1)
    expect(handlers.onChange).toHaveBeenCalledTimes(1)
    expect(handlers.onFocus).toHaveBeenCalledTimes(1)
    expect(handlers.onBlur).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
  test('Form state inherits and explicit false overrides', () => {
    const inherited = mount(
      formHost({ disabled: true, readonly: true, error: true, size: 'xl' }, {}, () =>
        h(VerificationCode, { editMode: 'direct' }),
      ),
    )
    expect(inherited.find('input').attributes('disabled')).toBeDefined()
    expect(inherited.find('input').attributes('aria-invalid')).toBe('true')
    inherited.unmount()
    const explicit = mount(
      formHost({ disabled: true, readonly: true }, {}, () =>
        h(VerificationCode, { editMode: 'direct', disabled: false, readonly: false }),
      ),
    )
    expect(explicit.find('input').attributes('disabled')).toBeUndefined()
    expect(explicit.find('input').attributes('readonly')).toBeUndefined()
    explicit.unmount()
  })
  test('input/update/change precede accepted finish', async () => {
    const events = []
    const wrapper = mount(VerificationCode, {
      props: {
        editMode: 'direct',
        length: 2,
        defaultValue: '1',
        onInput: () => events.push('input'),
        'onUpdate:modelValue': () => events.push('update'),
        onChange: () => events.push('change'),
        onFinish: () => events.push('finish'),
      },
    })
    await wrapper.findAll('input')[1].setValue('2')
    await nextTick()
    expect(events).toEqual(['input', 'update', 'change', 'finish'])
    wrapper.unmount()
  })
  test('rejected model restores DOM and does not finish, including repeated proposal', async () => {
    const wrapper = mount(VerificationCode, { props: { editMode: 'direct', length: 2, modelValue: '1' } })
    for (let i = 0; i < 2; i++) {
      await wrapper.findAll('input')[1].setValue('2')
      await nextTick()
      expect(wrapper.findAll('input')[1].element.value).toBe('')
    }
    expect(wrapper.emitted('change')).toEqual([['12'], ['12']])
    expect(wrapper.emitted('finish')).toBeUndefined()
    wrapper.unmount()
  })
  test('SMS autofill distributes a whole code once', async () => {
    const wrapper = mount(VerificationCode, { props: { editMode: 'direct', length: 4 } })
    await wrapper.find('input').setValue('12a34')
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['1', '2', '3', '4'])
    expect(wrapper.emitted('change')).toEqual([['1234']])
    expect(wrapper.emitted('finish')).toEqual([['1234']])
    wrapper.unmount()
  })
  test('paste begins at target and formatter rejects without consuming a cell', async () => {
    const wrapper = mount(VerificationCode, {
      props: {
        editMode: 'direct',
        defaultValue: '12',
        length: 4,
        type: 'text',
        pasteTransform: (value) => value.toUpperCase(),
        formatter: (char) => (char === '-' ? false : char),
      },
    })
    await paste(wrapper.findAll('input')[1], 'a-bc')
    expect(wrapper.emitted('change')).toEqual([['1ABC']])
    wrapper.unmount()
  })
  test('text and formatter preserve Unicode code points', async () => {
    const wrapper = mount(VerificationCode, {
      props: { editMode: 'direct', length: 2, type: 'text', formatter: (char) => char },
    })
    await paste(wrapper.get('[role=group]'), '😀中X')
    expect(wrapper.emitted('change')).toEqual([['😀中']])
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['😀', '中'])
    wrapper.unmount()
  })
  test('allowPaste false prevents browser default without events', async () => {
    const wrapper = mount(VerificationCode, { props: { editMode: 'direct', allowPaste: false } })
    const event = new Event('paste', { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'clipboardData', { value: { getData: () => '123456' } })
    wrapper.find('input').element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('paste')).toBeUndefined()
    wrapper.unmount()
  })
  for (const state of ['disabled', 'readonly']) {
    test(state + ' prevents input, paste and reset', async () => {
      const wrapper = mount(VerificationCode, {
        props: { editMode: 'direct', defaultValue: '12', [state]: true },
        attachTo: document.body,
      })
      await paste(wrapper, '9999')
      await wrapper.find('input').trigger('keydown', { key: 'Backspace' })
      wrapper.vm.reset()
      wrapper.vm.focus()
      expect(wrapper.emitted('change')).toBeUndefined()
      expect(document.activeElement === wrapper.findAll('input')[2].element).toBe(state === 'readonly')
      wrapper.unmount()
    })
  }
  test('IME does not commit or jump focus until composition ends', async () => {
    const wrapper = mount(VerificationCode, {
      props: { editMode: 'direct', type: 'text' },
      attachTo: document.body,
    })
    const input = wrapper.find('input')
    input.element.focus()
    await input.trigger('compositionstart')
    input.element.value = '中'
    await input.trigger('input', { isComposing: true })
    await input.trigger('keydown', { key: 'Backspace', isComposing: true })
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(document.activeElement).toBe(input.element)
    await input.trigger('compositionend')
    await nextTick()
    expect(wrapper.emitted('change')).toEqual([['中']])
    wrapper.unmount()
  })
  test('Backspace empty cell removes previous char, Delete compacts at current', async () => {
    const wrapper = mount(VerificationCode, {
      props: { editMode: 'direct', defaultValue: '123', length: 4 },
      attachTo: document.body,
    })
    await wrapper.findAll('input')[3].trigger('keydown', { key: 'Backspace' })
    await nextTick()
    expect(wrapper.emitted('change').at(-1)).toEqual(['12'])
    expect(document.activeElement).toBe(wrapper.findAll('input')[2].element)
    await wrapper.find('input').trigger('keydown', { key: 'Delete' })
    expect(wrapper.emitted('change').at(-1)).toEqual(['2'])
    wrapper.unmount()
  })
  test('instances and six-cell SSR ids are isolated', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h('div', [
            h(VerificationCode, { editMode: 'direct', ariaLabel: 'First' }),
            h(VerificationCode, { editMode: 'direct', ariaLabel: 'Second' }),
          ]),
      }),
    )
    const ids = [...html.matchAll(/<input[^>]* id="([^"]+)"/g)].map((match) => match[1])
    expect(ids).toHaveLength(12)
    expect(new Set(ids).size).toBe(12)
    expect(html).toContain('First 6/6')
    expect(html).toContain('Second 6/6')
    const a = mount(VerificationCode, { props: { editMode: 'direct' } })
    const b = mount(VerificationCode, { props: { editMode: 'direct' } })
    await a.find('input').setValue('1')
    expect(b.find('input').element.value).toBe('')
    a.unmount()
    b.unmount()
  })
  test('all size and variant values reach Input', async () => {
    const wrapper = mount(VerificationCode, { props: { editMode: 'direct' } })
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      await wrapper.setProps({ size })
      expect(wrapper.find('[class*="field-decorator--size-' + size + '"]').exists()).toBe(true)
    }
    for (const variant of ['filled', 'outline', 'standard']) {
      await wrapper.setProps({ variant })
      expect(wrapper.find('[class*="field-decorator--variant-' + variant + '"]').exists()).toBe(true)
    }
    wrapper.unmount()
  })
})
