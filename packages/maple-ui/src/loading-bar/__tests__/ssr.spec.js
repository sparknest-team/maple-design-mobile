// @vitest-environment node
import { expect, it, vi } from 'vitest'
import LoadingBar from '..'

it('does not mount or schedule from service calls without a document', () => {
  const timer = vi.spyOn(globalThis, 'setTimeout')
  LoadingBar.start()
  LoadingBar.error()
  LoadingBar.finish()
  expect(timer).not.toHaveBeenCalled()
  timer.mockRestore()
})
