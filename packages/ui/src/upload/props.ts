import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { emptyValueProp } from '../utils/empty-value'
import type {
  UploadBeforeRead,
  UploadBeforeRemove,
  UploadBeforeUpload,
  UploadCapture,
  UploadCreateThumbnailUrl,
  UploadCustomRequest,
  UploadData,
  UploadFileItem,
  UploadHeaders,
  UploadImageFit,
  UploadIsSuccessResponse,
  UploadListType,
  UploadResolveType,
  UploadTriggerPosition,
} from './interfaces'

export const uploadProps = {
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<UploadFileItem[]>(),
  modelValue: Array as PropType<UploadFileItem[] | null>,
  defaultValue: {
    type: Array as PropType<UploadFileItem[]>,
    default: () => [],
  },
  accept: String,
  capture: [String, Boolean] as PropType<UploadCapture>,
  multiple: Boolean,
  /** Enable replacement of a selected file without first removing it. */
  reupload: Boolean,
  directory: Boolean,
  draggable: Boolean,
  disabled: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
  elevation: { type: [Boolean, Number], default: false },
  ripple: { type: Boolean, default: true },
  requestChoose: Function as PropType<import('./interfaces').UploadRequestChoose>,
  action: String,
  method: {
    type: String,
    default: 'post',
  },
  headers: [Object, Function] as PropType<UploadHeaders>,
  data: [Object, Function] as PropType<UploadData>,
  name: {
    type: [String, Function] as PropType<string | ((file: UploadFileItem) => string)>,
    default: 'file',
  },
  withCredentials: Boolean,
  customRequest: Function as PropType<UploadCustomRequest>,
  autoUpload: {
    type: Boolean,
    default: true,
  },
  maxFiles: Number,
  maxFileSize: Number,
  maxTotalSize: Number,
  listType: {
    type: String as PropType<UploadListType>,
    default: 'text',
  },
  /** 上传入口在文件列表之前或之后；按 DOM 顺序解释，不因 RTL 改写。 */
  triggerPosition: {
    type: String as PropType<UploadTriggerPosition>,
    default: 'after',
    validator: (value: string) => ['before', 'after'].includes(value),
  },
  imageFit: {
    type: String as PropType<UploadImageFit>,
    default: 'cover',
  },
  showFileList: {
    type: Boolean,
    default: true,
  },
  showUploadButton: {
    type: Boolean,
    default: true,
  },
  showRemoveButton: {
    type: Boolean,
    default: true,
  },
  showRetryButton: {
    type: Boolean,
    default: true,
  },
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  showPreviewButton: {
    type: Boolean,
    default: true,
  },
  showDownloadButton: Boolean,
  resolveType: {
    type: String as PropType<UploadResolveType>,
    default: 'object-url',
  },
  preview: {
    type: Boolean,
    default: true,
  },
  createThumbnailUrl: Function as PropType<UploadCreateThumbnailUrl>,
  beforeAdd: Function as PropType<(files: File[]) => File[] | Promise<File[]>>,
  beforeRead: Function as PropType<UploadBeforeRead>,
  beforeUpload: Function as PropType<UploadBeforeUpload>,
  beforeRemove: Function as PropType<UploadBeforeRemove>,
  isSuccessResponse: Function as PropType<UploadIsSuccessResponse>,
}

export type UploadProps = import('../_utils/public-props').CompatiblePublicProps<typeof uploadProps>
