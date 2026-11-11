import { expect, it } from 'vitest'
import { datePresentationOptions } from '../../date/presentation-options'
import {
  getTimePanelPresentationProps,
  getTimePopupPresentationProps,
  getTimeWheelPresentationProps,
} from '../../time/presentation-props'

it('keeps editing mode owned by the field rather than nested native panel options', () => {
  const options = { editMode: 'direct', 'edit-mode': 'popup', class: 'native-panel' }
  expect(datePresentationOptions(options)).toEqual({ class: 'native-panel' })
  for (const filter of [getTimePanelPresentationProps, getTimeWheelPresentationProps, getTimePopupPresentationProps]) {
    expect(filter(options)).toEqual({ class: 'native-panel' })
  }
})
