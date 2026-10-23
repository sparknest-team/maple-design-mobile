import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import DatePicker from '../DatePicker.vue'
import DateInput from '../index'

const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
const Content = defineComponent({ template: '<div />' })
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

describe('date editor action ownership', () => {
  it('renders one close and one confirmation in the host; now changes only the draft', async () => {
    const wrapper = mount(DateInput, {
      props: {
        modelValue: '2025-01-15 09:30:00',
        showTime: true,
        datePickerProps: { showNowButton: true },
        presentation: 'popup',
      },
      global: { stubs: { Dialog: Surface, DatePanelContent: Content } },
    })
    wrappers.push(wrapper)
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = wrapper.getComponent(EditorPanel)
    expect(panel.get('[role=heading]').text()).toBe('请选择')
    expect(panel.findAll('button[aria-label="关闭"]')).toHaveLength(1)
    expect(panel.findAll('footer button').map((button) => button.text())).toEqual(['此刻', '确认'])
    expect(panel.find('[class$="__body"]').findAll('button')).toHaveLength(0)
    await panel.findAll('footer button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    const candidate = wrapper.emitted('select')?.[0][0]
    expect(candidate).toBeTruthy()
    await panel.findAll('footer button')[1].trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(candidate)
  })

  it('keeps the independent panel footer and replaces it when an actions slot is supplied', () => {
    const wrapper = mount(DatePicker, {
      props: { defaultValue: '2025-01-15', disableConfirm: false },
      global: { stubs: { DatePanelContent: Content } },
      slots: { actions: '<button>自定义操作</button>' },
    })
    wrappers.push(wrapper)
    expect(wrapper.findAll('button').map((button) => button.text())).toEqual(['自定义操作'])
  })
})
