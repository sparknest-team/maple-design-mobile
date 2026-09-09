import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { formatStyleVars } from '../utils/elements'
import { props as styleProviderProps } from './props'
import VarStyleProvider from './StyleProvider.vue'

export type StyleVars = Record<string, string>

const styleId = 'maple-style-vars'
const THEME_ATTR = 'maple-theme'

function removeStyle() {
  const style = document.head.querySelector(`#${styleId}`)
  if (style) {
    document.head.removeChild(style)
  }
}

function insertStyle(content: string) {
  const style = document.createElement('style')
  style.id = styleId
  style.innerHTML = content
  document.head.appendChild(style)
}

function syncDocumentTheme(styleVars: StyleVars | null) {
  if (typeof document === 'undefined') {
    return
  }
  if (styleVars == null) {
    document.documentElement.removeAttribute(THEME_ATTR)
    return
  }
  const scheme = styleVars['--mp-color-scheme'] ?? styleVars['mp-color-scheme']
  if (scheme === 'dark') {
    document.documentElement.setAttribute(THEME_ATTR, 'dark')
  } else if (scheme === 'light') {
    document.documentElement.removeAttribute(THEME_ATTR)
  }
}

function omitUnchangedStyleVars(styleVars: StyleVars): StyleVars {
  if (typeof document === 'undefined' || typeof getComputedStyle === 'undefined') {
    return styleVars
  }

  const computed = getComputedStyle(document.documentElement)
  const changed: StyleVars = {}

  for (const [key, value] of Object.entries(styleVars)) {
    if (computed.getPropertyValue(key).trim() !== String(value).trim()) {
      changed[key] = value
    }
  }

  return changed
}

function StyleProvider(styleVars: StyleVars | null) {
  if (typeof document === 'undefined') {
    return
  }
  if (styleVars == null) {
    removeStyle()
    syncDocumentTheme(null)
    return
  }

  syncDocumentTheme(styleVars)
  removeStyle()

  const styles: StyleVars = omitUnchangedStyleVars(formatStyleVars(styleVars))
  if (Object.keys(styles).length === 0) {
    return
  }

  const content = Object.entries(styles).reduce((content, [key, value]) => {
    content += `${key}:${value};`
    return content
  }, `:root:root {\n`)

  insertStyle(`${content}\n}`)
}

StyleProvider.Component = VarStyleProvider
withInstall(VarStyleProvider)
withInstall(VarStyleProvider, StyleProvider)
withPropsDefaultsSetter(StyleProvider, styleProviderProps)

export { styleProviderProps }

export type StyleProviderInstance = InstanceType<typeof VarStyleProvider>
export const _StyleProviderComponent: typeof VarStyleProvider = VarStyleProvider

export default StyleProvider
export type StyleProviderProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
