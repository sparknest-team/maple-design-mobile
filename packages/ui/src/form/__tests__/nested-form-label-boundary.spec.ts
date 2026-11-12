import { createSSRApp, h, Teleport } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Slider from '../../slider'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test.each([false, true])('a teleported nested form isolates outer labels, own label=%s', (own) => {
  const target = document.createElement('div')
  document.body.append(target)
  const inner = () => h(FormItem, { field: 'volume', noStyle: true }, () => h(Slider, { id: 'volume' }))
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: {} },
    slots: {
      default: () =>
        h(FormItem, { label: 'Outer', labelAttrs: { id: 'outer-label', for: 'volume' } }, () =>
          h(Teleport, { to: target }, [
            h(Form, { model: { volume: 10 } }, () =>
              own ? h(FormItem, { label: 'Inner', labelAttrs: { id: 'inner-label', for: 'volume' } }, inner) : inner(),
            ),
          ]),
        ),
    },
  })
  try {
    expect(target.querySelector('[role="slider"]')?.getAttribute('aria-labelledby')).toBe(own ? 'inner-label' : null)
  } finally {
    wrapper.unmount()
    target.remove()
  }
})

test.each([false, true])('SSR keeps teleported nested form labels separate, own label=%s', async (own) => {
  const context: { teleports?: Record<string, string> } = {}
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(Form, { model: {} }, () =>
          h(FormItem, { label: 'Outer', labelAttrs: { id: 'outer-label', for: 'volume' } }, () =>
            h(Teleport, { to: '#inner-target' }, [
              h(Form, { model: { volume: 10 } }, () => {
                const field = () => h(FormItem, { field: 'volume', noStyle: true }, () => h(Slider, { id: 'volume' }))
                return own
                  ? h(FormItem, { label: 'Inner', labelAttrs: { id: 'inner-label', for: 'volume' } }, field)
                  : field()
              }),
            ]),
          ),
        ),
    }),
    context,
  )
  expect(html).toContain('outer-label')
  const container = document.createElement('div')
  container.innerHTML = context.teleports?.['#inner-target'] || ''
  expect(container.querySelector('[role="slider"]')?.getAttribute('aria-labelledby')).toBe(own ? 'inner-label' : null)
})
