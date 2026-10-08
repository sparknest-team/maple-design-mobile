import { describe, expect, it, vi } from 'vitest'
import {
  getTimePanelPresentationProps,
  getTimePopupPresentationProps,
  getTimeWheelPresentationProps,
} from '../presentation-props'
import type {
  TimePanelPresentationProps,
  TimePopupPresentationProps,
  TimeWheelPresentationProps,
} from '../presentation-props'

describe('time presentation ownership', () => {
  it('blocks panel state, constraints and owner listeners while preserving appearance', () => {
    const callback = vi.fn()
    const source = {
      modelValue: '09:00',
      defaultValue: '10:00',
      'model-value': '11:00',
      readonly: false,
      min: '00:00',
      format: 'HH',
      presentation: 'clock',
      'onUpdate:modelValue': callback,
      onSelect: callback,
      color: 'red',
      hint: 'Time',
      elevation: false,
    }
    expect(getTimePanelPresentationProps(source)).toEqual({ color: 'red', hint: 'Time', elevation: false })
    expect(source.modelValue).toBe('09:00')
    expect(callback).not.toHaveBeenCalled()
  })
  it('keeps wheel display options but not column shape, selection, popup or toolbar ownership', () => {
    expect(
      getTimeWheelPresentationProps({
        columns: [],
        modelValue: [],
        selectedValues: [],
        toolbar: true,
        open: true,
        cascade: true,
        fieldNames: {},
        dynamic: true,
        columnsCount: 10,
        onChange: vi.fn(),
        optionHeight: 48,
        optionCount: 5,
      }),
    ).toEqual({ optionHeight: 48, optionCount: 5 })
  })
  it('preserves popup lifecycle and positioning options without transferring open ownership', () => {
    const closed = vi.fn()
    expect(
      getTimePopupPresentationProps({
        open: true,
        defaultOpen: true,
        disabled: true,
        trigger: 'hover',
        'close-on-click-reference': true,
        preventFocus: false,
        'onUpdate:open': vi.fn(),
        popupContainer: false,
        placement: 'top',
        onClosed: closed,
      }),
    ).toEqual({ popupContainer: false, placement: 'top', onClosed: closed })
    expect(getTimePanelPresentationProps()).toEqual({})
  })
})

// Public nested option types reject owner state rather than advertising ignored settings.
const panel: TimePanelPresentationProps<{ color?: string; modelValue?: string }> = { color: 'red' }
const wheel: TimeWheelPresentationProps<{ optionHeight?: number }> = { optionHeight: 48 }
const popup: TimePopupPresentationProps<{ placement?: string }> = { placement: 'top' }
// @ts-expect-error model belongs to the owner
const invalidPanel: typeof panel = { modelValue: '09:00' }
// @ts-expect-error wheel columns belong to the owner
const invalidWheel: typeof wheel = { columns: [] }
// @ts-expect-error popup open belongs to the owner
const invalidPopup: typeof popup = { open: true }
// @ts-expect-error field interaction cannot be replaced by popup configuration
const invalidTrigger: typeof popup = { trigger: 'hover' }
void [panel, wheel, popup, invalidPanel, invalidWheel, invalidPopup, invalidTrigger]
