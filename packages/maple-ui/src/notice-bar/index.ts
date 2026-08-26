import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import NoticeBar from './NoticeBar.vue'
import { props as noticeBarProps } from './props'

withInstall(NoticeBar)
withPropsDefaultsSetter(NoticeBar, noticeBarProps)

export { noticeBarProps }
export type { NoticeBarMode, NoticeBarType } from './props'

export type NoticeBarInstance = InstanceType<typeof NoticeBar>
export const _NoticeBarComponent = NoticeBar

export default NoticeBar
