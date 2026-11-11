import type { FormItemProps, FormProps } from '@maple-design/ui-vue'
import type { FormProps as EntryFormProps, FormItemProps as EntryItemProps } from '@maple-design/ui-vue/form'

const form: FormProps = { editMode: 'direct', readPretty: false }
const item: FormItemProps = { editMode: 'popup', readPretty: true }
const entryForm: EntryFormProps = form
const entryItem: EntryItemProps = item
// @ts-expect-error Internal descriptor name is not a public configuration prop.
const invalidForm: FormProps = { fieldEditModeProp: 'direct' }
// @ts-expect-error Internal descriptor name is not a public configuration prop.
const invalidItem: FormItemProps = { fieldEditModeProp: 'popup' }
void [form, item, entryForm, entryItem, invalidForm, invalidItem]
