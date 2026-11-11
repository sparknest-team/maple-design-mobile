import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Menu, { MenuOption, menuOptionProps } from '..'
import MenuBranch from '../MenuBranch.vue'

const tick = async () => {
  await nextTick()
  await nextTick()
}
test('all data renderers expose exact selection while descendants stay private', async () => {
  const contexts = new Map()
  const render = (value, kind) => (context) => {
    contexts.set(`${value}:${kind}`, context)
    return value
  }
  const option = (value) => ({
    value,
    label: render(value, 'label'),
    icon: render(value, 'icon'),
    extra: render(value, 'extra'),
  })
  const wrapper = mount(Menu, {
    attachTo: document.body,
    props: {
      defaultOpen: true,
      popupContainer: false,
      submenuTrigger: 'click',
      modelValue: 'child',
      options: [option('leaf'), { ...option('branch'), children: [option('child')] }],
    },
    slots: { default: () => h('button', 'Open') },
  })
  try {
    await tick()
    const branch = wrapper.findComponent(MenuBranch)
    expect(branch.findComponent(MenuOption).props('highlight')).toBe(true)
    for (const kind of ['label', 'icon', 'extra']) {
      const context = contexts.get(`branch:${kind}`)
      expect(context.active).toBe(false)
      expect(context.selected).toBeUndefined()
      expect(context.hasSelectedDescendant).toBeUndefined()
      expect(context.level).toBe(0)
    }
    await branch.findComponent(MenuOption).trigger('click')
    await tick()
    for (const kind of ['label', 'icon', 'extra']) {
      expect(contexts.get(`child:${kind}`).active).toBe(true)
      expect(contexts.get(`child:${kind}`).level).toBe(1)
      expect(contexts.get(`branch:${kind}`).active).toBe(false)
    }
    await wrapper.setProps({ modelValue: 'branch' })
    for (const kind of ['label', 'icon', 'extra']) {
      expect(contexts.get(`branch:${kind}`).active).toBe(true)
      expect(contexts.get(`child:${kind}`).active).toBe(false)
    }
    await wrapper.setProps({ modelValue: 'leaf' })
    expect(contexts.get('leaf:label').active).toBe(true)
    expect(contexts.get('branch:label').active).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('root scoped slots and manual option slots share active context', async () => {
  const contexts = new Map()
  const manual = new Map()
  const wrapper = mount(Menu, {
    props: { defaultOpen: true, popupContainer: false, modelValue: 0, options: [{ value: 0, label: 'Zero' }] },
    slots: {
      default: () => h('button', 'Open'),
      'option-label': (ctx) => {
        contexts.set('label', ctx)
        return 'Zero'
      },
      'option-icon': (ctx) => {
        contexts.set('icon', ctx)
        return 'I'
      },
      'option-extra': (ctx) => {
        contexts.set('extra', ctx)
        return 'E'
      },
      content: () =>
        h(
          MenuOption,
          { value: 0 },
          Object.fromEntries(
            ['default', 'icon', 'suffix'].map((kind) => [
              kind,
              (ctx) => {
                manual.set(kind, ctx)
                return kind
              },
            ]),
          ),
        ),
    },
  })
  try {
    await tick()
    for (const ctx of [...contexts.values(), ...manual.values()]) {
      expect(ctx.active).toBe(true)
      expect(ctx.option.value).toBe(0)
      expect(ctx.level).toBe(0)
      expect(ctx.selected).toBeUndefined()
    }
    expect(contexts.size).toBe(3)
    expect(manual.size).toBe(3)
    await wrapper.setProps({ modelValue: 'elsewhere' })
    for (const ctx of [...contexts.values(), ...manual.values()]) {
      expect(ctx.active).toBe(false)
    }
  } finally {
    wrapper.unmount()
  }
})

test('manual label callbacks use one context object and highlight/focus do not select', async () => {
  const label = vi.fn(({ active, option, level }) => `${option.value}:${active}:${level}`)
  const wrapper = mount(MenuOption, { props: { value: 'manual', label, highlight: true } })
  try {
    await tick()
    expect(wrapper.text()).toContain('manual:false:0')
    expect(label.mock.calls[0]).toHaveLength(1)
    expect(label.mock.calls[0][0].selected).toBeUndefined()
    await wrapper.trigger('mouseenter')
    expect(label.mock.calls.at(-1)[0].active).toBe(false)
    await wrapper.trigger('focus')
    expect(label.mock.calls.at(-1)[0].active).toBe(false)
    expect(wrapper.emitted('click')).toBeUndefined()
    expect(menuOptionProps).not.toHaveProperty('active')
  } finally {
    wrapper.unmount()
  }
})
