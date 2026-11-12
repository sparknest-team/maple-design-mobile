import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Mention from './presentation'
import { mentionProps } from './props'

withPropsDefaultsSetter(_Mention, mentionProps)
const Mention = withInstall(_Mention, Object.assign(_Mention, {}), { components: [_Mention] })

export type MentionInstance = InstanceType<typeof _Mention> & import('./types').MentionExpose

export const _MentionComponent = Mention

export { Mention }

export { mentionProps }

export default Mention
export type MentionProps = import('vue').ExtractPublicPropTypes<typeof import('./props').mentionProps>
export type { MentionEmits, MentionSlots, MentionExpose } from './types'
export type { MentionTokenValue } from './token-codec'
