import { withInstall } from '../utils/components'
import _Carousel from './Carousel.vue'
import _CarouselItem from './CarouselItem.vue'
import { carouselItemProps, carouselProps } from './props'

const Carousel: import('../utils/components').ComponentWithInstall<typeof _Carousel & { Item: typeof _CarouselItem }> =
  withInstall(_Carousel, Object.assign(_Carousel, { Item: _CarouselItem }), {
    components: [_Carousel, _CarouselItem],
  })
export type CarouselInstance = InstanceType<typeof _Carousel>
export type CarouselItemInstance = InstanceType<typeof _CarouselItem>
export type { CarouselProps, CarouselItemProps } from './props'
export type {
  CarouselArrowType,
  CarouselAutoPlayConfig,
  CarouselIndicatorPosition,
  CarouselIndicatorType,
  CarouselTriggerEvent,
  CarouselOrientation,
  CarouselEffect,
  CarouselToOptions,
  CarouselChangeData,
  CarouselEmits,
  CarouselSlots,
  CarouselItemSlots,
  CarouselExpose,
  CarouselSlotScope,
} from './types'
export { Carousel, _CarouselItem as CarouselItem, carouselProps, carouselItemProps }
export const _CarouselComponent: typeof Carousel = Carousel
export const _CarouselItemComponent: typeof _CarouselItem = _CarouselItem
export default Carousel
