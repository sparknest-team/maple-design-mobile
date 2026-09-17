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
const mapleDirectives: Record<string, string> = {
  Hover: '_HoverComponent',
  Lazy: '_LazyComponent',
  MpLoading: 'vLoading',
  Ripple: '_RippleComponent',
}
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
  'TabBar',
  'TabBarItem',
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
  'DropdownMenu',
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
  'ImagePreviewAction',
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
  'Affix',
  'StyleProvider',
  'SwipeCell',
  'Switch',
  'SplitButton',
  'Statistic',
  'TabPane',
  'TabNav',
  'TabsNavs',
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
  'Upload',
  'VerificationCode',
  'Watermark',
])

const styleDirAliases: Record<string, string> = {
  imagePreview: 'image',
  CollapseItem: 'collapse',
  Row: 'row',
  Col: 'col',
  GridItem: 'grid',
  ImagePreview: 'image',
  ImagePreviewAction: 'image',
  ImagePreviewGroup: 'image',
  CarouselItem: 'carousel',
  AvatarGroup: 'avatar',
  ButtonGroup: 'button',
  BreadcrumbItem: 'breadcrumb',
  TabPane: 'tabs',
  TabBarItem: 'tab-bar',
  TabNav: 'tabs',
  TabsNavs: 'tabs',
  TabItem: 'tabs',
  TabsItems: 'tabs',
  CheckboxGroup: 'checkbox',
  RadioGroup: 'radio',
  MenuOption: 'dropdown-menu',
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
        if (options.directives === false || !mapleDirectives[name]) {
          return
        }
        const styleName = name === 'MpLoading' ? 'Loading' : name
        return {
          ...resolveMapleComponent(styleName, options),
          name: mapleDirectives[name],
        }
      },
    },
  ]
}

/**
 * Add styles for explicit named imports after Vue/TypeScript compilation.
 * Component/auto-import resolvers alone only handle imports they generate.
 */
export function MapleStyleImports(options: Pick<MapleResolverOptions, 'importStyle'> = {}) {
  return {
    name: 'maple:explicit-import-styles',
    enforce: 'post' as const,
    transform(this: { parse: (code: string) => unknown }, code: string, id: string) {
      if (
        options.importStyle === false ||
        !/\.(?:[cm]?[jt]sx?|vue|md)(?:\?|$)/.test(id) ||
        /[?&](?:type=style|raw(?:&|$)|url(?:&|$))/.test(id) ||
        !code.includes('@maplejs/maple-ui')
      ) {
        return
      }
      const ast = this.parse(code) as {
        body: Array<{
          type: string
          source?: { value: string }
          specifiers?: Array<{
            type: string
            imported?: { name?: string; value?: string }
          }>
        }>
      }
      const existing = new Set(
        ast.body.filter((node) => node.type === 'ImportDeclaration').map((node) => node.source?.value),
      )
      const styles = new Set<string>()
      for (const node of ast.body) {
        if (node.type !== 'ImportDeclaration' || node.source?.value !== '@maplejs/maple-ui') {
          continue
        }
        for (const specifier of node.specifiers ?? []) {
          if (specifier.type !== 'ImportSpecifier') {
            continue
          }
          const imported = specifier.imported?.name ?? specifier.imported?.value ?? ''
          const name = imported.replace(/^_(.+)Component$/, '$1')
          if (!mapleComponents.has(name) && !mapleFunctions.includes(name)) {
            continue
          }
          for (const style of getStyleSideEffects(name, true) ?? []) {
            if (!existing.has(style)) {
              styles.add(style)
            }
          }
        }
      }
      if (!styles.size) {
        return
      }
      return {
        code: code + '\n' + [...styles].map((style) => 'import ' + JSON.stringify(style) + ';').join('\n'),
        map: null,
      }
    },
  }
}
