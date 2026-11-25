import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import FieldDecoratorSource from './FieldDecorator.vue'
import { fieldDecoratorProps } from './props'

const FieldDecorator = withInstall(FieldDecoratorSource)

// The SFC adds an internal prop, while embedded fields read the public descriptors.
const setComponentDefaults = FieldDecorator.setPropsDefaults
const publicDefaults = withPropsDefaultsSetter({}, fieldDecoratorProps)
FieldDecorator.setPropsDefaults = (defaults) => {
  setComponentDefaults(defaults)
  publicDefaults.setPropsDefaults(defaults)
}

export { FieldDecorator, fieldDecoratorProps }

export type FieldDecoratorInstance = InstanceType<typeof FieldDecorator>
export const _FieldDecoratorComponent: typeof FieldDecorator = FieldDecorator

export default FieldDecorator
export type { FieldDecoratorProps, FieldDecoratorSize, FieldDecoratorVariant } from './props'

export type { OpenTriggerTarget } from '../_components/picker-field/open-trigger'

export { fieldLoadingProps, fieldLoadingModes } from './props'
export type { FieldLoadingMode, FieldLoadingProps } from './props'
