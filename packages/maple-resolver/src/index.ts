import { iconNames } from '@maplejs/icons-vue'
import { kebabCase } from '@maplejs/maple-shared'

export interface MapleResolverOptions {
  /** Resolve programmatic APIs for unplugin-auto-import. @default true */
  autoImport?: boolean
  /** Automatically import component styles. @default true */
  importStyle?: boolean
  /** Resolve Maple directives such as `v-ripple`. @default true */
  directives?: boolean
}

const mapleFunctions = [
  'ImagePreview',
  'imagePreview',
  'Message',
  'Picker',
  'ActionSheet',
  'Dialog',
  'Locale',
  'StyleProvider',
  'LoadingBar',
]
const mapleDirectives = ['Ripple', 'Lazy', 'Hover']
const mapleIcons = new Set<string>(iconNames)

// Keep this list aligned with the public `_XComponent` exports from Maple UI.
// A prefix-only match also captures private implementation components such as
// `MpActionItem` and makes the whole module graph fail at runtime.
const mapleComponents = new Set([
  'ActionSheet',
  'Alert',
  'PageHeader',
  'AutoComplete',
  'Avatar',
  'AvatarGroup',
  'BackTop',
  'Badge',
  'BottomNavigation',
  'BottomNavigationItem',
  'Breadcrumb',
  'BreadcrumbItem',
  'Button',
  'ButtonGroup',
  'Card',
  'Carousel',
  'CarouselItem',
  'Cascader',
  'Cell',
  'Checkbox',
  'CheckboxGroup',
  'Code',
  'Col',
  'Collapse',
  'CollapseItem',
  'Context',
  'CountTo',
  'Countdown',
  'Counter',
  'Date',
  'DatePicker',
  'DateRange',
  'DateRangePicker',
  'Dialog',
  'Divider',
  'Drag',
  'Ellipsis',
  'Empty',
  'Fab',
  'FieldDecorator',
  'FloatingPanel',
  'Form',
  'FormDetails',
  'FormItem',
  'Grid',
  'GridItem',
  'HighlighterProvider',
  'Hover',
  'HoverOverlay',
  'Icon',
  'Image',
  'ImagePreview',
  'ImagePreviewGroup',
  'IndexAnchor',
  'IndexBar',
  'InfiniteScroll',
  'Input',
  'InputNumber',
  'Lazy',
  'Link',
  'List',
  'ListItem',
  'Loading',
  'LoadingBar',
  'Locale',
  'LocaleProvider',
  'Menu',
  'MenuGroup',
  'MenuOption',
  'Message',
  'NoticeBar',
  'NumberKeyboard',
  'Option',
  'Overlay',
  'Pagination',
  'Paper',
  'Picker',
  'Popover',
  'Popup',
  'Progress',
  'ProgressGroup',
  'PullRefresh',
  'Radio',
  'RadioGroup',
  'Rate',
  'Result',
  'Ripple',
  'Row',
  'Search',
  'Select',
  'Signature',
  'Skeleton',
  'SkeletonLine',
  'SkeletonShape',
  'Slider',
  'Space',
  'Step',
  'Steps',
  'Sticky',
  'StyleProvider',
  'SwipeCell',
  'Switch',
  'SplitButton',
  'Statistic',
  'Tab',
  'TabItem',
  'Table',
  'Tabs',
  'TabsItems',
  'Tag',
  'Textarea',
  'Themes',
  'Time',
  'TimePicker',
  'TimeRange',
  'TimeRangePicker',
  'Tooltip',
  'Trigger',
  'Uploader',
  'VerificationCode',
  'Watermark',
])

const styleDirAliases: Record<string, string> = {
  imagePreview: 'image',
  CollapseItem: 'collapse',
  Row: 'grid',
  Col: 'grid',
  GridItem: 'grid',
  ImagePreview: 'image',
  ImagePreviewGroup: 'image',
  CarouselItem: 'carousel',
  AvatarGroup: 'avatar',
  ButtonGroup: 'button',
  BreadcrumbItem: 'breadcrumb',
  BottomNavigationItem: 'bottom-navigation',
  Tab: 'tabs',
  TabItem: 'tabs',
  TabsItems: 'tabs',
  CheckboxGroup: 'checkbox',
  RadioGroup: 'radio',
  MenuOption: 'menu',
  MenuGroup: 'menu',
  Step: 'steps',
  ListItem: 'list',
  FormItem: 'form',
  IndexAnchor: 'index-bar',
  Option: 'select',
  DatePicker: 'date',
  DateRangePicker: 'date-range',
  TimePicker: 'time',
  TimeRangePicker: 'time-range',
  HoverOverlay: 'hover',
  SkeletonLine: 'skeleton',
  SkeletonShape: 'skeleton',
}

const stylelessComponents = new Set([
  'Context',
  'HighlighterProvider',
  'Lazy',
  'Locale',
  'LocaleProvider',
  'Themes',
  'Trigger',
])

function getStyleSideEffects(name: string, importStyle = true) {
  if (!importStyle || stylelessComponents.has(name)) {
    return undefined
  }
  const dir = styleDirAliases[name] ?? kebabCase(name)
  return [`@maplejs/maple-ui/${dir}/style`]
}

export function resolveMapleComponent(name: string, options: MapleResolverOptions = {}, programmatic = false) {
  return {
    from: '@maplejs/maple-ui',
    name: programmatic ? name : `_${name}Component`,
    sideEffects: getStyleSideEffects(name, options.importStyle),
  }
}

function resolveMapleIcon(name: string) {
  const iconName = name.slice('MIcon'.length)
  const iconPath = kebabCase(iconName)
  if (!mapleIcons.has(iconPath)) {
    throw new Error(
      `[MapleResolver] Unknown icon component <m-icon-${iconPath}>. ` + `Choose a name exported by @maplejs/icons-vue.`,
    )
  }

  return {
    from: `@maplejs/icons-vue/icon-${iconPath}`,
    name: `Icon${iconName}`,
  }
}

/**
 * Resolver for Maple components, SVG icons, directives, and programmatic APIs.
 * Use the same resolver with unplugin-vue-components and unplugin-auto-import.
 */
export function MapleResolver(options: MapleResolverOptions = {}) {
  return [
    {
      type: 'component' as const,
      resolve(name: string) {
        // Standalone SVG icons use the short `m-icon-*` prefix, mirroring
        // Cedar's `c-icon-*` syntax. `mp-icon` remains the Maple UI wrapper.
        if (name.startsWith('MIcon') && name.length > 'MIcon'.length) {
          return resolveMapleIcon(name)
        }

        if (name.startsWith('Mp')) {
          const componentName = name.slice(2)
          if (mapleComponents.has(componentName)) {
            return resolveMapleComponent(componentName, options)
          }
        }

        if (options.autoImport !== false && mapleFunctions.includes(name)) {
          return resolveMapleComponent(name, options, true)
        }
      },
    },
    {
      type: 'directive' as const,
      resolve(name: string) {
        if (options.directives === false || !mapleDirectives.includes(name)) {
          return
        }
        return resolveMapleComponent(name, options)
      },
    },
  ]
}
