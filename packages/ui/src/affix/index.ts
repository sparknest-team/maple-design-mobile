import { withInstall } from '../utils/components'
import AffixSource from './Affix.vue'
import { affixProps } from './props'

const Affix = withInstall(AffixSource)

export { Affix, affixProps }

export type AffixInstance = InstanceType<typeof Affix>
export const _AffixComponent: typeof Affix = Affix

export default Affix

export type { AffixProps, AffixTarget } from './props'
