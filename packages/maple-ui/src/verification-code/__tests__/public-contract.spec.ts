import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import VerificationCode from '..'
import { verificationCodeProps } from '../props'

test('type and align validate enumerations and use safe defaults for JavaScript callers', async () => {
  expect(verificationCodeProps.type.validator('unknown')).toBe(false)
  expect(verificationCodeProps.align.validator('unknown')).toBe(false)
  for (const value of ['digit', 'text', 'alphanumeric']) {
    expect(verificationCodeProps.type.validator(value)).toBe(true)
  }
  for (const value of ['start', 'center', 'end']) {
    expect(verificationCodeProps.align.validator(value)).toBe(true)
  }
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const owner = mount(VerificationCode, {
    props: { editMode: 'direct', type: 'unknown', align: 'unknown', length: 2 } as any,
  })
  try {
    expect(
      owner
        .get('[role=group]')
        .classes()
        .some((value) => value.endsWith('--align-center')),
    ).toBe(true)
    await owner.get('input').setValue('a9')
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe('9')
    expect(owner.get('input').attributes('inputmode')).toBe('numeric')
  } finally {
    owner.unmount()
    warn.mockRestore()
  }
})
for (const gutter of [0, '0px']) {
  test(`zero gutter ${gutter} is retained`, () => {
    const owner = mount(VerificationCode, { props: { editMode: 'direct', gutter } })
    try {
      expect(owner.get('[role=group]').attributes('style')).toContain('verification-code-gutter: 0px')
    } finally {
      owner.unmount()
    }
  })
}
