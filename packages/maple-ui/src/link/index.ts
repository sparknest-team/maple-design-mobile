import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Link from './Link.vue'
import { linkProps } from './props'

withInstall(Link)
withPropsDefaultsSetter(Link, linkProps)

export { Link, linkProps }
export type { LinkProps, LinkUnderline, LinkSize } from './props'

export type LinkInstance = InstanceType<typeof Link>
export const _LinkComponent: typeof Link = Link

export default Link
