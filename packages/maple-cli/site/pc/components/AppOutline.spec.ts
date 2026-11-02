import { mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import AppOutline from './AppOutline.vue'

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

it('debounces document scroll, ignores nested scrollers, and cancels pending work on page change', async () => {
  vi.useFakeTimers()
  const root = document.createElement('main')
  root.innerHTML =
    '<article class="maple-site-doc"><h3 id="first">First</h3><h3 id="second">Second</h3><div class="demo-scroller"></div></article>'
  document.body.append(root)
  let top = 300
  vi.spyOn(root.querySelector('#first')!, 'getBoundingClientRect').mockImplementation(
    () => ({ top: top - 200 }) as DOMRect,
  )
  vi.spyOn(root.querySelector('#second')!, 'getBoundingClientRect').mockImplementation(() => ({ top }) as DOMRect)
  const onActiveChange = vi.fn()
  const wrapper = mount(AppOutline, { props: { root, pageKey: '/button' }, attrs: { onActiveChange } })
  expect(wrapper.emitted('active-change')).toBeUndefined()
  top = 100
  document.dispatchEvent(new Event('scroll'))
  document.dispatchEvent(new Event('scroll'))
  await vi.advanceTimersByTimeAsync(149)
  expect(wrapper.emitted('active-change')).toBeUndefined()
  await vi.advanceTimersByTimeAsync(1)
  expect(wrapper.emitted('active-change')).toEqual([['second']])
  expect(wrapper.get('[aria-current="location"]').text()).toBe('Second')

  root.querySelector('.demo-scroller')!.dispatchEvent(new Event('scroll'))
  await vi.advanceTimersByTimeAsync(200)
  expect(wrapper.emitted('active-change')).toHaveLength(1)

  top = 300
  document.dispatchEvent(new Event('scroll'))
  await wrapper.setProps({ pageKey: '/input' })
  await vi.advanceTimersByTimeAsync(200)
  expect(wrapper.emitted('active-change')).toHaveLength(1)
  // Back above the first heading clears the section hash.
  top = 500
  document.dispatchEvent(new Event('scroll'))
  await vi.advanceTimersByTimeAsync(150)
  expect(wrapper.emitted('active-change')?.at(-1)).toEqual([''])
  document.dispatchEvent(new Event('scroll'))
  wrapper.unmount()
  await vi.advanceTimersByTimeAsync(200)
  expect(onActiveChange).toHaveBeenCalledTimes(2)
  root.remove()
})

it('keeps the active link visible without moving the page, and catches up when the outline is shown', async () => {
  const root = document.createElement('main')
  root.innerHTML = '<article class="maple-site-doc"><h3 id="section">Section</h3></article>'
  document.body.append(root)
  vi.spyOn(root.querySelector('h3')!, 'getBoundingClientRect').mockReturnValue({ top: 100 } as DOMRect)
  const wrapper = mount(AppOutline, { props: { root, visible: false } })
  const container = wrapper.get('nav').element as HTMLElement
  const link = wrapper.get('a').element
  const scrollTo = vi.fn()
  container.scrollTo = scrollTo
  container.scrollTop = 50
  vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({ top: 100, bottom: 300, height: 200 } as DOMRect)
  const itemBounds = vi.spyOn(link, 'getBoundingClientRect').mockReturnValue({ top: 310, bottom: 340 } as DOMRect)

  await wrapper.setProps({ visible: true })
  await wrapper.vm.$nextTick()
  expect(scrollTo).toHaveBeenLastCalledWith({ top: 90, behavior: 'smooth' })
  scrollTo.mockClear()
  itemBounds.mockReturnValue({ top: 80, bottom: 110 } as DOMRect)
  document.dispatchEvent(new Event('scroll'))
  await wrapper.vm.$nextTick()
  expect(scrollTo).toHaveBeenLastCalledWith({ top: 30, behavior: 'smooth' })

  scrollTo.mockClear()
  itemBounds.mockReturnValue({ top: 150, bottom: 180 } as DOMRect)
  document.dispatchEvent(new Event('scroll'))
  await wrapper.vm.$nextTick()
  expect(scrollTo).not.toHaveBeenCalled()
  await wrapper.setProps({ visible: false })
  itemBounds.mockReturnValue({ top: 310, bottom: 340 } as DOMRect)
  document.dispatchEvent(new Event('scroll'))
  await wrapper.vm.$nextTick()
  expect(scrollTo).not.toHaveBeenCalled()
  wrapper.unmount()
  root.remove()
})
