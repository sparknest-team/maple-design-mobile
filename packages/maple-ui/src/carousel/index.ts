import { withInstall } from '../utils/components'
import _Carousel from './Carousel.vue'
import _CarouselItem from './CarouselItem.vue'
import { carouselItemProps, carouselProps } from './props'

const Carousel = withInstall(_Carousel, Object.assign(_Carousel, { Item: _CarouselItem }), {
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
  CarouselDirection,
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
export const _CarouselComponent = Carousel
export const _CarouselItemComponent = _CarouselItem
export default Carousel
