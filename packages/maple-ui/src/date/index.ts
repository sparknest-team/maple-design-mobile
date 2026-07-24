import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Date from './Date.vue'
import { props as dateProps } from './props'

withInstall(Date)
withPropsDefaultsSetter(Date, dateProps)

export type DateInstance = InstanceType<typeof Date>
export type { DateProps, DateType } from './props'
export { dateProps }

export const _DateComponent = Date

export default Date
