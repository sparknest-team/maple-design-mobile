import { withInstall } from '../utils/components'
import CodeSource from './Code.vue'
import { props as codeProps } from './props'

const Code = withInstall(CodeSource)

export { codeProps }

export type CodeInstance = InstanceType<typeof Code>
export const _CodeComponent: typeof Code = Code

export default Code
export type CodeProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
