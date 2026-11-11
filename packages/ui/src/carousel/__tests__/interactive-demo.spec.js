import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Carousel, { CarouselItem } from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Demo from '../example/demos/interactive-content.vue'

useDemoControls()

test('editable keys and pointer gestures stay local while background drags update the Demo model', async () => {
  const wrapper = mount(Demo, {
    global: { components: { MpCarousel: Carousel, MpCarouselItem: CarouselItem } },
  })
  try {
    const viewport = wrapper.find('[class$="__viewport"]').element
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 600 },
      clientHeight: { configurable: true, value: 180 },
    })
    wrapper.findComponent(Carousel).vm.resize()
    await flushPromises()
    const status = () => wrapper.get('[role=status]').text()
    const input = wrapper.get('input[aria-label="Slide 1"]')
    await input.setValue('local-177')
    for (const key of ['ArrowLeft', 'ArrowRight', 'Home', 'End']) {
      await input.trigger('keydown', { key })
    }
    const drag = async (target, from, to) => {
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
        target.dispatchEvent(event)
      }
      await flushPromises()
    }
    await drag(input.element, 450, 250)
    expect(status()).toBe('Current: 1 · Changes: 0')
    await drag(viewport, 450, 250)
    expect(status()).toBe('Current: 2 · Changes: 1')
    await wrapper.get('input[aria-label="Slide 2"]').setValue('second-177')
    await wrapper.get('input[aria-label="Slide 2"]').trigger('keydown', { key: 'ArrowLeft' })
    expect(status()).toBe('Current: 2 · Changes: 1')
    await drag(viewport, 250, 450)
    expect(status()).toBe('Current: 1 · Changes: 2')
    expect(input.element.value).toBe('local-177')
    await wrapper.get('.carousel-interactive-demo').trigger('keydown', { key: 'ArrowRight' })
    expect(status()).toBe('Current: 2 · Changes: 3')
    expect(wrapper.findComponent(Carousel).props('modelValue')).toBe(2)
    expect(wrapper.get('input[aria-label="Slide 2"]').element.value).toBe('second-177')
  } finally {
    wrapper.unmount()
  }
})
