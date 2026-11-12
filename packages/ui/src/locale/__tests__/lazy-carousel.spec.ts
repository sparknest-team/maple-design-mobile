import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('Carousel preserves default and scoped labels when the global locale loads later', async () => {
  const Carousel = (await import('../../carousel/Carousel.vue')).default
  const CarouselItem = (await import('../../carousel/CarouselItem.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const slides = () => [h(CarouselItem, { key: 'one' }), h(CarouselItem, { key: 'two' })]
  const html = await renderToString(createSSRApp({ render: () => h(Carousel, null, slides) }))
  expect(html).toContain('aria-label="轮播"')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount(Carousel, { slots: { default: slides } })
  try {
    expect(wrapper.attributes('aria-label')).toBe('轮播')
    expect(wrapper.get('[aria-roledescription="slide"]').attributes('aria-label')).toBe('第 1 页，共 2 页')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(wrapper.attributes('aria-label')).toBe('Carousel')
    locale.add('carousel-partial-lazy', {})
    locale.use('carousel-partial-lazy')
    await nextTick()
    expect(wrapper.attributes('aria-label')).toBe('undefined')
    locale.merge('carousel-partial-lazy', { 'carousel.label': '' })
    await nextTick()
    expect(wrapper.attributes('aria-label')).toBe('')
    locale.use('zh-CN')
    await nextTick()
    expect(wrapper.attributes('aria-label')).toBe('轮播')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          {
            locale: 'local',
            messages: {
              local: {
                'carousel.label': 'Scoped',
                'carousel.slide': '{index}/{total}',
                'carousel.previous': 'Back',
                'carousel.next': 'Next',
                'carousel.goto': 'Go {index}',
              },
            },
          },
          () => h(Carousel, null, slides),
        ),
    })
    try {
      expect(scoped.getComponent(Carousel).attributes('aria-label')).toBe('Scoped')
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 20000)
