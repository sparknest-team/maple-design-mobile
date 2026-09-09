import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Code from './Code.vue'
import { props as codeProps } from './props'

withInstall(Code)
withPropsDefaultsSetter(Code, codeProps)

export { codeProps }

export type CodeInstance = InstanceType<typeof Code>
export const _CodeComponent: typeof Code = Code

export default Code
export type CodeProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
