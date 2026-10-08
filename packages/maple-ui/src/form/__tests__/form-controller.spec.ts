import { describe, expect, it, vi } from 'vitest'
import { createFormController, type FormFieldController } from '../form-controller'

const deferred = <T>() => {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => {
    resolve = done
  })
  return { promise, resolve }
}

const createField = (field: string, valid = true): FormFieldController => ({
  field,
  validate: vi.fn(async () => (valid ? undefined : { field, message: `${field} error` })),
  clearValidate: vi.fn(),
  resetField: vi.fn(),
  setField: vi.fn(),
})

describe('form controller', () => {
  it('registers fields once and unregisters idempotently', () => {
    const controller = createFormController()
    const field = createField('name')
    const unregister = controller.registerField(field)
    controller.registerField(field)
    expect(controller.fields).toEqual([field])
    unregister()
    unregister()
    expect(controller.fields).toEqual([])
  })

  it('validates selected fields and aggregates errors by field', async () => {
    const controller = createFormController()
    const name = createField('name', false)
    const email = createField('email', false)
    controller.registerField(name)
    controller.registerField(email)

    await expect(controller.validate('email')).resolves.toEqual({
      email: { field: 'email', message: 'email error' },
    })
    expect(name.validate).not.toHaveBeenCalled()
    expect(email.validate).toHaveBeenCalledOnce()
  })

  it('does not publish a stale async validation result', async () => {
    const first = deferred<{ field: string; message: string } | undefined>()
    const second = deferred<{ field: string; message: string } | undefined>()
    const onInvalid = vi.fn()
    const callback = vi.fn()
    let run = 0
    const controller = createFormController({ onInvalid })
    controller.registerField({
      field: 'name',
      validate: () => (++run === 1 ? first.promise : second.promise),
      clearValidate: vi.fn(),
      resetField: vi.fn(),
    })

    const oldRun = controller.validate(undefined, callback)
    const currentRun = controller.validate(undefined, callback)
    second.resolve(undefined)
    await currentRun
    first.resolve({ field: 'name', message: 'stale' })
    await oldRun

    expect(callback).toHaveBeenCalledOnce()
    expect(callback).toHaveBeenCalledWith(undefined)
    expect(onInvalid).not.toHaveBeenCalled()
  })

  it('targets reset, clear and set operations without skipping falsy data', () => {
    const controller = createFormController<never, number>()
    const name = createField('name') as FormFieldController<never, number>
    const age = createField('age') as FormFieldController<never, number>
    controller.registerField(name)
    controller.registerField(age)

    controller.resetFields('name')
    controller.clearValidate(['age'])
    controller.setFields({ name: 0 })

    expect(name.resetField).toHaveBeenCalledOnce()
    expect(age.resetField).not.toHaveBeenCalled()
    expect(age.clearValidate).toHaveBeenCalledOnce()
    expect(name.setField).toHaveBeenCalledWith(0)
  })
})
