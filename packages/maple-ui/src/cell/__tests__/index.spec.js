import { createApp, h } from 'vue'
import { IconFire } from '@maple-design/icons-vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Cell from '..'
import MpIcon from '../../icon/Icon'
import { createRegisteredIconComponents } from '../../utils/test'
import VarCell from '../Cell'
import ContentComparisonDemo from '../example/demos/content-comparison.vue'

test('cell plugin', () => {
  const app = createApp({}).use(Cell)
  expect(app.component(Cell.name)).toBeTruthy()
})

describe('test cell component props', () => {
  test('cell title', () => {
    const wrapper = mount(VarCell, {
      props: {
        title: 'This is cell',
      },
    })

    expect(wrapper.find('.mp-cell__title').text()).toBe('This is cell')
    wrapper.unmount()
  })

  test('cell icon', () => {
    const wrapper = mount(VarCell, {
      props: {
        icon: 'fire',
      },
      global: {
        components: createRegisteredIconComponents(['fire']),
      },
    })

    expect(wrapper.find('.mp-icon-fire').exists()).toBe(true)
    wrapper.unmount()
  })

  test('cell description', () => {
    const wrapper = mount(VarCell, {
      props: {
        description: 'This is desc',
      },
    })

    expect(wrapper.find('.mp-cell__description').text()).toBe('This is desc')
    wrapper.unmount()
  })

  test('cell border', async () => {
    const wrapper = mount(VarCell, {
      props: {
        border: true,
      },
    })

    expect(wrapper.classes('mp-cell--border')).toBe(true)
    await wrapper.setProps({ border: false })
    expect(wrapper.classes('mp-cell--border')).toBe(false)
    wrapper.unmount()
  })

  test('cell icon class', () => {
    const wrapper = mount(VarCell, {
      props: {
        icon: 'fire',
        iconClass: 'test-icon-class',
      },
    })

    expect(wrapper.find('.mp-cell__icon').classes()).toContain('test-icon-class')
    wrapper.unmount()
  })

  test('cell title class', () => {
    const wrapper = mount(VarCell, {
      props: {
        title: 'This is Cell',
        titleClass: 'test-title-class',
      },
    })

    expect(wrapper.find('.mp-cell__title').classes()).toContain('test-title-class')
    wrapper.unmount()
  })

  test('cell description class', () => {
    const wrapper = mount(VarCell, {
      props: {
        description: 'This is desc',
        descriptionClass: 'test-desc-class',
      },
    })

    expect(wrapper.find('.mp-cell__description').classes()).toContain('test-desc-class')
    wrapper.unmount()
  })

  test('cell extra class', () => {
    const wrapper = mount(VarCell, {
      props: {
        extraClass: 'test-extra-class',
      },
      slots: {
        extra: 'info-circle-fill',
      },
    })

    expect(wrapper.find('.mp-cell__extra').classes()).toContain('test-extra-class')
    wrapper.unmount()
  })
})

describe('test cell component slots', () => {
  test('cell default slots', () => {
    const wrapper = mount(VarCell, {
      slots: {
        default: () => 'This is cell',
      },
    })

    expect(wrapper.find('.mp-cell__content').text()).toBe('This is cell')
    wrapper.unmount()
  })

  test('cell icon slots', () => {
    const wrapper = mount(VarCell, {
      slots: {
        icon: h(MpIcon, { name: 'fire' }),
      },
      global: {
        components: createRegisteredIconComponents(['fire']),
      },
    })

    expect(wrapper.find('.mp-icon-fire').exists()).toBe(true)
    wrapper.unmount()
  })

  test('cell description slots', () => {
    const wrapper = mount(VarCell, {
      slots: {
        description: () => 'This is desc',
      },
    })

    expect(wrapper.find('.mp-cell__content').text()).toBe('This is desc')
    wrapper.unmount()
  })

  test('cell default and description slots', () => {
    const wrapper = mount(VarCell, {
      slots: {
        default: () => 'This is default ',
        description: () => 'This is desc',
      },
    })

    expect(wrapper.find('.mp-cell__content').text()).toBe('This is default This is desc')
    wrapper.unmount()
  })

  test('cell extra slots', () => {
    const wrapper = mount(VarCell, {
      slots: {
        extra: 'info-circle-fill',
      },
    })

    expect(wrapper.find('.mp-cell__extra').text()).toContain('info-circle-fill')
    wrapper.unmount()
  })
})

test('cell renders installed SVG icon plugins and updates its title', async () => {
  const wrapper = mount(Cell, {
    props: { icon: 'fire', title: 'First title' },
    global: { plugins: [IconFire] },
  })
  expect(wrapper.find('.mp-cell__icon svg').exists()).toBe(true)
  await wrapper.setProps({ title: 'Updated title' })
  expect(wrapper.find('.mp-cell__title').text()).toBe('Updated title')
  wrapper.unmount()
})

test('default slot overrides title', () => {
  const wrapper = mount(Cell, { props: { title: 'Fallback' }, slots: { default: 'Custom content' } })
  expect(wrapper.find('.mp-cell__content').text()).toBe('Custom content')
  expect(wrapper.find('.mp-cell__title').exists()).toBe(false)
  wrapper.unmount()
})

test('description demo displays an automatically resolved fire icon', () => {
  const wrapper = mount(ContentComparisonDemo, {
    global: { components: { MpCell: Cell, MpIcon, MIconFire: IconFire }, stubs: { MIconInfoCircleFill: true } },
  })
  const scene = wrapper.get('[data-comparison-scene="show-desc"]')
  expect(scene.find('.mp-cell__icon svg').exists()).toBe(true)
  expect(scene.find('.mp-cell__title').text()).toBe('这是单元格')
  expect(scene.find('.mp-cell__description').text()).toBe('描述')
  wrapper.unmount()
})

test('icon slots use the built-in container, spacing hook, and custom class', () => {
  const wrapper = mount(Cell, {
    props: { icon: 'fire', iconClass: 'custom-icon', title: 'Title', description: 'Description' },
    slots: { icon: () => h('svg', { 'data-slot-icon': '' }), extra: () => h('svg', { 'data-extra-icon': '' }) },
  })
  const icon = wrapper.find('.mp-cell__icon')
  expect(icon.classes()).toContain('custom-icon')
  expect(icon.find('[data-slot-icon]').exists()).toBe(true)
  expect(icon.findComponent(MpIcon).exists()).toBe(false)
  expect(wrapper.find('.mp-cell__extra > [data-extra-icon]').exists()).toBe(true)
  wrapper.unmount()
})

test('cells without icons do not reserve an icon container', () => {
  const wrapper = mount(Cell, { props: { title: 'Title' } })
  expect(wrapper.find('.mp-cell__icon').exists()).toBe(false)
  wrapper.unmount()
})

test('exposes an explicit keyboard action while keeping extra controls separate', async () => {
  const wrapper = mount(VarCell, {
    props: { clickable: true, title: 'Account' },
    slots: { extra: () => h('button', 'Other') },
  })
  const action = wrapper.get('[role="button"]')
  expect(action.attributes('tabindex')).toBe('0')
  expect(action.find('button').exists()).toBe(false)
  await action.trigger('keydown', { key: 'Enter' })
  await action.trigger('keydown', { key: ' ' })
  expect(wrapper.emitted('click')).toHaveLength(2)
  const key = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
  wrapper.get('button').element.dispatchEvent(key)
  expect(key.defaultPrevented).toBe(false)
  wrapper.unmount()
})

test('preserves display semantics and supports explicit root button attributes', async () => {
  const plain = mount(VarCell, { props: { title: 'Plain' } })
  expect(plain.find('[role="button"]').exists()).toBe(false)
  expect(plain.classes()).not.toContain('mp-cell--cursor')
  const root = mount(VarCell, { attrs: { role: 'button', tabindex: 0 } })
  await root.trigger('keydown', { key: 'Enter' })
  expect(root.emitted('click')).toHaveLength(1)
  plain.unmount()
  root.unmount()
})

test('supports a named action and safely ignores non-finite border offsets', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const wrapper = mount(VarCell, {
    props: { clickable: true, actionAriaLabel: 'Open details', borderOffset: Infinity },
  })
  expect(wrapper.get('[role="button"]').attributes('aria-label')).toBe('Open details')
  expect(wrapper.attributes('style') || '').not.toContain('Infinity')
  expect(warn).toHaveBeenCalled()
  wrapper.unmount()
  warn.mockRestore()
})

test('ripple implies an action unless explicitly disabled and root label names it', () => {
  const active = mount(VarCell, { props: { ripple: true }, attrs: { 'aria-label': 'Open profile' } })
  expect(active.get('[role="button"]').attributes('aria-label')).toBe('Open profile')
  const display = mount(VarCell, { props: { ripple: true, clickable: false } })
  expect(display.find('[role="button"]').exists()).toBe(false)
  active.unmount()
  display.unmount()
})
