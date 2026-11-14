import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import SliderSource from './presentation'
import { sliderProps } from './props'

const Slider = withInstall(SliderSource)
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
