import { createApp, nextTick } from 'vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Search from '..'
import MpSearch from '../Search'

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve))
}

afterEach(() => {
  document.body.innerHTML = ''
})
// Vitest runs cleanup hooks in reverse order; unmount before clearing Teleport anchors.
enableAutoUnmount(afterEach)

describe('Search', () => {
  test('installs as a plugin', () => {
    const app = createApp({}).use(Search)
    expect(app.component(Search.name)).toBeTruthy()
  })

  test('renders the shared defaults', () => {
    const wrapper = mount(MpSearch)

    expect(wrapper.find('.mp-search').exists()).toBe(true)
    expect(wrapper.find('.mp-field-decorator--variant-outline').exists()).toBe(true)
    expect(wrapper.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('separates live input from committed change', async () => {
    const order = []
    const wrapper = mount(MpSearch, {
      props: {
        defaultValue: 'draft',
        'onUpdate:modelValue': () => order.push('update'),
        onInput: () => order.push('input'),
        onChange: () => order.push('change'),
      },
    })
    const input = wrapper.get('.mp-input__inner')

    input.element.focus()
    await input.trigger('focus')
    await input.setValue('keyword')
    expect(order).toEqual(['input', 'update'])

    await input.trigger('blur')
    expect(order).toEqual(['input', 'update', 'change'])
    await input.trigger('blur')
    expect(order).toEqual(['input', 'update', 'change'])
  })

  test('clears through one input/change cycle without submitting and keeps history visible', async () => {
    const wrapper = mount(MpSearch, {
      attachTo: document.body,
      props: {
        defaultValue: 'keyword',
        clearable: true,
        editMode: 'direct',
        recentSearches: ['keyword', 'other'],
      },
    })
    const input = wrapper.get('.mp-input__inner')

    input.element.focus()
    await input.trigger('focus')
    await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
    await nextFrame()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('clear')?.[0]?.[0]).toBeInstanceOf(Event)
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('input')[0][0]).toBe('')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('change')[0][0]).toBe('')
    expect(wrapper.emitted('search')).toBeUndefined()
    expect(document.activeElement).toBe(input.element)
    expect(wrapper.vm.$.setupState.state.historyMenuVisible).toBe(true)
  })

  test('submits once on Enter without actively blurring', async () => {
    const wrapper = mount(MpSearch, {
      attachTo: document.body,
      props: {
        defaultValue: ' keyword ',
        recentSearches: ['keyword', 'other'],
        editMode: 'direct',
      },
    })
    const input = wrapper.get('.mp-input__inner')

    input.element.focus()
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('search')).toHaveLength(1)
    expect(wrapper.emitted('search')?.[0]?.[0]).toEqual({
      modelField: undefined,
      modelValue: ' keyword ',
      model: undefined,
      recentSearches: ['keyword', 'other'],
    })
    expect(wrapper.emitted('blur')).toBeUndefined()
    expect(document.activeElement).toBe(input.element)
  })

  test('blocks icon, button, and Enter search while loading or readonly', async () => {
    const wrapper = mount(MpSearch, {
      props: {
        defaultValue: 'keyword',
        searchButton: true,
        buttonText: '搜索',
        loading: true,
      },
    })
    const input = wrapper.get('.mp-input__inner')

    await input.trigger('keydown', { key: 'Enter' })
    await wrapper.get('.mp-search__icon-button').trigger('click')
    await wrapper.get('.mp-search__action').trigger('click')
    expect(wrapper.emitted('search')).toBeUndefined()

    await wrapper.setProps({ loading: false, readonly: true })
    await input.trigger('keydown', { key: 'Enter' })
    await wrapper.get('.mp-search__icon-button').trigger('click')
    expect(wrapper.emitted('search')).toBeUndefined()
  })

  test('updates the field model once per logical edit and field switch', async () => {
    const model = { name: '设备 A' }
    const wrapper = mount(MpSearch, {
      attachTo: document.body,
      props: {
        model,
        defaultValue: '设备 A',
        defaultField: 'name',
        fields: [
          { value: 'id', label: '设备 ID', placeholder: '输入 ID' },
          { value: 'name', label: '设备名称' },
        ],
      },
    })

    await wrapper.get('.mp-input__inner').setValue('设备 B')
    expect(model).toEqual({ name: '设备 A' })
    expect(wrapper.emitted('update:model')[0][0]).toEqual({ id: undefined, name: '设备 B' })
    expect(wrapper.emitted('update:model')).toHaveLength(1)

    const event = new Event('change')
    wrapper.vm.$.setupState.state.handleFieldChange('id', event)
    await nextTick()

    expect(wrapper.emitted('update:modelField')?.[0]).toEqual(['id'])
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('update:model')).toHaveLength(2)
    expect(wrapper.emitted('change')?.[0]).toEqual(['', event])
    expect(document.activeElement).toBe(wrapper.get('.mp-input__inner').element)
  })

  test('emits the canonical result and bounded trimmed history', async () => {
    const wrapper = mount(MpSearch, {
      props: {
        defaultValue: ' Maple ',
        defaultField: 'name',
        fields: [{ value: 'name', label: '名称' }],
        model: { name: ' Maple ' },
        recentSearches: ['Maple', 'Cedar', 'Arco'],
        maxSearchHistoryCount: 2,
        searchButton: true,
        buttonText: '搜索',
      },
    })

    await wrapper.get('.mp-search__action').trigger('click')

    const result = wrapper.emitted('search')?.[0]?.[0]
    expect(result).toEqual({
      modelField: 'name',
      modelValue: ' Maple ',
      model: { name: ' Maple ' },
      recentSearches: ['Maple', 'Cedar'],
    })
    expect(result).not.toHaveProperty('searchField')
    expect(result).not.toHaveProperty('searchText')
  })

  test('selects popup history and searches immediately', async () => {
    const wrapper = mount(MpSearch, {
      attachTo: document.body,
      props: { editMode: 'popup', recentSearches: ['Maple', 'Cedar'] },
    })

    await wrapper.get('.mp-input__inner').trigger('focus')
    expect(document.body.querySelector('.mp-search__popup')).toBeTruthy()
    document.body.querySelector('.mp-search__history-item').click()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Maple'])
    expect(wrapper.emitted('search')?.[0]?.[0]).toMatchObject({ modelValue: 'Maple' })
    expect(wrapper.emitted('search')?.[0]?.[1]).toBeInstanceOf(Event)
    expect(wrapper.vm.$.setupState.state.historyPopupVisible).toBe(false)
  })

  test('selects menu history and searches immediately', async () => {
    const wrapper = mount(MpSearch, {
      attachTo: document.body,
      props: {
        recentSearches: ['Maple', 'Cedar'],
        editMode: 'direct',
      },
    })

    await wrapper.get('.mp-input__inner').trigger('focus')
    expect(wrapper.vm.$.setupState.state.historyMenuVisible).toBe(true)
    document.body.querySelector('.mp-menu-option').click()
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Maple'])
    expect(wrapper.emitted('search')?.[0]?.[0]).toMatchObject({ modelValue: 'Maple' })
    expect(wrapper.emitted('search')?.[0]?.[1]).toBeInstanceOf(Event)
    expect(wrapper.vm.$.setupState.state.historyMenuVisible).toBe(false)
  })

  test('exposes focus and blur methods', async () => {
    const wrapper = mount(MpSearch, { attachTo: document.body })
    const input = wrapper.get('.mp-input__inner')

    wrapper.vm.focus()
    await nextTick()
    expect(document.activeElement).toBe(input.element)

    wrapper.vm.blur()
    await nextTick()
    expect(document.activeElement).not.toBe(input.element)
  })
})
