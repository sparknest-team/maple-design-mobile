import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import SplitButton from '..'
import Button from '../../button'
import { MenuOption } from '../../menu'
import Space from '../../space'
import Controlled from '../example/controlled.vue'

vi.mock('@maple-design/ui-vue', async () => ({
  Locale: (await import('../../locale')).default,
  Message: { info: vi.fn() },
}))

test('controlled demo stays open after the external click, then closes on selection or outside click', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const components = Object.fromEntries(
    [SplitButton, Button, Space, MenuOption].map((component) => [component.name, component]),
  )
  const wrapper = mount(Controlled, { attachTo: host, global: { components } })
  const button = (label) => wrapper.findAll('button').find((item) => item.text() === label)
  const settle = async () => {
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  try {
    button('展开菜单').element.click()
    await settle()
    expect(wrapper.text()).toContain('已展开')
    expect(wrapper.find('[aria-haspopup="menu"]').attributes('aria-expanded')).toBe('true')
    document.querySelector('[data-menu-item]').click()
    await settle()
    expect(wrapper.find('[aria-haspopup="menu"]').attributes('aria-expanded')).toBe('false')
    button('展开菜单').element.click()
    await settle()
    document.body.click()
    await settle()
    expect(wrapper.find('[aria-haspopup="menu"]').attributes('aria-expanded')).toBe('false')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
