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
  'AppBar',
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
  'CollapseTransition',
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
  'Input',
  'InputNumber',
  'Lazy',
  'Link',
  'List',
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
  'Slider',
  'Space',
  'Step',
  'Steps',
  'Sticky',
  'StyleProvider',
  'SwipeCell',
  'Switch',
  'SplitButton',
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
  'Uploader',
  'VerificationCode',
  'Watermark',
])

function getStyleSideEffects(name: string, importStyle = true) {
  return importStyle ? [`@maplejs/maple-ui/${kebabCase(name)}/style`] : undefined
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
