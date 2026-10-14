import { useValidation, withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Form from './Form.vue'
import FormItem from './FormItem.vue'
import { props as formItemProps } from './item-props'
import { useFormItem } from './item-provide'
import { props as formProps } from './props'
import { useForm } from './provide'

const Form = withInstall(
  _Form,
  Object.assign(_Form, {
    Item: FormItem,
  }),
  { components: [_Form, FormItem] },
)

Form.useValidation = useValidation
Form.useForm = useForm
Form.useFormItem = useFormItem
FormItem.useFormItem = useFormItem
withPropsDefaultsSetter(Form, formProps)
withPropsDefaultsSetter(FormItem, formItemProps)

export { formProps, formItemProps, Form, FormItem }
export { useFormItem } from './item-provide'
export type { FormFieldError as ValidatedError, FormValidateErrors } from './form-controller'

export type FormInstance = InstanceType<typeof _Form>
export type FormItemInstance = InstanceType<typeof FormItem>
export const _FormComponent: typeof Form = Form
export const _FormItemComponent: typeof FormItem = FormItem

export default Form
export type FormProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
export type FormItemProps = import('vue').ExtractPublicPropTypes<typeof import('./item-props').props>

export type { FormLayout, FormLabelAlign, FormColProps, FormLabelFlex } from './layout-props'

export type { FormItemAsteriskPosition, FormItemValidateStatus } from './item-decoration'
