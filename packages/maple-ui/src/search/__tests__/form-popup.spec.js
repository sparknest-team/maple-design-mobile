import { computed, nextTick } from 'vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { FORM_ITEM_BIND_CONTROL_KEY } from '../../form/item-provide'
import Select from '../../select'
import FieldSelect from '../FieldSelect.vue'
import Search from '../index'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.innerHTML = ''
})
function formContext(onChange) {
  return {
    [FORM_ITEM_BIND_CONTROL_KEY]: {
      disabled: computed(() => false),
      readonly: computed(() => false),
      size: computed(() => undefined),
      error: computed(() => false),
      errorMessage: computed(() => ''),
      hasOuterLabel: computed(() => false),
      validateWithTrigger: () => {},
      eventHandlers: computed(() => ({ onChange })),
    },
  }
}
describe('Search form and popup interaction', () => {
  test('cancel consumes an uncommitted edit without a second blur change', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Search, {
      attachTo: document.body,
      props: { defaultValue: 'before', showAction: true },
      global: { provide: formContext(onChange) },
    })
    const input = wrapper.get('input.mp-input__inner')
    input.element.focus()
    await input.setValue('draft')
    await wrapper.vm.$.setupState.state.handleCancel(new Event('click'))
    expect(wrapper.emitted('change').map((args) => args[0])).toEqual([''])
    expect(onChange).toHaveBeenCalledTimes(1)
  })
  test('native inputAttrs and error reach outer and popup inputs', async () => {
    const wrapper = mount(Search, {
      attachTo: document.body,
      props: {
        editMode: 'popup',
        recentSearches: ['x'],
        error: true,
        inputAttrs: { name: 'query', autocomplete: 'off', 'aria-describedby': 'query-help' },
      },
    })
    const outer = wrapper.get('input.mp-input__inner')
    expect(outer.attributes('name')).toBe('query')
    expect(outer.attributes('aria-invalid')).toBe('true')
    await outer.trigger('focus')
    await nextTick()
    const inner = document.body.querySelector('.mp-search__popup-content input')
    expect(inner.hasAttribute('name')).toBe(false)
    expect(outer.attributes('name')).toBe('query')
    expect(inner.getAttribute('autocomplete')).toBe('off')
    expect(inner.getAttribute('aria-describedby')).toBe('query-help')
    expect(inner.getAttribute('aria-invalid')).toBe('true')
  })

  test('typing, cancel, fields and history notify the Form once per committed action', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Search, {
      props: {
        defaultValue: 'before',
        showAction: true,
        fields: [
          { value: 'name', label: 'Name' },
          { value: 'id', label: 'ID' },
        ],
        editMode: 'direct',
      },
      global: { provide: formContext(onChange) },
    })
    const state = wrapper.vm.$.setupState.state
    const input = wrapper.get('input.mp-input__inner')
    await input.trigger('focus')
    await input.setValue('typed')
    await input.trigger('blur')
    expect(onChange).toHaveBeenCalledTimes(1)
    state.handleCancel(new Event('click'))
    expect(onChange).toHaveBeenCalledTimes(2)
    state.handleFieldChange('id', new Event('change'))
    await nextTick()
    expect(onChange).toHaveBeenCalledTimes(3)
    await state.handleHistorySelect('history', new Event('click'))
    expect(onChange).toHaveBeenCalledTimes(4)
    expect(wrapper.emitted('change').map((args) => args[0])).toEqual(['typed', '', '', 'history'])
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('search')).toHaveLength(1)
    const child = wrapper.findComponent(FieldSelect).findComponent(Select)
    const childContext = child.vm.$.provides[FORM_ITEM_BIND_CONTROL_KEY]
    expect(childContext.eventHandlers.value.onChange).toBeUndefined()
  })
  test('popup Input is addressed by public focus/blur; inner cancel clears once', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Search, {
      attachTo: document.body,
      props: { defaultValue: 'before', editMode: 'popup', recentSearches: ['before'] },
      global: { provide: formContext(onChange) },
    })
    await wrapper.get('input.mp-input__inner').trigger('focus')
    await nextTick()
    const inner = document.body.querySelector('.mp-search__popup-content input')
    expect(inner).toBeTruthy()
    wrapper.vm.focus()
    await nextTick()
    expect(document.activeElement).toBe(inner)
    const before = wrapper.emitted('blur')?.length ?? 0
    wrapper.vm.blur()
    await nextTick()
    expect(document.activeElement).not.toBe(inner)
    expect(wrapper.emitted('blur')).toHaveLength(before + 1)
    expect(wrapper.emitted('focus').some(([event]) => event.target === inner)).toBe(true)
    document.body.querySelector('.mp-search__cancel').click()
    await nextTick()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')).toEqual([['']])
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
