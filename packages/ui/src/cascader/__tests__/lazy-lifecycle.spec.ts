import { h, KeepAlive, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Cascader from '..'
import Panel from '../CascaderPanel.vue'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
const roots = () => [{ value: 'root', label: 'Root', isLeaf: false }]
const children = (label: string) => [{ value: label, label, isLeaf: true }]
for (const [kind, Component] of [
  ['field', Cascader],
  ['panel', Panel],
] as const) {
  async function fixture(loadMore: (...args: any[]) => void, extra = {}) {
    const errors: unknown[] = []
    const owner = mount(Component as any, {
      attachTo: document.body,
      props: {
        options: roots(),
        loadMore,
        ...(kind === 'field' ? { editMode: 'direct', defaultOpen: true, popupContainer: false } : {}),
        ...extra,
      },
      global: { config: { errorHandler: (error) => errors.push(error) } },
    })
    owners.push(owner)
    await flushPromises()
    return {
      owner,
      errors,
      click: async () => {
        await owner.get('li[title="Root"]').trigger('click')
        await flushPromises()
      },
    }
  }
  test(`${kind}: duplicate requests share work and only the first done is accepted`, async () => {
    let done!: (value?: any[]) => void
    const load = vi.fn((_option, complete) => {
      done = complete
    })
    const { owner, click } = await fixture(load)
    await click()
    await click()
    expect(load).toHaveBeenCalledTimes(1)
    done(children('First'))
    done(children('Second'))
    await flushPromises()
    expect(owner.text()).toContain('First')
    expect(owner.text()).not.toContain('Second')
    expect(owner.find('[class$="-loading-icon"]').exists()).toBe(false)
  })
  test(`${kind}: done without children ends waiting and permits retry`, async () => {
    let done!: (value?: any[]) => void
    const load = vi.fn((_option, complete) => {
      done = complete
    })
    const { owner, click } = await fixture(load)
    await click()
    done()
    await flushPromises()
    expect(owner.find('[class$="-loading-icon"]').exists()).toBe(false)
    await click()
    expect(load).toHaveBeenCalledTimes(2)
    done(children('Retried'))
    await flushPromises()
    expect(owner.text()).toContain('Retried')
  })
  test(`${kind}: same-key data replacement ignores old callbacks`, async () => {
    const callbacks: ((value?: any[]) => void)[] = []
    const { owner, click } = await fixture((_option, done) => {
      callbacks.push(done)
    })
    await click()
    await owner.setProps({ options: roots() })
    await flushPromises()
    await click()
    callbacks[0](children('Stale'))
    await flushPromises()
    expect(owner.text()).not.toContain('Stale')
    expect(owner.find('[class$="-loading-icon"]').exists()).toBe(true)
    callbacks[1](children('Current'))
    await flushPromises()
    expect(owner.text()).toContain('Current')
  })
  test(`${kind}: replacing the loader releases old work and cannot commit its result`, async () => {
    let old!: (value?: any[]) => void, latest!: (value?: any[]) => void
    const { owner, click } = await fixture((_option, done) => {
      old = done
    })
    await click()
    const load = vi.fn((_option, done) => {
      latest = done
    })
    await owner.setProps({ loadMore: load })
    await flushPromises()
    await click()
    expect(load).toHaveBeenCalledTimes(1)
    old(children('Old loader'))
    await flushPromises()
    expect(owner.text()).not.toContain('Old loader')
    latest(children('New loader'))
    await flushPromises()
    expect(owner.text()).toContain('New loader')
  })
  test(`${kind}: synchronous exceptions reach Vue once and release loading for retry`, async () => {
    const cause = new Error('lazy loader failed'),
      load = vi
        .fn()
        .mockImplementationOnce(() => {
          throw cause
        })
        .mockImplementation((_option, done) => done(children('Recovered')))
    const { owner, errors, click } = await fixture(load)
    await click()
    expect(errors).toEqual([cause])
    expect(owner.find('[class$="-loading-icon"]').exists()).toBe(false)
    await click()
    expect(owner.text()).toContain('Recovered')
  })
  test(`${kind}: deep source replacement invalidates a pending node`, async () => {
    const callbacks: ((value?: any[]) => void)[] = [],
      source = reactive(roots())
    const { owner, click } = await fixture(
      (_option, done) => {
        callbacks.push(done)
      },
      { options: source },
    )
    await click()
    source.splice(0, 1, roots()[0])
    await flushPromises()
    callbacks[0](children('Removed node'))
    await flushPromises()
    expect(owner.text()).not.toContain('Removed node')
    await click()
    expect(callbacks).toHaveLength(2)
    callbacks[1](children('Replacement'))
    await flushPromises()
    expect(owner.text()).toContain('Replacement')
  })
  test(`${kind}: KeepAlive cancellation cannot reappear after activation`, async () => {
    const visible = ref(true),
      callbacks: ((value?: any[]) => void)[] = []
    const load = vi.fn((_option, done) => {
      callbacks.push(done)
    })
    const owner = mount(
      {
        render: () =>
          h(KeepAlive, null, () =>
            visible.value
              ? h(Component as any, {
                  key: 'owner',
                  options: roots(),
                  loadMore: load,
                  ...(kind === 'field' ? { editMode: 'direct', defaultOpen: true, popupContainer: false } : {}),
                })
              : h('div'),
          ),
      },
      { attachTo: document.body },
    )
    owners.push(owner)
    await flushPromises()
    await owner.get('li[title="Root"]').trigger('click')
    await flushPromises()
    visible.value = false
    await flushPromises()
    callbacks[0](children('Inactive'))
    await flushPromises()
    visible.value = true
    await flushPromises()
    expect(owner.text()).not.toContain('Inactive')
    await owner.get('li[title="Root"]').trigger('click')
    await flushPromises()
    expect(load).toHaveBeenCalledTimes(2)
    callbacks[1](children('Active'))
    await flushPromises()
    expect(owner.text()).toContain('Active')
  })
  test(`${kind}: unmount invalidates callbacks without changing the source`, async () => {
    let done!: (value?: any[]) => void
    const source = roots(),
      { owner, click, errors } = await fixture(
        (_option, complete) => {
          done = complete
        },
        { options: source },
      )
    await click()
    owner.unmount()
    owners.splice(owners.indexOf(owner), 1)
    done(children('Disposed'))
    await flushPromises()
    expect(source).toEqual(roots())
    expect(errors).toEqual([])
  })
  test(`${kind}: return values do not replace the callback protocol`, async () => {
    let done!: (value?: any[]) => void
    const { owner, click } = await fixture((_option, complete) => {
      done = complete
      return Promise.resolve(children('Returned'))
    })
    await click()
    expect(owner.text()).not.toContain('Returned')
    expect(owner.find('[class$="-loading-icon"]').exists()).toBe(true)
    done(children('Callback'))
    await flushPromises()
    expect(owner.text()).toContain('Callback')
  })
}
