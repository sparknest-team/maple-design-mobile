import { resolveDirection, useDirection } from '../../../_utils/direction'
import { reactive, ref, watch, type Ref } from 'vue'
import { useResizeGesture } from '../../../_hooks/use-resize-gesture'
import { EmitFn2 } from '../../../_utils/types'

export const useColumnResize = (
  thRefs: Ref<Record<string, HTMLElement>>,
  emit: EmitFn2<{ "column-resize": (dataIndex: string, width: number) => true }>,
) => {
  const resizingColumn = ref('')
  const columnWidth = reactive<Record<string, number>>({})
  const { dir } = useDirection(() => Object.values(thRefs.value)[0])
  let cell: HTMLElement | undefined
  let initialWidth = 0
  let rtl = false
  const writeWidth = (key: string, width: number) => {
    const next = Math.max(40, Math.ceil(width))
    columnWidth[key] = next
    emit('column-resize', key, next)
  }
  const clearResizeState = () => { resizingColumn.value = ''; cell = undefined }
  const gesture = useResizeGesture({
    element: () => cell,
    cursor: () => 'col-resize',
    start() { initialWidth = cell?.getBoundingClientRect().width ?? 0; rtl = resolveDirection(cell) === 'rtl'; return !!initialWidth },
    move(dx) {
      if (cell !== thRefs.value[resizingColumn.value]) { handleThMouseUp(); return }
      writeWidth(resizingColumn.value, initialWidth + (rtl ? -dx : dx))
    },
    end: clearResizeState,
    cancel: clearResizeState,
  })
  const handleThMouseUp = () => { gesture.cancel(); clearResizeState() }
  watch(dir, handleThMouseUp, { flush: 'sync' })
  const handleThMouseDown = (dataIndex: string, event: MouseEvent) => {
    if (event.type === 'mousedown' && 'PointerEvent' in window) return
    if (resizingColumn.value || event.button !== 0) return
    cell = thRefs.value[dataIndex]
    if (!cell) return
    resizingColumn.value = dataIndex
    if (!gesture.begin(event)) handleThMouseUp()
  }
  const handleThKeydown = (dataIndex: string, event: KeyboardEvent) => {
    if (event.target !== event.currentTarget || !['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) return
    const element = thRefs.value[dataIndex]
    if (!element) return
    event.preventDefault()
    const forward = resolveDirection(element) === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const current = columnWidth[dataIndex] ?? element.getBoundingClientRect().width
    writeWidth(dataIndex, event.key === 'Home' ? 40 : current + (event.key === forward ? 1 : -1) * (event.shiftKey ? 50 : 10))
  }
  return { resizingColumn, columnWidth, handleThMouseDown, handleThMouseUp, handleThKeydown }
}
