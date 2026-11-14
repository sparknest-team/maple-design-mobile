import { createApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Card from '..'
import { delay } from '../../utils/test'
import VarCard from '../Card'

test('card use', () => {
  const app = createApp({}).use(Card)
  expect(app.component(Card.name)).toBeTruthy()
})

describe('test card component events', () => {
  test('card onClick with null callback', () => {
    const onClick = vi.fn()
    const wrapper = mount(VarCard)
    wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(0)
    wrapper.unmount()
  })

  test('card onClick', () => {
    const onClick = vi.fn()
    const wrapper = mount(VarCard, {
      props: {
        onClick,
      },
    })

    wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})

describe('test card component props', () => {
  test('card title', async () => {
    const wrapper = mount(VarCard, {
      props: {
        title: 'This is title',
      },
    })

    expect(wrapper.find('.mp-card__title').element.textContent).toBe('This is title')

    await wrapper.setProps({
      title: 'This is another title',
    })
    expect(wrapper.find('.mp-card__title').element.textContent).toBe('This is another title')

    wrapper.unmount()
  })

  test('card subtitle', async () => {
    const wrapper = mount(VarCard, {
      props: {
        subtitle: 'This is subtitle',
      },
    })

    expect(wrapper.find('.mp-card__subtitle').element.textContent).toBe('This is subtitle')

    await wrapper.setProps({
      subtitle: 'This is another subtitle',
    })
    expect(wrapper.find('.mp-card__subtitle').element.textContent).toBe('This is another subtitle')

    wrapper.unmount()
  })

  test('card description', async () => {
    const wrapper = mount(VarCard, {
      props: {
        description: 'This is description',
      },
    })

    expect(wrapper.find('.mp-card__description').element.textContent).toBe('This is description')

    await wrapper.setProps({
      description: 'This is another description',
    })
    expect(wrapper.find('.mp-card__description').element.textContent).toBe('This is another description')

    wrapper.unmount()
  })

  test('card elevation', async () => {
    const wrapper = mount(VarCard, { props: { variant: 'default' } })

    expect(wrapper.find('.mp-elevation--0').exists()).toBe(true)

    await wrapper.setProps({
      elevation: 3,
    })
    expect(wrapper.find('.mp-elevation--3').exists()).toBe(true)

    wrapper.unmount()
  })

  test('card outline', async () => {
    const wrapper = mount(VarCard)

    expect(wrapper.find('.mp-card--variant-outline').exists()).toBe(true)

    await wrapper.setProps({
      variant: 'outline',
    })
    expect(wrapper.find('.mp-card--variant-outline').exists()).toBe(true)
    expect(wrapper.find('.mp-elevation--1').exists()).toBe(false)

    wrapper.unmount()
  })

  test('card outline variant', async () => {
    const wrapper = mount(VarCard, {
      props: {
        variant: 'outline',
      },
    })

    expect(wrapper.find('.mp-card--variant-outline').exists()).toBe(true)

    await wrapper.setProps({
      variant: 'default',
    })
    expect(wrapper.find('.mp-card--variant-outline').exists()).toBe(false)

    wrapper.unmount()
  })

  test('card filled variant', async () => {
    const wrapper = mount(VarCard, {
      props: {
        variant: 'tonal',
      },
    })

    expect(wrapper.find('.mp-card--variant-tonal').exists()).toBe(true)

    await wrapper.setProps({
      variant: 'default',
    })
    expect(wrapper.find('.mp-card--variant-tonal').exists()).toBe(false)

    wrapper.unmount()
  })

  test('card src', async () => {
    const wrapper = mount(VarCard, {
      props: {
        imageSrc: 'https://maplejs.org/cat.jpg',
      },
    })

    expect(wrapper.find('img').attributes('src')).toBe('https://maplejs.org/cat.jpg')

    await wrapper.setProps({
      imageSrc: 'https://maplejs.org/cat2.jpg',
    })
    expect(wrapper.find('img').attributes('src')).toBe('https://maplejs.org/cat2.jpg')

    wrapper.unmount()
  })

  test('card fit', () => {
    ;['fill', 'contain', 'cover', 'none', 'scale-down'].forEach((fit) => {
      const wrapper = mount(VarCard, {
        props: {
          imageFit: fit,
          imageSrc: 'https://maplejs.org/cat.jpg',
        },
      })

      expect(wrapper.find('img').attributes('style')).toContain('object-fit: ' + fit)
      wrapper.unmount()
    })
  })

  test('card alt', async () => {
    const wrapper = mount(VarCard, {
      props: {
        imageAlt: 'This is alt',
        imageSrc: 'https://maplejs.org/cat.jpg',
      },
    })

    expect(wrapper.find('img').attributes('alt')).toBe('This is alt')

    await wrapper.setProps({
      imageAlt: 'This is another alt',
    })
    expect(wrapper.find('img').attributes('alt')).toBe('This is another alt')

    wrapper.unmount()
  })

  test('card imageHeight', async () => {
    const wrapper = mount(VarCard, {
      props: {
        imageHeight: 100,
        imageSrc: 'https://maplejs.org/cat.jpg',
      },
    })

    expect(wrapper.find('img').attributes('style')).toContain('height: 100px;')

    await wrapper.setProps({
      imageHeight: 200,
    })
    expect(wrapper.find('img').attributes('style')).toContain('height: 200px;')

    wrapper.unmount()
  })

  test('card imageWidth', async () => {
    const wrapper = mount(VarCard, {
      props: {
        imageWidth: 100,
        imageSrc: 'https://maplejs.org/cat.jpg',
      },
    })

    expect(wrapper.find('img').attributes('style')).toContain('width: 100px;')

    await wrapper.setProps({
      imageWidth: 200,
    })
    expect(wrapper.find('img').attributes('style')).toContain('width: 200px;')

    wrapper.unmount()
  })

  test('card floating', async () => {
    const wrapper = mount(VarCard, {
      props: {
        floating: false,
      },
    })

    expect(wrapper.find('.mp-card__floater').attributes('style')).toContain('width: 100%;')
    await wrapper.setProps({
      floating: true,
    })
    await delay(300)
    expect(wrapper.find('.mp-card__floater').attributes('style')).toContain('width: 100vw;')
    wrapper.unmount()
  })

  test('card direction', async () => {
    const wrapper = mount(VarCard)

    expect(wrapper.find('.mp-card--direction-row').exists()).toBe(false)

    await wrapper.setProps({
      direction: 'row',
    })
    expect(wrapper.find('.mp-card--direction-row').exists()).toBe(true)

    wrapper.unmount()
  })
})

describe('test card component slots', () => {
  test('card image slot', () => {
    const wrapper = mount(VarCard, {
      slots: {
        cover: '<img src="https://maplejs.org/cat.jpg" alt="cat" />',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('card default slot', () => {
    const wrapper = mount(VarCard, {
      slots: {
        default: 'default slot',
      },
    })

    expect(wrapper.find('.mp-card__content').text()).toBe('default slot')

    wrapper.unmount()
  })

  test('card title slot', () => {
    const wrapper = mount(VarCard, {
      slots: {
        title: ({ slotClass }) => h('span', { class: slotClass }, 'title'),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('card subtitle slot', () => {
    const wrapper = mount(VarCard, {
      slots: {
        subtitle: ({ slotClass }) => h('span', { class: slotClass }, 'subtitle'),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('card description slot', () => {
    const wrapper = mount(VarCard, {
      slots: {
        description: ({ slotClass }) => h('span', { class: slotClass }, 'description'),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('card extra slot', () => {
    const wrapper = mount(VarCard, {
      slots: {
        footer: '<span>extra</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('card floating-content slot', async () => {
    const wrapper = mount(VarCard, {
      slots: {
        'floating-content': '<span>floating-content</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({
      direction: 'row',
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })
})
