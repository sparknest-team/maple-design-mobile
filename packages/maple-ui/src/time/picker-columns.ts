import { pickerFieldIndexes, timeFields, type TimePickerField } from '../_components/picker-field/fields'
import { parseClock, unitSequence } from '../utils/picker-data'
import { resolveTimeFormat } from './time-format'
import { getTimeChoices } from './time-rules'
import {
  formatTimeValue,
  fromClockValue,
  getTimeConstraints,
  toClockValue,
  type FormattedTimeRules,
  type TimeValue,
} from './time-value'

type PickerRules = FormattedTimeRules & { timeFields?: readonly TimePickerField[] }

export function formatTimeLabel(value: TimeValue | undefined, rules: FormattedTimeRules) {
  return formatTimeValue(value, rules) ?? ''
}

export function getTimePickerColumnLabels(rules: PickerRules, translate: (key: string) => string) {
  const config = resolveTimeFormat(rules)
  const labels = [
    translate('datePickerColumnHour'),
    translate('datePickerColumnMinute'),
    translate('datePickerColumnSecond'),
  ]
  const indexes = visibleIndexes(rules)
  return [...indexes.map((index) => labels[index]), ...(indexes.includes(0) && config.use12Hours ? ['AM/PM'] : [])]
}

/** Mobile wheel rendering stays local; candidate rules are independently copied across libraries. */
export function getTimePickerState(
  value: TimeValue | undefined,
  rules: PickerRules & { hideDisabledOptions?: boolean },
) {
  const config = resolveTimeFormat(rules)
  const choices = getTimeChoices(toClockValue(value, rules), getTimeConstraints(rules))
  const indexes = visibleIndexes(rules)
  const parts = choices.value?.split(':') ?? []
  const ampm = config.use12Hours && visibleIndexes(rules).includes(0)
  const period = Number(parts[0]) >= 12 ? 'pm' : 'am'
  const allowedPeriods = ['am', 'pm'].filter((item) =>
    choices.columns[0].some((hour) => (hour >= 12 ? 'pm' : 'am') === item),
  )
  const periods = rules.hideDisabledOptions ? allowedPeriods : ['am', 'pm']
  const columns = indexes.map((index) => {
    const allowed = choices.columns[index] ?? []
    const column = rules.hideDisabledOptions
      ? allowed
      : unitSequence(index === 0 ? 24 : 60, [rules.step?.hour, rules.step?.minute, rules.step?.second][index])
    const items = index === 0 && ampm ? column.filter((hour) => (hour >= 12 ? 'pm' : 'am') === period) : column
    return items.map((item) => {
      const text = String(index === 0 && ampm ? item % 12 || 12 : item).padStart(2, '0')
      return { text, value: text, disabled: !allowed.includes(item) }
    })
  })
  if (ampm) {
    columns.push(
      periods.map((item) => ({ text: item.toUpperCase(), value: item, disabled: !allowedPeriods.includes(item) })),
    )
    if (parts.length) {
      parts[0] = String(Number(parts[0]) % 12 || 12).padStart(2, '0')
      parts.push(period)
    }
  }
  return {
    columns,
    value: parts.length ? [...indexes.map((index) => parts[index]), ...(ampm ? [period] : [])] : [],
  }
}

export function getTimePickerChange(values: (string | number)[], rules: PickerRules, current?: TimeValue) {
  const config = resolveTimeFormat(rules)
  const indexes = visibleIndexes(rules)
  const count = indexes.length
  const ampm = config.use12Hours && visibleIndexes(rules).includes(0)
  if (values.length !== count + (ampm ? 1 : 0)) {
    return undefined
  }
  const period = values[count]
  if (ampm && period !== 'am' && period !== 'pm') {
    return undefined
  }
  const previous = toClockValue(current, rules)?.split(':').map(Number)
  const parts = previous ? [...previous] : [0, 0, 0]
  indexes.forEach((index, position) => {
    parts[index] = Number(values[position])
  })
  const displayHour = parts[0]
  if (ampm && (!Number.isInteger(displayHour) || displayHour < 1 || displayHour > 12)) {
    return undefined
  }
  const hour = ampm ? (displayHour % 12) + (period === 'pm' ? 12 : 0) : displayHour
  const raw = [hour, parts[1], parts[2]].map((item) => String(item).padStart(2, '0')).join(':')
  if (parseClock(raw) === null) {
    return undefined
  }
  const choices = getTimeChoices(
    raw,
    ampm
      ? {
          ...getTimeConstraints(rules),
          disabledHours: () => [
            ...(rules.disabledHours?.() ?? []),
            ...Array.from({ length: 12 }, (_, index) => index + (period === 'am' ? 12 : 0)),
          ],
        }
      : getTimeConstraints(rules),
  ).value
  if (rules.timeFields && previous && choices) {
    const next = choices.split(':').map(Number)
    if (previous.some((part, index) => !indexes.includes(index) && part !== next[index])) {
      return undefined
    }
  }
  return fromClockValue(choices, rules)
}

function visibleIndexes(rules: PickerRules) {
  const { columns } = resolveTimeFormat(rules)
  const defaults = [
    columns.includes('H') || columns.includes('h'),
    columns.includes('m'),
    columns.includes('s'),
  ].flatMap((visible, index) => (visible ? [index] : []))
  return pickerFieldIndexes(rules.timeFields, timeFields, defaults)
}
