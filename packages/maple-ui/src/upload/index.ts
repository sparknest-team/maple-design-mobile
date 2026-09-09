import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as uploadProps } from './props'
import Upload from './Upload.vue'

withInstall(Upload)
withPropsDefaultsSetter(Upload, uploadProps)

export { uploadProps }
export type { UploadFileItem, UploadStatus, UploadResolveType } from './props'

export type UploadInstance = InstanceType<typeof Upload>
export const _UploadComponent: typeof Upload = Upload

export default Upload
export type UploadProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
