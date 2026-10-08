export interface FormControlState<TSize = string> {
  size?: TSize
  disabled?: boolean
  readonly?: boolean
  error?: boolean
}

export const resolveFormControlState = <T>(
  local: T | undefined,
  formItem: T | undefined,
  form: T | undefined,
  fallback: T,
): T => local ?? formItem ?? form ?? fallback
