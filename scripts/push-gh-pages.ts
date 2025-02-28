import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { chdir } from 'node:process'

import { config } from 'dotenv'
import * as execa from 'execa'
import c from 'ansis'

// ENV
config()

// @ts-ignore
const DIR_ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIR_DOCS_DIST = resolve(DIR_ROOT, 'docs/.vitepress/dist')
const GITHUB_TOKEN = process.env['GITHUB_TOKEN']

// Main entry
async function main() {
  // Build the package
  console.log(c.cyan(`\n# Build the package...`))
  await run('npm', ['run', 'docs:build'])

  console.log()
  console.log(c.bold`${c.green(1)} Created:`)
  console.log()
  console.log([c.green.underline(DIR_DOCS_DIST)].join('\n'))
  console.log()

  // ------

  // Ready to pushing
  console.log(c.cyan(`\n# Ready to pushing`))

  // Enter `dist` dir for root
  console.log(c.green(`> cd ${DIR_DOCS_DIST}`))
  chdir(DIR_DOCS_DIST)

  // Commit changes to the Git
  await run('git', ['init'])
  await run('git', ['add', '-A'])
  await run('git', ['commit', '-m', `"docs(release): deploy"`])

  // Push to GitHub
  console.log(c.cyan(`\n# Pushing to GitHub`))
  // Default branch is `main` or `master`, repo https://[username]:[token]@github.com/[username]/[repo_name].git
  await run('git', [
    'push',
    '-f',
    `https://Appleec:${GITHUB_TOKEN}@github.com/Appleec/e-utils.git`,
    'main:gh-pages'
  ])
}

/**
 * Run command
 * @param bin
 * @param args
 * @param opt
 */
async function run(bin, args, opt?) {
  opt = Object.assign({ logger: true }, opt)
  if (opt.logger) console.log(c.green(`> ${[bin, ...args].join(' ')}`))
  try {
    return await execa.execa(bin, args, { stdio: 'inherit', ...opt })
  } catch (e) {
    throw new Error(c.bold(c.red(`Error running ${c.bold([bin, ...args].join(' '))} in ${c.underline(process.cwd)}:`)) + (e.stderr || e.stack || e.message))
  }
}

main().catch((err) => console.error(err))

