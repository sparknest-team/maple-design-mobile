import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Carousel from './Carousel.vue'
import { props as carouselProps } from './props'

withInstall(Carousel)
withPropsDefaultsSetter(Carousel, carouselProps)

export { carouselProps }

export type CarouselInstance = InstanceType<typeof Carousel>
export const _CarouselComponent = Carousel

export default Carousel
