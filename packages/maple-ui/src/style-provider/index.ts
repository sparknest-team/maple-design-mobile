import { withInstall } from '../utils/components'
import { formatStyleVars } from '../utils/elements'
import { styleProviderProps } from './props'
import type { StyleVars } from './props'
import _StyleProvider from './StyleProvider.vue'

const styleId = 'maple-style-vars'
const themeAttr = 'maple-theme'

function removeStyle() {
  document.head.querySelector(`#${styleId}`)?.remove()
}

function syncDocumentTheme(styles: StyleVars | null) {
  const scheme = styles?.['--mp-color-scheme']
  if (styles === null || scheme === 'light') {
    document.documentElement.removeAttribute(themeAttr)
  } else if (scheme === 'dark') {
    document.documentElement.setAttribute(themeAttr, 'dark')
  }
}

function setStyleVars(styleVars: StyleVars | null) {
  if (typeof document === 'undefined') {
    return
  }
  const styles = styleVars === null ? null : formatStyleVars(styleVars)
  syncDocumentTheme(styles)
  removeStyle()
  if (styles === null) {
    return
  }

  const computed = typeof getComputedStyle === 'undefined' ? undefined : getComputedStyle(document.documentElement)
  const declarations = Object.entries(styles)
    .filter(([key, value]) => computed?.getPropertyValue(key).trim() !== String(value).trim())
    .map(([key, value]) => `${key}:${value};`)
    .join('')
  if (!declarations) {
    return
  }

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `:root:root {\n${declarations}\n}`
  document.head.appendChild(style)
}

const StyleProvider = Object.assign(withInstall(_StyleProvider), {
  setStyleVars,
})

export type StyleProviderInstance = InstanceType<typeof _StyleProvider>
export type { StyleProviderProps, StyleProviderDefaults, StyleVarName, StyleVars } from './props'
export { StyleProvider, styleProviderProps }
export const _StyleProviderComponent = StyleProvider
export default StyleProvider
