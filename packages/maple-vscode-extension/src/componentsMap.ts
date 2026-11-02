export interface ComponentDescriptor {
  path: string
  attrs?: string[]
  characterDelta?: number
  closeSelf?: boolean
}

export const componentsMap: Record<string, ComponentDescriptor> = {
  'nav-menu': { path: '/nav-menu' },
  'nav-menu-item': { path: '/nav-menu' },
  'people-select': { path: '/people-select' },
  'safe-area': { path: '/safe-area' },
  button: {
    path: '/button',
    attrs: ['type="primary"'],
  },
  'button-group': {
    path: '/button',
    attrs: ['type="primary"'],
  },
  link: {
    path: '/link',
    attrs: ['type="primary"'],
  },
  cell: {
    path: '/cell',
  },
  icon: {
    path: '/icon',
    attrs: ['name='],
    closeSelf: true,
    characterDelta: -2,
  },
  image: {
    path: '/image',
    attrs: ['src=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  input: {
    path: '/input',
    attrs: ['v-model=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  'back-top': {
    path: '/back-top',
    closeSelf: true,
    characterDelta: -2,
  },
  'page-header': {
    path: '/page-header',
  },
  loading: {
    path: '/loading',
    closeSelf: true,
    characterDelta: -2,
  },
  chip: {
    path: '/chip',
  },
  badge: {
    path: '/badge',
    attrs: ['type="primary"'],
  },
  skeleton: {
    path: '/skeleton',
    attrs: ['loading=""'],
    characterDelta: -2,
  },
  collapse: {
    path: '/collapse',
    attrs: ['v-model=""'],
    characterDelta: -2,
  },
  'collapse-item': {
    path: '/collapse',
    attrs: ['title=""'],
    characterDelta: -2,
  },
  grid: {
    path: '/grid',
  },
  'grid-item': {
    path: '/grid',
  },
  row: {
    path: '/grid',
  },
  col: {
    path: '/grid',
    attrs: [':span=""'],
    characterDelta: -2,
  },
  sticky: {
    path: '/affix',
  },
  progress: {
    path: '/progress',
    attrs: [':value=""'],
    characterDelta: -3,
    closeSelf: true,
  },
  list: {
    path: '/list',
  },
  'list-item': {
    path: '/list',
  },
  'infinite-scroll': {
    path: '/infinite-scroll',
    attrs: ['v-model:status=""', '@load=""'],
    characterDelta: -2,
  },
  swipe: {
    path: '/swipe',
  },
  'swipe-item': {
    path: '/swipe',
  },
  steps: {
    path: '/steps',
    attrs: [':active=""'],
    characterDelta: -2,
  },
  step: {
    path: '/steps',
  },
  tabs: {
    path: '/tabs',
  },
  'tab-nav': {
    path: '/tabs',
  },
  'tabs-navs': {
    path: '/tabs',
  },
  'tabs-items': {
    path: '/tabs',
  },
  'tab-item': {
    path: '/tabs',
  },
  counter: {
    path: '/counter',
    attrs: ['v-model=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  countdown: {
    path: '/countdown',
    attrs: [':time=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  'date-picker': {
    path: '/date',
    attrs: ['v-model=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  'time-picker': {
    path: '/time',
    attrs: ['v-model=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  dialog: {
    path: '/dialog',
  },
  form: {
    path: '/form',
  },
  'form-details': {
    path: '/form',
    closeSelf: true,
  },
  'index-bar': {
    path: '/index-bar',
  },
  'index-anchor': {
    path: '/index-bar',
    attrs: [':index=""'],
    characterDelta: -2,
  },
  select: {
    path: '/select',
    attrs: ['v-model=""'],
    characterDelta: -2,
  },
  option: {
    path: '/select',
    attrs: ['label=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  menu: {
    path: '/menu',
  },
  'action-sheet': {
    path: '/action-sheet',
    attrs: [':actions=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  picker: {
    path: '/picker',
    attrs: [':columns=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  overlay: {
    path: '/overlay',
  },
  popup: {
    path: '/popup',
  },
  'pull-refresh': {
    path: '/pull-refresh',
    attrs: ['v-model=""'],
    characterDelta: -2,
  },
  radio: {
    path: '/radio',
  },
  'radio-group': {
    path: '/radio',
    attrs: ['v-model=""'],
    characterDelta: -2,
  },
  checkbox: {
    path: '/checkbox',
  },
  'checkbox-group': {
    path: '/checkbox',
    attrs: ['v-model=""'],
    characterDelta: -2,
  },
  switch: {
    path: '/switch',
    attrs: ['v-model=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  rate: {
    path: '/rate',
    attrs: ['v-model=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  slider: {
    path: '/slider',
    attrs: ['v-model=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  message: {
    path: '/message',
    attrs: ['type=""'],
    characterDelta: -2,
  },
  upload: {
    path: '/upload',
    attrs: ['v-model=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  card: {
    path: '/card',
  },
  divider: {
    path: '/divider',
    closeSelf: true,
  },
  'style-provider': {
    path: '/style-provider',
    attrs: [':style-vars=""'],
    characterDelta: -2,
  },
  table: {
    path: '/table',
  },
  pagination: {
    path: '/pagination',
    closeSelf: true,
    characterDelta: -2,
  },
  'image-preview': {
    path: '/image',
    attrs: [':images=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  space: {
    path: '/space',
  },
  'tab-bar': {
    path: '/tab-bar',
  },
  'tab-bar-item': {
    path: '/tab-bar',
    attrs: ['label=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  result: {
    path: '/result',
  },
  breadcrumb: {
    path: '/breadcrumb',
  },
  'breadcrumb-item': {
    path: '/breadcrumb',
  },
  tooltip: {
    path: '/tooltip',
  },
  paper: {
    path: '/paper',
  },
  ellipsis: {
    path: '/ellipsis',
  },
  avatar: {
    path: '/avatar',
    attrs: ['image-url=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  'avatar-group': {
    path: '/avatar',
  },
  fab: {
    path: '/fab',
    attrs: ['type="primary"'],
    closeSelf: true,
  },
  drag: {
    path: '/drag',
  },
  watermark: {
    path: '/watermark',
  },
  'menu-option': {
    path: '/menu',
    attrs: ['label=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  'floating-panel': {
    path: '/floating-panel',
  },
  alert: {
    path: '/alert',
    closeSelf: true,
    characterDelta: -2,
  },
  'count-to': {
    path: '/count-to',
    attrs: [':to=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  statistic: {
    path: '/statistic',
    attrs: [':value=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  'auto-complete': {
    path: '/auto-complete',
    attrs: ['v-model=""'],
    closeSelf: true,
    characterDelta: -3,
  },
  signature: {
    path: '/signature',
    closeSelf: true,
  },
}
