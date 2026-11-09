import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import HighlighterProvider from './HighlighterProvider.vue'
import { props as highlighterProviderProps } from './props'

withInstall(HighlighterProvider)
withPropsDefaultsSetter(HighlighterProvider, highlighterProviderProps)

export type HighlighterProviderInstance = InstanceType<typeof HighlighterProvider>
export { highlighterProviderProps }
export type { CodeToHtmlOptions, Highlighter } from './props'
export const _HighlighterProviderComponent: typeof HighlighterProvider = HighlighterProvider

export default HighlighterProvider
export type HighlighterProviderProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
