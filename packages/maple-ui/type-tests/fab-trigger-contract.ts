import { h } from 'vue'
import type { FabTriggerProps } from '@maple-design/ui'
import Fab from '@maple-design/ui/fab'
import type { FabTriggerProps as EntryTriggerProps } from '@maple-design/ui/fab'

const trigger: FabTriggerProps = { 'aria-expanded': true, 'aria-controls': 'actions' }
const entryTrigger: EntryTriggerProps = trigger
h(Fab, {
  onOpened: (element: Element) => element.getBoundingClientRect(),
  onClosed: (element: Element) => element.getBoundingClientRect(),
})
void entryTrigger
