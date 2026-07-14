import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as carouselProps } from './props'
import Carousel from './Carousel.vue'

withInstall(Carousel)
withPropsDefaultsSetter(Carousel, carouselProps)

export { carouselProps }

export const _CarouselComponent = Carousel

export default Carousel
