import { release } from '@maplejs/maple-cli'
import { runTaskQueue } from './build.mjs'

await release({ task: runTaskQueue })
