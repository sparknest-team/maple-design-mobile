import { createSSRApp, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import FieldReference from '../../_components/field-presentation/FieldReference.vue'
import DateField from '../../date'
import Select from '../../select'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const cases = [
  ['date', DateField],
  ['select', Select],
] as const

test.each(cases)('%s associates an external name with the icon-only editor trigger', async (_name, component) => {
  const name = ref('external-name')
  const wrapper = mount(Form, {
    props: { model: { value: null } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Form label' }, () =>
          h(component as any, { editMode: 'popup', openTriggerTarget: 'icon', 'aria-labelledby': name.value }),
        ),
    },
  })
  try {
    const button = () => wrapper.get('button.mp-field-presentation__open-trigger')
    expect(button().attributes('aria-labelledby')?.split(/\s+/) ?? []).toContain('external-name')
    name.value = 'changed-name'
    await nextTick()
    expect(button().attributes('aria-labelledby')?.split(/\s+/) ?? []).toContain('changed-name')
  } finally {
    wrapper.unmount()
  }
})

test('icon editor keeps its label association through SSR and hydration', async () => {
  const App = {
    render: () =>
      h(FieldReference, { label: 'Form label', openTriggerTarget: 'icon', 'aria-labelledby': 'external-name' }),
  }
  const html = await renderToString(createSSRApp(App))
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.appendChild(container)
  const selector = 'button.mp-field-presentation__' + 'open-trigger'
  const before = container.querySelector(selector)!
  expect(before.getAttribute('aria-labelledby')?.split(/\s+/)).toContain('external-name')
  const app = createSSRApp(App)
  try {
    app.mount(container)
    await nextTick()
    expect(container.querySelector(selector)).toBe(before)
    expect(before.getAttribute('aria-labelledby')?.split(/\s+/)).toContain('external-name')
  } finally {
    app.unmount()
    container.remove()
  }
})
