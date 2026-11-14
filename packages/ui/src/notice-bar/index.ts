import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import NoticeBarSource from './NoticeBar.vue'
import { props as noticeBarProps } from './props'

const NoticeBar = withInstall(NoticeBarSource)
withPropsDefaultsSetter(NoticeBar, noticeBarProps)

export { noticeBarProps }
export type { NoticeBarMode, NoticeBarType } from './props'

export type NoticeBarInstance = InstanceType<typeof NoticeBar>
export const _NoticeBarComponent: typeof NoticeBar = NoticeBar

export default NoticeBar
export type NoticeBarProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
