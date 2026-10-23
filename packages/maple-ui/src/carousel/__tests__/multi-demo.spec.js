import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Carousel, { CarouselItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Demo from '../example/demos/multi-slides.vue'

useDemoControls()

test('fractional-view Demo rejects then accepts mouse drags and clamps non-loop boundary', async () => {
  const wrapper = mount(Demo, {
    global: { components: { MpCarousel: Carousel, MpCarouselItem: CarouselItem } },
  })
  try {
    const viewport = wrapper.find('[class$="__viewport"]').element
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 600 },
      clientHeight: { configurable: true, value: 200 },
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
    const status = () => wrapper.get('[role=status]').text()
    await wrapper.findAll('input[type=checkbox]')[0].setValue(false)
    await drag(450, 250)
    expect(status()).toBe('Current: 0 · Proposal: 1 · Changes: 1')
    await wrapper.findAll('input[type=checkbox]')[0].setValue(true)
    await drag(450, 250)
    expect(status()).toBe('Current: 1 · Proposal: 1 · Changes: 2')
    await drag(250, 450)
    await drag(250, 450)
    expect(status()).toBe('Current: 5 · Proposal: 5 · Changes: 4')
    await wrapper.findAll('input[type=checkbox]')[1].setValue(false)
    await drag(450, 250)
    expect(status()).toBe('Current: 5 · Proposal: 5 · Changes: 4')
    expect(wrapper.findAll('[aria-roledescription=slide]')).toHaveLength(6)
  } finally {
    wrapper.unmount()
  }
})
