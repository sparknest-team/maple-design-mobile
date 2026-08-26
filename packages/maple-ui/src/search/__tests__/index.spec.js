import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Search from '..'
import VarSearch from '../Search'

function timeout() {
  return new Promise((resolve) => setTimeout(resolve))
}

afterEach(() => {
  document.body.innerHTML = ''
})

test('search plugin', () => {
  const app = createApp({}).use(Search)
  expect(app.component(Search.name)).toBeTruthy()
})

test('search render', () => {
  const wrapper = mount(VarSearch, {
    props: {
      modelValue: 'keyword',
      placeholder: 'Search',
      label: '地址',
      showAction: true,
      actionType: 'search',
      actionText: '搜索',
    },
  })

  expect(wrapper.find('.mp-search').exists()).toBeTruthy()
  expect(wrapper.find('.mp-search__field').exists()).toBeTruthy()
  expect(wrapper.find('.mp-search__label').text()).toBe('地址')
  expect(wrapper.find('.mp-search__search-icon').exists()).toBeTruthy()
  expect(wrapper.find('.mp-search__action').text()).toBe('搜索')
  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('search events', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onInput = vi.fn()
  const onSearch = vi.fn()
  const onCancel = vi.fn()
  const onClear = vi.fn()

  const wrapper = mount(VarSearch, {
    props: {
      modelValue: '',
      showAction: true,
      onInput,
      onSearch,
      onCancel,
      onClear,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-input__input').setValue('keyword')
  expect(onUpdateModelValue).lastCalledWith('keyword')
  expect(onInput).toHaveBeenCalledTimes(1)

  await wrapper.find('.mp-search__search-icon').trigger('click')
  expect(onSearch).lastCalledWith(
    {
      modelField: undefined,
      modelValue: 'keyword',
      searchField: undefined,
      searchText: 'keyword',
      model: undefined,
      recentSearches: ['keyword'],
    },
    expect.anything(),
  )

  await wrapper.find('.mp-field-decorator__clear-icon').trigger('click')
  expect(onClear).lastCalledWith('')

  await wrapper.find('.mp-search__action').trigger('click')
  expect(onCancel).toHaveBeenCalledTimes(1)
  expect(onUpdateModelValue).lastCalledWith('')

  await wrapper.setProps({ modelValue: 'keyword', actionType: 'search', actionText: '搜索' })
  await wrapper.find('.mp-search__action').trigger('click')
  expect(onSearch).lastCalledWith(
    {
      modelField: undefined,
      modelValue: 'keyword',
      searchField: undefined,
      searchText: 'keyword',
      model: undefined,
      recentSearches: ['keyword'],
    },
    expect.anything(),
  )

  wrapper.unmount()
})

test('search fields', async () => {
  const onUpdateSearchText = vi.fn((value) => wrapper.setProps({ searchText: value, modelValue: value }))
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value, searchText: value }))
  const onUpdateSearchField = vi.fn()
  const onUpdateModelField = vi.fn()
  const onUpdateModel = vi.fn()
  const onChange = vi.fn()
  const onSearch = vi.fn()

  const wrapper = mount(VarSearch, {
    props: {
      fields: [
        { label: '地址', value: 'address', placeholder: '请输入地址' },
        { label: '姓名', value: 'name', placeholder: '请输入姓名' },
      ],
      defaultField: 'address',
      searchText: '',
      model: {},
      actionType: 'search',
      showAction: true,
      onChange,
      onSearch,
      'onUpdate:model': onUpdateModel,
      'onUpdate:modelValue': onUpdateModelValue,
      'onUpdate:modelField': onUpdateModelField,
      'onUpdate:searchText': onUpdateSearchText,
      'onUpdate:searchField': onUpdateSearchField,
    },
  })

  expect(wrapper.find('.mp-search__select').exists()).toBeTruthy()
  expect(wrapper.find('.mp-input__input').attributes('placeholder')).toBe('请输入地址')
  const select = wrapper.findComponent({ name: 'MpSelect' })
  expect(select.vm.placement).toBe('bottom-start')

  await wrapper.find('.mp-input__input').setValue('上海')
  expect(onUpdateSearchText).lastCalledWith('上海')
  expect(onUpdateModelValue).lastCalledWith('上海')
  expect(onUpdateModel).lastCalledWith({ address: '上海', name: undefined })
  expect(onChange).lastCalledWith('上海', expect.anything())

  await wrapper.find('.mp-search__action').trigger('click')
  expect(onSearch).lastCalledWith(
    {
      modelField: 'address',
      modelValue: '上海',
      searchField: 'address',
      searchText: '上海',
      model: { address: '上海', name: undefined },
      recentSearches: ['上海'],
    },
    expect.anything(),
  )

  wrapper.vm.handleSelectChange('name')
  expect(onUpdateModelField).lastCalledWith('name')
  expect(onUpdateSearchField).lastCalledWith('name')
  expect(onUpdateSearchText).lastCalledWith('')

  wrapper.unmount()
})

test('search history popup', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onSearch = vi.fn()

  const wrapper = mount(VarSearch, {
    attachTo: document.body,
    props: {
      modelValue: '',
      recentSearches: ['Maple', 'Cedar'],
      onSearch,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-input__input').trigger('focus')
  expect(document.body.querySelector('.mp-search__popup')).toBeTruthy()
  expect(document.body.querySelector('.mp-search__popup').classList.contains('mp-popup__content')).toBe(true)
  expect(document.body.querySelector('.mp-search__popup').style.width).toBe('100vw')
  expect(document.body.querySelector('.mp-search__popup').style.height).toBe('100vh')
  expect(document.body.querySelector('.mp-search__popup .mp-search__action').textContent).toBe('取消')

  document.body.querySelector('.mp-search__history-item').click()
  await wrapper.vm.$nextTick()
  expect(onUpdateModelValue).lastCalledWith('Maple')
  expect(onSearch).lastCalledWith(
    {
      modelField: undefined,
      modelValue: 'Maple',
      searchField: undefined,
      searchText: 'Maple',
      model: undefined,
      recentSearches: ['Maple', 'Cedar'],
    },
    expect.anything(),
  )
  expect(wrapper.vm.historyPopupVisible).toBe(false)

  wrapper.unmount()
})

test('search history menu', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onSearch = vi.fn()

  const wrapper = mount(VarSearch, {
    attachTo: document.body,
    props: {
      modelValue: '',
      recentSearches: ['Maple', 'Cedar'],
      historyPopup: false,
      onSearch,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-input__input').trigger('focus')
  expect(document.body.querySelector('.mp-search__popup')).toBeFalsy()
  expect(wrapper.vm.historyMenuVisible).toBe(true)
  const popover = document.body.querySelector('.mp-trigger__popup')
  expect(popover.getAttribute('data-popper-placement')).toBe('bottom-start')
  expect(popover.classList.contains('mp-search__history-menu')).toBe(true)

  document.body.querySelector('.mp-menu-option').click()
  await wrapper.vm.$nextTick()
  expect(onUpdateModelValue).lastCalledWith('Maple')
  expect(onSearch).lastCalledWith(
    {
      modelField: undefined,
      modelValue: 'Maple',
      searchField: undefined,
      searchText: 'Maple',
      model: undefined,
      recentSearches: ['Maple', 'Cedar'],
    },
    undefined,
  )
  expect(wrapper.vm.historyMenuVisible).toBe(false)

  wrapper.unmount()
})

test('search history menu closes when action is clicked', async () => {
  const wrapper = mount(VarSearch, {
    attachTo: document.body,
    props: {
      modelValue: 'Maple',
      recentSearches: ['Maple', 'Cedar'],
      historyPopup: false,
      showAction: true,
      actionType: 'search',
    },
  })

  await wrapper.find('.mp-input__input').trigger('focus')
  expect(wrapper.vm.historyMenuVisible).toBe(true)

  await wrapper.find('.mp-search__action').trigger('click')
  expect(wrapper.vm.historyMenuVisible).toBe(false)

  wrapper.unmount()
})

test('search history menu closes when clicking outside', async () => {
  const wrapper = mount(VarSearch, {
    attachTo: document.body,
    props: {
      modelValue: 'Maple',
      recentSearches: ['Maple', 'Cedar'],
      historyPopup: false,
    },
  })

  await wrapper.find('.mp-input__input').trigger('focus')
  expect(wrapper.vm.historyMenuVisible).toBe(true)

  document.body.click()
  await wrapper.vm.$nextTick()
  expect(wrapper.vm.historyMenuVisible).toBe(false)

  wrapper.unmount()
})

test('search history menu stays open when clearing', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const wrapper = mount(VarSearch, {
    attachTo: document.body,
    props: {
      modelValue: 'Maple',
      recentSearches: ['Maple', 'Cedar'],
      historyPopup: false,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-input__input').trigger('focus')
  expect(wrapper.vm.historyMenuVisible).toBe(true)

  await wrapper.find('.mp-field-decorator__clear-icon').trigger('click')
  await wrapper.vm.$nextTick()
  await timeout()
  expect(onUpdateModelValue).lastCalledWith('')
  expect(wrapper.vm.historyMenuVisible).toBe(true)

  wrapper.unmount()
})
