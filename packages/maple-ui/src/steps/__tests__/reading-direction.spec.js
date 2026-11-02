import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Steps, { Step } from '..'

const wrappers = [],
  hosts = []
function setup(component, options = {}, dir = 'rtl') {
  const host = document.createElement('div')
  host.dir = dir
  document.body.append(host)
  hosts.push(host)
  const wrapper = mount(component, { attachTo: host, ...options })
  wrappers.push(wrapper)
  return wrapper
}
async function settled() {
  await nextTick()
  await Promise.resolve()
  await nextTick()
  await nextTick()
}
afterEach(() => {
  wrappers.splice(0).forEach((w) => w.unmount())
  hosts.splice(0).forEach((h) => h.remove())
})
test('switches horizontal keyboard direction live, skips disabled steps, and separates focus from progress', async () => {
  const wrapper = setup(Steps, {
    props: { changeable: true },
    slots: {
      default: () => [
        h(Step, { title: 'one' }),
        h(Step, { title: 'disabled', disabled: true }),
        h(Step, { title: 'three' }),
      ],
    },
  })
  await settled()
  const buttons = wrapper.findAll('[role="button"]')
  buttons[0].element.focus()
  await buttons[0].trigger('keydown', { key: 'ArrowLeft' })
  await settled()
  expect(document.activeElement).toBe(buttons[2].element)
  expect(wrapper.emitted('change')).toBeUndefined()
  await buttons[2].trigger('keydown', { key: 'Enter' })
  expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
  hosts[0].dir = 'ltr'
  await settled()
  await buttons[2].trigger('keydown', { key: 'ArrowLeft' })
  expect(document.activeElement).toBe(buttons[0].element)
  await wrapper.setProps({ orientation: 'vertical' })
  await buttons[0].trigger('keydown', { key: 'ArrowDown' })
  expect(document.activeElement).toBe(buttons[2].element)
  expect(wrapper.emitted('change')).toHaveLength(1)
})
test('native nested LTR overrides RTL and read-only steps cannot activate', async () => {
  const wrapper = setup(Steps, {
    attrs: { dir: 'ltr' },
    props: { changeable: true },
    slots: { default: () => [h(Step, { title: 'one' }), h(Step, { title: 'two' })] },
  })
  await settled()
  const buttons = wrapper.findAll('[role="button"]')
  buttons[0].element.focus()
  await buttons[0].trigger('keydown', { key: 'ArrowRight' })
  expect(document.activeElement).toBe(buttons[1].element)
  await wrapper.setProps({ changeable: false })
  await wrapper.findAll('[role="listitem"]')[1].trigger('click')
  expect(wrapper.emitted('change')).toBeUndefined()
})
