import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Checkbox, { CheckboxGroup } from '../../checkbox'
import Radio, { RadioGroup } from '../../radio'
import Rate from '../../rate'
import Slider from '../../slider'
import Switch from '../../switch'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const cases = [
  ['checkbox', Checkbox, 'input[type=checkbox]', {}],
  ['radio', Radio, 'input[type=radio]', { value: 'a' }],
  ['checkbox group', CheckboxGroup, '[role=group]', { options: [{ label: 'A', value: 'a' }] }],
  ['radio group', RadioGroup, '[role=radiogroup]', { options: [{ label: 'A', value: 'a' }] }],
  ['switch', Switch, '[role=switch]', {}],
  ['slider', Slider, '[role=slider]', {}],
  ['rate', Rate, '[role=slider]', {}],
] as const

test.each(cases)(
  '%s associates the form error with its interactive target',
  async (_name, component, selector, props) => {
    const wrapper = mount(Form, {
      props: { editMode: 'direct', model: { value: null } },
      slots: {
        default: () =>
          h(FormItem, { field: 'value', label: 'Value' }, () =>
            h(component as any, { ...props, editMode: 'direct', 'aria-describedby': 'external' }),
          ),
      },
    })
    try {
      ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
      await nextTick()
      const errorId = wrapper.get('[role=alert]').element.closest('[id]')?.id
      expect(errorId).toBeTruthy()
      const target = wrapper.get(selector)
      const ids = target.attributes('aria-describedby')?.split(/\s+/) ?? []
      expect(ids).toContain('external')
      expect(ids).toContain(errorId)
      ;(wrapper.vm as any).clearValidate()
      await nextTick()
      expect(target.attributes('aria-describedby')?.split(/\s+/)).toContain('external')
      expect(target.attributes('aria-describedby')?.split(/\s+/)).not.toContain(errorId)
    } finally {
      wrapper.unmount()
    }
  },
)

test('range slider preserves each tooltip and caller description while adding the error', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { value: [20, 60] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Range' }, () =>
          h(Slider, { range: true, showTooltip: 'always', 'aria-describedby': 'external' }),
        ),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid range' } })
    await nextTick()
    const errorId = wrapper.get('[role=alert]').element.closest('[id]')!.id
    const thumbs = wrapper.findAll('[role=slider]')
    expect(thumbs).toHaveLength(2)
    const tooltipIds = thumbs.map((thumb) => {
      const ids = thumb.attributes('aria-describedby')!.split(/\s+/)
      expect(ids).toContain('external')
      expect(ids).toContain(errorId)
      const tooltipId = thumb.get('[role=tooltip]').attributes('id')!
      expect(ids).toContain(tooltipId)
      return tooltipId
    })
    expect(tooltipIds[0]).not.toBe(tooltipIds[1])
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    thumbs.forEach((thumb, index) => {
      const ids = thumb.attributes('aria-describedby')!.split(/\s+/)
      expect(ids).toContain('external')
      expect(ids).toContain(tooltipIds[index])
      expect(ids).not.toContain(errorId)
    })
  } finally {
    wrapper.unmount()
  }
})

test('a nested field in a choice group keeps its own error description', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { group: [], child: false } },
    slots: {
      default: () =>
        h(FormItem, { field: 'group', label: 'Group' }, () =>
          h(CheckboxGroup, { editMode: 'direct' }, () =>
            h(FormItem, { field: 'child', label: 'Child' }, () => h(Checkbox, { value: 'a' })),
          ),
        ),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ group: { message: 'Group error' }, child: { message: 'Child error' } })
    await nextTick()
    const groupId = wrapper.get('[role=group]').attributes('aria-describedby')!
    const childId = wrapper.get('input[type=checkbox]').attributes('aria-describedby')!
    expect(childId).toBeTruthy()
    expect(childId).not.toBe(groupId)
    expect(wrapper.get(`[id="${groupId}"]`).text()).toContain('Group error')
    expect(wrapper.get(`[id="${childId}"]`).text()).toContain('Child error')
  } finally {
    wrapper.unmount()
  }
})

test('a group error is not repeated on each option', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { value: [] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Options' }, () =>
          h(CheckboxGroup, {
            options: [
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
            ],
          }),
        ),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ value: { message: 'Choose an option' } })
    await nextTick()
    const errorId = wrapper.get('[role=alert]').element.closest('[id]')!.id
    expect(wrapper.get('[role=group]').attributes('aria-describedby')?.split(/\s+/)).toContain(errorId)
    const inputs = wrapper.findAll('input[type=checkbox]')
    expect(inputs).toHaveLength(2)
    for (const input of inputs) {
      expect(input.attributes('aria-describedby')?.split(/\s+/) ?? []).not.toContain(errorId)
      expect(input.attributes('aria-invalid')).toBe('true')
    }
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    for (const input of inputs) {
      expect(input.attributes('aria-invalid')).toBeUndefined()
    }
  } finally {
    wrapper.unmount()
  }
})

test('deferred choice reference keeps both caller and error descriptions', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'popup', model: { value: [] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Options' }, () =>
          h(CheckboxGroup, {
            editMode: 'popup',
            options: [{ label: 'A', value: 'a' }],
            'aria-describedby': 'external',
          }),
        ),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ value: { message: 'Choose an option' } })
    await nextTick()
    const errorId = wrapper.get('[role=alert]').element.closest('[id]')!.id
    const button = wrapper
      .findAll('button')
      .find((node) => node.attributes('aria-describedby')?.split(/\s+/).includes(errorId))
    expect(button).toBeTruthy()
    expect(button!.attributes('aria-describedby')?.split(/\s+/)).toContain('external')
  } finally {
    wrapper.unmount()
  }
})

test.each([false, true])(
  'slider with numeric inputs associates and clears errors on all interactive controls: range=%s',
  async (range) => {
    const wrapper = mount(Form, {
      props: { editMode: 'direct', model: { value: range ? [20, 60] : 20 } },
      slots: {
        default: () =>
          h(FormItem, { field: 'value', label: 'Value' }, () =>
            h(Slider, { range, showInput: true, editMode: 'direct', 'aria-describedby': 'external' }),
          ),
      },
    })
    try {
      ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
      await nextTick()
      const errorId = wrapper.get('[role=alert]').element.closest('[id]')!.id
      const thumbs = wrapper.findAll('[role=slider]')
      const inputs = wrapper.findAll('input')
      expect(thumbs).toHaveLength(range ? 2 : 1)
      expect(inputs).toHaveLength(range ? 2 : 1)
      for (const target of [...thumbs, ...inputs]) {
        expect(target.attributes('aria-describedby')?.split(/\s+/)).toContain(errorId)
      }
      ;(wrapper.vm as any).clearValidate()
      await nextTick()
      for (const target of [...thumbs, ...inputs]) {
        expect(target.attributes('aria-describedby')?.split(/\s+/) ?? []).not.toContain(errorId)
      }
      for (const thumb of thumbs) {
        expect(thumb.attributes('aria-describedby')?.split(/\s+/)).toContain('external')
      }
    } finally {
      wrapper.unmount()
    }
  },
)

test.each([
  ['radio group', RadioGroup, '[role=radiogroup]'],
  ['rate', Rate, '[role=slider]'],
] as const)('%s preserves caller invalid state unless the form has an error', async (_name, component, selector) => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { value: null } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () =>
          h(component as any, { editMode: 'direct', 'aria-invalid': 'grammar' }),
        ),
    },
  })
  try {
    expect(wrapper.get(selector).attributes('aria-invalid')).toBe('grammar')
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
    await nextTick()
    expect(wrapper.get(selector).attributes('aria-invalid')).toBe('true')
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(wrapper.get(selector).attributes('aria-invalid')).toBe('grammar')
  } finally {
    wrapper.unmount()
  }
})

test.each([false, true])(
  'slider preserves caller invalid state on all interactive controls: range=%s',
  async (range) => {
    const wrapper = mount(Form, {
      props: { editMode: 'direct', model: { value: range ? [20, 60] : 20 } },
      slots: {
        default: () =>
          h(FormItem, { field: 'value', label: 'Value' }, () =>
            h(Slider, { range, showInput: true, 'aria-invalid': 'grammar' }),
          ),
      },
    })
    try {
      const targets = () => wrapper.findAll('[role=slider], input')
      expect(targets()).toHaveLength(range ? 4 : 2)
      targets().forEach((target) => expect(target.attributes('aria-invalid')).toBe('grammar'))
      ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
      await nextTick()
      targets().forEach((target) => expect(target.attributes('aria-invalid')).toBe('true'))
      ;(wrapper.vm as any).clearValidate()
      await nextTick()
      targets().forEach((target) => expect(target.attributes('aria-invalid')).toBe('grammar'))
    } finally {
      wrapper.unmount()
    }
  },
)

test('slider preserves an explicit false invalid state on its thumb and numeric input', () => {
  const wrapper = mount(Slider, { attrs: { 'aria-invalid': false }, props: { showInput: true } })
  try {
    const targets = wrapper.findAll('[role=slider], input')
    expect(targets).toHaveLength(2)
    targets.forEach((target) => expect(target.attributes('aria-invalid')).toBe('false'))
  } finally {
    wrapper.unmount()
  }
})
