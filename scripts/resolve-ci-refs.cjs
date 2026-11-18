const repositories = ['cedar-design-web', 'maple-design-mobile', 'design-ui']

function related(body, own) {
  const links = []
  for (const line of (body || '').split(/\r?\n/)) {
    if (!line.startsWith('Related-PR:')) continue
    const match = /^Related-PR:\s*https:\/\/github\.com\/loca-spirit\/([a-z-]+)\/pull\/(\d+)\s*$/.exec(line)
    if (!match || !repositories.includes(match[1])) throw new Error('Invalid Related-PR URL; use a Cedar, Maple, or design-ui PR URL on its own line')
    if (match[1] === own) throw new Error('Related-PR must refer to a sibling repository')
    if (links.some(link => link.repo === match[1])) throw new Error('Only one Related-PR per sibling repository is allowed')
    links.push({ repo: match[1], number: Number(match[2]) })
  }
  return links
}

async function getPull(github, owner, repo, number) {
  try { return await github.rest.pulls.get({ owner, repo, pull_number: number }) }
  catch (error) {
    if (error.status === 403 || error.status === 404) throw new Error(`DESIGN_SYSTEM_CI_TOKEN cannot read ${owner}/${repo} PR #${number}. Select all three repositories and grant Contents: Read-only and Pull requests: Read-only.`)
    throw error
  }
}

async function resolve({ github, context, core }) {
  const number = process.env.PR_NUMBER || context.payload.pull_request?.number
  const pr = number ? (await getPull(github, context.repo.owner, context.repo.repo, Number(number))).data : null
  if (pr && pr.base.ref !== 'main') throw new Error('Delivery PRs must target main')
  const refs = Object.fromEntries(repositories.map(repo => [repo, 'main']))
  const links = related(pr?.body, context.repo.repo)
  for (const link of links) {
    const { data } = await getPull(github, 'loca-spirit', link.repo, link.number)
    if (data.state === 'closed' && !data.merged) throw new Error(`Related PR ${link.repo}#${link.number} is closed without merging`)
    link.sha = data.merged ? data.merge_commit_sha : data.head.sha
    if (!/^[a-f0-9]{40}$/.test(link.sha)) throw new Error('Related PR did not resolve to a commit SHA')
    refs[link.repo] = link.sha
  }
  require('node:fs').writeFileSync(require('node:path').join(process.env.RUNNER_TEMP, 'linked-prs.json'), JSON.stringify({ testedSha: require('node:child_process').execFileSync('git', ['-C', require('node:path').join(process.env.GITHUB_WORKSPACE, context.repo.repo), 'rev-parse', 'HEAD']).toString().trim(), links }))
  core.setOutput('refs', refs)
  core.setOutput('links', links)
  core.setOutput('pr', number ? String(number) : '')
  core.setOutput('release', pr?.head.ref === 'changeset-release/main' ? 'true' : 'false')
  core.info(JSON.stringify({ refs, links }))
}

async function validate({ github }) {
  for (const link of JSON.parse(process.env.CI_LINKS || '[]')) {
    const { data } = await getPull(github, 'loca-spirit', link.repo, link.number)
    const sha = data.merged ? data.merge_commit_sha : data.head.sha
    if ((data.state === 'closed' && !data.merged) || sha !== link.sha) throw new Error(`Related PR ${link.repo}#${link.number} changed during CI; rerun Quality`)
  }
}
module.exports = { related, resolve, validate }
