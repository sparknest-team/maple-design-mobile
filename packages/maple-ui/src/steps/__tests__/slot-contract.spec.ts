import { defineComponent, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Steps, { Step } from '..'

test('text and native decorations do not consume indices, including in fragments and wrappers', async () => {
  const Wrapped = defineComponent({
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () => h(Step, { ...attrs, title: 'Wrapped' })
    },
  })
  const wrapper = mount(Steps, {
    props: { defaultValue: 2, changeable: true },
    slots: { default: () => [h(Step, { title: 'First' }), ' ', h('i', 'decoration'), h(Fragment, null, [h(Wrapped)])] },
  })
  try {
    await nextTick()
    const steps = wrapper.findAll('[data-step-index]')
    expect(steps.map((step) => step.attributes('data-step-index'))).toEqual(['1', '2'])
    expect(steps[1].attributes('aria-current')).toBe('step')
    expect(steps[1].attributes('tabindex')).toBe('0')
    expect(wrapper.find('i').text()).toBe('decoration')
  } finally {
    wrapper.unmount()
  }
})

test('adding, replacing and removing global icon slots updates existing steps', async () => {
  const icon = ref(0)
  const Host = defineComponent({
    setup: () => () =>
      h(
        Steps,
        { defaultValue: 3 },
        {
          default: () => [h(Step, { title: 'Finished' }), h(Step, { title: 'Error', status: 'error' })],
          ...(icon.value
            ? {
                'finish-icon': () => h('b', { 'data-finish': '' }, String(icon.value)),
                'error-icon': () => h('b', { 'data-error': '' }, String(icon.value)),
              }
            : {}),
        },
      ),
  })
  const wrapper = mount(Host)
  try {
    expect(wrapper.find('[data-finish]').exists()).toBe(false)
    icon.value = 1
    await nextTick()
    await nextTick()
    expect(wrapper.get('[data-finish]').text()).toBe('1')
    expect(wrapper.get('[data-error]').text()).toBe('1')
    icon.value = 2
    await nextTick()
    await nextTick()
    expect(wrapper.get('[data-finish]').text()).toBe('2')
    icon.value = 0
    await nextTick()
    await nextTick()
    expect(wrapper.find('[data-finish]').exists()).toBe(false)
    expect(wrapper.find('[data-error]').exists()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
