import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Slider from '../../slider'
import FormItem from '../FormItem.vue'

it('names a single slider and numeric input from its explicitly targeted FormItem label', async () => {
  const target = ref('volume')
  const label = ref('Volume')
  const explicit = ref<string | undefined>()
  const namedBy = ref<string | undefined>()
  const wrapper = mount({
    setup: () => () =>
      h(FormItem, { label: label.value, labelAttrs: { id: 'volume-label', for: target.value } }, () =>
        h(Slider, { id: 'volume', showInput: true, ariaLabel: explicit.value, 'aria-labelledby': namedBy.value }),
      ),
  })
  try {
    const slider = () => wrapper.get('[role="slider"]')
    const input = () => wrapper.get('[role="spinbutton"]')
    expect(slider().attributes('aria-labelledby')).toBe('volume-label')
    expect(input().attributes('aria-labelledby')).toBe('volume-label')
    target.value = 'elsewhere'
    await nextTick()
    expect(slider().attributes('aria-labelledby')).toBeUndefined()
    expect(input().attributes('aria-labelledby')).toBeUndefined()
    target.value = 'volume'
    explicit.value = 'Custom'
    await nextTick()
    expect(slider().attributes('aria-label')).toBe('Custom')
    expect(input().attributes('aria-label')).toBe('Custom')
    expect(slider().attributes('aria-labelledby')).toBeUndefined()
    expect(input().attributes('aria-labelledby')).toBeUndefined()
    explicit.value = undefined
    namedBy.value = 'external'
    await nextTick()
    expect(slider().attributes('aria-labelledby')).toBe('external')
    expect(input().attributes('aria-labelledby')).toBe('external')
  } finally {
    wrapper.unmount()
  }
})

it('does not guess a label for an untargeted or range slider', () => {
  const single = mount(FormItem, {
    props: { label: 'Mixed' },
    slots: { default: () => [h(Slider, { id: 'volume' }), h('input')] },
  })
  const range = mount(FormItem, {
    props: { label: 'Range', labelAttrs: { for: 'range' } },
    slots: { default: () => h(Slider, { id: 'range', range: true }) },
  })
  try {
    expect(single.get('[role="slider"]').attributes('aria-labelledby')).toBeUndefined()
    expect(range.findAll('[role="slider"]').every((node) => node.attributes('aria-labelledby') === undefined)).toBe(
      true,
    )
  } finally {
    single.unmount()
    range.unmount()
  }
})

it('preserves the targeted label during server rendering', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(FormItem, { label: 'Volume', labelAttrs: { id: 'volume-label', for: 'volume' } }, () =>
          h(Slider, { id: 'volume', showInput: true }),
        ),
    }),
  )
  const container = document.createElement('div')
  container.innerHTML = html
  expect(container.querySelector('[role="slider"]')?.getAttribute('aria-labelledby')).toBe('volume-label')
  expect(container.querySelector('[role="spinbutton"]')?.getAttribute('aria-labelledby')).toBe('volume-label')
})
