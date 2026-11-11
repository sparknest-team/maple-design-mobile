import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Checkbox from '..'
import Radio, { RadioGroup } from '../../radio'

for (const slot of ['default', 'checkbox']) {
  test(`null Checkbox exposes boolean false through ${slot} without proposing a value`, () => {
    const states: unknown[] = []
    const owner = mount(Checkbox, {
      props: { editMode: 'direct', modelValue: null },
      slots: {
        [slot]: ({ checked }: any) => {
          states.push(checked)
          return h('span', String(checked))
        },
      },
    })
    try {
      expect(states.length).toBeGreaterThan(0)
      expect(states.every((value) => value === false)).toBe(true)
      expect(owner.emitted('update:modelValue')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  })
}
for (const [name, component] of [
  ['Checkbox', Checkbox],
  ['Radio', Radio],
] as const) {
  test(`${name} owns native attributes on input while class/style stay on label`, () => {
    const owner = mount(component as any, {
      props: { editMode: 'direct' },
      attrs: {
        id: 'native-choice',
        'aria-describedby': 'choice-help',
        'data-choice': 'native',
        required: true,
        form: 'outside-form',
        class: 'shell',
        style: { color: 'red' },
      },
    })
    try {
      const input = owner.get('input')
      expect(input.attributes()).toMatchObject({
        id: 'native-choice',
        'aria-describedby': 'choice-help',
        'data-choice': 'native',
        required: '',
        form: 'outside-form',
      })
      expect(owner.attributes('id')).toBeUndefined()
      expect(owner.attributes('data-choice')).toBeUndefined()
      expect(owner.classes()).toContain('shell')
      expect(owner.attributes('style')).toContain('red')
    } finally {
      owner.unmount()
    }
  })
  test(`${name} native keyup.once does not fire from an interactive slot child`, async () => {
    const keys = vi.fn()
    const owner = mount(component as any, {
      props: { editMode: 'direct' },
      attrs: { onKeyupOnce: keys },
      slots: { default: () => h('button', { type: 'button' }, 'Child') },
    })
    try {
      await owner.get('button').trigger('keyup', { key: 'a' })
      expect(keys).not.toHaveBeenCalled()
      await owner.get('input').trigger('keyup', { key: 'a' })
      await owner.get('input').trigger('keyup', { key: 'b' })
      expect(keys).toHaveBeenCalledTimes(1)
    } finally {
      owner.unmount()
    }
  })
  test(`${name} native capture keyboard preventDefault vetoes component activation`, async () => {
    const owner = mount(component as any, {
      props: { editMode: 'direct' },
      attrs: { onKeydownCapture: (event: KeyboardEvent) => event.preventDefault() },
    })
    try {
      await owner.get('input').trigger('keydown', { key: 'Enter' })
      expect(owner.emitted('update:modelValue')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  })
}
test('Radio preserves inputAttrs as its native alias without allowing it to override managed state', () => {
  const owner = mount(Radio, {
    props: {
      editMode: 'direct',
      inputAttrs: { id: 'alias-id', required: true, checked: true, disabled: true },
      disabled: false,
    },
    attrs: { id: 'attr-id' },
  })
  try {
    expect(owner.get('input').attributes('id')).toBe('alias-id')
    expect(owner.get('input').attributes('required')).toBeDefined()
    expect(owner.get('input').element.checked).toBe(false)
    expect(owner.get('input').element.disabled).toBe(false)
    expect(owner.attributes('id')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})

test('native capture cancellation also vetoes RadioGroup arrow navigation', async () => {
  const owner = mount(RadioGroup, {
    props: { editMode: 'direct', defaultValue: 'a' },
    slots: {
      default: () => [
        h(Radio, {
          editMode: 'direct',
          value: 'a',
          onKeydownCapture: (event: KeyboardEvent) => event.preventDefault(),
        }),
        h(Radio, { editMode: 'direct', value: 'b' }),
      ],
    },
    attachTo: document.body,
  })
  try {
    const input = owner.findAll('input')[0]
    input.element.focus()
    await input.trigger('keydown', { key: 'ArrowRight' })
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})

test('native id/constraint changes stay current rather than cached on the shell', async () => {
  const owner = mount(Checkbox, { props: { editMode: 'direct' }, attrs: { id: 'first-choice', required: true } })
  try {
    await owner.setProps({ id: 'next-choice', required: false } as any)
    expect(owner.get('input').attributes('id')).toBe('next-choice')
    expect(owner.get('input').attributes('required')).toBeUndefined()
    expect(owner.findAll('#first-choice')).toHaveLength(0)
    expect(owner.attributes('id')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})
for (const [name, component] of [
  ['Checkbox', Checkbox],
  ['Radio', Radio],
] as const) {
  test(`${name} canceled Space leaves no stale release action`, async () => {
    let cancel = true
    const owner = mount(component as any, {
      props: { editMode: 'direct' },
      attachTo: document.body,
      attrs: {
        onKeydownCapture: (event: KeyboardEvent) => {
          if (cancel) {
            event.preventDefault()
          }
        },
      },
    })
    try {
      await owner.get('input').trigger('keydown', { key: ' ' })
      cancel = false
      await owner.get('input').trigger('keyup', { key: ' ' })
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      await owner.get('input').trigger('keydown', { key: ' ' })
      await owner.get('input').trigger('keyup', { key: ' ' })
      expect(owner.emitted('update:modelValue')).toHaveLength(1)
    } finally {
      owner.unmount()
    }
  })
}
