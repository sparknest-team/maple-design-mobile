import { release } from '@maple-design/cli'
import { runTaskQueue } from './build.mjs'

await release({ task: runTaskQueue })
