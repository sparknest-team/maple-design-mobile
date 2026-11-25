import { withInstall } from '../utils/components'
import UploadSource from './presentation'
import { uploadProps } from './props'

const Upload = withInstall(UploadSource)
export type UploadInstance = InstanceType<typeof Upload>
export type * from './interfaces'
export type { UploadProps } from './props'
export type { UseUploaderOptions } from './composables/use-uploader'
export { Upload, uploadProps }
export { useUploader } from './composables/use-uploader'
export const _UploadComponent: typeof Upload = Upload
export default Upload
