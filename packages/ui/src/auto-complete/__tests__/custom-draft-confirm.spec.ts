import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import AutoComplete from '../index'

it('lets a typed custom value be confirmed while suggestions still complete immediately', async () => {
  const beforeCommit = vi.fn(() => true)
  const wrapper = mount(AutoComplete, {
    props: { modelValue: 'old', editMode: 'popup', options: ['option'], beforeCommit },
  })
  try {
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = wrapper.getComponent(EditorPanel)
    const confirm = () => panel.findAll('footer button').find((button) => ['确认', '确定'].includes(button.text()))
    expect(confirm()).toBeUndefined()
    await panel.get('input').setValue('custom value')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(confirm()).toBeDefined()
    await panel.get('input').setValue('old')
    await flushPromises()
    expect(confirm()).toBeUndefined()
    await panel.get('input').setValue('custom value')
    await confirm()!.trigger('click')
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:modelValue')).toEqual([['custom value']])
    expect(wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
  } finally {
    wrapper.unmount()
  }
})

it('keeps a rejected custom draft available for retry', async () => {
  const beforeCommit = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true)
  const wrapper = mount(AutoComplete, { props: { modelValue: 'old', editMode: 'popup', options: [], beforeCommit } })
  try {
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = wrapper.getComponent(EditorPanel)
    await panel.get('input').setValue('custom value')
    const confirm = () => panel.findAll('footer button').find((button) => ['确认', '确定'].includes(button.text()))
    expect(confirm()).toBeDefined()
    await confirm()!.trigger('click')
    await flushPromises()
    expect((panel.get('input').element as HTMLInputElement).value).toBe('custom value')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await confirm()!.trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([['custom value']])
  } finally {
    wrapper.unmount()
  }
})
