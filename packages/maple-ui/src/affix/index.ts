import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Affix from './Affix.vue'
import { affixProps } from './props'

withInstall(Affix)
withPropsDefaultsSetter(Affix, affixProps)

export { Affix, affixProps }

export type AffixInstance = InstanceType<typeof Affix>
export const _AffixComponent: typeof Affix = Affix

export default Affix

export type { AffixProps, AffixTarget } from './props'
