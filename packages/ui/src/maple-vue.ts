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
import Date from './date'
import DateRange from './date-range'
import Dialog from './dialog'
import Divider from './divider'
import Drag from './drag'
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
import InputTag from './input-tag'
import Lazy from './lazy'
import Link from './link'
import List from './list'
import Loading from './loading'
import LoadingBar from './loading-bar'
import Locale from './locale'
import LocaleProvider from './locale-provider'
import Mention from './mention'
import Menu from './menu'
import Message from './message'
import NavMenu from './nav-menu'
import NoticeBar from './notice-bar'
import NumberKeyboard from './number-keyboard'
import Overlay from './overlay'
import PageHeader from './page-header'
import Pagination from './pagination'
import Paper from './paper'
import PeopleSelect from './people-select'
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
import SafeArea from './safe-area'
import Search from './search'
import Select from './select'
import Signature from './signature'
import Skeleton from './skeleton'
import Slider from './slider'
import Space from './space'
import SplitButton from './split-button'
import Statistic from './statistic'
import Steps from './steps'
import SwipeCell from './swipe-cell'
import Switch from './switch'
import TabBar from './tab-bar'
import Table from './table'
import Tabs from './tabs'
import Tag from './tag'
import Textarea from './textarea'
import ThemeProvider from './theme-provider'
import Themes from './themes'
import Time from './time'
import TimeRange from './time-range'
import Timeline from './timeline'
import Tooltip from './tooltip'
import Trigger from './trigger'
import Upload from './upload'
import VerificationCode from './verification-code'
import Watermark from './watermark'

export const version = '1.1.10'

function install(app: App) {
  const plugins = [ActionSheet, Affix, Alert, AutoComplete, Avatar, BackTop, Badge, Breadcrumb, Button, Card, Carousel, Cascader, Cell, Checkbox, Code, Col, Collapse, Context, CountTo, Countdown, Date, DateRange, Dialog, Divider, Drag, Ellipsis, Empty, Fab, FieldDecorator, FloatingPanel, Form, FormDetails, Grid, HighlighterProvider, Hover, Icon, Image, IndexBar, InfiniteScroll, Input, InputNumber, InputTag, Lazy, Link, List, Loading, LoadingBar, Locale, LocaleProvider, Mention, Menu, Message, NavMenu, NoticeBar, NumberKeyboard, Overlay, PageHeader, Pagination, Paper, PeopleSelect, Picker, Popover, Popup, Progress, ProgressGroup, PullRefresh, Radio, Rate, Result, Ripple, Row, SafeArea, Search, Select, Signature, Skeleton, Slider, Space, SplitButton, Statistic, Steps, SwipeCell, Switch, TabBar, Table, Tabs, Tag, Textarea, ThemeProvider, Themes, Time, TimeRange, Timeline, Tooltip, Trigger, Upload, VerificationCode, Watermark]
  for (const plugin of plugins) {
    if (plugin && typeof (plugin as { install?: unknown }).install === 'function') {
      app.use(plugin as unknown as { install: (app: App) => void })
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
  Date,
  DateRange,
  Dialog,
  Divider,
  Drag,
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
  InputTag,
  Lazy,
  Link,
  List,
  Loading,
  LoadingBar,
  Locale,
  LocaleProvider,
  Mention,
  Menu,
  Message,
  NavMenu,
  NoticeBar,
  NumberKeyboard,
  Overlay,
  PageHeader,
  Pagination,
  Paper,
  PeopleSelect,
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
  SafeArea,
  Search,
  Select,
  Signature,
  Skeleton,
  Slider,
  Space,
  SplitButton,
  Statistic,
  Steps,
  SwipeCell,
  Switch,
  TabBar,
  Table,
  Tabs,
  Tag,
  Textarea,
  ThemeProvider,
  Themes,
  Time,
  TimeRange,
  Timeline,
  Tooltip,
  Trigger,
  Upload,
  VerificationCode,
  Watermark
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
  Date: typeof Date
  DateRange: typeof DateRange
  Dialog: typeof Dialog
  Divider: typeof Divider
  Drag: typeof Drag
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
  InputTag: typeof InputTag
  Lazy: typeof Lazy
  Link: typeof Link
  List: typeof List
  Loading: typeof Loading
  LoadingBar: typeof LoadingBar
  Locale: typeof Locale
  LocaleProvider: typeof LocaleProvider
  Mention: typeof Mention
  Menu: typeof Menu
  Message: typeof Message
  NavMenu: typeof NavMenu
  NoticeBar: typeof NoticeBar
  NumberKeyboard: typeof NumberKeyboard
  Overlay: typeof Overlay
  PageHeader: typeof PageHeader
  Pagination: typeof Pagination
  Paper: typeof Paper
  PeopleSelect: typeof PeopleSelect
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
  SafeArea: typeof SafeArea
  Search: typeof Search
  Select: typeof Select
  Signature: typeof Signature
  Skeleton: typeof Skeleton
  Slider: typeof Slider
  Space: typeof Space
  SplitButton: typeof SplitButton
  Statistic: typeof Statistic
  Steps: typeof Steps
  SwipeCell: typeof SwipeCell
  Switch: typeof Switch
  TabBar: typeof TabBar
  Table: typeof Table
  Tabs: typeof Tabs
  Tag: typeof Tag
  Textarea: typeof Textarea
  ThemeProvider: typeof ThemeProvider
  Themes: typeof Themes
  Time: typeof Time
  TimeRange: typeof TimeRange
  Timeline: typeof Timeline
  Tooltip: typeof Tooltip
  Trigger: typeof Trigger
  Upload: typeof Upload
  VerificationCode: typeof VerificationCode
  Watermark: typeof Watermark
}
const library: MapleLibrary = {
  version,
  install,
  // Preserve ESM live bindings: a component entry may be evaluated before the
  // aggregate entry through the development resolver's dependency graph.
  get ActionSheet() { return ActionSheet },
  get Affix() { return Affix },
  get Alert() { return Alert },
  get AutoComplete() { return AutoComplete },
  get Avatar() { return Avatar },
  get BackTop() { return BackTop },
  get Badge() { return Badge },
  get Breadcrumb() { return Breadcrumb },
  get Button() { return Button },
  get Card() { return Card },
  get Carousel() { return Carousel },
  get Cascader() { return Cascader },
  get Cell() { return Cell },
  get Checkbox() { return Checkbox },
  get Code() { return Code },
  get Col() { return Col },
  get Collapse() { return Collapse },
  get Context() { return Context },
  get CountTo() { return CountTo },
  get Countdown() { return Countdown },
  get Date() { return Date },
  get DateRange() { return DateRange },
  get Dialog() { return Dialog },
  get Divider() { return Divider },
  get Drag() { return Drag },
  get Ellipsis() { return Ellipsis },
  get Empty() { return Empty },
  get Fab() { return Fab },
  get FieldDecorator() { return FieldDecorator },
  get FloatingPanel() { return FloatingPanel },
  get Form() { return Form },
  get FormDetails() { return FormDetails },
  get Grid() { return Grid },
  get HighlighterProvider() { return HighlighterProvider },
  get Hover() { return Hover },
  get Icon() { return Icon },
  get Image() { return Image },
  get IndexBar() { return IndexBar },
  get InfiniteScroll() { return InfiniteScroll },
  get Input() { return Input },
  get InputNumber() { return InputNumber },
  get InputTag() { return InputTag },
  get Lazy() { return Lazy },
  get Link() { return Link },
  get List() { return List },
  get Loading() { return Loading },
  get LoadingBar() { return LoadingBar },
  get Locale() { return Locale },
  get LocaleProvider() { return LocaleProvider },
  get Mention() { return Mention },
  get Menu() { return Menu },
  get Message() { return Message },
  get NavMenu() { return NavMenu },
  get NoticeBar() { return NoticeBar },
  get NumberKeyboard() { return NumberKeyboard },
  get Overlay() { return Overlay },
  get PageHeader() { return PageHeader },
  get Pagination() { return Pagination },
  get Paper() { return Paper },
  get PeopleSelect() { return PeopleSelect },
  get Picker() { return Picker },
  get Popover() { return Popover },
  get Popup() { return Popup },
  get Progress() { return Progress },
  get ProgressGroup() { return ProgressGroup },
  get PullRefresh() { return PullRefresh },
  get Radio() { return Radio },
  get Rate() { return Rate },
  get Result() { return Result },
  get Ripple() { return Ripple },
  get Row() { return Row },
  get SafeArea() { return SafeArea },
  get Search() { return Search },
  get Select() { return Select },
  get Signature() { return Signature },
  get Skeleton() { return Skeleton },
  get Slider() { return Slider },
  get Space() { return Space },
  get SplitButton() { return SplitButton },
  get Statistic() { return Statistic },
  get Steps() { return Steps },
  get SwipeCell() { return SwipeCell },
  get Switch() { return Switch },
  get TabBar() { return TabBar },
  get Table() { return Table },
  get Tabs() { return Tabs },
  get Tag() { return Tag },
  get Textarea() { return Textarea },
  get ThemeProvider() { return ThemeProvider },
  get Themes() { return Themes },
  get Time() { return Time },
  get TimeRange() { return TimeRange },
  get Timeline() { return Timeline },
  get Tooltip() { return Tooltip },
  get Trigger() { return Trigger },
  get Upload() { return Upload },
  get VerificationCode() { return VerificationCode },
  get Watermark() { return Watermark }
}
export default library
