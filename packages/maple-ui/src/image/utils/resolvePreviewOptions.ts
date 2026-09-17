import type { ImagePreviewActionName, ImagePreviewProps } from '../api'

type TeleportTarget = string | false | HTMLElement | undefined

function toNumber(value: number | string): number {
  return typeof value === 'number' ? value : Number(value)
}

export function resolvePreviewImages(source: { images?: string[]; src?: string }): string[] {
  if (source.images?.length) {
    return source.images
  }
  if (source.src) {
    return [source.src]
  }
  return []
}

export function resolvePreviewOpen(source: { open?: boolean; defaultOpen?: boolean }, localOpen?: boolean): boolean {
  if (source.open !== undefined) {
    return source.open
  }
  return localOpen ?? source.defaultOpen ?? false
}

export function resolvePreviewCurrent(
  source: { current?: number | string; defaultCurrent?: number },
  localCurrent?: number,
): number {
  if (source.current !== undefined) {
    return toNumber(source.current)
  }
  if (localCurrent !== undefined) {
    return localCurrent
  }
  return source.defaultCurrent ?? 0
}

export function resolveClosable(source: { closable?: boolean }, fallback: boolean): boolean {
  return source.closable ?? fallback
}

export function resolveOverlayClosable(source: { overlayClosable?: boolean }, fallback: boolean): boolean {
  return source.overlayClosable ?? fallback
}

export function resolveLoop(source: { loop?: boolean }, fallback: boolean): boolean {
  return source.loop ?? fallback
}

export function resolvePopupContainer(source: { popupContainer?: TeleportTarget }): TeleportTarget {
  return source.popupContainer
}

export function resolveEscToClose(source: { escToClose?: boolean }, fallback = true): boolean {
  return source.escToClose ?? fallback
}

export function resolveActionsLayout(
  source: { actionsLayout?: ImagePreviewActionName[] },
  fallback: ImagePreviewActionName[] = [],
): ImagePreviewActionName[] {
  return source.actionsLayout ?? fallback
}

export function mergePreviewProps<T extends Partial<ImagePreviewProps>>(
  platformDefaults: Partial<ImagePreviewProps>,
  previewProps?: Partial<ImagePreviewProps>,
  directProps?: Partial<ImagePreviewProps>,
): T {
  return {
    ...platformDefaults,
    ...previewProps,
    ...directProps,
  } as T
}
