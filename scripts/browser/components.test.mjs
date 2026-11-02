import { fileURLToPath } from 'node:url'
import { defineProductionNavigationTests } from '../../../design-ui/browser/navigation-gate.mjs'
import { defineProductionComponentTests } from '../../../design-ui/browser/runner.mjs'

defineProductionNavigationTests({ root: fileURLToPath(new URL('../../', import.meta.url)), library: 'maple' })
defineProductionComponentTests({ root: fileURLToPath(new URL('../../', import.meta.url)), library: 'maple' })
