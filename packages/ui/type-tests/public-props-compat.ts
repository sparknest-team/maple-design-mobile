import type {
  Ref as CompatibleRef,
  ExtractPublicPropTypes,
  App as HoverAppCompat,
  ObjectDirective as HoverDirectiveCompat,
  UnwrapRef as UnwrapShallowCompat,
  VNode as VNodeSlotCompat,
  InputHTMLAttributes as VueInputAttributesCompat,
  UnwrapNestedRefs as VueReactiveShape,
  ShallowRef as VueShallowCompat,
  Slot as VueSlotCompat,
  StyleValue as VueStyleValueCompat,
} from 'vue'
import type { CompatibleReactive } from '../src/_utils/compatible-reactive'
import type { CompatibleShallowRef } from '../src/_utils/compatible-shallow-ref'
import type { CompatiblePublicProps } from '../src/_utils/public-props'
import type { CompatibleStyleValue } from '../src/_utils/style-value'
import * as Remaining0 from '../src/action-sheet/props'
import * as M0 from '../src/alert/props'
import { Avatar as Compound0 } from '../src/avatar'
import RawCompound0 from '../src/avatar/Avatar.vue'
import CompoundChild0 from '../src/avatar/AvatarGroup.vue'
import * as M1 from '../src/avatar/props'
import * as BackTopCompat from '../src/back-top/props'
import * as M2 from '../src/badge/props'
import * as M3 from '../src/breadcrumb/props'
import { Button as Compound1 } from '../src/button'
import RawCompound1 from '../src/button/base'
import CompoundChild1 from '../src/button/ButtonGroup.vue'
import * as M5 from '../src/button/group-props'
import * as M4 from '../src/button/props'
import * as M6 from '../src/card/props'
import * as M7 from '../src/carousel/props'
import type { CascaderController } from '../src/cascader/use-cascader-controller'
import * as Remaining1 from '../src/cell/props'
import * as Remaining2 from '../src/code/props'
import { Col as Entry0 } from '../src/col'
import RawEntry0 from '../src/col/Col.vue'
import Compound2 from '../src/collapse'
import RawCompound2 from '../src/collapse/Collapse.vue'
import CompoundChild2 from '../src/collapse/CollapseItem.vue'
import * as M8 from '../src/collapse/props'
import * as Shared0 from '../src/count-to/props'
import * as Shared1 from '../src/countdown/props'
import * as Temporal1 from '../src/date-range/picker-props'
import * as Temporal5 from '../src/date-range/presentation-props'
import * as Temporal4 from '../src/date-range/props'
import * as Temporal0 from '../src/date/picker-props'
import * as Temporal3 from '../src/date/props'
import * as M9 from '../src/divider/props'
import * as Shared2 from '../src/empty/props'
import * as Remaining3 from '../src/fab/props'
import * as Temporal2 from '../src/field-decorator/props'
import * as Temporal13 from '../src/form-details/props'
import * as Temporal12 from '../src/form/item-props'
import * as Temporal11 from '../src/form/props'
import { Grid as EntryGrid, GridItem as EntryGridItem } from '../src/grid'
import RawGrid from '../src/grid/Grid.vue'
import RawGridItem from '../src/grid/GridItem.vue'
import * as M11 from '../src/grid/item-props'
import * as M10 from '../src/grid/props'
import * as Remaining4 from '../src/highlighter-provider/props'
import {
  HoverOverlay as hoverOverlayCompat,
  _HoverComponent as hoverPluginCompat,
  useHoverOverlay as hoverRefProbe,
} from '../src/hover'
import * as Remaining5 from '../src/hover/overlay-props'
import * as Remaining7 from '../src/index-bar/anchor-props'
import * as Remaining6 from '../src/index-bar/props'
import type { InputProps as EnterHintInputProps } from '../src/input/props'
import * as Shared3 from '../src/list/props'
import * as Remaining8 from '../src/loading-bar/props'
import * as Overlay7 from '../src/loading/props'
import * as Remaining9 from '../src/locale-provider/props'
import { useLocale as localeRefProbe } from '../src/locale/state'
import * as Overlay4 from '../src/menu/option-props'
import * as Overlay3 from '../src/menu/props'
import * as Overlay5 from '../src/message/props'
import * as Shared5 from '../src/nav-menu/item-props'
import * as Shared4 from '../src/nav-menu/props'
import * as Remaining10 from '../src/notice-bar/props'
import * as Remaining11 from '../src/number-keyboard/props'
import * as Overlay6 from '../src/overlay/props'
import * as Shared6 from '../src/page-header/props'
import * as Shared7 from '../src/pagination/props'
import * as Temporal10 from '../src/picker/props'
import * as Overlay0 from '../src/popover/props'
import * as PopupExtra from '../src/popup/props'
import * as Overlay8 from '../src/progress-group/props'
import * as M12 from '../src/progress/props'
import * as Remaining12 from '../src/pull-refresh/props'
import * as Overlay10 from '../src/rate/props'
import * as Shared8 from '../src/result/props'
import { Row as Entry1 } from '../src/row'
import RawEntry1 from '../src/row/Row.vue'
import * as Remaining13 from '../src/safe-area/props'
import type { SearchControl } from '../src/search/use-search-control'
import type { SelectController } from '../src/select/use-select-controller'
import * as Remaining14 from '../src/signature/props'
import * as M13 from '../src/skeleton/props'
import * as Overlay11 from '../src/slider/props'
import * as M14 from '../src/space/props'
import * as Overlay9 from '../src/split-button/props'
import * as Shared9 from '../src/statistic/props'
import { Steps as Compound3 } from '../src/steps'
import * as Shared10 from '../src/steps/props'
import CompoundChild3 from '../src/steps/Step.vue'
import RawCompound3 from '../src/steps/Steps'
import * as Remaining15 from '../src/swipe-cell/props'
import * as Overlay12 from '../src/switch/props'
import * as Remaining17 from '../src/tab-bar/item-props'
import * as Remaining16 from '../src/tab-bar/props'
import * as Shared11 from '../src/table/props'
import { ThemeProvider as Entry2 } from '../src/theme-provider'
import * as Shared12 from '../src/theme-provider/props'
import RawEntry2 from '../src/theme-provider/ThemeProvider.vue'
import * as Temporal9 from '../src/time-range/picker-props'
import * as Temporal8 from '../src/time-range/props'
import * as Temporal7 from '../src/time/picker-props'
import * as Temporal6 from '../src/time/props'
import { useTimePanel as timePanelProbe } from '../src/time/use-time-panel'
import * as Overlay1 from '../src/tooltip/props'
import * as Overlay2 from '../src/trigger/props'
import {
  useTriggerReference as triggerRefProbe,
  useTriggerTarget as triggerTargetProbe,
  type TriggerElement as TriggerElementProbe,
  type Reference as TriggerReferenceProbe,
} from '../src/trigger/reference'
import { useUploader as uploaderCompatProbe } from '../src/upload/composables/use-uploader'
import type {
  UploadFileItem as CompatFile,
  UploadRejectedFile as CompatRejected,
  UploadStatus as CompatStatus,
} from '../src/upload/interfaces'
import * as Shared13 from '../src/upload/props'
import {
  ComponentWithInstall as EntryInstall,
  useTeleport as teleportRefProbe,
  ComponentWithInstall as ThemeEntryInstall,
  useValidation as validationRefProbe,
  type ValidationRule as CompatValidationRule,
} from '../src/utils/components'
import * as Shared14 from '../src/verification-code/props'
import * as Remaining18 from '../src/watermark/props'

type Assert<T extends true> = T
type Same<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
type DifferentFields<A, B> = {
  [K in keyof A]-?: K extends keyof B ? (Same<A[K], B[K]> extends true ? never : K) : K
}[keyof A]
type Matches<P> =
  Same<keyof ExtractPublicPropTypes<P>, keyof CompatiblePublicProps<P>> extends true
    ? DifferentFields<ExtractPublicPropTypes<P>, CompatiblePublicProps<P>> extends never
      ? [ExtractPublicPropTypes<P>] extends [CompatiblePublicProps<P>]
        ? [CompatiblePublicProps<P>] extends [ExtractPublicPropTypes<P>]
          ? true
          : false
        : false
      : false
    : false
export type PublicShape0 = Assert<Matches<typeof M0.alertProps>>
export type PublicShape1 = Assert<Matches<typeof M1.avatarProps>>
export type PublicShape2 = Assert<Matches<typeof M1.avatarGroupProps>>
export type PublicShape3 = Assert<Matches<typeof M2.badgeProps>>
export type PublicShape4 = Assert<Matches<typeof M3.breadcrumbProps>>
export type PublicShape5 = Assert<Matches<typeof M3.breadcrumbItemProps>>
export type PublicShape6 = Assert<Matches<typeof M4.buttonProps>>
export type PublicShape7 = Assert<Matches<typeof M5.buttonGroupProps>>
export type PublicShape8 = Assert<Matches<typeof M6.cardProps>>
export type PublicShape9 = Assert<Matches<typeof M7.carouselProps>>
export type PublicShape10 = Assert<Matches<typeof M7.carouselItemProps>>
export type PublicShape11 = Assert<Matches<typeof M8.collapseProps>>
export type PublicShape12 = Assert<Matches<typeof M8.collapseItemProps>>
export type PublicShape13 = Assert<Matches<typeof M9.dividerProps>>
export type PublicShape14 = Assert<Matches<typeof M10.gridProps>>
export type PublicShape15 = Assert<Matches<typeof M11.gridItemProps>>
export type PublicShape16 = Assert<Matches<typeof M12.progressProps>>
export type PublicShape17 = Assert<Matches<typeof M13.skeletonProps>>
export type PublicShape18 = Assert<Matches<typeof M13.skeletonLineProps>>
export type PublicShape19 = Assert<Matches<typeof M13.skeletonShapeProps>>
export type PublicShape20 = Assert<Matches<typeof M14.spaceProps>>
export type OverlayShape0 = Assert<Matches<typeof Overlay0.popoverProps>>
export type OverlayShape1 = Assert<Matches<typeof Overlay1.tooltipProps>>
export type OverlayShape2 = Assert<Matches<typeof Overlay2.triggerProps>>
export type OverlayShape3 = Assert<Matches<typeof Overlay3.menuProps>>
export type OverlayShape4 = Assert<Matches<typeof Overlay4.menuOptionProps>>
export type OverlayShape5 = Assert<Matches<typeof Overlay5.messageProps>>
export type OverlayShape6 = Assert<Matches<typeof Overlay6.overlayProps>>
export type OverlayShape7 = Assert<Matches<typeof Overlay7.loadingProps>>
export type OverlayShape8 = Assert<Matches<typeof Overlay8.progressGroupProps>>
export type OverlayShape9 = Assert<Matches<typeof Overlay9.splitButtonProps>>
export type OverlayShape10 = Assert<Matches<typeof Overlay10.rateProps>>
export type OverlayShape11 = Assert<Matches<typeof Overlay11.sliderProps>>
export type OverlayShape12 = Assert<Matches<typeof Overlay12.switchProps>>
export type PopupShape = Assert<Matches<typeof PopupExtra.popupProps>>
export type TemporalShape0 = Assert<Matches<typeof Temporal0.props>>
export type TemporalShape1 = Assert<Matches<typeof Temporal1.props>>
export type TemporalShape2 = Assert<Matches<typeof Temporal2.fieldLoadingProps>>
export type TemporalShape3 = Assert<Matches<typeof Temporal2.fieldDecoratorProps>>
export type TemporalShape4 = Assert<Matches<typeof Temporal3.props>>
export type TemporalShape5 = Assert<Matches<typeof Temporal4.props>>
export type TemporalShape6 = Assert<Matches<typeof Temporal5.props>>
export type TemporalShape7 = Assert<Matches<typeof Temporal6.props>>
export type TemporalShape8 = Assert<Matches<typeof Temporal7.props>>
export type TemporalShape9 = Assert<Matches<typeof Temporal8.props>>
export type TemporalShape10 = Assert<Matches<typeof Temporal9.props>>
export type TemporalShape11 = Assert<Matches<typeof Temporal10.props>>
export type TemporalShape12 = Assert<Matches<typeof Temporal11.props>>
export type TemporalShape13 = Assert<Matches<typeof Temporal12.props>>
export type TemporalShape14 = Assert<Matches<typeof Temporal13.props>>
export type SharedShape0 = Assert<Matches<typeof Shared0.countToProps>>
export type SharedShape1 = Assert<Matches<typeof Shared1.countdownProps>>
export type SharedShape2 = Assert<Matches<typeof Shared2.emptyProps>>
export type SharedShape3 = Assert<Matches<typeof Shared3.listProps>>
export type SharedShape4 = Assert<Matches<typeof Shared4.navMenuProps>>
export type SharedShape5 = Assert<Matches<typeof Shared5.navMenuItemProps>>
export type SharedShape6 = Assert<Matches<typeof Shared6.pageHeaderProps>>
export type SharedShape7 = Assert<Matches<typeof Shared7.paginationProps>>
export type SharedShape8 = Assert<Matches<typeof Shared8.resultProps>>
export type SharedShape9 = Assert<Matches<typeof Shared9.statisticProps>>
export type SharedShape10 = Assert<Matches<typeof Shared10.stepsProps>>
export type SharedShape11 = Assert<Matches<typeof Shared11.props>>
export type SharedShape12 = Assert<Matches<typeof Shared12.themeProviderProps>>
export type SharedShape13 = Assert<Matches<typeof Shared13.uploadProps>>
export type SharedShape14 = Assert<Matches<typeof Shared14.verificationCodeProps>>

export type SharedStepShape = Assert<Matches<Omit<typeof Shared10.stepProps, 'internalIndex' | 'internalNextStatus'>>>
export type RemainingShape0 = Assert<Matches<typeof Remaining0.props>>
export type RemainingShape1 = Assert<Matches<typeof Remaining1.props>>
export type RemainingShape2 = Assert<Matches<typeof Remaining2.props>>
export type RemainingShape3 = Assert<Matches<typeof Remaining3.props>>
export type RemainingShape4 = Assert<Matches<typeof Remaining4.props>>
export type RemainingShape5 = Assert<Matches<typeof Remaining5.props>>
export type RemainingShape6 = Assert<Matches<typeof Remaining6.props>>
export type RemainingShape7 = Assert<Matches<typeof Remaining7.props>>
export type RemainingShape8 = Assert<Matches<typeof Remaining8.props>>
export type RemainingShape9 = Assert<Matches<typeof Remaining9.props>>
export type RemainingShape10 = Assert<Matches<typeof Remaining10.props>>
export type RemainingShape11 = Assert<Matches<typeof Remaining11.props>>
export type RemainingShape12 = Assert<Matches<typeof Remaining12.pullRefreshProps>>
export type RemainingShape13 = Assert<Matches<typeof Remaining13.safeAreaProps>>
export type RemainingShape14 = Assert<Matches<typeof Remaining14.props>>
export type RemainingShape15 = Assert<Matches<typeof Remaining15.props>>
export type RemainingShape16 = Assert<Matches<typeof Remaining16.props>>
export type RemainingShape17 = Assert<Matches<typeof Remaining17.props>>
export type RemainingShape18 = Assert<Matches<typeof Remaining18.watermarkProps>>
export type BackTopShape = Assert<Matches<typeof BackTopCompat.backTopProps>>
export type HoverRefContract = Assert<
  Same<ReturnType<typeof hoverRefProbe>, { hovering: CompatibleRef<boolean>; handleHovering: (value: boolean) => void }>
>
type LocaleRefProbe = {
  messages: CompatibleRef<Record<string, Partial<{ label: string }>>>
  currentMessage: CompatibleRef<Partial<{ label: string }>>
  add: (lang: string, message: Partial<{ label: string }> & { lang?: string }) => void
  use: (lang: string) => {} | undefined
  merge: (lang: string, message: Partial<{ label: string }>) => void
  t: (id: string) => string | undefined
}
export type LocaleRefContract = Assert<Same<ReturnType<typeof localeRefProbe<{ label: string }>>, LocaleRefProbe>>
export type TeleportRefContract = Assert<
  Same<ReturnType<typeof teleportRefProbe>, { disabled: CompatibleRef<boolean> }>
>
type ValidationProbe = {
  errorMessage: CompatibleRef<string>
  validate: (
    rules: CompatValidationRule | CompatValidationRule[] | undefined,
    value: unknown,
    apis?: unknown,
  ) => Promise<boolean>
  resetValidation: () => void
  validateWithTrigger: <T>(
    triggers: T[],
    trigger: T,
    rules: CompatValidationRule | CompatValidationRule[] | undefined,
    value: unknown,
    apis?: unknown,
  ) => Promise<void>
}
export type ValidationRefContract = Assert<Same<ReturnType<typeof validationRefProbe>, ValidationProbe>>
type CompatUploader = {
  chooseFile: () => Promise<void>
  replacementTarget: import('vue').Ref<CompatFile | undefined>
  cancelChoose: () => void
  replace: (file: CompatFile, replacement?: File) => Promise<void>
  retainUrls: (uids: string[]) => () => void
  addFiles: (files: File[], initialRejected?: CompatRejected[]) => Promise<void>
  submit: (file?: CompatFile) => Promise<void>
  abort: (file?: CompatFile) => void
  retry: (file: CompatFile) => Promise<void>
  remove: (file: CompatFile) => Promise<void>
  preview: (file: CompatFile, originalEvent?: MouseEvent) => void
  reset: () => void
  clearSuccess: () => void
  clearError: () => void
  getFiles: (status?: CompatStatus) => CompatFile[]
  inputRef: import('vue').Ref<HTMLInputElement | undefined>
  dragOver: import('vue').Ref<boolean>
  handleInputChange: (event: Event) => void
  handleDragOver: (event: DragEvent) => void
  handleDragLeave: () => void
  handleDrop: (event: DragEvent) => void
  guardPending: import('vue').ComputedRef<boolean>
  editorPending: import('vue').ComputedRef<boolean>
  fileList: import('vue').ComputedRef<CompatFile[]>
  maxReached: import('vue').ComputedRef<boolean>
  disabled: import('vue').ComputedRef<boolean>
}
export type UploaderReturnContract = Assert<Same<ReturnType<typeof uploaderCompatProbe>, CompatUploader>>
type ExplicitSlotProbe<T> = (props: T) => VNodeSlotCompat[]
export type ImageSlotCompatContract = Assert<
  Same<
    VueSlotCompat<{ imageNumber: number; length: number }>,
    ExplicitSlotProbe<{ imageNumber: number; length: number }>
  >
>
type HoverPluginShape = HoverDirectiveCompat & { install: (app: HoverAppCompat, ...options: any[]) => any } & {
  Overlay: typeof hoverOverlayCompat
  install(app: HoverAppCompat): void
}
export type HoverPluginCompatContract = Assert<Same<typeof hoverPluginCompat, HoverPluginShape>>
type ShallowTestValue = { nested: import('vue').Ref<number> }
type Mutual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
export type ShallowRefCompatContract = Assert<
  Mutual<CompatibleShallowRef<ShallowTestValue>, VueShallowCompat<ShallowTestValue>>
>
export type ShallowUnwrapCompatContract = Assert<
  Same<
    UnwrapShallowCompat<CompatibleShallowRef<ShallowTestValue>>,
    UnwrapShallowCompat<VueShallowCompat<ShallowTestValue>>
  >
>
export type ShallowUnknownCompatContract = Assert<Mutual<CompatibleShallowRef<unknown>, VueShallowCompat<unknown>>>
export type ShallowUndefinedCompatContract = Assert<
  Mutual<CompatibleShallowRef<string | undefined>, VueShallowCompat<string | undefined>>
>
type TriggerRefProbe = {
  nodes: { value: import('vue').VNode[] }
  element: CompatibleShallowRef<TriggerElementProbe | undefined>
}
type TriggerTargetProbe = {
  element: CompatibleShallowRef<TriggerElementProbe | undefined>
  getReference: () => TriggerElementProbe | undefined
  setReference: (target?: TriggerReferenceProbe) => void
}
export type TriggerShallowContract = Assert<Mutual<ReturnType<typeof triggerRefProbe>, TriggerRefProbe>>
export type TriggerTargetShallowContract = Assert<Mutual<ReturnType<typeof triggerTargetProbe>, TriggerTargetProbe>>
export type TimeShallowContract = Assert<
  Mutual<ReturnType<typeof timePanelProbe<string>>['draft'], CompatibleShallowRef<string | undefined>>
>
export type EntryAliasCol = Assert<Same<typeof Entry0, EntryInstall<typeof RawEntry0>>>
export type EntryAliasRow = Assert<Same<typeof Entry1, EntryInstall<typeof RawEntry1>>>
export type EntryAliasThemeProvider = Assert<Same<typeof Entry2, ThemeEntryInstall<typeof RawEntry2>>>
export type EntryAliasGridItem = Assert<Same<typeof EntryGridItem, EntryInstall<typeof RawGridItem>>>
export type EntryAliasGrid = Assert<
  Same<typeof EntryGrid, EntryInstall<typeof RawGrid & { Item: typeof EntryGridItem }>>
>
export type EntryAliasAvatar = Assert<
  Same<typeof Compound0, EntryInstall<typeof RawCompound0 & { Group: typeof CompoundChild0 }>>
>
export type EntryAliasButton = Assert<
  Same<typeof Compound1, EntryInstall<typeof RawCompound1 & { Group: typeof CompoundChild1 }>>
>
export type EntryAliasCollapse = Assert<
  Same<typeof Compound2, EntryInstall<typeof RawCompound2 & { Item: typeof CompoundChild2 }>>
>
export type EntryAliasSteps = Assert<
  Same<typeof Compound3, EntryInstall<typeof RawCompound3 & { Step: typeof CompoundChild3 }>>
>

export type EntryMoreAutoComplete = Assert<
  Same<
    typeof import('../src/auto-complete').AutoComplete,
    EntryInstall<typeof import('../src/auto-complete/presentation').default>
  >
>

export type EntryMoreInputTag = Assert<
  Same<typeof import('../src/input-tag').InputTag, EntryInstall<typeof import('../src/input-tag/presentation').default>>
>

export type EntryMoreMention = Assert<
  Same<typeof import('../src/mention').Mention, EntryInstall<typeof import('../src/mention/presentation').default>>
>

export type EntryMorePeopleSelect = Assert<
  Same<
    typeof import('../src/people-select').PeopleSelect,
    EntryInstall<typeof import('../src/people-select/PeopleSelect').default>
  >
>
export type EntryMoreCascader = Assert<
  Same<
    typeof import('../src/cascader').Cascader,
    EntryInstall<
      typeof import('../src/cascader/presentation').default & {
        CascaderPanel: typeof import('../src/cascader/CascaderPanel.vue').default
      }
    >
  >
>
export type EntryMoreDate = Assert<
  Same<
    typeof import('../src/date').Date,
    EntryInstall<
      typeof import('../src/date/presentation').default & { Picker: typeof import('../src/date').DatePicker }
    >
  >
>
export type EntryMoreDateRange = Assert<
  Same<
    typeof import('../src/date-range').DateRange,
    EntryInstall<
      typeof import('../src/date-range/presentation').default & {
        Picker: typeof import('../src/date-range').DateRangePicker
      }
    >
  >
>
export type EntryMoreTime = Assert<
  Same<
    typeof import('../src/time').Time,
    EntryInstall<
      typeof import('../src/time/presentation').default & { Picker: typeof import('../src/time').TimePicker }
    >
  >
>
export type EntryMoreTimeRange = Assert<
  Same<
    typeof import('../src/time-range').TimeRange,
    EntryInstall<
      typeof import('../src/time-range/presentation').default & {
        Picker: typeof import('../src/time-range').TimeRangePicker
      }
    >
  >
>
export type EntryMoreNavMenu = Assert<
  Same<
    typeof import('../src/nav-menu').NavMenu,
    EntryInstall<
      typeof import('../src/nav-menu/NavMenu').default & { Item: typeof import('../src/nav-menu').NavMenuItem }
    >
  >
>
export type EntryMoreSelect = Assert<
  Same<
    typeof import('../src/select').Select,
    EntryInstall<
      typeof import('../src/select/select').default & {
        Option: typeof import('../src/select/Option.vue').default
        OptGroup: typeof import('../src/select/Optgroup.vue').default
      }
    >
  >
>

export type EntryFinalList = Assert<
  Same<
    typeof import('../src/list').List,
    EntryInstall<typeof import('../src/list/List.vue').default & { Item: typeof import('../src/list').ListItem }>
  >
>
export type EntryFinalImage = Assert<
  Same<
    typeof import('../src/image').Image,
    EntryInstall<
      typeof import('../src/image/Image.vue').default & {
        Preview: typeof import('../src/image').ImagePreview
        PreviewGroup: typeof import('../src/image').ImagePreviewGroup
        preview: typeof import('../src/image').previewImage
      }
    >
  >
>
export type EntryFinalIndexBar = Assert<
  Same<
    typeof import('../src/index-bar').IndexBar,
    EntryInstall<
      typeof import('../src/index-bar/IndexBar.vue').default & { Anchor: typeof import('../src/index-bar').IndexAnchor }
    >
  >
>
export type EntryFinalTabBar = Assert<
  Same<
    typeof import('../src/tab-bar').TabBar,
    EntryInstall<
      typeof import('../src/tab-bar/TabBar.vue').default & { Item: typeof import('../src/tab-bar').TabBarItem }
    >
  >
>
export type EntryFinalSafeArea = Assert<
  Same<
    typeof import('../src/safe-area').SafeArea,
    EntryInstall<typeof import('../src/safe-area/SafeArea.vue').default> & {
      setInsets: typeof import('../src/safe-area/insets').setSafeAreaInsets
    }
  >
>
export type EntryFinalScrollbar = Assert<
  Same<
    typeof import('../src/_components/selection-scrollbar').Scrollbar,
    EntryInstall<typeof import('../src/_components/selection-scrollbar/Scrollbar.vue').default>
  >
>

type PickerServiceProbe = ((
  options:
    | import('../src/picker').PickerOptions
    | import('../src/picker').PickerColumnOption[]
    | import('../src/picker').PickerColumnOption[][],
) => Promise<import('../src/picker').PickerResolvedData>) & {
  close: () => void
  Component: EntryInstall<typeof import('../src/picker/base').default>
}
export type PickerServiceAliasContract = Assert<
  Mutual<typeof import('../src/picker').default, EntryInstall<PickerServiceProbe>>
>

export type ReactiveControllerSelect = Assert<
  Same<VueReactiveShape<SelectController>, CompatibleReactive<SelectController>>
>
export type ReactiveControllerCascader = Assert<
  Same<VueReactiveShape<CascaderController>, CompatibleReactive<CascaderController>>
>
export type ReactiveControllerSearch = Assert<Same<VueReactiveShape<SearchControl>, CompatibleReactive<SearchControl>>>

type TriggerCompatBefore = import('../src/_utils/public-props').CompatiblePublicProps<
  typeof import('../src/trigger/props').triggerProps
>
type TriggerClassValue = string | unknown[] | Record<string, any>
type TriggerClassKeys = 'popupClass' | 'contentClass' | 'arrowClass' | 'openedClass'
type TriggerCompatCandidate = Omit<TriggerCompatBefore, TriggerClassKeys> &
  Partial<Record<TriggerClassKeys, TriggerClassValue>>
export type TriggerClassAliasContract = Assert<Mutual<TriggerCompatBefore, TriggerCompatCandidate>>
export type TriggerClassFields = Assert<Same<TriggerCompatBefore['popupClass'], TriggerClassValue | undefined>>
export type TriggerClassContent = Assert<Same<TriggerCompatBefore['contentClass'], TriggerClassValue | undefined>>
export type TriggerClassArrow = Assert<Same<TriggerCompatBefore['arrowClass'], TriggerClassValue | undefined>>
export type TriggerClassOpened = Assert<Same<TriggerCompatBefore['openedClass'], TriggerClassValue | undefined>>

type CompatibleStyleValueContract = Assert<Mutual<CompatibleStyleValue, VueStyleValueCompat>>

type EnterHintContract = Assert<Same<EnterHintInputProps['enterkeyhint'], VueInputAttributesCompat['enterKeyHint']>>
