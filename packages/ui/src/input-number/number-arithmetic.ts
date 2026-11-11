import { Decimal } from 'decimal.js'

export type StepMethod = 'plus' | 'minus'
// Isolated constructor: changes to an application's Decimal defaults cannot alter a field.
// IEEE-754 finite values need at most 309 integer digits and 324 fractional digits.
const NumberDecimal = Decimal.clone({ precision: 650, rounding: Decimal.ROUND_HALF_UP })

export function roundNumber(value: number, precision?: number) {
  return precision === undefined ? value : new NumberDecimal(value).toDecimalPlaces(precision).toNumber()
}
export function stepNumber(value: number, step: number, method: StepMethod) {
  return new NumberDecimal(value)[method](step).toNumber()
}
