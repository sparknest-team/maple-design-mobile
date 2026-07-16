import { type CopyOptions } from '@maplejs/maple-vite-plugins'
import { type VIConfig } from '@varlet/icon-builder'
import { Plugin, ProxyOptions } from 'vite'

export interface MapleConfigIcons extends VIConfig {
  /**
   * @default true
   * Whether to generate png
   */
  genPng?: boolean
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
    items?: {
      label?: string
      link?: string
    }[]
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
  description?: Record<string, string>
  started?: Record<string, string>
  viewOnGithub?: Record<string, string>
  features?: {
    name: Record<string, string>
    description: Record<string, string>
  }[]
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
  title?: Record<string, string>
  redirect?: string
  clipboard?: Record<string, string>
  indexPage?: MapleConfigPcIndexPage
  ad?: MapleConfigPcAd
  header?: MapleConfigPcHeader
  menu?: MapleConfigPcMenu[]
  htmlInject?: MapleConfigHtmlInject
  fold?: {
    defaultFold?: boolean
    foldHeight?: number
  }
}
export interface MapleConfigMobile {
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
  md3LightTheme?: Record<string, string>
  md3DarkTheme?: Record<string, string>
  defaultLightTheme?: 'lightTheme' | 'md3LightTheme'
  defaultDarkTheme?: 'darkTheme' | 'md3DarkTheme'
  highlight?: {
    style: string
  }
  analysis?: {
    baidu: string
  }
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
export declare function defineConfig(config: MapleConfig): MapleConfig
export declare function mergeStrategy(_: any, srcValue: any, key: any): any[] | undefined
export declare function getMapleConfig(emit?: boolean): Promise<Required<MapleConfig>>
