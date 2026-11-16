import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'
import Panel from '../CascaderPanel.vue'

const options = [
  { value: 'north', label: 'North', children: [{ value: 'n', label: 'Springfield' }] },
  { value: 'south', label: 'South', children: [{ value: 's', label: 'Springfield' }] },
]

test('multiple search checkboxes refer to the displayed path and custom formatter', async () => {
  const wrapper = mount(Cascader, {
    props: {
      options,
      multiple: true,
      filterable: true,
      defaultOpen: true,
      editMode: 'direct',
      popupContainer: false,
      inputValue: 'Springfield',
      formatLabel: (path: { label?: string }[]) => path.map((item) => item.label).join(' > '),
    },
  })
  try {
    await flushPromises()
    const inputs = wrapper.findAll('[role="dialog"] input[type="checkbox"]')
    expect(inputs).toHaveLength(2)
    const labels = inputs.map((input) => {
      const id = input.attributes('aria-labelledby')
      return wrapper
        .findAll('[id]')
        .find((element) => element.attributes('id') === id)
        ?.text()
    })
    expect(labels).toEqual(['North > Springfield', 'South > Springfield'])
  } finally {
    wrapper.unmount()
  }
})

test('checkbox refers to a custom option label in the standalone panel', () => {
  const wrapper = mount(Panel, {
    props: { options: [{ value: 'a', label: 'Original' }], multiple: true },
    slots: { option: () => h('span', 'Custom label') },
  })
  try {
    const input = wrapper.get('input[type="checkbox"]')
    const id = input.attributes('aria-labelledby')
    expect(
      wrapper
        .findAll('[id]')
        .find((element) => element.attributes('id') === id)
        ?.text(),
    ).toBe('Custom label')
  } finally {
    wrapper.unmount()
  }
})

test('server-rendered option labels retain their references during hydration', async () => {
  const makeApp = () => createSSRApp({ render: () => h(Panel, { options, multiple: true }) })
  const html = await renderToString(makeApp())
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  const app = makeApp()
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  try {
    app.mount(container)
    await nextTick()
    const inputs = Array.from(container.querySelectorAll('input[type="checkbox"]'))
    expect(inputs).toHaveLength(2)
    for (const input of inputs) {
      const id = input.getAttribute('aria-labelledby')
      expect(Array.from(container.querySelectorAll('[id]')).some((element) => element.id === id)).toBe(true)
    }
    expect(warn.mock.calls.some((args) => String(args[0]).includes('Hydration'))).toBe(false)
  } finally {
    app.unmount()
    container.remove()
    warn.mockRestore()
  }
})
