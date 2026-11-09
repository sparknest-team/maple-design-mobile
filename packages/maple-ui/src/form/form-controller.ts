export type FormFieldName = string | string[]

export interface FormFieldError {
  field: string
  message: string
}

export type FormValidateErrors<Error extends FormFieldError = FormFieldError> = Record<string, Error> | undefined

export interface FormFieldController<Error extends FormFieldError = FormFieldError, Data = unknown> {
  readonly field: string
  validate: () => Promise<Error | undefined>
  clearValidate: () => void
  resetField: () => void
  setField?: (data: Data) => void
  getElement?: () => HTMLElement | undefined
}

export interface FormControllerOptions<Error extends FormFieldError, Data> {
  onInvalid?: (errors: Record<string, Error>, fields: FormFieldController<Error, Data>[]) => void
}

const normalizeNames = (field?: FormFieldName) =>
  field == null ? undefined : new Set(Array.isArray(field) ? field : [field])

export function createFormController<Error extends FormFieldError = FormFieldError, Data = unknown>(
  options: FormControllerOptions<Error, Data> = {},
) {
  const fields: FormFieldController<Error, Data>[] = []
  let validationRun = 0

  const matchFields = (field?: FormFieldName) => {
    const names = normalizeNames(field)
    return names ? fields.filter((item) => names.has(item.field)) : [...fields]
  }

  const registerField = (field: FormFieldController<Error, Data>) => {
    if (!field.field || fields.includes(field)) {
      return () => undefined
    }
    fields.push(field)
    validationRun += 1

    let registered = true
    return () => {
      if (!registered) {
        return
      }
      registered = false
      const index = fields.indexOf(field)
      if (index >= 0) {
        fields.splice(index, 1)
        validationRun += 1
      }
    }
  }

  const validate = async (
    field?: FormFieldName,
    callback?: (errors: FormValidateErrors<Error>) => void,
  ): Promise<FormValidateErrors<Error>> => {
    const run = ++validationRun
    const matched = matchFields(field)
    const results = await Promise.all(matched.map((item) => item.validate()))
    const errors: Record<string, Error> = {}

    results.forEach((error, index) => {
      if (!error) {
        return
      }
      const fieldName = error.field || matched[index].field
      errors[fieldName] = { ...error, field: fieldName }
    })

    const result = Object.keys(errors).length ? errors : undefined
    if (run === validationRun) {
      callback?.(result)
      if (result) {
        options.onInvalid?.(result, matched)
      }
    }
    return result
  }

  const invalidate = () => {
    validationRun += 1
  }

  const resetFields = (field?: FormFieldName) => {
    invalidate()
    matchFields(field).forEach((item) => item.resetField())
  }

  const clearValidate = (field?: FormFieldName) => {
    invalidate()
    matchFields(field).forEach((item) => item.clearValidate())
  }

  const setFields = (data: Record<string, Data>) => {
    invalidate()
    fields.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(data, item.field)) {
        item.setField?.(data[item.field])
      }
    })
  }

  return {
    fields,
    registerField,
    matchFields,
    validate,
    resetFields,
    clearValidate,
    setFields,
    invalidate,
  }
}
