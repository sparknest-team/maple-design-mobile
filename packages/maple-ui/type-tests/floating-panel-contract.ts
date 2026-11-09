import { FloatingPanel } from '../src'
import type { FloatingPanelInstance, FloatingPanelProps } from '../src'
import Root, { FloatingPanel as RootNamed } from '../src/floating-panel'

const empty: FloatingPanelProps = {}
const props: FloatingPanelProps = {
  modelValue: 100,
  anchors: [100, 250],
  duration: '0',
  popupContainer: false,
  'onHeight-change': (height: number) => height.toFixed(),
  'onUpdate:modelValue': (height: number) => height.toFixed(),
}
const entries: (typeof Root)[] = [RootNamed, FloatingPanel]
// @ts-expect-error height notifications carry a scalar number
const event: FloatingPanelProps = { 'onHeight-change': (height: string) => height }
// @ts-expect-error anchors use numbers in pixels
const anchors: FloatingPanelProps = { anchors: ['100px'] }
declare const instance: FloatingPanelInstance
// @ts-expect-error there is no own public resize method
instance.resize()
void [empty, props, entries, event, anchors]
