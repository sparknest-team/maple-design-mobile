import type { App } from 'vue'
import ActionSheet from './action-sheet'
import Affix from './affix'
import Alert from './alert'
import AutoComplete from './auto-complete'
import Avatar from './avatar'
import BackTop from './back-top'
import Badge from './badge'
import Breadcrumb from './breadcrumb'
import Button from './button'
import Card from './card'
import Carousel from './carousel'
import Cascader from './cascader'
import Cell from './cell'
import Checkbox from './checkbox'
import Code from './code'
import Col from './col'
import Collapse from './collapse'
import Context from './context'
import CountTo from './count-to'
import Countdown from './countdown'
import Counter from './counter'
import Date from './date'
import DateRange from './date-range'
import Dialog from './dialog'
import Divider from './divider'
import Drag from './drag'
import DropdownMenu from './dropdown-menu'
import Ellipsis from './ellipsis'
import Empty from './empty'
import Fab from './fab'
import FieldDecorator from './field-decorator'
import FloatingPanel from './floating-panel'
import Form from './form'
import FormDetails from './form-details'
import Grid from './grid'
import HighlighterProvider from './highlighter-provider'
import Hover from './hover'
import Icon from './icon'
import Image from './image'
import IndexBar from './index-bar'
import InfiniteScroll from './infinite-scroll'
import Input from './input'
import InputNumber from './input-number'
import Lazy from './lazy'
import Link from './link'
import List from './list'
import Loading from './loading'
import LoadingBar from './loading-bar'
import Locale from './locale'
import LocaleProvider from './locale-provider'
import Message from './message'
import NoticeBar from './notice-bar'
import NumberKeyboard from './number-keyboard'
import Overlay from './overlay'
import PageHeader from './page-header'
import Pagination from './pagination'
import Paper from './paper'
import Picker from './picker'
import Popover from './popover'
import Popup from './popup'
import Progress from './progress'
import ProgressGroup from './progress-group'
import PullRefresh from './pull-refresh'
import Radio from './radio'
import Rate from './rate'
import Result from './result'
import Ripple from './ripple'
import Row from './row'
import Search from './search'
import Select from './select'
import Signature from './signature'
import Skeleton from './skeleton'
import Slider from './slider'
import Space from './space'
import SplitButton from './split-button'
import Statistic from './statistic'
import Steps from './steps'
import StyleProvider from './style-provider'
import SwipeCell from './swipe-cell'
import Switch from './switch'
import TabBar from './tab-bar'
import Table from './table'
import Tabs from './tabs'
import Tag from './tag'
import Textarea from './textarea'
import Themes from './themes'
import Time from './time'
import TimeRange from './time-range'
import Tooltip from './tooltip'
import Trigger from './trigger'
import Upload from './upload'
import VerificationCode from './verification-code'
import Watermark from './watermark'

export const version = '1.0.3'

function install(app: App) {
  const plugins = [
    ActionSheet,
    Affix,
    Alert,
    AutoComplete,
    Avatar,
    BackTop,
    Badge,
    Breadcrumb,
    Button,
    Card,
    Carousel,
    Cascader,
    Cell,
    Checkbox,
    Code,
    Col,
    Collapse,
    Context,
    CountTo,
    Countdown,
    Counter,
    Date,
    DateRange,
    Dialog,
    Divider,
    Drag,
    DropdownMenu,
    Ellipsis,
    Empty,
    Fab,
    FieldDecorator,
    FloatingPanel,
    Form,
    FormDetails,
    Grid,
    HighlighterProvider,
    Hover,
    Icon,
    Image,
    IndexBar,
    InfiniteScroll,
    Input,
    InputNumber,
    Lazy,
    Link,
    List,
    Loading,
    LoadingBar,
    Locale,
    LocaleProvider,
    Message,
    NoticeBar,
    NumberKeyboard,
    Overlay,
    PageHeader,
    Pagination,
    Paper,
    Picker,
    Popover,
    Popup,
    Progress,
    ProgressGroup,
    PullRefresh,
    Radio,
    Rate,
    Result,
    Ripple,
    Row,
    Search,
    Select,
    Signature,
    Skeleton,
    Slider,
    Space,
    SplitButton,
    Statistic,
    Steps,
    StyleProvider,
    SwipeCell,
    Switch,
    TabBar,
    Table,
    Tabs,
    Tag,
    Textarea,
    Themes,
    Time,
    TimeRange,
    Tooltip,
    Trigger,
    Upload,
    VerificationCode,
    Watermark,
  ]
  for (const plugin of plugins) {
    if (plugin && typeof (plugin as { install?: unknown }).install === 'function') {
      app.use(plugin as { install: (app: App) => void })
    }
  }
}

export {
  install,
  ActionSheet,
  Affix,
  Alert,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Cascader,
  Cell,
  Checkbox,
  Code,
  Col,
  Collapse,
  Context,
  CountTo,
  Countdown,
  Counter,
  Date,
  DateRange,
  Dialog,
  Divider,
  Drag,
  DropdownMenu,
  Ellipsis,
  Empty,
  Fab,
  FieldDecorator,
  FloatingPanel,
  Form,
  FormDetails,
  Grid,
  HighlighterProvider,
  Hover,
  Icon,
  Image,
  IndexBar,
  InfiniteScroll,
  Input,
  InputNumber,
  Lazy,
  Link,
  List,
  Loading,
  LoadingBar,
  Locale,
  LocaleProvider,
  Message,
  NoticeBar,
  NumberKeyboard,
  Overlay,
  PageHeader,
  Pagination,
  Paper,
  Picker,
  Popover,
  Popup,
  Progress,
  ProgressGroup,
  PullRefresh,
  Radio,
  Rate,
  Result,
  Ripple,
  Row,
  Search,
  Select,
  Signature,
  Skeleton,
  Slider,
  Space,
  SplitButton,
  Statistic,
  Steps,
  StyleProvider,
  SwipeCell,
  Switch,
  TabBar,
  Table,
  Tabs,
  Tag,
  Textarea,
  Themes,
  Time,
  TimeRange,
  Tooltip,
  Trigger,
  Upload,
  VerificationCode,
  Watermark,
}

export interface MapleLibrary {
  version: string
  install: typeof install
  ActionSheet: typeof ActionSheet
  Affix: typeof Affix
  Alert: typeof Alert
  AutoComplete: typeof AutoComplete
  Avatar: typeof Avatar
  BackTop: typeof BackTop
  Badge: typeof Badge
  Breadcrumb: typeof Breadcrumb
  Button: typeof Button
  Card: typeof Card
  Carousel: typeof Carousel
  Cascader: typeof Cascader
  Cell: typeof Cell
  Checkbox: typeof Checkbox
  Code: typeof Code
  Col: typeof Col
  Collapse: typeof Collapse
  Context: typeof Context
  CountTo: typeof CountTo
  Countdown: typeof Countdown
  Counter: typeof Counter
  Date: typeof Date
  DateRange: typeof DateRange
  Dialog: typeof Dialog
  Divider: typeof Divider
  Drag: typeof Drag
  DropdownMenu: typeof DropdownMenu
  Ellipsis: typeof Ellipsis
  Empty: typeof Empty
  Fab: typeof Fab
  FieldDecorator: typeof FieldDecorator
  FloatingPanel: typeof FloatingPanel
  Form: typeof Form
  FormDetails: typeof FormDetails
  Grid: typeof Grid
  HighlighterProvider: typeof HighlighterProvider
  Hover: typeof Hover
  Icon: typeof Icon
  Image: typeof Image
  IndexBar: typeof IndexBar
  InfiniteScroll: typeof InfiniteScroll
  Input: typeof Input
  InputNumber: typeof InputNumber
  Lazy: typeof Lazy
  Link: typeof Link
  List: typeof List
  Loading: typeof Loading
  LoadingBar: typeof LoadingBar
  Locale: typeof Locale
  LocaleProvider: typeof LocaleProvider
  Message: typeof Message
  NoticeBar: typeof NoticeBar
  NumberKeyboard: typeof NumberKeyboard
  Overlay: typeof Overlay
  PageHeader: typeof PageHeader
  Pagination: typeof Pagination
  Paper: typeof Paper
  Picker: typeof Picker
  Popover: typeof Popover
  Popup: typeof Popup
  Progress: typeof Progress
  ProgressGroup: typeof ProgressGroup
  PullRefresh: typeof PullRefresh
  Radio: typeof Radio
  Rate: typeof Rate
  Result: typeof Result
  Ripple: typeof Ripple
  Row: typeof Row
  Search: typeof Search
  Select: typeof Select
  Signature: typeof Signature
  Skeleton: typeof Skeleton
  Slider: typeof Slider
  Space: typeof Space
  SplitButton: typeof SplitButton
  Statistic: typeof Statistic
  Steps: typeof Steps
  StyleProvider: typeof StyleProvider
  SwipeCell: typeof SwipeCell
  Switch: typeof Switch
  TabBar: typeof TabBar
  Table: typeof Table
  Tabs: typeof Tabs
  Tag: typeof Tag
  Textarea: typeof Textarea
  Themes: typeof Themes
  Time: typeof Time
  TimeRange: typeof TimeRange
  Tooltip: typeof Tooltip
  Trigger: typeof Trigger
  Upload: typeof Upload
  VerificationCode: typeof VerificationCode
  Watermark: typeof Watermark
}
const library: MapleLibrary = {
  version,
  install,
  ActionSheet,
  Affix,
  Alert,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Cascader,
  Cell,
  Checkbox,
  Code,
  Col,
  Collapse,
  Context,
  CountTo,
  Countdown,
  Counter,
  Date,
  DateRange,
  Dialog,
  Divider,
  Drag,
  DropdownMenu,
  Ellipsis,
  Empty,
  Fab,
  FieldDecorator,
  FloatingPanel,
  Form,
  FormDetails,
  Grid,
  HighlighterProvider,
  Hover,
  Icon,
  Image,
  IndexBar,
  InfiniteScroll,
  Input,
  InputNumber,
  Lazy,
  Link,
  List,
  Loading,
  LoadingBar,
  Locale,
  LocaleProvider,
  Message,
  NoticeBar,
  NumberKeyboard,
  Overlay,
  PageHeader,
  Pagination,
  Paper,
  Picker,
  Popover,
  Popup,
  Progress,
  ProgressGroup,
  PullRefresh,
  Radio,
  Rate,
  Result,
  Ripple,
  Row,
  Search,
  Select,
  Signature,
  Skeleton,
  Slider,
  Space,
  SplitButton,
  Statistic,
  Steps,
  StyleProvider,
  SwipeCell,
  Switch,
  TabBar,
  Table,
  Tabs,
  Tag,
  Textarea,
  Themes,
  Time,
  TimeRange,
  Tooltip,
  Trigger,
  Upload,
  VerificationCode,
  Watermark,
}
export default library
