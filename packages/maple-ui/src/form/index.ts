import { useFormItem } from '../form-item'
import { useValidation, withInstall, withPropsDefaultsSetter } from '../utils/components'
import Form from './Form.vue'
import { props as formProps } from './props'
import { useForm } from './provide'

Form.useValidation = useValidation
Form.useForm = useForm
Form.useFormItem = useFormItem
withInstall(Form)
withPropsDefaultsSetter(Form, formProps)

export { formProps }

export type FormInstance = InstanceType<typeof Form>
export const _FormComponent = Form

export default Form
