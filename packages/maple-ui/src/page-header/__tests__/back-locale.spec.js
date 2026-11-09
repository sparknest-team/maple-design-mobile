import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import PageHeader from '..'
import Provider from '../../locale-provider'

const owners = []
afterEach(() => owners.splice(0).forEach((w) => w.unmount()))
test('default back control has localized text even with custom graphics', () => {
  const w = mount(PageHeader, { props: { showBack: true }, slots: { back: () => h('svg') } })
  owners.push(w)
  expect(w.get('button').attributes('aria-label')).toBe('返回')
})
test('nearest locale controls the back name reactively and click still emits once', async () => {
  const english = ref(false)
  const w = mount({
    render: () =>
      h(
        Provider,
        { messages: { 'zh-CN': { 'common.back': english.value ? 'Go back' : '返回上一页' } } },
        { default: () => h(PageHeader, { showBack: true }) },
      ),
  })
  owners.push(w)
  expect(w.get('button').attributes('aria-label')).toBe('返回上一页')
  english.value = true
  await nextTick()
  expect(w.get('button').attributes('aria-label')).toBe('Go back')
  const header = w.findComponent(PageHeader)
  await w.get('button').trigger('click')
  expect(header.emitted('back')).toHaveLength(1)
})

test('explicit accessible name overrides the locale', async () => {
  const w = mount(PageHeader, { props: { showBack: true, backButtonAriaLabel: 'Previous page' } })
  owners.push(w)
  expect(w.get('button').attributes('aria-label')).toBe('Previous page')
  await w.setProps({ backButtonAriaLabel: 'Back to search' })
  expect(w.get('button').attributes('aria-label')).toBe('Back to search')
})
