import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import pc from 'picocolors';
import prompts from 'prompts';

async function main() {
  const { version: oldVersion } = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));

  console.log(pc.cyan(`\n# Bump version`));
  console.log(pc.green(`> bumpp --no-commit --no-tag --no-push package.json`))
  // https://github.com/antfu-collective/bumpp
  execSync('bumpp --no-commit --no-tag --no-push package.json', { stdio: 'inherit' });

  const { version } = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));
  if (oldVersion === version) {
    console.log(pc.yellow('warn'), `the same as ${pc.white(version)}`);
    process.exit(1);
  }

  // Check adn update
  console.log(pc.cyan(`\n# Check adn update`));
  // Check types
  console.log(pc.green(`> npm run build:types`));
  execSync('npm run build:types', { stdio: 'inherit' });

  // Update
  // console.log(`${pc.green(`> npm run build:update`)}`);
  // execSync('npm run build:update', { stdio: 'inherit' });

  // Commit changes to the Git
  console.log(pc.cyan(`\n# Commit changes to the Git`));

  console.log(pc.green(`> git add .`));
  execSync('git add .', { stdio: 'inherit' });

  console.log(pc.green(`> git commit -m "chore: release v${version}"`));
  execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' });

  console.log(pc.green(`> git tag -a v${version} -m "v${version}"`));
  execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' });

  console.log(pc.cyan(`\n# Waiting to pushing...`));

  const bs = execSync(`git for-each-ref --format='%(refname)' refs/heads`, { encoding: 'utf-8' });
  const brs = bs
    .trim()
    .split(/\r?\n/)
    .map(i => i.split('/').slice(-1)?.[0])

  const { index } = await prompts({
    type: 'select',
    name: 'index',
    message: 'Select branch',
    choices: brs
  })

  const branch = brs[index];

  execSync(`git checkout master`, { stdio: 'inherit' });
  execSync(`git merge --ff-only ${branch}`, { stdio: 'inherit' });
  execSync(`git checkout -`, { stdio: 'inherit' });

  const { yes } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Pushing changes to repo?`
  })

  if (!yes) {
    return;
  }

  execSync(`git push origin master:master`, { stdio: 'inherit' });
}

main().catch((err) => console.error(pc.red('error'), err));
