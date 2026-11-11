import { expect, test } from 'vitest'
import { invokeBeforeCommit, type BeforeFieldCommit } from '../../_components/field-presentation/context'

const context = () => ({ signal: new AbortController().signal, previousValue: 'old' })
test('payload/done/context preserve boolean, Promise and callback completion', async () => {
  expect(await invokeBeforeCommit(() => true, 'new', context())).toBe(true)
  expect(await invokeBeforeCommit(() => false, 'new', context())).toBe(false)
  expect(await invokeBeforeCommit(async () => {}, 'new', context())).toBe(true)
  let finish!: (allowed?: boolean) => void
  const hook: BeforeFieldCommit = (payload, done, state) => {
    expect(payload).toEqual({ value: 'new', previousValue: 'old' })
    expect(state.signal).toBeInstanceOf(AbortSignal)
    expect((done as any).signal).toBeUndefined()
    finish = done
  }
  const pending = invokeBeforeCommit(hook, 'new', context())
  finish(false)
  finish(true)
  expect(await pending).toBe(false)
})
test('aborted callback commit ignores late completion even with default/rest parameters', async () => {
  let finish!: (allowed?: boolean) => void
  const controller = new AbortController()
  const hook: BeforeFieldCommit = (_payload, done = () => {}, ...rest) => {
    expect(rest[0].signal).toBe(controller.signal)
    finish = done
  }
  const pending = invokeBeforeCommit(hook, 'new', { signal: controller.signal, previousValue: 'old' })
  controller.abort()
  finish()
  expect(await pending).toBe(false)
})
