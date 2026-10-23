import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Carousel, { CarouselItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Demo from '../example/demos/auto-sized.vue'

useDemoControls()

test('auto-width centered Demo accepts one change per drag and wraps both boundaries', async () => {
  const wrapper = mount(Demo, {
    global: { components: { MpCarousel: Carousel, MpCarouselItem: CarouselItem } },
  })
  try {
    const viewport = wrapper.find('[class$="__viewport"]').element
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 600 },
      clientHeight: { configurable: true, value: 180 },
    })
    wrapper.findAll('[aria-roledescription=slide]').forEach((slide, index) => {
      Object.defineProperty(slide.element, 'offsetWidth', { configurable: true, value: [140, 220, 180, 260][index] })
    })
    wrapper.findComponent(Carousel).vm.resize()
    await flushPromises()
    const drag = async (from, to) => {
      for (const [type, x] of [
        ['pointerdown', from],
        ['pointerup', to],
      ]) {
        const event = new Event(type, { bubbles: true, cancelable: true })
        Object.assign(event, {
          pointerId: 1,
          pointerType: 'mouse',
          isPrimary: true,
          button: 0,
          clientX: x,
          clientY: 50,
        })
        viewport.dispatchEvent(event)
      }
      await flushPromises()
    }
    for (const [index, current] of [1, 2, 3, 0].entries()) {
      await drag(450, 250)
      expect(wrapper.get('[role=status]').text()).toBe(`Current: ${current} · Changes: ${index + 1}`)
      expect(wrapper.findComponent(Carousel).props('current')).toBe(current)
    }
    await drag(250, 450)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 3 · Changes: 5')
    await wrapper.findAll('input[type=checkbox]')[0].setValue(true)
    await wrapper.findAll('input[type=checkbox]')[1].setValue(true)
    Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 300 })
    wrapper.findAll('[aria-roledescription=slide]').forEach((slide, index) => {
      Object.defineProperty(slide.element, 'offsetWidth', { configurable: true, value: [220, 300, 260, 340][index] })
    })
    wrapper.findComponent(Carousel).vm.resize()
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toBe('Current: 3 · Changes: 5')
    expect(wrapper.findAll('[aria-roledescription=slide]').map((slide) => slide.element.style.width)).toEqual([
      '220px',
      '300px',
      '260px',
      '340px',
    ])
    await drag(250, 50)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 0 · Changes: 6')
    await wrapper.findAll('input[type=checkbox]')[0].setValue(false)
    await wrapper.findAll('input[type=checkbox]')[1].setValue(false)
    expect(wrapper.findAll('[aria-roledescription=slide]')).toHaveLength(4)
    expect(wrapper.findAll('[aria-roledescription=slide]').map((slide) => slide.element.style.width)).toEqual([
      '140px',
      '220px',
      '180px',
      '260px',
    ])
    await wrapper.findAll('input[type=checkbox]')[2].setValue(true)
    expect(wrapper.findAll('[aria-roledescription=slide]')).toHaveLength(5)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 0 · Changes: 6')
    await drag(250, 450)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 4 · Changes: 7')
    await drag(250, 450)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 3 · Changes: 8')
    await wrapper.findAll('input[type=checkbox]')[2].setValue(false)
    expect(wrapper.findAll('[aria-roledescription=slide]')).toHaveLength(4)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 3 · Changes: 8')
    await drag(450, 250)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 0 · Changes: 9')
    await wrapper.findAll('input[type=checkbox]')[3].setValue(true)
    expect(wrapper.findAll('[aria-roledescription=slide]')).toHaveLength(0)
    expect(wrapper.findAll('button').every((button) => button.element.disabled)).toBe(true)
    await drag(250, 450)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 0 · Changes: 9')
    await wrapper.findAll('input[type=checkbox]')[3].setValue(false)
    expect(wrapper.findAll('[aria-roledescription=slide]')).toHaveLength(4)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 0 · Changes: 9')
    await drag(250, 450)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 3 · Changes: 10')
    await wrapper.findAll('input[type=checkbox]')[3].setValue(true)
    expect(wrapper.findAll('[aria-roledescription=slide]')).toHaveLength(0)
    expect(wrapper.findAll('button').every((button) => button.element.disabled)).toBe(true)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 3 · Changes: 10')
    await wrapper.findAll('input[type=checkbox]')[3].setValue(false)
    expect(wrapper.findAll('[aria-roledescription=slide]')).toHaveLength(4)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 3 · Changes: 10')
    await drag(450, 250)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 0 · Changes: 11')
    await wrapper.findAll('input[type=checkbox]')[2].setValue(true)
    await drag(250, 450)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 4 · Changes: 12')
    await wrapper.findAll('input[type=checkbox]')[2].setValue(false)
    expect(wrapper.findAll('[aria-roledescription=slide]')).toHaveLength(4)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 4 · Changes: 12')
    expect(wrapper.get('button[aria-current=true]').attributes('aria-label')).toContain('4')
    await drag(450, 250)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 0 · Changes: 13')
    const initialSlides = wrapper.findAll('[aria-roledescription=slide]').map((slide) => slide.element)
    await wrapper.findAll('input[type=checkbox]')[4].setValue(true)
    expect(wrapper.findAll('[aria-roledescription=slide]').map((slide) => slide.text())).toEqual([
      '260px',
      '180px',
      '220px',
      '140px',
    ])
    expect(wrapper.findAll('[aria-roledescription=slide]').map((slide) => slide.element)).toEqual(
      [...initialSlides].reverse(),
    )
    expect(wrapper.get('[role=status]').text()).toBe('Current: 0 · Changes: 13')
    await drag(450, 250)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 1 · Changes: 14')
    await wrapper.findAll('input[type=checkbox]')[4].setValue(false)
    expect(wrapper.findAll('[aria-roledescription=slide]').map((slide) => slide.element)).toEqual(initialSlides)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 1 · Changes: 14')
    await drag(250, 450)
    expect(wrapper.get('[role=status]').text()).toBe('Current: 0 · Changes: 15')
  } finally {
    wrapper.unmount()
  }
})
