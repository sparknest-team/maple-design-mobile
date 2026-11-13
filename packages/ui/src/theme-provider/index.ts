import { withInstall } from '../utils/components'
import { themeProviderProps } from './props'
import _ThemeProvider from './ThemeProvider.vue'

const ThemeProvider: import('../utils/components').ComponentWithInstall<typeof _ThemeProvider> =
  withInstall(_ThemeProvider)
export type ThemeProviderInstance = InstanceType<typeof _ThemeProvider>
export type {
  ThemeProviderProps,
  ThemeProviderDefaults,
  StyleVarName,
  StyleVars,
  ThemeProviderTheme,
  ThemeProviderMode,
} from './props'
export { ThemeProvider, themeProviderProps }
export const _ThemeProviderComponent: typeof ThemeProvider = ThemeProvider
export default ThemeProvider
