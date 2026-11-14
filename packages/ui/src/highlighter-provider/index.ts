import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import HighlighterProviderSource from './HighlighterProvider.vue'
import { props as highlighterProviderProps } from './props'

const HighlighterProvider = withInstall(HighlighterProviderSource)
withPropsDefaultsSetter(HighlighterProvider, highlighterProviderProps)

export type HighlighterProviderInstance = InstanceType<typeof HighlighterProvider>
export { highlighterProviderProps }
export type { CodeToHtmlOptions, Highlighter } from './props'
export const _HighlighterProviderComponent: typeof HighlighterProvider = HighlighterProvider

export default HighlighterProvider
export type HighlighterProviderProps = import('../_utils/public-props').CompatiblePublicProps<
  typeof import('./props').props
>
