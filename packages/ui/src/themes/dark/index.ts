import { StyleVars } from '../../theme-provider'
import actionSheet from './actionSheet'
import alert from './alert'
import avatar from './avatar'
import avatarGroup from './avatarGroup'
import backTop from './backTop'
import badge from './badge'
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
import tabBar from './tab-bar'
import tabBarItem from './tab-bar-item'
import table from './table'
import tabs from './tabs'
import tag from './tag'
import textarea from './textarea'
import timePicker from './timePicker'
import tooltip from './tooltip'
import upload from './upload'
import watermark from './watermark'

export default {
  '--mp-color-scheme': 'dark',
  '--mp-field-focus-color': 'rgb(var(--mp-primary-9))',
  '--mp-field-error-color': 'rgb(var(--mp-danger-8))',
  '--mp-field-variant-outline-border-color-focus': 'rgb(var(--mp-primary-9))',
  '--mp-brand-1': '0, 66, 77',
  '--mp-brand-2': '4, 94, 105',
  '--mp-brand-3': '11, 125, 133',
  '--mp-brand-4': '19, 157, 162',
  '--mp-brand-5': '30, 190, 190',
  '--mp-brand-6': '41, 203, 197',
  '--mp-brand-7': '82, 216, 207',
  '--mp-brand-8': '128, 229, 219',
  '--mp-brand-9': '179, 242, 233',
  '--mp-brand-10': '235, 255, 251',
  '--mp-primary-1': '0, 66, 77',
  '--mp-primary-2': '4, 94, 105',
  '--mp-primary-3': '11, 125, 133',
  '--mp-primary-4': '19, 157, 162',
  '--mp-primary-5': '30, 190, 190',
  '--mp-primary-6': '41, 203, 197',
  '--mp-primary-7': '82, 216, 207',
  '--mp-primary-8': '128, 229, 219',
  '--mp-primary-9': '179, 242, 233',
  '--mp-primary-10': '235, 255, 251',
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
  '--mp-opacity-disabled': '0.5',
  '--mp-opacity-hover': '0.04',
  '--mp-opacity-focus': '0.12',
  '--mp-cubic-bezier': 'cubic-bezier(0.25, 0.8, 0.5, 1)',
  '--mp-shadow-key-umbra-opacity': 'rgba(0, 0, 0, 0.2)',
  '--mp-shadow-key-penumbra-opacity': 'rgba(0, 0, 0, 0.14)',
  '--mp-shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.12)',
  ...button,
  ...alert,
  ...cell,
  ...card,
  ...cascader,
  ...timePicker,
  ...datePicker,
  ...skeleton,
  ...tabs,
  ...popup,
  ...dialog,
  ...actionSheet,
  ...badge,
  ...upload,
  ...collapse,
  ...pullRefresh,
  ...switchThemes,
  ...pagination,
  ...table,
  ...tag,
  ...textarea,
  ...field,
  ...radio,
  ...checkbox,
  ...divider,
  ...menu,
  ...menuOption,
  ...picker,
  ...tabBarItem,
  ...popover,
  ...result,
  ...breadcrumbItem,
  ...avatar,
  ...link,
  ...progress,
  ...option,
  ...watermark,
  ...avatarGroup,
  ...backTop,
  ...tabBar,
  ...countdown,
  ...fab,
  ...floatingPanel,
  ...formDetails,
  ...hoverOverlay,
  ...icon,
  ...imagePreview,
  ...indexBar,
  ...infiniteScroll,
  ...input,
  ...list,
  ...loading,
  ...loadingBar,
  ...overlay,
  ...paper,
  ...rate,
  ...ripple,
  ...slider,
  ...message,
  ...space,
  ...statistic,
  ...carousel,
  ...tooltip,
  ...select,
  ...code,
  ...signature,
} as StyleVars
