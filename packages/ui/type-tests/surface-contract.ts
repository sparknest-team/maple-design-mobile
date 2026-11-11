import { Paper as RootPaper } from '../src'
import type { PaperInstance, PaperProps, SafeAreaEdge, SafeAreaInstance, SafeAreaProps } from '../src'
import PaperDefault, { Paper, paperProps } from '../src/paper'
import type { PaperProps as SubProps } from '../src/paper'
import SafeArea from '../src/safe-area'

const minimal: PaperProps = {}
const props: PaperProps = {
  width: 0,
  radius: 'calc(1rem + 2px)',
  onClick: (event: MouseEvent) => event.preventDefault(),
}
const sub: SubProps = props
const components: (typeof PaperDefault)[] = [Paper, RootPaper]
// @ts-expect-error click receives the real native MouseEvent
const wrong: PaperProps = { onClick: (value: string) => value.toUpperCase() }
declare const instance: PaperInstance
// @ts-expect-error surfaces do not expose business execution methods
instance.run()
void [minimal, sub, props, components, paperProps, wrong]
const edges: SafeAreaEdge[] = ['top', 'right', 'bottom', 'left']
const area: SafeAreaProps = { edges }
SafeArea.setInsets({ bottom: 0 })
declare const areaInstance: SafeAreaInstance
// @ts-expect-error setInsets belongs to the installed component, not component instances
areaInstance.setInsets({ bottom: 0 })
void area
