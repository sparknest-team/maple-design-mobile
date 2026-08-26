import { withInstall } from '../utils/components'
import CarouselItem from './CarouselItem.vue'
import { carouselItemProps } from './props'

withInstall(CarouselItem)

export type CarouselItemInstance = InstanceType<typeof CarouselItem>
export type { CarouselItemProps } from './props'
export { carouselItemProps }
export const _CarouselItemComponent = CarouselItem

export default CarouselItem
