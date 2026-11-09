import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount as rawMount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Form, { FormItem } from '../../form'
import Search from '../index'

const wrappers = []
const mount = (...args) => {
  const wrapper = rawMount(...args)
  wrappers.push(wrapper)
  return wrapper
}
afterEach(() =>
  wrappers.splice(0).forEach((wrapper) => {
    if (wrapper.exists()) {
      wrapper.unmount()
    }
  }),
)
const fields = [
  { value: 'name', label: 'Name' },
  { value: 'id', label: 'ID', placeholder: 'Device ID' },
]
const input = (wrapper) => wrapper.get('input.mp-input__inner')

describe('Search shared control', () => {
  test('uses inline history by default and switches explicitly to popup', async () => {
    const wrapper = mount(Search, { props: { recentSearches: ['candidate'] } })
    await input(wrapper).trigger('focus')
    expect(wrapper.vm.$.setupState.state.historyMenuVisible).toBe(true)
    expect(wrapper.vm.$.setupState.state.historyPopupVisible).toBe(false)
    await wrapper.setProps({ editMode: 'popup' })
    await input(wrapper).trigger('focus')
    expect(wrapper.vm.$.setupState.state.historyMenuVisible).toBe(false)
    expect(wrapper.vm.$.setupState.state.historyPopupVisible).toBe(true)
  })
  test('never mutates a frozen model, and reads external replacements', async () => {
    const model = Object.freeze({ name: 'initial', untouched: true })
    const wrapper = mount(Search, { props: { model, fields, defaultField: 'name' } })
    expect(input(wrapper).element.value).toBe('initial')
    await input(wrapper).setValue('proposal')
    expect(wrapper.emitted('update:model')[0][0]).toEqual({ name: 'proposal', id: undefined, untouched: true })
    expect(model.name).toBe('initial')
    await input(wrapper).trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('search')[0][0].modelValue).toBe('initial')
    await wrapper.setProps({ model: { name: 'external', id: '42' } })
    expect(input(wrapper).element.value).toBe('external')
    await wrapper.setProps({ modelValue: 'explicit' })
    expect(input(wrapper).element.value).toBe('explicit')
  })
  test('field switch proposes one immutable model and searches accepted field/value', async () => {
    const wrapper = mount(Search, {
      props: {
        model: Object.freeze({ name: 'before', extra: 1 }),
        modelField: 'name',
        fields,
        'onUpdate:model': (model) => wrapper.setProps({ model }),
        'onUpdate:modelField': (modelField) => wrapper.setProps({ modelField }),
      },
    })
    wrapper.vm.$.setupState.state.handleFieldChange('id', new Event('change'))
    await nextTick()
    expect(wrapper.emitted('update:model')).toHaveLength(1)
    expect(wrapper.props('model')).toEqual({ name: undefined, id: '', extra: 1 })
    await input(wrapper).setValue('42')
    await input(wrapper).trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('search')[0][0]).toMatchObject({ modelField: 'id', modelValue: '42', model: { id: '42' } })
  })
  test('rejected field and value proposals do not leak into search result', async () => {
    const wrapper = mount(Search, { props: { model: Object.freeze({ name: 'actual' }), modelField: 'name', fields } })
    wrapper.vm.$.setupState.state.handleFieldChange('id', new Event('change'))
    await nextTick()
    expect(wrapper.emitted('update:model')[0][0]).toEqual({ name: undefined, id: '' })
    await wrapper.vm.$.setupState.state.handleSearch()
    expect(wrapper.emitted('search')[0][0]).toMatchObject({
      modelField: 'name',
      modelValue: 'actual',
      model: { name: 'actual' },
    })
  })
  test.each(['direct', 'popup'])(
    'history selection respects controlled rejection, presentation=%s',
    async (editMode) => {
      const wrapper = mount(Search, { props: { modelValue: 'actual', recentSearches: ['candidate'], editMode } })
      await wrapper.vm.$.setupState.state.handleHistorySelect('candidate', new Event('click'))
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['candidate'])
      expect(wrapper.emitted('search')[0][0]).toMatchObject({
        modelValue: 'actual',
        recentSearches: ['actual', 'candidate'],
      })
      expect(wrapper.vm.$.setupState.state.historyMenuVisible).toBe(false)
      expect(wrapper.vm.$.setupState.state.historyPopupVisible).toBe(false)
    },
  )
  test('normalizes and bounds history without changing the supplied array', async () => {
    const history = Object.freeze([' a ', 'a', '', 'b'])
    const wrapper = mount(Search, { props: { defaultValue: ' a ', recentSearches: history, maxSearchHistoryCount: 2 } })
    await wrapper.vm.$.setupState.state.handleSearch()
    expect(wrapper.emitted('search')[0][0].recentSearches).toEqual(['a', 'b'])
    expect(history).toEqual([' a ', 'a', '', 'b'])
    await wrapper.setProps({ maxSearchHistoryCount: -1 })
    await wrapper.vm.$.setupState.state.handleSearch()
    expect(wrapper.emitted('search')[1][0].recentSearches).toEqual([])
  })
  test('cancel emits once, does not search, and cannot change a refused value', async () => {
    const wrapper = mount(Search, { props: { modelValue: 'actual', showAction: true } })
    wrapper.vm.$.setupState.state.handleAction(new Event('click'))
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')).toEqual([['']])
    expect(wrapper.emitted('search')).toBeUndefined()
    expect(input(wrapper).element.value).toBe('actual')
  })
  test.each(['disabled', 'readonly'])('inherits FormItem %s for all controls', async (flag) => {
    const wrapper = mount({
      render: () =>
        h(Form, { editMode: 'direct', model: {} }, () =>
          h(FormItem, { editMode: 'direct', [flag]: true }, () =>
            h(Search, { defaultValue: 'x', showAction: true, recentSearches: ['x'] }),
          ),
        ),
    })
    const search = wrapper.findComponent(Search)
    search.vm.$.setupState.state.openHistory()
    search.vm.$.setupState.state.handleAction(new Event('click'))
    await search.vm.$.setupState.state.handleSearch()
    expect(search.emitted('search')).toBeUndefined()
    expect(search.emitted('cancel')).toBeUndefined()
    expect(search.vm.$.setupState.state.historyMenuVisible).toBe(false)
    expect(search.vm.$.setupState.state.historyPopupVisible).toBe(false)
  })
  test('switching history presentation resets the closing guard', async () => {
    const wrapper = mount(Search, { props: { editMode: 'popup', recentSearches: ['x'] } })
    wrapper.vm.$.setupState.state.openHistory()
    expect(wrapper.vm.$.setupState.state.historyPopupVisible).toBe(true)
    await wrapper.setProps({ editMode: 'direct' })
    await wrapper.setProps({ editMode: 'popup' })
    wrapper.vm.$.setupState.state.openHistory()
    expect(wrapper.vm.$.setupState.state.historyPopupVisible).toBe(true)
  })
  test('KeepAlive deactivation cancels pending search and can reactivate', async () => {
    const shown = ref(true)
    const wrapper = mount({
      render: () => h(KeepAlive, null, () => (shown.value ? h(Search, { recentSearches: ['x'] }) : null)),
    })
    const search = wrapper.findComponent(Search)
    shown.value = false
    search.vm.$.setupState.state.handleSearch()
    await nextTick()
    expect(search.emitted('search')).toBeUndefined()
    shown.value = true
    await nextTick()
    search.vm.$.setupState.state.openHistory()
    expect(search.vm.$.setupState.state.historyMenuVisible || search.vm.$.setupState.state.historyPopupVisible).toBe(
      true,
    )
  })
  test('does not submit after unmount during pending nextTick', async () => {
    const wrapper = mount(Search)
    wrapper.vm.$.setupState.state.handleSearch()
    wrapper.unmount()
    await nextTick()
    expect(wrapper.emitted('search')).toBeUndefined()
  })
})

// The field-model path must clear the accepted object as well as the input value.
test('clears the real field-model demo with one immutable proposal', async () => {
  const model = ref({ name: '设备 A', tenant: 'demo' })
  const wrapper = mount({
    setup: () => () =>
      h(Search, {
        model: model.value,
        fields,
        modelField: 'name',
        clearable: true,
        'onUpdate:model': (proposal) => {
          model.value = proposal
        },
      }),
  })
  await input(wrapper).trigger('focus')
  await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
  await nextTick()
  expect(model.value).toEqual({ name: '', id: undefined, tenant: 'demo' })
  expect(input(wrapper).element.value).toBe('')
})
