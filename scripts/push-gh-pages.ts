import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { config } from 'dotenv';
import pc from 'picocolors';

// ENV
config();

// @ts-ignore
const DIR_ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR_DOCS_DIST = resolve(DIR_ROOT, 'docs/.vitepress/dist');
const GITHUB_TOKEN = process.env['GITHUB_TOKEN'];

// Main entry
async function main() {
  // Build the package
  console.log(`\n# Run build docs`);
  console.log(`${pc.green(`> npm run docs:build`)}`)
  execSync('npm run docs:build', { stdio: 'inherit' });

  // Check the dist dir
  if (!existsSync(DIR_DOCS_DIST)) {
    throw new Error('The target directory does not exist');
  }

  // Output dir
  console.log(
    pc.cyan('info'),
    `\nOutput at ${pc.gray(`(${
      pc.blueBright(pc.underline(DIR_DOCS_DIST))
    })`)
    }`
  );

  // Ready to pushing
  console.log('\n# Ready to pushing',);

  // Enter `dist` dir for root
  console.log(`${pc.green(`> cd ${DIR_DOCS_DIST}`)}`);
  process.chdir(DIR_DOCS_DIST);

  // Commit changes to the Git
  console.log(`${pc.green(`> git init`)}`);
  execSync('git init', { stdio: 'inherit' });
  console.log(`${pc.green(`> git add -A`)}`);
  execSync('git add -A', { stdio: 'inherit' });
  console.log(`${pc.green(`> git commit -m [messages]`)}`);
  execSync('git commit -m "docs: release"', { stdio: 'inherit' });

  // Push to GitHub
  console.log('\n# Pushing to GitHub',);
  console.log(`${pc.green(`> git push -f [repo] [branch]`)}`);
  // Default branch is `main` or `master`, repo https://[username]:[token]@github.com/[username]/[repo_name].git
  execSync(`git push -f https://Appleec:${GITHUB_TOKEN}@github.com/Appleec/e-utils.git main:gh-pages`, { stdio: 'inherit' });
}

main().catch((err) => console.error(pc.red('error'), err));

