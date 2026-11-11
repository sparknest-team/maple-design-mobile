import { Divider as RootDivider, type DividerProps as RootProps } from '../src'
import DefaultDivider, { Divider, type DividerInstance, type DividerProps, type DividerSize } from '../src/divider'

const props: DividerProps = {
  orientation: 'vertical',
  textAlign: 'start',
  type: 'double',
  thickness: 1,
  inset: [-8],
  spacing: [0, '2rem'],
}
const root: RootProps = props
const instance: DividerInstance | undefined = undefined
const pair: DividerSize = [8, '1rem']
// @ts-expect-error arrays require one or two lengths
const empty: DividerSize = []
// @ts-expect-error arrays require one or two lengths
const tooMany: DividerSize = [1, 2, 3]
// @ts-expect-error orientation does not use row/column
const bad: DividerProps = { orientation: 'row' }
void [DefaultDivider, Divider, RootDivider, root, instance, pair, empty, tooMany, bad]
