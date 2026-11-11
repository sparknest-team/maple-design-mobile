import { Affix as RootAffix, BackTop as RootBackTop, Ellipsis as RootEllipsis } from '../src'
import type { AffixInstance, AffixProps, BackTopInstance, BackTopProps, EllipsisInstance, EllipsisProps } from '../src'
import AffixDefault, { Affix } from '../src/affix'
import type { AffixProps as SubAffixProps } from '../src/affix'
import BackTopDefault, { BackTop } from '../src/back-top'
import type { BackTopProps as SubBackTopProps } from '../src/back-top'
import EllipsisDefault, { Ellipsis } from '../src/ellipsis'
import type { EllipsisProps as SubEllipsisProps } from '../src/ellipsis'

const optional: [AffixProps, BackTopProps, EllipsisProps] = [{}, {}, {}]
const affix: AffixProps = { onChange: (fixed: boolean, offset: number) => fixed && offset.toFixed() }
const back: BackTopProps = { onClick: (event: MouseEvent) => event.preventDefault() }
const ellipsis: EllipsisProps = { 'onUpdate:expand': (expanded: boolean) => String(expanded) }
const sub: [SubAffixProps, SubBackTopProps, SubEllipsisProps] = [affix, back, ellipsis]
const affixes: (typeof AffixDefault)[] = [Affix, RootAffix]
const backs: (typeof BackTopDefault)[] = [BackTop, RootBackTop]
const texts: (typeof EllipsisDefault)[] = [Ellipsis, RootEllipsis]
// @ts-expect-error state and offset are distinct boolean/number parameters
const wrongAffix: AffixProps = { onChange: (_fixed: boolean, offset: string) => offset.toUpperCase() }
// @ts-expect-error click receives the native MouseEvent
const wrongBack: BackTopProps = { onClick: (event: string) => event.toUpperCase() }
// @ts-expect-error expand updates contain booleans
const wrongExpand: EllipsisProps = { 'onUpdate:expand': (value: number) => value.toFixed() }
declare const affixInstance: AffixInstance
const measured: Promise<void> = affixInstance.updatePosition()
declare const backInstance: BackTopInstance
const command: void = backInstance.scrollToTop()
declare const textInstance: EllipsisInstance
// @ts-expect-error Ellipsis has no imperative expansion command
textInstance.expandText()
void [optional, sub, affixes, backs, texts, measured, command, wrongAffix, wrongBack, wrongExpand]
