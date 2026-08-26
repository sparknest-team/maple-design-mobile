import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as sliderProps } from './props'
import Slider from './Slider.vue'

withInstall(Slider)
withPropsDefaultsSetter(Slider, sliderProps)

export { sliderProps }

export type SliderInstance = InstanceType<typeof Slider>
export const _SliderComponent = Slider

export default Slider
