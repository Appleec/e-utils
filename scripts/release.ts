import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import pc from 'picocolors';

async function main() {
  const { version: oldVersion } = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));

  console.log(`\n# Bump version`);
  console.log(`${pc.green(`> bumpp --no-commit --no-tag --no-push package.json`)}`)
  // https://github.com/antfu-collective/bumpp
  execSync('bumpp --no-commit --no-tag --no-push package.json', { stdio: 'inherit' });

  const { version } = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));
  if (oldVersion === version) {
    console.log(pc.yellow('warn'), `the same as ${pc.white(version)}`);
    process.exit(1);
  }

  console.log(`\n# Check adn update`);
  // Check types
  console.log(`${pc.green(`> npm run build:types`)}`);
  execSync('npm run build:types', { stdio: 'inherit' });

  // Update
  // console.log(`${pc.green(`> npm run build:update`)}`);
  // execSync('npm run build:update', { stdio: 'inherit' });

  console.log(`\n# Commit changes to the Git`);
  // Commit changes to the Git
  console.log(`${pc.green(`> git add .`)}`);
  execSync('git add .', { stdio: 'inherit' });

  console.log(`${pc.green(`> git commit -m "chore: release v${version}"`)}`);
  execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' });

  console.log(`${pc.green(`> git tag -a v${version} -m "v${version}"`)}`);
  execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' });

  console.log(`\n# Waiting to pushing...`);
}

main().catch((err) => console.error(pc.red('error'), err));
