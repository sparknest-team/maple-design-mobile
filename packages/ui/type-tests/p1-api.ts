import type {
  ActionSheetOptions,
  DateRangeProps,
  LoadingBarOptions,
  NoticeBarProps,
  PopoverInstance as PopoverRootInstance,
  PopoverProps as PopoverRootProps,
  PopupBeforeClose,
  PopupCloseReason,
  PopupInstance,
  PopupProps,
  RangeInputAttributes,
  ResultProps as ResultRootProps,
  ResultStatus as ResultRootStatus,
  SelectInstance,
  SelectProps,
  SelectValue,
  TimeRangeProps,
} from '@maple-design/ui-vue'
import { hoverOverlayProps, useHoverOverlay } from '@maple-design/ui-vue'
import type { RangeInputAttributes as DateRangeInputAttributes } from '@maple-design/ui-vue/date-range'
import type { HoverOverlayProps } from '@maple-design/ui-vue/hover'
import type { LoadingBarOptions as LoadingBarSubOptions } from '@maple-design/ui-vue/loading-bar'
import type { NoticeBarProps as NoticeBarSubProps } from '@maple-design/ui-vue/notice-bar'
import type { PopoverInstance as PopoverSubInstance } from '@maple-design/ui-vue/popover'
import type { ResultProps as ResultSubProps, ResultStatus as ResultSubStatus } from '@maple-design/ui-vue/result'
import type { RangeInputAttributes as TimeRangeInputAttributes } from '@maple-design/ui-vue/time-range'

const pausedNotice: NoticeBarProps = { scrollable: true, paused: true }
const subpathNotice: NoticeBarSubProps = pausedNotice
// @ts-expect-error Paused is a boolean prop.
const invalidPausedNotice: NoticeBarProps = { paused: 'yes' }
void [subpathNotice, invalidPausedNotice]

const popupGuard: PopupBeforeClose = ({ reason }, done, { signal }) => {
  const currentReason: PopupCloseReason = reason
  void [currentReason, signal]
  done(true)
}
const popupConfig: PopupProps = { beforeClose: popupGuard, swipeToClose: true, swipeThreshold: 40, dir: 'rtl' }
function popupCommands(instance: PopupInstance, event: Event) {
  const api: Promise<boolean> = instance.close(event)
  const swipe: Promise<boolean> = instance.requestClose('swipe', event)
  // @ts-expect-error Unknown close reasons are not accepted.
  instance.requestClose('unknown')
  return [api, swipe]
}
void [popupConfig, popupCommands]

const cleared: SelectValue = undefined
const empty: SelectValue = ''
const multiple: SelectValue = [false, 0, { id: 'a' }]
const select: SelectProps = { modelValue: cleared, emptyValue: () => undefined }
function acceptsClear(instance: SelectInstance) {
  instance.$emit('change', cleared)
  instance.$emit('update:modelValue', cleared)
}
// @ts-expect-error Dates/functions are not part of the Select scalar value contract.
const invalid: SelectValue = () => 1
void [empty, multiple, select, acceptsClear, invalid]

const loadingBarOptions: LoadingBarOptions = { color: 'red', height: 3, finishDelay: 500 }
const loadingBarSubOptions: LoadingBarSubOptions = loadingBarOptions
// @ts-expect-error Service options do not accept internal progress state.
const invalidLoadingBarOptions: LoadingBarOptions = { value: 42 }
void [loadingBarSubOptions, invalidLoadingBarOptions]
const resultStatus: ResultRootStatus = '500'
const resultSubStatus: ResultSubStatus = resultStatus
const resultProps: ResultRootProps = { status: resultSubStatus, imageSize: 64, animation: false }
const resultSubProps: ResultSubProps = resultProps
// @ts-expect-error Invalid status is not accepted.
const invalidResultStatus: ResultRootStatus = 'offline'
void [resultSubProps, invalidResultStatus]
const popoverSettings: PopoverRootProps = { content: 'Details', autoFitTransformOrigin: false, animationName: 'custom' }
function popoverApi(instance: PopoverRootInstance, reference: HTMLElement) {
  instance.open()
  instance.close()
  instance.resize()
  instance.allowClose()
  instance.getReference()
  instance.focusReference()
  instance.setReference(reference)
  const sub: PopoverSubInstance = instance
  // @ts-expect-error The wrapper does not expose Trigger's internal top-layer check.
  instance.isTopLayer()
  return sub
}
void [popoverSettings, popoverApi]

const hoverOverlayConfig: HoverOverlayProps = { hovering: true, focusing: false }
const hoverHelpers = useHoverOverlay()
hoverHelpers.handleHovering(true)
const hoverState: boolean = hoverHelpers.hovering.value
void [hoverOverlayConfig, hoverOverlayProps, hoverState]

const sheetOptions: ActionSheetOptions = {
  beforeClose: ({ reason }) => reason !== 'route',
  swipeToClose: true,
  swipeThreshold: 45,
  onCloseError: (error, reason) => {
    void [error, reason]
  },
}
// @ts-expect-error Swipe threshold is numeric.
const invalidSheetOptions: ActionSheetOptions = { swipeThreshold: 'large' }
void [sheetOptions, invalidSheetOptions]
const rangeInput: RangeInputAttributes = {
  'aria-label': 'Start',
  onKeydownOnce: (event: KeyboardEvent) => event.preventDefault(),
}
const dateRangeInput: DateRangeInputAttributes = rangeInput
const timeRangeInput: TimeRangeInputAttributes = rangeInput
const dateRangeProps: DateRangeProps = { inputAttrs: [dateRangeInput] }
const timeRangeProps: TimeRangeProps = { inputAttrs: [timeRangeInput] }
void [dateRangeProps, timeRangeProps]
