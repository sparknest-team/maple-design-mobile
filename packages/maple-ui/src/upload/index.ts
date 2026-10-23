import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Upload from './presentation'
import { uploadProps } from './props'

withInstall(Upload)
withPropsDefaultsSetter(Upload, uploadProps)
export type UploadInstance = InstanceType<typeof Upload>
export type * from './interfaces'
export type { UploadProps } from './props'
export type { UseUploaderOptions } from './composables/use-uploader'
export { uploadProps }
export { useUploader } from './composables/use-uploader'
export const _UploadComponent = Upload
export default Upload
