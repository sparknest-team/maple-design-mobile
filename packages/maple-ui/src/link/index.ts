import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Link from './Link.vue'
import { props as linkProps } from './props'

withInstall(Link)
withPropsDefaultsSetter(Link, linkProps)

export { linkProps }
export type { LinkProps, LinkUnderline } from './props'

export type LinkInstance = InstanceType<typeof Link>
export const _LinkComponent = Link

export default Link
