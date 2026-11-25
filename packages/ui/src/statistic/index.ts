import { withInstall } from '../utils/components'
import { statisticProps } from './props'
import StatisticSource from './Statistic.vue'

const Statistic = withInstall(StatisticSource)

export { statisticProps }

export type StatisticInstance = InstanceType<typeof Statistic>
export type { StatisticProps, StatisticSlots } from './props'

export const _StatisticComponent: typeof Statistic = Statistic

export default Statistic
