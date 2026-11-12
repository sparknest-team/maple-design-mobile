import { nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { InputTag } from '../index'

describe('InputTag fallbackOption', () => {
  test.each([false, true])('reacts to display data without changing values, readPretty=%s', async (readPretty) => {
    const labels = reactive<Record<string, string>>({})
    const update = vi.fn()
    const change = vi.fn()
    const wrapper = mount(InputTag, {
      props: {
        modelValue: ['https://example.com'],
        readPretty,
        fallbackOption: (value: string | number) => ({ value, label: labels[String(value)] }),
        'onUpdate:modelValue': update,
        onChange: change,
      },
    })
    expect(wrapper.text()).toContain('https://example.com')
    labels['https://example.com'] = 'Example'
    await nextTick()
    expect(wrapper.text()).toContain('Example')
    expect(update).not.toHaveBeenCalled()
    expect(change).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  test('removal emits the original value, not its display data', async () => {
    const wrapper = mount(InputTag, {
      props: { modelValue: ['a', 'b'], fallbackOption: (value) => ({ value, label: `Label ${value}` }) },
    })
    await wrapper.findAll('.mp-tag__close-btn')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['b'])
    wrapper.unmount()
  })
})
