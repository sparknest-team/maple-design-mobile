import { useInputForm } from '../input/use-input-form'
import type { UploadProps } from './props'

export function useUploadForm(props: Readonly<UploadProps>) {
  return useInputForm({
    get disabled() {
      return props.disabled
    },
    get readonly() {
      return props.readonly
    },
  })
}
