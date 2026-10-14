import { createCommentVNode, createSSRApp, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Carousel, { CarouselItem } from '..'
import { carouselLayout, normalizeIndex, slideOffset, visibleSlides } from '../layout'

const wrappers = []
function setup(props = {}, count = 4, content = undefined) {
  const wrapper = mount(Carousel, {
    props,
    attachTo: document.body,
    slots: {
      default: () =>
        Array.from({ length: count }, (_, key) =>
          h(CarouselItem, { key }, () => (content ? content(key) : 'item ' + key)),
        ),
    },
  })
  wrappers.push(wrapper)
  return wrapper
}
async function dimensions(wrapper, width = 300, height = 200) {
  const viewport = wrapper.find('[class$="__viewport"]').element
  Object.defineProperties(viewport, {
    clientWidth: { configurable: true, value: width },
    clientHeight: { configurable: true, value: height },
  })
  wrapper.vm.resize()
  await nextTick()
}
function pointer(wrapper, type, x, y = 0, pointerType = 'mouse') {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.assign(event, { pointerId: 1, pointerType, isPrimary: true, button: 0, clientX: x, clientY: y })
  wrapper.find('[class$="__viewport"]').element.dispatchEvent(event)
}
const visible = (wrapper) =>
  wrapper.findAll('[aria-roledescription="slide"]').map((slide) => slide.attributes('aria-hidden'))
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
  vi.restoreAllMocks()
})

test('layout accounts for gaps, fractional views, centering and auto item sizes', () => {
  const grid = carouselLayout(300, 4, 2, 10, [])
  expect(grid.sizes).toEqual([145, 145, 145, 145])
  expect(grid.offsets).toEqual([0, 155, 310, 465])
  expect(slideOffset(grid, 3, 300, false)).toBe(310)
  expect(visibleSlides(grid, 310, 300, 3)).toEqual([2, 3])
  expect(slideOffset(grid, 1, 300, true)).toBe(77.5)
  expect(carouselLayout(300, 3, 'auto', 10, [100, 200, 150]).offsets).toEqual([0, 110, 320])
  expect(normalizeIndex(-9, 4, true)).toBe(3)
  expect(normalizeIndex(99, 4)).toBe(3)
})
test('controlled rejection never changes accepted index, delayed acceptance emits no duplicate', async () => {
  const wrapper = setup({ current: 0 })
  await dimensions(wrapper)
  wrapper.vm.next()
  await nextTick()
  expect(visible(wrapper)).toEqual(['false', 'true', 'true', 'true'])
  expect(wrapper.emitted('update:current')).toEqual([[1]])
  await wrapper.setProps({ current: 1 })
  expect(visible(wrapper)).toEqual(['true', 'false', 'true', 'true'])
  expect(wrapper.emitted('change')).toEqual([[1, 0, true]])
})
test('multiple visible items remain accessible and offscreen items are inert', async () => {
  const wrapper = setup({ slidesPerView: 2 })
  await dimensions(wrapper)
  expect(visible(wrapper)).toEqual(['false', 'false', 'true', 'true'])
  expect(wrapper.findAll('[aria-roledescription="slide"]')[2].attributes('inert')).toBeDefined()
  wrapper.vm.to(3)
  await nextTick()
  expect(visible(wrapper)).toEqual(['false', 'true', 'true', 'false'])
})
test('uncontrolled methods wrap and clamp without duplicate boundary notifications', async () => {
  const wrapper = setup({ loop: false })
  wrapper.vm.prev()
  expect(wrapper.emitted('change')).toBeUndefined()
  wrapper.vm.to(99)
  expect(wrapper.emitted('change')).toEqual([[3, 0, true]])
  wrapper.vm.next()
  expect(wrapper.emitted('change')).toHaveLength(1)
  await wrapper.setProps({ loop: true })
  wrapper.vm.next()
  expect(wrapper.emitted('change').at(-1)).toEqual([0, 3, true])
})
test('event false suppresses change but not controlled model proposal', () => {
  const wrapper = setup({ current: 0 })
  wrapper.vm.next({ event: false })
  expect(wrapper.emitted('update:current')).toEqual([[1]])
  expect(wrapper.emitted('change')).toBeUndefined()
})
test('slow mouse drag uses release coordinates and coexists with touchable', async () => {
  vi.useFakeTimers()
  const wrapper = setup({ draggable: true, touchable: true })
  await dimensions(wrapper)
  pointer(wrapper, 'pointerdown', 250)
  vi.advanceTimersByTime(500)
  pointer(wrapper, 'pointerup', 100)
  expect(wrapper.emitted('change')).toEqual([[1, 0, true]])
})
test('short drag returns to accepted position and cancellation commits nothing', async () => {
  const wrapper = setup({ draggable: true })
  await dimensions(wrapper)
  pointer(wrapper, 'pointerdown', 100)
  pointer(wrapper, 'pointermove', 20)
  pointer(wrapper, 'pointercancel', 20)
  expect(wrapper.emitted('change')).toBeUndefined()
  expect(wrapper.find('[class$="__track"]').attributes('style')).toContain('translateX(0px)')
  pointer(wrapper, 'pointerdown', 100)
  pointer(wrapper, 'pointerup', 95)
  expect(wrapper.emitted('change')).toBeUndefined()
})
test('cross-axis touch gesture does not navigate', async () => {
  const wrapper = setup()
  await dimensions(wrapper)
  pointer(wrapper, 'pointerdown', 100, 0, 'touch')
  pointer(wrapper, 'pointermove', 90, 80, 'touch')
  pointer(wrapper, 'pointerup', 20, 80, 'touch')
  expect(wrapper.emitted('change')).toBeUndefined()
})
test('keyboard is scoped and does not steal editable control keys', async () => {
  const wrapper = setup({ keyboard: true }, 4, () => h('input'))
  await dimensions(wrapper)
  await wrapper.find('input').trigger('keydown', { key: 'ArrowRight' })
  expect(wrapper.emitted('change')).toBeUndefined()
  await wrapper.trigger('keydown', { key: 'ArrowRight' })
  expect(wrapper.emitted('change')).toEqual([[1, 0, true]])
  await wrapper.setProps({ direction: 'vertical' })
  await wrapper.trigger('keydown', { key: 'ArrowRight' })
  expect(wrapper.emitted('change')).toHaveLength(1)
  await wrapper.trigger('keydown', { key: 'End' })
  expect(wrapper.emitted('change').at(-1)).toEqual([3, 1, true])
})
test('fade exposes exactly one slide and card uses the same model', async () => {
  const wrapper = setup({ effect: 'fade', slidesPerView: 3, defaultCurrent: 1 })
  await dimensions(wrapper)
  expect(visible(wrapper)).toEqual(['true', 'false', 'true', 'true'])
  await wrapper.setProps({ effect: 'card', slidesPerView: 1 })
  wrapper.vm.next()
  await nextTick()
  expect(visible(wrapper)).toEqual(['true', 'true', 'false', 'true'])
})
test('autoplay restarts after hover, pauses for focus and reacts to config changes', async () => {
  vi.useFakeTimers()
  const wrapper = setup({ autoPlay: { interval: 100, hoverToPause: true } })
  await dimensions(wrapper)
  vi.advanceTimersByTime(100)
  await nextTick()
  expect(wrapper.emitted('change')).toEqual([[1, 0, false]])
  await wrapper.trigger('mouseenter')
  vi.advanceTimersByTime(500)
  expect(wrapper.emitted('change')).toHaveLength(1)
  await wrapper.trigger('mouseleave')
  vi.advanceTimersByTime(100)
  await nextTick()
  expect(wrapper.emitted('change')).toHaveLength(2)
  await wrapper.trigger('focusin')
  vi.advanceTimersByTime(500)
  expect(wrapper.emitted('change')).toHaveLength(2)
  await wrapper.trigger('focusout', { relatedTarget: document.body })
  await wrapper.setProps({ autoPlay: false })
  vi.advanceTimersByTime(500)
  expect(wrapper.emitted('change')).toHaveLength(2)
})
test('KeepAlive suspends autoplay and resumes with no duplicate timers', async () => {
  vi.useFakeTimers()
  const shown = ref(true)
  const change = vi.fn()
  const wrapper = mount({
    render: () =>
      h(KeepAlive, null, () =>
        shown.value
          ? h(
              Carousel,
              { autoPlay: 100, onChange: change },
              { default: () => [h(CarouselItem, { key: 0 }), h(CarouselItem, { key: 1 })] },
            )
          : null,
      ),
  })
  wrappers.push(wrapper)
  await nextTick()
  shown.value = false
  await nextTick()
  vi.advanceTimersByTime(500)
  expect(change).not.toHaveBeenCalled()
  shown.value = true
  await nextTick()
  vi.advanceTimersByTime(100)
  expect(change).toHaveBeenCalledTimes(1)
  wrapper.unmount()
  wrappers.pop()
  vi.advanceTimersByTime(1000)
  expect(change).toHaveBeenCalledTimes(1)
})
test('SSR renders the active slide without browser APIs', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(
          Carousel,
          { defaultCurrent: 1 },
          { default: () => [h(CarouselItem, { key: 0 }, () => 'a'), h(CarouselItem, { key: 1 }, () => 'b')] },
        ),
    }),
  )
  expect(html).toContain('aria-roledescription="carousel"')
  expect(html).toMatch(/aria-label="[^"]*2[^"]*2[^"]*"/)
  expect(html.match(/aria-hidden="false"/g)).toHaveLength(1)
})
test('empty and one-item carousels do not schedule transitions', async () => {
  vi.useFakeTimers()
  for (const count of [0, 1]) {
    const wrapper = setup({ autoPlay: 10 }, count)
    wrapper.vm.next()
    wrapper.vm.prev()
    vi.advanceTimersByTime(100)
    expect(wrapper.emitted('change')).toBeUndefined()
  }
})

test('comments and non-item nodes do not become phantom pages', async () => {
  const wrapper = mount(Carousel, {
    slots: {
      default: () => [
        createCommentVNode('v-if'),
        h('span', 'not a slide'),
        h(CarouselItem, { key: 'real' }, () => 'real'),
      ],
    },
  })
  wrappers.push(wrapper)
  expect(wrapper.findAll('[aria-roledescription="slide"]')).toHaveLength(1)
  expect(wrapper.find('[aria-roledescription="slide"]').attributes('aria-label')).toMatch(/1.*1/)
  wrapper.vm.next()
  expect(wrapper.emitted('change')).toBeUndefined()
})
test('numeric string gap is converted to pixels', () => {
  const wrapper = setup({ spaceBetween: '10' })
  expect(wrapper.find('[class$="__track"]').element.style.gap).toBe('10px')
})
test('loop boundary continues forward then resets without cloning item instances', async () => {
  vi.useFakeTimers()
  const wrapper = setup({ defaultCurrent: 3, slidesPerView: 2, moveSpeed: 100 })
  await dimensions(wrapper)
  expect(visible(wrapper)).toEqual(['false', 'true', 'true', 'false'])
  wrapper.vm.next()
  await nextTick()
  expect(wrapper.find('[class$="__track"]').element.style.transform).toBe('translateX(-600px)')
  expect(wrapper.findAll('[aria-roledescription="slide"]')).toHaveLength(4)
  expect(visible(wrapper)).toEqual(['false', 'false', 'true', 'true'])
  vi.advanceTimersByTime(100)
  await nextTick()
  expect(wrapper.find('[class$="__track"]').element.style.transform).toBe('translateX(0px)')
  wrapper.vm.prev()
  await nextTick()
  expect(wrapper.find('[class$="__track"]').element.style.transform).toBe('translateX(150px)')
})
test('fractional visible slides are not aria-hidden', async () => {
  const wrapper = setup({ slidesPerView: 2.5 })
  await dimensions(wrapper)
  expect(visible(wrapper)).toEqual(['false', 'false', 'false', 'true'])
})
test('ancestor hidden pauses autoplay and reopens after visibility mutation', async () => {
  vi.useFakeTimers()
  const wrapper = setup({ autoPlay: 100 })
  await dimensions(wrapper)
  const parent = wrapper.element.parentElement
  parent.hidden = true
  await nextTick()
  await Promise.resolve()
  vi.advanceTimersByTime(200)
  expect(wrapper.emitted('change')).toBeUndefined()
  parent.hidden = false
  await nextTick()
  await Promise.resolve()
  vi.advanceTimersByTime(100)
  expect(wrapper.emitted('change')).toHaveLength(1)
})

test('outgoing slide is not recycled before ordinary transition completes', async () => {
  vi.useFakeTimers()
  const wrapper = setup({ moveSpeed: 100 })
  await dimensions(wrapper)
  wrapper.vm.next()
  await nextTick()
  const slides = wrapper.findAll('[aria-roledescription="slide"]')
  expect(slides[0].element.style.translate).toBe('')
  vi.advanceTimersByTime(50)
  expect(slides[0].element.style.translate).toBe('')
  // At the half-time track position -150, slides 0 and 1 cover the full viewport.
  const widths = slides.map((slide) => parseFloat(slide.element.style.width))
  const shifts = slides.map((slide) => parseFloat(slide.element.style.translate) || 0)
  const halfway = -widths[0] / 2
  const outgoingEnd = shifts[0] + widths[0] + halfway
  const incomingStart = widths[0] + shifts[1] + halfway
  expect(outgoingEnd).toBeGreaterThan(0)
  expect(incomingStart).toBeLessThan(300)
  expect(incomingStart).toBe(outgoingEnd)
  vi.advanceTimersByTime(50)
  await nextTick()
  expect(slides[0].element.style.translate).toBe('1200px 0')
})
test('cancelled pointer does not swallow the next child button click', async () => {
  const clicked = vi.fn()
  const wrapper = setup({ draggable: true }, 4, () => h('button', { onClick: clicked }, 'action'))
  await dimensions(wrapper)
  pointer(wrapper, 'pointerdown', 100)
  pointer(wrapper, 'pointermove', 50)
  pointer(wrapper, 'pointercancel', 50)
  await wrapper.find('button').trigger('click')
  expect(clicked).toHaveBeenCalledTimes(1)
})
test('deactivation clears stale hover pause', async () => {
  vi.useFakeTimers()
  const shown = ref(true)
  const change = vi.fn()
  const wrapper = mount({
    render: () =>
      h(KeepAlive, null, () =>
        shown.value
          ? h(
              Carousel,
              { autoPlay: { interval: 100, hoverToPause: true }, onChange: change },
              { default: () => [h(CarouselItem, { key: 0 }), h(CarouselItem, { key: 1 })] },
            )
          : null,
      ),
  })
  wrappers.push(wrapper)
  await wrapper.findComponent(Carousel).trigger('mouseenter')
  shown.value = false
  await nextTick()
  shown.value = true
  await nextTick()
  vi.advanceTimersByTime(100)
  expect(change).toHaveBeenCalledTimes(1)
})

test('centered distant jumps snap when the union would require the same slide twice', async () => {
  vi.useFakeTimers()
  const wrapper = setup({ defaultCurrent: 1, centeredSlides: true, slidesPerView: 2, moveSpeed: 100 })
  await dimensions(wrapper)
  wrapper.vm.to(3)
  await nextTick()
  const track = wrapper.find('[class$="__track"]').element
  expect(track.style.transitionDuration).toBe('0ms')
  expect(track.style.transform).toBe('translateX(-375px)')
  const slides = wrapper.findAll('[aria-roledescription="slide"]')
  expect(slides[0].element.style.translate).toBe('600px 0')
  expect(visible(wrapper)).toEqual(['false', 'true', 'false', 'false'])
})
