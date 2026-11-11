import { h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Empty from '..'

test('local description and extra slots follow conditional updates', async () => {
  const custom = ref(false)
  const w = mount({
    render: () =>
      h(Empty, {}, custom.value ? { default: () => 'Local description', extra: () => h('button', 'Reload') } : {}),
  })
  expect(w.text()).not.toContain('Reload')
  custom.value = true
  await flushPromises()
  expect(w.text()).toContain('Local description')
  expect(w.get('button').text()).toBe('Reload')
  custom.value = false
  await flushPromises()
  expect(w.find('button').exists()).toBe(false)
  w.unmount()
})
test('clicking local extra content emits once', async () => {
  let clicks = 0
  const w = mount(Empty, { props: { onClick: () => clicks++ }, slots: { extra: () => h('button', 'Reload') } })
  await w.get('button').trigger('click')
  expect(clicks).toBe(1)
  w.unmount()
})
