import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Mention from '..'

const owners: ReturnType<typeof mount>[] = []
const originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo')
beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() })
})
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  if (originalScrollTo) {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo)
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo')
  }
})
for (const type of ['input', 'textarea'] as const) {
  const indicator = (owner: ReturnType<typeof mount>) => owner.find('.mp-field-decorator__loading-icon').exists()
  test(`${type} shares manual loading without implicitly disabling editing`, async () => {
    const owner = mount(Mention, { props: { type, editMode: 'direct', options: ['alice'], loading: true } })
    owners.push(owner)
    expect(indicator(owner)).toBe(true)
    expect(owner.get(type).attributes('aria-busy')).toBe('true')
    expect(owner.get(type).attributes('disabled')).toBeUndefined()
    expect(owner.get(type).attributes('readonly')).toBeUndefined()
    await owner.setProps({ loading: false })
    expect(indicator(owner)).toBe(false)
    expect(owner.get(type).attributes('aria-busy')).toBeUndefined()
  })
  test(`${type} follows current remote loading while old work cannot clear its feedback`, async () => {
    const old: ((value: string[]) => void)[] = [],
      latest: ((value: string[]) => void)[] = []
    const owner = mount(Mention, {
      props: { type, editMode: 'direct', options: () => new Promise<string[]>((resolve) => old.push(resolve)) },
    })
    owners.push(owner)
    await flushPromises()
    expect(old.length).toBeGreaterThan(0)
    expect(indicator(owner)).toBe(true)
    await owner.setProps({ options: () => new Promise<string[]>((resolve) => latest.push(resolve)) })
    await flushPromises()
    old.forEach((done) => done(['old']))
    await flushPromises()
    expect(indicator(owner)).toBe(true)
    expect(owner.get(type).attributes('aria-busy')).toBe('true')
    latest.forEach((done) => done(['new']))
    await flushPromises()
    expect(indicator(owner)).toBe(false)
    expect(owner.get(type).attributes('aria-busy')).toBeUndefined()
    expect(owner.get(type).attributes('disabled')).toBeUndefined()
  })
  test(`${type} shows dropdown loading for the latest search and ignores stale results`, async () => {
    type Person = { value: string; label: string }
    const requests = new Map<string, Array<(value: Person[]) => void>>()
    const loader = vi.fn(
      (query: string) =>
        new Promise<Person[]>((resolve) => {
          requests.set(query, [...(requests.get(query) ?? []), resolve])
        }),
    )
    const owner = mount(Mention, { attachTo: document.body, props: { type, atomic: true, options: loader } })
    owners.push(owner)
    await flushPromises()
    requests.get('')!.forEach((resolve) => resolve([]))
    await flushPromises()
    const input = owner.get(type)
    ;(input.element as HTMLInputElement | HTMLTextAreaElement).focus()
    await input.setValue('@xiao')
    await flushPromises()
    expect(loader).toHaveBeenCalledWith('xiao', expect.objectContaining({ signal: expect.any(AbortSignal) }))
    const dropdown = () => document.getElementById(input.attributes('aria-controls')!)
    expect(dropdown()?.getAttribute('role')).toBe('listbox')
    expect(dropdown()?.getAttribute('aria-busy')).toBe('true')
    expect(dropdown()?.querySelector('.mp-select-dropdown-loading')).toBeTruthy()
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    await input.setValue('@li')
    await flushPromises()
    expect(loader).toHaveBeenCalledWith('li', expect.objectContaining({ signal: expect.any(AbortSignal) }))
    requests.get('xiao')!.forEach((resolve) => resolve([{ value: 'xiaoming', label: '小明' }]))
    await flushPromises()
    expect(dropdown()?.getAttribute('aria-busy')).toBe('true')
    expect(dropdown()?.textContent).not.toContain('小明')
    requests.get('li')!.forEach((resolve) => resolve([{ value: 'lisi', label: '李四' }]))
    await flushPromises()
    expect(dropdown()?.getAttribute('aria-busy')).toBeNull()
    expect(dropdown()?.querySelector('.mp-select-dropdown-loading')).toBeNull()
    expect(dropdown()?.textContent).toContain('李四')
    expect(dropdown()?.textContent).not.toContain('小明')
  })

  test.each(['resolve', 'reject'] as const)(
    `${type} keeps the latest results when an uncancellable old request later %s`,
    async (outcome) => {
      type Person = { value: string; label: string }
      type Pending = { resolve: (value: Person[]) => void; reject: (error: Error) => void; signal: AbortSignal }
      const requests = new Map<string, Pending>()
      // The backend ignores cancellation; its promise still settles after the signal is aborted.
      const loader = vi.fn((query: string, { signal }: { signal: AbortSignal }) =>
        query === ''
          ? Promise.resolve([])
          : new Promise<Person[]>((resolve, reject) => {
              requests.set(query, { resolve, reject, signal })
            }),
      )
      const owner = mount(Mention, { attachTo: document.body, props: { type, atomic: true, options: loader } })
      owners.push(owner)
      await flushPromises()
      const input = owner.get(type)
      ;(input.element as HTMLInputElement | HTMLTextAreaElement).focus()
      await input.setValue('@xiao')
      await flushPromises()
      const oldRequest = requests.get('xiao')!
      expect(oldRequest).toBeDefined()
      await input.setValue('@li')
      await flushPromises()
      const latestRequest = requests.get('li')!
      expect(latestRequest).toBeDefined()
      expect(oldRequest.signal.aborted).toBe(true)
      expect(latestRequest.signal.aborted).toBe(false)
      const dropdown = () => document.getElementById(input.attributes('aria-controls')!)
      expect(dropdown()?.getAttribute('aria-busy')).toBe('true')
      latestRequest.resolve([{ value: 'lisi', label: '李四' }])
      await flushPromises()
      expect(dropdown()?.textContent).toContain('李四')
      expect(dropdown()?.getAttribute('aria-busy')).toBeNull()
      const updatesBeforeOldResponse = owner.emitted('update:modelValue')?.length
      if (outcome === 'resolve') {
        oldRequest.resolve([{ value: 'xiaoming', label: '小明' }])
      } else {
        oldRequest.reject(new Error('old request failed'))
      }
      await flushPromises()
      expect(dropdown()?.textContent).toContain('李四')
      expect(dropdown()?.textContent).not.toContain('小明')
      expect(dropdown()?.getAttribute('aria-busy')).toBeNull()
      expect(input.attributes('aria-busy')).toBeUndefined()
      expect(owner.emitted('load-error')).toBeUndefined()
      expect(owner.emitted('update:modelValue')?.length).toBe(updatesBeforeOldResponse)
      const option = Array.from(dropdown()!.querySelectorAll<HTMLElement>('[role="option"]')).find((item) =>
        item.textContent?.includes('李四'),
      )
      expect(option).toBeTruthy()
      option!.click()
      await flushPromises()
      expect((input.element as HTMLInputElement | HTMLTextAreaElement).value).toBe('@李四 ')
      expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe('@[lisi] ')
    },
  )

  test(`${type} does not select hidden candidates while the dropdown is loading`, async () => {
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        type,
        atomic: true,
        loading: true,
        options: [{ value: 'xiaoming', label: '小明' }],
      },
    })
    owners.push(owner)
    const input = owner.get(type)
    ;(input.element as HTMLInputElement | HTMLTextAreaElement).focus()
    await input.setValue('@xiaoming')
    await flushPromises()
    expect(
      document.getElementById(input.attributes('aria-controls')!)?.querySelector('.mp-select-dropdown-loading'),
    ).toBeTruthy()
    await input.trigger('keydown', { key: 'Enter' })
    expect(owner.emitted('select')).toBeUndefined()
    await owner.setProps({ loading: false })
    await flushPromises()
    expect(document.getElementById(input.attributes('aria-controls')!)?.textContent).toContain('小明')
  })
  test(`${type} closes dropdown loading when a search fails`, async () => {
    let reject!: (error: Error) => void
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        type,
        options: (query: string) =>
          query
            ? new Promise<string[]>((_, fail) => {
                reject = fail
              })
            : Promise.resolve([]),
      },
    })
    owners.push(owner)
    await flushPromises()
    const input = owner.get(type)
    ;(input.element as HTMLInputElement | HTMLTextAreaElement).focus()
    await input.setValue('@missing')
    await flushPromises()
    expect(document.getElementById(input.attributes('aria-controls')!)?.getAttribute('aria-busy')).toBe('true')
    const cause = new Error('search failed')
    reject(cause)
    await flushPromises()
    expect(input.attributes('aria-controls')).toBeUndefined()
    expect(input.attributes('aria-busy')).toBeUndefined()
    expect(owner.emitted('load-error')?.[0]?.[0]).toBe(cause)
  })
  test(`${type} releases remote loading and publishes the original load error`, async () => {
    let reject!: (error: Error) => void
    const owner = mount(Mention, {
      props: {
        type,
        editMode: 'direct',
        options: () =>
          new Promise<string[]>((_, fail) => {
            reject = fail
          }),
      },
    })
    owners.push(owner)
    await flushPromises()
    expect(indicator(owner)).toBe(true)
    const cause = new Error('remote data failed')
    reject(cause)
    await flushPromises()
    expect(indicator(owner)).toBe(false)
    expect(owner.emitted('load-error')?.[0][0]).toBe(cause)
  })
  test(`${type} does not treat a search notification Promise as a loading task`, async () => {
    let finish!: () => void
    const promise = new Promise<void>((resolve) => {
        finish = resolve
      }),
      search = vi.fn(() => promise)
    const owner = mount(Mention, { props: { type, editMode: 'direct', options: ['alice'], onSearch: search } })
    owners.push(owner)
    await owner.get(type).setValue('@a')
    await flushPromises()
    expect(search).toHaveBeenCalled()
    expect(indicator(owner)).toBe(false)
    expect(owner.get(type).attributes('aria-busy')).toBeUndefined()
    finish()
  })
}
