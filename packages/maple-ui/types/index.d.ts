import type { App } from 'vue'

export const version: string
export const install: (app: App) => void

export * from './actionSheet'
export * from './alert'
export * from './appBar'
export * from './autoComplete'
export * from './avatar'
export * from './avatarGroup'
export * from './backTop'
export * from './badge'
export * from './bottomNavigation'
export * from './bottomNavigationItem'
export * from './breadcrumb'
export * from './breadcrumbs'
export * from './button'
export * from './buttonGroup'
export * from './card'
export * from './cell'
export * from './checkbox'
export * from './checkboxGroup'
export * from './chip'
export * from './code'
export * from './col'
export * from './collapse'
export * from './collapseItem'
export * from './collapseTransition'
export * from './context'
export * from './countTo'
export * from './countdown'
export * from './counter'
export * from './datePicker'
export * from './dialog'
export * from './divider'
export * from './drag'
export * from './ellipsis'
export * from './fab'
export * from './floatingPanel'
export * from './form'
export * from './formDetails'
export * from './highlighterProvider'
export * from './hover'
export * from './hoverOverlay'
export * from './icon'
export * from './image'
export * from './imagePreview'
export * from './indexAnchor'
export * from './indexBar'
export * from './input'
export * from './lazy'
export * from './link'
export * from './list'
export * from './loading'
export * from './loadingBar'
export * from './locale'
export * from './localeProvider'
export * from './menu'
export * from './menuOption'
export * from './menuSelect'
export * from './option'
export * from './overlay'
export * from './pagination'
export * from './paper'
export * from './picker'
export * from './popup'
export * from './progress'
export * from './pullRefresh'
export * from './radio'
export * from './radioGroup'
export * from './rate'
export * from './result'
export * from './ripple'
export * from './row'
export * from './select'
export * from './signature'
export * from './skeleton'
export * from './slider'
export * from './snackbar'
export * from './space'
export * from './step'
export * from './steps'
export * from './sticky'
export * from './styleProvider'
export * from './styleVars'
export * from './swipe'
export * from './swipeItem'
export * from './switch'
export * from './tab'
export * from './tabItem'
export * from './table'
export * from './tabs'
export * from './tabsItems'
export * from './themes'
export * from './timePicker'
export * from './tooltip'
export * from './uploader'
export * from './varComponent'
export * from './varDirective'
export * from './watermark'

declare module 'vue' {
  export interface GlobalComponents {
    MpActionSheet: typeof import('@maplejs/maple-ui')['_ActionSheetComponent']
    MpAlert: typeof import('@maplejs/maple-ui')['_AlertComponent']
    MpAppBar: typeof import('@maplejs/maple-ui')['_AppBarComponent']
    MpAutoComplete: typeof import('@maplejs/maple-ui')['_AutoCompleteComponent']
    MpAvatar: typeof import('@maplejs/maple-ui')['_AvatarComponent']
    MpAvatarGroup: typeof import('@maplejs/maple-ui')['_AvatarGroupComponent']
    MpBackTop: typeof import('@maplejs/maple-ui')['_BackTopComponent']
    MpBadge: typeof import('@maplejs/maple-ui')['_BadgeComponent']
    MpBottomNavigation: typeof import('@maplejs/maple-ui')['_BottomNavigationComponent']
    MpBottomNavigationItem: typeof import('@maplejs/maple-ui')['_BottomNavigationItemComponent']
    MpBreadcrumb: typeof import('@maplejs/maple-ui')['_BreadcrumbComponent']
    MpBreadcrumbs: typeof import('@maplejs/maple-ui')['_BreadcrumbsComponent']
    MpButton: typeof import('@maplejs/maple-ui')['_ButtonComponent']
    MpButtonGroup: typeof import('@maplejs/maple-ui')['_ButtonGroupComponent']
    MpCard: typeof import('@maplejs/maple-ui')['_CardComponent']
    MpCell: typeof import('@maplejs/maple-ui')['_CellComponent']
    MpCheckbox: typeof import('@maplejs/maple-ui')['_CheckboxComponent']
    MpCheckboxGroup: typeof import('@maplejs/maple-ui')['_CheckboxGroupComponent']
    MpChip: typeof import('@maplejs/maple-ui')['_ChipComponent']
    MpCode: typeof import('@maplejs/maple-ui')['_CodeComponent']
    MpCol: typeof import('@maplejs/maple-ui')['_ColComponent']
    MpCollapse: typeof import('@maplejs/maple-ui')['_CollapseComponent']
    MpCollapseItem: typeof import('@maplejs/maple-ui')['_CollapseItemComponent']
    MpCollapseTransition: typeof import('@maplejs/maple-ui')['_CollapseTransitionComponent']
    MpContext: typeof import('@maplejs/maple-ui')['_ContextComponent']
    MpCountTo: typeof import('@maplejs/maple-ui')['_CountToComponent']
    MpCountdown: typeof import('@maplejs/maple-ui')['_CountdownComponent']
    MpCounter: typeof import('@maplejs/maple-ui')['_CounterComponent']
    MpDatePicker: typeof import('@maplejs/maple-ui')['_DatePickerComponent']
    MpDialog: typeof import('@maplejs/maple-ui')['_DialogComponent']
    MpDivider: typeof import('@maplejs/maple-ui')['_DividerComponent']
    MpDrag: typeof import('@maplejs/maple-ui')['_DragComponent']
    MpEllipsis: typeof import('@maplejs/maple-ui')['_EllipsisComponent']
    MpFab: typeof import('@maplejs/maple-ui')['_FabComponent']
    MpFloatingPanel: typeof import('@maplejs/maple-ui')['_FloatingPanelComponent']
    MpForm: typeof import('@maplejs/maple-ui')['_FormComponent']
    MpFormDetails: typeof import('@maplejs/maple-ui')['_FormDetailsComponent']
    MpHighlighterProvider: typeof import('@maplejs/maple-ui')['_HighlighterProviderComponent']
    MpHoverOverlay: typeof import('@maplejs/maple-ui')['_HoverOverlayComponent']
    MpIcon: typeof import('@maplejs/maple-ui')['_IconComponent']
    MpImage: typeof import('@maplejs/maple-ui')['_ImageComponent']
    MpImagePreview: typeof import('@maplejs/maple-ui')['_ImagePreviewComponent']
    MpIndexAnchor: typeof import('@maplejs/maple-ui')['_IndexAnchorComponent']
    MpIndexBar: typeof import('@maplejs/maple-ui')['_IndexBarComponent']
    MpInput: typeof import('@maplejs/maple-ui')['_InputComponent']
    MpLink: typeof import('@maplejs/maple-ui')['_LinkComponent']
    MpList: typeof import('@maplejs/maple-ui')['_ListComponent']
    MpLoading: typeof import('@maplejs/maple-ui')['_LoadingComponent']
    MpLoadingBar: typeof import('@maplejs/maple-ui')['_LoadingBarComponent']
    MpLocale: typeof import('@maplejs/maple-ui')['_LocaleComponent']
    MpLocaleProvider: typeof import('@maplejs/maple-ui')['_LocaleProviderComponent']
    MpMenu: typeof import('@maplejs/maple-ui')['_MenuComponent']
    MpMenuOption: typeof import('@maplejs/maple-ui')['_MenuOptionComponent']
    MpMenuSelect: typeof import('@maplejs/maple-ui')['_MenuSelectComponent']
    MpOption: typeof import('@maplejs/maple-ui')['_OptionComponent']
    MpOverlay: typeof import('@maplejs/maple-ui')['_OverlayComponent']
    MpPagination: typeof import('@maplejs/maple-ui')['_PaginationComponent']
    MpPaper: typeof import('@maplejs/maple-ui')['_PaperComponent']
    MpPicker: typeof import('@maplejs/maple-ui')['_PickerComponent']
    MpPopup: typeof import('@maplejs/maple-ui')['_PopupComponent']
    MpProgress: typeof import('@maplejs/maple-ui')['_ProgressComponent']
    MpPullRefresh: typeof import('@maplejs/maple-ui')['_PullRefreshComponent']
    MpRadio: typeof import('@maplejs/maple-ui')['_RadioComponent']
    MpRadioGroup: typeof import('@maplejs/maple-ui')['_RadioGroupComponent']
    MpRate: typeof import('@maplejs/maple-ui')['_RateComponent']
    MpResult: typeof import('@maplejs/maple-ui')['_ResultComponent']
    MpRow: typeof import('@maplejs/maple-ui')['_RowComponent']
    MpSelect: typeof import('@maplejs/maple-ui')['_SelectComponent']
    MpSignature: typeof import('@maplejs/maple-ui')['_SignatureComponent']
    MpSkeleton: typeof import('@maplejs/maple-ui')['_SkeletonComponent']
    MpSlider: typeof import('@maplejs/maple-ui')['_SliderComponent']
    MpSnackbar: typeof import('@maplejs/maple-ui')['_SnackbarComponent']
    MpSpace: typeof import('@maplejs/maple-ui')['_SpaceComponent']
    MpStep: typeof import('@maplejs/maple-ui')['_StepComponent']
    MpSteps: typeof import('@maplejs/maple-ui')['_StepsComponent']
    MpSticky: typeof import('@maplejs/maple-ui')['_StickyComponent']
    MpStyleProvider: typeof import('@maplejs/maple-ui')['_StyleProviderComponent']
    MpStyleVars: typeof import('@maplejs/maple-ui')['_StyleVarsComponent']
    MpSwipe: typeof import('@maplejs/maple-ui')['_SwipeComponent']
    MpSwipeItem: typeof import('@maplejs/maple-ui')['_SwipeItemComponent']
    MpSwitch: typeof import('@maplejs/maple-ui')['_SwitchComponent']
    MpTab: typeof import('@maplejs/maple-ui')['_TabComponent']
    MpTabItem: typeof import('@maplejs/maple-ui')['_TabItemComponent']
    MpTable: typeof import('@maplejs/maple-ui')['_TableComponent']
    MpTabs: typeof import('@maplejs/maple-ui')['_TabsComponent']
    MpTabsItems: typeof import('@maplejs/maple-ui')['_TabsItemsComponent']
    MpThemes: typeof import('@maplejs/maple-ui')['_ThemesComponent']
    MpTimePicker: typeof import('@maplejs/maple-ui')['_TimePickerComponent']
    MpTooltip: typeof import('@maplejs/maple-ui')['_TooltipComponent']
    MpUploader: typeof import('@maplejs/maple-ui')['_UploaderComponent']
    MpVarComponent: typeof import('@maplejs/maple-ui')['_VarComponentComponent']
    MpVarDirective: typeof import('@maplejs/maple-ui')['_VarDirectiveComponent']
    MpWatermark: typeof import('@maplejs/maple-ui')['_WatermarkComponent']
  }

  export interface ComponentCustomProperties {
    vHover: typeof import('@maplejs/maple-ui')['_HoverComponent']
    vLazy: typeof import('@maplejs/maple-ui')['_LazyComponent']
    vRipple: typeof import('@maplejs/maple-ui')['_RippleComponent']
  }
}
