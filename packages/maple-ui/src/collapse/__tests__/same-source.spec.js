import { createSSRApp, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Collapse, { CollapseItem, collapseProps } from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('collapse')
const item = createNamespace('collapse-item')

function mountCollapse(props = {}, panels = [{ name: '1', title: 'One', content: 'A' }]) {
  return mount(Collapse, {
    props,
    slots: {
      default: () =>
        panels.map((panel) =>
          h(
            CollapseItem,
            {
              name: panel.name,
              title: panel.title,
              disabled: panel.disabled,
              showExpandIcon: panel.showExpandIcon,
              destroyOnHide: panel.destroyOnHide,
            },
            {
              default: () => panel.content,
              extra: panel.extra,
              title: panel.titleSlot,
              'expand-icon': panel.expandIcon,
            },
          ),
        ),
    },
  })
}

describe('Collapse same source', () => {
  test('renders on the server without starting browser work', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(Collapse, { defaultValue: ['1'] }, () => [
            h(CollapseItem, { name: '1', title: 'One' }, () => 'A'),
            h(CollapseItem, { name: '2', title: 'Two' }, () => 'B'),
          ]),
      }),
    )
    expect(html).toContain(n())
    expect(html).toContain(item.n())
    expect(html).toContain(item.n('--active'))
    expect(html).toContain('One')
    expect(html).toContain('A')
  })

  test('registers the item component and default icon position', () => {
    expect(Collapse.Item).toBe(CollapseItem)
    expect(collapseProps.expandIconPosition.default).toBe('left')
    expect(collapseProps.elevation).toBeUndefined()
  })

  test('supports keyboard expansion with linked aria regions', async () => {
    const wrapper = mountCollapse()
    const header = wrapper.get('[role="button"]')
    const panel = wrapper.get('[role="region"]')
    expect(header.attributes('aria-controls')).toBe(panel.attributes('id'))
    expect(panel.attributes('aria-labelledby')).toBe(header.attributes('id'))
    await header.trigger('keydown', { key: 'Enter' })
    expect(header.attributes('aria-expanded')).toBe('true')
    wrapper.unmount()
  })

  test('extra click does not toggle the panel', async () => {
    const wrapper = mountCollapse({}, [
      {
        name: '1',
        title: 'One',
        content: 'A',
        extra: () => h('button', { class: 'extra-btn' }, 'extra'),
      },
    ])
    await wrapper.get('.extra-btn').trigger('click')
    expect(wrapper.get('[role="button"]').attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  test('accordion keeps a single panel and emits change', async () => {
    const activeNames = ref(['2'])
    const onChange = vi.fn()
    const wrapper = mount(() =>
      h(
        Collapse,
        {
          accordion: true,
          modelValue: activeNames.value,
          'onUpdate:modelValue': (value) => {
            activeNames.value = value
          },
          onChange,
        },
        () => [
          h(CollapseItem, { name: '1', title: 'One' }, () => 'A'),
          h(CollapseItem, { name: '2', title: 'Two' }, () => 'B'),
        ],
      ),
    )
    await wrapper.findAll('[role="button"]')[0].trigger('click')
    expect(activeNames.value).toEqual(['1'])
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toEqual(['1'])
    expect(onChange.mock.calls[0][1]).toBeInstanceOf(Event)
    wrapper.unmount()
  })

  test('disabled panels do not toggle', async () => {
    const activeNames = ref(['2'])
    const wrapper = mount(() =>
      h(
        Collapse,
        { modelValue: activeNames.value, 'onUpdate:modelValue': (value) => (activeNames.value = value) },
        () => [
          h(CollapseItem, { name: '1', title: 'One', disabled: true }, () => 'A'),
          h(CollapseItem, { name: '2', title: 'Two' }, () => 'B'),
        ],
      ),
    )
    expect(wrapper.find('.' + item.n('--disabled')).exists()).toBe(true)
    await wrapper.findAll('[role="button"]')[0].trigger('click')
    expect(activeNames.value).toEqual(['2'])
    wrapper.unmount()
  })

  test('bordered, divider and offset modifiers', async () => {
    const wrapper = mountCollapse()
    expect(wrapper.find('.' + n()).classes()).not.toContain(n('--borderless'))
    expect(wrapper.find('.' + n()).classes()).not.toContain(n('--no-divider'))
    expect(wrapper.find('.' + n()).classes()).not.toContain(n('--offset'))
    await wrapper.setProps({ bordered: false, divider: false, offset: true })
    expect(wrapper.find('.' + n()).classes()).toContain(n('--borderless'))
    expect(wrapper.find('.' + n()).classes()).toContain(n('--no-divider'))
    expect(wrapper.find('.' + n()).classes()).toContain(n('--offset'))
    wrapper.unmount()
  })

  test('destroyOnHide removes content after collapse', async () => {
    const wrapper = mountCollapse({ defaultValue: ['1'], destroyOnHide: true }, [
      { name: '1', title: 'One', content: 'Secret' },
    ])
    expect(wrapper.text()).toContain('Secret')
    await wrapper.get('[role="button"]').trigger('click')
    await nextTick()
    expect(wrapper.text()).not.toContain('Secret')
    wrapper.unmount()
  })

  test('toggleAll expands, collapses and skips disabled items', async () => {
    const activeNames = ref(['1', '3'])
    const wrapper = mount({
      setup() {
        const collapseRef = ref()
        return () =>
          h(
            Collapse,
            {
              ref: collapseRef,
              modelValue: activeNames.value,
              'onUpdate:modelValue': (value) => {
                activeNames.value = value
              },
            },
            {
              default: () => [
                h(CollapseItem, { name: '1', title: 'One' }, () => 'A'),
                h(CollapseItem, { name: '2', title: 'Two' }, () => 'B'),
                h(CollapseItem, { name: '3', title: 'Three', disabled: true }, () => 'C'),
                h(CollapseItem, { name: '4', title: 'Four', disabled: true }, () => 'D'),
              ],
            },
          )
      },
    })
    await nextTick()
    const collapse = wrapper.findComponent(Collapse)
    collapse.vm.toggleAll({ expand: 'inverse' })
    expect(activeNames.value).toEqual(['2', '4'])
    activeNames.value = ['1', '3']
    await nextTick()
    collapse.vm.toggleAll({ expand: 'inverse', skipDisabled: true })
    expect(activeNames.value).toEqual(['2', '3'])
    activeNames.value = ['1', '3']
    await nextTick()
    collapse.vm.toggleAll({ expand: true, skipDisabled: true })
    expect(activeNames.value).toEqual(['1', '2', '3'])
    activeNames.value = ['1', '3']
    await nextTick()
    collapse.vm.toggleAll({ expand: false, skipDisabled: true })
    expect(activeNames.value).toEqual(['3'])
    wrapper.unmount()
  })

  test('parent expand-icon slot reaches items', () => {
    const wrapper = mount(Collapse, {
      slots: {
        'expand-icon': ({ expanded }) => (expanded ? 'open' : 'closed'),
        default: () => h(CollapseItem, { name: '1', title: 'One' }, () => 'A'),
      },
    })
    expect(wrapper.get('[role="button"]').text()).toContain('closed')
    wrapper.unmount()
  })
})

test('normalizes expanded panels immediately when accordion changes', async () => {
  const wrapper = mountCollapse({ defaultValue: ['1', 2] }, [
    { name: '1', title: 'One', content: 'A' },
    { name: 2, title: 'Two', content: 'B' },
  ])
  const expanded = () => wrapper.findAll('[aria-expanded="true"]')
  expect(expanded()).toHaveLength(2)
  await wrapper.setProps({ accordion: true })
  expect(expanded()).toHaveLength(1)
  expect(expanded()[0].text()).toBe('One')
  await wrapper.findAll('[role="button"]')[1].trigger('click')
  expect(expanded()).toHaveLength(1)
  expect(expanded()[0].text()).toBe('Two')
  expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual([2])
  wrapper.unmount()
})

test('limits controlled initial active names in accordion mode without rewriting the input', () => {
  const activeNames = ['1', 2]
  const wrapper = mountCollapse({ modelValue: activeNames, accordion: true }, [
    { name: '1', title: 'One', content: 'A' },
    { name: 2, title: 'Two', content: 'B' },
  ])
  expect(wrapper.findAll('[aria-expanded="true"]')).toHaveLength(1)
  expect(activeNames).toEqual(['1', 2])
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  wrapper.unmount()
})

test('updates hidden content immediately when destroyOnHide changes', async () => {
  const wrapper = mountCollapse({ defaultValue: ['1'] }, [
    { name: '1', title: 'One', content: 'Visible' },
    { name: 2, title: 'Two', content: 'Hidden' },
  ])
  const content = () => wrapper.findAll(`.${item.n('content-box')}`)
  expect(content()).toHaveLength(2)
  await wrapper.setProps({ destroyOnHide: true })
  expect(content()).toHaveLength(1)
  expect(content()[0].text()).toBe('Visible')
  await wrapper.setProps({ destroyOnHide: false })
  expect(content()).toHaveLength(2)
  wrapper.unmount()
})

test('keeps keyboard activation inside extra controls from toggling the header', async () => {
  const action = vi.fn()
  const wrapper = mountCollapse({}, [
    { name: '1', title: 'One', content: 'A', extra: () => h('button', { onClick: action }, 'Action') },
  ])
  const button = wrapper.get('button')
  await button.trigger('keydown', { key: 'Enter' })
  await button.trigger('keydown', { key: ' ' })
  await button.trigger('click')
  expect(action).toHaveBeenCalledTimes(1)
  expect(wrapper.get('[aria-expanded]').attributes('aria-expanded')).toBe('false')
  expect(wrapper.emitted('change')).toBeUndefined()
  wrapper.unmount()
})

test('gives repeated names in separate collapse instances unique linked regions', () => {
  const wrapper = mount({
    render: () =>
      h('div', [
        h(Collapse, {}, () => h(CollapseItem, { name: '1', title: 'First' }, () => 'A')),
        h(Collapse, {}, () => h(CollapseItem, { name: '1', title: 'Second' }, () => 'B')),
      ]),
  })
  const headers = wrapper.findAll('[aria-controls]')
  expect(headers[0].attributes('id')).not.toBe(headers[1].attributes('id'))
  for (const header of headers) {
    const region = wrapper.get(`[id="${header.attributes('aria-controls')}"]`)
    expect(region.attributes('aria-labelledby')).toBe(header.attributes('id'))
  }
  wrapper.unmount()
})
