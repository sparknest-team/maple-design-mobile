import type { TabBarBeforeChange, TabBarProps } from '@maple-design/ui'
import type { TabBarBeforeChange as SubpathGuard } from '@maple-design/ui/tab-bar'

const guard: TabBarBeforeChange = async (value) => value === 'allowed'
const subpath: SubpathGuard = guard
const props: TabBarProps = { beforeChange: [guard, () => 1] }
// @ts-expect-error Guard values are names or indices.
const wrong: TabBarBeforeChange = (value: boolean) => value
void [subpath, props, wrong]
