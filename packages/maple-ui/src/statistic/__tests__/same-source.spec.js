import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('statistic')

describe('statistic copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('updates placeholder when default slot appears and disappears', async () => {
    const enabled = ref(false)
    const w = mount({
      setup: () => () => h(Component, { placeholder: 'empty' }, enabled.value ? { default: () => 'value' } : {}),
    })
    expect(w.text()).toBe('empty')
    enabled.value = true
    await nextTick()
    expect(w.text()).toBe('value')
    enabled.value = false
    await nextTick()
    expect(w.text()).toBe('empty')
    w.unmount()
  })
  it('formats precision, separators and affixes', () => {
    const w = mount(Component, {
      props: { value: 1234.5, precision: 2, showGroupSeparator: true, separator: '_', prefix: '$', suffix: 'USD' },
    })
    expect(w.text()).toBe('$1_234.50USD')
    w.unmount()
  })
})
