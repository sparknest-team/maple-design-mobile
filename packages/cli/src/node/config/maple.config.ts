import { pathToFileURL } from 'url'
import { isArray, mergeWith } from '@maple-design/shared-vue'
import { type CopyOptions } from '@maple-design/vite-plugins-vue'
import fse from 'fs-extra'
import { Plugin, ProxyOptions } from 'vite'
import { COMPONENT_REUSE_JSON, MAPLE_CONFIG, SITE_CONFIG } from '../shared/constant.js'
import { outputFileSyncOnChange } from '../shared/fsUtils.js'

const { pathExistsSync, statSync } = fse

export interface MapleConfigIcons {
  /** SVG source directory owned by the product icon package. */
  entry?: string
  /** Generated Vue source directory. */
  output?: string
}

export interface MapleConfigEsbuild {
  target?: string | string[]
}

export interface MapleConfigHtmlInjectPoint {
  position?: 'start' | 'end' | 'script-start'
  content?: string
}

export interface MapleConfigHtmlInject {
  head?: MapleConfigHtmlInjectPoint[]
  body?: MapleConfigHtmlInjectPoint[]
}

export interface MapleConfigPcMenu {
  text: Record<string, string>
  type: number
  doc?: string
  parent?: string
}

export interface MapleConfigPcHeader {
  i18n?: Record<string, string>
  currentVersion?: string
  github?: string
  changelog?: string
  playground?: string
  ai?: string
  themes?: Record<string, string>[]
  versions?: {
    name: string
    items?: { label?: string; link?: string }[]
  }[]
}

export interface MapleConfigPcAd {
  id?: string
  logo?: string
  logoHeight?: string
  description?: Record<string, string>
  descriptionBackground?: string
  descriptionTextColor?: string
  link?: Record<string, string>
  background?: string
  textColor?: string
}

export interface MapleConfigMobileHeader {
  i18n?: Record<string, string>
  github?: string
  themes?: Record<string, string>[]
}

export interface MapleConfigSeo {
  title?: string
  description?: string
  keywords?: string
}

export interface MapleConfigPcIndexPage {
  eyebrow?: Record<string, string>
  headline?: Record<string, string>
  companion?: {
    name: string
    label: Record<string, string>
    href: string
    title: Record<string, string>
    description: Record<string, string>
  }
  description?: Record<string, string>
  started?: Record<string, string>
  viewOnGithub?: Record<string, string>
  features?: { name: Record<string, string>; description: Record<string, string> }[]
  teamMembers?: {
    label: Record<string, string>
    members: {
      name?: Record<string, string>
      title?: Record<string, string>
      description?: Record<string, string>
      avatar?: string
      github?: string
      twitter?: string
    }[]
  }
  contributors?: {
    label?: Record<string, string>
    link?: string
    image?: string
  }
  sponsors?: {
    label?: Record<string, string>
    link?: string
    image?: string
  }
  license?: Record<string, string>
  copyright?: Record<string, string>
}

export interface MapleConfigPc {
  /** Independent documentation areas with scoped menus. */
  sections?: { id: string; text: Record<string, string>; entry: string; mobileEntry?: string; docs?: string[] }[]

  title?: Record<string, string>
  redirect?: string
  clipboard?: Record<string, string>
  indexPage?: MapleConfigPcIndexPage
  ad?: MapleConfigPcAd
  header?: MapleConfigPcHeader
  menu?: MapleConfigPcMenu[]
  htmlInject?: MapleConfigHtmlInject
  fold?: {
    /** Whether Markdown code blocks are collapsed on first render. Does not affect live demo previews. @default false */
    defaultFold?: boolean
    /** Visible source height while collapsed. Use 0 to hide it completely. @default 0 */
    foldHeight?: number
  }
}

export interface MapleConfigMobile {
  /** Root documentation pages also available in the mobile site. */
  docs?: string[]
  title?: Record<string, string>
  redirect?: string
  header?: MapleConfigMobileHeader
  htmlInject?: MapleConfigHtmlInject
}

export interface MapleConfig {
  /**
   * @default `Maple`
   * UI library name.
   */
  name?: string
  /**
   * @default `mp`
   * Component name prefix
   */
  namespace?: string
  /**
   * @default `localhost`
   * Local dev server host
   */
  host?: string
  /**
   * @default `8080`
   * Local dev server port
   */
  port?: number
  proxy?: Record<string, string | ProxyOptions>
  title?: string
  logo?: string
  themeKey?: string
  /** Mobile demo theme storage key. Defaults to `${themeKey}_DEMO`. */
  demoThemeKey?: string
  seo?: {
    title?: string
    description?: string
    keywords?: string
  }
  defaultLanguage?: 'zh-CN' | 'en-US'
  alias?: Record<string, string>
  /**
   * @default `false`
   * Show mobile component on the right.
   */
  useMobile?: boolean
  lightTheme?: Record<string, string>
  darkTheme?: Record<string, string>
  mapleLightTheme?: Record<string, string>
  mapleDarkTheme?: Record<string, string>
  alpsLightTheme?: Record<string, string>
  fireflyLightTheme?: Record<string, string>
  alpsDarkTheme?: Record<string, string>
  fireflyDarkTheme?: Record<string, string>
  defaultLightTheme?: 'lightTheme' | 'mapleLightTheme' | 'alpsLightTheme' | 'fireflyLightTheme'
  defaultDarkTheme?: 'darkTheme' | 'mapleDarkTheme' | 'alpsDarkTheme' | 'fireflyDarkTheme'
  highlight?: { style: string }
  analysis?: { baidu: string }
  pc?: MapleConfigPc
  mobile?: MapleConfigMobile
  copy?: CopyOptions['paths']
  icons?: MapleConfigIcons
  esbuild?: MapleConfigEsbuild
  bundle?: {
    external?: string[]
    globals?: Record<string, string>
  }
  /**
   *  @vitePlugins
   * @default `[]`
   * Vite plugins
   */
  vitePlugins?: Plugin[] | ((plugins: Plugin[]) => Plugin[])

  /**
   * @default `[]`
   * Directive folder name for component library.
   */
  directives?: string[]
  _cf?: string[]
}

export function defineConfig(config: MapleConfig) {
  return config
}

export function mergeStrategy(_: any, srcValue: any, key: any) {
  // Arrays merged by index would pollute items across reloads when length/order changes
  // (e.g. menu titles picking up the next component's `doc`).
  const keys = ['features', 'members', 'versions', 'themes', '_cf', 'menu']

  if (keys.includes(key) && isArray(srcValue)) {
    return srcValue
  }
}

export async function getMapleConfig(emit = false): Promise<Required<MapleConfig>> {
  const defaultConfig = (await import('./maple.default.config.js')).default
  const configStamp = pathExistsSync(MAPLE_CONFIG) ? statSync(MAPLE_CONFIG).mtimeMs : 0
  const reuseStamp = pathExistsSync(COMPONENT_REUSE_JSON) ? statSync(COMPONENT_REUSE_JSON).mtimeMs : 0
  const config: any = pathExistsSync(MAPLE_CONFIG)
    ? (await import(`${pathToFileURL(MAPLE_CONFIG).href}?_t=${configStamp}-${reuseStamp}`)).default
    : {}
  // Clone first: mergeWith mutates the destination; the default export is module-cached.
  const mergedConfig = mergeWith(structuredClone(defaultConfig), config, mergeStrategy)

  if (emit) {
    const source = JSON.stringify(mergedConfig, null, 2)
    outputFileSyncOnChange(SITE_CONFIG, source)
  }

  return mergedConfig
}
