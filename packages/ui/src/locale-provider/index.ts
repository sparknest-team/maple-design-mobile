import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import LocaleProvider from './LocaleProvider.vue'
import { props as localeProviderProps } from './props'

withInstall(LocaleProvider)
withPropsDefaultsSetter(LocaleProvider, localeProviderProps)

export type LocaleProviderInstance = InstanceType<typeof LocaleProvider>
export { localeProviderProps }
export const _LocaleProviderComponent: typeof LocaleProvider = LocaleProvider

export default LocaleProvider
export type LocaleProviderProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
