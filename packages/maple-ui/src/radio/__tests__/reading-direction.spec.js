import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Radio from '../index'

for (const variant of ['radio', 'button']) {
  test(`${variant}: live direction changes reverse only horizontal navigation and skip disabled options`, async () => {
    const owner = mount(Radio.Group, {
      attachTo: document.body,
      attrs: { dir: 'ltr' },
      props: {
        editMode: 'direct',
        variant,
        defaultValue: 'a',
        options: [
          { value: 'a', label: 'Alpha' },
          { value: 'skip', label: 'Disabled', disabled: true },
          { value: 'b', label: 'Beta' },
        ],
      },
    })
    try {
      const inputs = owner.findAll('input[type=radio]')
      await inputs[0].trigger('keydown', { key: 'ArrowRight' })
      expect(owner.emitted('update:modelValue').at(-1)[0]).toBe('b')
      await inputs[2].trigger('keydown', { key: 'Home' })
      owner.element.setAttribute('dir', 'rtl')
      await inputs[0].trigger('keydown', { key: 'ArrowLeft' })
      expect(owner.emitted('update:modelValue').at(-1)[0]).toBe('b')
      await inputs[2].trigger('keydown', { key: 'ArrowRight' })
      expect(owner.emitted('update:modelValue').at(-1)[0]).toBe('a')
      await inputs[0].trigger('keydown', { key: 'ArrowDown' })
      expect(owner.emitted('update:modelValue').at(-1)[0]).toBe('b')
    } finally {
      owner.unmount()
    }
  })
}
