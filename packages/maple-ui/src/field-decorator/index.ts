import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import FieldDecorator from './FieldDecorator.vue'
import { props as fieldDecoratorProps } from './props'

withInstall(FieldDecorator)
withPropsDefaultsSetter(FieldDecorator, fieldDecoratorProps)

export { fieldDecoratorProps }

export type FieldDecoratorInstance = InstanceType<typeof FieldDecorator>
export const _FieldDecoratorComponent: typeof FieldDecorator = FieldDecorator

export default FieldDecorator
export type FieldDecoratorProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
