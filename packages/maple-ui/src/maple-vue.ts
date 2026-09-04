import type { App } from 'vue'
import ActionSheet from './action-sheet'
import Alert from './alert'
import AutoComplete from './auto-complete'
import Avatar from './avatar'
import BackTop from './back-top'
import Badge from './badge'
import BottomNavigation from './bottom-navigation'
import Breadcrumb from './breadcrumb'
import Button from './button'
import Card from './card'
import Carousel from './carousel'
import Cascader from './cascader'
import Cell from './cell'
import Checkbox from './checkbox'
import Code from './code'
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
import Menu from './menu'
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
import Search from './search'
import Select from './select'
import Signature from './signature'
import Skeleton, { SkeletonLine, SkeletonShape } from './skeleton'
import Slider from './slider'
import Space from './space'
import SplitButton from './split-button'
import Statistic from './statistic'
import Steps from './steps'
import Sticky from './sticky'
import StyleProvider from './style-provider'
import SwipeCell from './swipe-cell'
import Switch from './switch'
import Table from './table'
import Tabs from './tabs'
import Tag from './tag'
import Textarea from './textarea'
import Themes from './themes'
import Time from './time'
import TimeRange from './time-range'
import Tooltip from './tooltip'
import Trigger from './trigger'
import Uploader from './uploader'
import VerificationCode from './verification-code'
import Watermark from './watermark'

export const version = '1.0.3'

function install(app: App) {
  const plugins = [
    ActionSheet,
    Alert,
    AutoComplete,
    Avatar,
    BackTop,
    Badge,
    BottomNavigation,
    Breadcrumb,
    Button,
    Card,
    Carousel,
    Cascader,
    Cell,
    Checkbox,
    Code,
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
    Menu,
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
    Search,
    Select,
    Signature,
    Skeleton,
    Slider,
    Space,
    SplitButton,
    Statistic,
    Steps,
    Sticky,
    StyleProvider,
    SwipeCell,
    Switch,
    Table,
    Tabs,
    Tag,
    Textarea,
    Themes,
    Time,
    TimeRange,
    Tooltip,
    Trigger,
    Uploader,
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
  Alert,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  BottomNavigation,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Cascader,
  Cell,
  Checkbox,
  Code,
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
  Menu,
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
  Search,
  Select,
  Signature,
  Skeleton,
  SkeletonLine,
  SkeletonShape,
  Slider,
  Space,
  SplitButton,
  Statistic,
  Steps,
  Sticky,
  StyleProvider,
  SwipeCell,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  Themes,
  Time,
  TimeRange,
  Tooltip,
  Trigger,
  Uploader,
  VerificationCode,
  Watermark,
}

export default {
  version,
  install,
  ActionSheet,
  Alert,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  BottomNavigation,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Cascader,
  Cell,
  Checkbox,
  Code,
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
  Menu,
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
  Search,
  Select,
  Signature,
  Skeleton,
  SkeletonLine,
  SkeletonShape,
  Slider,
  Space,
  SplitButton,
  Statistic,
  Steps,
  Sticky,
  StyleProvider,
  SwipeCell,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  Themes,
  Time,
  TimeRange,
  Tooltip,
  Trigger,
  Uploader,
  VerificationCode,
  Watermark,
}
