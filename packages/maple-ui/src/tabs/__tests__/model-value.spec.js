import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Tabs, { TabPane } from '..'
import Collapse, { CollapseItem } from '../../collapse'
import Pagination from '../../pagination'
import Steps, { Step } from '../../steps'

const cases = [
  {
    name: 'Tabs',
    initial: 'a',
    next: 'b',
    component: Tabs,
    props: {},
    children: '<TabPane name="a" title="A">A</TabPane><TabPane name="b" title="B">B</TabPane>',
    selector: '[role="tab"]',
    index: 1,
  },
  {
    name: 'Collapse',
    initial: [],
    next: ['a'],
    component: Collapse,
    props: {},
    children: '<CollapseItem name="a" title="A">A</CollapseItem>',
    selector: '[role="button"]',
    index: 0,
  },
  {
    name: 'Pagination',
    initial: 1,
    next: 2,
    component: Pagination,
    props: { total: 50, responsive: false },
    children: '',
    selector: '[class*="pagination__list"] > li:nth-child(3) button',
    index: 0,
  },
  {
    name: 'Steps',
    initial: 1,
    next: 2,
    component: Steps,
    props: { changeable: true },
    children: '<Step title="A" /><Step title="B" />',
    selector: '[role="listitem"]',
    index: 1,
  },
]
for (const item of cases) {
  test(`${item.name} supports ordinary v-model and controlled values take precedence`, async () => {
    const wrapper = mount(
      defineComponent({
        components: { Control: item.component, TabPane, CollapseItem, Step },
        setup: () => ({ value: ref(item.initial), settings: ref({ ...item.props }) }),
        template: `<Control v-model="value" v-bind="settings">${item.children}</Control>`,
      }),
    )
    const control = wrapper.findComponent(item.component)
    expect(control.emitted('update:modelValue')).toBeUndefined()
    await wrapper.findAll(item.selector)[item.index].trigger('click')
    expect(wrapper.vm.value).toEqual(item.next)
    expect(control.emitted('update:modelValue')).toEqual([[item.next]])
    // Changing defaultValue must not replace an explicitly controlled value.
    wrapper.vm.settings.defaultValue = item.initial
    await nextTick()
    expect(control.props('modelValue')).toEqual(item.next)
    wrapper.unmount()
  })
}
