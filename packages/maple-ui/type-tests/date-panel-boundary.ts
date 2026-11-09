import type { DatePickerOptions, DatePickerProps, DateRangePickerProps } from '@maple-design/ui'

export const appearance: DatePickerProps = {
  color: 'red',
  titleColor: 'blue',
  hint: 'Choose',
  elevation: 2,
  buttonElevation: true,
  touchable: false,
  abbreviation: false,
}
export const range: DateRangePickerProps = { elevation: 2, abbreviation: false }
// @ts-expect-error currentDate is renderer glue; public panels derive the current date.
export const current: DatePickerProps = { currentDate: '1900-01-01' }
// @ts-expect-error An inert renderer input is not a public nested field option either.
export const nested: DatePickerOptions = { currentDate: '1900-01-01' }
