import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as sliderProps } from './props'
import Slider from './Slider.vue'

withInstall(Slider)
withPropsDefaultsSetter(Slider, sliderProps)

export { sliderProps }
export type { SliderOrientation } from './props'

export type SliderInstance = InstanceType<typeof Slider>
export const _SliderComponent: typeof Slider = Slider

export default Slider
export type SliderProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
