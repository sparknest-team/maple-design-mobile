import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import DateInput from '../Date.vue'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
function setup(props: Record<string, unknown> = {}) {
  const wrapper = mount(DateInput, { props: { modelValue: '2025-01-15', ...props } })
  wrappers.push(wrapper)
  return wrapper
}
describe('mobile date input and popup trigger', () => {
  it('keeps input click/Enter/Space in text mode and exposes an accessible calendar button', async () => {
    const wrapper = setup()
    const input = wrapper.get('input')
    await input.trigger('click')
    await input.trigger('keydown', { key: ' ' })
    await input.trigger('keyup', { key: ' ' })
    await input.setValue('2025-01-18')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:open')).toBeUndefined()
    const button = wrapper.get('.mp-date__input-trigger')
    expect(button.attributes('aria-haspopup')).toBe('dialog')
    expect(button.attributes('aria-label')).toBeTruthy()
    expect(button.attributes('aria-expanded')).toBe('false')
    await button.trigger('click')
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
  })
  it('commits an ArrowDown draft before opening and Escape only closes', async () => {
    const wrapper = setup()
    const input = wrapper.get('input')
    await input.setValue('2025-01-18')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2025-01-18'])
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:open')?.[1]).toEqual([false])
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
  })
  it('retains field-click opening when inputEditable is false', async () => {
    const wrapper = setup({ inputEditable: false })
    expect(wrapper.get('input').element.readOnly).toBe(true)
    expect(wrapper.find('.mp-date__input-trigger').exists()).toBe(false)
    await wrapper.get('input').trigger('click')
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
  })
  it('blocks panel triggers in disabled and readonly states', async () => {
    for (const props of [{ disabled: true }, { readonly: true }]) {
      const wrapper = setup(props)
      expect(wrapper.get('.mp-date__input-trigger').element.hasAttribute('disabled')).toBe(true)
      await wrapper.get('input').trigger('keydown', { key: 'ArrowDown' })
      await wrapper.get('.mp-field-decorator').trigger('click')
      expect(wrapper.emitted('update:open')).toBeUndefined()
    }
  })
  it('keeps multiple joined display text readonly and uses the panel', async () => {
    const wrapper = setup({ multiple: true, modelValue: ['2025-01-15', '2025-01-18'] })
    expect(wrapper.get('input').element.readOnly).toBe(true)
    expect(wrapper.get('input').element.value).toBe('2025-01-15, 2025-01-18')
    await wrapper.get('input').trigger('click')
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
