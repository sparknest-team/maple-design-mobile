import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Search from '..'
import HistoryContent from '../HistoryContent.vue'

const owners: ReturnType<typeof mount>[] = []
const nodes: HTMLElement[] = []
afterEach(async () => {
  owners.splice(0).forEach((owner) => owner.unmount())
  await flushPromises()
  nodes.splice(0).forEach((node) => node.remove())
})
async function fixture(extra: Record<string, unknown> = {}) {
  const form = document.createElement('form')
  form.id = 'search-native-form'
  document.body.append(form)
  nodes.push(form)
  const owner = mount(Search, {
    attachTo: form,
    props: {
      editMode: 'popup',
      recentSearches: ['candidate'],
      defaultValue: 'initial',
      label: 'Keywords',
      inputAttrs: { id: 'query-control', name: 'q', form: form.id, required: true, 'aria-describedby': 'query-help' },
      ...extra,
    },
  })
  owners.push(owner)
  await flushPromises()
  const reference = owner.get('input#query-control')
  await reference.trigger('focus')
  await flushPromises()
  const history = owner.getComponent(HistoryContent)
  const input = history.get('input#query-control')
  return { owner, form, reference, history, input }
}
test('popup has one public native id, one successful form field and a hidden reference', async () => {
  const { owner, form, reference, input } = await fixture()
  expect(document.querySelectorAll('#query-control')).toHaveLength(1)
  expect(input.attributes('id')).toBe('query-control')
  expect(reference.attributes('id')).not.toBe('query-control')
  expect(reference.attributes('aria-hidden')).toBe('true')
  expect(reference.attributes('tabindex')).toBe('-1')
  expect(new form.ownerDocument.defaultView!.FormData(form).getAll('q')).toEqual(['initial'])
  await input.setValue('accepted')
  expect(new form.ownerDocument.defaultView!.FormData(form).getAll('q')).toEqual(['accepted'])
  expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe('accepted')
})
test('explicit native form validation belongs to the active editor', async () => {
  const { form, input, reference } = await fixture({ defaultValue: '' })
  const invalid: EventTarget[] = []
  expect((input.element as HTMLInputElement).form).toBe(form)
  for (const node of [reference.element, input.element]) {
    node.addEventListener('invalid', (event) => invalid.push(event.target!))
  }
  expect(form.checkValidity()).toBe(false)
  expect(invalid).toEqual([input.element])
})
test('closing a cached editor restores reference identity without duplicate ids or names', async () => {
  const { owner, form, reference } = await fixture()
  const state = (owner.vm as any).$.setupState.state
  state.handlePopupVisibleChange(false)
  state.handleHistoryPopupClosed()
  await flushPromises()
  expect(reference.attributes('id')).toBe('query-control')
  expect(document.querySelectorAll('#query-control')).toHaveLength(1)
  expect(new form.ownerDocument.defaultView!.FormData(form).getAll('q')).toEqual(['initial'])
})
for (const loadingMode of ['default', 'line'] as const) {
  test(`manual ${loadingMode} loading announces busy without locking direct editing`, async () => {
    const owner = mount(Search, {
      props: { loading: true, loadingMode, defaultValue: 'initial', onSearch: () => new Promise(() => {}) },
    })
    owners.push(owner)
    const input = owner.get('input')
    expect(input.attributes('aria-busy')).toBe('true')
    expect(input.element.readOnly).toBe(false)
    expect(input.element.disabled).toBe(false)
    await input.setValue('editable')
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe('editable')
    await owner.setProps({ loading: false })
    await flushPromises()
    expect(input.attributes('aria-busy')).toBeUndefined()
  })
  test(`read presentation includes ${loadingMode} busy feedback`, async () => {
    const owner = mount(Search, { props: { readPretty: true, loading: true, loadingMode, modelValue: 'value' } })
    owners.push(owner)
    expect(owner.find('[aria-busy="true"]').exists()).toBe(true)
    expect(owner.find('input').exists()).toBe(false)
    expect(owner.find('.mp-field-presentation__loading, .mp-loading').exists()).toBe(true)
  })
}
test('the visible direct label is associated with the actual keyword input', () => {
  const owner = mount(Search, { props: { label: 'Keywords' } })
  owners.push(owner)
  const input = owner.get('input').element as HTMLInputElement
  expect(Array.from(input.labels ?? []).some((label) => label.textContent?.includes('Keywords'))).toBe(true)
})
test('popup labels and metadata identify the active keyword input', async () => {
  const { input } = await fixture()
  expect(
    Array.from((input.element as HTMLInputElement).labels ?? []).some((label) =>
      label.textContent?.includes('Keywords'),
    ),
  ).toBe(true)
  expect(input.attributes('aria-describedby')).toBe('query-help')
})
test('explicit keyword aria-label takes priority when a field selector is shown', async () => {
  const { input } = await fixture({
    label: 'Keywords',
    ariaLabel: 'Product query',
    fields: [{ value: 'name', label: 'Name' }],
  })
  expect(input.attributes('aria-label')).toBe('Product query')
})
test('a replaced native id is reflected in both live and cached ownership', async () => {
  const { owner, reference, input } = await fixture()
  await owner.setProps({ inputAttrs: { id: 'replacement-query', name: 'q', form: 'search-native-form' } })
  await flushPromises()
  expect(document.querySelectorAll('#replacement-query')).toHaveLength(1)
  expect(input.attributes('id')).toBe('replacement-query')
  const state = (owner.vm as any).$.setupState.state
  state.handlePopupVisibleChange(false)
  state.handleHistoryPopupClosed()
  await flushPromises()
  expect(reference.attributes('id')).toBe('replacement-query')
  expect(document.querySelectorAll('#replacement-query')).toHaveLength(1)
})

test('read presentation releases history ownership without reopening a stale editor', async () => {
  const { owner } = await fixture()
  await owner.setProps({ readPretty: true })
  await flushPromises()
  const state = (owner.vm as any).$.setupState.state
  expect(state.historyPopupVisible).toBe(false)
  expect(state.historyPopupClosing).toBe(false)
  await owner.setProps({ readPretty: false })
  await flushPromises()
  expect(state.historyPopupVisible).toBe(false)
})

test('a closing or cached editor cannot retain native constraint validation ownership', async () => {
  const { owner, form, reference, input } = await fixture({ defaultValue: '' })
  const invalid: EventTarget[] = []
  for (const node of [reference.element, input.element]) {
    node.addEventListener('invalid', (event) => invalid.push(event.target!))
  }
  const state = (owner.vm as any).$.setupState.state
  state.handlePopupVisibleChange(false)
  await flushPromises()
  expect((input.element as HTMLInputElement).form).toBe(null)
  expect((reference.element as HTMLInputElement).readOnly).toBe(false)
  expect(form.checkValidity()).toBe(false)
  expect(invalid).toEqual([reference.element])
})

test('named and default Search entries are the same public component', async () => {
  const entry = await import('..')
  expect(entry.Search).toBe(entry.default)
})
