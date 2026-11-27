import { dirname, relative, resolve } from 'node:path'
import fse from 'fs-extra'

// Copy ambient declarations only. Source-backed declarations already come from the Vue declaration build.
export async function copySourceDeclarations(sourceDir: string, outputDir: string) {
  async function visit(directory: string) {
    for (const entry of await fse.readdir(directory, { withFileTypes: true })) {
      if (['__tests__', '__demos__', 'example'].includes(entry.name)) {
        continue
      }
      const file = resolve(directory, entry.name)
      if (entry.isDirectory()) {
        await visit(file)
      } else if (entry.name.endsWith('.d.ts')) {
        const stem = file.slice(0, -'.d.ts'.length)
        const sources = [`${stem}.ts`, `${stem}.tsx`, `${stem}.vue`]
        if (stem.endsWith('.vue')) {
          sources.push(stem)
        }
        if ((await Promise.all(sources.map((source) => fse.pathExists(source)))).some(Boolean)) {
          continue
        }
        const target = resolve(outputDir, relative(sourceDir, file))
        await fse.ensureDir(dirname(target))
        await fse.copyFile(file, target)
      }
    }
  }
  await visit(sourceDir)
}
