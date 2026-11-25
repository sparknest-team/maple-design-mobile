import { withInstall } from '../utils/components'
import { props as indexAnchorProps } from './anchor-props'
import IndexAnchor from './IndexAnchor.vue'
import _IndexBar from './IndexBar.vue'
import { props as indexBarProps } from './props'

const IndexBar: import('../utils/components').ComponentWithInstall<typeof _IndexBar & { Anchor: typeof IndexAnchor }> =
  withInstall(
    _IndexBar,
    Object.assign(_IndexBar, {
      Anchor: IndexAnchor,
    }),
    { components: [_IndexBar, IndexAnchor] },
  )

export { indexBarProps, indexAnchorProps, IndexBar, IndexAnchor }

export type { IndexBarScrollToOptions } from './props'

export type IndexBarInstance = InstanceType<typeof _IndexBar>
export type IndexAnchorInstance = InstanceType<typeof IndexAnchor>
export const _IndexBarComponent: typeof IndexBar = IndexBar
export const _IndexAnchorComponent: typeof IndexAnchor = IndexAnchor

export default IndexBar
export type IndexBarProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
export type IndexAnchorProps = import('../_utils/public-props').CompatiblePublicProps<
  typeof import('./anchor-props').props
>
