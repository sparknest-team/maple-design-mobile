import { useValidation, withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Form from './Form.vue'
import _FormItem from './FormItem.vue'
import _FormSection from './FormSection.vue'
import { props as formItemProps } from './item-props'
import { useFormItem } from './item-provide'
import { props as formProps } from './props'
import { useForm } from './provide'
import { formSectionProps } from './section-props'

const FormItem: typeof _FormItem & { useFormItem: typeof useFormItem } = Object.assign(_FormItem, { useFormItem })

const Form: import('../utils/components').ComponentWithInstall<
  typeof _Form & {
    Item: typeof FormItem
    Section: typeof _FormSection
    useValidation: typeof useValidation
    useForm: typeof useForm
    useFormItem: typeof useFormItem
  }
> = withInstall(
  _Form,
  Object.assign(_Form, {
    Item: FormItem,
    Section: _FormSection,
    useValidation,
    useForm,
    useFormItem,
  }),
  { components: [_Form, FormItem, _FormSection] },
)

withPropsDefaultsSetter(Form, formProps)
withPropsDefaultsSetter(FormItem, formItemProps)
withPropsDefaultsSetter(_FormSection, formSectionProps)

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
export type FormProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
export type FormItemProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./item-props').props>

export type { FormLayout, FormContentAlign, FormLabelAlign, FormColProps, FormLabelFlex } from './layout-props'

export type { FormItemAsteriskPosition, FormItemValidateStatus } from './item-decoration'

export type { FieldEditMode, BeforeFieldCommit } from '../_components/field-presentation/context'

export { _FormSection as FormSection, formSectionProps }
export const _FormSectionComponent: typeof _FormSection = _FormSection
export type FormSectionInstance = InstanceType<typeof _FormSection>
export type { FormSectionProps, FormSectionSlots, FormSectionVariant } from './section-props'
