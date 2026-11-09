import { h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import DateRange from '..'
import { formHost } from '../../input-number/__tests__/form-host'

const mode = DateRange.name?.startsWith('Mp') ? 'popup' : 'direct'
const initial = ['2026-11-03', '2026-11-05']
describe('DateRange reference public and Form events', () => {
  for (const readonly of [false, true]) {
    test('endpoint focus is one field cycle and readonly clicks still notify readonly=' + readonly, async () => {
      const calls = [],
        once = vi.fn(),
        state = reactive({ readonly, disabled: false })
      const w = mount(
        formHost(
          state,
          {
            onFocus: () => calls.push('focus'),
            onBlur: () => calls.push('blur'),
            onChange: () => calls.push('change'),
          },
          () =>
            h('div', [
              h(
                DateRange,
                {
                  editMode: mode,
                  modelValue: initial,
                  valueFormat: 'YYYY-MM-DD',
                  hint: false,
                  open: false,
                  onClickOnce: once,
                },
                { prefix: () => h('span', { 'data-prefix': '' }, 'Dates') },
              ),
              h('input', { 'data-outside': '' }),
            ]),
        ),
        { attachTo: document.body },
      )
      try {
        const field = w.getComponent(DateRange),
          inputs = field.findAll('input')
        for (const input of inputs) {
          input.element.focus()
          await nextTick()
          await input.trigger('click')
        }
        expect(field.emitted('focus')).toHaveLength(1)
        expect(calls).toEqual(['focus'])
        expect(field.emitted('click')).toHaveLength(2)
        expect(once).toHaveBeenCalledTimes(1)
        w.get('[data-outside]').element.focus()
        await nextTick()
        expect(field.emitted('blur')).toHaveLength(1)
        expect(calls).toEqual(['focus', 'blur'])
        if (readonly) {
          expect(field.emitted('update:open')).toBeUndefined()
        }
        state.disabled = true
        await nextTick()
        await field.get('[data-prefix]').trigger('click')
        expect(field.emitted('click')).toHaveLength(2)
        expect(field.emitted('update:modelValue')).toBeUndefined()
      } finally {
        w.unmount()
      }
    })
  }
  test('disabled does not consume a once click before enabling', async () => {
    const once = vi.fn()
    const w = mount(DateRange, {
      props: {
        editMode: mode,
        modelValue: initial,
        valueFormat: 'YYYY-MM-DD',
        open: false,
        disabled: true,
        onClickOnce: once,
      },
      slots: { prefix: '<span data-prefix>Dates</span>' },
    })
    try {
      await w.get('[data-prefix]').trigger('click')
      expect(once).not.toHaveBeenCalled()
      await w.setProps({ disabled: false })
      await w.get('[data-prefix]').trigger('click')
      await w.get('[data-prefix]').trigger('click')
      expect(once).toHaveBeenCalledTimes(1)
      expect(w.emitted('click')).toHaveLength(2)
    } finally {
      w.unmount()
    }
  })
})
