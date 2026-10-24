import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Steps, { Step } from '..'

test('all step slots keep active tied to modelValue, independently of error status and focus', async () => {
  const contexts = new Map()
  const slots = ['node', 'icon', 'title', 'description', 'default']
  const wrapper = mount(Steps, {
    props: { modelValue: 2, status: 'error', changeable: true },
    slots: {
      default: () =>
        slots.map((kind, index) =>
          h(
            Step,
            { title: 'Step', description: 'Description' },
            {
              [kind]: (ctx) => {
                contexts.set(kind, ctx)
                return `${kind}:${ctx.active}`
              },
            },
          ),
        ),
    },
  })
  try {
    for (const [index, kind] of slots.entries()) {
      expect(contexts.get(kind).active).toBe(index === 1)
      expect(contexts.get(kind)).not.toHaveProperty('current')
    }
    expect(contexts.get('icon').status).toBe('error')
    await wrapper.findAll('[role="listitem"]')[2].trigger('focus')
    expect(contexts.get('title').active).toBe(false)
    await wrapper.findAll('[role="listitem"]')[2].trigger('click')
    expect(contexts.get('title').active).toBe(false)
    await wrapper.setProps({ modelValue: 3 })
    expect(contexts.get('icon').active).toBe(false)
    expect(contexts.get('title').active).toBe(true)
    expect(contexts.get('title').status).toBe('error')
  } finally {
    wrapper.unmount()
  }
})
