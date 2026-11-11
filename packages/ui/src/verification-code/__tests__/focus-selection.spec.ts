import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import VerificationCode from '..'

test('queued select from an earlier cell cannot steal a newer explicit focus', async () => {
  const selected: HTMLInputElement[] = []
  const select = vi.spyOn(HTMLInputElement.prototype, 'select').mockImplementation(function (this: HTMLInputElement) {
    selected.push(this)
  })
  const owner = mount(VerificationCode, {
    props: { editMode: 'direct', defaultValue: '1234' },
    attachTo: document.body,
  })
  try {
    const inputs = owner.findAll('input')
    inputs[0].element.focus()
    ;(owner.vm as any).focus(2)
    await flushPromises()
    expect(selected.length).toBeGreaterThan(0)
    expect([...new Set(selected)]).toEqual([inputs[2].element])
    expect(document.activeElement).toBe(inputs[2].element)
  } finally {
    owner.unmount()
    select.mockRestore()
  }
})
