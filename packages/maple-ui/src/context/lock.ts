import { createNamespace } from '../utils/components'
import { useScrollLock } from '../utils/scroll-lock'

const { n } = createNamespace('')

export function useLock(
  source: () => boolean,
  useSource: () => boolean = () => true,
  target: () => HTMLElement | undefined = () => (typeof document === 'undefined' ? undefined : document.body),
) {
  useScrollLock(target, () => source() && useSource(), { className: n('$--lock'), reserveScrollBar: true })
}
