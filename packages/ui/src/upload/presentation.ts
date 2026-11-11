import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import type { UploadFileItem } from './interfaces'
import Base from './Upload.vue'

const asynchronousMethods = new Set(['chooseFile', 'replace', 'submit', 'retry', 'remove'])

export default withFieldPresentation(Base, {
  methods: [
    'chooseFile',
    'replace',
    'submit',
    'abort',
    'retry',
    'remove',
    'reset',
    'clearSuccess',
    'clearError',
    'getFiles',
    'preview',
    'closePreview',
  ],
  inactiveMethod: (name, value, args) => {
    if (name === 'getFiles') {
      const files: UploadFileItem[] = Array.isArray(value) ? value : []
      return files.filter((file) => !args[0] || file.status === args[0]).map((file) => ({ ...file }))
    }
    if (asynchronousMethods.has(name)) {
      return Promise.resolve()
    }
  },
})
