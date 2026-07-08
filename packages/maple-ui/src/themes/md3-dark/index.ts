import { StyleVars } from '../../style-provider'
import actionSheet from './actionSheet'
import alert from './alert'
import appBar from './appBar'
import avatar from './avatar'
import avatarGroup from './avatarGroup'
import backTop from './backTop'
import badge from './badge'
import bottomNavigation from './bottomNavigation'
import bottomNavigationItem from './bottomNavigationItem'
import breadcrumbItem from './breadcrumb-item'
import button from './button'
import card from './card'
import cell from './cell'
import checkbox from './checkbox'
import chip from './chip'
import code from './code'
import collapse from './collapse'
import countdown from './countdown'
import counter from './counter'
import datePicker from './datePicker'
import dialog from './dialog'
import divider from './divider'
import fab from './fab'
import fieldDecorator from './fieldDecorator'
import floatingPanel from './floatingPanel'
import formDetails from './formDetails'
import hoverOverlay from './hoverOverlay'
import icon from './icon'
import imagePreview from './imagePreview'
import indexBar from './indexBar'
import input from './input'
import link from './link'
import list from './list'
import loading from './loading'
import loadingBar from './loadingBar'
import menu from './menu'
import menuOption from './menuOption'
import menuSelect from './menuSelect'
import option from './option'
import overlay from './overlay'
import pagination from './pagination'
import paper from './paper'
import picker from './picker'
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
import snackbar from './snackbar'
import space from './space'
import step from './step'
import swipe from './swipe'
import switchThemes from './switch'
import tab from './tab'
import table from './table'
import tabs from './tabs'
import timePicker from './timePicker'
import tooltip from './tooltip'
import uploader from './uploader'
import watermark from './watermark'

export default {
  '--mp-color-scheme': 'dark',
  '--mp-font-size-xs': '10px',
  '--mp-font-size-sm': '12px',
  '--mp-font-size-md': '14px',
  '--mp-font-size-lg': '16px',
  '--mp-icon-size-xs': '16px',
  '--mp-icon-size-sm': '18px',
  '--mp-icon-size-md': '20px',
  '--mp-icon-size-lg': '22px',
  '--mp-hsl-body': '260, 14%, 8%',
  '--mp-color-body': 'hsla(var(--mp-hsl-body), 1)',
  '--mp-hsl-text': '0, 0%, 100%',
  '--mp-color-text': 'hsla(var(--mp-hsl-text), 1)',
  '--mp-hsl-primary': '258, 100%, 87%',
  '--mp-color-primary': 'hsla(var(--mp-hsl-primary), 1)',
  '--mp-hsl-info': '263, 27%, 81%',
  '--mp-color-info': 'hsla(var(--mp-hsl-info), 1)',
  '--mp-hsl-success': '77, 44%, 66%',
  '--mp-color-success': 'hsla(var(--mp-hsl-success), 1)',
  '--mp-hsl-warning': '343, 63%, 83%',
  '--mp-color-warning': 'hsla(var(--mp-hsl-warning), 1)',
  '--mp-hsl-danger': '3, 70%, 83%',
  '--mp-color-danger': 'hsla(var(--mp-hsl-danger), 1)',
  '--mp-hsl-on-primary': '259, 58%, 28%',
  '--mp-color-on-primary': 'hsla(var(--mp-hsl-on-primary), 1)',
  '--mp-hsl-on-info': '258, 18%, 22%',
  '--mp-color-on-info': 'hsla(var(--mp-hsl-on-info), 1)',
  '--mp-hsl-on-success': '76, 100%, 10%',
  '--mp-color-on-success': 'hsla(var(--mp-hsl-on-success), 1)',
  '--mp-hsl-on-warning': '338, 33%, 22%',
  '--mp-color-on-warning': 'hsla(var(--mp-hsl-on-warning), 1)',
  '--mp-hsl-on-danger': '3, 71%, 22%',
  '--mp-color-on-danger': 'hsla(var(--mp-hsl-on-danger), 1)',
  '--mp-hsl-primary-container': '257, 37%, 42%',
  '--mp-color-primary-container': 'hsla(var(--mp-hsl-primary-container), 1)',
  '--mp-hsl-info-container': '260, 12%, 35%',
  '--mp-color-info-container': 'hsla(var(--mp-hsl-info-container), 1)',
  '--mp-hsl-success-container': '77, 57%, 23%',
  '--mp-color-success-container': 'hsla(var(--mp-hsl-success-container), 1)',
  '--mp-hsl-warning-container': '342, 21%, 36%',
  '--mp-color-warning-container': 'hsla(var(--mp-hsl-warning-container), 1)',
  '--mp-hsl-danger-container': '2, 48%, 42%',
  '--mp-color-danger-container': 'hsla(var(--mp-hsl-danger-container), 1)',
  '--mp-hsl-on-primary-container': '263, 100%, 93%',
  '--mp-color-on-primary-container': 'hsla(var(--mp-hsl-on-primary-container), 1)',
  '--mp-hsl-on-info-container': '263, 65%, 92%',
  '--mp-color-on-info-container': 'hsla(var(--mp-hsl-on-info-container), 1)',
  '--mp-hsl-on-success-container': '77, 68%, 77%',
  '--mp-color-on-success-container': 'hsla(var(--mp-hsl-on-success-container), 1)',
  '--mp-hsl-on-warning-container': '342, 100%, 92%',
  '--mp-color-on-warning-container': 'hsla(var(--mp-hsl-on-warning-container), 1)',
  '--mp-hsl-on-danger-container': '4, 71%, 92%',
  '--mp-color-on-danger-container': 'hsla(var(--mp-hsl-on-danger-container), 1)',
  '--mp-hsl-disabled': '0, 0%, 25%',
  '--mp-color-disabled': 'hsla(var(--mp-hsl-disabled), 1)',
  '--mp-hsl-text-disabled': '0, 0%, 46%',
  '--mp-color-text-disabled': 'hsla(var(--mp-hsl-text-disabled), 1)',
  '--mp-hsl-surface-container': '257, 10%, 14%',
  '--mp-color-surface-container': 'hsla(var(--mp-hsl-surface-container), 1)',
  '--mp-hsl-surface-container-low': '264, 8%, 12%',
  '--mp-color-surface-container-low': 'hsla(var(--mp-hsl-surface-container-low), 1)',
  '--mp-hsl-surface-container-high': '257, 8%, 17%',
  '--mp-color-surface-container-high': 'hsla(var(--mp-hsl-surface-container-high), 1)',
  '--mp-hsl-surface-container-highest': '257, 6%, 22%',
  '--mp-color-surface-container-highest': 'hsla(var(--mp-hsl-surface-container-highest), 1)',
  '--mp-hsl-inverse-surface': '280, 17%, 90%',
  '--mp-color-inverse-surface': 'hsla(var(--mp-hsl-inverse-surface), 1)',
  '--mp-hsl-outline': '264, 7%, 29%',
  '--mp-color-outline': 'hsla(var(--mp-hsl-outline), 1)',
  '--mp-hsl-on-surface-variant': '270, 11%, 79%',
  '--mp-color-on-surface-variant': 'hsla(var(--mp-hsl-on-surface-variant), 1)',
  '--mp-opacity-disabled': '0.6',
  '--mp-opacity-hover': '0.12',
  '--mp-opacity-focus': '0.2',
  '--mp-cubic-bezier': 'cubic-bezier(0.25, 0.8, 0.5, 1)',
  '--mp-shadow-key-umbra-opacity': 'rgba(0, 0, 0, 0.2)',
  '--mp-shadow-key-penumbra-opacity': 'rgba(0, 0, 0, 0.14)',
  '--mp-shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.12)',
  ...button,
  ...alert,
  ...hoverOverlay,
  ...menu,
  ...menuSelect,
  ...menuOption,
  ...fab,
  ...breadcrumbItem,
  ...link,
  ...cell,
  ...paper,
  ...avatar,
  ...fieldDecorator,
  ...checkbox,
  ...radio,
  ...card,
  ...chip,
  ...badge,
  ...tooltip,
  ...progress,
  ...tabs,
  ...tab,
  ...step,
  ...divider,
  ...table,
  ...pagination,
  ...watermark,
  ...collapse,
  ...result,
  ...appBar,
  ...bottomNavigation,
  ...bottomNavigationItem,
  ...snackbar,
  ...actionSheet,
  ...dialog,
  ...pullRefresh,
  ...popup,
  ...picker,
  ...floatingPanel,
  ...backTop,
  ...select,
  ...option,
  ...counter,
  ...switchThemes,
  ...slider,
  ...uploader,
  ...timePicker,
  ...datePicker,
  ...rate,
  ...skeleton,
  ...avatarGroup,
  ...countdown,
  ...formDetails,
  ...icon,
  ...imagePreview,
  ...indexBar,
  ...input,
  ...list,
  ...loading,
  ...loadingBar,
  ...overlay,
  ...ripple,
  ...space,
  ...swipe,
  ...code,
  ...signature,
} as StyleVars
