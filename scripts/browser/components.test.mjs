import { fileURLToPath } from 'node:url'
import { defineProductionComponentTests } from '../../../design-ui/browser/runner.mjs'

defineProductionComponentTests({ root: fileURLToPath(new URL('../../', import.meta.url)), library: 'maple' })
