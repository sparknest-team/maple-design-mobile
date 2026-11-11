import { resolve } from 'path'
import { createSpinner } from 'nanospinner'
import { x } from 'tinyexec'

const CWD = process.cwd()

export function createTask(cwd, command = 'build') {
  return () => x('pnpm', [command], { nodeOptions: { cwd }, throwOnError: true })
}

export async function runTask(taskName, task) {
  const s = createSpinner(`Building ${taskName}`).start()
  try {
    const start = performance.now()
    await task()
    s.success({ text: `Build ${taskName} completed! (${Math.ceil(performance.now() - start)}ms)` })
  } catch (e) {
    s.error({ text: `Build ${taskName} failed!` })
    console.error(e.toString())
    throw e
  }
}

export const buildCli = createTask(resolve(CWD, './packages/cli'))

// The UI compiler needs the Node CLI before UI declarations exist. The browser
// client imports UI types and must be checked only after the UI build finishes.
export const buildCliNode = createTask(resolve(CWD, './packages/cli'), 'build:node')

export const buildVitePlugins = createTask(resolve(CWD, './packages/vite-plugins'))

export const buildPresetUnocss = createTask(resolve(CWD, './packages/preset-unocss'))

export const buildShared = createTask(resolve(CWD, './packages/shared'))

export const buildPresetTailwindcss = createTask(resolve(CWD, './packages/preset-tailwindcss'))

export const buildResolver = createTask(resolve(CWD, './packages/resolver'))

export const buildUse = createTask(resolve(CWD, './packages/use'))

export const buildIcons = createTask(resolve(CWD, './packages/icons'))

export const buildToucheEmulator = createTask(resolve(CWD, './packages/touch-emulator'))

export const buildUI = createTask(resolve(CWD, './packages/ui'), 'build:lib')

export async function runTaskQueue() {
  const start = performance.now()

  await runTask('shared & touch-emulator', () => Promise.all([buildShared(), buildToucheEmulator()]))
  // Resolver declarations import the icon registry, so its types must exist first.
  await runTask('icons', buildIcons)
  await runTask('preset-unocss & preset-tailwindcss & resolver & use & vite-plugins', () =>
    Promise.all([buildPresetUnocss(), buildPresetTailwindcss(), buildResolver(), buildUse(), buildVitePlugins()]),
  )
  await runTask('cli node', buildCliNode)
  await runTask('ui', buildUI)
  await runTask('cli', buildCli)

  console.info(`All tasks built in ${Math.ceil(performance.now() - start)} ms`)
}
