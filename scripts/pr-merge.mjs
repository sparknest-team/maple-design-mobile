import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export function requirePassingQuality(checks) {
  const check = checks.filter(check => check.name === 'quality' && check.app?.slug === 'github-actions').sort((a, b) => b.id - a.id)[0]
  if (!check || check.status !== 'completed' || check.conclusion !== 'success') throw new Error('The latest Quality check must complete successfully before merging')
  return check
}
export function verifyLinked(checked, current) {
  const sha = current.merged ? current.merge_commit_sha : current.head.sha
  if ((current.state === 'closed' && !current.merged) || sha !== checked.sha) throw new Error(`Related PR ${checked.repo}#${checked.number} changed after CI; rerun Quality`)
}

export function merge(number, run = args => execFileSync('gh', args, { encoding: 'utf8' })) {
  if (!/^\d+$/.test(number || '')) throw new Error('Usage: pnpm pr:merge <PR number>')
  const api = route => JSON.parse(run(['api', route]))
  const repo = JSON.parse(run(['repo', 'view', '--json', 'nameWithOwner'])).nameWithOwner
  const pr = api(`repos/${repo}/pulls/${number}`)
  if (pr.base.ref !== 'main' || pr.state !== 'open' || pr.draft) throw new Error('Only open, ready PRs targeting main may be merged')
  const checks = []
  for (const sha of new Set([pr.head.sha, pr.merge_commit_sha].filter(Boolean))) {
    checks.push(...api(`repos/${repo}/commits/${sha}/check-runs?per_page=100`).check_runs)
  }
  const quality = requirePassingQuality(checks)
  const match = /\/actions\/runs\/(\d+)/.exec(quality.details_url || '')
  if (!match) throw new Error('Quality check must link to an Actions run')
  const workflow = api(`repos/${repo}/actions/runs/${match[1]}`)
  if (workflow.path?.split('@')[0] !== '.github/workflows/quality.yml' || workflow.conclusion !== 'success') throw new Error('Quality must come from the complete quality.yml workflow')
  const artifacts = api(`repos/${repo}/actions/runs/${match[1]}/artifacts?per_page=100`).artifacts.filter(row => row.name.startsWith('ci-linked-prs-') && !row.expired)
  if (!artifacts.length) throw new Error('Quality has no linked-PR snapshot; rerun the new Quality workflow')
  const directory = mkdtempSync(join(tmpdir(), 'pr-merge-'))
  try {
    for (const artifact of artifacts) {
      const target = join(directory, artifact.name)
      run(['run', 'download', match[1], '--repo', repo, '--name', artifact.name, '--dir', target])
      const file = readdirSync(target).find(file => file === 'linked-prs.json')
      if (!file) throw new Error('Missing linked-PR snapshot')
      const snapshot = JSON.parse(readFileSync(join(target, file), 'utf8'))
      if (!pr.merge_commit_sha || snapshot.testedSha !== pr.merge_commit_sha) throw new Error('The current PR merge commit was not tested; update or rerun Quality')
      for (const link of snapshot.links) verifyLinked(link, api(`repos/loca-spirit/${link.repo}/pulls/${link.number}`))
    }
    // GitHub rejects a changed head between validation and the merge request.
    const result = JSON.parse(run(['api', `repos/${repo}/pulls/${number}/merge`, '--method', 'PUT', '-f', 'merge_method=squash', '-f', `sha=${pr.head.sha}`]))
    if (!result.merged) throw new Error(result.message || 'GitHub declined the merge')
    console.log(`Merged ${repo}#${number} after successful Quality`)
  } finally { rmSync(directory, { recursive: true, force: true }) }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { merge(process.argv[2]) }
  catch (error) { console.error(error.message); process.exitCode = 1 }
}
