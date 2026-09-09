import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as watermarkProps } from './props'
import Watermark from './Watermark.vue'

withInstall(Watermark)
withPropsDefaultsSetter(Watermark, watermarkProps)

export { watermarkProps }

export type WatermarkInstance = InstanceType<typeof Watermark>
export const _WatermarkComponent: typeof Watermark = Watermark

export default Watermark
export type WatermarkProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
