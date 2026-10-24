import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component, { Step } from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('steps')

describe('steps copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('keeps controlled current, disabled children and sibling instances isolated', async () => {
    const make = () => [
      h(Step, { title: 'one' }),
      h(Step, { title: 'two', disabled: true }),
      h(Step, { title: 'three' }),
    ]
    const a = mount(Component, { props: { modelValue: 1, changeable: true }, slots: { default: make } })
    const b = mount(Component, { props: { defaultValue: 1 }, slots: { default: make } })
    const items = a.findAll('[role="listitem"]')
    await items[1].trigger('click')
    expect(a.emitted('change')).toBeUndefined()
    await items[2].trigger('click')
    expect(a.emitted('update:modelValue')).toEqual([[3]])
    expect(a.emitted('change')[0].slice(0, 2)).toEqual([3, 1])
    expect(items[0].classes()).toContain(n() + '-item-active')
    expect(b.emitted('change')).toBeUndefined()
    a.unmount()
    b.unmount()
  })
})
