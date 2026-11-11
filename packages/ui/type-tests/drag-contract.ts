import { Drag } from '../src'
import type { DragAttraction, DragAxis, DragBoundary, DragInstance, DragProps } from '../src'
import Default, { Drag as SubDrag } from '../src/drag'

const empty: DragProps = {}
const axis: DragAxis = 'xy',
  attraction: DragAttraction = 'x',
  boundary: DragBoundary = { left: '1rem', right: 0 }
const props: DragProps = { axis, attraction, boundary, onClick: (event: Event) => event.preventDefault() }
const entries: (typeof Default)[] = [Drag, SubDrag]
// @ts-expect-error physical axis union only
const bad: DragProps = { axis: 'left' }
// @ts-expect-error click carries an original event
const event: DragProps = { onClick: (value: number) => value }
declare const instance: DragInstance
const result: void = instance.resize()
instance.reset()
void [empty, props, entries, bad, event, result]
