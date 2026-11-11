import { expect, test, vi } from 'vitest'
import { props as rangeProps } from '../../date-range/picker-props'
import { props as rangeRendererProps } from '../../date-range/presentation-props'
import { props as dateProps } from '../picker-props'
import { props as rendererProps } from '../presentation-props'

vi.mock('../presentation-props', async () => {
  const actual = await vi.importActual<typeof import('../presentation-props')>('../presentation-props')
  return { ...actual, props: { ...actual.props, privateRendererSentinel: String } }
})
vi.mock('../../date-range/presentation-props', async () => {
  const actual = await vi.importActual<typeof import('../../date-range/presentation-props')>(
    '../../date-range/presentation-props',
  )
  return { ...actual, props: { ...actual.props, privateRangeRendererSentinel: String } }
})
test('a private current-date renderer input is not a public standalone picker option', () => {
  expect(rendererProps).toHaveProperty('currentDate')
  expect(dateProps).not.toHaveProperty('currentDate')
})
test('new private renderer parameters cannot leak automatically into either standalone picker', () => {
  expect(rendererProps).toHaveProperty('privateRendererSentinel')
  expect(rangeRendererProps).toHaveProperty('privateRangeRendererSentinel')
  expect(dateProps).not.toHaveProperty('privateRendererSentinel')
  expect(rangeProps).not.toHaveProperty('privateRangeRendererSentinel')
})
test('real calendar styling and field-list capabilities remain public with their defaults', () => {
  for (const key of ['dateFields', 'timeFields', 'pickerProps', 'abbreviation', 'elevation']) {
    expect(dateProps).toHaveProperty(key)
    expect(rangeProps).toHaveProperty(key)
  }
  expect(dateProps.presentation.default).toBe('calendarPicker')
  expect(rangeProps.presentation.default).toBe('calendarPicker')
  expect(dateProps.showCurrent.default).toBe(true)
  expect(dateProps.showNowButton.default).toBe(true)
  expect(dateProps.abbreviation.default).toBe(true)
})
