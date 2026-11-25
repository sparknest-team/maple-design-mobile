import { getCurrentInstance, inject, provide, shallowRef, watchPostEffect, type InjectionKey } from 'vue'
import { usePopupContainer, type PopupContainer } from './popup-container'

const layerDocumentKey: InjectionKey<() => Document | undefined> = Symbol('layer-document')

/** Inline layers belong to the source anchor even while Teleport retains its previous target. */
export function useLayerContainer(source: () => PopupContainer | undefined) {
  const instance = getCurrentInstance()
  const popupContainerTarget = usePopupContainer(source)
  const parentDocument = inject(layerDocumentKey, undefined)
  const inlineDocument = shallowRef<Document>()
  watchPostEffect(() => {
    if (source() === false) {
      // Teleport can adopt a whole subtree without changing a nested layer's props or ref.
      parentDocument?.()
      inlineDocument.value = instance?.vnode.el?.ownerDocument
    }
  })
  const scrollLockTarget = () => {
    if (source() === false) {
      return inlineDocument.value?.body
    }
    const target = popupContainerTarget.value
    return typeof target === 'string' ? globalThis.document?.body : target
  }
  const modalDocument = () => scrollLockTarget()?.ownerDocument
  provide(layerDocumentKey, modalDocument)
  return { popupContainerTarget, scrollLockTarget, modalDocument }
}
