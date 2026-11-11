import { useValidation, withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Form from './Form.vue'
import _FormItem from './FormItem.vue'
import { props as formItemProps } from './item-props'
import { useFormItem } from './item-provide'
import { props as formProps } from './props'
import { useForm } from './provide'

const FormItem = Object.assign(_FormItem, { useFormItem })

const Form = withInstall(
  _Form,
  Object.assign(_Form, {
    Item: FormItem,
    useValidation,
    useForm,
    useFormItem,
  }),
  { components: [_Form, FormItem] },
)

withPropsDefaultsSetter(Form, formProps)
withPropsDefaultsSetter(FormItem, formItemProps)

export { formProps, formItemProps, Form, FormItem }
export { useFormItem } from './item-provide'
export { useFormErrorDescription } from './error-description'
export type {
  ValidatedError,
  FormValidateErrors,
  FormRule,
  FormRules,
  FormRuleContext,
  FieldData,
  FormEmits,
  FormSlots,
  FormItemSlots,
  FormEditingError,
  FormSubmitError,
} from './types'

export type FormInstance = InstanceType<typeof _Form>
export type FormItemInstance = InstanceType<typeof FormItem>
export const _FormComponent: typeof Form = Form
export const _FormItemComponent: typeof FormItem = FormItem

export default Form
export type FormProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
export type FormItemProps = import('vue').ExtractPublicPropTypes<typeof import('./item-props').props>

export type { FormLayout, FormContentAlign, FormLabelAlign, FormColProps, FormLabelFlex } from './layout-props'

export type { FormItemAsteriskPosition, FormItemValidateStatus } from './item-decoration'

export type { FieldEditMode, BeforeFieldCommit } from '../_components/field-presentation/context'
