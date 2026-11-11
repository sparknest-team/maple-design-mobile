import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { statisticProps } from './props'
import Statistic from './Statistic.vue'

withInstall(Statistic)
withPropsDefaultsSetter(Statistic, statisticProps)

export { statisticProps }

export type StatisticInstance = InstanceType<typeof Statistic>
export type { StatisticProps, StatisticSlots } from './props'

export const _StatisticComponent: typeof Statistic = Statistic

export default Statistic
