import { createSSRApp, defineComponent, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Editor from '../CascaderEditor.vue'
import { cascaderProps } from '../props'

const Host = defineComponent({
  props: cascaderProps,
  setup: (props) => () => h('div', [h(Editor, { options: props }), h(Editor, { options: props })]),
})

test('each editor search input controls its own current options region through filtering and empty results', async () => {
  const owner = mount(Host, {
    attachTo: document.body,
    props: {
      filterable: true,
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    await flushPromises()
    const editors = owner.findAllComponents(Editor)
    const inputs = editors.map((editor) => editor.get('input'))
    const ids = inputs.map((input) => input.attributes('aria-controls'))
    expect(ids[0]).toBeTruthy()
    expect(ids[0]).not.toBe(ids[1])
    const region = (index: number) => document.getElementById(ids[index]!)
    expect(editors[0].element.contains(region(0))).toBe(true)
    expect(editors[1].element.contains(region(1))).toBe(true)
    expect(region(0)?.textContent).toContain('Alpha')
    await inputs[0].setValue('Beta')
    await flushPromises()
    expect(region(0)?.textContent).toContain('Beta')
    expect(region(0)?.textContent).not.toContain('Alpha')
    expect(region(1)?.textContent).toContain('Alpha')
    await inputs[0].setValue('missing')
    await flushPromises()
    expect(region(0)).not.toBeNull()
    expect(inputs[0].attributes('aria-controls')).toBe(ids[0])
    expect(editors[0].element.contains(region(0))).toBe(true)
  } finally {
    owner.unmount()
  }
})

test('server rendering and hydration preserve each search relationship', async () => {
  const makeApp = () =>
    createSSRApp({ render: () => h(Host, { filterable: true, options: [{ value: 'a', label: 'Alpha' }] }) })
  const container = document.createElement('div')
  container.innerHTML = await renderToString(makeApp())
  document.body.append(container)
  const before = Array.from(container.querySelectorAll('input')).map((input) => input.getAttribute('aria-controls'))
  expect(before).toHaveLength(2)
  expect(before[0]).not.toBe(before[1])
  for (const id of before) {
    expect(id && document.getElementById(id)).toBeTruthy()
  }
  const app = makeApp()
  try {
    app.mount(container)
    await nextTick()
    expect(Array.from(container.querySelectorAll('input')).map((input) => input.getAttribute('aria-controls'))).toEqual(
      before,
    )
    for (const id of before) {
      expect(id && document.getElementById(id)).toBeTruthy()
    }
  } finally {
    app.unmount()
    container.remove()
  }
})
