// Create a GitHub Release for every tag that `changeset publish` just created.
// Release notes come from the matching `## <version>` section of each package CHANGELOG.md.
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const tags = process.argv.slice(2)

if (tags.length === 0) {
  console.log('No new tags; nothing to release.')
  process.exit(0)
}

const packageDirs = ['packages', 'apps'].flatMap((group) => {
  if (!existsSync(group)) {
    return []
  }
  return readdirSync(group, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(group, entry.name))
})

function locate(name) {
  for (const dir of packageDirs) {
    const manifest = join(dir, 'package.json')
    if (!existsSync(manifest)) {
      continue
    }
    if (JSON.parse(readFileSync(manifest, 'utf8')).name === name) {
      return dir
    }
  }
  return undefined
}

function releaseNotes(dir, version) {
  const changelog = join(dir, 'CHANGELOG.md')
  if (!existsSync(changelog)) {
    return ''
  }
  const section = []
  let inside = false
  for (const line of readFileSync(changelog, 'utf8').split('\n')) {
    if (line.startsWith('## ')) {
      if (inside) {
        break
      }
      inside = line.includes(version)
      continue
    }
    if (inside) {
      section.push(line)
    }
  }
  return section.join('\n').trim()
}

let created = 0
const failed = []

for (const tag of tags) {
  const separator = tag.lastIndexOf('@')
  const name = separator > 0 ? tag.slice(0, separator) : ''
  const version = separator > 0 ? tag.slice(separator + 1) : ''
  const dir = name ? locate(name) : undefined
  const notes = (dir && version ? releaseNotes(dir, version) : '') || `本版本没有独立变更记录（随固定版本组一并发布）。`

  try {
    execFileSync('gh', ['release', 'create', tag, '--title', tag, '--notes', notes], { stdio: 'inherit' })
    created += 1
  } catch (error) {
    failed.push(tag)
    console.log(`::warning::GitHub Release for ${tag} failed: ${error.message.split('\n')[0]}`)
  }
}

console.log(`GitHub Releases: ${created} created, ${failed.length} failed.`)
