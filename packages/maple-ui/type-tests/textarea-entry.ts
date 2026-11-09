import { h } from 'vue'
import { Textarea as RootTextarea } from '@maple-design/ui'
import type { TextareaEmits, TextareaInstance, TextareaProps } from '@maple-design/ui'
import DefaultTextarea, { _TextareaComponent, Textarea as NamedTextarea } from '../src/textarea'

const named: typeof DefaultTextarea = NamedTextarea
const root: typeof RootTextarea = NamedTextarea
const install: typeof _TextareaComponent = NamedTextarea
const props: TextareaProps = {
  modelValue: null,
  autoSize: { minRows: 2, maxRows: 4 },
  loading: true,
  loadingMode: 'line',
}
const change: TextareaEmits['change'] = [null]
h(NamedTextarea, {
  ...props,
  onChange(value, event) {
    const text: string | null = value
    const source: Event | undefined = event
    void [text, source]
  },
})
declare const instance: TextareaInstance
instance.focus({ preventScroll: true })
instance.blur()
instance.select()
const native: HTMLTextAreaElement | undefined = instance.textareaRef
// @ts-expect-error Textarea change sources are optional DOM Events, not booleans.
const invalid: TextareaEmits['change'] = ['value', false]
void [named, root, install, props, change, native, invalid]
