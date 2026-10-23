import { h, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import AutoComplete from '../../auto-complete'
import Cascader from '../../cascader'
import Select from '../../select'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
})
const choices = [
  { value: 'old', label: 'Old' },
  { value: 'new', label: 'New' },
  { value: 'fixed', label: 'Fixed' },
]
function deferred() {
  let resolve!: (value?: any) => void
  const promise = new Promise<any>((done) => {
    resolve = done
  })
  return { promise, resolve }
}
for (const [name, Field] of [
  ['AutoComplete', AutoComplete],
  ['Select', Select],
  ['Cascader', Cascader],
] as const) {
  function fixture(extra = {}, rules?: any) {
    const model = reactive({ value: 'old' })
    const state = reactive({ options: choices, loading: false })
    const owner = mount(Form, {
      attachTo: document.body,
      props: { model, presentation: 'popup' },
      slots: {
        default: () =>
          h(FormItem, { field: 'value', label: name, rules }, () =>
            h(Field as any, {
              ...state,
              ...extra,
              filterable: true,
              showExtraOptions: false,
              filterOption: () => true,
              shouldOpen: () => true,
              modelValue: model.value,
              'onUpdate:modelValue': (value: string) => {
                model.value = value
              },
            }),
          ),
      },
    })
    owners.push(owner)
    const panel = () => owner.getComponent(EditorPanel)
    const open = async () => {
      await owner.get('[aria-haspopup=dialog]').trigger('click')
      await flushPromises()
    }
    return { model, state, owner, panel, open }
  }
  test(`${name} popup Enter follows asynchronously replaced candidates and retains rejected drafts`, async () => {
    const f = fixture({}, [(value: string) => (value === 'new' ? 'Rejected draft' : true)])
    await f.open()
    const input = f.panel().get('input')
    await input.setValue('query')
    f.state.options = []
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    expect(f.model.value).toBe('old')
    f.state.options = [choices[1]]
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(f.model.value).toBe('old')
    await f.panel().get('footer button').trigger('click')
    await flushPromises()
    expect(f.panel().get('[role=alert]').text()).toBe('Rejected draft')
    f.state.options = [choices[2]]
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    await f.panel().get('footer button').trigger('click')
    await flushPromises()
    expect(f.model.value).toBe('fixed')
  })
  test(`${name} popup forwards input search, ignores pending candidates and closes during a request`, async () => {
    const request = deferred()
    const lateRequest = deferred()
    let requestCount = 0
    const search = vi.fn((query: string) => {
      if (query !== 'query') {
        return
      }
      f.state.options = []
      f.state.loading = true
      const current = requestCount++ === 0 ? request : lateRequest
      void current.promise.then(() => {
        f.state.options = [choices[1]]
        f.state.loading = false
      })
    })
    const f = fixture(name === 'AutoComplete' ? { onSearch: search } : { 'onUpdate:inputValue': search })
    await f.open()
    const input = f.panel().get('input')
    await input.setValue('query')
    await flushPromises()
    expect(search).toHaveBeenCalledWith('query', ...(name === 'AutoComplete' ? [expect.anything()] : []))
    await input.trigger('keydown', { key: 'Enter' })
    expect(f.model.value).toBe('old')
    request.resolve()
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    await f.panel().get('footer button').trigger('click')
    await flushPromises()
    expect(f.model.value).toBe('new')
    await f.open()
    await f.panel().get('input').setValue('query')
    await flushPromises()
    f.owner.vm.resetFields()
    await flushPromises()
    lateRequest.resolve()
    await flushPromises()
    expect(f.owner.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
    expect(f.model.value).toBe('old')
  })
  test(`${name} popup pending confirmation blocks interaction and reset rejects late completion`, async () => {
    const task = deferred()
    const commit = vi.fn(() => task.promise)
    const f = fixture({ beforeCommit: commit })
    await f.open()
    const input = f.panel().get('input')
    await input.setValue('query')
    f.state.options = [choices[1]]
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    await f.panel().get('footer button').trigger('click')
    await flushPromises()
    expect(f.panel().attributes('aria-busy')).toBe('true')
    expect(input.attributes('disabled')).toBeDefined()
    await input.trigger('keydown', { key: 'Enter' })
    await input.setValue('blocked')
    await f.panel().get('[aria-label="关闭"]').trigger('click')
    await flushPromises()
    expect(commit).toHaveBeenCalledTimes(1)
    expect(f.model.value).toBe('old')
    f.owner.vm.resetFields()
    await flushPromises()
    task.resolve()
    await flushPromises()
    expect(f.owner.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
    expect(f.model.value).toBe('old')
    await f.open()
    expect(f.panel().text()).not.toContain('blocked')
  })
}
