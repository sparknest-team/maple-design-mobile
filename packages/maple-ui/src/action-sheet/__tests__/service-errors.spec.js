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
})
afterAll(() => {
  vi.doUnmock('../../utils/components')
  vi.resetModules()
})
for (const closeOnClickAction of [false, true]) {
  test(`throwing select callback keeps selected result with auto close=${closeOnClickAction}`, async () => {
    const cause = new Error('select'),
      action = { name: 'A' }
    let result
    const promise = service({
      actions: [action],
      closeOnClickAction,
      onSelect: () => {
        throw cause
      },
    })
    promise.then((value) => {
      result = value
    })
    const record = records[records.length - 1]
    expect(() => record.listeners.onSelect(action)).toThrow(cause)
    await nextTick()
    expect(result).toEqual(action)
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
  expect(result).toBe('close')
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
