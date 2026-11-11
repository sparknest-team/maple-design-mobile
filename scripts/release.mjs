import { release } from '@maple-design/cli-vue'
import { verifyNativeAcceptance } from '../../design-ui/browser/native-acceptance.mjs'
import { runTaskQueue } from './build.mjs'

await release({
  task: async () => {
    await runTaskQueue()
    await verifyNativeAcceptance(process.cwd(), 'maple')
  },
})
