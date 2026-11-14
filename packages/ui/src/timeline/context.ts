import { InjectionKey } from 'vue'
import { Orientation } from '../utils/constants'
import type { LabelPositionType, ModeType } from './types'

export interface TimelineContext {
  items: number[]
  orientation: Orientation
  reverse: boolean
  labelPosition: LabelPositionType
  mode: ModeType
}

export const timelineInjectionKey: InjectionKey<TimelineContext> = Symbol('MapleTimeline')
