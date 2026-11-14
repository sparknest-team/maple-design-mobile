import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { watermarkProps } from './props'
import _WatermarkSource from './watermark'

const _Watermark = withInstall(_WatermarkSource)
withPropsDefaultsSetter(_Watermark, watermarkProps)

export type WatermarkInstance = InstanceType<typeof _Watermark> & import('./types').WatermarkExposed
export type WatermarkProps = import('../_utils/public-props').CompatiblePublicProps<
  typeof import('./props').watermarkProps
>
export type { WatermarkError, WatermarkExposed, WatermarkFont } from './types'
export { watermarkProps }
export const _WatermarkComponent: typeof _Watermark = _Watermark
export default _Watermark
