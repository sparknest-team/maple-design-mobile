import { defineComponent, h, nextTick, ref, type Component as VueComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Checkbox from '../../checkbox'
import Input from '../../input'
import InputNumber from '../../input-number'
import Radio from '../../radio'
import Textarea from '../../textarea'

const components = [
  ['Input', Input],
  ['InputNumber', InputNumber],
  ['Textarea', Textarea],
  ['Checkbox', Checkbox],
  ['Radio', Radio],
] as const

describe('native attributes after an empty fallthrough state', () => {
  it.each(components)('%s reapplies input attributes after every key is removed', async (_name, Component) => {
    const phase = ref(0)
    const wrapper = mount(
      defineComponent({
        setup: () => () =>
          h(Component as VueComponent, {
            editMode: 'direct',
            ...(phase.value === 1
              ? {}
              : {
                  id: phase.value === 0 ? 'first' : 'last',
                  'aria-labelledby': 'label',
                  'data-proof': phase.value === 0 ? 'first' : 'last',
                }),
          }),
      }),
    )
    const input = () => wrapper.get('input, textarea')
    expect(input().attributes('id')).toBe('first')
    expect(input().attributes('aria-labelledby')).toBe('label')
    phase.value = 1
    await nextTick()
    expect(input().attributes('id')).not.toBe('first')
    expect(input().attributes('aria-labelledby')).toBeUndefined()
    expect(input().attributes('data-proof')).toBeUndefined()
    phase.value = 2
    await nextTick()
    expect(input().attributes('id')).toBe('last')
    expect(input().attributes('aria-labelledby')).toBe('label')
    expect(input().attributes('data-proof')).toBe('last')
    wrapper.unmount()
  })
  it.each(components)(
    '%s attaches a once listener after an initially empty attribute set',
    async (_name, Component) => {
      const enabled = ref(false)
      let calls = 0
      const wrapper = mount(
        defineComponent({
          setup: () => () =>
            h(Component as VueComponent, {
              editMode: 'direct',
              ...(enabled.value
                ? {
                    onKeyupOnce: () => {
                      calls++
                    },
                  }
                : {}),
            }),
        }),
      )
      enabled.value = true
      await nextTick()
      await wrapper.get('input, textarea').trigger('keyup')
      await wrapper.get('input, textarea').trigger('keyup')
      expect(calls).toBe(1)
      wrapper.unmount()
    },
  )
})
