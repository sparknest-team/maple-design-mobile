import { Upload as RootUpload } from '../src'
import type {
  UploadFileItem,
  UploadInstance,
  UploadProps,
  UploadRequestChoose,
  UploadSlots,
  UploadTriggerPosition,
} from '../src'
import UploadDefault, { Upload as NamedUpload } from '../src/upload'
import type { UploadInstance as EntryInstance, UploadTriggerPosition as EntryTriggerPosition } from '../src/upload'

declare const instance: UploadInstance
declare const entry: EntryInstance
declare const file: UploadFileItem
const choose: Promise<void> = instance.chooseFile()
const submit: Promise<void> = instance.submit()
const retry: Promise<void> = entry.retry(file)
const remove: Promise<void> = entry.remove(file)
const replace: Promise<void> = entry.replace(file)
const slots: UploadSlots = {
  read: ({ value, text }) => text + (value?.length ?? 0),
  item: (scope) => {
    const pending: Promise<void> = scope.replace()
    return String(pending)
  },
  'remove-button': (scope) => {
    const pending: Promise<void> = scope.remove()
    return String(pending)
  },
}
const request: UploadRequestChoose = async (chooseFile, event) => {
  event.preventDefault()
  const pending: Promise<void> = chooseFile()
  await pending
}
const components: (typeof UploadDefault)[] = [NamedUpload, RootUpload]
// @ts-expect-error file status is a closed union
instance.getFiles('unknown-status')
void [choose, submit, retry, remove, replace, slots, request, components]

const triggerPosition: UploadTriggerPosition = 'after'
const entryTriggerPosition: EntryTriggerPosition = 'before'
const uploadPosition: UploadProps['triggerPosition'] = triggerPosition
// @ts-expect-error trigger position is a closed before/after union
const invalidTriggerPosition: UploadTriggerPosition = 'bottom'
void [triggerPosition, entryTriggerPosition, uploadPosition, invalidTriggerPosition]
