import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'
import { carouselItemProps } from './item-props'
import { props as carouselProps } from './props'

const Carousel = withInstall(
  _Carousel,
  Object.assign(_Carousel, {
    Item: CarouselItem,
  }),
  { components: [_Carousel, CarouselItem] },
)

withPropsDefaultsSetter(Carousel, carouselProps)
withPropsDefaultsSetter(CarouselItem, carouselItemProps)

export { carouselProps, carouselItemProps, Carousel, CarouselItem }
export type {
  CarouselArrowType,
  CarouselAutoPlayConfig,
  CarouselChangeData,
  CarouselDirection,
  CarouselEffect,
  CarouselIndicatorPosition,
  CarouselIndicatorType,
  CarouselProps,
  CarouselToOptions,
  CarouselTriggerEvent,
} from './props'

export type CarouselInstance = InstanceType<typeof _Carousel>
export type CarouselItemInstance = InstanceType<typeof CarouselItem>
export const _CarouselComponent = Carousel
export const _CarouselItemComponent = CarouselItem

export default Carousel
