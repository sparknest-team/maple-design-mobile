import { h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Breadcrumb from '..'
import { add, enUS, use } from '../../locale'

test('landmark and ellipsis follow locale, with a caller override', async () => {
  add('en-US', { ...enUS })
  const routes = Array.from({ length: 5 }, (_, i) => ({ label: String(i), path: `#${i}` }))
  const label = ref<string>()
  const wrapper = mount({
    render: () =>
      h(Breadcrumb, { routes, maxCount: 2, ...(label.value === undefined ? {} : { 'aria-label': label.value }) }),
  })
  try {
    expect(wrapper.getComponent(Breadcrumb).attributes('aria-label')).toBe('面包屑导航')
    expect(wrapper.find('[aria-label="省略的路径"]').exists()).toBe(true)
    use('en-US')
    await wrapper.vm.$nextTick()
    expect(wrapper.getComponent(Breadcrumb).attributes('aria-label')).toBe('Breadcrumb')
    expect(wrapper.find('[aria-label="Omitted breadcrumb items"]').exists()).toBe(true)
    label.value = 'Custom navigation'
    await wrapper.vm.$nextTick()
    expect(wrapper.getComponent(Breadcrumb).attributes('aria-label')).toBe('Custom navigation')
  } finally {
    wrapper.unmount()
    use('zh-CN')
  }
})
