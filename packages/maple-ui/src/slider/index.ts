import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { sliderProps } from './props'
import Slider from './Slider.vue'

withInstall(Slider)
withPropsDefaultsSetter(Slider, sliderProps)

export { sliderProps }
export type {
  SliderOrientation,
  SliderValue,
  SliderTooltipFormatter,
  SliderTooltipVisibility,
  SliderEmits,
  SliderSlots,
  SliderExpose,
  SliderProps,
} from './props'

export type SliderInstance = InstanceType<typeof Slider>
export const _SliderComponent: typeof Slider = Slider

export default Slider
