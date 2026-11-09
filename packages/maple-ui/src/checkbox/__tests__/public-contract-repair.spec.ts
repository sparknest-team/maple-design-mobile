import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Checkbox, { CheckboxGroup } from '..'
import Radio, { RadioGroup } from '../../radio'
import { radioGroupProps, radioProps } from '../../radio/props'
import { checkboxGroupProps, checkboxProps } from '../props'

for (const [name, props, Group] of [
  ['CheckboxGroup', checkboxGroupProps, CheckboxGroup],
  ['RadioGroup', radioGroupProps, RadioGroup],
] as const) {
  test(`${name} validates orientation and safely renders invalid input horizontally`, () => {
    expect((props.orientation as any).validator?.('unknown')).toBe(false)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const owner = mount(Group as any, { props: { editMode: 'direct', orientation: 'unknown' } })
    try {
      expect(owner.classes().some((value) => value.endsWith('--horizontal'))).toBe(true)
    } finally {
      owner.unmount()
      warn.mockRestore()
    }
  })
  test(`${name} async options announce busy and report a failure once without model proposals`, async () => {
    let reject!: (error: unknown) => void
    const owner = mount(Group as any, {
      props: {
        editMode: 'direct',
        options: () =>
          new Promise((_resolve, fail) => {
            reject = fail
          }),
      },
    })
    try {
      await flushPromises()
      expect(owner.get('[role]').attributes('aria-busy')).toBe('true')
      const error = new Error('options unavailable')
      reject(error)
      await flushPromises()
      expect(owner.emitted('load-error')).toEqual([[error]])
      expect(owner.get('[role]').attributes('aria-busy')).toBeUndefined()
      expect(owner.emitted('update:modelValue')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  })
}
for (const [name, props, Control] of [
  ['Checkbox', checkboxProps, Checkbox],
  ['Radio', radioProps, Radio],
] as const) {
  test(`${name} icon size diagnoses invalid lengths and accepts fractional positive dimensions`, () => {
    for (const value of [-1, 0, NaN, Infinity, '-1px', '0px', 'auto']) {
      expect((props.iconSize as any).validator?.(value)).toBe(false)
    }
    for (const value of [0.5, 16, '1rem', 'var(--choice-size)']) {
      expect((props.iconSize as any).validator?.(value)).toBe(true)
    }
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const owner = mount(Control as any, { props: { editMode: 'direct', iconSize: -1 } })
    try {
      expect(owner.attributes('style') ?? '').not.toContain('instance-size')
    } finally {
      owner.unmount()
      warn.mockRestore()
    }
  })
}
test('max diagnoses non-integer/nonfinite counts while preserving zero and legacy normalization', async () => {
  for (const value of [-1, 0.5, NaN, Infinity]) {
    expect((checkboxGroupProps.max as any).validator?.(value)).toBe(false)
  }
  for (const value of [0, 2]) {
    expect((checkboxGroupProps.max as any).validator?.(value)).toBe(true)
  }
  const owner = mount(CheckboxGroup, { props: { editMode: 'direct', max: 0, options: ['a', 'b'] } })
  try {
    await flushPromises()
    expect(owner.findAll('input').every((input) => input.element.disabled)).toBe(true)
  } finally {
    owner.unmount()
  }
})

test('radio slot replaces circle content while button variant retains its default label and native input', () => {
  const custom = vi.fn(() => 'Custom radio')
  const owner = mount(Radio, {
    props: { editMode: 'direct', variant: 'button' },
    slots: { radio: custom, default: () => 'Button label' },
  })
  try {
    expect(custom).not.toHaveBeenCalled()
    expect(owner.text()).toContain('Button label')
    expect(owner.findAll('input[type=radio]')).toHaveLength(1)
  } finally {
    owner.unmount()
  }
})

for (const [initial, expected] of [
  [true, false],
  [['a', 'b'], ['b']],
] as const) {
  test(`native unchecking ignores presentation emptyValue for ${JSON.stringify(initial)}`, async () => {
    const owner = mount(Checkbox, {
      props: { editMode: 'direct', defaultValue: initial as any, value: 'a', emptyValue: null },
      attachTo: document.body,
    })
    try {
      const input = owner.get('input')
      input.element.checked = false
      await input.trigger('change')
      expect(owner.emitted('update:modelValue')?.[0][0]).toEqual(expected)
    } finally {
      owner.unmount()
    }
  })
}
for (const [name, Control] of [
  ['Checkbox', Checkbox],
  ['CheckboxGroup', CheckboxGroup],
  ['Radio', Radio],
  ['RadioGroup', RadioGroup],
] as const) {
  test(`${name} read slot receives the raw nullable model and text without editors`, () => {
    const read = vi.fn((state: { value: unknown; text: string }) => {
      void state
      return 'Custom empty reading'
    })
    const owner = mount(Control as any, { props: { modelValue: null, readPretty: true }, slots: { read } })
    try {
      expect(read.mock.calls[0]?.[0]).toEqual({ value: null, text: expect.any(String) })
      expect(owner.find('input').exists()).toBe(false)
      expect(owner.emitted('update:modelValue')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  })
}
