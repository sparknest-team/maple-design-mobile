import { withInstall } from '../utils/components'
import _Mention from './presentation'
import { mentionProps } from './props'

const Mention: import('../utils/components').ComponentWithInstall<typeof _Mention> = withInstall(_Mention)

export type MentionInstance = InstanceType<typeof _Mention> & import('./types').MentionExpose

export const _MentionComponent: typeof Mention = Mention

export { Mention }

export { mentionProps }

export default Mention
export type MentionProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').mentionProps>
export type { MentionEmits, MentionSlots, MentionExpose } from './types'
export type { MentionTokenValue } from './token-codec'
