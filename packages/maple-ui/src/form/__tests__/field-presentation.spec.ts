import { h, nextTick, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import Input from '../../input/Input.vue'
import Select from '../../select/select'
import SelectMenu from '../../select/SelectMenu'
import { getKeyFromValue } from '../../select/utils'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const options = [
  { value: 1, label: '设备 A' },
  { value: 2, label: '设备 B' },
]
const overlay = 'popup' as const
function inputForm(
  editMode: string | undefined = overlay,
  fieldPresentation?: string,
  readPretty = false,
  fieldReadPretty?: boolean,
) {
  const model = reactive({ name: '原值' })
  const wrapper = mount(Form, {
    props: { model, editMode: editMode as any, readPretty },
    slots: {
      default: () =>
        h(FormItem, { field: 'name', label: '名称', rules: [(value: unknown) => Boolean(value) || '名称必填'] }, () =>
          h(Input, {
            modelValue: model.name,
            editMode: fieldPresentation as any,
            readPretty: fieldReadPretty,
            'onUpdate:modelValue': (value) => {
              model.name = value ?? ''
            },
          }),
        ),
    },
  })
  return { wrapper, model }
}
describe('field presentation', () => {
  test.each([Select])('standalone $name defaults to popup', async (Field) => {
    const wrapper = mount(Field, { props: { modelValue: '原值', options: ['原值', '新值'] } })
    expect(wrapper.find('input').exists()).toBe(false)
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    expect(wrapper.findComponent(EditorPanel).exists()).toBe(true)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
  test('standalone Input defaults to inline', () => {
    const wrapper = mount(Input, { props: { modelValue: '原值' } })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('[aria-haspopup=dialog]').exists()).toBe(false)
    wrapper.unmount()
  })
  test('explicit inline Input stays directly editable with the original v-model', async () => {
    const { wrapper, model } = inputForm(undefined, 'direct')
    await wrapper.get('input').setValue('直接修改')
    expect(model.name).toBe('直接修改')
    expect(wrapper.find('[aria-haspopup=dialog]').exists()).toBe(false)
    wrapper.unmount()
  })
  test('read inherits, formats and mounts no editable input', async () => {
    const { wrapper, model } = inputForm(undefined, undefined, true)
    expect(wrapper.text()).toContain('原值')
    expect(wrapper.find('input').exists()).toBe(false)
    model.name = '外部更新'
    await nextTick()
    expect(wrapper.text()).toContain('外部更新')
    wrapper.unmount()
  })
  test('explicit field overrides inherited read', () => {
    const { wrapper } = inputForm(undefined, 'direct', true, false)
    expect(wrapper.find('input').exists()).toBe(true)
    wrapper.unmount()
  })
  test.each([undefined, overlay] as const)('%s Input uses draft, cancellation and one commit', async (editMode) => {
    const { wrapper, model } = inputForm(editMode)
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    await wrapper.getComponent(EditorPanel).get('input').setValue('草稿')
    expect(model.name).toBe('原值')
    const cancel = wrapper
      .getComponent(EditorPanel)
      .findAll('button')
      .find((button) => button.text() === '×')!
    await cancel.trigger('click')
    await flushPromises()
    expect(model.name).toBe('原值')
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    await wrapper.getComponent(EditorPanel).get('input').setValue('保存值')
    await wrapper
      .getComponent(EditorPanel)
      .findAll('button')
      .find((button) => ['确定', '确认'].includes(button.text()))!
      .trigger('click')
    await flushPromises()
    expect(model.name).toBe('保存值')
    wrapper.unmount()
  })
  test('candidate validation does not first write the real model', async () => {
    const { wrapper, model } = inputForm('popup')
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    await wrapper.getComponent(EditorPanel).get('input').setValue('')
    await wrapper
      .getComponent(EditorPanel)
      .findAll('button')
      .find((button) => ['确定', '确认'].includes(button.text()))!
      .trigger('click')
    await flushPromises()
    expect(model.name).toBe('原值')
    expect(wrapper.text()).toContain('名称必填')
    expect(wrapper.getComponent(EditorPanel).get('[role=alert]').text()).toContain('名称必填')
    wrapper.unmount()
  })
  test('switch to read invalidates an in-flight save', async () => {
    let finish!: () => void
    const save = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve
        }),
    )
    const wrapper = mount(Input, { props: { editMode: 'popup', modelValue: '原值', beforeCommit: save } })
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    await wrapper.getComponent(EditorPanel).get('input').setValue('草稿')
    await wrapper
      .getComponent(EditorPanel)
      .findAll('button')
      .find((button) => ['确定', '确认'].includes(button.text()))!
      .trigger('click')
    await flushPromises()
    await wrapper.setProps({ readPretty: true })
    finish()
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.find('input').exists()).toBe(false)
    wrapper.unmount()
  })
  test('Select read uses labels and read overrides controlled open/search', () => {
    const search = vi.fn()
    const wrapper = mount(Select, {
      props: {
        readPretty: true,
        open: true,
        modelValue: [1, 2],
        multiple: true,
        filterable: true,
        options,
        onSearch: search,
      },
    })
    expect(wrapper.text()).toContain('设备 A')
    expect(wrapper.text()).toContain('设备 B')
    expect(wrapper.find('input').exists()).toBe(false)
    expect(search).not.toHaveBeenCalled()
    wrapper.unmount()
  })
  test.each(['popup'] as const)('Select %s confirmation buffers values and keeps search local', async (editMode) => {
    const wrapper = mount(Select, {
      props: {
        editMode,
        defaultOpen: false,
        modelValue: [1],
        multiple: true,
        options,
      },
    })
    if (editMode === 'popup') {
      await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    }

    await flushPromises()
    const controller = wrapper.findComponent(SelectMenu).props('controller')
    controller.handleOpenChange(true)
    await flushPromises()
    controller.handleSelect(getKeyFromValue(2), new Event('click'))
    expect(wrapper.emitted('change')).toBeUndefined()
    await controller.session.commit()
    await flushPromises()
    expect(wrapper.emitted('change')).toEqual([[[1, 2]]])
    wrapper.unmount()
  })
  test('Select panel search filters while remote mode retains server candidates', async () => {
    const wrapper = mount(Select, { props: { editMode: 'popup', options, filterable: true } })
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    await wrapper.getComponent(EditorPanel).get('input').setValue('设备 B')
    await flushPromises()
    expect(
      wrapper
        .getComponent(EditorPanel)
        .findAll('[role=option]')
        .map((option) => option.text()),
    ).toEqual(['设备 B'])
    await wrapper.setProps({ filterOption: false })
    await flushPromises()
    expect(wrapper.getComponent(EditorPanel).findAll('[role=option]')).toHaveLength(2)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
  test('scoped reset only cancels the matching field editor', async () => {
    const { wrapper, model } = inputForm('popup')
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    await wrapper.getComponent(EditorPanel).get('input').setValue('未保存')
    wrapper.vm.resetFields('other')
    await flushPromises()
    expect(wrapper.getComponent(EditorPanel).get('input').element.value).toBe('未保存')
    expect(model.name).toBe('原值')
    wrapper.vm.resetFields('name')
    await flushPromises()
    expect(wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
    expect(model.name).toBe('原值')
    wrapper.unmount()
  })
  test('read cancels a queued remote search', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Select, { props: { editMode: 'popup', options, filterable: true, searchDelay: 100 } })
    try {
      await wrapper.get('[aria-haspopup=dialog]').trigger('click')
      await nextTick()
      await wrapper.getComponent(EditorPanel).get('input').setValue('设备 B')
      await wrapper.setProps({ readPretty: true })
      vi.advanceTimersByTime(200)
      expect(wrapper.emitted('search')).toBeUndefined()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
      vi.useRealTimers()
    }
  })

  test('remote loading preserves the open panel and existing selection draft', async () => {
    const wrapper = mount(Select, { props: { editMode: 'popup', modelValue: [1], multiple: true, options } })
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const controller = wrapper.findComponent(SelectMenu).props('controller')
    controller.handleSelect(getKeyFromValue(2), new Event('click'))
    await wrapper.setProps({ loading: true })
    expect(controller.computedOpen).toBe(true)
    expect(wrapper.emitted('change')).toBeUndefined()
    await wrapper.setProps({ loading: false })
    await controller.session.commit()
    await flushPromises()
    expect(wrapper.emitted('change')).toEqual([[[1, 2]]])
    wrapper.unmount()
  })
})
