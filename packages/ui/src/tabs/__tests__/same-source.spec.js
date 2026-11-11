import { createSSRApp, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Tabs, { TabItem, TabNav, TabPane, TabsItems, TabsNavs } from '..'

function content(keys = ['a', 'b', 'c'], disabled = [], itemProps = {}) {
  return [
    h(TabsNavs, null, {
      default: () =>
        keys.map((key) => h(TabNav, { name: key, key, title: String(key), disabled: disabled.includes(key) })),
    }),
    h(TabsItems, null, {
      default: () =>
        keys.map((key) =>
          h(TabItem, { name: key, key, ...itemProps }, { default: () => h('input', { value: `panel-${key}` }) }),
        ),
    }),
  ]
}
function setup(props = {}, keys = undefined, disabled = undefined, itemProps = undefined) {
  return mount(Tabs, { attachTo: document.body, props, slots: { default: () => content(keys, disabled, itemProps) } })
}
function selected(wrapper) {
  return wrapper
    .findAll('[role="tab"]')
    .filter((tab) => tab.attributes('aria-selected') === 'true')
    .map((tab) => tab.text())
}

describe('Tabs shared behavior', () => {
  test('plugin registration renders the TabPane template shorthand', () => {
    const w = mount(
      { template: '<mp-tabs><mp-tab-pane name="a" title="First">panel-a</mp-tab-pane></mp-tabs>' },
      { global: { plugins: [Tabs] } },
    )

    expect(w.find('[role="tab"]').text()).toBe('First')
    expect(w.find('[role="tabpanel"]').text()).toBe('panel-a')
    w.unmount()
  })

  test('navigation-only tabs do not require TabsItems or TabItem', async () => {
    const w = mount(Tabs, {
      slots: {
        default: () =>
          h(TabsNavs, null, {
            default: () => [h(TabNav, { name: 'a', title: 'a' }), h(TabNav, { name: 'b', title: 'b' })],
          }),
      },
    })

    expect(w.findAll('[role="tab"]')).toHaveLength(2)
    expect(w.findAll('[role="tabpanel"]')).toHaveLength(0)
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(selected(w)).toEqual(['b'])
    w.unmount()
  })

  test('TabPane children generate navigation and panels', async () => {
    const w = mount(Tabs, {
      slots: {
        default: () => [
          h(TabPane, { name: 'a', title: 'First' }, { default: () => 'panel-a' }),
          h(TabPane, { name: 'b', title: 'Second' }, { default: () => 'panel-b' }),
        ],
      },
    })

    expect(w.findAllComponents(TabsNavs)).toHaveLength(1)
    expect(w.findAllComponents(TabsItems)).toHaveLength(1)
    expect(w.findAll('[role="tab"]').map((tab) => tab.text())).toEqual(['First', 'Second'])
    expect(w.findAll('[role="tabpanel"]')).toHaveLength(2)
    expect(w.find('[role="tabpanel"]:not([hidden])').text()).toBe('panel-a')
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(w.find('[role="tabpanel"]:not([hidden])').text()).toBe('panel-b')
    w.unmount()
  })

  test('SSR includes selected tab and associated visible panel', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Tabs, null, { default: () => content() }) }))
    expect(html).toContain('role="tablist"')
    expect(html).toContain('aria-selected="true"')
    expect(html).toContain('role="tabpanel"')
    expect(html).toContain('panel-a')
  })
  test('first enabled tab, relationships and one tab stop', () => {
    const w = setup({}, ['a', 'b', 'c'], ['a'])
    expect(selected(w)).toEqual(['b'])
    const tabs = w.findAll('[role="tab"]')
    expect(tabs.map((tab) => tab.attributes('tabindex'))).toEqual(['-1', '0', '-1'])
    expect(w.findAll('[role="tabpanel"]')[1].attributes('id')).toBe(tabs[1].attributes('aria-controls'))
    expect(w.findAll('[role="tabpanel"]')[0].attributes('hidden')).toBeDefined()
    w.unmount()
  })
  test('uncontrolled clicks update once; repeated clicks only notify tab-click', async () => {
    const w = setup()
    await w.findAll('[role="tab"]')[1].trigger('click')
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(selected(w)).toEqual(['b'])
    expect(w.emitted('update:modelValue')).toEqual([['b']])
    expect(w.emitted('change')).toEqual([['b']])
    expect(w.emitted('tab-click')).toHaveLength(2)
    expect(w.emitted('tab-click')[0][1]).toBeInstanceOf(Event)
    w.unmount()
  })
  test('controlled selection waits for owner', async () => {
    const w = setup({ modelValue: 'a' })
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(selected(w)).toEqual(['a'])
    expect(w.emitted('change')).toEqual([['b']])
    await w.setProps({ modelValue: 'b' })
    expect(selected(w)).toEqual(['b'])
    w.unmount()
  })
  test('number and string keys are distinct', async () => {
    const w = setup({ defaultValue: 1 }, [1, '1'])
    const ids = w.findAll('[role="tab"]').map((tab) => tab.attributes('id'))
    expect(ids[0]).not.toBe(ids[1])
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(w.emitted('change')).toEqual([['1']])
    w.unmount()
  })
  test('disabled clicks do nothing', async () => {
    const w = setup({}, ['a', 'b'], ['b'])
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(w.emitted('change')).toBeUndefined()
    expect(w.emitted('tab-click')).toBeUndefined()
    w.unmount()
  })
  test('arrows wrap and skip disabled tabs; Home and End', async () => {
    const w = setup({}, ['a', 'b', 'c'], ['b'])
    const tabs = w.findAll('[role="tab"]')
    await tabs[0].trigger('keydown', { key: 'ArrowRight' })
    expect(selected(w)).toEqual(['c'])
    expect(document.activeElement).toBe(tabs[2].element)
    await tabs[2].trigger('keydown', { key: 'ArrowRight' })
    expect(selected(w)).toEqual(['a'])
    await tabs[0].trigger('keydown', { key: 'End' })
    expect(selected(w)).toEqual(['c'])
    await tabs[2].trigger('keydown', { key: 'Home' })
    expect(selected(w)).toEqual(['a'])
    w.unmount()
  })
  test('manual activation only moves focus until native button activation', async () => {
    const w = setup({ activationMode: 'manual' })
    const tabs = w.findAll('[role="tab"]')
    await tabs[0].trigger('keydown', { key: 'ArrowRight' })
    expect(selected(w)).toEqual(['a'])
    expect(document.activeElement).toBe(tabs[1].element)
    await tabs[1].trigger('click')
    expect(selected(w)).toEqual(['b'])
    w.unmount()
  })
  test('vertical orientation uses up/down; RTL reverses horizontal arrows', async () => {
    const vertical = setup({ orientation: 'vertical' })
    await vertical.find('[role="tab"]').trigger('keydown', { key: 'ArrowDown' })
    expect(selected(vertical)).toEqual(['b'])
    vertical.unmount()
    const rtl = setup({ dir: 'rtl' })
    await rtl.find('[role="tab"]').trigger('keydown', { key: 'ArrowLeft' })
    expect(selected(rtl)).toEqual(['b'])
    rtl.unmount()
  })
  test('hover only activates for mouse and never emits tab-click', async () => {
    const w = setup({ trigger: 'hover' })
    await w.findAll('[role="tab"]')[1].trigger('pointerenter', { pointerType: 'touch' })
    expect(selected(w)).toEqual(['a'])
    await w.findAll('[role="tab"]')[1].trigger('pointerenter', { pointerType: 'mouse' })
    expect(selected(w)).toEqual(['b'])
    expect(w.emitted('tab-click')).toBeUndefined()
    w.unmount()
  })
  test('lazy content persists after visiting', async () => {
    const w = setup({ lazyLoad: true })
    expect(w.findAll('input')).toHaveLength(1)
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(w.findAll('input')).toHaveLength(2)
    w.unmount()
  })
  test('destroyOnHide unmounts inactive content including initially inactive panes', async () => {
    const w = setup({ destroyOnHide: true })
    expect(w.findAll('input')).toHaveLength(1)
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(w.findAll('input')).toHaveLength(1)
    expect(w.find('input').element.value).toBe('panel-b')
    w.unmount()
  })
  test('explicit false child overrides parent lifecycle', () => {
    const w = setup({ lazyLoad: true, destroyOnHide: true }, undefined, undefined, {
      lazyLoad: false,
      destroyOnHide: false,
    })
    expect(w.findAll('input')).toHaveLength(3)
    w.unmount()
  })
  test('hideContent and variants', () => {
    for (const variant of ['line', 'card', 'outline', 'plain', 'capsule', 'enclosed']) {
      const w = setup({ variant, hideContent: true })
      expect(w.classes().some((cls) => cls.endsWith(`--variant-${variant}`))).toBe(true)
      expect(w.findComponent(TabsItems).attributes('hidden')).toBeDefined()
      w.unmount()
    }
  })
  test('delete requests do not select or remove tabs', async () => {
    const w = setup({ editable: true })
    await w.findAll('.mp-tabs__close')[1].trigger('click')
    expect(w.emitted('delete')[0][0]).toBe('b')
    expect(w.emitted('change')).toBeUndefined()
    expect(w.findAll('[role="tab"]')).toHaveLength(3)
    w.unmount()
  })
  test('add and autoSwitch after owner inserts tab', async () => {
    const keys = ref(['a'])
    const w = mount(Tabs, {
      props: { editable: true, showAddButton: true, autoSwitch: true, onAdd: () => keys.value.push('b') },
      slots: { default: () => content(keys.value) },
    })
    await w.find('.mp-tabs__add').trigger('click')
    await nextTick()
    await nextTick()
    expect(selected(w)).toEqual(['b'])
    w.unmount()
  })
  test('reactive reorder and disabled state keep navigation order', async () => {
    const keys = ref(['a', 'b', 'c'])
    const disabled = ref([])
    const w = mount(Tabs, { slots: { default: () => content(keys.value, disabled.value) } })
    keys.value = ['a', 'c', 'b']
    disabled.value = ['c']
    await nextTick()
    await w.find('[role="tab"]').trigger('keydown', { key: 'ArrowRight' })
    expect(selected(w)).toEqual(['b'])
    w.unmount()
  })
  test('swipe skips disabled tabs and ignores vertical gestures', async () => {
    const w = setup({ swipeable: true }, ['a', 'b', 'c'], ['b'])
    const panel = w.findComponent(TabsItems)
    await panel.trigger('touchstart', { touches: [{ clientX: 100, clientY: 10 }] })
    await panel.trigger('touchend', { touches: [], changedTouches: [{ clientX: 20, clientY: 15 }] })
    expect(selected(w)).toEqual(['c'])
    await panel.trigger('touchstart', { touches: [{ clientX: 10, clientY: 10 }] })
    await panel.trigger('touchend', { touches: [], changedTouches: [{ clientX: 70, clientY: 200 }] })
    expect(selected(w)).toEqual(['c'])
    w.unmount()
  })
  test('swipes disabled by default', async () => {
    const w = setup()
    const panel = w.findComponent(TabsItems)
    await panel.trigger('touchstart', { touches: [{ clientX: 100, clientY: 10 }] })
    await panel.trigger('touchend', { touches: [], changedTouches: [{ clientX: 20, clientY: 15 }] })
    expect(w.emitted('change')).toBeUndefined()
    w.unmount()
  })
  test('empty tabs render safely', () => {
    const w = setup({}, [])
    expect(w.findAll('[role="tab"]')).toHaveLength(0)
    w.unmount()
  })
  test('wrapper containers retain selection and list accessibility attributes', () => {
    const w = mount(Tabs, { slots: { default: () => h('section', content()) } })
    expect(selected(w)).toEqual(['a'])
    w.unmount()
  })
  test('nested tabs do not become outer navigation entries', () => {
    const w = mount(Tabs, {
      slots: { default: () => [...content(['outer']), h(Tabs, null, { default: () => content(['inner']) })] },
    })
    expect(w.findAll('[aria-selected="true"]')).toHaveLength(2)
    w.unmount()
  })
  test('uncontrolled removed selection falls back to an enabled tab', async () => {
    const keys = ref(['a', 'b'])
    const w = mount(Tabs, { props: { defaultValue: 'b' }, slots: { default: () => content(keys.value) } })
    keys.value = ['a']
    await nextTick()
    expect(selected(w)).toEqual(['a'])
    expect(w.emitted('change')).toBeUndefined()
    w.unmount()
  })
  test('all disabled tabs have no initial selection', () => {
    const w = setup({}, ['a', 'b'], ['a', 'b'])
    expect(selected(w)).toEqual([])
    expect(w.findAll('[role="tab"]').every((tab) => tab.attributes('tabindex') === '-1')).toBe(true)
    w.unmount()
  })
  test('scrolling is measured by actual overflow and respects position', async () => {
    const w = setup({ scrollPosition: 'center' })
    const list = w.find('[role="tablist"]').element
    Object.defineProperty(list, 'clientWidth', { configurable: true, value: 200 })
    Object.defineProperty(list, 'scrollWidth', { configurable: true, value: 600 })
    list.getBoundingClientRect = () => ({ left: 100, top: 0 })
    w.find('[aria-selected="true"]').element.getBoundingClientRect = () => ({
      left: 500,
      top: 0,
      width: 100,
      height: 36,
    })
    w.findComponent(TabsNavs).vm.resize()
    expect(list.scrollLeft).toBe(350)
    await nextTick()
    expect(w.find('[aria-label="下一组标签"]').exists()).toBe(true)
    await w.setProps({ scrollButtons: false })
    expect(w.find('[aria-label="下一组标签"]').exists()).toBe(false)
    w.unmount()
  })
  test('vertical mouse wheel scrolls horizontal overflow', async () => {
    const w = setup()
    const list = w.find('[role="tablist"]')
    Object.defineProperty(list.element, 'clientWidth', { configurable: true, value: 200 })
    Object.defineProperty(list.element, 'scrollWidth', { configurable: true, value: 600 })
    w.findComponent(TabsNavs).vm.resize()
    await nextTick()
    list.element.scrollLeft = 100
    await list.trigger('wheel', { deltaX: 0, deltaY: 60 })
    expect(list.element.scrollLeft).toBe(160)
    w.unmount()
  })
  test('an overflow tab still activates on a normal mouse click', async () => {
    const w = setup()
    const list = w.find('[role="tablist"]')
    Object.defineProperty(list.element, 'clientWidth', { configurable: true, value: 200 })
    Object.defineProperty(list.element, 'scrollWidth', { configurable: true, value: 600 })
    w.findComponent(TabsNavs).vm.resize()
    await nextTick()
    const tab = w.findAll('[role="tab"]')[1]
    await tab.trigger('click')
    expect(selected(w)).toEqual(['b'])
    w.unmount()
  })
  test('title and icon slots and named tablist are preserved', () => {
    const w = mount(Tabs, {
      slots: {
        default: () =>
          h(
            TabsNavs,
            { 'aria-label': 'Sections' },
            {
              default: () => h(TabNav, { name: 'a', title: 'Prop' }, { title: () => 'Slot', icon: () => 'Icon' }),
              suffix: () => h('span', 'Suffix'),
            },
          ),
      },
    })
    expect(w.find('[role="tablist"]').attributes('aria-label')).toBe('Sections')
    expect(w.find('[role="tab"]').text()).toContain('Slot')
    expect(w.text()).toContain('Icon')
    expect(w.text()).toContain('Suffix')
    expect(w.find('[role="tab"]').attributes('aria-controls')).toBeUndefined()
    w.unmount()
  })
  test('Delete requests removal and moves focus to the adjacent tab', async () => {
    const keys = ref(['a', 'b', 'c'])
    const w = mount(Tabs, {
      attachTo: document.body,
      props: {
        editable: true,
        onDelete: (key) => {
          keys.value = keys.value.filter((item) => item !== key)
        },
      },
      slots: { default: () => content(keys.value) },
    })
    w.find('[role="tab"]').element.focus()
    await w.find('[role="tab"]').trigger('keydown', { key: 'Delete' })
    await nextTick()
    expect(w.emitted('delete')[0][0]).toBe('a')
    expect(document.activeElement).toBe(w.find('[role="tab"]').element)
    expect(w.find('[role="tab"]').text()).toBe('b')
    w.unmount()
  })
  test('customizes each layer reactively without replacing state classes or panel visibility', async () => {
    const w = setup(
      {
        itemClass: ['custom-content', { 'content-extra': true }],
        itemStyle: [{ padding: '0px' }, { color: 'red' }],
        itemWrapperClass: { 'custom-panel': true },
        itemWrapperStyle: { margin: '3px' },
        tabClass: 'custom-tab',
        tabStyle: 'border-radius: 9px',
      },
      ['a', 'b', 'c'],
      ['c'],
    )
    expect(w.findAll('.custom-content')).toHaveLength(3)
    expect(w.find('.custom-content').classes()).toContain('content-extra')
    expect(w.find('.custom-content').element.style.padding).toBe('0px')
    expect(w.find('.custom-content').element.style.color).toBe('red')
    const panels = w.findAll('[role="tabpanel"]')
    expect(panels.every((panel) => panel.classes().includes('custom-panel'))).toBe(true)
    expect(panels[0].element.style.margin).toBe('3px')
    expect(panels[1].attributes('hidden')).toBeDefined()
    expect(w.findAll('.custom-tab')).toHaveLength(3)
    expect(w.find('.custom-tab').element.style.borderRadius).toBe('9px')
    expect(
      w
        .find('.custom-tab')
        .classes()
        .some((name) => name.endsWith('--tab-active')),
    ).toBe(true)
    expect(
      w
        .findAll('.custom-tab')[2]
        .classes()
        .some((name) => name.endsWith('--tab-disabled')),
    ).toBe(true)
    await w.setProps({
      itemClass: 'new-content',
      itemStyle: { padding: '12px' },
      itemWrapperClass: 'new-panel',
      itemWrapperStyle: {},
      tabClass: ['new-tab'],
      tabStyle: {},
    })
    expect(w.find('.custom-content').exists()).toBe(false)
    expect(w.find('.new-content').element.style.padding).toBe('12px')
    expect(w.find('.new-content').element.style.color).toBe('')
    expect(w.find('.custom-panel').exists()).toBe(false)
    expect(w.find('.new-panel').element.style.margin).toBe('')
    expect(w.find('.new-tab').element.style.borderRadius).toBe('')
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(w.findAll('[role="tabpanel"]')[0].attributes('hidden')).toBeDefined()
    expect(selected(w)).toEqual(['b'])
    w.unmount()
  })
})

test('business names select and associate panels independently of Vue keys', async () => {
  const w = mount(Tabs, {
    props: { defaultValue: 'overview' },
    slots: {
      default: () => [
        h(TabsNavs, null, {
          default: () => [
            h(TabNav, { key: 'nav-1', name: 'overview', title: 'Overview' }),
            h(TabNav, { key: 'nav-2', name: 'details', title: 'Details' }),
          ],
        }),
        h(TabsItems, null, {
          default: () => [
            h(TabItem, { key: 'panel-2', name: 'details' }, () => 'Details panel'),
            h(TabItem, { key: 'panel-1', name: 'overview' }, () => 'Overview panel'),
          ],
        }),
      ],
    },
  })
  const tabs = w.findAll('[role="tab"]')
  expect(w.find('[role="tabpanel"]:not([hidden])').text()).toBe('Overview panel')
  expect(tabs[0].attributes('aria-controls')).toBe(w.findAll('[role="tabpanel"]')[1].attributes('id'))
  await tabs[1].trigger('click')
  expect(w.emitted('update:modelValue')).toEqual([['details']])
  expect(w.find('[role="tabpanel"]:not([hidden])').text()).toBe('Details panel')
  w.unmount()
})

test('reactive names update without replacing a pane with a stable Vue key', async () => {
  const name = ref('overview')
  const w = mount(Tabs, {
    props: { modelValue: 'overview' },
    slots: {
      default: () => h(TabPane, { key: 'stable-render-key', name: name.value, title: 'Pane' }, () => 'Content'),
    },
  })
  const paneUid = w.findComponent(TabPane).vm.$.uid
  const firstId = w.find('[role="tab"]').attributes('id')
  name.value = 'details'
  await nextTick()
  expect(w.findComponent(TabPane).vm.$.uid).toBe(paneUid)
  expect(w.find('[aria-selected="true"]').exists()).toBe(false)
  await w.setProps({ modelValue: 'details' })
  const tab = w.find('[role="tab"]')
  expect(tab.attributes('aria-selected')).toBe('true')
  expect(tab.attributes('id')).not.toBe(firstId)
  expect(tab.attributes('aria-controls')).toBe(w.find('[role="tabpanel"]').attributes('id'))
  expect(w.emitted('update:modelValue')).toBeUndefined()
  w.unmount()
})
