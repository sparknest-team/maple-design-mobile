import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Checkbox from '../../../checkbox'
import Radio from '../../../radio'
import { withFieldPresentation } from '../with-field-presentation'

for (const [name, Choice] of [
  ['Checkbox', Checkbox],
  ['Radio', Radio],
] as const) {
  test(`${name} forwards normal and once notifications through one owner`, async () => {
    const click = vi.fn(),
      once = vi.fn()
    const wrapper = mount(Choice, { props: { onClick: click, onClickOnce: once } })
    try {
      await wrapper.get('input').trigger('click')
      expect(click).toHaveBeenCalledTimes(1)
      expect(once).toHaveBeenCalledTimes(1)
      await wrapper.get('input').trigger('click')
      expect(click).toHaveBeenCalledTimes(2)
      expect(once).toHaveBeenCalledTimes(1)
    } finally {
      wrapper.unmount()
    }
  })

  test(`${name} once-only listener respects disabled and remains once after enabling`, async () => {
    const once = vi.fn()
    const wrapper = mount(Choice, { props: { disabled: true, onClickOnce: once } })
    try {
      await wrapper.get('input').trigger('click')
      expect(once).not.toHaveBeenCalled()
      await wrapper.setProps({ disabled: false })
      await wrapper.get('input').trigger('click')
      await wrapper.get('input').trigger('click')
      expect(once).toHaveBeenCalledTimes(1)
    } finally {
      wrapper.unmount()
    }
  })
}

test('declared kebab-case notifications and their once aliases have one owner; native capture stays native', async () => {
  const Base = defineComponent({
    props: { modelValue: String },
    emits: ['value-change'],
    setup(_, { emit }) {
      return () => h('button', { onClick: () => emit('value-change', 'next') }, 'Go')
    },
  })
  const Field = withFieldPresentation(Base)
  const change = vi.fn(),
    once = vi.fn(),
    capture = vi.fn()
  const wrapper = mount(Field, {
    props: { onValueChange: change, onValueChangeOnce: once },
    attrs: { onClickCapture: capture },
  })
  try {
    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    expect(change).toHaveBeenCalledTimes(2)
    expect(once).toHaveBeenCalledTimes(1)
    expect(capture).toHaveBeenCalledTimes(2)
  } finally {
    wrapper.unmount()
  }
})
