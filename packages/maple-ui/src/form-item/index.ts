import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import FormItem from './FormItem.vue'
import { props as formItemProps } from './props'
import { useFormItem } from './provide'

FormItem.useFormItem = useFormItem
withInstall(FormItem)
withPropsDefaultsSetter(FormItem, formItemProps)

export { formItemProps }
export { useFormItem } from './provide'

export type FormItemInstance = InstanceType<typeof FormItem>
export const _FormItemComponent = FormItem

export default FormItem
