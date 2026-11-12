import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Mention from '..'
import { Space } from '../../space'
import SearchOptionsDemo from '../example/demos/search-options.vue'

afterEach(() => vi.useRealTimers())

const settle = async () => {
  for (let index = 0; index < 6; index++) {
    await Promise.resolve()
  }
  await nextTick()
}

test('the local search example filters candidates by name and ID', async () => {
  const wrapper = mount(SearchOptionsDemo, {
    attachTo: document.body,
    global: { components: { MpMention: Mention, MpSpace: Space } },
  })
  try {
    const input = wrapper.get('input[aria-label="本地人员搜索 / Local people search"]')
    ;(input.element as HTMLInputElement).focus()
    await input.setValue('@小')
    await settle()
    const dropdown = () => document.getElementById(input.attributes('aria-controls')!)
    expect(dropdown()?.textContent).toContain('小明')
    expect(dropdown()?.textContent).toContain('小红')
    expect(dropdown()?.textContent).not.toContain('李四')
    await input.setValue('@lisi')
    await settle()
    expect(dropdown()?.textContent).toContain('李四')
    expect(dropdown()?.textContent).not.toContain('小明')
  } finally {
    wrapper.unmount()
  }
})

test('the remote search example keeps only the latest result after rapid input', async () => {
  vi.useFakeTimers()
  const wrapper = mount(SearchOptionsDemo, {
    attachTo: document.body,
    global: { components: { MpMention: Mention, MpSpace: Space } },
  })
  try {
    const input = wrapper.get('input[aria-label="异步人员搜索 / Remote people search"]')
    ;(input.element as HTMLInputElement).focus()
    await input.setValue('@x')
    await settle()
    const dropdown = () => document.getElementById(input.attributes('aria-controls')!)
    expect(dropdown()?.getAttribute('aria-busy')).toBe('true')
    expect(dropdown()?.querySelector('.mp-select-dropdown-loading')).toBeTruthy()
    await input.setValue('@lisi')
    await settle()
    expect(dropdown()?.getAttribute('aria-busy')).toBe('true')
    vi.advanceTimersByTime(450)
    await settle()
    expect(dropdown()?.textContent).toContain('李四')
    expect(dropdown()?.textContent).not.toContain('小明')
    vi.advanceTimersByTime(1400)
    await settle()
    expect(dropdown()?.textContent).toContain('李四')
    expect(dropdown()?.textContent).not.toContain('小红')
  } finally {
    wrapper.unmount()
  }
})
