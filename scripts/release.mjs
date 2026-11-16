import { release } from '@maple-design/cli-vue'
import { checkVueArtifacts, checkVueSources } from '../../design-ui/bin/vue-compat-check.mjs'
import { verifyNativeAcceptance } from '../../design-ui/browser/native-acceptance.mjs'
import { runTaskQueue } from './build.mjs'

await release({
  task: async () => {
    checkVueSources(process.cwd())
    await runTaskQueue()
    await checkVueArtifacts(process.cwd())
    await verifyNativeAcceptance(process.cwd(), 'maple')
  },
})
