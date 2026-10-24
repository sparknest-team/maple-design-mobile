import type { PropType } from 'vue'
import { imagePreviewProps } from './previewProps'

const { src: _src, previewedImgProps: _previewedImgProps, ...previewGroupSharedProps } = imagePreviewProps

void _src
void _previewedImgProps

export const imagePreviewGroupProps = {
  ...previewGroupSharedProps,
  images: Array as PropType<string[]>,
  modelValue: { type: Number, default: undefined },
  defaultValue: { type: Number, default: 1 },
  loop: { type: Boolean, default: false },
}
