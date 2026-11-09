import { nextTick } from 'vue'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'

let service, records
beforeAll(async () => {
  records = []
  vi.resetModules()
  vi.doMock('../../utils/components', async () => {
    const actual = await vi.importActual('../../utils/components')
    return {
      ...actual,
      mountInstance: (_, props, listeners) => {
        const record = { props, listeners, unmount: vi.fn() }
        records.push(record)
        return { unmountInstance: record.unmount }
      },
    }
  })
  service = (await import('..')).default
}, 30000)
afterAll(() => {
  vi.doUnmock('../../utils/components')
  vi.resetModules()
})
for (const action of ['confirm', 'cancel']) {
  test(`throwing ${action} callback still settles and closes the picker`, async () => {
    const cause = new Error(action),
      options = {
        columns: [['A']],
        ['on' + action[0].toUpperCase() + action.slice(1)]: () => {
          throw cause
        },
      }
    let result
    const promise = service(options)
    promise.then((value) => {
      result = value
    })
    const record = records[records.length - 1]
    expect(() =>
      record.listeners['on' + action[0].toUpperCase() + action.slice(1)](['A'], [0], [{ text: 'A' }]),
    ).toThrow(cause)
    await nextTick()
    expect(result.state).toBe(action)
    expect(record.props.open).toBe(false)
    record.listeners.onClosed()
  })
}
test('throwing close callback still settles the close result', async () => {
  const cause = new Error('close')
  let result
  const promise = service({
    columns: [['A']],
    actions: [],
    onClose: () => {
      throw cause
    },
  })
  promise.then((value) => {
    result = value
  })
  const record = records[records.length - 1]
  expect(() => record.listeners.onClose()).toThrow(cause)
  await nextTick()
  expect(result.state).toBe('close')
  record.listeners.onClosed()
})
test('throwing closed callback cannot skip host disposal', () => {
  const cause = new Error('closed')
  service({
    columns: [['A']],
    actions: [],
    onClosed: () => {
      throw cause
    },
  })
  const record = records[records.length - 1]
  expect(() => record.listeners.onClosed()).toThrow(cause)
  expect(record.unmount).toHaveBeenCalledTimes(1)
})

for (const kind of ['selector', 'element', 'inline', 'default']) {
  test(`service preserves its ${kind} container without mutating caller options`, async () => {
    const target =
      kind === 'selector'
        ? '#picker-target'
        : kind === 'element'
          ? document.createElement('div')
          : kind === 'inline'
            ? false
            : undefined
    const options = {
      columns: [[{ text: 'A', value: 'a' }]],
      ...(target === undefined ? {} : { popupContainer: target }),
    }
    const before = { ...options },
      pending = service(options),
      record = records.at(-1)
    expect(record.props.popupContainer).toBe(target ?? 'body')
    expect(options).toEqual(before)
    record.listeners.onConfirm(['a'], [0], [{ text: 'A', value: 'a' }])
    expect((await pending).state).toBe('confirm')
    record.listeners.onClosed()
  })
}
test('service accepts a frozen configuration by owning its mutable state', async () => {
  const options = Object.freeze({ title: 'Frozen', columns: [[{ text: 'A', value: 'a' }]] })
  let cause
  const count = records.length,
    pending = service(options).catch((error) => {
      cause = error
    })
  await nextTick()
  expect(cause).toBeUndefined()
  expect(records).toHaveLength(count + 1)
  const record = records.at(-1)
  record.listeners.onCancel(['a'], [0], [{ text: 'A', value: 'a' }])
  expect((await pending).state).toBe('cancel')
  record.listeners.onClosed()
})
