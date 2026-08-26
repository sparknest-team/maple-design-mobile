import { VNode } from 'vue'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export declare const watermarkProps: Record<keyof WatermarkProps, any>

export interface WatermarkFont {
  fontSize?: number
  fontVariant?: string
  fontWeight?: string
  fontStyle?: string
  fontFamily?: string
}

export interface WatermarkProps extends BasicAttributes {
  width?: number
  height?: number
  content?: string
  image?: string
  rotate?: number
  offset?: [number, number]
  gap?: [number, number]
  zIndex?: number | string
  alpha?: number | string
  fullscreen?: boolean
  font?: WatermarkFont
}

export class Watermark extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<WatermarkProps>

  $props: WatermarkProps

  $slots: {
    content(): VNode[]
  }

  resize(): void
}

export class _WatermarkComponent extends Watermark {}
