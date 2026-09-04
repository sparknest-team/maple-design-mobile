import { StyleVars } from '../../style-provider'
import actionSheet from './actionSheet'
import alert from './alert'
import avatar from './avatar'
import avatarGroup from './avatarGroup'
import backTop from './backTop'
import badge from './badge'
import bottomNavigation from './bottomNavigation'
import bottomNavigationItem from './bottomNavigationItem'
import breadcrumbItem from './breadcrumb-item'
import button from './button'
import card from './card'
import carousel from './carousel'
import cascader from './cascader'
import cell from './cell'
import checkbox from './checkbox'
import code from './code'
import collapse from './collapse'
import countdown from './countdown'
import counter from './counter'
import datePicker from './datePicker'
import dialog from './dialog'
import divider from './divider'
import fab from './fab'
import field from './field'
import floatingPanel from './floatingPanel'
import formDetails from './formDetails'
import hoverOverlay from './hoverOverlay'
import icon from './icon'
import imagePreview from './imagePreview'
import indexBar from './indexBar'
import infiniteScroll from './infiniteScroll'
import input from './input'
import link from './link'
import list from './list'
import loading from './loading'
import loadingBar from './loadingBar'
import menu from './menu'
import menuOption from './menuOption'
import message from './message'
import option from './option'
import overlay from './overlay'
import pagination from './pagination'
import paper from './paper'
import picker from './picker'
import popover from './popover'
import popup from './popup'
import progress from './progress'
import pullRefresh from './pullRefresh'
import radio from './radio'
import rate from './rate'
import result from './result'
import ripple from './ripple'
import select from './select'
import signature from './signature'
import skeleton from './skeleton'
import slider from './slider'
import space from './space'
import statistic from './statistic'
import switchThemes from './switch'
import tab from './tab'
import table from './table'
import tabs from './tabs'
import tag from './tag'
import textarea from './textarea'
import timePicker from './timePicker'
import tooltip from './tooltip'
import uploader from './uploader'
import watermark from './watermark'

export default {
  '--mp-color-scheme': 'light',
  '--mp-font-size-xs': '10px',
  '--mp-font-size-sm': '12px',
  '--mp-font-size-md': '14px',
  '--mp-font-size-lg': '16px',
  '--mp-icon-size-xs': '16px',
  '--mp-icon-size-sm': '18px',
  '--mp-icon-size-md': '20px',
  '--mp-icon-size-lg': '22px',
  '--mp-color-body': 'var(--mp-color-bg-1)',
  '--mp-color-text': 'var(--mp-color-text-1)',
  '--mp-color-primary': 'rgb(var(--mp-primary-6))',
  '--mp-color-info': 'rgb(var(--mp-info-6))',
  '--mp-color-success': 'rgb(var(--mp-success-6))',
  '--mp-color-warning': 'rgb(var(--mp-warning-6))',
  '--mp-color-danger': 'rgb(var(--mp-danger-6))',
  '--mp-color-disabled': 'var(--mp-color-fill-2)',
  '--mp-color-text-disabled': 'var(--mp-color-text-4)',
  '--mp-opacity-disabled': '0.38',
  '--mp-opacity-hover': '0.04',
  '--mp-opacity-focus': '0.12',
  '--mp-cubic-bezier': 'cubic-bezier(0.25, 0.8, 0.5, 1)',
  '--mp-shadow-key-umbra-opacity': 'rgba(0, 0, 0, 0.2)',
  '--mp-shadow-key-penumbra-opacity': 'rgba(0, 0, 0, 0.14)',
  '--mp-shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.12)',
  ...button,
  ...alert,
  ...hoverOverlay,
  ...popover,
  ...menu,
  ...menuOption,
  ...fab,
  ...breadcrumbItem,
  ...link,
  ...cell,
  ...paper,
  ...avatar,
  ...field,
  ...checkbox,
  ...radio,
  ...card,
  ...cascader,
  ...tooltip,
  ...tabs,
  ...tab,
  ...table,
  ...tag,
  ...textarea,
  ...collapse,
  ...result,
  ...bottomNavigation,
  ...bottomNavigationItem,
  ...message,
  ...actionSheet,
  ...dialog,
  ...pullRefresh,
  ...popup,
  ...picker,
  ...floatingPanel,
  ...backTop,
  ...select,
  ...option,
  ...slider,
  ...uploader,
  ...timePicker,
  ...datePicker,
  ...switchThemes,
  ...rate,
  ...avatarGroup,
  ...badge,
  ...countdown,
  ...counter,
  ...divider,
  ...formDetails,
  ...icon,
  ...imagePreview,
  ...indexBar,
  ...infiniteScroll,
  ...input,
  ...list,
  ...loading,
  ...loadingBar,
  ...overlay,
  ...pagination,
  ...progress,
  ...ripple,
  ...skeleton,
  ...space,
  ...statistic,
  ...carousel,
  ...watermark,
  ...code,
  ...signature,
} as StyleVars
