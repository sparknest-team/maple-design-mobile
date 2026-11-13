import type { Ref, ShallowRef, UnwrapRef } from 'vue'
import type { MotionState } from '@maple-design/shared-vue'
import type { CompatibleShallowRef } from '../src/_utils/compatible-shallow-ref'
import { useClientId } from '../src/useClientId'
import { useId } from '../src/useId'
import { useInitialized } from '../src/useInitialized'
import { useMotion } from '../src/useMotion'
import type { TouchDirection } from '../src/useTouch'
import { useTouch } from '../src/useTouch'
import { useWindowSize } from '../src/useWindowSize'

type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
type Assert<T extends true> = T
type Touch = {
  startX: Ref<number>
  startY: Ref<number>
  deltaX: Ref<number>
  deltaY: Ref<number>
  offsetX: Ref<number>
  offsetY: Ref<number>
  prevX: Ref<number>
  prevY: Ref<number>
  moveX: Ref<number>
  moveY: Ref<number>
  direction: Ref<TouchDirection | undefined>
  touching: Ref<boolean>
  dragging: Ref<boolean>
  startTime: Ref<number>
  distance: Ref<number>
  resetTouch: () => void
  startTouch: (event: TouchEvent) => void
  moveTouch: (event: TouchEvent) => void
  endTouch: () => void
  isReachTop: (element: Element | Window) => boolean
  isReachBottom: (element: Element, offset?: number) => boolean
}
type Motion = { value: Ref<number>; state: Ref<MotionState>; start: () => void; pause: () => void; reset: () => void }
export type TouchContract = Assert<Same<ReturnType<typeof useTouch>, Touch>>
export type MotionContract = Assert<Same<ReturnType<typeof useMotion>, Motion>>
export type IdContract = Assert<Same<ReturnType<typeof useId>, Ref<string | undefined>>>
export type ClientIdContract = Assert<Same<ReturnType<typeof useClientId>, Ref<string | undefined>>>
export type InitializedContract = Assert<Same<ReturnType<typeof useInitialized>, Ref<boolean>>>
export type WindowContract = Assert<Same<ReturnType<typeof useWindowSize>, { width: Ref<number>; height: Ref<number> }>>
type ShallowValue = { nested: Ref<number> }
export type SharedShallowContract = Assert<Same<CompatibleShallowRef<ShallowValue>, ShallowRef<ShallowValue>>>
export type SharedShallowUnwrap = Assert<
  Same<UnwrapRef<CompatibleShallowRef<ShallowValue>>, UnwrapRef<ShallowRef<ShallowValue>>>
>
