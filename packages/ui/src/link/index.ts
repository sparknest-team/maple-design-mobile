import { withInstall } from '../utils/components'
import LinkSource from './Link.vue'
import { linkProps } from './props'

const Link = withInstall(LinkSource)

export { Link, linkProps }
export type { LinkProps, LinkUnderline, LinkSize } from './props'

export type LinkInstance = InstanceType<typeof Link>
export const _LinkComponent: typeof Link = Link

export default Link
