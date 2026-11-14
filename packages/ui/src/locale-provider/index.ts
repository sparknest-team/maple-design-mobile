import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import LocaleProviderSource from './LocaleProvider.vue'
import { props as localeProviderProps } from './props'

const LocaleProvider = withInstall(LocaleProviderSource)
withPropsDefaultsSetter(LocaleProvider, localeProviderProps)

export type LocaleProviderInstance = InstanceType<typeof LocaleProvider>
export { localeProviderProps }
export const _LocaleProviderComponent: typeof LocaleProvider = LocaleProvider

export default LocaleProvider
export type LocaleProviderProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
