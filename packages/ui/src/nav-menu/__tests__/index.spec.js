import { createApp, defineComponent, h, inject, KeepAlive, nextTick, provide, reactive, ref } from 'vue'
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import NavMenu, { NavMenuItem } from '..'
import { createNavMenuTree } from '../tree'

const mounted = []
const options = [
  { key: 0, label: '全部分类' },
  { key: '', label: '空字符串' },
  { key: 'design', label: '设计资源' },
  { key: 'disabled', label: '不可选', disabled: true },
]
function render(
  props = {},
  items = [
    { label: '分类', options },
    { label: '地区', options },
  ],
) {
  const wrapper = mount(NavMenu, {
    attachTo: document.body,
    props: { popupContainer: false, ...props },
    slots: { default: () => items.map((item) => h(NavMenuItem, item)) },
  })
  mounted.push(wrapper)
  return wrapper
}
const body = () => new DOMWrapper(document.body)
afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('migrated NavMenu filtering', () => {
  it('renders the horizontal entry structure', () => {
    expect(render().html()).toMatchSnapshot()
  })
  it('installs the original names and keeps Item syntax', () => {
    const app = createApp({}).use(NavMenu)
    expect(app.component('MpNavMenu')).toBeTruthy()
    expect(app.component('MpNavMenuItem')).toBeTruthy()
    expect(NavMenu.Item).toBe(NavMenuItem)
  })
  it('shares one overlay and switches panels without clearing their values', async () => {
    const wrapper = render()
    const entries = wrapper.findAllComponents(NavMenuItem)
    await wrapper.findAll('[data-nav-item]')[0].trigger('click')
    expect(wrapper.findAll('.mp-overlay')).toHaveLength(1)
    expect(wrapper.find('.mp-nav-menu__panel--full-width').exists()).toBe(true)
    await wrapper.findAll('[data-nav-option]')[2].trigger('click')
    expect(entries[0].emitted('update:modelValue')[0]).toEqual(['design'])
    expect(wrapper.findAll('[data-nav-item]')[0].text()).toBe('设计资源')
    await wrapper.findAll('[data-nav-item]')[0].trigger('click')
    await wrapper.findAll('[data-nav-item]')[1].trigger('click')
    expect(wrapper.findAll('[data-nav-item]')[0].attributes('aria-expanded')).toBe('false')
    expect(wrapper.findAll('[data-nav-item]')[1].attributes('aria-expanded')).toBe('true')
    expect(wrapper.findAll('[data-nav-item]')[0].text()).toBe('设计资源')
  })
  it('keeps zero/empty keys, disabled options and selection independent of open', async () => {
    const wrapper = render({}, [{ label: '分类', options, defaultValue: 0 }])
    expect(wrapper.find('[data-nav-item]').text()).toBe('全部分类')
    await wrapper.find('[data-nav-item]').trigger('click')
    expect(wrapper.findComponent(NavMenuItem).emitted('update:modelValue')).toBeUndefined()
    await wrapper.findAll('[data-nav-option]')[3].trigger('click')
    expect(wrapper.find('[data-nav-item]').attributes('aria-expanded')).toBe('true')
    await wrapper.findAll('[data-nav-option]')[1].trigger('click')
    expect(wrapper.findComponent(NavMenuItem).emitted('update:modelValue')[0]).toEqual([''])
  })
  it('keeps controlled values authoritative when a parent rejects updates', async () => {
    const wrapper = render({}, [{ label: '分类', options, open: true, modelValue: 0 }])
    await nextTick()
    await wrapper.findAll('[data-nav-option]')[2].trigger('click')
    const item = wrapper.findComponent(NavMenuItem)
    expect(item.emitted('update:modelValue')[0]).toEqual(['design'])
    expect(item.emitted('update:open')[0]).toEqual([false])
    expect(wrapper.find('[data-nav-item]').text()).toBe('全部分类')
    expect(wrapper.find('[data-nav-item]').attributes('aria-expanded')).toBe('true')
  })
  it('reveals selected ancestors on initial values, controlled updates and option replacement', async () => {
    const item = reactive({
      label: '层级',
      defaultOpen: true,
      modelValue: 0,
      options: [{ key: 'parent', label: '父级', children: [{ key: 0, label: '零值' }] }],
    })
    const wrapper = render({}, [item])
    await nextTick()
    expect(wrapper.findAll('[data-nav-option]').map((option) => option.text())).toEqual(['父级', '零值'])
    expect(wrapper.findAll('[data-nav-option]')[1].attributes('aria-pressed')).toBe('true')
    await wrapper.find('[data-nav-option]').trigger('click')
    expect(wrapper.findAll('[data-nav-option]')).toHaveLength(1)
    Object.assign(item, {
      modelValue: '',
      options: [{ key: 'new-parent', label: '新父级', children: [{ key: '', label: '空值' }] }],
    })
    await nextTick()
    expect(wrapper.findAll('[data-nav-option]').map((option) => option.text())).toEqual(['新父级', '空值'])
    Object.assign(item, {
      options: [{ key: 'replacement', label: '异步父级', children: [{ key: '', label: '异步选项' }] }],
    })
    await nextTick()
    expect(wrapper.findAll('[data-nav-option]').map((option) => option.text())).toEqual(['异步父级', '异步选项'])
  })
  it('releases renamed Item names and selects with the current name', async () => {
    const names = reactive([
      { name: 'old', label: '分类', options },
      { name: 'other', label: '地区', options },
    ])
    const wrapper = render({}, names)
    const items = wrapper.findAllComponents(NavMenuItem)
    names[0].name = 'new'
    await nextTick()
    names[1].name = 'old'
    await nextTick()
    items[0].vm.$.exposed.select('design')
    await nextTick()
    items[1].vm.$.exposed.select(0)
    await nextTick()
    expect(wrapper.emitted('update:activeItem')).toEqual([['new'], ['old']])
    await wrapper.findAll('[data-nav-item]')[0].trigger('click')
    await wrapper.findAll('[data-nav-item]')[1].trigger('click')
    expect(wrapper.findAll('[data-nav-item]').map((entry) => entry.attributes('aria-expanded'))).toEqual([
      'false',
      'true',
    ])
  })
  it('keeps a newer open request made while closing another Item', async () => {
    let first, second, third
    const wrapper = mount(NavMenu, {
      attachTo: document.body,
      props: { popupContainer: false },
      slots: {
        default: () => [
          h(NavMenuItem, {
            ref: (value) => {
              first = value
            },
            label: 'A',
            options,
            'onUpdate:open': (value) => {
              if (!value) {
                third.setOpen(true)
              }
            },
          }),
          h(NavMenuItem, {
            ref: (value) => {
              second = value
            },
            label: 'B',
            options,
          }),
          h(NavMenuItem, {
            ref: (value) => {
              third = value
            },
            label: 'C',
            options,
          }),
        ],
      },
    })
    mounted.push(wrapper)
    first.setOpen(true)
    await nextTick()
    second.setOpen(true)
    await nextTick()
    expect(wrapper.findAll('[data-nav-item]').map((entry) => entry.attributes('aria-expanded'))).toEqual([
      'false',
      'false',
      'true',
    ])
  })
  it('uses the entire bar geometry and adjusts the remaining height to visualViewport', async () => {
    const wrapper = render()
    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue({ bottom: 144 })
    const viewport = new EventTarget()
    Object.assign(viewport, { offsetTop: 0, offsetLeft: 0, width: 390, height: 844 })
    vi.stubGlobal('visualViewport', viewport)
    await wrapper.find('[data-nav-item]').trigger('click')
    wrapper.vm.resize()
    await nextTick()
    expect(wrapper.get('.mp-overlay').element.style.top).toBe('144px')
    expect(wrapper.find('.mp-overlay').attributes('style')).toContain('height: 700px')
    viewport.height = 500
    wrapper.vm.resize()
    await nextTick()
    expect(wrapper.find('.mp-overlay').attributes('style')).toContain('height: 356px')
    vi.unstubAllGlobals()
  })
  it('retains custom draft content through switching and supports explicit full layout', async () => {
    const Draft = defineComponent({
      setup() {
        const value = ref('')
        return () =>
          h('input', {
            value: value.value,
            onInput: (e) => {
              value.value = e.target.value
            },
          })
      },
    })
    const wrapper = mount(NavMenu, {
      attachTo: document.body,
      props: { popupContainer: false },
      slots: {
        default: () => [
          h(NavMenuItem, { label: '更多', popupLayout: 'full' }, { content: () => h(Draft) }),
          h(NavMenuItem, { label: '分类', options }),
        ],
      },
    })
    mounted.push(wrapper)
    await wrapper.find('[data-nav-item]').trigger('click')
    expect(wrapper.find('.mp-nav-menu__panel--full').exists()).toBe(true)
    await wrapper.find('input').setValue('draft')
    await wrapper.findAll('[data-nav-item]')[1].trigger('click')
    await wrapper.findAll('[data-nav-item]')[0].trigger('click')
    expect(wrapper.find('input').element.value).toBe('draft')
  })
  it('restores focus on Escape and does not steal it when switching', async () => {
    const wrapper = render()
    const buttons = wrapper.findAll('[data-nav-item]')
    buttons[0].element.focus()
    await buttons[0].trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(document.activeElement.hasAttribute('data-nav-option')).toBe(true)
    await body().trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(document.activeElement).toBe(buttons[0].element)
    await buttons[0].trigger('click')
    buttons[1].element.focus()
    await buttons[1].trigger('click')
    await flushPromises()
    expect(document.activeElement).toBe(buttons[1].element)
  })
  it('closes on the backdrop and leaves content clicks alone', async () => {
    const wrapper = render()
    await wrapper.find('[data-nav-item]').trigger('click')
    await wrapper.find('.mp-nav-menu__popup').trigger('click')
    expect(wrapper.find('[data-nav-item]').attributes('aria-expanded')).toBe('true')
    await wrapper.find('.mp-overlay__backdrop').trigger('pointerdown')
    await wrapper.find('.mp-overlay__backdrop').trigger('click')
    expect(wrapper.find('[data-nav-item]').attributes('aria-expanded')).toBe('false')
  })
  it('supports standalone Items and closes detached KeepAlive surfaces', async () => {
    const visible = ref(true)
    const wrapper = mount(
      {
        setup: () => () =>
          h(KeepAlive, null, {
            default: () => (visible.value ? h(NavMenuItem, { options, label: '独立入口' }) : null),
          }),
      },
      { attachTo: document.body },
    )
    mounted.push(wrapper)
    await wrapper.find('[data-nav-item]').trigger('click')
    expect(body().find('.mp-overlay').isVisible()).toBe(true)
    visible.value = false
    await nextTick()
    expect(body().find('.mp-overlay').exists() && body().find('.mp-overlay').isVisible()).toBe(false)
    visible.value = true
    await nextTick()
    expect(wrapper.find('[data-nav-item]').attributes('aria-expanded')).toBe('false')
  })
  it('preserves providers between NavMenu and a custom Item panel', async () => {
    const token = Symbol('panel-form-context')
    const Consumer = defineComponent({
      setup() {
        const context = inject(token, 'missing')
        return () => h('span', { 'data-injected': '' }, context)
      },
    })
    const Provider = defineComponent({
      setup(_, { slots }) {
        provide(token, 'local-form')
        return () => slots.default?.()
      },
    })
    const wrapper = mount(NavMenu, {
      attachTo: document.body,
      props: { popupContainer: false },
      slots: {
        default: () =>
          h(Provider, null, { default: () => h(NavMenuItem, { label: '更多' }, { content: () => h(Consumer) }) }),
      },
    })
    mounted.push(wrapper)
    await wrapper.find('[data-nav-item]').trigger('click')
    await nextTick()
    expect(body().get('[data-injected]').text()).toBe('local-form')
  })
  it('makes a closing panel inert as soon as its open state changes', async () => {
    const wrapper = render()
    const buttons = wrapper.findAll('[data-nav-item]')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    const panels = wrapper.findAll('.mp-nav-menu__popup')
    expect(panels[0].attributes('inert')).toBe('')
    expect(panels[0].attributes('aria-hidden')).toBe('true')
    expect(panels[1].attributes('inert')).toBeUndefined()
  })
  it('keeps Cedar tree validation and field mapping', () => {
    expect(() => createNavMenuTree([{ label: 'missing' }])).toThrow(/require/)
    expect(() => createNavMenuTree([{ key: 0 }, { key: 0 }])).toThrow(/duplicate/)
    const tree = createNavMenuTree([{ id: 0, text: 'mapped', disabled: true, children: [{ id: 1, text: 'child' }] }], {
      key: 'id',
      label: 'text',
    })
    expect(tree.byKey.get(1).disabled).toBe(true)
    expect(tree.ancestors(1).map((node) => node.key)).toEqual([0])
  })
})
