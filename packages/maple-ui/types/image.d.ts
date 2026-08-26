import { ImgHTMLAttributes, VNode } from 'vue'
import { ImagePreviewProps } from './imagePreview'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const imageProps: Record<keyof ImageProps, any>

export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export interface ImageProps extends BasicAttributes {
  src?: string
  previewSrc?: string
  fit?: ImageFit
  position?: string
  title?: string
  alt?: string
  description?: string
  referrerpolicy?: ImgHTMLAttributes['referrerpolicy']
  width?: string | number
  height?: string | number
  radius?: string | number
  loading?: string
  error?: string
  lazy?: boolean
  showLoader?: boolean
  ripple?: boolean
  block?: boolean
  preview?: boolean
  previewOpen?: boolean
  defaultPreviewOpen?: boolean
  previewProps?: Partial<ImagePreviewProps>
  onClick?: ListenerProp<(e: Event) => void>
  onLoad?: ListenerProp<(e: Event) => void>
  onError?: ListenerProp<(e: Event) => void>
  onPreviewOpenChange?: ListenerProp<(open: boolean) => void>
  'onUpdate:previewOpen'?: ListenerProp<(open: boolean) => void>
}

export class Image extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<ImageProps>

  $props: ImageProps

  $slots: {
    error(): VNode[]
  }
}

export class _ImageComponent extends Image {}
